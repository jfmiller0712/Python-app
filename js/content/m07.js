registerModule({
  id: "m07",
  order: 7,
  name: "Star Charts",
  topic: "Dictionaries and sets",
  blurb: "Map names to values with dictionaries, chart nested data, count anything, and compare groups with sets.",
  lessons: [
    {
      id: "m07-l1",
      title: "Charting with Dictionaries",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 5. Data Structures (Dictionaries)",
          url: "https://docs.python.org/3/tutorial/datastructures.html" },
        { label: "Built-in Types: Mapping Types (dict)",
          url: "https://docs.python.org/3/builtins/stdtypes.html" }
      ],
      body: `<p>A list finds items by position. A <strong>dictionary</strong> (type <code>dict</code>) finds values by a <strong>key</strong> you choose, such as a name. Each entry is a <em>key: value</em> pair, written inside curly braces.</p>
<pre class="code" data-run>planet = {"name": "Mars", "moons": 2, "rocky": True}
print(planet["name"])
print(planet["moons"])
print(len(planet))     # number of pairs
empty = {}</pre>
<p>Keys must be unique and immutable: strings, numbers and tuples are common keys; lists cannot be keys. Values can be anything. Dictionaries remember the order in which keys were added.</p>
<h3>Missing keys and get()</h3>
<p>Looking up a key that is not there, like <code>planet["rings"]</code>, raises a <code>KeyError</code>. Check first with <code>in</code>, or use <code>get()</code>, which returns <code>None</code> (or a default you provide) instead of failing.</p>
<pre class="code" data-run>planet = {"name": "Mars", "moons": 2}
print("rings" in planet)          # False: in checks keys
print(planet.get("rings"))        # None
print(planet.get("rings", 0))     # 0
print(planet.get("moons", 0))     # 2</pre>
<h3>Adding, changing and deleting</h3>
<p>Assigning to a key adds it if it is new or replaces its value if it exists. <code>update()</code> copies in several pairs at once. <code>del</code> removes a key, and <code>pop()</code> removes a key and returns its value.</p>
<pre class="code" data-run>crew = {"Ada": "pilot", "Lin": "engineer"}
crew["Sol"] = "medic"            # add
crew["Lin"] = "navigator"        # change
crew.update({"Max": "cook", "Ada": "captain"})
print(crew)
del crew["Max"]
role = crew.pop("Sol")
print(role, crew)</pre>
<h3>Keys, values and items</h3>
<p><code>keys()</code>, <code>values()</code> and <code>items()</code> give views of the dictionary's contents. Looping over a dict directly gives its keys. Looping over <code>items()</code> gives (key, value) tuples that you can unpack.</p>
<pre class="code" data-run>fuel = {"Comet": 70, "Nova": 45, "Pulsar": 90}
print(list(fuel.keys()))
print(list(fuel.values()))
for ship in fuel:
    print(ship)
for ship, level in fuel.items():
    print(ship, "has", level, "units")
print(sum(fuel.values()))</pre>
<div class="tip"><strong>Tip</strong> Use a dictionary whenever you find yourself thinking "look up X by its name". It is much faster and clearer than searching a list each time.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">d = {"a": 1, "b": 2}
d["a"] = 5
print(d)</pre>`,
          options: ["{'a': 1, 'b': 2, 'a': 5}", "{'a': 5, 'b': 2}", "{'a': 1, 'b': 2}", "An error"],
          answer: 1,
          explain: "Keys are unique. Assigning to an existing key replaces its value." },
        { q: `What does <code>{"x": 1}.get("y", 0)</code> return?`,
          options: ["None", "An error", "0", "1"],
          answer: 2,
          explain: "get() returns the default (0 here) when the key is missing, instead of raising KeyError." },
        { q: `What does <code>"Mars" in {"name": "Mars"}</code> evaluate to?`,
          options: ["False", "True", "\"name\"", "An error"],
          answer: 0,
          explain: "The in operator checks a dictionary's keys, not its values. The only key is 'name'." },
        { q: `Which of these can NOT be a dictionary key?`,
          options: ["\"Vega\"", "42", "(1, 2)", "[1, 2]"],
          answer: 3,
          explain: "Keys must be immutable (hashable). Lists can change, so they cannot be keys; tuples can." }
      ],
      challenge: {
        title: "Crew Roster Update",
        prompt: `<p>The station's roster is a dictionary of name to role:</p>
<pre class="code">crew = {"Ada": "pilot", "Lin": "engineer", "Rex": "cook"}</pre>
<p>Update it for the next mission:</p>
<ul>
  <li>Add <code>"Sol"</code> as <code>"medic"</code>.</li>
  <li>Change Lin's role to <code>"navigator"</code>.</li>
  <li>Rex is leaving: remove him with <code>pop()</code> and store his role in <code>old_role</code>.</li>
  <li>Use <code>get()</code> to store Max's role in <code>max_role</code>, defaulting to <code>"unassigned"</code> (Max is not on the roster).</li>
  <li>Print one line per crew member, like <code>Ada: pilot</code>.</li>
</ul>`,
        starter: `crew = {"Ada": "pilot", "Lin": "engineer", "Rex": "cook"}\n\n# Write your code below\n`,
        tests: [
          { name: "crew is {'Ada': 'pilot', 'Lin': 'navigator', 'Sol': 'medic'}", code: `assert crew == {"Ada": "pilot", "Lin": "navigator", "Sol": "medic"}` },
          { name: "old_role is 'cook'", code: `assert old_role == "cook"` },
          { name: "max_role is 'unassigned'", code: `assert max_role == "unassigned"` },
          { name: "Prints a 'name: role' line for each member", code: `lines = [l.strip() for l in __output__.splitlines()]
assert "Ada: pilot" in lines and "Lin: navigator" in lines and "Sol: medic" in lines` }
        ],
        hints: ["crew['Sol'] = 'medic' both adds and changes keys.", "crew.pop('Rex') removes the key and returns its value; crew.get('Max', 'unassigned') never fails.", "Loop with 'for name, role in crew.items():' and use an f-string."],
        solution: `crew = {"Ada": "pilot", "Lin": "engineer", "Rex": "cook"}
crew["Sol"] = "medic"
crew["Lin"] = "navigator"
old_role = crew.pop("Rex")
max_role = crew.get("Max", "unassigned")
for name, role in crew.items():
    print(f"{name}: {role}")`
      }
    },
    {
      id: "m07-l2",
      title: "Nested Data and Counting",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 5. Data Structures (Looping Techniques)",
          url: "https://docs.python.org/3/tutorial/datastructures.html" },
        { label: "Built-in Types: Mapping Types (dict)",
          url: "https://docs.python.org/3/builtins/stdtypes.html" }
      ],
      body: `<p>Real data is rarely a single flat list. Lists and dictionaries can be nested inside each other to describe almost anything.</p>
<h3>A list of dictionaries</h3>
<p>A very common shape is a list where each item is a dictionary describing one record, like rows in a table.</p>
<pre class="code" data-run>ships = [
    {"name": "Comet", "speed": 7, "crew": 3},
    {"name": "Nova", "speed": 9, "crew": 5},
    {"name": "Drift", "speed": 4, "crew": 2},
]
print(ships[1]["name"])          # Nova
for ship in ships:
    if ship["speed"] &gt; 5:
        print(ship["name"], "is fast")
total_crew = sum([s["crew"] for s in ships])
print("Total crew:", total_crew)</pre>
<p>Read <code>ships[1]["name"]</code> from left to right: take item 1 of the list (a dict), then its <code>"name"</code> value.</p>
<h3>A dictionary of lists</h3>
<p>The other common shape groups items under a key.</p>
<pre class="code" data-run>sectors = {"north": ["Vega", "Deneb"], "south": ["Canopus"]}
sectors["south"].append("Achernar")
for sector, stars in sectors.items():
    print(sector, len(stars), stars)</pre>
<h3>Counting with a dictionary</h3>
<p>Dictionaries are perfect for counting. Use each thing as a key and its count as the value. The pattern <code>counts.get(key, 0) + 1</code> works whether or not the key exists yet.</p>
<pre class="code" data-run>signal = "ping beep ping pong ping beep"
counts = {}
for word in signal.split():
    counts[word] = counts.get(word, 0) + 1
print(counts)</pre>
<p>To find the most common item, loop over the counts and remember the best one seen so far:</p>
<pre class="code" data-run>counts = {"ping": 3, "beep": 2, "pong": 1}
best = None
for word, n in counts.items():
    if best is None or n &gt; counts[best]:
        best = word
print("Most common:", best)</pre>
<h3>Grouping</h3>
<p>Grouping is counting's cousin: instead of adding 1, append to a list. Create the list the first time you see a key.</p>
<pre class="code" data-run>visits = [("Mars", "Ada"), ("Ceres", "Lin"), ("Mars", "Sol")]
by_planet = {}
for planet, name in visits:
    if planet not in by_planet:
        by_planet[planet] = []
    by_planet[planet].append(name)
print(by_planet)</pre>
<div class="tip"><strong>Tip</strong> When nested data gets confusing, <code>print()</code> one level at a time: the whole thing, then one item, then one value inside that item.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">data = [{"id": 1, "tags": ["a", "b"]}, {"id": 2, "tags": ["c"]}]
print(data[0]["tags"][1])</pre>`,
          options: ["a", "c", "1", "b"],
          answer: 3,
          explain: "data[0] is the first dict, ['tags'] is its list ['a', 'b'], and [1] is 'b'." },
        { q: `After this code, what is <code>counts</code>?<pre class="code">counts = {}
for c in "abca":
    counts[c] = counts.get(c, 0) + 1</pre>`,
          options: ["{'a': 2, 'b': 1, 'c': 1}", "{'a': 1, 'b': 1, 'c': 1}", "{'abca': 1}", "An error because the keys start missing"],
          answer: 0,
          explain: "get(c, 0) returns 0 for a new key, so each letter starts at 1; 'a' is seen twice." },
        { q: `Which expression gets the total crew from <code>ships</code>, a list of dicts that each have a "crew" key?`,
          options: ["ships[\"crew\"]", "sum([s[\"crew\"] for s in ships])", "sum(ships)", "ships.crew"],
          answer: 1,
          explain: "ships is a list, so it has no 'crew' key itself. You loop over the dicts and add up each one's 'crew' value." }
      ],
      challenge: {
        title: "Planet Visit Tally",
        prompt: `<p>The ship's log lists every planet visited this year, in order:</p>
<pre class="code">log = ["Mars", "Ceres", "Mars", "Europa", "Mars", "Ceres"]</pre>
<ul>
  <li>Build a dictionary <code>visits</code> that maps each planet to how many times it appears.</li>
  <li>Store the most visited planet's name in <code>favorite</code> (use a loop, do not type the answer).</li>
  <li>Print one line per planet like <code>Mars: 3</code>.</li>
</ul>`,
        starter: `log = ["Mars", "Ceres", "Mars", "Europa", "Mars", "Ceres"]\n\n# Write your code below\nvisits = {}\n`,
        tests: [
          { name: "visits counts each planet", code: `assert visits == {"Mars": 3, "Ceres": 2, "Europa": 1}` },
          { name: "favorite is 'Mars'", code: `assert favorite == "Mars"` },
          { name: "Prints 'Mars: 3', 'Ceres: 2' and 'Europa: 1'", code: `lines = [l.strip() for l in __output__.splitlines()]
assert "Mars: 3" in lines and "Ceres: 2" in lines and "Europa: 1" in lines` }
        ],
        hints: ["Inside a loop over log: visits[planet] = visits.get(planet, 0) + 1", "For favorite, start with None and replace it whenever you find a planet with a bigger count.", "Loop over visits.items() to print each line."],
        solution: `log = ["Mars", "Ceres", "Mars", "Europa", "Mars", "Ceres"]
visits = {}
for planet in log:
    visits[planet] = visits.get(planet, 0) + 1
favorite = None
for planet, n in visits.items():
    if favorite is None or n > visits[favorite]:
        favorite = planet
for planet, n in visits.items():
    print(f"{planet}: {n}")`
      }
    },
    {
      id: "m07-l3",
      title: "Sets and Dict Comprehensions",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 5. Data Structures (Sets; Dictionaries)",
          url: "https://docs.python.org/3/tutorial/datastructures.html" },
        { label: "Built-in Types: Set Types (set, frozenset)",
          url: "https://docs.python.org/3/builtins/stdtypes.html" }
      ],
      body: `<p>A <strong>set</strong> is an unordered collection of <em>unique</em> items. Write it with curly braces, or build one with <code>set()</code>. Duplicates simply disappear.</p>
<pre class="code" data-run>signals = {"ping", "beep", "ping", "pong"}
print(len(signals))            # 3, the duplicate is gone
ids = set([4, 1, 4, 2, 1])
print(sorted(ids))             # [1, 2, 4]
empty = set()                  # {} would be an empty dict!</pre>
<p>Because sets have no order, they cannot be indexed, and printing one may show the items in any order. Wrap a set in <code>sorted()</code> when you need a predictable order.</p>
<h3>Adding, removing and membership</h3>
<pre class="code" data-run>visited = {"Mars"}
visited.add("Ceres")
visited.add("Mars")            # already there, nothing changes
visited.discard("Pluto")       # no error if missing
visited.remove("Ceres")        # KeyError if missing
print(visited, "Mars" in visited)</pre>
<p>Checking <code>x in some_set</code> is very fast, even for huge sets, which makes sets great for "have I seen this before?" questions.</p>
<h3>Set operations</h3>
<p>Sets support the operations you may know from maths:</p>
<ul>
  <li><code>a | b</code> union: items in either set (<code>a.union(b)</code>)</li>
  <li><code>a &amp; b</code> intersection: items in both (<code>a.intersection(b)</code>)</li>
  <li><code>a - b</code> difference: items in <code>a</code> but not <code>b</code> (<code>a.difference(b)</code>)</li>
  <li><code>a ^ b</code> symmetric difference: items in exactly one of them</li>
</ul>
<pre class="code" data-run>alpha = {"Ada", "Lin", "Sol"}
beta = {"Lin", "Max", "Sol"}
print(sorted(alpha | beta))
print(sorted(alpha &amp; beta))
print(sorted(alpha - beta))
print(sorted(alpha ^ beta))
print({"Ada"} &lt;= alpha)        # subset test</pre>
<h3>Dict and set comprehensions</h3>
<p>Comprehensions also build dictionaries and sets. A dict comprehension uses <code>key: value</code> before the <code>for</code>.</p>
<pre class="code" data-run>names = ["Vega", "Sol", "Rigel"]
lengths = {name: len(name) for name in names}
print(lengths)

fuel = {"Comet": 70, "Nova": 45, "Pulsar": 90}
low = {ship: lvl for ship, lvl in fuel.items() if lvl &lt; 60}
print(low)

initials = {name[0] for name in names}
print(sorted(initials))</pre>
<div class="tip"><strong>Tip</strong> A quick way to remove duplicates from a list is <code>list(set(items))</code>, but it loses the original order. Use <code>sorted(set(items))</code> if a sorted result is fine.</div>`,
      quiz: [
        { q: `What does <code>len({1, 2, 2, 3, 3, 3})</code> return?`,
          options: ["6", "1", "3", "An error"],
          answer: 2,
          explain: "A set keeps only unique items, so it holds 1, 2 and 3." },
        { q: `What type of object does <code>x = {}</code> create?`,
          options: ["An empty dict", "An empty set", "An empty list", "An empty tuple"],
          answer: 0,
          explain: "Empty curly braces make an empty dictionary. Use set() for an empty set." },
        { q: `What does this print?<pre class="code">a = {1, 2, 3}
b = {2, 3, 4}
print(sorted(a - b))</pre>`,
          options: ["[4]", "[2, 3]", "[1, 4]", "[1]"],
          answer: 3,
          explain: "a - b keeps the items in a that are not in b. Only 1 qualifies." },
        { q: `What does <code>{n: n * n for n in range(3)}</code> produce?`,
          options: ["[0, 1, 4]", "{0: 0, 1: 1, 2: 4}", "{0, 1, 4}", "{1: 1, 2: 4, 3: 9}"],
          answer: 1,
          explain: "The key: value form makes a dict; range(3) gives 0, 1, 2, each mapped to its square." }
      ],
      challenge: {
        title: "Joint Mission Skills",
        prompt: `<p>Two crews are merging for a joint mission. Their skills are:</p>
<pre class="code">alpha = ["piloting", "repair", "cooking", "repair", "navigation"]
beta = ["navigation", "medicine", "piloting"]</pre>
<ul>
  <li>Make sets <code>a</code> and <code>b</code> from the two lists.</li>
  <li><code>shared</code>: skills both crews have. <code>combined</code>: every skill either crew has. <code>only_alpha</code>: skills only alpha has.</li>
  <li>Use a dict comprehension to make <code>skill_lengths</code>, mapping each skill in <code>combined</code> to the length of its name.</li>
</ul>`,
        starter: `alpha = ["piloting", "repair", "cooking", "repair", "navigation"]\nbeta = ["navigation", "medicine", "piloting"]\n\n# Write your code below\n`,
        tests: [
          { name: "a and b are sets of each crew's skills", code: `assert a == {"piloting", "repair", "cooking", "navigation"} and b == {"navigation", "medicine", "piloting"}` },
          { name: "shared is {'piloting', 'navigation'}", code: `assert shared == {"piloting", "navigation"}` },
          { name: "combined has all 5 skills and only_alpha is {'repair', 'cooking'}", code: `assert combined == {"piloting", "repair", "cooking", "navigation", "medicine"}
assert only_alpha == {"repair", "cooking"}` },
          { name: "skill_lengths maps each skill to its length", code: `assert skill_lengths == {"piloting": 8, "repair": 6, "cooking": 7, "navigation": 10, "medicine": 8}` }
        ],
        hints: ["set(alpha) removes the duplicate 'repair'.", "Use &, | and - between the two sets.", "A dict comprehension looks like {key: value for item in collection}."],
        solution: `alpha = ["piloting", "repair", "cooking", "repair", "navigation"]
beta = ["navigation", "medicine", "piloting"]
a = set(alpha)
b = set(beta)
shared = a & b
combined = a | b
only_alpha = a - b
skill_lengths = {skill: len(skill) for skill in combined}`
      }
    }
  ],
  boss: {
    title: "Boss: Galactic Census",
    prompt: `<p>Mission briefing: the survey fleet has returned with data on nearby star systems.</p>
<pre class="code">systems = [
    {"name": "Vega", "sector": "north", "planets": 3},
    {"name": "Rigel", "sector": "south", "planets": 7},
    {"name": "Deneb", "sector": "north", "planets": 5},
    {"name": "Sirius", "sector": "east", "planets": 2},
    {"name": "Altair", "sector": "south", "planets": 6},
]</pre>
<p>Compile the census:</p>
<ul>
  <li><code>sectors</code>: a set of all sector names.</li>
  <li><code>by_sector</code>: a dict mapping each sector to a list of its system names, in the order they appear.</li>
  <li><code>planet_totals</code>: a dict mapping each sector to its total number of planets.</li>
  <li><code>rich</code>: a dict comprehension mapping system name to planet count, only for systems with 5 or more planets.</li>
  <li>Print one line per sector, in alphabetical order, like <code>north: 8 planets</code>.</li>
</ul>`,
    starter: `systems = [
    {"name": "Vega", "sector": "north", "planets": 3},
    {"name": "Rigel", "sector": "south", "planets": 7},
    {"name": "Deneb", "sector": "north", "planets": 5},
    {"name": "Sirius", "sector": "east", "planets": 2},
    {"name": "Altair", "sector": "south", "planets": 6},
]

# Write your code below
`,
    tests: [
      { name: "sectors is {'north', 'south', 'east'}", code: `assert sectors == {"north", "south", "east"}` },
      { name: "by_sector groups names by sector", code: `assert by_sector == {"north": ["Vega", "Deneb"], "south": ["Rigel", "Altair"], "east": ["Sirius"]}` },
      { name: "planet_totals adds planets per sector", code: `assert planet_totals == {"north": 8, "south": 13, "east": 2}` },
      { name: "rich has Rigel, Deneb and Altair", code: `assert rich == {"Rigel": 7, "Deneb": 5, "Altair": 6}` },
      { name: "Prints sector lines in alphabetical order", code: `lines = [l.strip() for l in __output__.splitlines() if l.strip()]
assert lines[-3:] == ["east: 2 planets", "north: 8 planets", "south: 13 planets"]` }
    ],
    hints: ["A set comprehension {s['sector'] for s in systems} collects the sectors.", "For by_sector and planet_totals, loop once over systems; create a sector's list (or 0 total) the first time you see it.", "for sector in sorted(planet_totals): prints in alphabetical order."],
    solution: `systems = [
    {"name": "Vega", "sector": "north", "planets": 3},
    {"name": "Rigel", "sector": "south", "planets": 7},
    {"name": "Deneb", "sector": "north", "planets": 5},
    {"name": "Sirius", "sector": "east", "planets": 2},
    {"name": "Altair", "sector": "south", "planets": 6},
]
sectors = {s["sector"] for s in systems}
by_sector = {}
planet_totals = {}
for s in systems:
    sector = s["sector"]
    if sector not in by_sector:
        by_sector[sector] = []
    by_sector[sector].append(s["name"])
    planet_totals[sector] = planet_totals.get(sector, 0) + s["planets"]
rich = {s["name"]: s["planets"] for s in systems if s["planets"] >= 5}
for sector in sorted(planet_totals):
    print(f"{sector}: {planet_totals[sector]} planets")`
  }
});
