/* =========================================================================
   Sports Quiz — logic
   -------------------------------------------------------------------------
   1. Quiz data (edit the questions here — one object per sport)
   1b. NEW: motivational notes (pool + no-repeat shuffled deck)
   2. Settings and helpers
   3. High scores (localStorage)
   3b. NEW: player name (localStorage)
   3c. NEW: leaderboard (localStorage)
   4. Screen switching
   5. Quiz flow: start → question → answer → note → next → result
   6. Wiring up the buttons
   7. NEW: leaderboard screen, tabs and clear confirmation
   ========================================================================= */

/* -------------------------------------------------------------------------
   1. QUIZ DATA
   Every sport object has:
     name      → shown nowhere but kept for clarity
     questions → exactly 10 items; each item has `q`, four `options`,
                 and `answer`, the index (0–3) of the single correct option.
   ------------------------------------------------------------------------- */
const QUIZ_DATA = {
  /* ---------------- FOOTBALL (green) ---------------- */
  football: {
    name: "Football",
    questions: [
      {
        q: "How many players from each team are on the pitch during a football match?",
        options: ["9", "10", "11", "12"],
        answer: 2
      },
      {
        q: "How long is a standard professional football match, excluding stoppage time?",
        options: ["60 minutes", "80 minutes", "90 minutes", "100 minutes"],
        answer: 2
      },
      {
        q: "Which country won the 2022 FIFA World Cup in Qatar?",
        options: ["France", "Argentina", "Brazil", "Germany"],
        answer: 1
      },
      {
        q: "What is it called when a player scores three goals in one match?",
        options: ["A hat-trick", "A grand slam", "A triple play", "A clean sheet"],
        answer: 0
      },
      {
        q: "Which player has won the most Ballon d'Or awards?",
        options: ["Cristiano Ronaldo", "Lionel Messi", "Pelé", "Michel Platini"],
        answer: 1
      },
      {
        q: "In most major competitions today, what is the maximum number of substitutions a team may use?",
        options: ["3", "4", "5", "6"],
        answer: 2
      },
      {
        q: "Which club has won the most UEFA Champions League titles?",
        options: ["Barcelona", "Real Madrid", "AC Milan", "Bayern Munich"],
        answer: 1
      },
      {
        q: "In football, what does a red card mean?",
        options: ["A warning", "The player is sent off", "A penalty kick", "A two-minute suspension"],
        answer: 1
      },
      {
        q: "How far is the penalty spot from the goal line?",
        options: ["10 yards", "12 yards", "15 yards", "18 yards"],
        answer: 1
      },
      {
        q: "Which country has won the most FIFA World Cup titles?",
        options: ["Germany", "Italy", "Brazil", "Argentina"],
        answer: 2
      }
    ]
  },

  /* ---------------- BASKETBALL (orange) ---------------- */
  basketball: {
    name: "Basketball",
    questions: [
      {
        q: "How many players from each team are on the court in basketball?",
        options: ["4", "5", "6", "7"],
        answer: 1
      },
      {
        q: "How many points is a successful free throw worth?",
        options: ["1", "2", "3", "4"],
        answer: 0
      },
      {
        q: "How high is a standard basketball hoop above the court?",
        options: ["8 feet", "9 feet", "10 feet", "12 feet"],
        answer: 2
      },
      {
        q: "How long is each quarter of an NBA game?",
        options: ["10 minutes", "12 minutes", "15 minutes", "20 minutes"],
        answer: 1
      },
      {
        q: "Who became the NBA's all-time leading scorer in 2023?",
        options: ["Michael Jordan", "Kareem Abdul-Jabbar", "LeBron James", "Kobe Bryant"],
        answer: 2
      },
      {
        q: "What is a 'triple-double'?",
        options: [
          "Scoring 30 points in a game",
          "Double digits in three statistical categories",
          "Three steals in a row",
          "Three consecutive wins"
        ],
        answer: 1
      },
      {
        q: "Which team has won the most NBA championships?",
        options: ["Los Angeles Lakers", "Chicago Bulls", "Boston Celtics", "Golden State Warriors"],
        answer: 2
      },
      {
        q: "How many seconds does a team have on the shot clock in the NBA?",
        options: ["12", "18", "24", "30"],
        answer: 2
      },
      {
        q: "How many points is a shot from beyond the three-point line worth?",
        options: ["1", "2", "3", "4"],
        answer: 2
      },
      {
        q: "What is it called when a player takes two steps without dribbling?",
        options: ["Double dribble", "Traveling", "Carrying", "Blocking"],
        answer: 1
      }
    ]
  },

  /* ---------------- BADMINTON (blue) ---------------- */
  badminton: {
    name: "Badminton",
    questions: [
      {
        q: "With rally scoring, how many points are needed to win a game of badminton?",
        options: ["15", "21", "25", "30"],
        answer: 1
      },
      {
        q: "How many games must a player win to take a match?",
        options: ["1", "2", "3", "4"],
        answer: 1
      },
      {
        q: "What is a traditional shuttlecock made from?",
        options: ["Plastic", "Goose feathers", "Cotton", "Nylon"],
        answer: 1
      },
      {
        q: "Which country has won the most Olympic badminton gold medals?",
        options: ["Indonesia", "China", "Denmark", "Malaysia"],
        answer: 1
      },
      {
        q: "How high is the badminton net at the centre of the court?",
        options: ["4 ft 6 in", "5 ft 1 in", "5 ft 6 in", "6 ft"],
        answer: 1
      },
      {
        q: "What happens when a game reaches 20-20 in badminton?",
        options: [
          "The game ends in a draw",
          "You must win by two points, up to 30",
          "The first to 21 wins",
          "The game is replayed"
        ],
        answer: 1
      },
      {
        q: "How many players per side play in a badminton doubles match?",
        options: ["1", "2", "3", "4"],
        answer: 1
      },
      {
        q: "Which of these is a fault?",
        options: [
          "Hitting the shuttle with the racket",
          "Touching the net while the shuttle is in play",
          "Jumping to hit a smash",
          "Moving around the court"
        ],
        answer: 1
      },
      {
        q: "Which famous men's team championship has been contested since 1949?",
        options: ["Thomas Cup", "Davis Cup", "Ryder Cup", "Sudirman Cup"],
        answer: 0
      },
      {
        q: "What is the name of the shot hit steeply downward with power?",
        options: ["Drop shot", "Smash", "Clear", "Net shot"],
        answer: 1
      }
    ]
  },

  /* ---------------- CRICKET (red) ---------------- */
  cricket: {
    name: "Cricket",
    questions: [
      {
        q: "How many players are in a cricket team?",
        options: ["9", "10", "11", "12"],
        answer: 2
      },
      {
        q: "How many legal balls are bowled in one over?",
        options: ["4", "5", "6", "8"],
        answer: 2
      },
      {
        q: "In cricket, what is a century?",
        options: ["50 runs", "100 runs", "150 runs", "200 runs"],
        answer: 1
      },
      {
        q: "Which team won the first Cricket World Cup in 1975?",
        options: ["Australia", "West Indies", "England", "India"],
        answer: 1
      },
      {
        q: "How many runs does a ball hit clean over the boundary rope earn?",
        options: ["2", "4", "5", "6"],
        answer: 3
      },
      {
        q: "What does LBW stand for?",
        options: ["Leg Before Wicket", "Long Ball Wide", "Left Bat Wicket", "Leg Bye Wicket"],
        answer: 0
      },
      {
        q: "Which player holds the record for the most international centuries?",
        options: ["Virat Kohli", "Sachin Tendulkar", "Ricky Ponting", "Kumar Sangakkara"],
        answer: 1
      },
      {
        q: "How long is a cricket pitch between the two sets of stumps?",
        options: ["18 yards", "20 yards", "22 yards", "25 yards"],
        answer: 2
      },
      {
        q: "What is a hat-trick in cricket?",
        options: [
          "Three centuries in a row",
          "Three wickets in three consecutive balls",
          "Three catches in one over",
          "Three sixes in a row"
        ],
        answer: 1
      },
      {
        q: "Which country has won the most 50-over ICC Cricket World Cups?",
        options: ["India", "Australia", "West Indies", "England"],
        answer: 1
      }
    ]
  }
};

