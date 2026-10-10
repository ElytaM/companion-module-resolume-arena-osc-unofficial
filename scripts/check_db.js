const Database = require('better-sqlite3');
const dbPath = process.argv[2];
if (!dbPath) {
  console.error('Usage: node scripts/check_db.js <path-to-companion-db>');
  process.exit(1);
}
const db = new Database(dbPath, {readonly: true});
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', JSON.stringify(tables));
db.close();
