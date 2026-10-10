"""
Resolume Arena OSC Brute-Force Scanner
Цель: найти OSC-адрес, отдающий column и layer ВЫБРАННОГО клипа.

Для каждого адреса делается три попытки:
  1. без аргументов (пустой запрос)
  2. с аргументом string "?"
  3. с аргументом int32 1

Все ответы сохраняются в osc_bruteforce_results.txt
"""

import socket
import struct
import time
import threading
import sys
from datetime import datetime

RESOLUME_IP      = "127.0.0.1"
RESOLUME_PORT    = 7000
LISTEN_PORT      = 7001
SEND_DELAY       = 0.05   # между адресами
RESPONSE_TIMEOUT = 0.25   # ожидание ответа на одну попытку
OUTPUT_FILE      = "osc_bruteforce_results.txt"

# ──────────────────────────────────────────────
# OSC codec
# ──────────────────────────────────────────────

def _pad4(n):
    return (n + 3) & ~3

def enc_str(s):
    b = s.encode("utf-8") + b"\x00"
    return b.ljust(_pad4(len(b)), b"\x00")

def encode_osc(address, *args):
    addr_b = enc_str(address)
    tag = ","
    arg_b = b""
    for a in args:
        if isinstance(a, int):
            tag += "i"; arg_b += struct.pack(">i", a)
        elif isinstance(a, float):
            tag += "f"; arg_b += struct.pack(">f", a)
        elif isinstance(a, str):
            tag += "s"; arg_b += enc_str(a)
    return addr_b + enc_str(tag) + arg_b

def decode_osc(data):
    def rd_str(off):
        end = data.index(b"\x00", off)
        s = data[off:end].decode("utf-8", errors="replace")
        return s, _pad4(end + 1)
    try:
        addr, off = rd_str(0)
        if off >= len(data):
            return addr, []
        tag, off = rd_str(off)
        args = []
        for t in tag[1:]:
            if t == "i":
                args.append(("int", struct.unpack(">i", data[off:off+4])[0])); off += 4
            elif t == "f":
                args.append(("float", struct.unpack(">f", data[off:off+4])[0])); off += 4
            elif t == "s":
                s, off = rd_str(off); args.append(("str", s))
            elif t == "T":
                args.append(("bool", True))
            elif t == "F":
                args.append(("bool", False))
        return addr, args
    except Exception as e:
        return f"<err:{e}>", []

# ──────────────────────────────────────────────
# Listener
# ──────────────────────────────────────────────

class Listener:
    def __init__(self, port):
        self._buf = []
        self._lock = threading.Lock()
        self._sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self._sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self._sock.bind(("0.0.0.0", port))
        self._sock.settimeout(0.02)
        self._running = True
        threading.Thread(target=self._loop, daemon=True).start()

    def _loop(self):
        while self._running:
            try:
                data, _ = self._sock.recvfrom(65535)
                addr, args = decode_osc(data)
                with self._lock:
                    self._buf.append((addr, args))
            except (socket.timeout, OSError):
                pass

    def drain(self):
        with self._lock:
            r = list(self._buf); self._buf.clear()
        return r

    def stop(self):
        self._running = False
        try:
            self._sock.close()
        except OSError:
            pass

# ──────────────────────────────────────────────
# Address list  (~300 entries)
# ──────────────────────────────────────────────

