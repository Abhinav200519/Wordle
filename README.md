
---

# Wordle Clone

A simple and interactive word-guessing game inspired by **Wordle**.
The player has six attempts to guess a hidden five-letter word, with color hints provided after each guess to guide the next attempt.

---

## Project Overview

This project recreates the core gameplay of Wordle to practice frontend development, game logic, and user interaction.

After each guess:

* **Green (🟩)** – Correct letter in the correct position
* **Yellow (🟨)** – Correct letter but in the wrong position
* **Gray (⬜)** – Letter not in the word

The goal is to guess the word within six attempts.

---

## Features

* 5-letter word guessing system
* Maximum of 6 attempts per game
* Real-time input validation
* Color-coded feedback for each guess
* Keyboard support
* Win and loss detection
* Restart/New Game option
* Responsive design for desktop and mobile

---

## Tech Stack

* **HTML** – Structure
* **CSS** – Styling and layout
* **JavaScript** – Game logic and interactivity

*(Update this section if you used React, Tailwind, or any framework.)*

---

## Folder Structure

```
wordle-clone/
│
├── index.html
├── style.css
├── script.js
├── words.js        # Word list (if used)
└── README.md
```

---

## How to Run Locally

1. Clone the repository

```
git clone https://github.com/your-username/wordle-clone.git
```

2. Navigate to the project folder

```
cd wordle-clone
```

3. Open the project

* Double-click **index.html**
  or
* Open it using Live Server (recommended for development)

---

## How to Play

1. Enter a valid 5-letter word
2. Press **Enter** to submit
3. Check the color feedback
4. Use the hints to improve your next guess
5. Guess the word within 6 tries to win

---

## Future Improvements

* Daily challenge mode
* Dark mode
* Animations and sound effects
* Online leaderboard
* Difficulty levels (4–7 letter words)
* Word validation using a dictionary API
