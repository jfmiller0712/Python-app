registerModule({
  id: "m11",
  order: 11,
  name: "Data Archives",
  topic: "Files, JSON, CSV and paths",
  blurb: "Store your discoveries for later: read and write files, then speak the common data formats JSON and CSV.",
  lessons: [
    {
      id: "m11-l1",
      title: "Opening the Archives",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 7.2 Reading and Writing Files",
          url: "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" },
        { label: "Built-in Functions: open()",
          url: "https://docs.python.org/3/builtins/functions.html#open" },
        { label: "io: Core tools for working with streams (StringIO)",
          url: "https://docs.python.org/3/library/io.html" }
      ],
      body: `<p>Everything a program stores in variables disappears when it ends. To keep data, you write it to a <strong>file</strong>, and to use it again you read the file back. The built-in function <code>open()</code> gives you a <em>file object</em> to work with.</p>
<h3>Opening a file with <code>with</code></h3>
<p>The recommended way to open a file is inside a <code>with</code> statement. When the indented block ends, Python closes the file for you, even if an exception happened inside the block.</p>
<pre class="code">with open("crew.txt", "w", encoding="utf-8") as f:
    f.write("Ada\\n")
    f.write("Lin\\n")

with open("crew.txt", encoding="utf-8") as f:
    text = f.read()
print(text)</pre>
<p>These examples touch a real disk, so they have no Run button here. Passing <code>encoding="utf-8"</code> is a good habit: Python 3.15 and later default to UTF-8, but older versions use an encoding that depends on your computer.</p>
<h3>File modes</h3>
<ul>
  <li><code>"r"</code> read (the default). Missing file: <code>FileNotFoundError</code>.</li>
  <li><code>"w"</code> write. Creates the file, or <strong>erases</strong> it if it already exists.</li>
  <li><code>"a"</code> append. Writes are added to the end.</li>
  <li><code>"x"</code> create. Fails with <code>FileExistsError</code> if the file exists.</li>
  <li>Add <code>"b"</code> for binary data (bytes), for example <code>"rb"</code>. Text mode (<code>"t"</code>) is the default.</li>
</ul>
<h3>Practising with <code>io.StringIO</code></h3>
<p><code>io.StringIO</code> is an in-memory text file. It has the same reading and writing methods as a real text file, so it is perfect for practice.</p>
<pre class="code" data-run>import io

out = io.StringIO()
out.write("Fuel: 80%\\n")
print("Engines: online", file=out)   # print can write to a file too
print(repr(out.getvalue()))</pre>
<h3>Reading line by line</h3>
<p><code>f.read()</code> returns the whole file as one string. <code>f.readline()</code> returns one line, and an empty string <code>''</code> once the end is reached. Most often you simply loop over the file, which gives one line at a time and works for files of any size.</p>
<pre class="code" data-run>import io

log = io.StringIO("""Day 1: launched
Day 2: passed the Moon

Day 3: reached orbit
""")

for line in log:
    line = line.strip()
    if line:
        print("Entry ->", line)</pre>
<p>Each line keeps its newline character <code>\\n</code> at the end, which is why the loop calls <code>.strip()</code>. Blank lines become empty strings after stripping, so <code>if line:</code> skips them.</p>
<pre class="code" data-run>import io

f = io.StringIO("first\\nsecond\\n")
print(repr(f.readline()))
print(repr(f.readline()))
print(repr(f.readline()))   # end of file</pre>
<div class="warn"><strong>Watch out</strong> Opening an existing file with <code>"w"</code> wipes its contents immediately. Use <code>"a"</code> when you want to add to it.</div>`,
      quiz: [
        { q: `Why is <code>with open(...) as f:</code> recommended?`,
          options: ["It makes reading faster", "It closes the file automatically when the block ends", "It creates a backup of the file", "It is the only way to read text"],
          answer: 1,
          explain: "The with statement guarantees the file is closed when the block finishes, even if an exception is raised inside it." },
        { q: `You open an existing file <code>notes.txt</code> with mode <code>"w"</code>. What happens to its old contents?`,
          options: ["They are kept and new text goes at the end", "Python raises FileExistsError", "Nothing until you call read()", "They are erased"],
          answer: 3,
          explain: "Mode 'w' truncates the file. Use 'a' to append, or 'x' to refuse to touch a file that already exists." },
        { q: `What does this print?<pre class="code">import io
f = io.StringIO("one\\ntwo\\n")
f.readline()
f.readline()
print(repr(f.readline()))</pre>`,
          options: ["''", "'two\\n'", "None", "An error"],
          answer: 0,
          explain: "After both lines have been read, readline() returns an empty string to signal the end of the file." }
      ],
      challenge: {
        title: "Captain's Log Reader",
        prompt: `<p>Mission control needs a clean copy of the captain's log. Write a function <code>read_log(f)</code> that takes an open text file (it will be tested with <code>io.StringIO</code>) and returns a <strong>list</strong> of its entries:</p>
<ul>
  <li>Remove the newline and any surrounding spaces from each line.</li>
  <li>Skip lines that are blank.</li>
</ul>
<p>For example, a file containing <code>"Launch\\n\\nOrbit\\n"</code> gives <code>["Launch", "Orbit"]</code>.</p>`,
        starter: `def read_log(f):
    entries = []
    # Loop over the lines of f here
    return entries
`,
        tests: [
          { name: "Removes newlines", code: `import io
assert read_log(io.StringIO("Launch\\nOrbit\\n")) == ["Launch", "Orbit"]` },
          { name: "Skips blank lines", code: `import io
assert read_log(io.StringIO("Launch\\n\\n   \\nDock\\n")) == ["Launch", "Dock"]` },
          { name: "Strips surrounding spaces", code: `import io
assert read_log(io.StringIO("  Mars flyby  \\n")) == ["Mars flyby"]` },
          { name: "An empty log gives an empty list", code: `import io
assert read_log(io.StringIO("")) == []` }
        ],
        hints: [
          "A for loop over a file object gives you one line at a time.",
          "line.strip() removes the newline and spaces; an empty string is falsy.",
          "Append each non-empty stripped line to entries."
        ],
        solution: `def read_log(f):
    entries = []
    for line in f:
        line = line.strip()
        if line:
            entries.append(line)
    return entries
`
      }
    },
    {
      id: "m11-l2",
      title: "JSON Star Charts",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 7.2.2 Saving structured data with json",
          url: "https://docs.python.org/3/tutorial/inputoutput.html#saving-structured-data-with-json" },
        { label: "json: JSON encoder and decoder",
          url: "https://docs.python.org/3/library/json.html" }
      ],
      body: `<p>Writing plain lines works for simple logs, but real data has structure: dictionaries inside lists, numbers, true/false flags. <strong>JSON</strong> (JavaScript Object Notation) is a text format for exactly this, and almost every language and web service understands it. Python's <code>json</code> module converts between Python objects and JSON text.</p>
<h3>Python to JSON: <code>json.dumps()</code></h3>
<p><code>dumps</code> means "dump to string". It returns a <code>str</code>.</p>
<pre class="code" data-run>import json

ship = {"name": "Nova", "crew": 4, "active": True,
        "cargo": None, "ports": ["Luna", "Mars"]}
text = json.dumps(ship)
print(text)
print(type(text))</pre>
<p>Notice the translations: <code>True</code> becomes <code>true</code>, <code>None</code> becomes <code>null</code>, and strings always use double quotes. Dicts become JSON objects, and lists and tuples become JSON arrays.</p>
<h3>Pretty output with <code>indent</code></h3>
<p>For files that people will read, pass <code>indent</code> to put each item on its own line. <code>sort_keys=True</code> orders the keys alphabetically.</p>
<pre class="code" data-run>import json

chart = {"star": "Vega", "planets": [1, 2]}
print(json.dumps(chart, indent=2, sort_keys=True))</pre>
<h3>JSON to Python: <code>json.loads()</code></h3>
<p><code>loads</code> means "load from string". It parses JSON text and builds Python objects.</p>
<pre class="code" data-run>import json

data = json.loads('{"name": "Vega", "light_years": 25.0, "visited": false}')
print(data)
print(data["name"], data["visited"])</pre>
<p>A round trip does not always give back exactly what you started with: JSON object keys are always strings, and tuples come back as lists.</p>
<pre class="code" data-run>import json

print(json.loads(json.dumps({1: "one"})))
print(json.loads(json.dumps((3, 4))))</pre>
<h3>Bad input</h3>
<p>If the text is not valid JSON, <code>loads</code> raises <code>json.JSONDecodeError</code>, which is a subclass of <code>ValueError</code>.</p>
<pre class="code" data-run>import json

try:
    json.loads("{'name': 'Vega'}")   # single quotes are not valid JSON
except ValueError:
    print("That is not valid JSON")</pre>
<h3>Files: <code>dump()</code> and <code>load()</code></h3>
<p>Without the <code>s</code>, the functions work directly with a file object:</p>
<pre class="code">import json

with open("ship.json", "w", encoding="utf-8") as f:
    json.dump(ship, f, indent=2)

with open("ship.json", encoding="utf-8") as f:
    ship = json.load(f)</pre>
<div class="tip"><strong>Tip</strong> Remember the pair by the letter s: <code>dumps</code>/<code>loads</code> work with strings, <code>dump</code>/<code>load</code> work with files.</div>`,
      quiz: [
        { q: `What does <code>json.dumps({"ok": True, "x": None})</code> return?`,
          options: [`'{"ok": True, "x": None}'`, `{'ok': True, 'x': None}`, `'{"ok": true, "x": null}'`, `'{ok: true, x: null}'`],
          answer: 2,
          explain: "dumps returns a string in JSON syntax, where True is written true and None is written null. Keys keep their double quotes." },
        { q: `What does this print?<pre class="code">import json
data = json.loads('[1, 2, {"a": false}]')
print(data[2]["a"])</pre>`,
          options: ["false", "0", "An error", "False"],
          answer: 3,
          explain: "loads builds Python objects, so the JSON value false becomes the Python value False." },
        { q: `Which function writes JSON straight into an open file object?`,
          options: ["json.dump", "json.dumps", "json.load", "json.loads"],
          answer: 0,
          explain: "json.dump(obj, f) writes to a file. dumps returns a string; load and loads read JSON." }
      ],
      challenge: {
        title: "Star Chart Decoder",
        prompt: `<p>The navigation computer sends star charts as JSON. Write two functions:</p>
<ul>
  <li><code>nearest_star(json_text)</code>: the text is a JSON array of objects, each with a <code>"name"</code> and a <code>"distance"</code>. Return the <strong>name</strong> of the star with the smallest distance.</li>
  <li><code>encode_star(name, distance)</code>: return JSON text for the object <code>{"name": name, "distance": distance}</code> (keys in that order), formatted with <code>indent=2</code>.</li>
</ul>
<pre class="code">nearest_star('[{"name": "Vega", "distance": 25.0}, {"name": "Sirius", "distance": 8.6}]')
# 'Sirius'</pre>`,
        starter: `import json


def nearest_star(json_text):
    stars = json.loads(json_text)
    # Find the closest star
    return ""


def encode_star(name, distance):
    return ""
`,
        tests: [
          { name: "nearest_star finds Sirius", code: `assert nearest_star('[{"name": "Vega", "distance": 25.0}, {"name": "Sirius", "distance": 8.6}]') == "Sirius"` },
          { name: "nearest_star works in any order", code: `assert nearest_star('[{"name": "Proxima", "distance": 4.2}, {"name": "Altair", "distance": 16.7}, {"name": "Deneb", "distance": 2600}]') == "Proxima"` },
          { name: "encode_star produces valid JSON", code: `import json
assert json.loads(encode_star("Altair", 16.7)) == {"name": "Altair", "distance": 16.7}` },
          { name: "encode_star uses indent=2", code: `assert encode_star("Altair", 16.7).splitlines() == ['{', '  "name": "Altair",', '  "distance": 16.7', '}']` }
        ],
        hints: [
          "json.loads gives you a list of dicts. Keep track of the best star seen so far while looping.",
          "Compare star[\"distance\"] values; remember the whole star (or its name) when you find a smaller one.",
          "For encode_star, build the dict and pass indent=2 to json.dumps."
        ],
        solution: `import json


def nearest_star(json_text):
    stars = json.loads(json_text)
    best = stars[0]
    for star in stars:
        if star["distance"] < best["distance"]:
            best = star
    return best["name"]


def encode_star(name, distance):
    return json.dumps({"name": name, "distance": distance}, indent=2)
`
      }
    },
    {
      id: "m11-l3",
      title: "CSV Manifests and Paths",
      minutes: 10,
      sources: [
        { label: "csv: CSV File Reading and Writing",
          url: "https://docs.python.org/3/library/csv.html" },
        { label: "pathlib: Object-oriented filesystem paths",
          url: "https://docs.python.org/3/library/pathlib.html" }
      ],
      body: `<p><strong>CSV</strong> (comma-separated values) is the plain-text format spreadsheets use: one row per line, with fields separated by commas. Splitting on commas yourself breaks as soon as a field contains a comma, so use the <code>csv</code> module, which also understands quoted fields.</p>
<h3>Reading rows</h3>
<p><code>csv.reader</code> takes a text file (or a <code>StringIO</code>) and gives you each row as a list of strings.</p>
<pre class="code" data-run>import csv
import io

data = io.StringIO("""item,qty,dock
fuel cells,12,A
"rations, dried",40,B
""")
for row in csv.reader(data):
    print(row)</pre>
<p>The quoted field <code>"rations, dried"</code> stays in one piece. Every value is a string, so convert numbers yourself with <code>int()</code> or <code>float()</code>.</p>
<h3>Rows as dictionaries</h3>
<p><code>csv.DictReader</code> uses the first row as field names and gives each following row as a dict.</p>
<pre class="code" data-run>import csv
import io

data = io.StringIO("""item,qty
fuel cells,12
rations,40
""")
total = 0
for row in csv.DictReader(data):
    print(row["item"], "->", row["qty"])
    total += int(row["qty"])
print("Total units:", total)</pre>
<h3>Writing rows</h3>
<p><code>csv.writer</code> adds quotes where needed. By default it ends rows with <code>\\r\\n</code>; here <code>lineterminator="\\n"</code> keeps the printed output tidy.</p>
<pre class="code" data-run>import csv
import io

out = io.StringIO()
writer = csv.writer(out, lineterminator="\\n")
writer.writerow(["ship", "port"])
writer.writerow(["Nova", "Luna, Dock 3"])
print(out.getvalue())</pre>
<p>With a real file, the documentation recommends opening it with <code>newline=""</code> and letting the csv module handle line endings:</p>
<pre class="code">with open("cargo.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row)</pre>
<h3>Paths with <code>pathlib</code></h3>
<p>The <code>pathlib</code> module represents file paths as objects instead of plain strings. The <code>/</code> operator joins parts, and attributes pull a path apart.</p>
<pre class="code" data-run>from pathlib import PurePosixPath

p = PurePosixPath("/missions/apollo/log.txt")
print(p.name, p.stem, p.suffix)
print(p.parent)
print(p.parent / "photos" / "moon.png")
print(p.with_suffix(".csv"))</pre>
<p>"Pure" paths only do calculations and never touch the disk. On your own computer you will usually use <code>Path</code>, which can also check and read files:</p>
<pre class="code">from pathlib import Path

archive = Path("archive")
log = archive / "log.txt"
if log.exists():
    text = log.read_text(encoding="utf-8")
log.write_text("All systems go\\n", encoding="utf-8")</pre>
<div class="tip"><strong>Tip</strong> Use <code>pathlib</code> to build paths instead of gluing strings together; it uses the right separator for the operating system.</div>`,
      quiz: [
        { q: `Why use the <code>csv</code> module instead of <code>line.split(",")</code>?`,
          options: ["split() cannot handle numbers", "csv is the only way to read text files", "csv correctly handles quoted fields that contain commas", "split() removes the newline"],
          answer: 2,
          explain: "A field such as \"rations, dried\" contains a comma. split would cut it in two; the csv module respects the quotes." },
        { q: `What type are the values in each row from <code>csv.reader</code>?`,
          options: ["Strings", "Whatever type they look like", "Integers", "Bytes"],
          answer: 0,
          explain: "The csv module does not guess types. Every field is a str, so convert with int() or float() when needed." },
        { q: `What does this print?<pre class="code">from pathlib import PurePosixPath
print(PurePosixPath("/data/stars.json").suffix)</pre>`,
          options: ["stars", "json", "/data", ".json"],
          answer: 3,
          explain: "suffix is the final extension including the dot. stem would be 'stars' and parent would be /data." }
      ],
      challenge: {
        title: "Cargo Manifest Tally",
        prompt: `<p>The dockmaster sends the cargo manifest as CSV text with the header <code>item,qty</code>. The same item can appear on several rows. Write <code>cargo_totals(csv_text)</code> that returns a dict mapping each item to its <strong>total</strong> quantity as an <code>int</code>.</p>
<pre class="code">cargo_totals("item,qty\\nfuel,5\\nwater,3\\nfuel,2\\n")
# {'fuel': 7, 'water': 3}</pre>
<p>Use the <code>csv</code> module (item names may contain quoted commas) and <code>io.StringIO</code> to treat the text as a file.</p>`,
        starter: `import csv
import io


def cargo_totals(csv_text):
    totals = {}
    # Read csv_text with csv.DictReader
    return totals
`,
        tests: [
          { name: "Totals a simple manifest", code: `assert cargo_totals("item,qty\\nfuel,5\\nwater,3\\n") == {"fuel": 5, "water": 3}` },
          { name: "Adds up repeated items", code: `assert cargo_totals("item,qty\\nfuel,5\\nwater,3\\nfuel,2\\n") == {"fuel": 7, "water": 3}` },
          { name: "Handles quoted names with commas", code: `assert cargo_totals('item,qty\\n"rations, dried",40\\nseeds,1\\n') == {"rations, dried": 40, "seeds": 1}` },
          { name: "Header only gives an empty dict", code: `assert cargo_totals("item,qty\\n") == {}` }
        ],
        hints: [
          "csv.DictReader(io.StringIO(csv_text)) gives one dict per row, like {'item': 'fuel', 'qty': '5'}.",
          "Quantities arrive as strings: convert with int().",
          "totals.get(item, 0) gives the running total so far."
        ],
        solution: `import csv
import io


def cargo_totals(csv_text):
    totals = {}
    for row in csv.DictReader(io.StringIO(csv_text)):
        item = row["item"]
        totals[item] = totals.get(item, 0) + int(row["qty"])
    return totals
`
      }
    }
  ],
  boss: {
    title: "Boss: The Archive Converter",
    prompt: `<p>The fleet archive is stored as CSV, but the new star base only accepts JSON. Build the converter.</p>
<ul>
  <li><code>csv_to_json(csv_text)</code>: the CSV has the header <code>ship,fuel,crew</code>. Return JSON text for a <strong>list</strong> of objects, one per row, with keys <code>"ship"</code> (a string), <code>"fuel"</code> and <code>"crew"</code> (both <code>int</code>). Format it with <code>indent=2</code>.</li>
  <li><code>fleet_fuel(json_text)</code>: take JSON text in that format and return the total fuel of all ships (<code>0</code> for an empty list).</li>
</ul>
<pre class="code">text = csv_to_json("ship,fuel,crew\\nNova,80,4\\nVega,50,2\\n")
fleet_fuel(text)   # 130</pre>`,
    starter: `import csv
import io
import json


def csv_to_json(csv_text):
    ships = []
    # Read each row and build a dict with int values
    return json.dumps(ships)


def fleet_fuel(json_text):
    return 0
`,
    tests: [
      { name: "Converts rows into a list of dicts", code: `import json
assert json.loads(csv_to_json("ship,fuel,crew\\nNova,80,4\\nVega,50,2\\n")) == [{"ship": "Nova", "fuel": 80, "crew": 4}, {"ship": "Vega", "fuel": 50, "crew": 2}]` },
      { name: "Uses indent=2", code: `assert csv_to_json("ship,fuel,crew\\nNova,80,4\\n").splitlines()[:3] == ["[", "  {", '    "ship": "Nova",']` },
      { name: "An empty archive gives an empty list", code: `import json
assert json.loads(csv_to_json("ship,fuel,crew\\n")) == []` },
      { name: "fleet_fuel adds up the fuel", code: `assert fleet_fuel(csv_to_json("ship,fuel,crew\\nNova,80,4\\nVega,50,2\\nOrion,7,1\\n")) == 137` },
      { name: "fleet_fuel of an empty fleet is 0", code: `assert fleet_fuel("[]") == 0` }
    ],
    hints: [
      "csv.DictReader(io.StringIO(csv_text)) gives rows like {'ship': 'Nova', 'fuel': '80', 'crew': '4'}.",
      "Build a new dict per row with int(row['fuel']) and int(row['crew']), append it, then json.dumps(ships, indent=2).",
      "fleet_fuel: json.loads the text and add up ship['fuel'] in a loop."
    ],
    solution: `import csv
import io
import json


def csv_to_json(csv_text):
    ships = []
    for row in csv.DictReader(io.StringIO(csv_text)):
        ships.append({
            "ship": row["ship"],
            "fuel": int(row["fuel"]),
            "crew": int(row["crew"]),
        })
    return json.dumps(ships, indent=2)


def fleet_fuel(json_text):
    total = 0
    for ship in json.loads(json_text):
        total += ship["fuel"]
    return total
`
  }
});
