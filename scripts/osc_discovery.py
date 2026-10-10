"""
Resolume Arena OSC Discovery Script
Поочередно отправляет OSC-команды на порт 7000 с аргументом "?" и слушает ответы на порту 7001.
Цель: найти команды, возвращающие координаты выбранного клипа (column, layer) и выбранной column.
"""

import socket
import struct
import time
import threading
import argparse
from datetime import datetime

# ──────────────────────────────────────────────
# Настройки
# ──────────────────────────────────────────────
RESOLUME_IP   = "127.0.0.1"
RESOLUME_PORT = 7000   # Resolume слушает здесь
LISTEN_PORT   = 7001   # Resolume отвечает сюда
SEND_DELAY    = 0.15   # секунд между отправками
RESPONSE_TIMEOUT = 0.3 # секунд ожидания ответа на каждую команду

# ──────────────────────────────────────────────
# Минимальный OSC-кодировщик/декодер (без зависимостей)
# ──────────────────────────────────────────────

def _pad4(n: int) -> int:
    return (n + 3) & ~3

def encode_string(s: str) -> bytes:
    b = s.encode("utf-8") + b"\x00"
    return b.ljust(_pad4(len(b)), b"\x00")

def encode_osc(address: str, *args) -> bytes:
    """Кодирует OSC-сообщение. Поддерживает int, float, str и пустой список (query)."""
    addr_bytes = encode_string(address)

    type_tag = ","
    arg_bytes = b""
    for arg in args:
        if isinstance(arg, bool):
            type_tag += "i"
            arg_bytes += struct.pack(">i", int(arg))
        elif isinstance(arg, int):
            type_tag += "i"
            arg_bytes += struct.pack(">i", arg)
        elif isinstance(arg, float):
            type_tag += "f"
            arg_bytes += struct.pack(">f", arg)
        elif isinstance(arg, str):
            type_tag += "s"
            arg_bytes += encode_string(arg)

    tag_bytes = encode_string(type_tag)
    return addr_bytes + tag_bytes + arg_bytes


def decode_string(data: bytes, offset: int):
    end = data.index(b"\x00", offset)
    s = data[offset:end].decode("utf-8", errors="replace")
    return s, _pad4(end + 1)


def decode_osc(data: bytes):
    """Декодирует OSC-сообщение, возвращает (address, [args])."""
    try:
        address, offset = decode_string(data, 0)
        if offset >= len(data):
            return address, []

        type_tag, offset = decode_string(data, offset)
        args = []
        for t in type_tag[1:]:  # пропускаем начальную запятую
            if t == "i":
                args.append(struct.unpack(">i", data[offset:offset+4])[0])
                offset += 4
            elif t == "f":
                args.append(struct.unpack(">f", data[offset:offset+4])[0])
                offset += 4
            elif t == "s":
                s, offset = decode_string(data, offset)
                args.append(s)
            elif t in ("T", "F"):
                args.append(t == "T")
            # остальные типы пропускаем
        return address, args
    except Exception as e:
        return f"<decode error: {e}>", []


# ──────────────────────────────────────────────
# Список OSC-адресов для проверки
# ──────────────────────────────────────────────

# Команды сгруппированы по приоритету:
#   PRIORITY — наиболее вероятные адреса для выбранного клипа/колонки
#   EXTENDED — расширенный список для полного сканирования

