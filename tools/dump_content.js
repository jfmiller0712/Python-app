// Loads every js/content/mNN.js file and prints the curriculum as JSON.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const dir = path.join(__dirname, "..", "js", "content");
const modules = [];
const ctx = vm.createContext({ registerModule: (m) => modules.push(m) });
for (const f of fs.readdirSync(dir).filter((f) => /^m\d\d\.js$/.test(f)).sort()) {
  const before = modules.length;
  vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f });
  if (modules.length !== before + 1) throw new Error(`${f} must call registerModule exactly once`);
  modules[modules.length - 1].__file = f;
}
modules.sort((a, b) => a.order - b.order);
process.stdout.write(JSON.stringify(modules));