/* -------------------------------------------------------------------------
   1b. NEW: MOTIVATIONAL NOTES
   -------------------------------------------------------------------------
   A pool of 44 short, encouraging notes. They are dealt like cards from a
   shuffled deck: every note appears once before the deck is reshuffled, and
   the same note is never shown twice in a row (even across a reshuffle).
   Add, remove or reword freely — the code adapts to any pool size.
   ------------------------------------------------------------------------- */
const MOTIVATIONAL_NOTES = [
  "That's how champions grow — every miss is a lesson in disguise.",
  "Great players aren't perfect; they just keep showing up. And here you are.",
  "So close! Your instincts get sharper with every round you play.",
  "One wrong answer doesn't erase what you know. Keep going.",
  "Every legend started exactly where you are right now.",
  "That one was tricky — and you had the courage to try. That counts.",
  "Mistakes are just reps for your brain. Nice rep!",
  "You're one answer smarter than you were a minute ago.",
  "Champions review, adjust, and go again. You've got this.",
  "The best athletes forget the last play and focus on the next one.",
  "Honestly? That was a tough question. Being in the game is what matters.",
  "Progress isn't a straight line — and you're still moving forward.",
  "Your next right answer is already on its way. Stay with it.",
  "Learning a new fact is a win, even when the score doesn't show it.",
  "Every great coach has been outsmarted before. It's part of the craft.",
  "You're playing, thinking and learning — that's the whole point.",
  "Tough break! Asking the right questions is how knowledge sticks.",
  "Nobody bats a thousand, and nobody aces every serve. Keep swinging.",
  "The scoreboard doesn't measure curiosity — and yours is strong.",
  "That was a sneaky one. File it away and you'll win the rematch.",
  "Small steps, big progress. You're doing fine.",
  "Even the pros miss. The difference? They take the next shot.",
  "You just learned something new. That's a genuine win.",
  "Keep your head up — the best innings often start with a few quiet overs.",
  "One question at a time. You've already handled several.",
  "Confidence comes from trying, and you're trying. That's the hard part.",
  "Rookie mistakes are how rookies become veterans.",
  "That answer missed, but your effort never does.",
  "A stumble isn't a fall. You're still on your feet and moving.",
  "You're collecting facts like a champion collects trophies.",
  "Every practice round makes the real one easier.",
  "Nice try! The quickest way to learn a fact is to meet it the hard way.",
  "Stay curious — that's the trait all great athletes share.",
  "You're not behind. You're warming up.",
  "That one stumped plenty of people. You're in good company.",
  "Champions are made in the moments after a miss. This is one of those.",
  "Your brain just made a new connection. Keep feeding it.",
  "No pressure — it's just you, the clock, and a chance to learn something.",
  "That's a tough lesson, and you took it with grace. On to the next.",
  "The next question is a fresh start. You've earned it.",
  "Great athletes love the hard questions. So do you, apparently.",
  "You're getting closer with each round — I can see the pattern.",
  "Win or learn, never lose. That's the athlete's mindset.",
  "That's one more fact in your locker. Nice work stocking up."
];

