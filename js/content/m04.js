registerModule({
  id: "m04",
  order: 4,
  name: "Navigation Decisions",
  topic: "Input, booleans, and branching",
  blurb: "Read input from the pilot, compare values, and steer your program with if, elif, else, and match.",
  lessons: [
    {
      id: "m04-l1",
      title: "Input, Booleans, and Comparisons",
      minutes: 9,
      sources: [
        { label: "Built-in Functions: input(), bool()",
          url: "https://docs.python.org/3/library/functions.html" },
        { label: "Built-in Types: Comparisons and Boolean Values",
          url: "https://docs.python.org/3/library/stdtypes.html" },
        { label: "Language Reference, 6. Expressions (comparisons)",
          url: "https://docs.python.org/3/reference/expressions.html" }
      ],
      body: `<p>Programs become interesting when they react to the person using them. The built-in <code>input()</code> function pauses, shows an optional prompt, waits for the user to type a line, and returns what they typed.</p>
<pre class="code">name = input("Pilot name: ")
print(f"Welcome aboard, {name}!")</pre>
<p>In a terminal this looks like:</p>
<pre class="code">Pilot name: Zara
Welcome aboard, Zara!</pre>
<h3>input() always returns a string</h3>
<p>Even if the user types <code>42</code>, you get the string <code>"42"</code>. To do maths, convert it with <code>int()</code> or <code>float()</code>, which you met in the Stardust Values module:</p>
<pre class="code">age = int(input("Age: "))
print("Next year you will be", age + 1)</pre>
<p>If the user types something that is not a number, <code>int()</code> raises a <code>ValueError</code>. You will learn to handle that gracefully in a later module.</p>
<h3>The bool type</h3>
<p>A <em>Boolean</em> value (type <code>bool</code>) is either <code>True</code> or <code>False</code>. Note the capital letters. Booleans are the answers to yes/no questions, and they are what comparisons produce.</p>
<h3>Comparison operators</h3>
<ul>
  <li><code>==</code> equal to</li>
  <li><code>!=</code> not equal to</li>
  <li><code>&lt;</code> less than, <code>&gt;</code> greater than</li>
  <li><code>&lt;=</code> less than or equal, <code>&gt;=</code> greater than or equal</li>
</ul>
<pre class="code" data-run>fuel = 40
print(fuel &gt; 25)
print(fuel == 50)
print(fuel != 50)
print(type(fuel &gt;= 40))
print("mars" == "Mars")      # case matters
print(0 &lt; fuel &lt;= 100)       # comparisons can be chained</pre>
<p>A chained comparison like <code>0 &lt; fuel &lt;= 100</code> means "<code>0 &lt; fuel</code> and <code>fuel &lt;= 100</code>".</p>
<div class="warn"><strong>Watch out</strong> One <code>=</code> assigns; two <code>==</code> compare. Writing <code>if x = 5:</code> is a <code>SyntaxError</code>.</div>
<h3>Comparing different types</h3>
<p><code>"5" == 5</code> is <code>False</code>: a string is never equal to a number. This is the most common bug with <code>input()</code>. Ordering a string against a number, as in <code>"5" &lt; 10</code>, raises a <code>TypeError</code>. Convert first.</p>
<p>Strings compare character by character using their Unicode code points, so <code>"apple" &lt; "banana"</code> is <code>True</code>, but all capital letters sort before lowercase ones.</p>
<div class="tip"><strong>Tip</strong> Because of how floats are stored, <code>0.1 + 0.2 == 0.3</code> is <code>False</code>. When comparing floats, compare after rounding, or check that the difference is very small.</div>`,
      quiz: [
        { q: `If the user types <code>7</code>, what is the type of <code>x</code> after <code>x = input()</code>?`,
          options: ["int", "float", "str", "bool"],
          answer: 2,
          explain: "input() always returns a string. Convert it with int() to get a number." },
        { q: `What does this print?<pre class="code">print(10 != 10)</pre>`,
          options: ["True", "False", "10", "An error"],
          answer: 1,
          explain: "!= means 'not equal'. 10 is equal to 10, so the result is False." },
        { q: `What does <code>print("5" == 5)</code> show?`,
          options: ["False", "True", "An error", "5"],
          answer: 0,
          explain: "A string and an int are different types, so they are never equal." },
        { q: `What does <code>print(3 &lt; 7 &lt;= 7)</code> show?`,
          options: ["False", "An error", "7", "True"],
          answer: 3,
          explain: "It means 3 < 7 and 7 <= 7. Both are true." }
      ],
      challenge: {
        title: "Docking Clearance",
        prompt: `<p>The docking computer asks for your ship's mass in tonnes.</p>
<ul>
  <li>Read a line with <code>input("Mass: ")</code> and convert it to an <code>int</code> stored in <code>mass</code>.</li>
  <li>Set <code>cleared</code> to the Boolean result of checking that <code>mass</code> is at most <code>500</code>.</li>
  <li>Print <code>Cleared: True</code> or <code>Cleared: False</code> using <code>cleared</code>.</li>
</ul>
<p>The test enters <code>420</code>.</p>`,
        starter: `mass = input("Mass: ")\n`,
        stdin: ["420"],
        tests: [
          { name: "mass is the int 420", code: `assert mass == 420 and type(mass) is int` },
          { name: "cleared is True", code: `assert cleared is True` },
          { name: "Prints Cleared: True", code: `assert __output__.strip().splitlines()[-1].strip() == "Cleared: True"` }
        ],
        hints: ["Wrap input(...) in int(...).", "\"At most 500\" means mass <= 500. A comparison is already True or False; assign it directly."],
        solution: `mass = int(input("Mass: "))\ncleared = mass <= 500\nprint("Cleared:", cleared)`
      }
    },
    {
      id: "m04-l2",
      title: "if, elif, else, and Logic",
      minutes: 10,
      sources: [
        { label: "The Python Tutorial, 4.1 if Statements",
          url: "https://docs.python.org/3/tutorial/controlflow.html" },
        { label: "Language Reference, 8. Compound statements (the if statement)",
          url: "https://docs.python.org/3/reference/compound_stmts.html" },
        { label: "Built-in Types: Boolean Operations - and, or, not",
          url: "https://docs.python.org/3/library/stdtypes.html" }
      ],
      body: `<p>An <code>if</code> statement runs a block of code only when a condition is true.</p>
<pre class="code" data-run>fuel = 15
if fuel &lt; 20:
    print("Warning: low fuel")
    print("Return to base")
print("Status check done")</pre>
<h3>Blocks and indentation</h3>
<p>The line with <code>if</code> ends with a colon <code>:</code>. The lines that belong to it are <em>indented</em>, conventionally by 4 spaces. That indented group is a <em>block</em>. Python uses indentation, not brackets, to know where a block ends. The last line above is not indented, so it always runs.</p>
<h3>else and elif</h3>
<p><code>else</code> gives a block to run when the condition is false. <code>elif</code> ("else if") lets you test more conditions in order. Python runs the <strong>first</strong> block whose condition is true and skips the rest.</p>
<pre class="code" data-run>speed = 72
if speed &gt;= 100:
    print("Warp")
elif speed &gt;= 50:
    print("Cruise")
elif speed &gt; 0:
    print("Drift")
else:
    print("Stopped")</pre>
<p>Here <code>speed &gt;= 50</code> is the first true condition, so only <code>Cruise</code> is printed, even though <code>speed &gt; 0</code> is also true. Order your conditions carefully: put the most specific first.</p>
<h3>Combining conditions: and, or, not</h3>
<ul>
  <li><code>a and b</code> is true only if both are true.</li>
  <li><code>a or b</code> is true if at least one is true.</li>
  <li><code>not a</code> flips true and false.</li>
</ul>
<pre class="code" data-run>fuel = 80
shields = False
if fuel &gt; 50 and not shields:
    print("Can fly, but raise shields first")
if fuel &lt; 10 or shields:
    print("This does not print")</pre>
<p>Precedence: <code>not</code> binds tightest, then <code>and</code>, then <code>or</code>. All comparisons happen before any of them. Use parentheses whenever mixing <code>and</code> with <code>or</code> to keep it readable.</p>
<p><code>and</code> and <code>or</code> <em>short-circuit</em>: Python stops as soon as the answer is known. In <code>False and anything</code>, the right side is never evaluated.</p>
<div class="warn"><strong>Watch out</strong> <code>if planet == "Mars" or "Venus":</code> does not do what it looks like. It means <code>(planet == "Mars") or ("Venus")</code>, and a non-empty string counts as true, so it is always true. Write <code>planet == "Mars" or planet == "Venus"</code>.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">x = 5
if x &gt; 3:
    print("A")
elif x &gt; 1:
    print("B")
else:
    print("C")</pre>`,
          options: ["A", "A and B", "B", "C"],
          answer: 0,
          explain: "The first true condition wins. x > 3 is true, so only A is printed." },
        { q: `What is <code>True and not False</code>?`,
          options: ["False", "True", "None", "An error"],
          answer: 1,
          explain: "not False is True, and True and True is True." },
        { q: `What marks which lines belong to an <code>if</code> block?`,
          options: ["Curly braces { }", "A semicolon", "The word end", "Indentation after the colon"],
          answer: 3,
          explain: "Python uses a colon followed by indented lines to define a block." },
        { q: `What does <code>print(False or 3 &gt; 2)</code> show?`,
          options: ["False", "3", "True", "An error"],
          answer: 2,
          explain: "3 > 2 is True, and False or True is True." }
      ],
      challenge: {
        title: "Shield Status Report",
        prompt: `<p>Read the shield level (a whole number from 0 to 100) with <code>input("Shields: ")</code> and print one status line:</p>
<ul>
  <li><code>80</code> or more: <code>Status: strong</code></li>
  <li><code>30</code> to <code>79</code>: <code>Status: holding</code></li>
  <li>below <code>30</code>: <code>Status: critical</code></li>
</ul>
<p>Store the converted number in <code>level</code>. The test enters <code>45</code>.</p>`,
        starter: `level = int(input("Shields: "))\n`,
        stdin: ["45"],
        tests: [
          { name: "level is 45", code: `assert level == 45` },
          { name: "Prints Status: holding", code: `assert __output__.strip().splitlines()[-1].strip() == "Status: holding"` },
          { name: "Prints only one status line", code: `assert __output__.count("Status:") == 1` }
        ],
        hints: ["Use if / elif / else, checking the highest range first.", "if level >= 80: ... elif level >= 30: ... else: ..."],
        solution: `level = int(input("Shields: "))\nif level >= 80:\n    print("Status: strong")\nelif level >= 30:\n    print("Status: holding")\nelse:\n    print("Status: critical")`
      }
    },
    {
      id: "m04-l3",
      title: "Truthiness, Nesting, and match",
      minutes: 10,
      sources: [
        { label: "Built-in Types: Truth Value Testing",
          url: "https://docs.python.org/3/library/stdtypes.html" },
        { label: "The Python Tutorial, 4. More Control Flow Tools (match statements)",
          url: "https://docs.python.org/3/tutorial/controlflow.html" },
        { label: "PEP 636 - Structural Pattern Matching: Tutorial",
          url: "https://peps.python.org/pep-0636/" }
      ],
      body: `<p>An <code>if</code> condition does not have to be a <code>bool</code>. Python can test the <em>truthiness</em> of any value.</p>
<h3>Truthy and falsy</h3>
<p>These values count as false (they are <em>falsy</em>):</p>
<ul>
  <li><code>False</code> and <code>None</code></li>
  <li>zero: <code>0</code>, <code>0.0</code></li>
  <li>empty collections, including the empty string <code>""</code></li>
</ul>
<p>Almost everything else is <em>truthy</em>. <code>bool()</code> shows how Python sees a value:</p>
<pre class="code" data-run>print(bool(0), bool(7), bool(-1))
print(bool(""), bool(" "), bool("no"))
print(bool(None))
callsign = ""
if callsign:
    print("Hello,", callsign)
else:
    print("No callsign entered")</pre>
<p><code>if callsign:</code> is the idiomatic way to say "if the string is not empty". Note that <code>" "</code> (a space) is not empty, so it is truthy.</p>
<h3>Nested conditions</h3>
<p>A block can contain another <code>if</code>. Each level adds 4 more spaces of indentation.</p>
<pre class="code" data-run>docked = True
fuel = 30
if docked:
    if fuel &lt; 50:
        print("Refuelling")
    else:
        print("Ready to launch")
else:
    print("In flight")</pre>
<p>Nesting is useful, but deep nesting gets hard to read. Often <code>and</code> or <code>elif</code> expresses the same logic more flatly: <code>if docked and fuel &lt; 50:</code>.</p>
<h3>A first look at match</h3>
<p>Python 3.10 added the <code>match</code> statement. It compares one value against several <em>patterns</em> and runs the first <code>case</code> that matches. The simplest patterns are literal values; <code>|</code> means "or"; and <code>case _:</code> is a wildcard that matches anything, like <code>else</code>.</p>
<pre class="code" data-run>command = "warp"
match command:
    case "stop":
        print("Engines off")
    case "cruise" | "warp":
        print("Engines on:", command)
    case _:
        print("Unknown command")</pre>
<p>Unlike some other languages, there is no fall-through: only one case runs. <code>match</code> can do much more (matching the shape of data), but for now, think of it as a tidy alternative to a long <code>if</code>/<code>elif</code> chain that checks one value against fixed options.</p>
<div class="tip"><strong>Tip</strong> Both <code>if</code>/<code>elif</code> and <code>match</code> are fine for simple choices. Use whichever reads more clearly.</div>`,
      quiz: [
        { q: `Which value is falsy?`,
          options: ["\"0\"", "-1", "\" \"", "0"],
          answer: 3,
          explain: "The number 0 is falsy. \"0\" and \" \" are non-empty strings, and -1 is a non-zero number, so all are truthy." },
        { q: `What does this print?<pre class="code">name = ""
if name:
    print("Hi", name)
else:
    print("Anonymous")</pre>`,
          options: ["Hi", "Anonymous", "Hi Anonymous", "Nothing"],
          answer: 1,
          explain: "An empty string is falsy, so the else block runs." },
        { q: `In a <code>match</code> statement, what does <code>case _:</code> do?`,
          options: ["Matches only an underscore string", "Causes an error", "Matches anything not matched earlier", "Matches nothing"],
          answer: 2,
          explain: "_ is the wildcard pattern. As the last case it acts like else." }
      ],
      challenge: {
        title: "Course Selector",
        prompt: `<p>Read a heading with <code>input("Heading: ")</code>. Use a <code>match</code> statement on it:</p>
<ul>
  <li><code>"N"</code> or <code>"north"</code>: print <code>Course: north</code></li>
  <li><code>"S"</code> or <code>"south"</code>: print <code>Course: south</code></li>
  <li>anything else: print <code>Course: hold position</code></li>
</ul>
<p>Before matching, clean the input with <code>.strip()</code> and store it in <code>heading</code>. The test enters <code>"  south "</code>.</p>`,
        starter: `heading = input("Heading: ")\n`,
        stdin: ["  south "],
        tests: [
          { name: "heading is stripped", code: `assert heading == "south"` },
          { name: "Prints Course: south", code: `assert __output__.strip().splitlines()[-1].strip() == "Course: south"` },
          { name: "Prints exactly one Course line", code: `assert __output__.count("Course:") == 1` }
        ],
        hints: ["heading = input(\"Heading: \").strip()", "case \"S\" | \"south\": matches either value.", "End with case _: for everything else."],
        solution: `heading = input("Heading: ").strip()\nmatch heading:\n    case "N" | "north":\n        print("Course: north")\n    case "S" | "south":\n        print("Course: south")\n    case _:\n        print("Course: hold position")`
      }
    }
  ],
  boss: {
    title: "Landing Approval",
    prompt: `<p>Air traffic control at Titan Station decides if a ship may land. Read three lines, in this order:</p>
<ol>
  <li><code>input("Callsign: ")</code>, stripped, stored in <code>callsign</code></li>
  <li><code>input("Fuel: ")</code>, a whole number, stored in <code>fuel</code></li>
  <li><code>input("Weather: ")</code>, stripped and lowercased, stored in <code>weather</code></li>
</ol>
<p>Then set <code>decision</code> to one string and print <code>Decision: </code> followed by it:</p>
<ul>
  <li><code>"denied"</code> if the callsign is empty</li>
  <li>otherwise <code>"emergency"</code> if fuel is below 10 (land no matter the weather)</li>
  <li>otherwise <code>"cleared"</code> if weather is <code>"clear"</code> or <code>"cloudy"</code></li>
  <li>otherwise <code>"wait"</code></li>
</ul>
<p>The test enters <code>Nova-7</code>, <code>55</code>, and <code>  Cloudy</code>.</p>`,
    starter: `callsign = input("Callsign: ")\nfuel = input("Fuel: ")\nweather = input("Weather: ")\n`,
    stdin: ["Nova-7", "55", "  Cloudy"],
    tests: [
      { name: "callsign is stripped", code: `assert callsign == "Nova-7"` },
      { name: "fuel is the int 55", code: `assert fuel == 55 and type(fuel) is int` },
      { name: "weather is cleaned to cloudy", code: `assert weather == "cloudy"` },
      { name: "decision is cleared", code: `assert decision == "cleared"` },
      { name: "Prints Decision: cleared", code: `assert __output__.strip().splitlines()[-1].strip() == "Decision: cleared"` }
    ],
    hints: ["Chain methods on input: input(\"Weather: \").strip().lower().", "Check the conditions in the order listed using if / elif / else. \"if not callsign:\" tests for an empty string.", "Compare weather against each option separately: weather == \"clear\" or weather == \"cloudy\"."],
    solution: `callsign = input("Callsign: ").strip()
fuel = int(input("Fuel: "))
weather = input("Weather: ").strip().lower()
if not callsign:
    decision = "denied"
elif fuel < 10:
    decision = "emergency"
elif weather == "clear" or weather == "cloudy":
    decision = "cleared"
else:
    decision = "wait"
print("Decision:", decision)`
  }
});
