registerModule({
  id: "m13",
  order: 13,
  name: "Warp Iterators",
  topic: "Iterators, generators and iteration tools",
  blurb: "Look inside the for loop: iterators, lazy generators, and the built-in tools that make data streams fly.",
  lessons: [
    {
      id: "m13-l1",
      title: "Inside the For Loop",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 9.8 Iterators",
          url: "https://docs.python.org/3/tutorial/classes.html#iterators" },
        { label: "Python Glossary: iterable, iterator",
          url: "https://docs.python.org/3/glossary.html" },
        { label: "Built-in Functions: iter(), next()",
          url: "https://docs.python.org/3/builtins/functions.html" }
      ],
      body: `<p>A <code>for</code> loop works on lists, strings, dicts, ranges and files. They all share one ability: they are <strong>iterable</strong>. This lesson shows the machinery behind that.</p>
<h3>Iterables and iterators</h3>
<ul>
  <li>An <strong>iterable</strong> is any object you can loop over. Calling <code>iter()</code> on it returns an iterator.</li>
  <li>An <strong>iterator</strong> is an object that produces values one at a time and remembers where it is. Calling <code>next()</code> on it returns the next value.</li>
  <li>When there are no values left, <code>next()</code> raises <code>StopIteration</code>.</li>
</ul>
<pre class="code" data-run>planets = ["Mercury", "Venus", "Earth"]
it = iter(planets)
print(next(it))
print(next(it))
print(next(it))
try:
    next(it)
except StopIteration:
    print("No more planets")</pre>
<h3>What <code>for</code> really does</h3>
<p>A <code>for</code> loop calls <code>iter()</code> once, then calls <code>next()</code> repeatedly, and stops quietly when <code>StopIteration</code> is raised. This <code>while</code> loop does the same job as <code>for ch in "abc": print(ch)</code>:</p>
<pre class="code" data-run>it = iter("abc")
while True:
    try:
        ch = next(it)
    except StopIteration:
        break
    print(ch)</pre>
<h3>Iterators are single-use</h3>
<p>A list can be looped over many times, because each loop asks it for a fresh iterator. An iterator itself is used up once it is exhausted. You can give <code>next()</code> a default value to return instead of raising.</p>
<pre class="code" data-run>it = iter([1, 2, 3])
print(next(it))
print(list(it))          # the rest
print(list(it))          # nothing left
print(next(it, "empty")) # default instead of StopIteration</pre>
<h3>Making your own iterator</h3>
<p>Any class can be an iterator if it has two methods: <code>__iter__</code>, which returns the iterator (usually <code>self</code>), and <code>__next__</code>, which returns the next value or raises <code>StopIteration</code>.</p>
<pre class="code" data-run>class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current &lt;= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

for n in Countdown(3):
    print(n)
print("Liftoff!")</pre>
<div class="tip"><strong>Tip</strong> Writing <code>__iter__</code> and <code>__next__</code> by hand is rarely needed. The next lesson shows generators, a much shorter way to build iterators.</div>`,
      quiz: [
        { q: `What does <code>next()</code> raise when an iterator has no more values?`,
          options: ["IndexError", "StopIteration", "ValueError", "It returns None"],
          answer: 1,
          explain: "StopIteration signals the end. A for loop catches it for you; when you call next() yourself, pass a default to avoid it." },
        { q: `What does this print?<pre class="code">it = iter([10, 20, 30])
next(it)
print(list(it))</pre>`,
          options: ["[10, 20, 30]", "[10, 20]", "[]", "[20, 30]"],
          answer: 3,
          explain: "The first next() consumed 10. list() then collects whatever the iterator has left: 20 and 30." },
        { q: `Which statement is true?`,
          options: ["A list is iterable, and iter() of it gives an iterator", "A list is an iterator", "Iterators can be restarted with next()", "Only lists can be used in for loops"],
          answer: 0,
          explain: "Lists are iterables: you can call iter() on them as often as you like to get new iterators. Iterators move forward only." }
      ],
      challenge: {
        title: "Take Only What You Need",
        prompt: `<p>The sensor array streams data faster than the ship can store it. Write <code>take(iterable, n)</code> that returns a list of the first <code>n</code> items of any iterable, using <code>iter()</code> and <code>next()</code>.</p>
<ul>
  <li>If the iterable runs out early, return what you got.</li>
  <li>Do not consume more than <code>n</code> items: other code may keep reading the same iterator afterwards.</li>
</ul>
<pre class="code">take(range(10), 3)   # [0, 1, 2]
take("ab", 5)        # ['a', 'b']</pre>`,
        starter: `def take(iterable, n):
    result = []
    it = iter(iterable)
    # Call next(it) up to n times
    return result
`,
        tests: [
          { name: "Takes the first n items", code: `assert take(range(10), 3) == [0, 1, 2]
assert take(["a", "b", "c"], 2) == ["a", "b"]` },
          { name: "Stops early when the data runs out", code: `assert take("ab", 5) == ["a", "b"]
assert take([], 3) == []` },
          { name: "Leaves the rest of an iterator untouched", code: `it = iter([1, 2, 3, 4])
assert take(it, 2) == [1, 2]
assert next(it) == 3` },
          { name: "take(x, 0) is empty", code: `assert take([1, 2, 3], 0) == []
assert take(range(5), 5) == [0, 1, 2, 3, 4]` }
        ],
        hints: [
          "Loop n times with for _ in range(n).",
          "Inside the loop, wrap next(it) in try/except StopIteration and break when it is raised.",
          "Alternatively, next(it, marker) with a unique marker object avoids the exception."
        ],
        solution: `def take(iterable, n):
    result = []
    it = iter(iterable)
    for _ in range(n):
        try:
            result.append(next(it))
        except StopIteration:
            break
    return result
`
      }
    },
    {
      id: "m13-l2",
      title: "Generators: Lazy Engines",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 9.9 Generators and 9.10 Generator Expressions",
          url: "https://docs.python.org/3/tutorial/classes.html#generators" },
        { label: "Functional Programming HOWTO (Generators)",
          url: "https://docs.python.org/3/howto/functional.html#generators" },
        { label: "PEP 255: Simple Generators",
          url: "https://peps.python.org/pep-0255/" }
      ],
      body: `<p>A <strong>generator function</strong> looks like a normal function but uses <code>yield</code> instead of (or as well as) <code>return</code>. Calling it does not run the body. Instead it returns a <strong>generator</strong>, which is an iterator.</p>
<pre class="code" data-run>def countdown(n):
    print("Starting countdown")
    while n &gt; 0:
        yield n
        n -= 1
    print("Liftoff!")

gen = countdown(3)
print(type(gen).__name__)
for value in gen:
    print(value)</pre>
<h3>How <code>yield</code> works</h3>
<p>Each time <code>next()</code> is called on the generator, the function runs until it reaches a <code>yield</code>, hands that value out, and <strong>pauses</strong>, keeping all its local variables. The next call resumes right after the <code>yield</code>. When the function ends, the generator raises <code>StopIteration</code>, so a <code>for</code> loop finishes.</p>
<pre class="code" data-run>def three_stages():
    yield "booster"
    yield "core"
    yield "capsule"

g = three_stages()
print(next(g))
print(next(g))
print(list(g))   # the rest</pre>
<p>Like every iterator, a generator is used up after one pass. Call the function again to get a fresh one.</p>
<h3>Lazy and possibly endless</h3>
<p>Generators produce values only when asked. That saves memory for large data, and even allows an endless stream, as long as the consumer stops.</p>
<pre class="code" data-run>def even_numbers():
    n = 0
    while True:
        yield n
        n += 2

for x in even_numbers():
    if x &gt; 8:
        break
    print(x)</pre>
<h3>Generator expressions</h3>
<p>A <strong>generator expression</strong> looks like a list comprehension with round brackets. It produces values lazily instead of building a list. When it is the only argument to a function, you can drop the extra brackets.</p>
<pre class="code" data-run>squares_list = [n * n for n in range(5)]
squares_gen = (n * n for n in range(5))
print(squares_list)
print(type(squares_gen).__name__)
print(sum(squares_gen))
print(sum(n * n for n in range(1, 4)))   # 1 + 4 + 9</pre>
<div class="tip"><strong>Tip</strong> If you only need to loop over the values once, for example to pass them to <code>sum()</code>, <code>max()</code> or <code>"".join()</code>, a generator expression is usually the best choice. Use a list when you need indexing or several passes.</div>`,
      quiz: [
        { q: `What happens when you call a generator function, for example <code>g = countdown(3)</code>?`,
          options: ["The whole body runs and returns a list", "The body runs up to the first yield and prints its value", "A generator object is created; the body has not started yet", "A SyntaxError, because functions cannot contain yield"],
          answer: 2,
          explain: "Calling a generator function only creates the generator. The body starts running at the first next() call." },
        { q: `What does this print?<pre class="code">def gen():
    yield 1
    yield 2

g = gen()
print(list(g), list(g))</pre>`,
          options: ["[1, 2] [1, 2]", "[1, 2] []", "[1] [2]", "An error"],
          answer: 1,
          explain: "The first list() exhausts the generator. A used-up generator yields nothing, so the second list is empty." },
        { q: `What is <code>sum(x for x in range(4))</code>?`,
          options: ["10", "4", "An error, brackets are missing", "6"],
          answer: 3,
          explain: "The generator expression yields 0, 1, 2, 3, which sum to 6. A sole argument does not need extra brackets." }
      ],
      challenge: {
        title: "Orbit Logger",
        prompt: `<p>Write two pieces for the orbit logger:</p>
<ul>
  <li>A generator function <code>orbit_log(start, step, limit)</code> that yields <code>start</code>, <code>start + step</code>, <code>start + 2*step</code>, ... as long as the value is <code>&lt;= limit</code>. It must use <code>yield</code>.</li>
  <li>A function <code>sum_of_squares(n)</code> that returns <code>1*1 + 2*2 + ... + n*n</code> using <code>sum()</code> with a generator expression.</li>
</ul>
<pre class="code">list(orbit_log(0, 5, 20))   # [0, 5, 10, 15, 20]
sum_of_squares(3)           # 14</pre>`,
        starter: `def orbit_log(start, step, limit):
    pass


def sum_of_squares(n):
    pass
`,
        tests: [
          { name: "orbit_log is a generator", code: `import types
assert isinstance(orbit_log(0, 5, 20), types.GeneratorType)` },
          { name: "orbit_log yields values up to the limit", code: `assert list(orbit_log(0, 5, 20)) == [0, 5, 10, 15, 20]
assert list(orbit_log(3, 4, 10)) == [3, 7]` },
          { name: "orbit_log yields nothing if start is past the limit", code: `assert list(orbit_log(5, 1, 4)) == []` },
          { name: "sum_of_squares adds the squares", code: `assert sum_of_squares(3) == 14
assert sum_of_squares(1) == 1
assert sum_of_squares(0) == 0` }
        ],
        hints: [
          "In orbit_log, keep a variable value = start and loop while value <= limit.",
          "Inside the loop: yield value, then add step to it.",
          "sum_of_squares can be a single line: sum(i * i for i in range(1, n + 1))."
        ],
        solution: `def orbit_log(start, step, limit):
    value = start
    while value <= limit:
        yield value
        value += step


def sum_of_squares(n):
    return sum(i * i for i in range(1, n + 1))
`
      }
    },
    {
      id: "m13-l3",
      title: "The Iteration Toolkit",
      minutes: 11,
      sources: [
        { label: "Built-in Functions: enumerate, zip, sorted, min, max, sum, any, all",
          url: "https://docs.python.org/3/builtins/functions.html" },
        { label: "Sorting Techniques HOWTO",
          url: "https://docs.python.org/3/howto/sorting.html" },
        { label: "itertools: Functions creating iterators for efficient looping",
          url: "https://docs.python.org/3/library/itertools.html" }
      ],
      body: `<p>Python ships with built-in functions that accept any iterable. Learning them replaces many hand-written loops.</p>
<h3><code>enumerate</code> and <code>zip</code></h3>
<p><code>enumerate</code> pairs each item with a counter; <code>start</code> sets the first number. <code>zip</code> walks several iterables side by side and stops at the shortest one.</p>
<pre class="code" data-run>crew = ["Ada", "Lin", "Sol"]
roles = ["pilot", "medic", "engineer"]
for number, name in enumerate(crew, start=1):
    print(number, name)
for name, role in zip(crew, roles):
    print(name, "is the", role)</pre>
<h3><code>sorted</code> with <code>key</code> and <code>reverse</code></h3>
<p><code>sorted()</code> returns a new sorted list. The <code>key</code> argument is a function applied to each item to get the value to compare. <code>reverse=True</code> sorts from high to low. Sorting is stable: items that compare equal keep their original order.</p>
<pre class="code" data-run>def by_distance(star):
    return star[1]

stars = [("Vega", 25.0), ("Sirius", 8.6), ("Altair", 16.7)]
print(sorted(stars, key=by_distance))
print(sorted(stars, key=by_distance, reverse=True))
print(sorted(["kiwi", "fig", "banana"], key=len))</pre>
<p>For a key this small, a <code>lambda</code> expression is handy: <code>lambda star: star[1]</code> is a tiny unnamed function that takes <code>star</code> and returns <code>star[1]</code>, so <code>key=lambda star: star[1]</code> does the same as <code>key=by_distance</code>.</p>
<h3>Summaries: <code>sum</code>, <code>min</code>, <code>max</code>, <code>any</code>, <code>all</code></h3>
<pre class="code" data-run>stars = [("Vega", 25.0), ("Sirius", 8.6), ("Altair", 16.7)]
print(min(stars, key=lambda s: s[1]))        # nearest star
print(max([], default="none"))               # empty input
fuel = [80, 45, 90]
print(sum(fuel), any(f &lt; 50 for f in fuel), all(f &gt; 10 for f in fuel))</pre>
<p><code>min</code> and <code>max</code> take the same <code>key</code> argument and return the whole item. <code>any</code> is true if at least one value is true; <code>all</code> is true if every value is. Note that <code>any([])</code> is <code>False</code> and <code>all([])</code> is <code>True</code>.</p>
<h3>Set and dict comprehensions</h3>
<p>Comprehensions also build sets and dicts, using curly brackets:</p>
<pre class="code" data-run>names = ["Ada", "Lin", "Ada", "Sol"]
print({n.upper() for n in names})            # set: duplicates removed
print({n: len(n) for n in names})            # dict: name -&gt; length</pre>
<h3>A glimpse of <code>itertools</code></h3>
<ul>
  <li><code>count(start, step)</code>: an endless counter.</li>
  <li><code>islice(iterable, stop)</code> or <code>islice(iterable, start, stop)</code>: slice any iterator lazily.</li>
  <li><code>chain(a, b, ...)</code>: one iterable after another.</li>
</ul>
<pre class="code" data-run>from itertools import count, islice, chain

print(list(islice(count(100, 10), 4)))
print(list(chain(["Mercury", "Venus"], ("Earth",))))</pre>`,
      quiz: [
        { q: `What does this print?<pre class="code">print(sorted(["ccc", "a", "bb"], key=len, reverse=True))</pre>`,
          options: ["['ccc', 'bb', 'a']", "['a', 'bb', 'ccc']", "['ccc', 'a', 'bb']", "[3, 2, 1]"],
          answer: 0,
          explain: "key=len compares lengths, and reverse=True puts the longest first. The items themselves are returned, not the keys." },
        { q: `What does <code>list(zip([1, 2, 3], ["a", "b"]))</code> return?`,
          options: ["[(1, 'a'), (2, 'b'), (3, None)]", "An error", "[(1, 'a'), (2, 'b')]", "[1, 'a', 2, 'b']"],
          answer: 2,
          explain: "zip stops as soon as the shortest iterable is exhausted, so the 3 is left out." },
        { q: `What is <code>all([])</code>?`,
          options: ["False", "True", "None", "An error"],
          answer: 1,
          explain: "all() is True when no item is false; an empty iterable has no false items. any([]) is False." },
        { q: `What does <code>max(["Vega", "Sirius"], key=len)</code> return?`,
          options: ["6", "'Vega'", "'Sirius'", "1"],
          answer: 2,
          explain: "With a key, max compares len() of each item but returns the item itself: 'Sirius'." }
      ],
      challenge: {
        title: "Pilot Leaderboard",
        prompt: `<p>Post the results of the asteroid-dodging trials.</p>
<ul>
  <li><code>leaderboard(names, scores)</code>: the two lists line up by position. Return a list of strings <code>"RANK. NAME - SCORE"</code>, highest score first, ranks starting at 1. Pilots with equal scores keep their original order.</li>
  <li><code>all_qualified(scores, minimum)</code>: return <code>True</code> if every score is at least <code>minimum</code>.</li>
</ul>
<pre class="code">leaderboard(["Ada", "Lin", "Sol"], [70, 95, 80])
# ['1. Lin - 95', '2. Sol - 80', '3. Ada - 70']</pre>`,
        starter: `def leaderboard(names, scores):
    lines = []
    return lines


def all_qualified(scores, minimum):
    return False
`,
        tests: [
          { name: "Sorts from highest to lowest", code: `assert leaderboard(["Ada", "Lin", "Sol"], [70, 95, 80]) == ["1. Lin - 95", "2. Sol - 80", "3. Ada - 70"]` },
          { name: "Ties keep their original order", code: `assert leaderboard(["Ada", "Lin", "Sol", "Max"], [50, 90, 50, 90]) == ["1. Lin - 90", "2. Max - 90", "3. Ada - 50", "4. Sol - 50"]` },
          { name: "Empty lists give an empty board", code: `assert leaderboard([], []) == []` },
          { name: "all_qualified checks every score", code: `assert all_qualified([60, 75, 90], 60) is True
assert all_qualified([60, 59, 90], 60) is False
assert all_qualified([], 50) is True` }
        ],
        hints: [
          "zip(names, scores) gives (name, score) pairs; sort them with key=lambda pair: pair[1] and reverse=True.",
          "Python's sort is stable, even with reverse=True, so ties stay in order.",
          "enumerate(sorted_pairs, start=1) gives the rank; all() with a generator expression handles all_qualified."
        ],
        solution: `def leaderboard(names, scores):
    pairs = sorted(zip(names, scores), key=lambda pair: pair[1], reverse=True)
    return [f"{rank}. {name} - {score}" for rank, (name, score) in enumerate(pairs, start=1)]


def all_qualified(scores, minimum):
    return all(score >= minimum for score in scores)
`
      }
    }
  ],
  boss: {
    title: "Boss: Warp Stream Processor",
    prompt: `<p>Warp sensors broadcast an endless stream of readings like <code>"Nova:120"</code> (ship name, colon, speed). Some lines are blank. Build the processor:</p>
<ul>
  <li><code>parse_readings(lines)</code>: a <strong>generator</strong> that yields <code>(name, speed)</code> tuples with <code>speed</code> as an <code>int</code>, skipping lines that are blank or only spaces. Strip spaces around the name.</li>
  <li><code>fastest_ship(lines)</code>: return the name of the ship with the highest speed, or <code>None</code> if there are no readings.</li>
  <li><code>first_fast(lines, limit, n)</code>: return a list of the names of the first <code>n</code> readings faster than <code>limit</code>. It must work on an <strong>endless</strong> stream, so stop reading as soon as you have <code>n</code> names.</li>
</ul>
<pre class="code">data = ["Nova:120", "", "Vega:300", "Orion:90"]
list(parse_readings(data))     # [('Nova', 120), ('Vega', 300), ('Orion', 90)]
fastest_ship(data)             # 'Vega'
first_fast(data, 100, 2)       # ['Nova', 'Vega']</pre>`,
    starter: `from itertools import islice


def parse_readings(lines):
    return []


def fastest_ship(lines):
    return None


def first_fast(lines, limit, n):
    return []
`,
    tests: [
      { name: "parse_readings is a generator", code: `import types
assert isinstance(parse_readings(["A:1"]), types.GeneratorType)` },
      { name: "parse_readings yields (name, int) and skips blanks", code: `assert list(parse_readings(["Nova:120", "", "   ", " Vega :300"])) == [("Nova", 120), ("Vega", 300)]` },
      { name: "fastest_ship finds the top speed", code: `assert fastest_ship(["Nova:120", "", "Vega:300", "Orion:90"]) == "Vega"
assert fastest_ship(["", " "]) is None` },
      { name: "first_fast picks the first n fast ships", code: `assert first_fast(["Nova:120", "", "Vega:300", "Orion:90", "Lux:150"], 100, 2) == ["Nova", "Vega"]
assert first_fast(["Orion:90"], 100, 3) == []` },
      { name: "first_fast works on an endless stream", code: `import itertools
stream = itertools.cycle(["Slow:10", "", "Zip:200"])
assert first_fast(stream, 100, 3) == ["Zip", "Zip", "Zip"]` }
    ],
    hints: [
      "In parse_readings: loop over lines, skip if not line.strip(), split on ':' and yield (name.strip(), int(speed)).",
      "max(parse_readings(lines), key=..., default=None) returns the whole tuple (or None); take index 0 when it is not None.",
      "For first_fast, build a generator expression of names with speed > limit, then list(islice(that_generator, n))."
    ],
    solution: `from itertools import islice


def parse_readings(lines):
    for line in lines:
        if not line.strip():
            continue
        name, speed = line.split(":")
        yield name.strip(), int(speed)


def fastest_ship(lines):
    best = max(parse_readings(lines), key=lambda reading: reading[1], default=None)
    if best is None:
        return None
    return best[0]


def first_fast(lines, limit, n):
    fast = (name for name, speed in parse_readings(lines) if speed > limit)
    return list(islice(fast, n))
`
  }
});