let noteDeck = [];        // notes still waiting to be shown this cycle
let lastNoteShown = "";   // the note on screen right now

/** Deals the next note, reshuffling only once the whole deck is used. */
function nextMotivationalNote() {
  if (noteDeck.length === 0) {
    noteDeck = shuffle(MOTIVATIONAL_NOTES);

    // Guard: a fresh shuffle must not open with the note just shown.
    if (noteDeck.length > 1 && noteDeck[0] === lastNoteShown) {
      const swapWith = 1 + Math.floor(Math.random() * (noteDeck.length - 1));
      [noteDeck[0], noteDeck[swapWith]] = [noteDeck[swapWith], noteDeck[0]];
    }
  }

  const note = noteDeck.shift();
  lastNoteShown = note;
  return note;
}

/**
 * NEW: shows the note card for a wrong answer or a timeout. The correct
 * answer is always included, and Next unlocks only after 3 seconds.
 */
function showNoteCard(question) {
  const correctOption = question.options.find((option) => option.correct);

  els.noteText.textContent = nextMotivationalNote();
  els.noteAnswer.textContent = `The correct answer: ${correctOption ? correctOption.text : "—"}`;
  els.noteCard.hidden = false;

  // Restart the fade-in even if the card was already visible.
  els.noteCard.classList.remove("is-visible");
  void els.noteCard.offsetWidth;
  els.noteCard.classList.add("is-visible");

  // Keep the note readable for at least 3 seconds before Next works.
  clearInterval(state.noteCountdownId);
  let secondsLeft = 3;
  els.noteNextBtn.disabled = true;
  els.noteNextBtn.textContent = `Next in ${secondsLeft}…`;

  state.noteCountdownId = setInterval(() => {
    secondsLeft -= 1;
    if (secondsLeft > 0) {
      els.noteNextBtn.textContent = `Next in ${secondsLeft}…`;
    } else {
      clearInterval(state.noteCountdownId);
      state.noteCountdownId = null;
      els.noteNextBtn.disabled = false;
      els.noteNextBtn.textContent = "Next";
    }
  }, 1000);
}

