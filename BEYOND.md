# Beyond the Basics

## Extra Features

---

### 1. First and Last Name Capitalization
**Where:** `script.js` — directly after `let playerName = prompt(...)`

When the player enters their name, the game splits it into individual words and capitalizes the first letter of each one. So "john doe" becomes "John Doe". This makes every personalized message in the game look clean and intentional.

---

### 2. Replace Empty Leaderboard Spots with "-"
**Where:** `script.js` — `updateScore()` function, inside the leaderboard update loop

Instead of leaving blank leaderboard entries, empty spots display a "-" placeholder. This makes the leaderboard look complete and intentional from the very first round rather than showing undefined or empty values.

---

### 3. Game Mode Leaderboards
**Where:** `script.js` — `updateModeLeaderboards()` function, called inside `updateScore()`

Beyond the overall top-3 leaderboard, the game maintains separate leaderboards for Easy, Medium, Hard, and Extreme modes. Players can track their best scores per difficulty, making competition more meaningful.

---

### 4. Extreme Game Mode
**Where:** `script.js` — `play()` function; `index.html` — `id="ex"` radio button with `value="1000"`

A fourth difficulty with a range of 1–1000 is available for players who want a serious challenge. It has its own dedicated hint type and its own leaderboard, making it a fully featured mode on top of the three required levels.

---

### 5. Input Validation
**Where:** `script.js` — `makeGuess()` function, first `if` block

Before processing any guess, the game checks that the input is a valid number within the current range. If not, a clear error message is shown and the guess is not counted. This prevents crashes and bad data from breaking the game.

---

### 6. Streaks
**Where:** `script.js` — `currentStreak` and `bestStreak` variables; `updateStreakDisplay()` function; updated in `makeGuess()` and `giveUp()`

The game tracks consecutive wins (current streak) and the player's all-time best streak. Giving up resets the streak. This adds a layer of replayability and motivates players to keep winning without quitting.

---

### 7. Hints
**Where:** `script.js` — `giveHint()` function, triggered by `id="hintBtn"`

Each round the player can request one hint. The hint is tailored to the difficulty — Easy tells odd/even, Medium tells upper/lower half, Hard tells if it's a multiple of 5, and Extreme narrows it to a 100-number range. Using a hint adds +1 to the final score as a penalty, keeping the game fair.

---

### 8. Guess History
**Where:** `script.js` — `guessHistory` array; `updateGuessHistoryDisplay()` function; updated in `makeGuess()` and `giveUp()`

Every guess the player makes is recorded and displayed below the game controls, including whether it was too high, too low, or correct. This helps players think strategically rather than guessing randomly each time.

---

### 9. Confetti Celebration
**Where:** `script.js` — `launchConfetti()` function, called on correct guess in `makeGuess()`; `styles.css` — `.confetti`, `.square`, `.circle`, `@keyframes confettiFall`

When the player guesses correctly, 30 colorful confetti pieces rain down the screen. Pieces are randomly squares or circles, randomly colored, and fall with a spin animation. It makes winning feel genuinely rewarding and fun.

---

### 10. CSS Styling
**Where:** `styles.css` — full file; `index.html` — wrapper divs added for layout

The game was styled with a retro arcade neon theme using the **Press Start 2P** pixel font and a dark background with glowing neon colors. Buttons are color-coded by function, level selectors highlight when active, and the layout uses a responsive CSS grid to organize stats and leaderboards side by side. The design makes the game visually engaging and easy to read.