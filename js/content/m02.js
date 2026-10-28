registerModule({
  id: "m02",
  order: 2,
  name: "Stardust Values",
  topic: "Variables, numbers, and types",
  blurb: "Store values in variables, do arithmetic with ints and floats, and convert between types.",
  lessons: [
    {
      id: "m02-l1",
      title: "Variables and Assignment",
      minutes: 8,
      sources: [
        { label: "The Python Tutorial, 3. An Informal Introduction to Python",
          url: "https://docs.python.org/3/tutorial/introduction.html" },
        { label: "Language Reference, 7. Simple statements (assignment)",
          url: "https://docs.python.org/3/reference/simple_stmts.html" },
        { label: "PEP 8 - Style Guide for Python Code",
          url: "https://peps.python.org/pep-0008/" }
      ],
      body: `<p>A <em>variable</em> is a name that refers to a value. You create one with an <em>assignment statement</em>: a name, an equals sign, and a value.</p>
<pre class="code" data-run>crew = 4
ship_name = "Aurora"
print(ship_name, "has", crew, "crew members")</pre>
<p>The <code>=</code> sign means "make this name refer to this value". It is not the "equals" of mathematics. Python first works out the right-hand side, then attaches the name on the left to the result.</p>
<h3>Reassignment</h3>
<p>A variable can be given a new value at any time. The old value is simply replaced.</p>
<pre class="code" data-run>fuel = 100
print(fuel)
fuel = 80
print(fuel)
fuel = fuel - 30   # take the current value, subtract 30, store it back
print(fuel)</pre>
<p>The line <code>fuel = fuel - 30</code> would make no sense in maths, but in Python it is common: compute <code>fuel - 30</code> using the current value (80), then make <code>fuel</code> refer to the answer (50).</p>
<h3>Augmented assignment</h3>
<p>Because updating a variable is so common, Python has shortcuts:</p>
<pre class="code" data-run>score = 10
score += 5    # same as score = score + 5
score -= 3    # same as score = score - 3
score *= 2    # same as score = score * 2
print(score)</pre>
<p>You can also assign several names in one line: <code>x, y = 3, 7</code> sets <code>x</code> to 3 and <code>y</code> to 7.</p>
<h3>Naming rules</h3>
<ul>
  <li>Names may contain letters, digits, and underscores <code>_</code>.</li>
  <li>A name cannot start with a digit: <code>2nd_stage</code> is invalid, <code>stage_2</code> is fine.</li>
  <li>No spaces or symbols such as <code>-</code> or <code>!</code>.</li>
  <li>Names are case-sensitive: <code>speed</code> and <code>Speed</code> are different variables.</li>
  <li>You cannot use <em>keywords</em> such as <code>if</code>, <code>for</code>, <code>True</code>, or <code>class</code> as names.</li>
</ul>
<h3>Naming style</h3>
<p>The official style guide, PEP 8, recommends lowercase words separated by underscores for variable names, such as <code>max_speed</code>. This is called <em>snake_case</em>. Choose descriptive names: <code>distance_km</code> tells the reader far more than <code>d</code>.</p>
<div class="warn"><strong>Watch out</strong> Using a variable before assigning it causes a <code>NameError</code>. Python only knows a name after an assignment to it has run.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">x = 5
x = x + 2
print(x)</pre>`,
          options: ["5", "x + 2", "7", "An error"],
          answer: 2,
          explain: "Python computes x + 2 with the current value 5, giving 7, and stores it back in x." },
        { q: `Which is a valid variable name?`,
          options: ["2fast", "warp_speed", "warp-speed", "for"],
          answer: 1,
          explain: "Names cannot start with a digit, cannot contain '-', and cannot be keywords such as for." },
        { q: `What does this print?<pre class="code">n = 10
n -= 4
n *= 3
print(n)</pre>`,
          options: ["18", "26", "6", "30"],
          answer: 0,
          explain: "n becomes 10 - 4 = 6, then 6 * 3 = 18." }
      ],
      challenge: {
        title: "Cargo Manifest",
        prompt: `<p>Log the cargo bay before departure.</p>
<ul>
  <li>Create a variable <code>crates</code> holding <code>12</code>.</li>
  <li>Two more crates are loaded: increase <code>crates</code> by 2 using <code>+=</code>.</li>
  <li>Create a variable <code>ship_name</code> holding the text <code>Nova</code>.</li>
  <li>Print <code>Nova carries 14 crates</code> using your variables.</li>
</ul>`,
        starter: `crates = 12\n# your code here\n`,
        tests: [
          { name: "crates is 14", code: `assert crates == 14` },
          { name: "ship_name is \"Nova\"", code: `assert ship_name == "Nova"` },
          { name: "Prints Nova carries 14 crates", code: `assert __output__.strip() == "Nova carries 14 crates"` }
        ],
        hints: ["crates += 2 adds 2 to the current value.", "print() can take several values separated by commas: print(ship_name, \"carries\", ...)."],
        solution: `crates = 12\ncrates += 2\nship_name = "Nova"\nprint(ship_name, "carries", crates, "crates")`
      }
    },
    {
      id: "m02-l2",
      title: "Numbers and Arithmetic",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 3.1.1 Numbers",
          url: "https://docs.python.org/3/tutorial/introduction.html" },
        { label: "Built-in Types: Numeric Types",
          url: "https://docs.python.org/3/library/stdtypes.html" },
        { label: "Language Reference, 6. Expressions (operator precedence)",
          url: "https://docs.python.org/3/reference/expressions.html" },
        { label: "The Python Tutorial, 15. Floating-Point Arithmetic",
          url: "https://docs.python.org/3/tutorial/floatingpoint.html" }
      ],
      body: `<p>Python has two everyday kinds of number:</p>
<ul>
  <li><code>int</code> (integer): whole numbers such as <code>7</code>, <code>-3</code>, <code>0</code>. They can be as large as you like.</li>
  <li><code>float</code> (floating-point): numbers with a decimal point such as <code>3.14</code> or <code>2.0</code>.</li>
</ul>
<h3>The arithmetic operators</h3>
<pre class="code" data-run>print(7 + 2)    # addition: 9
print(7 - 2)    # subtraction: 5
print(7 * 2)    # multiplication: 14
print(7 / 2)    # division: 3.5 (always a float)
print(7 // 2)   # floor division: 3
print(7 % 2)    # remainder (modulo): 1
print(7 ** 2)   # power: 49</pre>
<h3>Division, three ways</h3>
<p><code>/</code> always gives a float, even when the answer is whole: <code>8 / 2</code> is <code>4.0</code>. <code>//</code> divides and rounds <em>down</em> to a whole number. <code>%</code> gives what is left over. Together they answer "how many full groups, and how many remain?":</p>
<pre class="code" data-run>minutes = 135
print(minutes // 60, "hours and", minutes % 60, "minutes")</pre>
<p><code>%</code> is also a quick way to test evenness: <code>n % 2</code> is <code>0</code> for even numbers and <code>1</code> for odd ones.</p>
<h3>Mixing ints and floats</h3>
<p>If either side of an operator is a float, the result is a float: <code>3 + 1.5</code> is <code>4.5</code>, and <code>2 * 3.0</code> is <code>6.0</code>.</p>
<p>Floats are stored in binary, so some decimals cannot be stored exactly. <code>0.1 + 0.2</code> prints <code>0.30000000000000004</code>. This is normal in every language. Use <code>round(value, 2)</code> to round to 2 decimal places when displaying.</p>
<pre class="code" data-run>print(0.1 + 0.2)
print(round(0.1 + 0.2, 2))</pre>
<h3>Precedence: which operation goes first?</h3>
<p>Python follows the usual maths order:</p>
<ol>
  <li>Parentheses <code>( )</code></li>
  <li>Power <code>**</code></li>
  <li><code>*</code>, <code>/</code>, <code>//</code>, <code>%</code> (left to right)</li>
  <li><code>+</code>, <code>-</code> (left to right)</li>
</ol>
<pre class="code" data-run>print(2 + 3 * 4)     # 14, multiplication first
print((2 + 3) * 4)   # 20, parentheses first
print(2 ** 3 ** 2)   # 512, ** groups right to left: 2 ** 9</pre>
<div class="tip"><strong>Tip</strong> When in doubt, add parentheses. They make your intent clear to readers, too.</div>
<div class="warn"><strong>Watch out</strong> Dividing by zero with <code>/</code>, <code>//</code>, or <code>%</code> raises a <code>ZeroDivisionError</code>.</div>`,
      quiz: [
        { q: `What does <code>print(17 // 5)</code> show?`,
          options: ["3.4", "3", "2", "4"],
          answer: 1,
          explain: "// divides and rounds down to a whole number: 17 / 5 is 3.4, so 17 // 5 is 3." },
        { q: `What does <code>print(17 % 5)</code> show?`,
          options: ["3", "0.4", "12", "2"],
          answer: 3,
          explain: "% gives the remainder: 5 goes into 17 three times (15), leaving 2." },
        { q: `What does <code>print(10 / 2)</code> show?`,
          options: ["5.0", "5", "2", "An error"],
          answer: 0,
          explain: "The / operator always produces a float, so the result is 5.0." },
        { q: `What does <code>print(1 + 2 * 3 ** 2)</code> show?`,
          options: ["81", "19", "37", "27"],
          answer: 1,
          explain: "** first: 3 ** 2 = 9. Then 2 * 9 = 18. Then 1 + 18 = 19." }
      ],
      challenge: {
        title: "Fuel Pods",
        prompt: `<p>The station has <code>250</code> litres of fuel. Each fuel pod holds <code>40</code> litres.</p>
<ul>
  <li>Set <code>fuel = 250</code> and <code>pod_size = 40</code>.</li>
  <li>Compute <code>full_pods</code>: how many pods can be completely filled.</li>
  <li>Compute <code>leftover</code>: how many litres remain after filling them.</li>
  <li>Compute <code>area</code>: the area of a circular landing pad of radius 3, using <code>3.14</code> for pi (pi times radius squared).</li>
</ul>
<p>Use operators to calculate the answers; do not type the results in directly.</p>`,
        starter: `fuel = 250\npod_size = 40\nfull_pods = 0\nleftover = 0\narea = 0\n`,
        tests: [
          { name: "full_pods is 6", code: `assert full_pods == 6 and type(full_pods) is int` },
          { name: "leftover is 10", code: `assert leftover == 10` },
          { name: "area is about 28.26", code: `assert abs(area - 28.26) < 0.001` }
        ],
        hints: ["Floor division // tells you how many whole pods fit.", "The remainder operator % gives the leftover litres.", "Radius squared is 3 ** 2."],
        solution: `fuel = 250\npod_size = 40\nfull_pods = fuel // pod_size\nleftover = fuel % pod_size\narea = 3.14 * 3 ** 2`
      }
    },
    {
      id: "m02-l3",
      title: "Types, Conversion, and None",
      minutes: 8,
      sources: [
        { label: "Built-in Functions (type, int, float, str)",
          url: "https://docs.python.org/3/library/functions.html" },
        { label: "Built-in Constants (None)",
          url: "https://docs.python.org/3/library/constants.html" },
        { label: "Built-in Types",
          url: "https://docs.python.org/3/library/stdtypes.html" }
      ],
      body: `<p>Every value in Python has a <em>type</em>. The type decides what you can do with the value. The built-in function <code>type()</code> tells you a value's type.</p>
<pre class="code" data-run>print(type(42))
print(type(3.5))
print(type("42"))</pre>
<p>Notice that <code>"42"</code> is a <code>str</code> (string), not a number. It looks like a number, but it is text.</p>
<h3>Why types matter</h3>
<p>The same operator can do different things for different types. <code>+</code> adds numbers but joins strings:</p>
<pre class="code" data-run>print(4 + 2)
print("4" + "2")</pre>
<p>Mixing a string and a number with <code>+</code> is an error:</p>
<pre class="code">print("Level " + 5)
# TypeError: can only concatenate str (not "int") to str</pre>
<h3>Converting between types</h3>
<p>The functions <code>int()</code>, <code>float()</code>, and <code>str()</code> build a new value of that type from another value:</p>
<pre class="code" data-run>print(int("42") + 1)      # text to integer: 43
print(float("2.5") * 2)   # text to float: 5.0
print("Level " + str(5))  # number to text: Level 5
print(int(9.99))          # float to int drops the fraction: 9
print(float(7))           # 7.0</pre>
<ul>
  <li><code>int()</code> on a float <em>truncates</em> (cuts off the decimal part toward zero). It does not round. Use <code>round()</code> to round.</li>
  <li><code>int("3.5")</code> fails: <code>int()</code> only accepts strings that look like whole numbers. Use <code>float("3.5")</code> instead.</li>
  <li><code>int("hello")</code> raises a <code>ValueError</code> because the text is not a number.</li>
</ul>
<p>Conversion becomes important soon: when a program reads what a user types, it always arrives as a string, and you must convert it before doing maths.</p>
<h3>None: the absence of a value</h3>
<p><code>None</code> is a special value meaning "nothing here" or "no value yet". Its type is <code>NoneType</code>, and there is only one <code>None</code>.</p>
<pre class="code" data-run>destination = None
print(destination)
print(type(destination))</pre>
<p>You will meet <code>None</code> again later. For now, remember that it is not the same as <code>0</code> or an empty string; it is its own value.</p>
<div class="tip"><strong>Tip</strong> In the interactive interpreter, <code>type(x)</code> is a fast way to investigate a confusing error.</div>`,
      quiz: [
        { q: `What is <code>type("3.0")</code>?`,
          options: ["&lt;class 'float'&gt;", "&lt;class 'int'&gt;", "&lt;class 'str'&gt;", "&lt;class 'NoneType'&gt;"],
          answer: 2,
          explain: "The value is in quotes, so it is a string, even though it looks like a number." },
        { q: `What does <code>print(int(7.8))</code> show?`,
          options: ["8", "7", "7.8", "An error"],
          answer: 1,
          explain: "int() on a float drops the fractional part. It does not round." },
        { q: `What does <code>print("5" + "5")</code> show?`,
          options: ["55", "10", "An error", "5 5"],
          answer: 0,
          explain: "Both values are strings, so + joins them." },
        { q: `What is <code>None</code>?`,
          options: ["Another name for 0", "An empty string", "An error", "A special value meaning no value"],
          answer: 3,
          explain: "None is its own value (type NoneType) used to represent the absence of a value." }
      ],
      challenge: {
        title: "Decode the Readings",
        prompt: `<p>Sensor readings arrive as text. Convert them so the ship's computer can use them.</p>
<ul>
  <li><code>distance_text = "120"</code> and <code>speed_text = "7.5"</code> are given.</li>
  <li>Create <code>distance</code> as an <code>int</code> and <code>speed</code> as a <code>float</code> from those strings.</li>
  <li>Compute <code>hours = distance / speed</code>.</li>
  <li>Print <code>Arrival in 16.0 hours</code> by joining strings with <code>+</code> (use <code>str()</code>).</li>
</ul>`,
        starter: `distance_text = "120"\nspeed_text = "7.5"\n# convert and calculate here\n`,
        tests: [
          { name: "distance is the int 120", code: `assert distance == 120 and type(distance) is int` },
          { name: "speed is the float 7.5", code: `assert speed == 7.5 and type(speed) is float` },
          { name: "hours is 16.0", code: `assert hours == 16.0` },
          { name: "Prints Arrival in 16.0 hours", code: `assert __output__.strip() == "Arrival in 16.0 hours"` }
        ],
        hints: ["int(distance_text) turns the text \"120\" into the number 120.", "To join a number to a string with +, wrap the number in str() first."],
        solution: `distance_text = "120"\nspeed_text = "7.5"\ndistance = int(distance_text)\nspeed = float(speed_text)\nhours = distance / speed\nprint("Arrival in " + str(hours) + " hours")`
      }
    }
  ],
  boss: {
    title: "Stardust Refinery",
    prompt: `<p>The refinery turns raw stardust into crystals. Readings arrive as text.</p>
<ul>
  <li>Given <code>raw = "1000"</code> (grams of stardust) and <code>rate_text = "0.35"</code> (fraction that becomes crystal).</li>
  <li>Set <code>grams</code> to <code>raw</code> converted to an <code>int</code>, and <code>rate</code> to <code>rate_text</code> converted to a <code>float</code>.</li>
  <li><code>crystal</code>: grams of crystal produced, <code>grams * rate</code>, converted to an <code>int</code>.</li>
  <li><code>boxes</code>: crystals are packed 60 grams per box. How many full boxes?</li>
  <li><code>spare</code>: grams of crystal left over after packing.</li>
  <li>Finally, print <code>350 g -&gt; 5 boxes, 50 g spare</code> using your variables (print with commas is fine).</li>
</ul>`,
    starter: `raw = "1000"\nrate_text = "0.35"\n`,
    tests: [
      { name: "grams and rate converted", code: `assert grams == 1000 and type(grams) is int and rate == 0.35 and type(rate) is float` },
      { name: "crystal is the int 350", code: `assert crystal == 350 and type(crystal) is int` },
      { name: "boxes is 5", code: `assert boxes == 5` },
      { name: "spare is 50", code: `assert spare == 50` },
      { name: "Prints the summary line", code: `assert __output__.strip() == "350 g -> 5 boxes, 50 g spare"` }
    ],
    hints: ["Convert first with int() and float(), then calculate.", "1000 * 0.35 is a float; wrap it in int() for crystal.", "Use // for full boxes and % for the leftover. For the comma after boxes, try print(..., \"boxes,\", ...)."],
    solution: `raw = "1000"
rate_text = "0.35"
grams = int(raw)
rate = float(rate_text)
crystal = int(grams * rate)
boxes = crystal // 60
spare = crystal % 60
print(crystal, "g ->", boxes, "boxes,", spare, "g spare")`
  }
});