/** NEW: hides the note card and stops its countdown. */
function hideNoteCard() {
  clearInterval(state.noteCountdownId);
  state.noteCountdownId = null;
  els.noteCard.hidden = true;
  els.noteCard.classList.remove("is-visible");
}

/* -------------------------------------------------------------------------
   2. SETTINGS AND HELPERS
   ------------------------------------------------------------------------- */
const TOTAL_QUESTIONS = 10;   // questions asked per round
const TIME_PER_QUESTION = 20; // seconds per question
const LETTERS = ["A", "B", "C", "D"];

// Each element we touch is cached once here.
const els = {
  body: document.body,
  homeScreen: document.getElementById("home-screen"),
  quizScreen: document.getElementById("quiz-screen"),
  resultScreen: document.getElementById("result-screen"),
  sportButtons: document.querySelectorAll(".sport-btn"),
  quitBtn: document.getElementById("quit-btn"),
  counter: document.getElementById("question-counter"),
  timer: document.getElementById("timer"),
  progressBar: document.getElementById("progress-bar"),
  progressTrack: document.querySelector(".progress-track"),
  questionText: document.getElementById("question-text"),
  answers: document.getElementById("answers"),
  scoreValue: document.getElementById("score-value"),
  resultMessage: document.getElementById("result-message"),
  highScoreText: document.getElementById("high-score-text"),
  playAgainBtn: document.getElementById("play-again-btn"),
  homeBtn: document.getElementById("home-btn"),
  saveText: document.getElementById("save-text"),
  rankText: document.getElementById("rank-text"),

  /* NEW: player name, leaderboard and note-card elements */
  playerNameInput: document.getElementById("player-name"),
  nameHint: document.getElementById("name-hint"),
  leaderboardBtn: document.getElementById("leaderboard-btn"),
  leaderboardScreen: document.getElementById("leaderboard-screen"),
  lbBackBtn: document.getElementById("lb-back-btn"),
  lbTabs: document.querySelectorAll(".lb-tab"),
  lbList: document.getElementById("lb-list"),
  lbEmpty: document.getElementById("lb-empty"),
  clearLbBtn: document.getElementById("clear-lb-btn"),
  modal: document.getElementById("confirm-modal"),
  confirmTitle: document.getElementById("confirm-title"),
  confirmText: document.getElementById("confirm-text"),
  confirmOk: document.getElementById("confirm-ok"),
  confirmCancel: document.getElementById("confirm-cancel"),
  noteCard: document.getElementById("note-card"),
  noteText: document.getElementById("note-text"),
  noteAnswer: document.getElementById("note-answer"),
  noteNextBtn: document.getElementById("note-next-btn")
};

// Current game state.
let state = {
  sport: null,      // "football" | "basketball" | "badminton" | "cricket"
  round: [],        // this round's shuffled questions with shuffled options
  index: 0,         // which question we are on (0-based)
  score: 0,         // correct answers so far
  timeLeft: TIME_PER_QUESTION,
  timerId: null,    // setInterval handle
  nextTimeoutId: null,
  accepting: false, // true only while the answer buttons can be clicked
  noteCountdownId: null, // NEW: 3-second unlock timer for the note's Next button
  lastEntryId: null      // NEW: id of the leaderboard row just saved
};

