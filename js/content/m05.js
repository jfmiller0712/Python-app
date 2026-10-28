registerModule({
  id: "m05",
  order: 5,
  name: "Orbit Loops",
  topic: "Repeating code with while and for",
  blurb: "Make your code orbit: repeat work with while and for loops, range(), break, and continue.",
  lessons: [
    {
      id: "m05-l1",
      title: "while Loops",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 3.2 First Steps Towards Programming",
          url: "https://docs.python.org/3/tutorial/introduction.html" },
        { label: "Language Reference, 8. Compound statements (the while statement)",
          url: "https://docs.python.org/3/reference/compound_stmts.html" }
      ],
      body: `<p>A <em>loop</em> repeats a block of code. The <code>while</code> loop repeats its block <strong>as long as</strong> a condition stays true.</p>
<pre class="code" data-run>countdown = 5
while countdown &gt; 0:
    print(countdown)
    countdown -= 1
print("Liftoff!")</pre>
<h3>How it runs</h3>
<ol>
  <li>Python checks the condition <code>countdown &gt; 0</code>.</li>
  <li>If it is true, the indented block runs once. Each run is called an <em>iteration</em>.</li>
  <li>Then Python goes back to step 1 and checks again.</li>
  <li>When the condition is false, the loop ends and the program continues after the block.</li>
</ol>
<p>If the condition is false right at the start, the block never runs at all.</p>
<h3>Change something each time</h3>
<p>Something inside the loop must eventually make the condition false. Above, <code>countdown -= 1</code> does that. If you forget it, the condition stays true forever and you have an <em>infinite loop</em>: the program never finishes.</p>
<pre class="code">n = 3
while n &gt; 0:
    print(n)
# n never changes, so this prints 3 forever</pre>
<div class="warn"><strong>Watch out</strong> In a terminal, press <code>Ctrl+C</code> to stop a runaway program. Always check that your loop variable moves toward the stopping condition.</div>
<h3>Loops that depend on calculations</h3>
<p><code>while</code> is the right choice when you do not know in advance how many iterations you need, only when to stop:</p>
<pre class="code" data-run>altitude = 1
burns = 0
while altitude &lt; 1000:
    altitude *= 3
    burns += 1
print(f"Reached {altitude} km after {burns} burns")</pre>
<h3>The counter and accumulator patterns</h3>
<p>Two variables appear in loops again and again:</p>
<ul>
  <li>A <em>counter</em> starts at 0 and goes up by 1 each time something happens (like <code>burns</code> above).</li>
  <li>An <em>accumulator</em> starts at a neutral value and collects a running result: 0 for a sum, 1 for a product, <code>""</code> for building a string.</li>
</ul>
<pre class="code" data-run>total = 0
n = 1
while n &lt;= 10:
    total += n
    n += 1
print("Sum of 1 to 10:", total)</pre>
<div class="tip"><strong>Tip</strong> When a loop misbehaves, add a <code>print()</code> inside it to show the variables on each iteration. Seeing the values change is the fastest way to find the bug.</div>`,
      quiz: [
        { q: `How many times does this print <code>hi</code>?<pre class="code">n = 0
while n &lt; 3:
    print("hi")
    n += 1</pre>`,
          options: ["2", "3", "4", "Forever"],
          answer: 1,
          explain: "n takes the values 0, 1, 2 inside the loop. When n becomes 3, the condition is false." },
        { q: `What does this print?<pre class="code">x = 10
while x &lt; 5:
    x += 1
print(x)</pre>`,
          options: ["5", "11", "Nothing, it loops forever", "10"],
          answer: 3,
          explain: "The condition is false at the start, so the block never runs and x stays 10." },
        { q: `What starting value should an accumulator for a product (multiplying numbers together) have?`,
          options: ["1", "0", "\"\"", "None"],
          answer: 0,
          explain: "Multiplying by 1 changes nothing, so 1 is the neutral starting value. Starting at 0 would make every product 0." }
      ],
      challenge: {
        title: "Orbital Decay",
        prompt: `<p>A satellite orbits at <code>altitude = 800</code> km. Each orbit, it loses 15% of its altitude (it keeps 85%).</p>
<ul>
  <li>Use a <code>while</code> loop to keep simulating orbits while <code>altitude</code> is at least <code>100</code>.</li>
  <li>Count the orbits in a variable <code>orbits</code>.</li>
  <li>After the loop, print <code>Re-entry after N orbits</code> with the real count.</li>
</ul>`,
        starter: `altitude = 800\norbits = 0\n`,
        tests: [
          { name: "orbits is 13", code: `assert orbits == 13` },
          { name: "altitude ended below 100", code: `assert altitude < 100` },
          { name: "Prints the re-entry message", code: `assert __output__.strip() == "Re-entry after 13 orbits"` }
        ],
        hints: ["while altitude >= 100:", "Inside the loop: altitude *= 0.85 and orbits += 1.", "Print once, after the loop (not indented)."],
        solution: `altitude = 800\norbits = 0\nwhile altitude >= 100:\n    altitude *= 0.85\n    orbits += 1\nprint(f"Re-entry after {orbits} orbits")`
      }
    },
    {
      id: "m05-l2",
      title: "for Loops and range()",
      minutes: 9,
      sources: [
        { label: "The Python Tutorial, 4.2 for Statements and 4.3 The range() Function",
          url: "https://docs.python.org/3/tutorial/controlflow.html" },
        { label: "Built-in Types: Ranges",
          url: "https://docs.python.org/3/builtins/stdtypes.html" }
      ],
      body: `<p>A <code>for</code> loop goes through the items of a sequence one at a time. Each time around, the loop variable refers to the next item.</p>
<h3>Looping over a string</h3>
<pre class="code" data-run>for letter in "ORBIT":
    print(letter)</pre>
<p>The variable <code>letter</code> is assigned <code>"O"</code>, then <code>"R"</code>, and so on. You choose its name. The loop stops by itself after the last item, so there is no risk of forgetting to update a counter.</p>
<h3>range(): counting with numbers</h3>
<p><code>range()</code> produces a sequence of integers. Like slicing, the stop value is <strong>not included</strong>.</p>
<ul>
  <li><code>range(5)</code>: 0, 1, 2, 3, 4</li>
  <li><code>range(2, 6)</code>: 2, 3, 4, 5</li>
  <li><code>range(0, 10, 3)</code>: 0, 3, 6, 9 (the third number is the step)</li>
  <li><code>range(5, 0, -1)</code>: 5, 4, 3, 2, 1 (a negative step counts down)</li>
</ul>
<pre class="code" data-run>for i in range(3):
    print("Orbit", i)

for n in range(10, 0, -2):
    print(n, end=" ")
print()</pre>
<p><code>range(n)</code> repeats something exactly <code>n</code> times. If the loop variable is not needed, a common convention is to name it <code>_</code>.</p>
<h3>Accumulating with for</h3>
<p>The counter and accumulator patterns work the same way with <code>for</code>:</p>
<pre class="code" data-run>total = 0
for n in range(1, 101):
    total += n
print("1 + 2 + ... + 100 =", total)

vowels = 0
for ch in "andromeda galaxy":
    if ch in "aeiou":
        vowels += 1
print("Vowels:", vowels)

stars = ""
for _ in range(5):
    stars += "*"
print(stars)</pre>
<h3>for or while?</h3>
<ul>
  <li>Use <code>for</code> when you know what to go through: the characters of a string, or a fixed number of repetitions.</li>
  <li>Use <code>while</code> when you repeat until something happens and cannot know the count in advance.</li>
</ul>
<div class="tip"><strong>Tip</strong> <code>len()</code> and <code>range()</code> combine to give positions: <code>for i in range(len(word)):</code> gives each index, so <code>word[i]</code> is the character there. When you only need the characters, loop over the string directly; it is simpler.</div>`,
      quiz: [
        { q: `Which numbers does <code>range(1, 5)</code> produce?`,
          options: ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "1, 2, 3, 4", "1, 5"],
          answer: 2,
          explain: "range starts at the first number and stops before the second." },
        { q: `What does this print?<pre class="code">for i in range(0, 10, 4):
    print(i, end=" ")</pre>`,
          options: ["0 4 8", "0 4 8 12", "4 8", "0 1 2 3"],
          answer: 0,
          explain: "Start at 0, step by 4, stop before 10: 0, 4, 8." },
        { q: `What is <code>count</code> after this code?<pre class="code">count = 0
for ch in "moon":
    if ch == "o":
        count += 1</pre>`,
          options: ["4", "1", "0", "2"],
          answer: 3,
          explain: "The loop sees m, o, o, n. Two of those are \"o\"." },
        { q: `Which range counts down 3, 2, 1?`,
          options: ["range(3, 1)", "range(3, 0, -1)", "range(1, 3, -1)", "range(3, 1, -1)"],
          answer: 1,
          explain: "Start at 3, step -1, stop before 0. range(3, 1, -1) would stop before 1, giving only 3, 2." }
      ],
      challenge: {
        title: "Beacon Power Grid",
        prompt: `<p>The beacon grid has stations numbered 1 to 20.</p>
<ul>
  <li>Use a <code>for</code> loop with <code>range()</code> to add up the numbers of all <strong>even</strong> stations from 2 to 20 into <code>even_total</code>.</li>
  <li>Use a <code>for</code> loop over the string <code>code = "X7Y2Z9"</code> to count how many characters are digits, storing the count in <code>digits</code>. (Hint: check <code>ch in "0123456789"</code>.)</li>
  <li>Print <code>Grid power: 110</code> using <code>even_total</code>.</li>
</ul>`,
        starter: `even_total = 0\ndigits = 0\ncode = "X7Y2Z9"\n`,
        tests: [
          { name: "even_total is 110", code: `assert even_total == 110` },
          { name: "digits is 3", code: `assert digits == 3` },
          { name: "Prints Grid power: 110", code: `assert "Grid power: 110" in __output__` }
        ],
        hints: ["range(2, 21, 2) gives 2, 4, ..., 20.", "Inside a for loop over code, use if ch in \"0123456789\": digits += 1."],
        solution: `even_total = 0\ndigits = 0\ncode = "X7Y2Z9"\nfor n in range(2, 21, 2):\n    even_total += n\nfor ch in code:\n    if ch in "0123456789":\n        digits += 1\nprint("Grid power:", even_total)`
      }
    },
    {
      id: "m05-l3",
      title: "break, continue, else, and Nested Loops",
      minutes: 10,
      sources: [
        { label: "The Python Tutorial, 4.4 break and continue Statements; 4.5 else Clauses on Loops",
          url: "https://docs.python.org/3/tutorial/controlflow.html" },
        { label: "Language Reference, 7. Simple statements (break, continue)",
          url: "https://docs.python.org/3/reference/simple_stmts.html" }
      ],
      body: `<p>Sometimes you need to leave a loop early or skip part of one iteration. Python has two statements for that.</p>
<h3>break: leave the loop now</h3>
<p><code>break</code> ends the innermost loop immediately. The program continues after the loop.</p>
<pre class="code" data-run>for ch in "sensor-data#ignored":
    if ch == "#":
        break
    print(ch, end="")
print()</pre>
<p>A common pattern is <code>while True:</code> with a <code>break</code> inside. The loop has no built-in stopping condition, so the <code>break</code> must be reachable:</p>
<pre class="code" data-run>energy = 1
while True:
    energy *= 2
    if energy &gt; 100:
        break
print("Charged to", energy)</pre>
<h3>continue: skip to the next iteration</h3>
<p><code>continue</code> skips the rest of the current iteration and goes straight on to the next one.</p>
<pre class="code" data-run>for n in range(1, 8):
    if n % 3 == 0:
        continue
    print(n, end=" ")
print()</pre>
<p>Multiples of 3 are skipped; everything else is printed.</p>
<h3>else on a loop</h3>
<p>A loop can have an <code>else</code> block. It runs when the loop finishes normally, meaning it was <strong>not</strong> ended by <code>break</code>. This suits searching: <code>break</code> when found, <code>else</code> for "not found".</p>
<pre class="code" data-run>target = "Q"
for ch in "ALPHA":
    if ch == target:
        print("Found", target)
        break
else:
    print(target, "not found")</pre>
<p>Notice the <code>else</code> lines up with <code>for</code>, not with <code>if</code>.</p>
<h3>Nested loops</h3>
<p>A loop inside another loop runs completely for each iteration of the outer loop.</p>
<pre class="code" data-run>for row in range(1, 4):
    line = ""
    for col in range(1, 4):
        line += f"{row * col:4}"
    print(line)</pre>
<p>The outer loop runs 3 times, and for each of those the inner loop runs 3 times: 9 products in total. Notice that <code>line = ""</code> resets the accumulator at the start of every row. <code>break</code> inside the inner loop only ends the inner loop.</p>
<div class="tip"><strong>Tip</strong> Prefer a clear loop condition over <code>while True</code> when you can. Use <code>break</code> when the stopping point is naturally in the middle of the loop body.</div>`,
      quiz: [
        { q: `What does this print?<pre class="code">for n in range(5):
    if n == 3:
        break
    print(n, end=" ")</pre>`,
          options: ["0 1 2 3", "0 1 2", "3 4", "0 1 2 4"],
          answer: 1,
          explain: "When n is 3, break ends the loop before printing, so only 0, 1, 2 are shown." },
        { q: `What does this print?<pre class="code">for n in range(5):
    if n == 3:
        continue
    print(n, end=" ")</pre>`,
          options: ["0 1 2", "0 1 2 3 4", "3", "0 1 2 4"],
          answer: 3,
          explain: "continue skips only the iteration where n is 3; the loop carries on with 4." },
        { q: `When does the <code>else</code> block of a <code>for</code> loop run?`,
          options: ["When the loop finishes without hitting break", "Only when the loop body never runs", "Every time the if inside is false", "Only after a break"],
          answer: 0,
          explain: "A loop's else runs when the loop ends normally. A break skips it." },
        { q: `How many times does <code>print("*")</code> run?<pre class="code">for i in range(4):
    for j in range(3):
        print("*")</pre>`,
          options: ["7", "4", "12", "3"],
          answer: 2,
          explain: "The inner loop runs 3 times for each of the 4 outer iterations: 4 * 3 = 12." }
      ],
      challenge: {
        title: "Asteroid Field Scan",
        prompt: `<p>The scanner reads a field map: <code>field = "..o..x.o..o"</code>. Each <code>o</code> is an asteroid; <code>x</code> is a gravity well that blocks the scan.</p>
<ul>
  <li>Loop over <code>field</code> and count asteroids in <code>asteroids</code>, stopping (with <code>break</code>) when you reach <code>x</code>.</li>
  <li>Set <code>blocked = True</code> if the scan hit an <code>x</code>, otherwise <code>False</code>. A loop <code>else</code> is a neat way to do it.</li>
  <li>Print <code>Asteroids before block: 1</code>.</li>
</ul>`,
        starter: `field = "..o..x.o..o"\nasteroids = 0\nblocked = False\nfor ch in field:\n    if ch == "o":\n        asteroids += 1\n`,
        tests: [
          { name: "asteroids is 1", code: `assert asteroids == 1` },
          { name: "blocked is True", code: `assert blocked is True` },
          { name: "Prints the count", code: `assert __output__.strip() == "Asteroids before block: 1"` }
        ],
        hints: ["Inside the loop, check for \"x\" and break.", "Set blocked = True just before the break, or set blocked = False in a loop else and True before the loop.", "Print after the loop."],
        solution: `field = "..o..x.o..o"\nasteroids = 0\nfor ch in field:\n    if ch == "x":\n        blocked = True\n        break\n    if ch == "o":\n        asteroids += 1\nelse:\n    blocked = False\nprint("Asteroids before block:", asteroids)`
      }
    }
  ],
  boss: {
    title: "Prime Star Survey",
    prompt: `<p>Astronomers believe stars with prime catalogue numbers hold rare crystals. A prime number is a whole number greater than 1 whose only divisors are 1 and itself.</p>
<p>Survey the catalogue numbers from <code>2</code> to <code>50</code>:</p>
<ul>
  <li>Use nested loops: for each number, try divisors from 2 upward; if one divides evenly (<code>n % d == 0</code>), it is not prime, so <code>break</code>.</li>
  <li>Count the primes in <code>prime_count</code>.</li>
  <li>Add them up in <code>prime_sum</code>.</li>
  <li>Build a string <code>prime_list</code> of the primes separated by single spaces (<code>"2 3 5 ... 47"</code>, no trailing space).</li>
  <li>Print <code>Primes: </code> followed by <code>prime_list</code>, then on the next line <code>Count: 15, Sum: 328</code>.</li>
</ul>`,
    starter: `prime_count = 0\nprime_sum = 0\nprime_list = ""\nfor n in range(2, 51):\n    pass  # test whether n is prime here\n`,
    tests: [
      { name: "prime_count is 15", code: `assert prime_count == 15` },
      { name: "prime_sum is 328", code: `assert prime_sum == 328` },
      { name: "prime_list lists the primes", code: `assert prime_list == "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47"` },
      { name: "Prints the primes line", code: `assert __output__.strip().splitlines()[0].strip() == "Primes: 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47"` },
      { name: "Prints the count and sum line", code: `assert __output__.strip().splitlines()[-1].strip() == "Count: 15, Sum: 328"` }
    ],
    hints: ["The inner loop can be for d in range(2, n). Use a for ... else: the else runs only when no divisor caused a break, which means n is prime.", "In the else block, update the counter, the sum, and the string.", "To avoid a trailing space, add a space before each prime only if prime_list is not empty (if prime_list: ...). Or strip() at the end."],
    solution: `prime_count = 0
prime_sum = 0
prime_list = ""
for n in range(2, 51):
    for d in range(2, n):
        if n % d == 0:
            break
    else:
        prime_count += 1
        prime_sum += n
        if prime_list:
            prime_list += " "
        prime_list += str(n)
print("Primes:", prime_list)
print(f"Count: {prime_count}, Sum: {prime_sum}")`
  }
});
