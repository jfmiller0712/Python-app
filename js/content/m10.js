registerModule({
  id: "m10",
  order: 10,
  name: "Module Stations",
  topic: "Modules, the standard library and packages",
  blurb: "Dock with Python's standard library, split your code into modules, and install packages in a virtual environment.",
  lessons: [
    {
      id: "m10-l1",
      title: "Docking with import",
      minutes: 8,
      sources: [
        { label: "The Python Tutorial, 6. Modules",
          url: "https://docs.python.org/3/tutorial/modules.html" },
        { label: "math: Mathematical functions",
          url: "https://docs.python.org/3/library/math.html" },
        { label: "The Python Language Reference, 7. Simple statements (The import statement)",
          url: "https://docs.python.org/3/reference/simple_stmts.html" }
      ],
      body: `<p>A <strong>module</strong> is a file of Python code (functions, variables and more) that other code can use. Python ships with hundreds of them in its <strong>standard library</strong>. To use one, you <code>import</code> it.</p>
<h3>import module</h3>
<p>The plain form gives you the module as one name. You reach its contents with a dot.</p>
<pre class="code" data-run>import math

print(math.sqrt(144))
print(math.pi)
print(math.floor(7.8), math.ceil(7.2))
print(math.hypot(3, 4))</pre>
<p>The dot makes it obvious where each name comes from, which is why this is the most common form.</p>
<h3>from module import name</h3>
<p>This form copies specific names into your program so you can use them without the module prefix.</p>
<pre class="code" data-run>from math import sqrt, pi

print(sqrt(81))
print(round(2 * pi * 3, 2))</pre>
<h3>Renaming with as</h3>
<p><code>as</code> gives a module or a name a different (often shorter) name in your code. It is handy for long names or to avoid a clash with one of your own variables.</p>
<pre class="code" data-run>import math as m
from math import factorial as fact

print(m.gcd(12, 18))
print(fact(5))</pre>
<div class="warn"><strong>Watch out</strong> <code>from math import *</code> imports every public name at once. It is allowed, but it makes it hard to tell where a name came from and can silently replace your own variables. Avoid it in programs.</div>
<h3>Exploring a module</h3>
<p><code>dir(module)</code> lists the names a module provides, and the Library Reference on docs.python.org documents every standard module. Imports normally go at the top of a file, one per line.</p>
<pre class="code" data-run>import math
names = [n for n in dir(math) if not n.startswith("_")]
print(len(names), "names, for example:", names[:6])</pre>
<h3>Where do modules come from?</h3>
<ul>
  <li><strong>Built into Python</strong>: the standard library, such as <code>math</code>, <code>random</code> and <code>datetime</code>. Always available.</li>
  <li><strong>Your own files</strong>: any <code>.py</code> file you write can be imported (next lessons).</li>
  <li><strong>Third-party packages</strong>: code other people publish, installed with <code>pip</code>.</li>
</ul>
<p>When you import a module, Python runs its code once and remembers the result, so importing the same module again is cheap.</p>
<div class="tip"><strong>Tip</strong> Never name your own file after a module you use, such as <code>math.py</code> or <code>random.py</code>. Python finds your file first and the real module stops working.</div>`,
      quiz: [
        { q: `After <code>from math import sqrt</code>, which call works?`,
          options: ["math.sqrt(9)", "sqrt(9)", "both", "neither"],
          answer: 1,
          explain: "This form imports only the name sqrt. The name math itself is not defined unless you also write import math." },
        { q: `What does <code>import random as rnd</code> do?`,
          options: ["Imports random and makes it available as rnd", "Imports a module called rnd", "Renames the random module file on disk", "Imports only one random function"],
          answer: 0,
          explain: "as only changes the name used in your code. The module is still random." },
        { q: `Why is <code>from module import *</code> discouraged?`,
          options: ["It is a syntax error", "It is slower to type", "It makes it unclear where names come from and can overwrite your own names", "It imports nothing"],
          answer: 2,
          explain: "Star imports dump many names into your program at once, hiding their origin and risking clashes." }
      ],
      challenge: {
        title: "Navigation Math Uplink",
        prompt: `<p>Connect to the <code>math</code> module three different ways and use each one:</p>
<ul>
  <li>Use <code>import math</code> and store <code>math.sqrt(144)</code> in <code>root</code>.</li>
  <li>Use <code>from math import ceil</code>. Crates hold 10 units each; store the number of crates needed for 53 units, <code>ceil(53 / 10)</code>, in <code>crates</code>.</li>
  <li>Use <code>from math import pi as PI</code> and store the area of a circular landing pad with radius 5 (<code>PI * 5 ** 2</code>) in <code>pad_area</code>.</li>
  <li>Print all three values.</li>
</ul>`,
        starter: `# Write your imports and code below\n`,
        tests: [
          { name: "root is 12.0", code: `assert root == 12.0` },
          { name: "ceil was imported directly and crates is 6", code: `assert crates == 6 and ceil(2.1) == 3` },
          { name: "PI is math.pi and pad_area is correct", code: `import math as _m
assert PI == _m.pi and abs(pad_area - _m.pi * 25) < 1e-9` },
          { name: "Prints the values", code: `assert "12.0" in __output__ and "6" in __output__` }
        ],
        hints: ["Put all three import lines at the top.", "After from math import ceil, call ceil(...) without math. in front.", "pi as PI means you write PI in your code."],
        solution: `import math
from math import ceil
from math import pi as PI

root = math.sqrt(144)
crates = ceil(53 / 10)
pad_area = PI * 5 ** 2
print(root, crates, pad_area)`
      }
    },
    {
      id: "m10-l2",
      title: "Standard Library Tour",
      minutes: 10,
      sources: [
        { label: "The Python Tutorial, 10. Brief Tour of the Standard Library",
          url: "https://docs.python.org/3/tutorial/stdlib.html" },
        { label: "random: Generate pseudo-random numbers",
          url: "https://docs.python.org/3/library/random.html" },
        { label: "datetime: Basic date and time types",
          url: "https://docs.python.org/3/library/datetime.html" },
        { label: "collections: Container datatypes (Counter)",
          url: "https://docs.python.org/3/library/collections.html" }
      ],
      body: `<p>Python is said to come with "batteries included". Here are four standard modules you will use again and again.</p>
<h3>random</h3>
<p><code>random</code> makes pseudo-random choices: useful for games, simulations and sampling.</p>
<pre class="code" data-run>import random

print(random.randint(1, 6))          # 1 to 6, both included
print(random.choice(["Vega", "Sol", "Rigel"]))
print(random.random())               # float from 0.0 up to (not including) 1.0
crew = ["Ada", "Lin", "Sol", "Max"]
random.shuffle(crew)                 # in place
print(crew)
print(random.sample(crew, 2))        # 2 different items</pre>
<p>"Pseudo-random" means the numbers come from a formula started by a <strong>seed</strong>. If you set the seed with <code>random.seed()</code>, the same sequence comes out every time. That makes programs that use randomness repeatable and testable.</p>
<pre class="code" data-run>import random

random.seed(42)
first = [random.randint(1, 100) for _ in range(3)]
random.seed(42)
again = [random.randint(1, 100) for _ in range(3)]
print(first, again, first == again)</pre>
<div class="warn"><strong>Watch out</strong> <code>random</code> is fine for games and simulations but not for passwords or security tokens. The <code>secrets</code> module exists for that.</div>
<h3>datetime</h3>
<p><code>datetime</code> handles dates and times. <code>date</code> holds a calendar day, and <code>timedelta</code> is a length of time you can add or subtract.</p>
<pre class="code" data-run>from datetime import date, timedelta

launch = date(2026, 3, 14)
arrival = launch + timedelta(days=30)
print(arrival)                        # 2026-04-13
print(arrival.year, arrival.month, arrival.day)
print((arrival - launch).days)        # 30
print(launch.strftime("%d %B %Y"))
print(date.today() &gt; launch)</pre>
<p>Subtracting two dates gives a <code>timedelta</code>; its <code>.days</code> attribute is the number of days between them.</p>
<h3>collections.Counter</h3>
<p>In the Star Charts module you counted with a dictionary by hand. <code>Counter</code> does it for you. It is a dictionary subclass that maps each item to its count.</p>
<pre class="code" data-run>from collections import Counter

signals = "ping beep ping pong ping beep".split()
counts = Counter(signals)
print(counts)
print(counts["ping"], counts["zzz"])   # missing items count as 0
print(counts.most_common(2))           # [(item, count), ...]
print(Counter("mississippi").most_common(1))</pre>
<h3>Finding more</h3>
<p>The Library Reference lists every module. A few others worth knowing: <code>statistics</code> (mean, median), <code>string</code> (letter constants), <code>itertools</code> (looping tools), and <code>json</code> (reading and writing JSON text).</p>
<div class="tip"><strong>Tip</strong> Before writing a general-purpose helper yourself, check the standard library. Someone has often already written, tested and documented it.</div>`,
      quiz: [
        { q: `Why call <code>random.seed(42)</code> before generating numbers?`,
          options: ["To make the numbers more random", "To make the same sequence come out each time, so results are repeatable", "To limit numbers to 42 or below", "It is required before any random call"],
          answer: 1,
          explain: "Seeding starts the pseudo-random generator from a fixed point, so the program produces the same values every run." },
        { q: `What does this print?<pre class="code">from datetime import date, timedelta
print(date(2026, 1, 30) + timedelta(days=3))</pre>`,
          options: ["2026-01-33", "2026-02-03", "2026-02-02", "An error"],
          answer: 2,
          explain: "January has 31 days, so three days after January 30 is February 2." },
        { q: `What does this print?<pre class="code">from collections import Counter
c = Counter(["a", "b", "a", "c", "a", "b"])
print(c.most_common(1))</pre>`,
          options: ["[('a', 3)]", "['a']", "{'a': 3}", "3"],
          answer: 0,
          explain: "most_common(n) returns a list of the n most common (item, count) tuples." },
        { q: `Which call can return <code>6</code>?`,
          options: ["random.random()", "random.randint(0, 5)", "random.choice([1, 2, 3])", "random.randint(1, 6)"],
          answer: 3,
          explain: "randint(a, b) includes both ends. random() is always below 1.0, and the other two cannot reach 6." }
      ],
      challenge: {
        title: "Supply Depot Records",
        prompt: `<p>The supply depot needs its records updated using the standard library:</p>
<pre class="code">deliveries = ["fuel", "food", "fuel", "water", "fuel", "food"]</pre>
<ul>
  <li>Use <code>collections.Counter</code> to make <code>counts</code> from <code>deliveries</code>, and store the most delivered item's name in <code>top</code> using <code>most_common</code>.</li>
  <li>The supply ship launched on <code>date(2026, 3, 14)</code> (store it in <code>launch</code>) and arrives 30 days later: store that date in <code>arrival</code> using <code>timedelta</code>.</li>
  <li>Seed the random generator with <code>7</code>, then store <code>random.randint(1, 20)</code> in <code>dock</code>.</li>
</ul>`,
        starter: `deliveries = ["fuel", "food", "fuel", "water", "fuel", "food"]\n\n# Write your imports and code below\n`,
        tests: [
          { name: "counts is a Counter with the right counts", code: `from collections import Counter as _C
assert isinstance(counts, _C) and counts["fuel"] == 3 and counts["food"] == 2 and counts["water"] == 1` },
          { name: "top is 'fuel'", code: `assert top == "fuel"` },
          { name: "arrival is 2026-04-13", code: `import datetime as _dt
assert launch == _dt.date(2026, 3, 14) and arrival == _dt.date(2026, 4, 13)` },
          { name: "dock is the first randint(1, 20) after seed 7", code: `import random as _r
_r.seed(7)
assert dock == _r.randint(1, 20)` }
        ],
        hints: ["from collections import Counter; Counter(deliveries) counts everything.", "most_common(1) returns [('fuel', 3)]; take [0][0] for the name.", "from datetime import date, timedelta; launch + timedelta(days=30). Call random.seed(7) right before randint."],
        solution: `from collections import Counter
from datetime import date, timedelta
import random

deliveries = ["fuel", "food", "fuel", "water", "fuel", "food"]
counts = Counter(deliveries)
top = counts.most_common(1)[0][0]
launch = date(2026, 3, 14)
arrival = launch + timedelta(days=30)
random.seed(7)
dock = random.randint(1, 20)
print(top, arrival, dock)`
      }
    },
    {
      id: "m10-l3",
      title: "Your Own Modules and Packages",
      minutes: 10,
      sources: [
        { label: "The Python Tutorial, 6. Modules (Executing modules as scripts)",
          url: "https://docs.python.org/3/tutorial/modules.html" },
        { label: "__main__: Top-level code environment",
          url: "https://docs.python.org/3/library/__main__.html" },
        { label: "The Python Tutorial, 12. Virtual Environments and Packages",
          url: "https://docs.python.org/3/tutorial/venv.html" },
        { label: "Python Packaging User Guide: Installing Packages",
          url: "https://packaging.python.org/en/latest/tutorials/installing-packages/" }
      ],
      body: `<h3>Writing a module</h3>
<p>Any <code>.py</code> file is a module. Suppose you save this as <code>spaceutils.py</code>:</p>
<pre class="code">"""Helpers for space travel."""

LIGHT_YEAR_KM = 9.461e12

def ly_to_km(ly):
    """Convert light-years to kilometres."""
    return ly * LIGHT_YEAR_KM</pre>
<p>Another file in the <strong>same folder</strong> can now import it by its file name, without <code>.py</code>:</p>
<pre class="code"># main.py
import spaceutils
from spaceutils import ly_to_km

print(spaceutils.LIGHT_YEAR_KM)
print(ly_to_km(4.2))</pre>
<p>Python looks for modules in the folder of the script you run first, then in the standard library and installed packages. A folder of modules (a <em>package</em>) lets you organise larger projects.</p>
<h3>if __name__ == "__main__":</h3>
<p>Every module has a variable <code>__name__</code>. When a file is run directly, its <code>__name__</code> is <code>"__main__"</code>. When it is imported, <code>__name__</code> is the module's name, such as <code>"spaceutils"</code>. This lets one file be both a reusable module and a runnable program:</p>
<pre class="code" data-run>def ly_to_km(ly):
    return ly * 9.461e12

def main():
    print("1 light-year is", ly_to_km(1), "km")

print("__name__ is", __name__)
if __name__ == "__main__":
    main()     # runs when executed, not when imported</pre>
<p>Without that check, importing the file would also run its demo code, which is rarely what you want. Putting the program's steps in a <code>main()</code> function is a common, tidy pattern.</p>
<h3>Virtual environments</h3>
<p>Third-party packages are published on the Python Package Index (PyPI) and installed with <strong>pip</strong>. Install them into a <strong>virtual environment</strong>: a self-contained folder with its own Python and packages, so each project has exactly the versions it needs. Create and activate one in a terminal (not in this app):</p>
<pre class="code">python -m venv .venv

# macOS / Linux
source .venv/bin/activate

# Windows
.venv\\Scripts\\activate</pre>
<p>While it is active your prompt usually shows <code>(.venv)</code>. Type <code>deactivate</code> to leave it. Do not commit the <code>.venv</code> folder to version control; it can always be recreated.</p>
<h3>Installing packages with pip</h3>
<pre class="code">python -m pip install requests
python -m pip install "requests==2.31.0"
python -m pip list
python -m pip freeze &gt; requirements.txt
python -m pip install -r requirements.txt</pre>
<p>Running pip as <code>python -m pip</code> guarantees it installs into the Python you are actually using. A <code>requirements.txt</code> file records your project's packages so someone else can install the same set. On Windows you may need <code>py</code> instead of <code>python</code>.</p>
<div class="tip"><strong>Tip</strong> Only install packages you trust from PyPI, and spell names carefully. Look-alike package names are a known way to spread malicious code.</div>`,
      quiz: [
        { q: `A file <code>tools.py</code> is imported by another program. What is <code>__name__</code> inside <code>tools.py</code>?`,
          options: ["\"__main__\"", "\"tools.py\"", "\"tools\"", "None"],
          answer: 2,
          explain: "An imported module's __name__ is its module name, without .py. Only the file that is run directly gets '__main__'." },
        { q: `What does <code>python -m venv .venv</code> do?`,
          options: ["Installs a package called venv", "Creates a virtual environment in a folder named .venv", "Activates the environment", "Lists installed packages"],
          answer: 1,
          explain: "The venv module creates a new virtual environment in the given folder. Activating it is a separate step." },
        { q: `Why use <code>python -m pip install</code> rather than just <code>pip install</code>?`,
          options: ["It guarantees the package goes into the Python you are running", "It is the only way to install packages", "It installs packages faster", "It skips the internet"],
          answer: 0,
          explain: "When several Pythons are installed, a bare pip command may belong to a different one. python -m pip ties it to the current interpreter." },
        { q: `What is the purpose of <code>if __name__ == "__main__":</code>?`,
          options: ["It makes the file run faster", "It is required in every file", "It imports the main module", "It runs code only when the file is executed directly, not when it is imported"],
          answer: 3,
          explain: "Code under that check runs as a program but stays quiet when another file imports the module." }
      ],
      challenge: {
        title: "Station Module Blueprint",
        prompt: `<p>Write this program as if it were a reusable module:</p>
<ul>
  <li>A function <code>ly_to_km(ly)</code> that returns <code>ly * 9.461e12</code>.</li>
  <li>A function <code>travel_days(km, speed_km_per_day)</code> that returns the number of whole days needed, rounded <strong>up</strong> (use <code>math.ceil</code>).</li>
  <li>A function <code>main()</code> that prints <code>Station ready</code> and then the result of <code>travel_days(1000, 300)</code>.</li>
  <li>Call <code>main()</code> only inside an <code>if __name__ == "__main__":</code> block.</li>
</ul>`,
        starter: `import math


def ly_to_km(ly):
    pass


def travel_days(km, speed_km_per_day):
    pass


def main():
    pass
`,
        tests: [
          { name: "ly_to_km converts light-years", code: `assert ly_to_km(1) == 9.461e12 and ly_to_km(0) == 0 and ly_to_km(2) == 2 * 9.461e12` },
          { name: "travel_days rounds up", code: `assert travel_days(1000, 300) == 4 and travel_days(900, 300) == 3 and travel_days(1, 50) == 1` },
          { name: "main() runs when executed directly", code: `lines = [l.strip() for l in __output__.splitlines()]
assert "Station ready" in lines and "4" in lines` }
        ],
        hints: ["math.ceil(km / speed_km_per_day) rounds the division up.", "main() should contain two print calls.", "At the bottom: if __name__ == \"__main__\": then main() indented underneath."],
        solution: `import math


def ly_to_km(ly):
    return ly * 9.461e12


def travel_days(km, speed_km_per_day):
    return math.ceil(km / speed_km_per_day)


def main():
    print("Station ready")
    print(travel_days(1000, 300))


if __name__ == "__main__":
    main()`
      }
    }
  ],
  boss: {
    title: "Boss: Station Supply Run",
    prompt: `<p>Mission briefing: you are writing the planning module for a supply run. Use the standard library.</p>
<ul>
  <li><code>crates_needed(units, per_crate=10)</code>: whole crates needed, rounded up (<code>math.ceil</code>).</li>
  <li><code>inventory(items)</code>: returns a <code>collections.Counter</code> of the list <code>items</code>.</li>
  <li><code>pick_crew(names, seed)</code>: seeds <code>random</code> with <code>seed</code>, then returns <code>random.sample(names, 2)</code>, so the same seed always picks the same two crew members.</li>
  <li><code>eta(start, days)</code>: returns the <code>datetime.date</code> that is <code>days</code> days after <code>start</code>.</li>
  <li><code>main()</code> prints a short plan (anything you like, but include the word <code>Plan</code>), called only under <code>if __name__ == "__main__":</code>.</li>
</ul>`,
    starter: `# Imports go here


def crates_needed(units, per_crate=10):
    pass


def inventory(items):
    pass


def pick_crew(names, seed):
    pass


def eta(start, days):
    pass


def main():
    pass
`,
    tests: [
      { name: "crates_needed rounds up and has a default", code: `assert crates_needed(53) == 6 and crates_needed(50) == 5 and crates_needed(7, per_crate=3) == 3` },
      { name: "inventory returns a Counter", code: `from collections import Counter as _C
inv = inventory(["fuel", "food", "fuel"])
assert isinstance(inv, _C) and inv["fuel"] == 2 and inv["food"] == 1 and inv.most_common(1)[0][0] == "fuel"` },
      { name: "pick_crew is repeatable with the same seed", code: `names = ["Ada", "Lin", "Sol", "Max", "Rex"]
a = pick_crew(names, 3)
b = pick_crew(names, 3)
assert a == b and len(a) == 2 and a[0] != a[1] and set(a) <= set(names)` },
      { name: "eta adds days to a date", code: `import datetime as _dt
assert eta(_dt.date(2026, 12, 25), 10) == _dt.date(2027, 1, 4)
assert eta(_dt.date(2026, 2, 27), 2) == _dt.date(2026, 3, 1)` },
      { name: "main() prints a Plan when run directly", code: `assert "Plan" in __output__` }
    ],
    hints: ["You need import math, import random, from collections import Counter and from datetime import timedelta (or import datetime).", "pick_crew: call random.seed(seed) first, then return random.sample(names, 2).", "eta: return start + timedelta(days=days)."],
    solution: `import math
import random
from collections import Counter
from datetime import date, timedelta


def crates_needed(units, per_crate=10):
    return math.ceil(units / per_crate)


def inventory(items):
    return Counter(items)


def pick_crew(names, seed):
    random.seed(seed)
    return random.sample(names, 2)


def eta(start, days):
    return start + timedelta(days=days)


def main():
    cargo = ["fuel", "food", "fuel", "water"]
    print("Plan:", crates_needed(len(cargo) * 12), "crates")
    print("Most needed:", inventory(cargo).most_common(1)[0][0])
    print("Crew:", pick_crew(["Ada", "Lin", "Sol", "Max"], 1))
    print("Arrival:", eta(date(2026, 3, 14), 30))


if __name__ == "__main__":
    main()`
  }
});
