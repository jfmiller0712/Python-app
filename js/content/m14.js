registerModule({
  id: "m14",
  order: 14,
  name: "Galaxy Architect",
  topic: "Writing professional Python",
  blurb: "The final world: write code other people love to read, describe it with type hints, prove it works with tests, and chart your next journey.",
  lessons: [
    {
      id: "m14-l1",
      title: "Code That Reads Like a Star Map",
      minutes: 9,
      sources: [
        { label: "PEP 8: Style Guide for Python Code",
          url: "https://peps.python.org/pep-0008/" },
        { label: "PEP 20: The Zen of Python",
          url: "https://peps.python.org/pep-0020/" },
        { label: "PEP 257: Docstring Conventions",
          url: "https://peps.python.org/pep-0257/" }
      ],
      body: `<p>Code is read much more often than it is written. Python's official style guide, <strong>PEP 8</strong>, describes a shared style so that any Python programmer can quickly read anyone else's code. Editors and tools can check most of it for you, but you should know the main rules.</p>
<h3>Naming</h3>
<ul>
  <li>Functions, variables and modules: <code>lowercase_with_underscores</code>, like <code>fuel_level</code> or <code>travel_time()</code>.</li>
  <li>Classes: <code>CapWords</code>, like <code>CargoHold</code>.</li>
  <li>Constants (module-level values that never change): <code>UPPER_CASE</code>, like <code>MAX_SPEED</code>.</li>
  <li>A leading underscore, <code>_helper</code>, signals "internal use".</li>
  <li>Choose descriptive names. Avoid single letters <code>l</code>, <code>O</code> and <code>I</code>, which look like digits.</li>
</ul>
<h3>Layout</h3>
<ul>
  <li>Indent with 4 spaces.</li>
  <li>Keep lines to at most 79 characters.</li>
  <li>Two blank lines around top-level functions and classes; one blank line between methods.</li>
  <li>Imports go at the top of the file, one per line, grouped: standard library first, then third-party, then your own modules.</li>
  <li>One space around assignment and comparison operators, none just inside brackets: <code>total = price * (count + 1)</code>.</li>
  <li>Compare with <code>None</code> using <code>is</code> / <code>is not</code>, and test for empty sequences with <code>if not items:</code>.</li>
</ul>
<h3>Before and after</h3>
<pre class="code">def CALC(l,S = 2):
  if l==None: return 0
  return l*S</pre>
<pre class="code" data-run>DEFAULT_SCALE = 2


def scaled_distance(distance, scale=DEFAULT_SCALE):
    """Return the distance multiplied by the map scale."""
    if distance is None:
        return 0
    return distance * scale


print(scaled_distance(21))
print(scaled_distance.__doc__)</pre>
<p>The string right under the <code>def</code> line is a <strong>docstring</strong>. PEP 257 recommends triple double quotes and a first line that says what the function does. Tools and <code>help()</code> show it.</p>
<h3>The Zen of Python</h3>
<p>PEP 20 collects the guiding principles of Python's design. Type <code>import this</code> at the interactive prompt to read them all. A few favourites:</p>
<pre class="code">Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Readability counts.
Errors should never pass silently.</pre>
<div class="tip"><strong>Tip</strong> PEP 8 itself says consistency within a project matters more than any single rule. When you join an existing project, follow its style.</div>`,
      quiz: [
        { q: `According to PEP 8, which name suits a class?`,
          options: ["cargo_hold", "CARGO_HOLD", "cargoHold", "CargoHold"],
          answer: 3,
          explain: "Classes use CapWords. lowercase_with_underscores is for functions and variables, UPPER_CASE for constants." },
        { q: `How does PEP 8 recommend checking whether <code>x</code> is <code>None</code>?`,
          options: ["x is None", "x == None", "not x", "type(x) == None"],
          answer: 0,
          explain: "None is a singleton, so compare with is or is not. not x would also be true for 0, '' and []." },
        { q: `How many spaces per indentation level does PEP 8 recommend?`,
          options: ["2", "4", "8", "One tab"],
          answer: 1,
          explain: "PEP 8 recommends 4 spaces per indentation level." }
      ],
      challenge: {
        title: "Refit the Nav Computer",
        prompt: `<p>The nav computer works, but its code was written in a hurry. Rewrite it in PEP 8 style without changing what it does:</p>
<ul>
  <li>Rename the constant <code>MaxSpeed</code> to <code>MAX_SPEED</code>.</li>
  <li>Rename the function <code>TravelTime</code> to <code>travel_time</code>, with parameters <code>distance</code> and <code>speed</code>.</li>
  <li>Give <code>travel_time</code> a one-line docstring.</li>
  <li>Fix the spacing and indentation. The old names should no longer exist.</li>
</ul>`,
        starter: `MaxSpeed=300000
def TravelTime( Distance,Speed ):
  if Speed>MaxSpeed : raise ValueError( "too fast" )
  return Distance/Speed
`,
        tests: [
          { name: "MAX_SPEED is 300000", code: `assert MAX_SPEED == 300000` },
          { name: "travel_time still works", code: `assert travel_time(1000, 250) == 4.0
try:
    travel_time(10, MAX_SPEED + 1)
    raise AssertionError("expected ValueError")
except ValueError:
    pass` },
          { name: "travel_time has a docstring", code: `assert travel_time.__doc__ and travel_time.__doc__.strip()` },
          { name: "The old names are gone", code: `assert "TravelTime" not in globals()
assert "MaxSpeed" not in globals()` }
        ],
        hints: [
          "Constants use UPPER_CASE; functions and parameters use lowercase_with_underscores.",
          "A docstring is a string in triple double quotes on the first line inside the function.",
          "Put the raise on its own indented line, indent with 4 spaces, and add two blank lines before the def."
        ],
        solution: `MAX_SPEED = 300000


def travel_time(distance, speed):
    """Return how long it takes to cover distance at speed."""
    if speed > MAX_SPEED:
        raise ValueError("too fast")
    return distance / speed
`
      }
    },
    {
      id: "m14-l2",
      title: "Type Hints: Labels on the Cargo",
      minutes: 9,
      sources: [
        { label: "typing: Support for type hints",
          url: "https://docs.python.org/3/library/typing.html" },
        { label: "PEP 484: Type Hints",
          url: "https://peps.python.org/pep-0484/" },
        { label: "PEP 604: Allow writing union types as X | Y",
          url: "https://peps.python.org/pep-0604/" }
      ],
      body: `<p><strong>Type hints</strong> (also called annotations) describe what types a function expects and returns. They make code easier to understand, and editors and type checkers use them to spot mistakes before the program runs. PEP 484 introduced the standard notation.</p>
<h3>Annotating functions and variables</h3>
<p>Put <code>: type</code> after a parameter and <code>-&gt; type</code> before the colon of the <code>def</code> line. Variables can be annotated the same way.</p>
<pre class="code" data-run>def greet(name: str, times: int = 1) -&gt; str:
    return ("Hello, " + name + "! ") * times

crew_count: int = 4
print(greet("Ada", 2))
print(greet.__annotations__)</pre>
<p>Python stores the hints in the function's <code>__annotations__</code> dictionary, and that is all it does with them.</p>
<h3>Hints are not enforced</h3>
<p>The Python runtime does not check type hints. A call with the "wrong" type runs anyway:</p>
<pre class="code" data-run>def double(x: int) -&gt; int:
    return x * 2

print(double(21))
print(double("ab"))   # runs fine and prints abab</pre>
<p>To catch that mismatch you run a separate <strong>type checker</strong> (a third-party tool such as mypy) over your code. Hints are documentation that tools can verify, not a safety net at run time.</p>
<h3>Collections</h3>
<p>Write the item types in square brackets after the built-in collection types:</p>
<ul>
  <li><code>list[int]</code>: a list of ints.</li>
  <li><code>dict[str, int]</code>: a dict with str keys and int values.</li>
  <li><code>tuple[float, float]</code>: a tuple of exactly two floats.</li>
  <li><code>set[str]</code>: a set of strings.</li>
</ul>
<h3>Optional values</h3>
<p>When a function may return a value <em>or</em> <code>None</code>, write <code>X | None</code> (Python 3.10 and later, PEP 604). Older code writes the same thing as <code>Optional[X]</code>, imported from the <code>typing</code> module.</p>
<pre class="code" data-run>from typing import Optional

def find_dock(ship: str, docks: dict[str, int]) -&gt; int | None:
    return docks.get(ship)

def find_dock_old(ship: str, docks: dict[str, int]) -&gt; Optional[int]:
    return docks.get(ship)

docks = {"Nova": 3, "Vega": 7}
print(find_dock("Vega", docks))
print(find_dock_old("Orion", docks))</pre>
<p>You have already seen hints at work: <code>@dataclass</code> uses the annotated class variables to decide which fields a class has.</p>
<div class="tip"><strong>Tip</strong> Start by annotating function parameters and return values. That is where hints help readers and tools the most.</div>`,
      quiz: [
        { q: `What happens when you run this?<pre class="code">def half(x: int) -&gt; int:
    return x / 2

print(half(5))</pre>`,
          options: ["A TypeError, because 2.5 is not an int", "It prints 2", "A SyntaxError", "It prints 2.5"],
          answer: 3,
          explain: "Python does not enforce hints at run time. The function returns 2.5 even though the hint says int; a type checker would flag it." },
        { q: `Which hint describes a dict mapping ship names to crew counts?`,
          options: ["dict[str, int]", "dict(str, int)", "dict[str: int]", "list[str, int]"],
          answer: 0,
          explain: "Generic types use square brackets with the key type and value type separated by a comma." },
        { q: `Which return hint means "an int, or None"?`,
          options: ["int or None", "Union(int, None)", "int | None", "None[int]"],
          answer: 2,
          explain: "Since Python 3.10 you can write the union as int | None. Optional[int] from typing means the same." }
      ],
      challenge: {
        title: "Typed Telemetry",
        prompt: `<p>Label the telemetry functions with type hints.</p>
<ul>
  <li><code>average_speed(speeds)</code> is already written. Annotate <code>speeds</code> as <code>list[float]</code> and the return type as <code>float | None</code>.</li>
  <li>Write <code>crew_roles(names, roles)</code>, annotated with <code>names: list[str]</code>, <code>roles: list[str]</code> and return type <code>dict[str, str]</code>. It returns a dict pairing each name with the role at the same position.</li>
</ul>
<pre class="code">crew_roles(["Ada", "Lin"], ["pilot", "medic"])
# {'Ada': 'pilot', 'Lin': 'medic'}</pre>`,
        starter: `def average_speed(speeds):
    if not speeds:
        return None
    return sum(speeds) / len(speeds)


def crew_roles(names, roles):
    pass
`,
        tests: [
          { name: "average_speed still works", code: `assert average_speed([10.0, 20.0]) == 15.0
assert average_speed([]) is None` },
          { name: "average_speed is annotated", code: `from typing import Optional
ann = average_speed.__annotations__
assert ann.get("speeds") == list[float]
assert ann.get("return") in (float | None, Optional[float])` },
          { name: "crew_roles pairs names with roles", code: `assert crew_roles(["Ada", "Lin"], ["pilot", "medic"]) == {"Ada": "pilot", "Lin": "medic"}
assert crew_roles([], []) == {}` },
          { name: "crew_roles is annotated", code: `assert crew_roles.__annotations__ == {"names": list[str], "roles": list[str], "return": dict[str, str]}` }
        ],
        hints: [
          "Annotations go after each parameter name (speeds: list[float]) and after the brackets (-> float | None).",
          "zip(names, roles) gives (name, role) pairs.",
          "dict() can build a dictionary directly from those pairs, or use a dict comprehension."
        ],
        solution: `def average_speed(speeds: list[float]) -> float | None:
    if not speeds:
        return None
    return sum(speeds) / len(speeds)


def crew_roles(names: list[str], roles: list[str]) -> dict[str, str]:
    return {name: role for name, role in zip(names, roles)}
`
      }
    },
    {
      id: "m14-l3",
      title: "Testing, and Beyond the Galaxy",
      minutes: 11,
      sources: [
        { label: "unittest: Unit testing framework",
          url: "https://docs.python.org/3/library/unittest.html" },
        { label: "The assert statement (Simple statements)",
          url: "https://docs.python.org/3/reference/simple_stmts.html" },
        { label: "doctest: Test interactive Python examples",
          url: "https://docs.python.org/3/library/doctest.html" },
        { label: "The Python Tutorial",
          url: "https://docs.python.org/3/tutorial/index.html" },
        { label: "Python Packaging User Guide: Packaging Python Projects",
          url: "https://packaging.python.org/en/latest/tutorials/packaging-projects/" }
      ],
      body: `<p>How do you know your code works, and keeps working after you change it? You write <strong>tests</strong>: small pieces of code that run your code and check the results.</p>
<h3><code>assert</code></h3>
<p><code>assert condition, message</code> does nothing if the condition is true and raises <code>AssertionError</code> if it is false. It is the quickest possible check.</p>
<pre class="code" data-run>def fuel_after(fuel, burn):
    return max(fuel - burn, 0)

assert fuel_after(100, 30) == 70
assert fuel_after(10, 50) == 0, "fuel must never go negative"
print("All checks passed")</pre>
<div class="warn"><strong>Watch out</strong> Python skips <code>assert</code> statements when run with the <code>-O</code> (optimize) option. Use them for tests and internal sanity checks, never to validate user input; raise an exception such as <code>ValueError</code> for that.</div>
<h3>The <code>unittest</code> module</h3>
<p>For real projects, the standard library's <code>unittest</code> organises tests into classes. Subclass <code>unittest.TestCase</code>, and write methods whose names start with <code>test</code>. Inside, use assertion methods such as <code>assertEqual</code>, <code>assertTrue</code>, <code>assertIn</code> and <code>assertRaises</code>.</p>
<pre class="code" data-run>import io
import unittest

def fuel_after(fuel, burn):
    if burn &lt; 0:
        raise ValueError("burn cannot be negative")
    return max(fuel - burn, 0)

class TestFuel(unittest.TestCase):
    def test_normal_burn(self):
        self.assertEqual(fuel_after(100, 30), 70)

    def test_never_negative(self):
        self.assertEqual(fuel_after(10, 50), 0)

    def test_negative_burn_rejected(self):
        with self.assertRaises(ValueError):
            fuel_after(100, -5)

suite = unittest.TestLoader().loadTestsFromTestCase(TestFuel)
result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)
print("Tests run:", result.testsRun)
print("All passed:", result.wasSuccessful())</pre>
<p>In a project on your own computer, you would put tests in files named like <code>test_fuel.py</code> and run them from a terminal:</p>
<pre class="code">python -m unittest</pre>
<h3>Doctest</h3>
<p>The <code>doctest</code> module finds examples written like an interactive session inside docstrings, runs them, and checks the output. The documentation becomes a test:</p>
<pre class="code">def square(n):
    """Return n squared.

    &gt;&gt;&gt; square(4)
    16
    """
    return n * n</pre>
<p>Running <code>python -m doctest -v ships.py</code> checks every such example in the file.</p>
<h3>Where to go next</h3>
<p>You have crossed the whole galaxy. To keep growing:</p>
<ul>
  <li><strong>The Python Tutorial</strong> on docs.python.org: reread it now; much more will click.</li>
  <li><strong>The Library Reference</strong>: browse modules such as <code>collections</code>, <code>datetime</code> and <code>itertools</code>.</li>
  <li><strong>The Python Packaging User Guide</strong> (packaging.python.org): virtual environments, installing packages, and publishing your own.</li>
  <li><strong>Build things</strong>: small tools you actually use teach the most. Write tests for them as you go.</li>
</ul>`,
      quiz: [
        { q: `What does <code>assert 2 + 2 == 5, "math is broken"</code> do?`,
          options: ["Prints math is broken and continues", "Raises AssertionError with the message", "Returns False", "Nothing"],
          answer: 1,
          explain: "A false assert condition raises AssertionError, using the text after the comma as its message." },
        { q: `In a <code>unittest.TestCase</code> subclass, which methods are run as tests?`,
          options: ["Every method", "Methods named check_...", "Only __init__", "Methods whose names start with test"],
          answer: 3,
          explain: "The test loader collects methods whose names begin with test; other methods can be helpers." },
        { q: `Why should you not use <code>assert</code> to check user input?`,
          options: ["Asserts are skipped when Python runs with -O", "assert only works inside unittest", "assert cannot compare strings", "assert is slower than if"],
          answer: 0,
          explain: "With the -O option Python removes assert statements entirely, so the check would silently disappear. Raise a proper exception instead." }
      ],
      challenge: {
        title: "Test the Docking Clamp",
        prompt: `<p>The docking clamp function keeps a value inside a safe range. Your mission: write the tests for it.</p>
<p>Below <code>clamp</code>, write a class <code>TestClamp(unittest.TestCase)</code> with <strong>at least three</strong> test methods that call <code>clamp</code> directly:</p>
<ul>
  <li>a value inside the range is returned unchanged;</li>
  <li>a value below <code>low</code> becomes <code>low</code>;</li>
  <li>a value above <code>high</code> becomes <code>high</code>.</li>
</ul>
<p>The checks will run your tests against the real <code>clamp</code> (they should pass) and against broken versions (your tests should catch them). Do not call <code>unittest.main()</code>.</p>`,
        starter: `import unittest


def clamp(value, low, high):
    """Return value limited to the range low..high."""
    return max(low, min(value, high))


class TestClamp(unittest.TestCase):
    pass
`,
        tests: [
          { name: "TestClamp is a TestCase", code: `import unittest
assert issubclass(TestClamp, unittest.TestCase)` },
          { name: "TestClamp has at least 3 tests, all passing", code: `import io, unittest
_suite = unittest.TestLoader().loadTestsFromTestCase(TestClamp)
_result = unittest.TextTestRunner(stream=io.StringIO()).run(_suite)
assert _result.testsRun >= 3
assert _result.wasSuccessful()` },
          { name: "Your tests catch a clamp that ignores high", code: `import io, unittest
_real = clamp
clamp = lambda value, low, high: max(value, low)
try:
    _result = unittest.TextTestRunner(stream=io.StringIO()).run(unittest.TestLoader().loadTestsFromTestCase(TestClamp))
finally:
    clamp = _real
assert not _result.wasSuccessful()` },
          { name: "Your tests catch a clamp that ignores low", code: `import io, unittest
_real = clamp
clamp = lambda value, low, high: min(value, high)
try:
    _result = unittest.TextTestRunner(stream=io.StringIO()).run(unittest.TestLoader().loadTestsFromTestCase(TestClamp))
finally:
    clamp = _real
assert not _result.wasSuccessful()` },
          { name: "Your tests catch a clamp that always returns low", code: `import io, unittest
_real = clamp
clamp = lambda value, low, high: low
try:
    _result = unittest.TextTestRunner(stream=io.StringIO()).run(unittest.TestLoader().loadTestsFromTestCase(TestClamp))
finally:
    clamp = _real
assert not _result.wasSuccessful()` }
        ],
        hints: [
          "Each test is a method like def test_inside(self): inside TestClamp.",
          "Use self.assertEqual(clamp(5, 0, 10), 5) style checks.",
          "Write one test for each case: inside, below low, above high."
        ],
        solution: `import unittest


def clamp(value, low, high):
    """Return value limited to the range low..high."""
    return max(low, min(value, high))


class TestClamp(unittest.TestCase):
    def test_inside_range(self):
        self.assertEqual(clamp(5, 0, 10), 5)

    def test_below_low(self):
        self.assertEqual(clamp(-3, 0, 10), 0)

    def test_above_high(self):
        self.assertEqual(clamp(42, 0, 10), 10)
`
      }
    }
  ],
  boss: {
    title: "Boss: The Starship Cargo Inventory",
    prompt: `<p>Final mission, Architect. Build the cargo system for the flagship, using everything you have learned.</p>
<ul>
  <li>An exception class <code>CargoError(Exception)</code>.</li>
  <li>A class <code>CargoHold</code>:
    <ul>
      <li><code>__init__(self, capacity)</code> stores <code>capacity</code> and an empty dict <code>items</code> (name to quantity).</li>
      <li><code>total()</code> returns the number of units on board.</li>
      <li><code>add(item, qty)</code>: raise <code>ValueError</code> if <code>qty</code> is not positive; raise <code>CargoError</code> if it would exceed the capacity (and change nothing); otherwise add to that item's quantity.</li>
      <li><code>remove(item, qty)</code>: raise <code>ValueError</code> if <code>qty</code> is not positive; raise <code>KeyError</code> if the item is not on board; raise <code>CargoError</code> if removing more than is held. When an item's quantity reaches 0, delete it from <code>items</code>.</li>
      <li><code>report()</code> returns a list of strings <code>"name: qty"</code>, sorted by name.</li>
    </ul>
  </li>
</ul>
<pre class="code">hold = CargoHold(10)
hold.add("water", 3)
hold.add("fuel", 6)
hold.report()   # ['fuel: 6', 'water: 3']</pre>`,
    starter: `class CargoError(Exception):
    """Raised when a cargo operation is not allowed."""


class CargoHold:
    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.items: dict[str, int] = {}
`,
    tests: [
      { name: "add and total keep count", code: `h = CargoHold(10)
h.add("fuel", 4)
h.add("fuel", 2)
h.add("water", 1)
assert h.items == {"fuel": 6, "water": 1}
assert h.total() == 7` },
      { name: "add rejects bad quantities and overloads", code: `assert issubclass(CargoError, Exception)
h = CargoHold(5)
h.add("fuel", 4)
for bad in (0, -2):
    try:
        h.add("fuel", bad)
        raise AssertionError("expected ValueError")
    except ValueError:
        pass
try:
    h.add("ore", 2)
    raise AssertionError("expected CargoError")
except CargoError:
    pass
assert h.items == {"fuel": 4}` },
      { name: "remove reduces and deletes empty items", code: `h = CargoHold(10)
h.add("fuel", 5)
h.add("water", 2)
h.remove("fuel", 3)
assert h.items == {"fuel": 2, "water": 2}
h.remove("water", 2)
assert h.items == {"fuel": 2}
assert h.total() == 2` },
      { name: "remove raises the right errors", code: `h = CargoHold(10)
h.add("fuel", 2)
for item, qty, error in [("ore", 1, KeyError), ("fuel", 3, CargoError), ("fuel", 0, ValueError)]:
    try:
        h.remove(item, qty)
        raise AssertionError(f"expected {error.__name__}")
    except error:
        pass
assert h.items == {"fuel": 2}` },
      { name: "report lists items sorted by name", code: `h = CargoHold(20)
assert h.report() == []
h.add("water", 3)
h.add("fuel", 6)
h.add("medkits", 1)
assert h.report() == ["fuel: 6", "medkits: 1", "water: 3"]` }
    ],
    hints: [
      "total() can be sum(self.items.values()). In add, check qty <= 0 first, then self.total() + qty > self.capacity, and only then update with self.items.get(item, 0) + qty.",
      "In remove, check the quantity, then 'item not in self.items' (raise KeyError(item)), then qty > self.items[item]. Use del self.items[item] when it reaches 0.",
      "report can be a list comprehension over sorted(self.items.items())."
    ],
    solution: `class CargoError(Exception):
    """Raised when a cargo operation is not allowed."""


class CargoHold:
    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.items: dict[str, int] = {}

    def total(self) -> int:
        return sum(self.items.values())

    def add(self, item: str, qty: int) -> None:
        if qty <= 0:
            raise ValueError("quantity must be positive")
        if self.total() + qty > self.capacity:
            raise CargoError(f"no room for {qty} x {item}")
        self.items[item] = self.items.get(item, 0) + qty

    def remove(self, item: str, qty: int) -> None:
        if qty <= 0:
            raise ValueError("quantity must be positive")
        if item not in self.items:
            raise KeyError(item)
        if qty > self.items[item]:
            raise CargoError(f"only {self.items[item]} x {item} on board")
        self.items[item] -= qty
        if self.items[item] == 0:
            del self.items[item]

    def report(self) -> list[str]:
        return [f"{name}: {qty}" for name, qty in sorted(self.items.items())]
`
  }
});