def build_address_list():
    addrs = []

    # ── 1. selectedclip — все мыслимые суффиксы ──────────────────────────
    sc_suffixes = [
        "", "/index", "/id", "/num", "/number", "/nr", "/no",
        "/layer", "/layer/index", "/layer/id", "/layer/num", "/layer/number",
        "/layer/nr", "/layer/name", "/layer/selected",
        "/column", "/column/index", "/column/id", "/column/num", "/column/number",
        "/column/nr", "/column/name", "/column/selected",
        "/col", "/col/index", "/row", "/row/index",
        "/name", "/connected", "/connect",
        "/position", "/pos", "/pos/x", "/pos/y",
        "/coord", "/coords", "/coordinate", "/coordinates",
        "/grid", "/grid/x", "/grid/y", "/grid/column", "/grid/layer",
        "/slot", "/slot/index", "/slot/column", "/slot/layer",
        "/location", "/location/column", "/location/layer",
        "/parent", "/parent/index", "/parent/layer", "/parent/column",
        "/info", "/meta", "/data",
        "/layerindex", "/columnindex",
        "/layerid", "/columnid",
        "/layernum", "/columnnum",
        "/x", "/y",
    ]
    for s in sc_suffixes:
        addrs.append(f"/composition/selectedclip{s}")

    # ── 2. selectedlayer / selectedcolumn суффиксы ────────────────────────
    for base in ("/composition/selectedlayer", "/composition/selectedcolumn"):
        for s in ("", "/index", "/id", "/num", "/number", "/nr", "/name", "/selected",
                  "/connect", "/connected", "/clips/selected", "/clips/1/selected"):
            addrs.append(f"{base}{s}")

    # ── 3. /composition/selected/* ────────────────────────────────────────
    sel_suf = [
        "", "/clip", "/clip/index", "/clip/layer", "/clip/column",
        "/clip/layer/index", "/clip/column/index",
        "/clip/name", "/clip/connected",
        "/layer", "/layer/index", "/layer/name",
        "/column", "/column/index", "/column/name",
        "/index", "/id", "/name",
    ]
    for s in sel_suf:
        addrs.append(f"/composition/selected{s}")

    # ── 4. /composition/clip/selected/* ──────────────────────────────────
    for s in ("", "/index", "/layer", "/column", "/layer/index", "/column/index", "/name"):
        addrs.append(f"/composition/clip/selected{s}")
        addrs.append(f"/composition/layer/selected{s}")
        addrs.append(f"/composition/column/selected{s}")

    # ── 5. connected / active clip ────────────────────────────────────────
    for prefix in ("/composition/connectedclip", "/composition/activeclip",
                   "/composition/currentclip", "/composition/playingclip",
                   "/composition/triggerclip"):
        for s in ("", "/index", "/layer", "/column", "/layer/index",
                  "/column/index", "/name", "/connected", "/id"):
            addrs.append(f"{prefix}{s}")

    for prefix in ("/composition/connectedlayer", "/composition/activelayer",
                   "/composition/connectedcolumn", "/composition/activecolumn"):
        for s in ("", "/index", "/id", "/name"):
            addrs.append(f"{prefix}{s}")

    # ── 6. /activeclip /activelayer /activecolumn (root-level) ───────────
    for prefix in ("/activeclip", "/activelayer", "/activecolumn",
                   "/currentclip", "/selectedclip"):
        for s in ("", "/index", "/layer", "/column", "/name"):
            addrs.append(f"{prefix}{s}")

    # ── 7. layers/N/clips/M с wildcard-стилем ─────────────────────────────
    # Resolume иногда отвечает «текущий» при N=0 или M=0
    for n in (0, 1, 2):
        for m in (0, 1, 2):
            base = f"/composition/layers/{n}/clips/{m}"
            for s in ("/selected", "/select", "/connected", "/connect",
                      "/index", "/name", "/layer", "/column"):
                addrs.append(f"{base}{s}")

    # ── 8. columns/N с /selected ──────────────────────────────────────────
    for n in (0, 1, 2):
        base = f"/composition/columns/{n}"
        for s in ("/selected", "/select", "/connected", "/connect", "/index", "/name"):
            addrs.append(f"{base}{s}")

    # ── 9. /composition верхний уровень ──────────────────────────────────
    for s in ("/selectedclipindex", "/selectedlayerindex", "/selectedcolumnindex",
              "/selectedcliplayerindex", "/selectedclipcolumnindex",
              "/clipselected", "/layerselected", "/columnselected",
              "/clip/index", "/layer/index", "/column/index",
              "/clip/selected/index", "/layer/selected/index", "/column/selected/index",
              "/focusedclip", "/focusedlayer", "/focusedcolumn",
              "/focusedclip/index", "/focusedclip/layer", "/focusedclip/column",
              "/highlightedclip", "/highlightedclip/index",
              "/lastclip", "/lastclip/index", "/lastclip/layer", "/lastclip/column",
              "/lastselectedclip", "/lastselectedclip/index",
              "/lastselectedclip/layer", "/lastselectedclip/column",
              "/clipinfo", "/clipinfo/layer", "/clipinfo/column"):
        addrs.append(f"/composition{s}")

    # ── 10. Resolume Avenue / legacy paths ───────────────────────────────
    for s in ("/selected", "/selected/layer", "/selected/column",
              "/selected/clip", "/selected/clip/layer", "/selected/clip/column"):
        addrs.append(f"/avenue{s}")
        addrs.append(f"/arena{s}")

    # deduplicate, preserve order
    seen = set()
    result = []
    for a in addrs:
        if a not in seen:
            seen.add(a)
            result.append(a)
    return result


