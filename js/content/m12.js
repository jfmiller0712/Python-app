registerModule({
  id: "m12",
  order: 12,
  name: "Class Constellations",
  topic: "Classes and objects",
  blurb: "Design your own types: bundle data and behaviour into classes, give them readable names, and build families with inheritance.",
  lessons: [
    {
      id: "m12-l1",
      title: "Blueprints for Starships",
      minutes: 10,
      sources: [
        { label: "The Python Tutorial, 9. Classes",
          url: "https://docs.python.org/3/tutorial/classes.html" },
        { label: "Python Glossary (class, object, method, attribute)",
          url: "https://docs.python.org/3/glossary.html" }
      ],
      body: `<p>You have used many objects already: strings, lists and dicts each bundle data with methods such as <code>.upper()</code> or <code>.append()</code>. A <strong>class</strong> lets you design your own type of object. The class is the blueprint; each object built from it is an <strong>instance</strong>.</p>
<h3>Defining a class</h3>
<pre class="code" data-run>class Ship:
    def __init__(self, name, fuel):
        self.name = name      # instance attributes
        self.fuel = fuel

    def fly(self, distance):
        self.fuel -= distance
        return self.fuel

nova = Ship("Nova", 100)    # create an instance
vega = Ship("Vega", 60)
nova.fly(30)
print(nova.name, nova.fuel)
print(vega.name, vega.fuel)</pre>
<ul>
  <li>Class names use CapWords style: <code>Ship</code>, <code>CargoBay</code>.</li>
  <li>Calling the class, <code>Ship("Nova", 100)</code>, creates a new object and then runs <code>__init__</code> to set it up.</li>
  <li>A function defined inside a class is a <strong>method</strong>.</li>
</ul>
<h3>What is <code>self</code>?</h3>
<p>Every method receives the instance it was called on as its first parameter, named <code>self</code> by convention. When you write <code>nova.fly(30)</code>, Python calls <code>Ship.fly(nova, 30)</code>. Inside the method, <code>self.fuel</code> means "the fuel of <em>this particular</em> ship". That is why <code>nova</code> and <code>vega</code> keep separate fuel levels.</p>
<h3>Attributes</h3>
<p>Assigning <code>self.something = value</code> creates an <strong>instance attribute</strong>. You read or change it with dot notation from outside, too: <code>vega.fuel = 80</code>.</p>
<h3>Class attributes</h3>
<p>A variable written directly in the class body is a <strong>class attribute</strong>, shared by every instance.</p>
<pre class="code" data-run>class Probe:
    max_speed = 500          # class attribute, shared

    def __init__(self, code):
        self.code = code     # instance attribute, one per probe

a = Probe("A1")
b = Probe("B2")
print(a.max_speed, b.max_speed, Probe.max_speed)

a.max_speed = 900            # creates an instance attribute on a only
print(a.max_speed, b.max_speed, Probe.max_speed)</pre>
<p>When you look up <code>a.max_speed</code>, Python checks the instance first and then the class. Assigning through an instance creates a new instance attribute that hides the class one; the class value is unchanged.</p>
<div class="warn"><strong>Watch out</strong> A mutable class attribute such as <code>members = []</code> is one list shared by <em>all</em> instances, so appending through one instance changes it for every instance. Create lists in <code>__init__</code> instead: <code>self.members = []</code>.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">class Box:
    def __init__(self, size):
        self.size = size

a = Box(3)
b = Box(5)
a.size = 4
print(a.size + b.size)</pre>`,
          options: ["8", "9", "10", "An error"],
          answer: 1,
          explain: "Each instance has its own size attribute. a.size becomes 4 and b.size stays 5, so the sum is 9." },
        { q: `When you call <code>nova.fly(30)</code>, what is passed as <code>self</code>?`,
          options: ["The class Ship", "The number 30", "Nothing; self is optional", "The object nova"],
          answer: 3,
          explain: "Python passes the instance the method was called on as the first argument, so self is nova." },
        { q: `What does this print?<pre class="code">class Ship:
    count = 0

a = Ship()
a.count = 5
print(Ship.count)</pre>`,
          options: ["0", "5", "None", "An error"],
          answer: 0,
          explain: "Assigning through an instance creates an instance attribute on a. The class attribute Ship.count is still 0." }
      ],
      challenge: {
        title: "Commission a Shuttle",
        prompt: `<p>Fleet command needs a blueprint for passenger shuttles. Write a class <code>Shuttle</code>:</p>
<ul>
  <li>A class attribute <code>capacity = 4</code>.</li>
  <li><code>__init__(self, name)</code> stores <code>name</code> and starts an empty list <code>passengers</code>.</li>
  <li><code>board(self, person)</code>: if there is room (fewer passengers than <code>capacity</code>), add the person and return <code>True</code>; otherwise return <code>False</code>.</li>
  <li><code>count(self)</code> returns how many passengers are aboard.</li>
</ul>`,
        starter: `class Shuttle:
    pass
`,
        tests: [
          { name: "capacity is a class attribute equal to 4", code: `assert Shuttle.capacity == 4
s = Shuttle("Swift")
assert s.name == "Swift"` },
          { name: "board adds passengers and returns True", code: `s = Shuttle("Swift")
assert s.board("Ada") is True
assert s.board("Lin") is True
assert s.count() == 2
assert s.passengers == ["Ada", "Lin"]` },
          { name: "A full shuttle refuses passengers", code: `s = Shuttle("Swift")
for name in ["A", "B", "C", "D"]:
    assert s.board(name) is True
assert s.board("E") is False
assert s.count() == 4` },
          { name: "Each shuttle has its own passenger list", code: `a = Shuttle("One")
b = Shuttle("Two")
a.board("Ada")
assert b.count() == 0` }
        ],
        hints: [
          "Write capacity = 4 directly in the class body, outside any method.",
          "In __init__, set self.name and self.passengers = [] so each shuttle gets its own list.",
          "In board, compare len(self.passengers) with self.capacity before appending."
        ],
        solution: `class Shuttle:
    capacity = 4

    def __init__(self, name):
        self.name = name
        self.passengers = []

    def board(self, person):
        if len(self.passengers) < self.capacity:
            self.passengers.append(person)
            return True
        return False

    def count(self):
        return len(self.passengers)
`
      }
    },
    {
      id: "m12-l2",
      title: "Readable Objects and Dataclasses",
      minutes: 10,
      sources: [
        { label: "Data model: object.__repr__ and object.__str__",
          url: "https://docs.python.org/3/reference/datamodel.html#object.__repr__" },
        { label: "dataclasses: Data Classes",
          url: "https://docs.python.org/3/library/dataclasses.html" },
        { label: "PEP 557: Data Classes",
          url: "https://peps.python.org/pep-0557/" }
      ],
      body: `<p>Print an object from a plain class and you get something unhelpful like <code>&lt;__main__.Ship object at 0x7f...&gt;</code>. Two special methods, written with double underscores ("dunder" methods), fix that.</p>
<h3><code>__str__</code> and <code>__repr__</code></h3>
<ul>
  <li><code>__str__</code> returns a friendly text for users. <code>print()</code>, <code>str()</code> and f-strings use it.</li>
  <li><code>__repr__</code> returns an unambiguous text for developers. <code>repr()</code>, the interactive prompt, and containers such as lists use it. By convention it looks like the code that would recreate the object.</li>
</ul>
<pre class="code" data-run>class Ship:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel

    def __str__(self):
        return f"{self.name} with {self.fuel}% fuel"

    def __repr__(self):
        return f"Ship({self.name!r}, {self.fuel})"

nova = Ship("Nova", 80)
print(nova)
print(repr(nova))
print([nova, Ship("Vega", 50)])</pre>
<p>The <code>!r</code> inside the f-string uses <code>repr()</code> of the name, which adds the quotes. If a class defines only <code>__repr__</code>, <code>str()</code> falls back to it, so <code>__repr__</code> is the one to write first.</p>
<h3>Dataclasses: less typing</h3>
<p>Many classes just hold data, and writing <code>__init__</code> and <code>__repr__</code> by hand gets repetitive. The <code>@dataclass</code> decorator from the <code>dataclasses</code> module writes them for you, based on annotated class variables called <strong>fields</strong>.</p>
<pre class="code" data-run>from dataclasses import dataclass, field

@dataclass
class Planet:
    name: str
    moons: int = 0
    rings: list = field(default_factory=list)

    def is_lonely(self):
        return self.moons == 0

mars = Planet("Mars", 2)
print(mars)
print(Planet("Venus").is_lonely())
print(mars == Planet("Mars", 2))</pre>
<p>From the fields, <code>@dataclass</code> generated:</p>
<ul>
  <li><code>__init__</code> taking <code>name</code>, <code>moons</code> and <code>rings</code> in that order, with the defaults you gave;</li>
  <li><code>__repr__</code> that shows every field, like <code>Planet(name='Mars', moons=2, rings=[])</code>;</li>
  <li><code>__eq__</code>, so two instances with equal fields compare equal. A plain class compares by identity instead.</li>
</ul>
<p>You can still add your own methods, including <code>__str__</code>. The <code>str</code> and <code>int</code> annotations document the intended types; Python does not check them.</p>
<div class="warn"><strong>Watch out</strong> A mutable default such as <code>rings: list = []</code> is rejected with a <code>ValueError</code>, because every instance would share one list. Use <code>field(default_factory=list)</code> so each instance gets a fresh list.</div>`,
      quiz: [
        { q: `Which method does <code>print(obj)</code> use when the class defines both?`,
          options: ["__repr__", "__init__", "__str__", "__print__"],
          answer: 2,
          explain: "print() converts the object with str(), which calls __str__. repr() and containers use __repr__." },
        { q: `A class defines only <code>__repr__</code>. What does <code>str(obj)</code> return?`,
          options: ["The result of __repr__", "An empty string", "An error", "The default text with the memory address"],
          answer: 0,
          explain: "When __str__ is missing, str() falls back to __repr__." },
        { q: `What does this print?<pre class="code">from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int = 0

print(Point(3))</pre>`,
          options: ["Point(3)", "Point(x=3, y=0)", "(3, 0)", "A default text with a memory address"],
          answer: 1,
          explain: "The generated __repr__ shows the class name and every field as name=value, including defaults." }
      ],
      challenge: {
        title: "Label the Cargo Bay",
        prompt: `<p>The cargo bay robots need labelled crates. Using <code>@dataclass</code>, write a class <code>Crate</code> with two fields:</p>
<ul>
  <li><code>label</code>, a <code>str</code>;</li>
  <li><code>weight</code>, a <code>float</code> that defaults to <code>0.0</code>.</li>
</ul>
<p>Also give it a <code>__str__</code> method so that <code>str(Crate("tools", 3.0))</code> is <code>tools (3.0 kg)</code>. Keep the generated <code>__repr__</code>: <code>repr(Crate("fuel", 12.5))</code> should be <code>Crate(label='fuel', weight=12.5)</code>.</p>`,
        starter: `from dataclasses import dataclass

# Define the Crate dataclass here
`,
        tests: [
          { name: "Crate is a dataclass", code: `import dataclasses
assert dataclasses.is_dataclass(Crate)` },
          { name: "Generated repr shows both fields", code: `assert repr(Crate("fuel", 12.5)) == "Crate(label='fuel', weight=12.5)"` },
          { name: "weight defaults to 0.0 and equality works", code: `assert Crate("food") == Crate("food", 0.0)
assert Crate("food").weight == 0.0` },
          { name: "str gives 'label (weight kg)'", code: `assert str(Crate("tools", 3.0)) == "tools (3.0 kg)"
assert f"{Crate('seeds', 0.5)}" == "seeds (0.5 kg)"` }
        ],
        hints: [
          "Put @dataclass on the line above class Crate: and list the fields as label: str and weight: float = 0.0.",
          "Do not write __init__ or __repr__ yourself; the decorator makes them.",
          "__str__ can return an f-string built from self.label and self.weight."
        ],
        solution: `from dataclasses import dataclass


@dataclass
class Crate:
    label: str
    weight: float = 0.0

    def __str__(self):
        return f"{self.label} ({self.weight} kg)"
`
      }
    },
    {
      id: "m12-l3",
      title: "Starship Families",
      minutes: 10,
      sources: [
        { label: "The Python Tutorial, 9.5 Inheritance",
          url: "https://docs.python.org/3/tutorial/classes.html#inheritance" },
        { label: "Built-in Functions: super(), isinstance(), issubclass()",
          url: "https://docs.python.org/3/builtins/functions.html" }
      ],
      body: `<p>Different ships share a lot: a name, fuel, the ability to fly. Rather than copy that code into each class, you can write it once in a <strong>base class</strong> and let other classes <strong>inherit</strong> from it.</p>
<h3>Inheriting</h3>
<p>Put the base class in parentheses after the new class name. The new class (the <strong>subclass</strong>) gets every attribute and method of the base class.</p>
<pre class="code" data-run>class Ship:
    def __init__(self, name):
        self.name = name

    def describe(self):
        return f"{self.name} is a ship"

    def hail(self):
        return f"This is {self.name}, over."

class Freighter(Ship):
    pass

f = Freighter("Mule")
print(f.hail())
print(f.describe())</pre>
<p>When you call a method, Python looks for it on the object's class first, then on its base class, and so on up the family tree.</p>
<h3>Overriding and <code>super()</code></h3>
<p>A subclass can <strong>override</strong> a method by defining one with the same name. Inside it, <code>super()</code> gives access to the base class version, so you can extend behaviour instead of rewriting it. This is especially common in <code>__init__</code>.</p>
<pre class="code" data-run>class Ship:
    def __init__(self, name):
        self.name = name

    def describe(self):
        return f"{self.name} is a ship"

class Freighter(Ship):
    def __init__(self, name, cargo_limit):
        super().__init__(name)          # let Ship set up the name
        self.cargo_limit = cargo_limit

    def describe(self):                 # override
        base = super().describe()
        return f"{base} carrying up to {self.cargo_limit} t"

mule = Freighter("Mule", 300)
print(mule.name)
print(mule.describe())
print(Ship("Nova").describe())</pre>
<p>Without the <code>super().__init__(name)</code> call, <code>Ship.__init__</code> would never run and <code>mule.name</code> would not exist.</p>
<h3>Checking types</h3>
<p><code>isinstance(obj, cls)</code> is true if the object is an instance of the class <em>or one of its subclasses</em>. <code>issubclass(A, B)</code> checks the classes themselves.</p>
<pre class="code" data-run>class Ship:
    pass

class Freighter(Ship):
    pass

mule = Freighter()
print(isinstance(mule, Freighter), isinstance(mule, Ship))
print(isinstance(Ship(), Freighter))
print(issubclass(Freighter, Ship))</pre>
<div class="tip"><strong>Tip</strong> Every class ultimately inherits from <code>object</code>. Python's own exceptions form a family tree too: <code>ValueError</code> inherits from <code>Exception</code>, which is why <code>except Exception:</code> also catches a <code>ValueError</code>.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">class A:
    def hi(self):
        return "A"

class B(A):
    def hi(self):
        return "B" + super().hi()

print(B().hi())</pre>`,
          options: ["A", "B", "BA", "AB"],
          answer: 2,
          explain: "B.hi overrides A.hi, then calls the base version with super().hi(), giving 'B' + 'A'." },
        { q: `<code>class Fighter(Ship)</code> defines <code>__init__</code> but never calls <code>super().__init__()</code>. What happens?`,
          options: ["Python calls Ship.__init__ automatically afterwards", "Ship.__init__ does not run, so attributes it sets are missing", "A SyntaxError", "Fighter cannot have its own __init__"],
          answer: 1,
          explain: "Overriding replaces the base method. Ship.__init__ runs only if you call it, usually with super().__init__(...)." },
        { q: `With <code>class Freighter(Ship)</code>, what is <code>isinstance(Ship(), Freighter)</code>?`,
          options: ["True", "An error", "None", "False"],
          answer: 3,
          explain: "Every Freighter is a Ship, but a plain Ship is not a Freighter. isinstance works up the family tree, not down." }
      ],
      challenge: {
        title: "Drone Squadron",
        prompt: `<p>Build a small family of drones.</p>
<ul>
  <li><code>Drone</code>: <code>__init__(self, name)</code> stores <code>name</code>. <code>describe()</code> returns <code>"Drone NAME"</code> (for example <code>"Drone D1"</code>). <code>power()</code> returns <code>10</code>.</li>
  <li><code>ScoutDrone(Drone)</code>: <code>__init__(self, name, range_km)</code> calls <code>super().__init__(name)</code> and stores <code>range_km</code>. It overrides <code>describe()</code> to return the base description followed by <code>", range R km"</code>, for example <code>"Drone S1, range 500 km"</code>. It inherits <code>power()</code> unchanged.</li>
</ul>`,
        starter: `class Drone:
    def __init__(self, name):
        self.name = name


class ScoutDrone:
    pass
`,
        tests: [
          { name: "Drone describes itself and has power 10", code: `d = Drone("D1")
assert d.describe() == "Drone D1"
assert d.power() == 10` },
          { name: "ScoutDrone inherits from Drone", code: `assert issubclass(ScoutDrone, Drone)
assert isinstance(ScoutDrone("S1", 500), Drone)` },
          { name: "ScoutDrone stores name and range_km", code: `s = ScoutDrone("S1", 500)
assert s.name == "S1" and s.range_km == 500
assert s.power() == 10` },
          { name: "ScoutDrone overrides describe", code: `assert ScoutDrone("S1", 500).describe() == "Drone S1, range 500 km"
assert ScoutDrone("Hawk", 75).describe() == "Drone Hawk, range 75 km"` }
        ],
        hints: [
          "Write class ScoutDrone(Drone): so it inherits from Drone.",
          "In ScoutDrone.__init__, call super().__init__(name) before setting self.range_km.",
          "In ScoutDrone.describe, start from super().describe() and add the range text."
        ],
        solution: `class Drone:
    def __init__(self, name):
        self.name = name

    def describe(self):
        return f"Drone {self.name}"

    def power(self):
        return 10


class ScoutDrone(Drone):
    def __init__(self, name, range_km):
        super().__init__(name)
        self.range_km = range_km

    def describe(self):
        return f"{super().describe()}, range {self.range_km} km"
`
      }
    }
  ],
  boss: {
    title: "Boss: Fleet Commander",
    prompt: `<p>Admiral, your fleet needs a proper registry. Write:</p>
<ul>
  <li>A dataclass <code>CrewMember</code> with fields <code>name</code> and <code>role</code> (both <code>str</code>).</li>
  <li>A class <code>Ship</code>:
    <ul>
      <li><code>__init__(self, name, max_crew)</code> stores both and starts an empty list <code>crew</code>.</li>
      <li><code>add_crew(self, member)</code> appends a <code>CrewMember</code>, but raises <code>ValueError</code> if the ship is already full.</li>
      <li><code>__str__</code> returns <code>"NAME (n/max crew)"</code>, for example <code>"Nova (1/3 crew)"</code>.</li>
      <li><code>__repr__</code> returns <code>"Ship('Nova', 3)"</code> style text.</li>
    </ul>
  </li>
  <li>A subclass <code>Carrier(Ship)</code> with <code>__init__(self, name, max_crew, fighters)</code> that uses <code>super()</code> and stores <code>fighters</code>. Its <code>__str__</code> adds <code>" carrying F fighters"</code> to the base text, for example <code>"Titan (0/10 crew) carrying 6 fighters"</code>.</li>
</ul>`,
    starter: `from dataclasses import dataclass


class Ship:
    def __init__(self, name, max_crew):
        self.name = name
        self.max_crew = max_crew
`,
    tests: [
      { name: "CrewMember is a dataclass with name and role", code: `assert repr(CrewMember("Ada", "pilot")) == "CrewMember(name='Ada', role='pilot')"
assert CrewMember("Ada", "pilot") == CrewMember("Ada", "pilot")` },
      { name: "add_crew and __str__ work", code: `s = Ship("Nova", 3)
assert str(s) == "Nova (0/3 crew)"
s.add_crew(CrewMember("Ada", "pilot"))
assert str(s) == "Nova (1/3 crew)"
assert s.crew == [CrewMember("Ada", "pilot")]` },
      { name: "A full ship raises ValueError", code: `s = Ship("Pod", 1)
s.add_crew(CrewMember("Lin", "medic"))
try:
    s.add_crew(CrewMember("Sol", "cook"))
    raise AssertionError("expected ValueError")
except ValueError:
    pass
assert len(s.crew) == 1` },
      { name: "__repr__ looks like code", code: `assert repr(Ship("Nova", 3)) == "Ship('Nova', 3)"
assert repr([Ship("A", 1)]) == "[Ship('A', 1)]"` },
      { name: "Carrier inherits and extends __str__", code: `c = Carrier("Titan", 10, 6)
assert isinstance(c, Ship)
assert c.fighters == 6 and c.crew == []
c.add_crew(CrewMember("Max", "captain"))
assert str(c) == "Titan (1/10 crew) carrying 6 fighters"` }
    ],
    hints: [
      "Start with @dataclass class CrewMember: name: str and role: str. Ship needs self.crew = [] in __init__.",
      "In add_crew, compare len(self.crew) with self.max_crew and raise ValueError when they are equal.",
      "Carrier.__str__ can return super().__str__() + f\" carrying {self.fighters} fighters\"; use {self.name!r} in __repr__ for the quotes."
    ],
    solution: `from dataclasses import dataclass


@dataclass
class CrewMember:
    name: str
    role: str


class Ship:
    def __init__(self, name, max_crew):
        self.name = name
        self.max_crew = max_crew
        self.crew = []

    def add_crew(self, member):
        if len(self.crew) >= self.max_crew:
            raise ValueError(f"{self.name} is full")
        self.crew.append(member)

    def __str__(self):
        return f"{self.name} ({len(self.crew)}/{self.max_crew} crew)"

    def __repr__(self):
        return f"Ship({self.name!r}, {self.max_crew})"


class Carrier(Ship):
    def __init__(self, name, max_crew, fighters):
        super().__init__(name, max_crew)
        self.fighters = fighters

    def __str__(self):
        return f"{super().__str__()} carrying {self.fighters} fighters"
`
  }
});
