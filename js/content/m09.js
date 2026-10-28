registerModule({
  id: "m09",
  order: 9,
  name: "Error Shields",
  topic: "Errors and exceptions",
  blurb: "Read tracebacks without fear, catch exceptions with try/except, and raise your own when something goes wrong.",
  lessons: [
    {
      id: "m09-l1",
      title: "Reading the Damage Report",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 8. Errors and Exceptions",
          url: "https://docs.python.org/3/tutorial/errors.html" },
        { label: "Built-in Exceptions",
          url: "https://docs.python.org/3/library/exceptions.html" }
      ],
      body: `<p>Every programmer sees errors all day long. They are not failures; they are Python telling you exactly what went wrong and where. There are two broad kinds.</p>
<h3>Syntax errors</h3>
<p>A <strong>syntax error</strong> means the code is not valid Python, so nothing runs at all. Python points at the place where it got confused.</p>
<pre class="code">print("Hello"
SyntaxError: '(' was never closed</pre>
<p>Typical causes: a missing bracket or quote, a forgotten colon after <code>if</code> or <code>for</code>, or wrong indentation (an <code>IndentationError</code>, a kind of syntax error).</p>
<h3>Exceptions</h3>
<p>An <strong>exception</strong> happens while valid code is running, when an operation cannot be done. Unless it is handled, the program stops and prints a <strong>traceback</strong>.</p>
<pre class="code">def average(values):
    return sum(values) / len(values)

print(average([]))</pre>
<pre class="code">Traceback (most recent call last):
  File "fleet.py", line 4, in &lt;module&gt;
    print(average([]))
  File "fleet.py", line 2, in average
    return sum(values) / len(values)
ZeroDivisionError: division by zero</pre>
<h3>How to read a traceback</h3>
<ul>
  <li><strong>Start at the bottom.</strong> The last line names the exception type and gives a message: here, <code>ZeroDivisionError: division by zero</code>.</li>
  <li><strong>Move up for the location.</strong> The lines above show the chain of calls, oldest first ("most recent call last"). The lowest <code>File ... line ...</code> entry is where the error actually happened: line 2, inside <code>average</code>.</li>
  <li><strong>Check your values.</strong> Ask why that line failed: <code>len(values)</code> was 0 because an empty list was passed in on line 4.</li>
</ul>
<p>Recent Python versions also print <code>^</code> and <code>~</code> marker lines under the exact part of the line that failed.</p>
<h3>Common exceptions</h3>
<ul>
  <li><code>ValueError</code>: right type, bad value. <code>int("abc")</code> gives <em>invalid literal for int() with base 10: 'abc'</em>.</li>
  <li><code>TypeError</code>: an operation on the wrong type. <code>"5" + 3</code> gives <em>can only concatenate str (not "int") to str</em>.</li>
  <li><code>KeyError</code>: a missing dictionary key. <code>{"a": 1}["b"]</code> gives <em>KeyError: 'b'</em>.</li>
  <li><code>IndexError</code>: a list index that does not exist. <code>[1, 2][5]</code> gives <em>list index out of range</em>.</li>
  <li><code>ZeroDivisionError</code>: dividing by zero.</li>
  <li><code>NameError</code>: a name that was never defined, often a typo. Python may even suggest <em>Did you mean: 'fuel'?</em></li>
</ul>
<p>Many bugs can be prevented by checking values before using them:</p>
<pre class="code" data-run>crew = {"pilot": "Ada"}
print(crew.get("medic", "none"))   # no KeyError
values = []
if len(values) &gt; 0:
    print(sum(values) / len(values))
else:
    print("no data")
text = "42"
if text.isdigit():
    print(int(text) + 1)</pre>
<div class="tip"><strong>Tip</strong> Copy the last line of a traceback exactly when searching for help. The exception type and message are the most useful clues.</div>`,
      quiz: [
        { q: `Where should you look first in a traceback?`,
          options: ["The first line", "The last line", "The middle line", "Tracebacks cannot be read"],
          answer: 1,
          explain: "The last line names the exception type and message. The lines above show where it happened." },
        { q: `Which exception does <code>int("twelve")</code> raise?`,
          options: ["TypeError", "NameError", "SyntaxError", "ValueError"],
          answer: 3,
          explain: "int() accepts strings, so the type is fine, but this value cannot be converted: a ValueError." },
        { q: `Which exception does <code>[10, 20, 30][3]</code> raise?`,
          options: ["IndexError", "KeyError", "ValueError", "None, it returns 30"],
          answer: 0,
          explain: "Valid indexes are 0, 1 and 2, so index 3 is out of range: IndexError." },
        { q: `What is the difference between a syntax error and an exception?`,
          options: ["There is no difference", "Exceptions stop the program before it starts", "A syntax error means the code is not valid Python, so it never starts running; an exception happens while running", "Syntax errors can be caught but exceptions cannot"],
          answer: 2,
          explain: "Python must parse the whole file first. Invalid syntax stops it there; exceptions happen later, during execution." }
      ],
      challenge: {
        title: "Repair the Fuel Gauge",
        prompt: `<p>The fuel gauge program crashes on launch. Run it, read each traceback, and fix the bugs one at a time. When it works it should print:</p>
<pre class="code">Total fuel: 100
Pilot: Ada</pre>
<p>Keep the data the same: <code>fuel</code> must stay a list of strings, and <code>total</code> must end up as the number <code>100</code>.</p>`,
        starter: `fuel = ["40", "25", "35"]
crew = {"pilot": "Ada", "medic": "Sol"}

total = 0
for i in range(4):
    total = total + fuel[i]
print("Total fuel: " + total)
print("Pilot: " + crew["Pilot"])
`,
        tests: [
          { name: "total is the number 100", code: `assert total == 100 and type(total) is int` },
          { name: "Prints 'Total fuel: 100'", code: `assert "Total fuel: 100" in __output__` },
          { name: "Prints 'Pilot: Ada'", code: `assert "Pilot: Ada" in __output__` },
          { name: "fuel is unchanged", code: `assert fuel == ["40", "25", "35"]` }
        ],
        hints: ["The first error is a TypeError: you cannot add a str to an int. Convert each item with int().", "Then fix the range so it only uses indexes that exist (len(fuel) helps), and use str() when joining text with +.", "The KeyError tells you which key is missing. Dictionary keys are case-sensitive."],
        solution: `fuel = ["40", "25", "35"]
crew = {"pilot": "Ada", "medic": "Sol"}

total = 0
for i in range(len(fuel)):
    total = total + int(fuel[i])
print("Total fuel: " + str(total))
print("Pilot: " + crew["pilot"])`
      }
    },
    {
      id: "m09-l2",
      title: "Raising the Shields: try and except",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 8. Errors and Exceptions (Handling Exceptions)",
          url: "https://docs.python.org/3/tutorial/errors.html" },
        { label: "The Python Language Reference, 8. Compound statements (The try statement)",
          url: "https://docs.python.org/3/reference/compound_stmts.html" }
      ],
      body: `<p>Sometimes errors are expected: a user types letters where you wanted a number, or a key might be missing. Instead of letting the program crash, you can <strong>handle</strong> the exception with <code>try</code> and <code>except</code>.</p>
<pre class="code" data-run>for text in ["12", "seven", "3"]:
    try:
        n = int(text)
        print(text, "doubled is", n * 2)
    except ValueError:
        print(text, "is not a whole number")</pre>
<p>Python runs the <code>try</code> block. If an exception happens, it jumps straight to a matching <code>except</code> block, and then carries on after the whole statement. If nothing goes wrong, the <code>except</code> block is skipped.</p>
<h3>Catch specific exceptions</h3>
<p>Always name the exception you expect. A bare <code>except:</code> (or <code>except Exception:</code>) also swallows bugs you did not expect, like a typo causing a <code>NameError</code>, which makes problems much harder to find.</p>
<p>You can have several <code>except</code> blocks, or catch several types at once with a tuple. Use <code>as</code> to get the exception object and its message.</p>
<pre class="code" data-run>def safe_ratio(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None
    except TypeError as err:
        print("Bad input:", err)
        return None

print(safe_ratio(10, 4))
print(safe_ratio(10, 0))
print(safe_ratio(10, "2"))

def to_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return 0

print(to_int("8"), to_int("x"), to_int(None))</pre>
<h3>else and finally</h3>
<ul>
  <li><code>else</code> runs only if the <code>try</code> block raised nothing. Put code there that should run on success but whose own errors you do not want to catch.</li>
  <li><code>finally</code> always runs, error or not. It is used for clean-up, such as closing something you opened.</li>
</ul>
<pre class="code" data-run>stock = {"fuel": 40, "food": 12}
for item in ["fuel", "water"]:
    try:
        amount = stock[item]
    except KeyError:
        print("No", item, "on board")
    else:
        print(item, "amount:", amount)
    finally:
        print("checked", item)</pre>
<h3>Keep try blocks small</h3>
<p>Wrap only the line that can fail. The less code inside <code>try</code>, the less chance of accidentally hiding an unrelated error. And do not use <code>try</code> to cover up bugs: if a list index is wrong because of a mistake in your loop, fix the loop.</p>
<div class="tip"><strong>Tip</strong> "Easier to ask forgiveness than permission" is a common Python style: try the operation and handle the exception, rather than checking every condition first. Both styles are fine when used clearly.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">try:
    x = int("4")
except ValueError:
    print("bad")
else:
    print("good", x)</pre>`,
          options: ["bad", "good 4", "bad then good 4", "Nothing"],
          answer: 1,
          explain: "int('4') succeeds, so the except block is skipped and the else block runs." },
        { q: `When does a <code>finally</code> block run?`,
          options: ["Only when an exception happened", "Only when no exception happened", "Never, unless you call it", "Always, whether or not an exception happened"],
          answer: 3,
          explain: "finally always runs, which makes it the right place for clean-up code." },
        { q: `Why is a bare <code>except:</code> usually a bad idea?`,
          options: ["It hides unexpected errors such as typos, making bugs hard to find", "It is a syntax error", "It only catches ValueError", "It makes the program slower"],
          answer: 0,
          explain: "Catching everything silences mistakes you did not plan for. Name the specific exceptions you expect." },
        { q: `What does this print?<pre class="code">try:
    print([1, 2][2])
except KeyError:
    print("key")
except IndexError:
    print("index")</pre>`,
          options: ["key", "2", "index", "key then index"],
          answer: 2,
          explain: "Index 2 does not exist in a two-item list, so an IndexError is raised and the matching except block runs." }
      ],
      challenge: {
        title: "Shielded Calculations",
        prompt: `<p>The station calculator keeps crashing on bad data. Write these functions using <code>try</code>/<code>except</code> with <strong>specific</strong> exceptions:</p>
<ul>
  <li><code>safe_divide(a, b)</code> returns <code>a / b</code>, or <code>None</code> if <code>b</code> is zero.</li>
  <li><code>parse_int(text, default=0)</code> returns <code>int(text)</code>, or <code>default</code> if the conversion raises a <code>ValueError</code> or <code>TypeError</code> (for example <code>None</code>).</li>
  <li><code>lookup(stock, item)</code> returns <code>stock[item]</code>, or the string <code>"unknown"</code> if the key is missing.</li>
</ul>`,
        starter: `def safe_divide(a, b):
    return a / b


def parse_int(text, default=0):
    return int(text)


def lookup(stock, item):
    return stock[item]


print(safe_divide(10, 4))
`,
        tests: [
          { name: "safe_divide returns None when dividing by zero", code: `assert safe_divide(10, 4) == 2.5 and safe_divide(5, 0) is None and safe_divide(0, 3) == 0` },
          { name: "parse_int handles ValueError", code: `assert parse_int("42") == 42 and parse_int("abc") == 0 and parse_int("x", default=-1) == -1` },
          { name: "parse_int handles TypeError", code: `assert parse_int(None) == 0 and parse_int(None, 7) == 7` },
          { name: "lookup returns 'unknown' for missing keys", code: `stock = {"fuel": 40}
assert lookup(stock, "fuel") == 40 and lookup(stock, "water") == "unknown"` }
        ],
        hints: ["Wrap the risky line in try: and add an except block that returns the fallback value.", "Catch two exception types at once with except (ValueError, TypeError):", "A missing dictionary key raises KeyError."],
        solution: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None


def parse_int(text, default=0):
    try:
        return int(text)
    except (ValueError, TypeError):
        return default


def lookup(stock, item):
    try:
        return stock[item]
    except KeyError:
        return "unknown"


print(safe_divide(10, 4), safe_divide(1, 0))
print(parse_int("42"), parse_int("abc"), parse_int(None))
print(lookup({"fuel": 40}, "water"))`
      }
    },
    {
      id: "m09-l3",
      title: "Raising Alarms and Debugging",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 8. Errors and Exceptions (Raising Exceptions; User-defined Exceptions)",
          url: "https://docs.python.org/3/tutorial/errors.html" },
        { label: "Built-in Exceptions",
          url: "https://docs.python.org/3/library/exceptions.html" },
        { label: "Programming FAQ",
          url: "https://docs.python.org/3/faq/programming.html" }
      ],
      body: `<h3>raise</h3>
<p>Your own code can signal a problem with <code>raise</code>. This is the right thing to do when a function receives a value it cannot sensibly work with. Pass a helpful message to the exception.</p>
<pre class="code" data-run>def set_speed(speed):
    if speed &lt; 0:
        raise ValueError(f"speed must not be negative, got {speed}")
    return speed

print(set_speed(5))
try:
    set_speed(-3)
except ValueError as err:
    print("Rejected:", err)</pre>
<p>Raising is better than returning a strange value like <code>-1</code>: the caller cannot accidentally ignore it, and the traceback shows exactly where the problem started.</p>
<h3>Re-raising</h3>
<p>Inside an <code>except</code> block, a bare <code>raise</code> sends the same exception onward after you have done something useful, such as logging it.</p>
<pre class="code">try:
    value = int(text)
except ValueError:
    print("Could not parse:", text)
    raise</pre>
<h3>Your own exception types</h3>
<p>You can create your own exception type with one line. The <code>class</code> keyword is covered properly in a later module; for now, this pattern is all you need:</p>
<pre class="code" data-run>class LowFuelError(Exception):
    pass

def burn(fuel, amount):
    if amount &gt; fuel:
        raise LowFuelError(f"need {amount}, have {fuel}")
    return fuel - amount

try:
    print(burn(50, 20))
    print(burn(10, 30))
except LowFuelError as err:
    print("Abort burn:", err)</pre>
<p>The <code>(Exception)</code> part makes <code>LowFuelError</code> a kind of <code>Exception</code>, so it behaves like the built-in ones. A custom name lets callers catch exactly <em>your</em> problem without catching unrelated errors. By convention the name ends in <code>Error</code>.</p>
<h3>Debugging with print</h3>
<p>When code runs but gives the wrong answer, there is no traceback to read. The simplest tool is <code>print()</code>: show the values at each step and compare them with what you expected.</p>
<pre class="code" data-run>readings = [3, 8, 2]
total = 0
for r in readings:
    total = total + r
    print("DEBUG r =", r, "total =", total)
print(total / len(readings))</pre>
<ul>
  <li>Print <strong>before and after</strong> the suspicious line to find where values go wrong.</li>
  <li>Print <code>type(x)</code> when you suspect a type mix-up, such as <code>"5"</code> versus <code>5</code>, and <code>repr(x)</code> to reveal hidden spaces in strings.</li>
  <li>The f-string form <code>f"{total=}"</code> prints both the name and the value, like <code>total=13</code>.</li>
  <li>Change one thing at a time, re-run, and remove debug prints when you are done.</li>
</ul>
<pre class="code" data-run>value = "5 "
print(type(value), repr(value))</pre>`,
      quiz: [
        { q: `What does this print?<pre class="code">class OverheatError(Exception):
    pass

try:
    raise OverheatError("core at 900")
except OverheatError as e:
    print("Caught:", e)</pre>`,
          options: ["Caught: OverheatError", "Caught: core at 900", "core at 900", "Nothing; the program crashes"],
          answer: 1,
          explain: "Printing an exception object shows its message, the string you passed when raising it." },
        { q: `Why make a custom exception like <code>class LowFuelError(Exception): pass</code>?`,
          options: ["Callers can catch exactly that problem without catching unrelated errors", "It makes the program run faster", "Built-in exceptions cannot have messages", "It prevents the exception from being raised"],
          answer: 0,
          explain: "A specific type lets callers write except LowFuelError: and handle only that situation." },
        { q: `A function receives a negative age it cannot use. What is usually the best response?`,
          options: ["Return -1 and hope the caller checks", "Print a warning and continue", "Raise a ValueError with a helpful message", "Ignore it"],
          answer: 2,
          explain: "Raising makes the problem impossible to miss and points to exactly where it started." }
      ],
      challenge: {
        title: "Shield Generator Limits",
        prompt: `<p>The shield generator only accepts levels from 0 to 100. Write:</p>
<ul>
  <li>A custom exception <code>ShieldError</code> (a subclass of <code>Exception</code>).</li>
  <li><code>set_shield(level)</code>: returns <code>level</code> if it is between 0 and 100 inclusive; otherwise <strong>raises</strong> <code>ShieldError</code> with a message that includes the level.</li>
  <li><code>try_shield(level)</code>: calls <code>set_shield</code> and returns its result, but if a <code>ShieldError</code> is raised it returns the string <code>"rejected"</code> instead.</li>
</ul>`,
        starter: `class ShieldError(Exception):
    pass


def set_shield(level):
    return level


def try_shield(level):
    return set_shield(level)
`,
        tests: [
          { name: "ShieldError is an Exception", code: `assert issubclass(ShieldError, Exception)` },
          { name: "set_shield returns valid levels", code: `assert set_shield(0) == 0 and set_shield(55) == 55 and set_shield(100) == 100` },
          { name: "set_shield raises ShieldError for 150 and -1", code: `for bad in (150, -1):
    try:
        set_shield(bad)
        raised = False
    except ShieldError as err:
        raised = str(bad) in str(err)
    assert raised` },
          { name: "try_shield returns 'rejected' for bad levels", code: `assert try_shield(70) == 70 and try_shield(101) == "rejected" and try_shield(-5) == "rejected"` }
        ],
        hints: ["Check with an if: if level < 0 or level > 100:", "raise ShieldError(f'level {level} out of range') includes the level in the message.", "In try_shield, put the call inside try: and return 'rejected' in except ShieldError:"],
        solution: `class ShieldError(Exception):
    pass


def set_shield(level):
    if level < 0 or level > 100:
        raise ShieldError(f"level {level} out of range 0-100")
    return level


def try_shield(level):
    try:
        return set_shield(level)
    except ShieldError:
        return "rejected"


print(set_shield(55))
print(try_shield(150))`
      }
    }
  ],
  boss: {
    title: "Boss: Damage Control",
    prompt: `<p>Mission briefing: a meteor shower has scrambled the hull sensors. Some readings are text garbage, some are negative (impossible). Build a robust processing pipeline:</p>
<ul>
  <li>A custom exception <code>SensorError</code>.</li>
  <li><code>read_sensor(text)</code>: converts <code>text</code> with <code>float()</code> and returns it. If the conversion fails, raise <code>SensorError</code> instead of the <code>ValueError</code>. If the value is negative, also raise <code>SensorError</code>.</li>
  <li><code>process(readings)</code>: takes a list of strings and returns a tuple <code>(values, bad)</code>: <code>values</code> is the list of good floats and <code>bad</code> the list of original strings that raised <code>SensorError</code>, both in order.</li>
  <li><code>average_reading(readings)</code>: the average of the good values, or <code>None</code> if there are none. Use <code>try</code>/<code>except ZeroDivisionError</code> for the empty case.</li>
</ul>`,
    starter: `class SensorError(Exception):
    pass


def read_sensor(text):
    pass


def process(readings):
    pass


def average_reading(readings):
    pass
`,
    tests: [
      { name: "SensorError is an Exception", code: `assert issubclass(SensorError, Exception)` },
      { name: "read_sensor converts good readings", code: `assert read_sensor("3.5") == 3.5 and read_sensor(" 7 ") == 7.0 and read_sensor("0") == 0.0` },
      { name: "read_sensor raises SensorError for garbage and negatives", code: `for bad in ("abc", "-2", ""):
    try:
        read_sensor(bad)
        raised = False
    except SensorError:
        raised = True
    assert raised, bad` },
      { name: "process splits good and bad readings", code: `assert process(["1", "x", "2.5", "-1"]) == ([1.0, 2.5], ["x", "-1"])
assert process([]) == ([], [])` },
      { name: "average_reading averages good values or returns None", code: `assert average_reading(["2", "4", "bad"]) == 3.0
assert average_reading(["bad", "-9"]) is None` }
    ],
    hints: ["In read_sensor, wrap float(text) in try/except ValueError and raise SensorError inside the except block.", "In process, call read_sensor inside try; append to values in else and to bad in except SensorError.", "average_reading can reuse process; sum(values) / len(values) raises ZeroDivisionError when values is empty."],
    solution: `class SensorError(Exception):
    pass


def read_sensor(text):
    try:
        value = float(text)
    except ValueError:
        raise SensorError(f"unreadable: {text!r}")
    if value < 0:
        raise SensorError(f"negative reading: {value}")
    return value


def process(readings):
    values = []
    bad = []
    for text in readings:
        try:
            value = read_sensor(text)
        except SensorError:
            bad.append(text)
        else:
            values.append(value)
    return values, bad


def average_reading(readings):
    values, bad = process(readings)
    try:
        return sum(values) / len(values)
    except ZeroDivisionError:
        return None


print(process(["1", "x", "2.5", "-1"]))
print(average_reading(["2", "4", "bad"]))`
  }
});