ADDRESSES = build_address_list()

# ──────────────────────────────────────────────
# Scan
# ──────────────────────────────────────────────

SEND_MODES = [
    ("empty",    ()),
    ("query_?",  ("?",)),
    ("int_1",    (1,)),
]

def scan(listener, send_sock, log):
    total = len(ADDRESSES)
    hits = {}  # addr -> list of (mode, resp_addr, args)

    for i, addr in enumerate(ADDRESSES):
        pct = (i + 1) / total * 100
        print(f"\r  [{i+1:3d}/{total}] {pct:5.1f}%  {addr:<60}", end="", flush=True)

        for mode_name, mode_args in SEND_MODES:
            listener.drain()
            pkt = encode_osc(addr, *mode_args)
            send_sock.sendto(pkt, (RESOLUME_IP, RESOLUME_PORT))
            time.sleep(RESPONSE_TIMEOUT)

            responses = listener.drain()
            if responses:
                for resp_addr, args in responses:
                    entry = (mode_name, resp_addr, args)
                    hits.setdefault(addr, []).append(entry)
                    line = f"[HIT] {addr} ({mode_name}) => {resp_addr}  {args}"
                    print(f"\n  {line}")
                    log.write(line + "\n")
                    log.flush()

            time.sleep(SEND_DELAY)

    print()
    return hits


def print_summary(hits, log):
    header = f"\n{'='*70}\n  ИТОГ: {len(hits)} адресов с ответом\n{'='*70}"
    print(header); log.write(header + "\n")

    # Ищем "интересные" — те, у которых в ответе числа кроме 0
    # (0 скорее всего флаги "не выбрано")
    interesting_kw = ("layer", "column", "clip", "select", "index", "coord",
                      "position", "grid", "slot", "loc", "parent")
    interesting = []
    other = []
    for addr, entries in hits.items():
        score = sum(kw in addr.lower() for kw in interesting_kw)
        # бонус если в аргументах ответа есть integer > 0
        for _, _, args in entries:
            for typ, val in args:
                if typ == "int" and val > 0:
                    score += 2
        (interesting if score > 0 else other).append((addr, entries, score))

    interesting.sort(key=lambda x: -x[2])

    for section, items in (("ИНТЕРЕСНЫЕ", interesting), ("ПРОЧИЕ", other)):
        if not items:
            continue
        s = f"\n  [{section}]\n"
        print(s); log.write(s)
        for addr, entries, _ in items:
            for mode, resp_addr, args in entries:
                line = f"    {addr}  [{mode}]  =>  {resp_addr}  {args}"
                print(line); log.write(line + "\n")


def main():
    print(f"Resolume: {RESOLUME_IP}:{RESOLUME_PORT}  |  listen: 0.0.0.0:{LISTEN_PORT}")
    print(f"Адресов: {len(ADDRESSES)}  |  Режимов отправки: {len(SEND_MODES)} (empty / '?' / int1)")
    print(f"Примерное время: ~{len(ADDRESSES) * len(SEND_MODES) * (RESPONSE_TIMEOUT + SEND_DELAY) / 60:.1f} мин")
    print(f"Лог: {OUTPUT_FILE}")
    print(f"Старт: {datetime.now().strftime('%H:%M:%S')}\n")

    listener = Listener(LISTEN_PORT)
    send_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as log:
        log.write(f"Scan started: {datetime.now().isoformat()}\n")
        log.write(f"Target: {RESOLUME_IP}:{RESOLUME_PORT}  Listen: {LISTEN_PORT}\n\n")

        try:
            hits = scan(listener, send_sock, log)
        except KeyboardInterrupt:
            print("\nПрервано.")
            hits = {}
        finally:
            send_sock.close()
            listener.stop()

        print_summary(hits, log)
        log.write(f"\nScan ended: {datetime.now().isoformat()}\n")

    print(f"\nКонец: {datetime.now().strftime('%H:%M:%S')}")
    print(f"Результаты сохранены в: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
