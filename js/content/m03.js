registerModule({
  id: "m03",
  order: 3,
  name: "Signal Strings",
  topic: "Working with text",
  blurb: "Build, slice, transform, and format text with Python strings and f-strings.",
  lessons: [
    {
      id: "m03-l1",
      title: "String Basics",
      minutes: 8,
      sources: [
        { label: "The Python Tutorial, 3.1.2 Text",
          url: "https://docs.python.org/3/tutorial/introduction.html#text" },
        { label: "Language Reference, 2. Lexical analysis (string literals and escape sequences)",
          url: "https://docs.python.org/3/reference/lexical_analysis.html" }
      ],
      body: `<p>A <em>string</em> (type <code>str</code>) is a sequence of characters: letters, digits, spaces, punctuation, and symbols like <code>*</code>. You write a string <em>literal</em> by putting text in quotes.</p>
<h3>Choosing quotes</h3>
<p>Single quotes <code>'...'</code> and double quotes <code>"..."</code> make exactly the same kind of string. Pick whichever avoids clashing with the text inside:</p>
<pre class="code" data-run>print("It's a clear night")
print('She said "engage"')</pre>
<p>Triple quotes, <code>"""..."""</code> or <code>'''...'''</code>, let a string span several lines:</p>
<pre class="code" data-run>message = """Line one
Line two"""
print(message)</pre>
<h3>Escape sequences</h3>
<p>A backslash <code>\\</code> inside a string starts an <em>escape sequence</em>, a code for a special character:</p>
<ul>
  <li><code>\\n</code> new line</li>
  <li><code>\\t</code> tab</li>
  <li><code>\\'</code> and <code>\\"</code> a quote that does not end the string</li>
  <li><code>\\\\</code> one real backslash</li>
</ul>
<pre class="code" data-run>print("Deck A\\nDeck B")
print("Name:\\tVega")
print('It\\'s here')
print("C:\\\\stars")</pre>
<h3>Joining and repeating</h3>
<p>The <code>+</code> operator <em>concatenates</em> (joins) strings. The <code>*</code> operator repeats a string a whole number of times.</p>
<pre class="code" data-run>first = "Star"
second = "light"
print(first + second)
print("=" * 20)
print("Go! " * 3)</pre>
<p>Remember from the last module: <code>+</code> cannot join a string and a number directly. Convert the number with <code>str()</code> first.</p>
<pre class="code" data-run>sector = 7
label = "Sector " + str(sector)
print(label)
print(label + "-" * 3 + "&gt;")</pre>
<p>Notice that <code>*</code> happens before <code>+</code>, just like with numbers, so <code>"-" * 3</code> is worked out first. Joining strings never adds spaces for you; include them inside the quotes when you need them.</p>
<h3>Length</h3>
<p>The built-in function <code>len()</code> returns how many characters a string contains. Spaces and punctuation count.</p>
<pre class="code" data-run>print(len("Orion"))
print(len("Hi there!"))
print(len(""))   # the empty string has length 0</pre>
<div class="tip"><strong>Tip</strong> <code>"5" * 3</code> is <code>"555"</code>, but <code>5 * 3</code> is <code>15</code>. The type of the values decides what the operator does.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">print("ab" * 3)</pre>`,
          options: ["ab3", "ababab", "ab ab ab", "An error"],
          answer: 1,
          explain: "Multiplying a string by an integer repeats it." },
        { q: `What is <code>len("Hi, Mars")</code>?`,
          options: ["6", "7", "8", "2"],
          answer: 2,
          explain: "Count every character, including the comma and the space: H, i, comma, space, M, a, r, s = 8." },
        { q: `Which escape sequence starts a new line?`,
          options: ["\\n", "\\t", "/n", "\\\\"],
          answer: 0,
          explain: "\\n is the newline escape. \\t is a tab and \\\\ is a literal backslash." }
      ],
      challenge: {
        title: "Banner Builder",
        prompt: `<p>Build a launch banner.</p>
<ul>
  <li>Create <code>name = "Vega"</code>.</li>
  <li>Create <code>border</code>: the <code>*</code> character repeated <code>10</code> times.</li>
  <li>Create <code>greeting</code> by joining <code>"Welcome, "</code>, <code>name</code>, and <code>"!"</code> with <code>+</code>.</li>
  <li>Print <code>border</code>, then <code>greeting</code>, then <code>border</code>, each on its own line.</li>
</ul>`,
        starter: `name = "Vega"\n`,
        tests: [
          { name: "border is 10 stars", code: `assert border == "**********"` },
          { name: "greeting is Welcome, Vega!", code: `assert greeting == "Welcome, Vega!"` },
          { name: "Prints border, greeting, border", code: `assert __output__.strip().splitlines() == ["**********", "Welcome, Vega!", "**********"]` }
        ],
        hints: ["\"*\" * 10 repeats the star.", "Watch the space after the comma in \"Welcome, \"."],
        solution: `name = "Vega"\nborder = "*" * 10\ngreeting = "Welcome, " + name + "!"\nprint(border)\nprint(greeting)\nprint(border)`
      }
    },
    {
      id: "m03-l2",
      title: "Indexing and Slicing",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 3.1.2 Text (indexing and slicing)",
          url: "https://docs.python.org/3/tutorial/introduction.html#text" },
        { label: "Built-in Types: Common Sequence Operations",
          url: "https://docs.python.org/3/builtins/stdtypes.html#common-sequence-operations" }
      ],
      body: `<p>Each character in a string has a position, called its <em>index</em>. Python counts from <strong>0</strong>, not 1.</p>
<pre class="code"> P   L   A   N   E   T
 0   1   2   3   4   5
-6  -5  -4  -3  -2  -1</pre>
<h3>Indexing</h3>
<p>Put an index in square brackets to get one character:</p>
<pre class="code" data-run>word = "PLANET"
print(word[0])    # P, the first character
print(word[3])    # N
print(word[-1])   # T, the last character
print(word[-2])   # E, second from the end</pre>
<p>Negative indexes count from the end: <code>-1</code> is always the last character, whatever the length. Asking for an index that does not exist, like <code>word[10]</code>, raises an <code>IndexError</code>.</p>
<h3>Slicing</h3>
<p>A <em>slice</em> <code>s[start:stop]</code> gives a new string from index <code>start</code> up to <strong>but not including</strong> <code>stop</code>.</p>
<pre class="code" data-run>word = "PLANET"
print(word[0:3])   # PLA  (indexes 0, 1, 2)
print(word[2:5])   # ANE
print(word[:2])    # PL   (start defaults to the beginning)
print(word[3:])    # NET  (stop defaults to the end)
print(word[-3:])   # NET  (the last three characters)
print(word[:])     # PLANET (a full copy)</pre>
<p>A handy fact: the length of <code>s[a:b]</code> is <code>b - a</code> (when both are in range). Unlike indexing, slicing is forgiving: <code>word[2:100]</code> just stops at the end, with no error.</p>
<h3>Step</h3>
<p>A third number sets the step: <code>s[start:stop:step]</code>. A step of <code>-1</code> walks backwards, which reverses a string.</p>
<pre class="code" data-run>code = "ABCDEFGH"
print(code[::2])    # every second character: ACEG
print(code[::-1])   # reversed: HGFEDCBA</pre>
<h3>Strings are immutable</h3>
<p>Once a string is created it cannot be changed. You cannot assign to an index:</p>
<pre class="code">word = "PLANET"
word[0] = "C"
# TypeError: 'str' object does not support item assignment</pre>
<p>Instead, build a new string and assign it to the variable:</p>
<pre class="code" data-run>word = "PLANET"
word = "C" + word[1:]
print(word)</pre>
<div class="tip"><strong>Tip</strong> Think of indexes as pointing <em>between</em> characters, with 0 at the far left edge. Then <code>s[1:4]</code> is everything between edge 1 and edge 4.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">s = "COMET"
print(s[1])</pre>`,
          options: ["C", "O", "M", "An error"],
          answer: 1,
          explain: "Indexes start at 0, so s[1] is the second character, O." },
        { q: `What does <code>"GALAXY"[-1]</code> give?`,
          options: ["G", "X", "An error", "Y"],
          answer: 3,
          explain: "-1 is the last character." },
        { q: `What does this print?<pre class="code">s = "satellite"
print(s[2:5])</pre>`,
          options: ["tel", "ate", "atel", "sat"],
          answer: 0,
          explain: "Indexes 2, 3, 4 are t, e, l. The stop index 5 is not included." },
        { q: `What happens with <code>s = "moon"; s[0] = "n"</code>?`,
          options: ["s becomes noon", "s becomes nmoon", "TypeError: strings are immutable", "Nothing happens"],
          answer: 2,
          explain: "Strings cannot be changed in place. Build a new one instead, e.g. \"n\" + s[1:]." }
      ],
      challenge: {
        title: "Decrypt the Callsign",
        prompt: `<p>An intercepted callsign is stored in <code>signal = "XQ-ANDROMEDA-7"</code>.</p>
<ul>
  <li><code>prefix</code>: the first two characters.</li>
  <li><code>galaxy</code>: the word <code>ANDROMEDA</code>, using a slice.</li>
  <li><code>last</code>: the last character, using a negative index.</li>
  <li><code>backwards</code>: the whole signal reversed.</li>
</ul>
<p>Use indexing and slicing on <code>signal</code>; do not type the answers in directly.</p>`,
        starter: `signal = "XQ-ANDROMEDA-7"\n`,
        tests: [
          { name: "prefix is XQ", code: `assert prefix == "XQ"` },
          { name: "galaxy is ANDROMEDA", code: `assert galaxy == "ANDROMEDA"` },
          { name: "last is 7", code: `assert last == "7"` },
          { name: "backwards is the reversed signal", code: `assert backwards == "7-ADEMORDNA-QX"` }
        ],
        hints: ["Count positions from 0: X is 0, Q is 1, - is 2, A is 3.", "ANDROMEDA has 9 letters starting at index 3, so the slice stops at 12.", "A step of -1 reverses: signal[::-1]."],
        solution: `signal = "XQ-ANDROMEDA-7"\nprefix = signal[:2]\ngalaxy = signal[3:12]\nlast = signal[-1]\nbackwards = signal[::-1]`
      }
    },
    {
      id: "m03-l3",
      title: "String Methods and f-strings",
      minutes: 10,
      sources: [
        { label: "Built-in Types: String Methods",
          url: "https://docs.python.org/3/builtins/stdtypes.html#string-methods" },
        { label: "The Python Tutorial, 7. Input and Output (formatted string literals)",
          url: "https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals" },
        { label: "Lexical analysis: f-strings",
          url: "https://docs.python.org/3/reference/lexical_analysis.html#f-strings" }
      ],
      body: `<p>A <em>method</em> is a function that belongs to a value. You call it with a dot: <code>value.method()</code>. Because strings are immutable, string methods never change the original; they <strong>return a new string</strong> (or another result).</p>
<h3>Changing case and trimming</h3>
<pre class="code" data-run>raw = "  Mission Control  "
print(raw.upper())          # "  MISSION CONTROL  "
print(raw.lower())          # "  mission control  "
print(raw.strip())          # "Mission Control" (spaces removed at both ends)
print(raw.strip().lower())  # methods can be chained</pre>
<h3>Search and replace</h3>
<pre class="code" data-run>log = "engine ok, shield ok"
print(log.replace("ok", "OFFLINE"))
print(log.find("shield"))      # index where it starts: 11
print(log.find("warp"))        # -1 means not found
print(log.startswith("engine"))
print("ok" in log)            # the in operator tests for a substring</pre>
<p><code>startswith()</code> and <code>in</code> give <code>True</code> or <code>False</code>, values you will use for decisions in the next module.</p>
<h3>Splitting and joining</h3>
<p><code>split()</code> breaks a string into pieces. With no argument it splits on whitespace; with an argument it splits on that text. The result is a <em>list</em> of strings, shown in square brackets. Lists get their own module later; for now, know that <code>join()</code> glues the pieces back together with a separator.</p>
<pre class="code" data-run>route = "Earth Mars Jupiter"
parts = route.split()
print(parts)
print(" -&gt; ".join(parts))
print("12:30:05".split(":"))</pre>
<h3>f-strings</h3>
<p>An <em>f-string</em> is a string literal with an <code>f</code> before the quote. Inside it, anything in curly braces <code>{ }</code> is evaluated and inserted. This is usually the clearest way to build text from values, with no <code>str()</code> needed.</p>
<pre class="code" data-run>name = "Vega"
crew = 4
print(f"{name} has {crew} crew members")
print(f"Next year: {crew + 1}")</pre>
<h3>Format specs</h3>
<p>After a colon inside the braces you can give a <em>format spec</em>:</p>
<pre class="code" data-run>price = 1234.5678
print(f"{price:.2f}")     # 2 decimal places: 1234.57
print(f"{price:,.2f}")    # with thousands separator: 1,234.57
ratio = 0.756
print(f"{ratio:.1%}")     # as a percentage: 75.6%
print(f"[{'ok':&gt;6}]")     # right-align in a width of 6
print(f"[{7:03}]")        # pad with zeros to width 3: 007</pre>
<p><code>.2f</code> means "fixed-point with 2 digits after the decimal point". It rounds for display only; the variable keeps its full value.</p>
<div class="warn"><strong>Watch out</strong> Forgetting the <code>f</code> prints the braces literally: <code>"{name}"</code> shows <code>{name}</code>.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">s = "  hello  "
print(s.strip().upper())</pre>`,
          options: ["  HELLO  ", "HELLO", "hello", "  hello  "],
          answer: 1,
          explain: "strip() removes the spaces at both ends, then upper() converts to capitals." },
        { q: `What does <code>"orbit".find("z")</code> return?`,
          options: ["0", "None", "An error", "-1"],
          answer: 3,
          explain: "find() returns -1 when the substring is not found." },
        { q: `What does this print?<pre class="code">x = 2.0 / 3
print(f"{x:.2f}")</pre>`,
          options: ["0.67", "0.66", "0.6666666666666666", "{x:.2f}"],
          answer: 0,
          explain: ".2f formats with 2 decimal places, rounding 0.666... to 0.67." },
        { q: `After <code>s = "moon"</code> and <code>s.upper()</code>, what is <code>s</code>?`,
          options: ["MOON", "Moon", "moon", "None"],
          answer: 2,
          explain: "Strings are immutable. upper() returns a new string; s still refers to \"moon\" unless you reassign it." }
      ],
      challenge: {
        title: "Clean Up the Transmission",
        prompt: `<p>A garbled transmission arrived: <code>raw = "   captain ZARA reporting from sector 7   "</code>.</p>
<ul>
  <li><code>clean</code>: <code>raw</code> with the spaces at both ends removed, all in lowercase.</li>
  <li><code>shout</code>: <code>clean</code> with <code>"sector"</code> replaced by <code>"SECTOR"</code>.</li>
  <li><code>temperature = 21.456</code>. Print the line <code>Temp: 21.46 C</code> using an f-string with <code>:.2f</code>.</li>
</ul>`,
        starter: `raw = "   captain ZARA reporting from sector 7   "\ntemperature = 21.456\n`,
        tests: [
          { name: "clean is trimmed and lowercase", code: `assert clean == "captain zara reporting from sector 7"` },
          { name: "shout replaces sector", code: `assert shout == "captain zara reporting from SECTOR 7"` },
          { name: "Prints Temp: 21.46 C", code: `assert "Temp: 21.46 C" in __output__` }
        ],
        hints: ["Chain methods: raw.strip().lower().", "replace(old, new) returns a new string.", "Inside an f-string: {temperature:.2f}."],
        solution: `raw = "   captain ZARA reporting from sector 7   "\ntemperature = 21.456\nclean = raw.strip().lower()\nshout = clean.replace("sector", "SECTOR")\nprint(f"Temp: {temperature:.2f} C")`
      }
    }
  ],
  boss: {
    title: "Starport Ticket Printer",
    prompt: `<p>The starport needs a ticket printer. You are given:</p>
<pre class="code">passenger = "  lyra ORION  "
code = "GAL-0042-XZ"
fare = 1499.5</pre>
<ul>
  <li><code>name</code>: <code>passenger</code> trimmed, then with each word capitalised (<code>"Lyra Orion"</code>). Hint: look up the <code>title()</code> method.</li>
  <li><code>number</code>: the four digits in the middle of <code>code</code>, as a string, using a slice.</li>
  <li><code>initials</code>: first letter of each word of <code>name</code>, joined: <code>"LO"</code>.</li>
  <li>Print exactly these two lines, using f-strings:</li>
</ul>
<pre class="code">Ticket 0042 for Lyra Orion (LO)
Fare: 1,499.50 credits</pre>`,
    starter: `passenger = "  lyra ORION  "\ncode = "GAL-0042-XZ"\nfare = 1499.5\n`,
    tests: [
      { name: "name is Lyra Orion", code: `assert name == "Lyra Orion"` },
      { name: "number is 0042", code: `assert number == "0042"` },
      { name: "initials is LO", code: `assert initials == "LO"` },
      { name: "Prints the ticket line", code: `assert __output__.strip().splitlines()[0] == "Ticket 0042 for Lyra Orion (LO)"` },
      { name: "Prints the fare with separator and 2 decimals", code: `assert __output__.strip().splitlines()[1] == "Fare: 1,499.50 credits"` }
    ],
    hints: ["passenger.strip().title() gives \"Lyra Orion\".", "The digits are at indexes 4 to 7, so slice code[4:8]. For initials, find where the space is with find(), then index just after it.", "The format spec :,.2f adds a thousands separator and 2 decimal places."],
    solution: `passenger = "  lyra ORION  "
code = "GAL-0042-XZ"
fare = 1499.5
name = passenger.strip().title()
number = code[4:8]
space = name.find(" ")
initials = name[0] + name[space + 1]
print(f"Ticket {number} for {name} ({initials})")
print(f"Fare: {fare:,.2f} credits")`
  }
});