PRIORITY_ADDRESSES = [
    # ── Прямые запросы выбранного состояния ──────────────────────────────
    "/composition/selectedclip",
    "/composition/selectedlayer",
    "/composition/selectedcolumn",

    # ── Альтернативные пути для выбранного клипа ─────────────────────────
    "/composition/clip/selected",
    "/composition/layer/selected",
    "/composition/column/selected",

    # ── Вложенные свойства selected-клипа ────────────────────────────────
    "/composition/selectedclip/index",
    "/composition/selectedclip/layer",
    "/composition/selectedclip/column",
    "/composition/selectedclip/name",
    "/composition/selectedclip/connected",

    # ── Selected-layer/column свойства ───────────────────────────────────
    "/composition/selectedlayer/index",
    "/composition/selectedlayer/name",
    "/composition/selectedcolumn/index",
    "/composition/selectedcolumn/name",

    # ── Resolume 7 Web-API-style OSC пути ────────────────────────────────
    "/composition/selected/clip/column/index",
    "/composition/selected/clip/layer/index",
    "/composition/selected/clip/index",
    "/composition/selected/column/index",
    "/composition/selected/layer/index",
    "/composition/selected",

    # ── Clip connected / triggering ──────────────────────────────────────
    "/composition/connectedclip",
    "/composition/connectedclip/index",
    "/composition/connectedclip/layer",
    "/composition/connectedclip/column",
    "/composition/connectedlayer",
    "/composition/connectedcolumn",

    # ── Clips по индексу (проверяем первые несколько слотов) ─────────────
    "/composition/layers/1/clips/1/select",
    "/composition/layers/1/clips/1/selected",
    "/composition/layers/1/clips/1/connected",
    "/composition/columns/1/select",
    "/composition/columns/1/selected",
    "/composition/columns/1/connected",

    # ── Верхнеуровневые ──────────────────────────────────────────────────
    "/composition",
    "/composition/name",
    "/composition/speed",
    "/composition/bpm",
]

EXTENDED_ADDRESSES = [
    # ── Resolume 6 legacy ─────────────────────────────────────────────────
    "/activeclip",
    "/activeclip/index",
    "/activeclip/layer",
    "/activelayer",
    "/activecolumn",

    # ── Транспорт ─────────────────────────────────────────────────────────
    "/composition/transport/position",
    "/composition/transport/speed",
    "/composition/tempocontroller/tempo",
    "/composition/tempocontroller/bpm",

    # ── Параметры первых слоёв ────────────────────────────────────────────
    "/composition/layers/1/select",
    "/composition/layers/1/selected",
    "/composition/layers/1/name",
    "/composition/layers/1/video/opacity/value",
    "/composition/layers/2/select",
    "/composition/layers/2/selected",

    # ── Параметры первых колонок ──────────────────────────────────────────
    "/composition/columns/1/connect",
    "/composition/columns/1/name",
    "/composition/columns/2/select",
    "/composition/columns/2/selected",

    # ── Разные варианты написания ─────────────────────────────────────────
    "/composition/selectedClip",
    "/composition/selectedLayer",
    "/composition/selectedColumn",
    "/composition/selected_clip",
    "/composition/selected_layer",
    "/composition/selected_column",
    "/composition/currentclip",
    "/composition/currentlayer",
    "/composition/currentcolumn",
]


# ──────────────────────────────────────────────
# Потоковый приёмник ответов
# ──────────────────────────────────────────────

class ResponseCollector:
    def __init__(self, port: int):
        self.port = port
        self._responses: list[dict] = []
        self._lock = threading.Lock()
        self._running = False
        self._sock: socket.socket | None = None

    def start(self):
        self._sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self._sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self._sock.bind(("0.0.0.0", self.port))
        self._sock.settimeout(0.05)
        self._running = True
        self._thread = threading.Thread(target=self._loop, daemon=True)
        self._thread.start()

    def _loop(self):
        while self._running:
            try:
                data, addr = self._sock.recvfrom(65535)
                ts = time.time()
                address, args = decode_osc(data)
                with self._lock:
                    self._responses.append({
                        "ts": ts,
                        "address": address,
                        "args": args,
                        "raw_len": len(data),
                    })
            except socket.timeout:
                pass
            except Exception:
                pass

    def drain(self) -> list[dict]:
        """Возвращает и очищает накопленные ответы."""
        with self._lock:
            items = list(self._responses)
            self._responses.clear()
        return items

    def stop(self):
        self._running = False
        if self._sock:
            self._sock.close()


# ──────────────────────────────────────────────
# Основная логика
# ──────────────────────────────────────────────

def send_osc(sock: socket.socket, address: str, *args):
    data = encode_osc(address, *args)
    sock.sendto(data, (RESOLUME_IP, RESOLUME_PORT))


