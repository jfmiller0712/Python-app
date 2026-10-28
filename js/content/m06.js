registerModule({
  id: "m06",
  order: 6,
  name: "Cargo Lists",
  topic: "Lists and tuples",
  blurb: "Load many values into one container: build, slice and reshape lists, then pack and unpack tuples.",
  lessons: [
    {
      id: "m06-l1",
      title: "Loading the Cargo Hold",
      minutes: 8,
      sources: [
        { label: "The Python Tutorial, 3. An Informal Introduction to Python (Lists)",
          url: "https://docs.python.org/3/tutorial/introduction.html" },
        { label: "Built-in Types: Sequence Types (list, tuple, range)",
          url: "https://docs.python.org/3/library/stdtypes.html" }
      ],
      body: `<p>So far each variable has held a single value. A <strong>list</strong> holds many values in a fixed order. You write a list with square brackets and separate the items with commas.</p>
<pre class="code" data-run>crates = ["fuel", "oxygen", "food"]
readings = [12, 7, 30, 4]
mixed = ["probe", 3, 2.5, True]
empty = []
print(crates)
print(len(readings))
print(len(empty))</pre>
<p><code>len()</code> gives the number of items. A list can hold any type of value, even a mix, though in practice most lists hold one kind of thing.</p>
<h3>Indexing</h3>
<p>Lists are indexed exactly like strings: the first item is at index <code>0</code>, and negative indexes count from the end.</p>
<pre class="code" data-run>crates = ["fuel", "oxygen", "food", "water"]
print(crates[0])    # first
print(crates[2])    # third
print(crates[-1])   # last
print(crates[-2])   # second to last</pre>
<p>Asking for an index that does not exist, such as <code>crates[10]</code>, stops the program with an <code>IndexError</code>.</p>
<h3>Slicing</h3>
<p>A slice <code>list[start:stop]</code> gives a <em>new</em> list from <code>start</code> up to, but not including, <code>stop</code>. Leave out a number to go from the beginning or to the end. An optional third number is the step.</p>
<pre class="code" data-run>nums = [10, 20, 30, 40, 50, 60]
print(nums[1:4])    # [20, 30, 40]
print(nums[:2])     # [10, 20]
print(nums[3:])     # [40, 50, 60]
print(nums[::2])    # [10, 30, 50]
print(nums[::-1])   # reversed copy</pre>
<h3>Lists are mutable</h3>
<p>Strings cannot be changed in place, but lists can. You can assign to an index, or even to a slice.</p>
<pre class="code" data-run>crates = ["fuel", "oxygen", "food"]
crates[1] = "water"
print(crates)
crates[0:2] = ["spares", "tools", "seeds"]
print(crates)</pre>
<h3>Membership and loops</h3>
<p>The <code>in</code> operator checks whether a value is in a list, and a <code>for</code> loop visits each item in order.</p>
<pre class="code" data-run>crew = ["Ada", "Lin", "Sol"]
print("Lin" in crew)
print("Max" not in crew)
for name in crew:
    print("Welcome aboard,", name)</pre>
<h3>Lists inside lists</h3>
<p>An item can itself be a list. Use two indexes to reach inside.</p>
<pre class="code" data-run>grid = [[1, 2, 3], [4, 5, 6]]
print(grid[1])      # [4, 5, 6]
print(grid[1][0])   # 4</pre>
<div class="tip"><strong>Tip</strong> Because a slice always makes a new list, <code>copy = items[:]</code> is a quick way to copy a whole list.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">nums = [5, 6, 7, 8]
print(nums[-1])</pre>`,
          options: ["5", "7", "8", "An error"],
          answer: 2,
          explain: "Negative indexes count from the end, so -1 is the last item, 8." },
        { q: `What does this print?<pre class="code">nums = [10, 20, 30, 40, 50]
print(nums[1:3])</pre>`,
          options: ["[20, 30]", "[10, 20, 30]", "[20, 30, 40]", "[30, 40]"],
          answer: 0,
          explain: "A slice includes the start index (1) and stops before the stop index (3), giving the items at 1 and 2." },
        { q: `Which statement about lists and strings is true?`,
          options: ["Both can be changed in place", "Neither can be indexed", "Strings can be changed in place but lists cannot", "Lists can be changed in place but strings cannot"],
          answer: 3,
          explain: "Lists are mutable, so crates[0] = 'x' works. Strings are immutable; you build a new string instead." },
        { q: `What does <code>len([[1, 2], [3, 4], [5]])</code> return?`,
          options: ["5", "3", "2", "1"],
          answer: 1,
          explain: "The outer list has three items, each of which happens to be a list. len() counts only the outer items." }
      ],
      challenge: {
        title: "Cargo Manifest Check",
        prompt: `<p>The quartermaster has loaded the crate weights into a list:</p>
<pre class="code">crates = [12, 7, 30, 4, 18]</pre>
<p>Complete the manifest:</p>
<ul>
  <li>Store the first weight in <code>first</code> and the last weight in <code>last</code> (use indexes, not the numbers themselves).</li>
  <li>Store a slice of the middle three weights (<code>[7, 30, 4]</code>) in <code>middle</code>.</li>
  <li>The crate at index 2 was re-weighed: change it to <code>25</code>.</li>
  <li>Print the updated list.</li>
</ul>`,
        starter: `crates = [12, 7, 30, 4, 18]\n\n# Write your code below\n`,
        tests: [
          { name: "first is 12 and last is 18", code: `assert first == 12 and last == 18` },
          { name: "middle is [7, 30, 4]", code: `assert middle == [7, 30, 4]` },
          { name: "crates[2] was changed to 25", code: `assert crates == [12, 7, 25, 4, 18]` },
          { name: "The updated list is printed", code: `assert "[12, 7, 25, 4, 18]" in __output__` }
        ],
        hints: ["Index 0 is the first item and index -1 is the last.", "The middle three items start at index 1 and stop before index 4.", "Take the slice BEFORE you change crates[2], or the slice will show the new value."],
        solution: `crates = [12, 7, 30, 4, 18]
first = crates[0]
last = crates[-1]
middle = crates[1:4]
crates[2] = 25
print(crates)`
      }
    },
    {
      id: "m06-l2",
      title: "Rearranging the Hold",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 5. Data Structures (More on Lists)",
          url: "https://docs.python.org/3/tutorial/datastructures.html" },
        { label: "Sorting Techniques (HOWTO)",
          url: "https://docs.python.org/3/howto/sorting.html" },
        { label: "Built-in Functions: sorted(), len()",
          url: "https://docs.python.org/3/library/functions.html" }
      ],
      body: `<p>Lists come with <strong>methods</strong>: actions you call with a dot, like <code>crates.append("fuel")</code>. Most list methods change the list in place.</p>
<h3>Adding items</h3>
<ul>
  <li><code>append(x)</code> adds one item to the end.</li>
  <li><code>extend(other)</code> adds every item from another list (or any iterable) to the end.</li>
  <li><code>insert(i, x)</code> puts <code>x</code> at index <code>i</code>, shifting later items right.</li>
</ul>
<pre class="code" data-run>hold = ["fuel"]
hold.append("food")
hold.extend(["water", "seeds"])
hold.insert(0, "tools")
print(hold)</pre>
<div class="warn"><strong>Watch out</strong> <code>hold.append(["a", "b"])</code> adds ONE item (a list inside the list). Use <code>extend</code> to add the items separately.</div>
<h3>Removing items</h3>
<ul>
  <li><code>pop()</code> removes and returns the last item; <code>pop(i)</code> removes and returns the item at index <code>i</code>.</li>
  <li><code>remove(x)</code> removes the first item equal to <code>x</code> (an error if there is none).</li>
</ul>
<pre class="code" data-run>hold = ["tools", "fuel", "food", "fuel", "water"]
last = hold.pop()
print(last, hold)
first = hold.pop(0)
print(first, hold)
hold.remove("fuel")     # only the first "fuel"
print(hold)</pre>
<h3>Searching and counting</h3>
<p><code>index(x)</code> returns the position of the first <code>x</code>, and <code>count(x)</code> returns how many times <code>x</code> appears.</p>
<pre class="code" data-run>signals = [3, 9, 3, 1, 3]
print(signals.index(9))   # 1
print(signals.count(3))   # 3</pre>
<h3>Sorting and reversing</h3>
<p>There are two ways to sort, and the difference matters:</p>
<ul>
  <li><code>items.sort()</code> is a method. It sorts the list <em>in place</em> and returns <code>None</code>.</li>
  <li><code>sorted(items)</code> is a built-in function. It returns a <em>new</em> sorted list and leaves the original alone.</li>
</ul>
<pre class="code" data-run>temps = [31, 12, 45, 7]
ordered = sorted(temps)
print(ordered, temps)       # original unchanged
temps.sort(reverse=True)
print(temps)                # changed in place
temps.reverse()
print(temps)                # order flipped</pre>
<div class="warn"><strong>Watch out</strong> <code>temps = temps.sort()</code> is a classic bug: <code>sort()</code> returns <code>None</code>, so you lose your list. Either call <code>temps.sort()</code> on its own line or use <code>sorted()</code>.</div>
<p>Strings sort alphabetically, with capital letters before lowercase ones. A list that mixes numbers and strings cannot be sorted.</p>
<h3>Two names, one list</h3>
<p>Assigning a list to a new variable does not copy it. Both names refer to the same list, so a change through one is visible through the other. Use <code>copy()</code> (or <code>[:]</code>) when you need an independent list.</p>
<pre class="code" data-run>a = [1, 2, 3]
b = a
c = a.copy()
a.append(4)
print(b)   # [1, 2, 3, 4]
print(c)   # [1, 2, 3]</pre>`,
      quiz: [
        { q: `What does this print?<pre class="code">nums = [3, 1, 2]
result = nums.sort()
print(result)</pre>`,
          options: ["[1, 2, 3]", "[3, 1, 2]", "None", "An error"],
          answer: 2,
          explain: "list.sort() sorts in place and returns None, so result is None. Use sorted(nums) if you want a new list back." },
        { q: `After <code>x = [1, 2]</code> and <code>x.append([3, 4])</code>, what is <code>len(x)</code>?`,
          options: ["3", "4", "2", "1"],
          answer: 0,
          explain: "append adds exactly one item; here that item is the list [3, 4]. extend would have added two items." },
        { q: `What does this print?<pre class="code">ship = ["a", "b", "c"]
item = ship.pop(0)
print(item, ship)</pre>`,
          options: ["c ['a', 'b']", "a ['b', 'c']", "a ['a', 'b', 'c']", "0 ['b', 'c']"],
          answer: 1,
          explain: "pop(0) removes the item at index 0 and returns it." },
        { q: `What does this print?<pre class="code">a = [5, 6]
b = a
b.append(7)
print(a)</pre>`,
          options: ["[5, 6]", "[7]", "An error", "[5, 6, 7]"],
          answer: 3,
          explain: "b = a makes b another name for the same list, so appending through b changes what a sees too." }
      ],
      challenge: {
        title: "Sensor Log Cleanup",
        prompt: `<p>The long-range sensors logged these readings:</p>
<pre class="code">readings = [42, 17, 99, 17, 63, 5]</pre>
<p>Engineering needs the log tidied up. In this order:</p>
<ol>
  <li>Store a <em>new</em> sorted copy in <code>ordered</code> (smallest first) without changing <code>readings</code>.</li>
  <li>Store how many times <code>17</code> appears in <code>count17</code>, and the index of <code>99</code> in <code>pos99</code>.</li>
  <li>Remove the faulty reading <code>5</code> from <code>readings</code>, then append the new reading <code>70</code>.</li>
  <li>Print <code>readings</code>.</li>
</ol>`,
        starter: `readings = [42, 17, 99, 17, 63, 5]\n\n# Write your code below\n`,
        tests: [
          { name: "ordered is a sorted copy", code: `assert ordered == [5, 17, 17, 42, 63, 99]` },
          { name: "count17 is 2 and pos99 is 2", code: `assert count17 == 2 and pos99 == 2` },
          { name: "readings ends as [42, 17, 99, 17, 63, 70]", code: `assert readings == [42, 17, 99, 17, 63, 70]` },
          { name: "The final readings list is printed", code: `assert "[42, 17, 99, 17, 63, 70]" in __output__` }
        ],
        hints: ["sorted(readings) returns a new list; readings.sort() would change readings itself.", "Use the count(), index(), remove() and append() methods."],
        solution: `readings = [42, 17, 99, 17, 63, 5]
ordered = sorted(readings)
count17 = readings.count(17)
pos99 = readings.index(99)
readings.remove(5)
readings.append(70)
print(readings)`
      }
    },
    {
      id: "m06-l3",
      title: "Comprehensions and Tuples",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 5. Data Structures (List Comprehensions; Tuples and Sequences)",
          url: "https://docs.python.org/3/tutorial/datastructures.html" },
        { label: "Built-in Types: Sequence Types (list, tuple, range)",
          url: "https://docs.python.org/3/library/stdtypes.html" },
        { label: "PEP 3132: Extended Iterable Unpacking",
          url: "https://peps.python.org/pep-3132/" }
      ],
      body: `<h3>List comprehensions</h3>
<p>Building a new list from an old one is so common that Python has a short form for it. Compare a loop with a <strong>list comprehension</strong>:</p>
<pre class="code" data-run>fuel = [3, 8, 1, 12]

doubled = []
for f in fuel:
    doubled.append(f * 2)
print(doubled)

doubled = [f * 2 for f in fuel]
print(doubled)</pre>
<p>Read it as "<em>f times 2</em>, for each <em>f</em> in <em>fuel</em>". You can add an <code>if</code> at the end to keep only some items:</p>
<pre class="code" data-run>fuel = [3, 8, 1, 12, 6]
big = [f for f in fuel if f &gt; 5]
print(big)
names = ["vega", "rigel", "sol"]
print([n.upper() for n in names])
print([n * n for n in range(5)])</pre>
<p>Use a comprehension when it stays easy to read. If it needs several conditions or nested loops, a regular <code>for</code> loop is often clearer.</p>
<h3>Tuples</h3>
<p>A <strong>tuple</strong> is like a list that cannot be changed. You write it with parentheses (or just commas). Tuples are good for small, fixed groups such as coordinates or a name and a score.</p>
<pre class="code" data-run>point = (4, -2, 9)
print(point[0], len(point))
print(point[1:])
single = (5,)      # the comma makes it a tuple
print(type(single))
print(type((5)))   # just the number 5</pre>
<p>Indexing, slicing, <code>len()</code>, <code>in</code>, <code>count()</code> and <code>index()</code> all work on tuples. Trying to change an item, like <code>point[0] = 1</code>, raises a <code>TypeError</code>.</p>
<h3>Packing and unpacking</h3>
<p>Writing <code>t = 1, 2, 3</code> <em>packs</em> values into a tuple. The reverse, <em>unpacking</em>, assigns each item to its own variable. The number of names must match the number of items.</p>
<pre class="code" data-run>ship = ("Comet", 7, 0.85)      # packing
name, crew, fuel = ship        # unpacking
print(name, crew, fuel)

a, b = 1, 2
a, b = b, a                    # swap in one line
print(a, b)

first, *rest = [10, 20, 30, 40]
print(first, rest)</pre>
<p>A starred name such as <code>*rest</code> collects the leftover items into a list.</p>
<h3>Unpacking in loops</h3>
<p>Unpacking works in <code>for</code> loops too. <code>enumerate()</code> gives (index, item) pairs, and <code>zip()</code> pairs up items from two lists.</p>
<pre class="code" data-run>crew = ["Ada", "Lin", "Sol"]
for i, name in enumerate(crew):
    print(i, name)

roles = ["pilot", "engineer", "medic"]
for name, role in zip(crew, roles):
    print(name, "is the", role)

stops = [("Mars", 2), ("Ceres", 5)]
for planet, days in stops:
    print(planet, days)</pre>`,
      quiz: [
        { q: `What does this print?<pre class="code">print([n * 10 for n in [1, 2, 3] if n != 2])</pre>`,
          options: ["[10, 20, 30]", "[10, 30]", "[20]", "[1, 3]"],
          answer: 1,
          explain: "The if keeps only 1 and 3; each kept value is then multiplied by 10." },
        { q: `Which of these creates a tuple with one item?`,
          options: ["(5)", "[5]", "tuple 5", "(5,)"],
          answer: 3,
          explain: "The comma makes the tuple. (5) is just the number 5 in parentheses." },
        { q: `What does this print?<pre class="code">x, y = 3, 8
x, y = y, x
print(x, y)</pre>`,
          options: ["8 3", "3 8", "8 8", "An error"],
          answer: 0,
          explain: "The right side is packed into the tuple (8, 3) first, then unpacked into x and y, swapping them." },
        { q: `What is <code>rest</code> after <code>first, *rest = (1, 2, 3)</code>?`,
          options: ["(2, 3)", "[2, 3]", "3", "[1, 2, 3]"],
          answer: 1,
          explain: "A starred target always collects the leftover items into a list, even when unpacking a tuple." }
      ],
      challenge: {
        title: "Fuel Converter Array",
        prompt: `<p>The fuel converters report these levels:</p>
<pre class="code">fuel = [3, 8, 1, 12, 6]
position = (4, -2, 9)</pre>
<ul>
  <li>Use a list comprehension to make <code>doubled</code>: every level times 2.</li>
  <li>Use a list comprehension with <code>if</code> to make <code>big</code>: only the levels greater than 5.</li>
  <li>Unpack <code>position</code> into three variables <code>x</code>, <code>y</code> and <code>z</code> in a single line.</li>
  <li>Make a tuple <code>extremes</code> holding the smallest and largest fuel level, in that order (use <code>min()</code> and <code>max()</code>).</li>
</ul>`,
        starter: `fuel = [3, 8, 1, 12, 6]\nposition = (4, -2, 9)\n\n# Write your code below\n`,
        tests: [
          { name: "doubled is [6, 16, 2, 24, 12]", code: `assert doubled == [6, 16, 2, 24, 12]` },
          { name: "big is [8, 12, 6]", code: `assert big == [8, 12, 6]` },
          { name: "x, y, z hold 4, -2, 9", code: `assert (x, y, z) == (4, -2, 9)` },
          { name: "extremes is the tuple (1, 12)", code: `assert type(extremes) is tuple and extremes == (1, 12)` }
        ],
        hints: ["A comprehension looks like [expression for item in list].", "Add 'if f > 5' at the end of the comprehension to filter.", "x, y, z = position unpacks a 3-item tuple; (a, b) builds a tuple."],
        solution: `fuel = [3, 8, 1, 12, 6]
position = (4, -2, 9)
doubled = [f * 2 for f in fuel]
big = [f for f in fuel if f > 5]
x, y, z = position
extremes = (min(fuel), max(fuel))`
      }
    }
  ],
  boss: {
    title: "Boss: Cargo Bay Audit",
    prompt: `<p>Mission briefing: before launch, the cargo bay must pass inspection. The manifest is a list of (name, weight) tuples:</p>
<pre class="code">manifest = [("fuel", 40), ("oxygen", 25), ("food", 60), ("water", 35), ("spares", 10)]</pre>
<p>Produce the audit:</p>
<ul>
  <li><code>names</code>: a list of just the names, in manifest order (a comprehension that unpacks each tuple works well).</li>
  <li><code>heavy</code>: the names whose weight is 35 or more, in manifest order.</li>
  <li><code>total</code>: the total weight of all cargo.</li>
  <li><code>weights_desc</code>: all the weights sorted from heaviest to lightest.</li>
  <li>For each heavy item, print a line like <code>HEAVY: fuel 40</code>.</li>
</ul>`,
    starter: `manifest = [("fuel", 40), ("oxygen", 25), ("food", 60), ("water", 35), ("spares", 10)]\n\n# Write your code below\n`,
    tests: [
      { name: "names lists every cargo name in order", code: `assert names == ["fuel", "oxygen", "food", "water", "spares"]` },
      { name: "heavy is ['fuel', 'food', 'water']", code: `assert heavy == ["fuel", "food", "water"]` },
      { name: "total is 170", code: `assert total == 170` },
      { name: "weights_desc is [60, 40, 35, 25, 10]", code: `assert weights_desc == [60, 40, 35, 25, 10]` },
      { name: "Prints a HEAVY line for each heavy item", code: `lines = [l.strip() for l in __output__.splitlines()]
assert "HEAVY: fuel 40" in lines and "HEAVY: food 60" in lines and "HEAVY: water 35" in lines
assert not any("oxygen" in l or "spares" in l for l in lines)` }
    ],
    hints: ["[name for name, weight in manifest] unpacks each tuple as it goes.", "Build a list of weights first; sum() adds them up and sorted(..., reverse=True) orders them.", "Loop over manifest with 'for name, weight in manifest:' and print only when weight >= 35."],
    solution: `manifest = [("fuel", 40), ("oxygen", 25), ("food", 60), ("water", 35), ("spares", 10)]
names = [name for name, weight in manifest]
heavy = [name for name, weight in manifest if weight >= 35]
weights = [weight for name, weight in manifest]
total = sum(weights)
weights_desc = sorted(weights, reverse=True)
for name, weight in manifest:
    if weight >= 35:
        print("HEAVY:", name, weight)`
  }
});