/** Fisher–Yates shuffle: returns a new, randomly ordered copy of an array. */
function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* -------------------------------------------------------------------------
   3. HIGH SCORES (one key per sport, stored in the browser)
   ------------------------------------------------------------------------- */
const STORAGE_PREFIX = "sportsQuiz.highScore.";

function getHighScore(sport) {
  const stored = Number(localStorage.getItem(STORAGE_PREFIX + sport));
  return Number.isFinite(stored) ? stored : 0;
}

function saveHighScore(sport, score) {
  localStorage.setItem(STORAGE_PREFIX + sport, String(score));
}

/** Refreshes the "High score: x/10" line under each home-screen sport button. */
function refreshHomeHighScores() {
  els.sportButtons.forEach((button) => {
    const sport = button.dataset.sport;
    const label = button.querySelector(".sport-high");
    if (label) label.textContent = `High score: ${getHighScore(sport)}/${TOTAL_QUESTIONS}`;
  });
}

/* -------------------------------------------------------------------------
   3b. NEW: PLAYER NAME (asked once, remembered in localStorage)
   ------------------------------------------------------------------------- */
const PLAYER_KEY = "sportsQuiz.playerName";
let playerName = localStorage.getItem(PLAYER_KEY) || "";

/** Saves the player's name so the next visit prefills it. */
function setPlayerName(name) {
  playerName = name;
  localStorage.setItem(PLAYER_KEY, name);
  els.nameHint.hidden = true;
}

/* -------------------------------------------------------------------------
   3c. NEW: LEADERBOARD
   -------------------------------------------------------------------------
   One list in localStorage holds every finished round as:
     { id, name, sport, score, date (ISO string) }
   The list is filtered per sport and sorted when displayed — never stored
   pre-sorted, so a newly added round always lands in the right place.
   ------------------------------------------------------------------------- */
const LEADERBOARD_KEY = "sportsQuiz.leaderboard";

function loadLeaderboard() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return []; // damaged data should never break the quiz
  }
}

function saveLeaderboard(entries) {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch (error) {
    /* storage full or blocked — the quiz itself keeps working */
  }
}