def scan(addresses: list[str], label: str, sock: socket.socket, collector: ResponseCollector):
    print(f"\n{'='*60}")
    print(f"  {label}  ({len(addresses)} адресов)")
    print(f"{'='*60}")

    results = {}  # address -> list of response dicts

    for addr in addresses:
        collector.drain()  # сбрасываем старые ответы

        # Отправляем запрос с "?" — стандартный способ получить текущее значение в Resolume Arena
        send_osc(sock, addr, "?")
        time.sleep(RESPONSE_TIMEOUT)

        responses = collector.drain()
        if responses:
            results[addr] = responses
            for r in responses:
                args_str = ", ".join(repr(a) for a in r["args"])
                print(f"  [ОТВЕТ] {addr}  =>  {r['address']}  ({args_str})")
        else:
            print(f"  [тихо]  {addr}")

        time.sleep(SEND_DELAY)

    return results


def print_summary(all_results: dict):
    print(f"\n{'='*60}")
    print("  ИТОГ: адреса, на которые пришёл ответ")
    print(f"{'='*60}")

    if not all_results:
        print("  Ответов не получено. Проверьте:")
        print("    • Resolume Arena запущен и OSC включён (порт 7000 / 7001)")
        print("    • IP-адрес верный (сейчас:", RESOLUME_IP, ")")
        return

    # Сортируем по «интересности» — ищем ключевые слова
    keywords = ("select", "column", "layer", "clip", "index", "connect", "active", "current")

    interesting = []
    other = []
    for addr, responses in all_results.items():
        addr_lower = addr.lower()
        score = sum(kw in addr_lower for kw in keywords)
        entry = (addr, responses, score)
        if score > 0:
            interesting.append(entry)
        else:
            other.append(entry)

    interesting.sort(key=lambda x: -x[2])

    print("\n  >>> ИНТЕРЕСНЫЕ (связаны с выбором клипа/слоя/колонки) <<<\n")
    for addr, responses, _ in interesting:
        for r in responses:
            args_str = ", ".join(repr(a) for a in r["args"])
            print(f"  {addr}")
            print(f"      ответ: {r['address']}  аргументы: [{args_str}]")

    if other:
        print("\n  >>> ПРОЧИЕ ответившие адреса <<<\n")
        for addr, responses, _ in other:
            for r in responses:
                args_str = ", ".join(repr(a) for a in r["args"])
                print(f"  {addr}  =>  [{args_str}]")


def main():
    global RESOLUME_IP, RESOLUME_PORT, LISTEN_PORT, SEND_DELAY

    parser = argparse.ArgumentParser(
        description="Resolume Arena OSC Discovery — поиск команд для выбранного клипа/колонки"
    )
    parser.add_argument("--ip",    default=RESOLUME_IP,   help="IP Resolume (default: 127.0.0.1)")
    parser.add_argument("--port",  default=RESOLUME_PORT, type=int, help="Порт отправки (default: 7000)")
    parser.add_argument("--lport", default=LISTEN_PORT,   type=int, help="Порт прослушивания (default: 7001)")
    parser.add_argument("--full",  action="store_true",   help="Включить расширенный список адресов")
    parser.add_argument("--delay", default=SEND_DELAY,    type=float, help="Задержка между запросами (с)")
    args = parser.parse_args()

    RESOLUME_IP   = args.ip
    RESOLUME_PORT = args.port
    LISTEN_PORT   = args.lport
    SEND_DELAY    = args.delay

    print(f"Resolume: {RESOLUME_IP}:{RESOLUME_PORT}  |  Слушаем: 0.0.0.0:{LISTEN_PORT}")
    print(f"Начало сканирования: {datetime.now().strftime('%H:%M:%S')}")

    collector = ResponseCollector(LISTEN_PORT)
    collector.start()

    send_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    all_results = {}

    try:
        r = scan(PRIORITY_ADDRESSES, "ПРИОРИТЕТНЫЕ АДРЕСА", send_sock, collector)
        all_results.update(r)

        if args.full:
            r = scan(EXTENDED_ADDRESSES, "РАСШИРЕННЫЙ СПИСОК", send_sock, collector)
            all_results.update(r)

    except KeyboardInterrupt:
        print("\nПрервано пользователем.")
    finally:
        send_sock.close()
        collector.stop()

    print_summary(all_results)
    print(f"\nКонец сканирования: {datetime.now().strftime('%H:%M:%S')}")


if __name__ == "__main__":
    main()
