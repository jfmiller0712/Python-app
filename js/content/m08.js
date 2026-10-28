registerModule({
  id: "m08",
  order: 8,
  name: "Thruster Functions",
  topic: "Writing your own functions",
  blurb: "Package code into reusable functions: parameters, return values, flexible arguments, scope, lambdas and a taste of recursion.",
  lessons: [
    {
      id: "m08-l1",
      title: "Building a Thruster",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 4. More Control Flow Tools (Defining Functions)",
          url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" },
        { label: "PEP 257: Docstring Conventions",
          url: "https://peps.python.org/pep-0257/" }
      ],
      body: `<p>You have been <em>calling</em> functions like <code>print()</code>, <code>len()</code> and <code>sorted()</code> for a while. Now you will <strong>define</strong> your own. A function is a named block of code you can run whenever you need it, with different inputs each time.</p>
<pre class="code" data-run>def greet(name):
    """Print a welcome message for one crew member."""
    print("Welcome aboard,", name)

greet("Ada")
greet("Lin")</pre>
<ul>
  <li><code>def</code> starts the definition, followed by the function's name and parentheses.</li>
  <li>Inside the parentheses are <strong>parameters</strong>: names that receive the values passed in. The values you pass when calling are the <strong>arguments</strong>.</li>
  <li>The indented block is the function's <strong>body</strong>. It only runs when the function is called.</li>
</ul>
<h3>Returning a value</h3>
<p><code>return</code> sends a value back to the caller and ends the function immediately. The caller can store it, print it or use it in a calculation.</p>
<pre class="code" data-run>def area(width, height):
    return width * height

a = area(3, 4)
print(a)
print(area(2, 5) + area(1, 1))</pre>
<p>A function without a <code>return</code> (or with a bare <code>return</code>) returns <code>None</code>.</p>
<pre class="code" data-run>def shout(word):
    print(word.upper())

result = shout("launch")
print(result)        # None</pre>
<div class="warn"><strong>Watch out</strong> Printing is not returning. <code>print()</code> shows a value to a human; <code>return</code> hands it to the rest of your program. Functions that compute something should usually <code>return</code> it and let the caller decide whether to print.</div>
<h3>Returning early and returning several values</h3>
<p>Because <code>return</code> ends the function, you can use it inside an <code>if</code> to finish early. To return several values, return a tuple and unpack it.</p>
<pre class="code" data-run>def classify(speed):
    if speed &lt; 0:
        return "invalid"
    if speed &gt; 10:
        return "warp"
    return "cruise"

def min_max(numbers):
    return min(numbers), max(numbers)

print(classify(12), classify(3), classify(-1))
low, high = min_max([4, 9, 1, 7])
print(low, high)</pre>
<h3>Docstrings</h3>
<p>A string literal on the first line of the body is the function's <strong>docstring</strong>. It explains what the function does. Tools such as <code>help()</code> display it, and it is stored in the function's <code>__doc__</code> attribute. By convention it uses triple double quotes and starts with a short summary line.</p>
<pre class="code" data-run>def to_km(au):
    """Convert astronomical units to kilometres."""
    return au * 149597870.7

print(to_km.__doc__)
print(to_km(2))</pre>
<div class="tip"><strong>Tip</strong> Test a new function straight away by calling it with a few different inputs, including edge cases such as 0, a negative number or an empty list.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">def f(x):
    x * 2

print(f(5))</pre>`,
          options: ["10", "None", "5", "An error"],
          answer: 1,
          explain: "The body calculates x * 2 but never returns it, so the function returns None." },
        { q: `In <code>def area(w, h):</code> and the call <code>area(3, 4)</code>, what are <code>3</code> and <code>4</code>?`,
          options: ["Parameters", "Docstrings", "Arguments", "Return values"],
          answer: 2,
          explain: "w and h are parameters (names in the definition); 3 and 4 are the arguments passed in the call." },
        { q: `What does this print?<pre class="code">def check(n):
    if n &gt; 0:
        return "positive"
    return "not positive"
    print("done")

print(check(3))</pre>`,
          options: ["positive", "positive then done", "done", "not positive"],
          answer: 0,
          explain: "return ends the function immediately, so the print('done') line is never reached." }
      ],
      challenge: {
        title: "Thruster Calibration",
        prompt: `<p>Engineering needs three small helper functions. Write them and test each one by calling it with a few inputs.</p>
<ul>
  <li><code>thrust(mass, accel)</code> returns <code>mass * accel</code>.</li>
  <li><code>is_even(n)</code> returns <code>True</code> if <code>n</code> is even, otherwise <code>False</code>.</li>
  <li><code>fuel_status(level)</code> returns <code>"empty"</code> if <code>level</code> is 0 or less, <code>"low"</code> if it is below 25, and <code>"ok"</code> otherwise. Give it a docstring.</li>
</ul>
<p>Each function must <em>return</em> its result, not print it.</p>`,
        starter: `def thrust(mass, accel):
    pass


def is_even(n):
    pass


def fuel_status(level):
    pass


# Test your functions here
print(thrust(10, 3))
`,
        tests: [
          { name: "thrust multiplies its arguments", code: `assert thrust(10, 3) == 30 and thrust(2.5, 4) == 10 and thrust(0, 9) == 0` },
          { name: "is_even works for several numbers", code: `assert is_even(4) is True and is_even(7) is False and is_even(0) is True and is_even(-3) is False` },
          { name: "fuel_status returns empty / low / ok", code: `assert fuel_status(0) == "empty" and fuel_status(-5) == "empty"
assert fuel_status(10) == "low" and fuel_status(24) == "low"
assert fuel_status(25) == "ok" and fuel_status(90) == "ok"` },
          { name: "fuel_status has a docstring", code: `assert fuel_status.__doc__ and fuel_status.__doc__.strip()` }
        ],
        hints: ["Replace each 'pass' with a return statement.", "n % 2 == 0 is already True or False, so you can return it directly.", "In fuel_status, check the 'empty' case first, then 'low', and return 'ok' at the end."],
        solution: `def thrust(mass, accel):
    return mass * accel


def is_even(n):
    return n % 2 == 0


def fuel_status(level):
    """Describe a fuel level as 'empty', 'low' or 'ok'."""
    if level <= 0:
        return "empty"
    if level < 25:
        return "low"
    return "ok"


print(thrust(10, 3))
print(is_even(4), is_even(7))
print(fuel_status(0), fuel_status(10), fuel_status(80))`
      }
    },
    {
      id: "m08-l2",
      title: "Flexible Arguments",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 4. More Control Flow Tools (More on Defining Functions)",
          url: "https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions" },
        { label: "Glossary: argument, parameter",
          url: "https://docs.python.org/3/glossary.html" }
      ],
      body: `<h3>Default values</h3>
<p>A parameter can have a <strong>default value</strong>. If the caller leaves that argument out, the default is used. Parameters with defaults must come after those without.</p>
<pre class="code" data-run>def jump(distance, speed=1):
    return distance / speed

print(jump(12))        # speed is 1
print(jump(12, 4))     # speed is 4</pre>
<h3>Keyword arguments</h3>
<p>When calling, you can name an argument: <code>name=value</code>. Keyword arguments can come in any order, and they make calls easier to read. Positional arguments must come before keyword ones.</p>
<pre class="code" data-run>def report(ship, fuel=100, crew=1):
    print(f"{ship}: fuel={fuel}, crew={crew}")

report("Comet")
report("Nova", crew=4)
report(crew=2, ship="Drift", fuel=55)</pre>
<div class="warn"><strong>Watch out</strong> Default values are created once, when the function is defined. A mutable default like <code>items=[]</code> is shared between calls and keeps growing. Use <code>None</code> as the default and create the list inside the function instead.</div>
<pre class="code" data-run>def add_item(item, cargo=None):
    if cargo is None:
        cargo = []
    cargo.append(item)
    return cargo

print(add_item("fuel"))
print(add_item("food"))   # a fresh list each time</pre>
<h3>Any number of positional arguments: *args</h3>
<p>A parameter written with one star, conventionally <code>*args</code>, collects any extra positional arguments into a <strong>tuple</strong>.</p>
<pre class="code" data-run>def total(*numbers):
    print("got", numbers)
    return sum(numbers)

print(total(1, 2, 3))
print(total())</pre>
<h3>Any number of keyword arguments: **kwargs</h3>
<p>A parameter with two stars, conventionally <code>**kwargs</code>, collects extra keyword arguments into a <strong>dictionary</strong>.</p>
<pre class="code" data-run>def describe(name, **details):
    print("Ship:", name)
    for key, value in details.items():
        print(" ", key, "=", value)

describe("Comet", speed=7, color="silver")</pre>
<p>The names <code>args</code> and <code>kwargs</code> are only a convention; the stars do the work. The usual order in a definition is: normal parameters, <code>*args</code>, then <code>**kwargs</code>.</p>
<h3>Unpacking into a call</h3>
<p>The stars also work the other way round when <em>calling</em>: <code>*</code> spreads a list or tuple into positional arguments and <code>**</code> spreads a dict into keyword arguments.</p>
<pre class="code" data-run>def jump(distance, speed=1):
    return distance / speed

args = [20, 5]
opts = {"distance": 30, "speed": 3}
print(jump(*args))
print(jump(**opts))</pre>`,
      quiz: [
        { q: `What does this print?<pre class="code">def power(base, exp=2):
    return base ** exp

print(power(3), power(2, exp=3))</pre>`,
          options: ["9 8", "6 6", "9 6", "An error"],
          answer: 0,
          explain: "power(3) uses the default exp=2 giving 9; power(2, exp=3) gives 8." },
        { q: `Inside <code>def f(*args):</code>, what type is <code>args</code> when you call <code>f(1, 2)</code>?`,
          options: ["list", "dict", "tuple", "int"],
          answer: 2,
          explain: "*args collects extra positional arguments into a tuple." },
        { q: `Which call is NOT valid for <code>def report(ship, fuel=100):</code>?`,
          options: ["report(\"Nova\")", "report(fuel=5, ship=\"Nova\")", "report(\"Nova\", 5)", "report(fuel=5, \"Nova\")"],
          answer: 3,
          explain: "Positional arguments must come before keyword arguments, so report(fuel=5, 'Nova') is a SyntaxError." },
        { q: `Why is <code>def add(item, cargo=[]):</code> risky?`,
          options: ["Lists cannot be default values", "The same list is reused by every call that relies on the default", "It makes the function slower", "The default is ignored"],
          answer: 1,
          explain: "Defaults are evaluated once when the function is defined, so one shared list keeps collecting items. Use None and create the list inside." }
      ],
      challenge: {
        title: "Mission Control Panel",
        prompt: `<p>Write three functions for the mission control panel, and test them with several calls:</p>
<ul>
  <li><code>fuel_cost(distance, rate=2, discount=0)</code> returns <code>distance * rate - discount</code>.</li>
  <li><code>total_mass(*masses)</code> returns the sum of any number of masses (0 when none are given).</li>
  <li><code>tag(name, **info)</code> returns a string: the name, then each extra keyword as <code>key=value</code> in <strong>alphabetical order of the keys</strong>, all separated by <code>", "</code>. For example <code>tag("Comet", speed=7, crew=3)</code> returns <code>"Comet, crew=3, speed=7"</code>, and <code>tag("Nova")</code> returns <code>"Nova"</code>.</li>
</ul>`,
        starter: `def fuel_cost(distance):
    pass


def total_mass():
    pass


def tag(name):
    pass


# Test your functions here
`,
        tests: [
          { name: "fuel_cost uses defaults and keywords", code: `assert fuel_cost(10) == 20 and fuel_cost(10, 3) == 30
assert fuel_cost(10, discount=5) == 15 and fuel_cost(rate=1, distance=7) == 7` },
          { name: "total_mass adds any number of masses", code: `assert total_mass(1, 2, 3) == 6 and total_mass(5) == 5 and total_mass() == 0` },
          { name: "tag sorts keyword details", code: `assert tag("Comet", speed=7, crew=3) == "Comet, crew=3, speed=7"` },
          { name: "tag works with no extra details", code: `assert tag("Nova") == "Nova" and tag("X", a=1) == "X, a=1"` }
        ],
        hints: ["Add the defaults right in the def line: def fuel_cost(distance, rate=2, discount=0).", "Inside total_mass, masses is a tuple, and sum() works on tuples.", "In tag, build a list starting with [name], loop over sorted(info) to append f'{key}={info[key]}', then join it with ', '."],
        solution: `def fuel_cost(distance, rate=2, discount=0):
    return distance * rate - discount


def total_mass(*masses):
    return sum(masses)


def tag(name, **info):
    parts = [name]
    for key in sorted(info):
        parts.append(f"{key}={info[key]}")
    return ", ".join(parts)


print(fuel_cost(10), fuel_cost(10, discount=5))
print(total_mass(1, 2, 3))
print(tag("Comet", speed=7, crew=3))`
      }
    },
    {
      id: "m08-l3",
      title: "Scope, Lambdas and Recursion",
      minutes: 10,
      sources: [
        { label: "The Python Tutorial, 9. Classes (Python Scopes and Namespaces)",
          url: "https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces" },
        { label: "The Python Tutorial, 4. More Control Flow Tools (Lambda Expressions)",
          url: "https://docs.python.org/3/tutorial/controlflow.html#lambda-expressions" },
        { label: "Sorting Techniques (HOWTO): Key Functions",
          url: "https://docs.python.org/3/howto/sorting.html#key-functions" }
      ],
      body: `<h3>Local and global scope</h3>
<p>A variable created inside a function is <strong>local</strong>: it exists only while the function runs and is invisible outside it. Variables created at the top level of your program are <strong>global</strong> and can be <em>read</em> inside functions.</p>
<pre class="code" data-run>ship = "Comet"           # global

def launch():
    countdown = 3        # local
    print(ship, "launching in", countdown)

launch()
print("countdown" in globals())   # False: it never left the function</pre>
<p>If you <em>assign</em> to a name inside a function, Python treats that name as local for the whole function, even if a global with the same name exists. The <code>global</code> statement changes that, but it makes code harder to follow. Passing values in and returning results out is almost always better.</p>
<pre class="code" data-run>score = 0

def add_points(current, points):
    return current + points     # no global needed

score = add_points(score, 10)
print(score)</pre>
<h3>LEGB: where Python looks for a name</h3>
<p>When you use a name, Python searches these scopes in order and uses the first match:</p>
<ul>
  <li><strong>L</strong>ocal: the current function.</li>
  <li><strong>E</strong>nclosing: any function that contains the current one.</li>
  <li><strong>G</strong>lobal: the top level of the module.</li>
  <li><strong>B</strong>uilt-in: names like <code>print</code> and <code>len</code>.</li>
</ul>
<p>This is why naming your own variable <code>list</code> or <code>sum</code> is a bad idea: it hides the built-in.</p>
<h3>Lambda: tiny unnamed functions</h3>
<p><code>lambda params: expression</code> makes a small function in one expression. Its most common use is the <code>key</code> argument of <code>sorted()</code>, <code>min()</code> and <code>max()</code>, which tells them what to compare.</p>
<pre class="code" data-run>ships = [("Comet", 7), ("Nova", 9), ("Drift", 4)]
by_speed = sorted(ships, key=lambda s: s[1])
print(by_speed)
print(max(ships, key=lambda s: s[1]))
names = ["vega", "Sol", "rigel"]
print(sorted(names, key=len))          # any function works as a key
print(sorted(names, key=str.lower))</pre>
<p>If a lambda grows beyond a simple expression, write a normal <code>def</code> function instead.</p>
<h3>Recursion</h3>
<p>A function can call itself. This is <strong>recursion</strong>. Every recursive function needs a <em>base case</em> that stops without calling itself again; otherwise it recurses until Python gives up with a <code>RecursionError</code>.</p>
<pre class="code" data-run>def countdown(n):
    if n == 0:              # base case
        print("Liftoff!")
        return
    print(n)
    countdown(n - 1)        # smaller problem

def factorial(n):
    if n &lt;= 1:
        return 1
    return n * factorial(n - 1)

countdown(3)
print(factorial(5))</pre>
<div class="tip"><strong>Tip</strong> Most problems are easier with a loop. Recursion shines for naturally nested data, such as lists inside lists.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">x = 5

def change():
    x = 10

change()
print(x)</pre>`,
          options: ["10", "None", "An error", "5"],
          answer: 3,
          explain: "Assigning x inside change() creates a separate local variable. The global x is untouched." },
        { q: `In LEGB, what does the B stand for?`,
          options: ["Built-in", "Block", "Base", "Boolean"],
          answer: 0,
          explain: "Built-in names such as print and len are searched last, after local, enclosing and global scopes." },
        { q: `What does this print?<pre class="code">words = ["ccc", "a", "bb"]
print(sorted(words, key=lambda w: len(w)))</pre>`,
          options: ["['a', 'bb', 'ccc']", "['ccc', 'bb', 'a']", "['a', 'ccc', 'bb']", "[1, 2, 3]"],
          answer: 0,
          explain: "The key function returns each word's length, so the words are ordered by length; the words themselves are returned." },
        { q: `What is the purpose of a base case in a recursive function?`,
          options: ["To make it run faster", "To stop the recursion", "To call the function again", "To return a lambda"],
          answer: 1,
          explain: "The base case handles the simplest input directly, without another recursive call, so the chain of calls ends." }
      ],
      challenge: {
        title: "Fleet Sorting Algorithms",
        prompt: `<p>Navigation needs some fleet tools. Write and test:</p>
<ul>
  <li><code>sort_by_mass(ships)</code>: takes a list of <code>(name, mass)</code> tuples and returns a <em>new</em> list of just the names, lightest first. Use <code>sorted()</code> with a <code>lambda</code> key.</li>
  <li><code>heaviest(ships)</code>: returns the name of the heaviest ship (use <code>max()</code> with a key).</li>
  <li><code>stages(n)</code>: a <strong>recursive</strong> function that returns the sum <code>n + (n-1) + ... + 1</code>, and <code>0</code> when <code>n</code> is 0 or less.</li>
</ul>`,
        starter: `def sort_by_mass(ships):
    pass


def heaviest(ships):
    pass


def stages(n):
    pass


fleet = [("Comet", 40), ("Nova", 15), ("Drift", 30)]
print(sort_by_mass(fleet))
`,
        tests: [
          { name: "sort_by_mass returns names, lightest first", code: `fleet = [("Comet", 40), ("Nova", 15), ("Drift", 30)]
assert sort_by_mass(fleet) == ["Nova", "Drift", "Comet"]
assert sort_by_mass([]) == []
assert fleet == [("Comet", 40), ("Nova", 15), ("Drift", 30)]` },
          { name: "heaviest returns the heaviest ship's name", code: `assert heaviest([("Comet", 40), ("Nova", 15), ("Drift", 30)]) == "Comet"
assert heaviest([("A", 1), ("B", 99)]) == "B"` },
          { name: "stages sums n down to 1", code: `assert stages(4) == 10 and stages(1) == 1 and stages(0) == 0 and stages(-2) == 0 and stages(10) == 55` }
        ],
        hints: ["sorted(ships, key=lambda s: s[1]) orders the tuples by mass; then pull out s[0] with a list comprehension.", "max(ships, key=lambda s: s[1]) returns the whole tuple; return its first item.", "In stages, the base case is n <= 0 returning 0; otherwise return n + stages(n - 1)."],
        solution: `def sort_by_mass(ships):
    ordered = sorted(ships, key=lambda s: s[1])
    return [name for name, mass in ordered]


def heaviest(ships):
    return max(ships, key=lambda s: s[1])[0]


def stages(n):
    if n <= 0:
        return 0
    return n + stages(n - 1)


fleet = [("Comet", 40), ("Nova", 15), ("Drift", 30)]
print(sort_by_mass(fleet))
print(heaviest(fleet))
print(stages(4))`
      }
    }
  ],
  boss: {
    title: "Boss: Navigation Computer",
    prompt: `<p>Mission briefing: the navigation computer has been wiped. Rebuild its core routines as functions. Points are <code>(x, y)</code> tuples.</p>
<ul>
  <li><code>distance(p, q)</code>: the "grid distance" <code>abs(x1 - x2) + abs(y1 - y2)</code>.</li>
  <li><code>route_length(*points)</code>: the total distance travelling from each point to the next, in order. Fewer than two points means <code>0</code>.</li>
  <li><code>closest(origin, points)</code>: the point in the list nearest to <code>origin</code> (use <code>min()</code> with a <code>lambda</code> key that calls <code>distance</code>).</li>
  <li><code>format_jump(name, dist, unit="ly")</code>: returns a string like <code>"Vega: 12 ly"</code>; the unit can be changed with a keyword argument.</li>
</ul>
<p>Give <code>distance</code> a docstring, and test everything with a few calls.</p>`,
    starter: `def distance(p, q):
    pass


def route_length():
    pass


def closest(origin, points):
    pass


def format_jump(name, dist):
    pass


# Test your functions here
`,
    tests: [
      { name: "distance computes grid distance and has a docstring", code: `assert distance((0, 0), (3, 4)) == 7 and distance((2, -1), (-1, 3)) == 7 and distance((5, 5), (5, 5)) == 0
assert distance.__doc__ and distance.__doc__.strip()` },
      { name: "route_length sums each hop", code: `assert route_length((0, 0), (1, 0), (1, 5)) == 6
assert route_length((0, 0), (2, 2), (0, 0)) == 8` },
      { name: "route_length is 0 for fewer than two points", code: `assert route_length() == 0 and route_length((4, 4)) == 0` },
      { name: "closest finds the nearest point", code: `assert closest((0, 0), [(5, 5), (1, 2), (-4, 0)]) == (1, 2)
assert closest((10, 10), [(0, 0), (9, 12)]) == (9, 12)` },
      { name: "format_jump uses a default unit", code: `assert format_jump("Vega", 12) == "Vega: 12 ly"
assert format_jump("Sol", 3, unit="pc") == "Sol: 3 pc"` }
    ],
    hints: ["In route_length, points is a tuple; loop over range(len(points) - 1) and add distance(points[i], points[i + 1]).", "closest can be a single line: return min(points, key=lambda p: distance(origin, p)).", "format_jump needs unit='ly' in its def line and an f-string in its return."],
    solution: `def distance(p, q):
    """Return the grid distance between points p and q."""
    return abs(p[0] - q[0]) + abs(p[1] - q[1])


def route_length(*points):
    total = 0
    for i in range(len(points) - 1):
        total += distance(points[i], points[i + 1])
    return total


def closest(origin, points):
    return min(points, key=lambda p: distance(origin, p))


def format_jump(name, dist, unit="ly"):
    return f"{name}: {dist} {unit}"


print(distance((0, 0), (3, 4)))
print(route_length((0, 0), (1, 0), (1, 5)))
print(closest((0, 0), [(5, 5), (1, 2)]))
print(format_jump("Vega", 12))`
  }
});