/** Records a finished round and remembers its id so it can be highlighted. */
function addLeaderboardEntry(sport, score) {
  const entries = loadLeaderboard();
  const entry = {
    id: `e${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: playerName || "Guest",
    sport,
    score,
    date: new Date().toISOString()
  };

  entries.push(entry);
  saveLeaderboard(entries);
  state.lastEntryId = entry.id;
  return entry;
}

/** Top 10 for one sport: highest score first, newer entries above older ties. */
function getTopScores(sport) {
  return loadLeaderboard()
    .map((entry, position) => ({ entry, position }))
    .filter(({ entry }) => entry && entry.sport === sport && Number.isFinite(Number(entry.score)))
    .sort((a, b) =>
      Number(b.entry.score) - Number(a.entry.score) ||
      new Date(b.entry.date) - new Date(a.entry.date) ||
      b.position - a.position // same millisecond: the later-saved round wins
    )
    .slice(0, 10)
    .map(({ entry }) => entry);
}

/** The current player's most recent entry for a sport (fallback highlight). */
function getLatestEntryIdForPlayer(sport) {
  let latest = null;

  loadLeaderboard().forEach((entry) => {
    if (!entry || entry.sport !== sport || entry.name !== playerName) return;
    // ">=" so that, with identical timestamps, the later-saved entry wins.
    if (!latest || new Date(entry.date) >= new Date(latest.date)) latest = entry;
  });

  return latest ? latest.id : null;
}

/** "15 Nov 2026" — the date saved with each score. */
function formatEntryDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

let activeLeaderboardSport = "football";

/** Draws the tabs and the top-10 list for the active sport. */
function renderLeaderboard(sport) {
  if (sport) activeLeaderboardSport = sport;
  applyTheme(activeLeaderboardSport); // tabs and highlights use the sport's colour

  els.lbTabs.forEach((tab) => {
    const isActive = tab.dataset.sport === activeLeaderboardSport;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  const rows = getTopScores(activeLeaderboardSport);

  // Highlight the round just finished; otherwise the player's newest entry.
  const highlightId = rows.some((row) => row.id === state.lastEntryId)
    ? state.lastEntryId
    : getLatestEntryIdForPlayer(activeLeaderboardSport);

  els.lbList.innerHTML = "";

  rows.forEach((entry, index) => {
    const row = document.createElement("li");
    row.className = "lb-row";
    if (entry.id === highlightId) row.classList.add("is-you");

    const rank = document.createElement("span");
    rank.className = "lb-rank";
    rank.textContent = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : String(index + 1);

    const name = document.createElement("span");
    name.className = "lb-name";
    name.textContent = entry.name;
    if (entry.id === highlightId) {
      const you = document.createElement("span");
      you.className = "lb-you";
      you.textContent = "you";
      name.appendChild(you);
    }

    const date = document.createElement("span");
    date.className = "lb-date";
    date.textContent = formatEntryDate(entry.date);

    const score = document.createElement("span");
    score.className = "lb-score";
    score.textContent = `${entry.score}/${TOTAL_QUESTIONS}`;

    row.append(rank, name, date, score);
    els.lbList.appendChild(row);
  });

  els.lbEmpty.hidden = rows.length > 0;
  // Clearing wipes every sport, so the button is only off when nothing is saved.
  els.clearLbBtn.disabled = loadLeaderboard().length === 0;
}

/* -------------------------------------------------------------------------
   4. SCREEN SWITCHING
   ------------------------------------------------------------------------- */
function showScreen(screen) {
  [els.homeScreen, els.quizScreen, els.resultScreen, els.leaderboardScreen].forEach((el) => {
    el.classList.toggle("active", el === screen);
  });

  // NEW: dim the watermark while a quiz is on, so it never competes with the
  // timer. The matching rule is "body.is-quizzing #watermark" in style.css.
  els.body.classList.toggle("is-quizzing", screen === els.quizScreen);
}

/** Applies the selected sport's colors to the whole page. */
function applyTheme(sport) {
  if (sport) {
    els.body.dataset.theme = sport;
  } else {
    delete els.body.dataset.theme;
  }
}

/* -------------------------------------------------------------------------
   5. QUIZ FLOW
   ------------------------------------------------------------------------- */

/** Starts a fresh round for the given sport. */
function startQuiz(sport) {
  clearTimers();

  state.sport = sport;
  state.index = 0;
  state.score = 0;

  // Shuffle the question order, then shuffle each question's four options.
  // The correct option is tracked by a flag, so shuffling can never lose it.
  state.round = shuffle(QUIZ_DATA[sport].questions)
    .slice(0, TOTAL_QUESTIONS)
    .map((item) => ({
      question: item.q,
      options: shuffle(
        item.options.map((text, i) => ({ text, correct: i === item.answer }))
      )
    }));

  applyTheme(sport);
  showScreen(els.quizScreen);
  renderQuestion();
}

/** Draws the current question, its options, the progress bar and the timer. */
function renderQuestion() {
  clearTimers();

  const question = state.round[state.index];
  if (!question) {
    endQuiz();
    return;
  }

  // Header: "Question 3/10" and progress bar fill
  const questionNumber = state.index + 1;
  els.counter.textContent = `Question ${questionNumber}/${TOTAL_QUESTIONS}`;

  const percent = (questionNumber / TOTAL_QUESTIONS) * 100;
  els.progressBar.style.width = `${percent}%`;
  els.progressTrack.setAttribute("aria-valuenow", String(Math.round(percent)));

  // Question text and answer buttons
  // NEW: a previous note should never linger on the next question.
  hideNoteCard();

  els.questionText.textContent = question.question;
  els.answers.innerHTML = "";

  question.options.forEach((option, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.dataset.correct = option.correct ? "true" : "false";
    button.innerHTML =
      `<span class="answer-letter">${LETTERS[i]}</span>` +
      `<span class="answer-text"></span>`;
    button.querySelector(".answer-text").textContent = option.text;
    button.addEventListener("click", () => handleAnswer(button));
    els.answers.appendChild(button);
  });

  // Let the browser paint before starting the countdown, so the timer is honest.
  state.accepting = true;
  startTimer();
}

/** Runs the 20-second countdown for the current question. */
function startTimer() {
  state.timeLeft = TIME_PER_QUESTION;
  updateTimerDisplay();

  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    updateTimerDisplay();

    if (state.timeLeft <= 0) {
      handleTimeout();
    }
  }, 1000);
}

function updateTimerDisplay() {
  els.timer.textContent = String(Math.max(state.timeLeft, 0));
  els.timer.classList.toggle("urgent", state.timeLeft <= 5);
}

/** Called when the player taps an answer. */
function handleAnswer(chosenButton) {
  if (!state.accepting) return; // already answered (or time ran out)
  state.accepting = false;
  clearInterval(state.timerId);

  const isCorrect = chosenButton.dataset.correct === "true";
  if (isCorrect) state.score += 1;

  revealAnswers(chosenButton, isCorrect);

  if (isCorrect) {
    // Correct answers keep the original quick auto-advance.
    state.nextTimeoutId = setTimeout(nextQuestion, 1200);
  } else {
    // NEW: a wrong pick shows a kind note + the correct answer, and waits
    // for the player to press Next (unlocked after 3 seconds).
    showNoteCard(state.round[state.index]);
  }
}

/** Called when the 20 seconds run out without an answer. */
function handleTimeout() {
  if (!state.accepting) return;
  state.accepting = false;
  clearInterval(state.timerId);

  revealAnswers(null, false);

  // NEW: running out of time counts like a wrong answer and gets a note too.
  showNoteCard(state.round[state.index]);
}

/**
 * Locks the answer buttons and shows green for the correct option, red for a
 * wrong pick. Passing null (timeout) only highlights the correct answer.
 */
function revealAnswers(chosenButton, wasCorrect) {
  Array.from(els.answers.querySelectorAll(".answer-btn")).forEach((button) => {
    button.disabled = true;
    const isCorrectOption = button.dataset.correct === "true";

    if (isCorrectOption) {
      button.classList.add("correct");
    } else if (button === chosenButton && !wasCorrect) {
      button.classList.add("wrong");
    }
  });
}

function nextQuestion() {
  hideNoteCard();
  state.index += 1;
  renderQuestion();
}

/** Stops the countdown and the auto-advance timer. */
function clearTimers() {
  clearInterval(state.timerId);
  clearTimeout(state.nextTimeoutId);
  clearInterval(state.noteCountdownId);
  state.timerId = null;
  state.nextTimeoutId = null;
  state.noteCountdownId = null;
}

/** Builds and shows the result screen. */
function endQuiz() {
  clearTimers();
  state.accepting = false;

  const score = state.score;
  const sport = state.sport;

  els.scoreValue.textContent = String(score);

  // Score message: 9–10 excellent, 6–8 good, 5 or fewer keep practicing
  let message = "Keep practicing!";
  if (score >= 9) {
    message = "Excellent! You're a true expert.";
  } else if (score >= 6) {
    message = "Good job! Solid knowledge.";
  }
  els.resultMessage.textContent = message;

  // High score is per sport and only goes up.
  const previousBest = getHighScore(sport);
  const isNewBest = score > previousBest;
  if (isNewBest) saveHighScore(sport, score);

  const best = Math.max(previousBest, score);
  els.highScoreText.textContent = isNewBest
    ? `🎉 New high score for ${QUIZ_DATA[sport].name}! Best: ${best}/${TOTAL_QUESTIONS}`
    : `High score for ${QUIZ_DATA[sport].name}: ${best}/${TOTAL_QUESTIONS}`;

  // NEW: save this round (name, sport, score, date) to the sport's leaderboard.
  const entry = addLeaderboardEntry(sport, score);
  els.saveText.textContent =
    `Saved to the ${QUIZ_DATA[sport].name} leaderboard as ${playerName || "Guest"}.`;

  // NEW: where this round landed in the sport's top 10.
  // findIndex returns 0 for first place, and -1 when the score didn't make the cut.
  const placement = getTopScores(sport).findIndex((row) => row.id === entry.id);
  els.rankText.textContent = placement >= 0
    ? `🏅 You placed #${placement + 1} on the ${QUIZ_DATA[sport].name} leaderboard.`
    : `Not in the ${QUIZ_DATA[sport].name} top 10 this time — keep going!`;

  refreshHomeHighScores();
  showScreen(els.resultScreen);
}

/** Leaves the quiz and returns home, stopping any running timers. */
function goHome() {
  clearTimers();
  hideNoteCard(); // NEW: never leave a note card open behind the scenes
  state.accepting = false;
  applyTheme(null); // home screen uses the neutral background
  refreshHomeHighScores();
  showScreen(els.homeScreen);
}

/* -------------------------------------------------------------------------
   6. WIRING UP THE BUTTONS
   ------------------------------------------------------------------------- */

// Home screen: one handler for all four sport buttons.
// NEW: a name is required first — the sport only starts once it is filled in.
els.sportButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const typedName = els.playerNameInput.value.trim().replace(/\s+/g, " ");
    if (!typedName) {
      els.nameHint.hidden = false;
      els.playerNameInput.focus();
      return;
    }
    setPlayerName(typedName);
    startQuiz(button.dataset.sport);
  });
});

