registerModule({
  id: "m01",
  order: 1,
  name: "Launch Pad",
  topic: "First contact with Python",
  blurb: "Meet Python, write your first lines with print(), and learn to read the messages Python sends back.",
  lessons: [
    {
      id: "m01-l1",
      title: "Hello, Python",
      minutes: 7,
      sources: [
        { label: "The Python Tutorial, 1. Whetting Your Appetite",
          url: "https://docs.python.org/3/tutorial/appetite.html" },
        { label: "The Python Tutorial, 3. An Informal Introduction to Python",
          url: "https://docs.python.org/3/tutorial/introduction.html" },
        { label: "Built-in Functions: print()",
          url: "https://docs.python.org/3/builtins/functions.html#print" }
      ],
      body: `<p>Python is a programming language: a precise way of writing instructions that a computer can follow. It was created by Guido van Rossum and first released in 1991. Today it is one of the most widely used languages in the world.</p>
<h3>Why Python?</h3>
<ul>
  <li><strong>Readable.</strong> Python code looks close to plain English, so it is easier to learn and to read later.</li>
  <li><strong>Versatile.</strong> People use it for automating boring tasks, analysing data, building websites, science, teaching, and much more.</li>
  <li><strong>Batteries included.</strong> Python ships with a large <em>standard library</em> of ready-made tools.</li>
  <li><strong>Interpreted.</strong> You do not need a separate compile step. A program called the <em>interpreter</em> reads your code and runs it.</li>
</ul>
<h3>Your first instruction: print()</h3>
<p>The <code>print()</code> function displays text on the screen. You put what you want to show inside the parentheses. Text must be wrapped in quotes; text in quotes is called a <em>string</em>.</p>
<pre class="code" data-run>print("Hello, Galaxy!")</pre>
<p>Press <strong>Run</strong> to try it. Python shows the text without the quotes. The quotes only tell Python where the text starts and ends. Single quotes work too: <code>print('Hello')</code>.</p>
<h3>Printing numbers and sums</h3>
<p>Numbers do not need quotes. If you give <code>print()</code> a calculation, Python works out the answer first and then prints the result.</p>
<pre class="code" data-run>print(42)
print(2 + 3)
print("2 + 3")</pre>
<p>Notice the difference: <code>2 + 3</code> is a calculation, so it prints <code>5</code>. <code>"2 + 3"</code> is a string, so Python prints those characters exactly as written.</p>
<h3>Printing several things at once</h3>
<p>You can give <code>print()</code> several values separated by commas. It prints them on one line with a single space between each.</p>
<pre class="code" data-run>print("Fuel level:", 100)
print("A", "B", "C")</pre>
<p>Calling <code>print()</code> with nothing inside prints an empty line, which is handy for spacing out your output.</p>
<div class="tip"><strong>Tip</strong> Python is case-sensitive. <code>print</code> works, but <code>Print</code> or <code>PRINT</code> does not. Python would not recognise those names.</div>`,
      quiz: [
        { q: `What does this code show?<pre class="code">print(4 + 6)</pre>`,
          options: ["4 + 6", "10", "46", "An error"],
          answer: 1,
          explain: "4 + 6 is not in quotes, so Python calculates it first and prints the result, 10." },
        { q: `What does this code show?<pre class="code">print("4 + 6")</pre>`,
          options: ["10", "\"4 + 6\"", "4 + 6", "46"],
          answer: 2,
          explain: "Anything inside quotes is a string. Python prints its characters exactly, without the quotes." },
        { q: `What does <code>print("Sun", "Moon")</code> show?`,
          options: ["SunMoon", "Sun, Moon", "Sun and Moon on separate lines", "Sun Moon"],
          answer: 3,
          explain: "When you pass several values separated by commas, print() puts a single space between them." },
        { q: `What is the interpreter?`,
          options: ["The program that reads and runs your Python code", "A person who translates code for you", "A special kind of string", "A website where Python is stored"],
          answer: 0,
          explain: "The Python interpreter is a program that reads your code and carries out the instructions." }
      ],
      challenge: {
        title: "First Transmission",
        prompt: `<p>Mission control is waiting for your first signal. Write a program that prints exactly this line:</p>
<pre class="code">Hello, Galaxy!</pre>`,
        starter: `# Write your code below\n`,
        tests: [
          { name: "Prints Hello, Galaxy!", code: `assert __output__.strip() == "Hello, Galaxy!"` },
          { name: "Prints exactly one line", code: `assert len(__output__.strip().splitlines()) == 1` }
        ],
        hints: ["Use the print() function.", "Text must go inside quotes, and capital letters and punctuation must match exactly."],
        solution: `print("Hello, Galaxy!")`
      }
    },
    {
      id: "m01-l2",
      title: "Comments and Running Order",
      minutes: 7,
      sources: [
        { label: "The Python Tutorial, 3. An Informal Introduction to Python",
          url: "https://docs.python.org/3/tutorial/introduction.html" },
        { label: "Language Reference, 2. Lexical analysis",
          url: "https://docs.python.org/3/reference/lexical_analysis.html" }
      ],
      body: `<p>A Python program is a list of instructions called <em>statements</em>. Usually you write one statement per line.</p>
<h3>Top to bottom</h3>
<p>Python runs a program from the first line to the last, one statement at a time. The order you write things in is the order they happen.</p>
<pre class="code" data-run>print("3")
print("2")
print("1")
print("Liftoff!")</pre>
<p>If you swapped the lines, the countdown would come out in a different order. Python never skips ahead or guesses what you meant.</p>
<h3>Comments</h3>
<p>A <em>comment</em> starts with a hash sign <code>#</code> and continues to the end of the line. Python ignores comments completely. They are notes for humans: for you next week, or for someone else reading your code.</p>
<pre class="code" data-run># This program greets the crew
print("Welcome aboard!")  # a comment can follow code on the same line
# print("This line does not run")</pre>
<p>The last line starts with <code>#</code>, so the whole line is a comment and nothing is printed. Turning a line into a comment like this is called "commenting it out". It is a quick way to switch code off while you experiment.</p>
<p>A <code>#</code> inside a string is just a character, not a comment:</p>
<pre class="code" data-run>print("Channel #7")</pre>
<h3>Good comments</h3>
<ul>
  <li>Explain <em>why</em> something is done, not just repeat what the code obviously does.</li>
  <li>Keep them short and up to date.</li>
  <li>Put a space after the <code>#</code>: <code># like this</code>.</li>
</ul>
<h3>Line endings and print()</h3>
<p>Each call to <code>print()</code> normally ends by moving to a new line. You can change what goes at the end with <code>end=</code>, and what goes between values with <code>sep=</code>:</p>
<pre class="code" data-run>print("Docking", end="... ")
print("complete")
print("2026", "10", "28", sep="-")</pre>
<p><code>end="... "</code> replaced the usual newline, so the next print continued on the same line. <code>sep="-"</code> put a dash between the values instead of a space.</p>
<div class="warn"><strong>Watch out</strong> Python is strict about indentation. For now, start every line at the left edge with no spaces in front. Extra spaces at the start of a line cause an <code>IndentationError</code>. You will learn when indentation is needed in a later module.</div>`,
      quiz: [
        { q: `What does this program print?<pre class="code">print("A")
# print("B")
print("C")</pre>`,
          options: ["A B C on three lines", "A and C on two lines", "Only A", "Nothing"],
          answer: 1,
          explain: "The middle line starts with #, so it is a comment and Python ignores it." },
        { q: `In what order does Python run the statements in a program?`,
          options: ["Shortest line first", "In a random order", "From top to bottom", "From bottom to top"],
          answer: 2,
          explain: "Python runs statements one after another, starting at the top of the file." },
        { q: `What does this print?<pre class="code">print("x", "y", "z", sep="")</pre>`,
          options: ["xyz", "x y z", "x,y,z", "x-y-z"],
          answer: 0,
          explain: "sep sets what goes between values. An empty string means nothing goes between them." }
      ],
      challenge: {
        title: "Countdown Protocol",
        prompt: `<p>The launch computer needs a countdown. Print these four lines, in this order:</p>
<pre class="code">3
2
1
Liftoff!</pre>
<p>Also add at least one comment to your code explaining what it does.</p>`,
        starter: `# Countdown program\nprint("Liftoff!")\n`,
        tests: [
          { name: "Prints 3, 2, 1, Liftoff! on four lines", code: `assert [l.strip() for l in __output__.strip().splitlines()] == ["3", "2", "1", "Liftoff!"]` },
          { name: "Liftoff! comes last", code: `assert __output__.strip().endswith("Liftoff!")` }
        ],
        hints: ["Use one print() call per line of output.", "Python runs from top to bottom, so put the print calls in countdown order before Liftoff!."],
        solution: `# Countdown before launch\nprint(3)\nprint(2)\nprint(1)\nprint("Liftoff!")`
      }
    },
    {
      id: "m01-l3",
      title: "The Interpreter, Errors, and the Zen",
      minutes: 8,
      sources: [
        { label: "The Python Tutorial, 2. Using the Python Interpreter",
          url: "https://docs.python.org/3/tutorial/interpreter.html" },
        { label: "The Python Tutorial, 8. Errors and Exceptions",
          url: "https://docs.python.org/3/tutorial/errors.html" },
        { label: "PEP 20 - The Zen of Python",
          url: "https://peps.python.org/pep-0020/" }
      ],
      body: `<p>So far you have run whole programs. Python also has an <em>interactive mode</em> where you type one line at a time and see the answer straight away.</p>
<h3>The interactive interpreter</h3>
<p>On your own computer, typing <code>python3</code> (or <code>python</code>, or <code>py</code> on Windows) in a terminal starts it. You see a prompt of three greater-than signs, <code>&gt;&gt;&gt;</code>, waiting for input:</p>
<pre class="code">&gt;&gt;&gt; 2 + 3
5
&gt;&gt;&gt; print("Hi")
Hi
&gt;&gt;&gt; "Hi"
'Hi'</pre>
<p>In interactive mode, Python shows the value of an expression even without <code>print()</code>. That is why <code>"Hi"</code> shows <code>'Hi'</code> with quotes: it displays the value itself. In a program file, a bare expression shows nothing; you need <code>print()</code>. Type <code>exit()</code> to leave. When you see <code>&gt;&gt;&gt;</code> in documentation, it means "typed at the interactive prompt".</p>
<h3>Reading a SyntaxError</h3>
<p><em>Syntax</em> is the grammar of a language. If your code breaks the grammar, Python refuses to run any of it and reports a <code>SyntaxError</code>. Here is broken code (a closing quote is missing):</p>
<pre class="code">print("Hello)</pre>
<p>Python responds with something like:</p>
<pre class="code">  File "main.py", line 1
    print("Hello)
          ^
SyntaxError: unterminated string literal (detected at line 1)</pre>
<p>Read it from the bottom up:</p>
<ul>
  <li>The <strong>last line</strong> names the kind of error and gives a short description.</li>
  <li>The <strong>line number</strong> tells you where Python noticed the problem.</li>
  <li>The <strong>caret</strong> <code>^</code> points at the spot. The real mistake is often there or just before it.</li>
</ul>
<p>Other common causes: a missing closing parenthesis, or a misspelled name. A misspelled name such as <code>prnt("Hi")</code> is not a syntax error; it is a <code>NameError</code>, reported when that line runs. Errors are normal. Every programmer sees them many times a day. They are clues, not failures.</p>
<h3>The Zen of Python</h3>
<p>PEP 20, "The Zen of Python", is a short list of guiding principles for writing Python. You can display it by typing this at the prompt:</p>
<pre class="code">&gt;&gt;&gt; import this</pre>
<p>A few of its lines:</p>
<ul>
  <li>Beautiful is better than ugly.</li>
  <li>Explicit is better than implicit.</li>
  <li>Simple is better than complex.</li>
  <li>Readability counts.</li>
  <li>Errors should never pass silently.</li>
</ul>
<p>Keep these in mind as you learn. Clear, simple code that others can read is the Python way.</p>`,
      quiz: [
        { q: `What does the <code>&gt;&gt;&gt;</code> prompt mean?`,
          options: ["An error happened", "Python's interactive interpreter is waiting for you to type", "The program has finished", "A comment"],
          answer: 1,
          explain: "The >>> prompt is shown by the interactive interpreter when it is ready for your next line." },
        { q: `When Python reports an error, where should you look first?`,
          options: ["The first line of the message only", "Nowhere, just rewrite the program", "The last line, which names the error, then the line number", "The file name"],
          answer: 2,
          explain: "The last line says what kind of error it is; the line number and caret show where Python noticed it." },
        { q: `Which line from the Zen of Python (PEP 20) is real?`,
          options: ["Readability counts.", "Faster is better than readable.", "Comments are optional.", "Complex is better than simple."],
          answer: 0,
          explain: "\"Readability counts.\" is one of the aphorisms in PEP 20. The Zen says simple is better than complex." }
      ],
      challenge: {
        title: "Repair the Beacon",
        prompt: `<p>A damaged beacon program has two syntax errors. Fix it so that it runs and prints:</p>
<pre class="code">Beacon online
Signal strength: 100</pre>
<p>Read the error message, find the line, and repair each mistake.</p>`,
        starter: `print("Beacon online)\nprint("Signal strength:", 100\n`,
        tests: [
          { name: "First line is Beacon online", code: `assert __output__.strip().splitlines()[0].strip() == "Beacon online"` },
          { name: "Second line is Signal strength: 100", code: `assert __output__.strip().splitlines()[1].strip() == "Signal strength: 100"` }
        ],
        hints: ["The first line is missing something at the end of the text.", "Count the parentheses on the second line: every ( needs a matching )."],
        solution: `print("Beacon online")\nprint("Signal strength:", 100)`
      }
    }
  ],
  boss: {
    title: "Launch Sequence",
    prompt: `<p>Final check before leaving the Launch Pad. Write a program that prints exactly these five lines:</p>
<pre class="code">=== LAUNCH SEQUENCE ===
Crew: 3
Fuel: 75 + 25 = 100
T-minus 3...2...1
Readability counts.</pre>
<ul>
  <li>The <code>100</code> on the fuel line must be calculated by Python from <code>75 + 25</code>, not typed by hand.</li>
  <li>Use at least one comment.</li>
</ul>`,
    starter: `# Launch sequence\nprint("=== LAUNCH SEQUENCE ===")\n`,
    tests: [
      { name: "Header line is first", code: `assert __output__.strip().splitlines()[0] == "=== LAUNCH SEQUENCE ==="` },
      { name: "Crew line", code: `assert __output__.strip().splitlines()[1] == "Crew: 3"` },
      { name: "Fuel line shows the sum", code: `assert __output__.strip().splitlines()[2] == "Fuel: 75 + 25 = 100"` },
      { name: "Countdown line", code: `assert __output__.strip().splitlines()[3] == "T-minus 3...2...1"` },
      { name: "Ends with a line from the Zen", code: `lines = __output__.strip().splitlines()\nassert len(lines) == 5 and lines[4] == "Readability counts."` }
    ],
    hints: ["print() puts a space between values separated by commas, so \"Fuel: 75 + 25 =\" and 75 + 25 can be two values.", "For the countdown, a single string is simplest. Or try sep= or end=.", "Check every line character by character: spaces and punctuation must match."],
    solution: `# Launch sequence
print("=== LAUNCH SEQUENCE ===")
print("Crew:", 3)
# Python calculates the fuel total
print("Fuel: 75 + 25 =", 75 + 25)
print("T-minus", "3...2...1")
print("Readability counts.")`
  }
});