// NEW: remember the name as soon as it is typed, so no extra save button is needed.
els.playerNameInput.addEventListener("input", () => {
  const typedName = els.playerNameInput.value.trim().replace(/\s+/g, " ");
  if (typedName) setPlayerName(typedName);
});

// Quiz screen: leave mid-quiz
els.quitBtn.addEventListener("click", goHome);

// NEW: the note's Next button (only works after the 3-second wait)
els.noteNextBtn.addEventListener("click", () => {
  if (els.noteNextBtn.disabled) return;
  nextQuestion();
});

// Result screen: replay the same sport, or go home
els.playAgainBtn.addEventListener("click", () => {
  if (state.sport) startQuiz(state.sport);
});
els.homeBtn.addEventListener("click", goHome);

// NEW: leaderboard entry point, back button and sport tabs
els.leaderboardBtn.addEventListener("click", () => openLeaderboard());
els.lbBackBtn.addEventListener("click", goHome);
els.lbTabs.forEach((tab) => {
  tab.addEventListener("click", () => renderLeaderboard(tab.dataset.sport));
});

// NEW: "Clear Leaderboard" always asks first, then wipes every sport at once.
els.clearLbBtn.addEventListener("click", () => {
  const totalScores = loadLeaderboard().length;
  const countPhrase = totalScores === 1 ? "the 1 saved score" : `all ${totalScores} saved scores`;

  openConfirmModal(
    "Clear all leaderboard scores?",
    `This removes ${countPhrase} across Football, Basketball, Badminton and Cricket. ` +
      `Your personal high scores are not affected, and this cannot be undone.`,
    () => {
      saveLeaderboard([]);
      state.lastEntryId = null;
      renderLeaderboard();
    }
  );
});

els.confirmCancel.addEventListener("click", closeConfirmModal);
els.confirmOk.addEventListener("click", () => {
  const action = confirmAction;
  closeConfirmModal();
  if (action) action();
});

// Clicking the dark backdrop or pressing Escape also cancels the popup.
els.modal.addEventListener("click", (event) => {
  if (event.target === els.modal) closeConfirmModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.modal.hidden) closeConfirmModal();
});

// Pre-fill the remembered name, then show the saved high scores on load.
els.playerNameInput.value = playerName;
refreshHomeHighScores();

/* -------------------------------------------------------------------------
   7. NEW: LEADERBOARD SCREEN AND CONFIRMATION POPUP
   ------------------------------------------------------------------------- */
let confirmAction = null; // the action to run if the player confirms

/** Opens the leaderboard, stopping any quiz timers first. */
function openLeaderboard() {
  clearTimers();
  hideNoteCard();
  renderLeaderboard(activeLeaderboardSport);
  showScreen(els.leaderboardScreen);
}

/** Generic confirmation popup; `onConfirm` runs only if the player agrees. */
function openConfirmModal(title, text, onConfirm) {
  els.confirmTitle.textContent = title;
  els.confirmText.textContent = text;
  confirmAction = onConfirm;
  els.modal.hidden = false;
  els.confirmCancel.focus();
}

function closeConfirmModal() {
  els.modal.hidden = true;
  confirmAction = null;
}
