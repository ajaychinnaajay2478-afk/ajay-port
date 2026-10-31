// ====================================
// BRAIN SPARK - PUZZLE GAME
// ====================================

const TOTAL_LEVELS = 10;
const QUESTIONS_PER_LEVEL = 20;
const QUESTION_TIME = 30;
const POINTS_PER_ANSWER = 10;

let currentLevel = 1;
let questionIndex = 0;
let score = 0;
let correctAnswers = 0;
let timer = QUESTION_TIME;
let timerInterval = null;
let currentQuestions = [];
let answered = false;

// ====================================
// QUESTION BANK
// ====================================

const questionBank = [

    // EASY MATHS
    {
        category: "🔢 Easy Maths",
        q: "What is 5 + 3?",
        options: ["6", "8", "9", "7"],
        answer: "8"
    },
    {
        category: "🔢 Easy Maths",
        q: "What is 10 - 4?",
        options: ["5", "7", "6", "4"],
        answer: "6"
    },
    {
        category: "🔢 Easy Maths",
        q: "What is 4 × 3?",
        options: ["7", "12", "16", "10"],
        answer: "12"
    },
    {
        category: "🔢 Easy Maths",
        q: "What is 20 ÷ 5?",
        options: ["2", "5", "4", "10"],
        answer: "4"
    },
    {
        category: "🔢 Easy Maths",
        q: "What is half of 18?",
        options: ["8", "9", "10", "6"],
        answer: "9"
    },
    {
        category: "🔢 Easy Maths",
        q: "What is 7 + 6?",
        options: ["12", "13", "14", "11"],
        answer: "13"
    },
    {
        category: "🔢 Easy Maths",
        q: "What is 9 × 2?",
        options: ["18", "16", "20", "11"],
        answer: "18"
    },
    {
        category: "🔢 Easy Maths",
        q: "What is 15 - 7?",
        options: ["7", "9", "8", "6"],
        answer: "8"
    },

    // NUMBER PUZZLES
    {
        category: "🧩 Number Puzzle",
        q: "What comes next: 2, 4, 6, 8, ?",
        options: ["9", "10", "12", "11"],
        answer: "10"
    },
    {
        category: "🧩 Number Puzzle",
        q: "What comes next: 5, 10, 15, 20, ?",
        options: ["25", "30", "22", "24"],
        answer: "25"
    },
    {
        category: "🧩 Number Puzzle",
        q: "What comes next: 1, 2, 3, 4, ?",
        options: ["6", "5", "7", "8"],
        answer: "5"
    },
    {
        category: "🧩 Number Puzzle",
        q: "What comes next: 10, 20, 30, ?",
        options: ["35", "45", "40", "50"],
        answer: "40"
    },
    {
        category: "🧩 Number Puzzle",
        q: "Which number is the odd one out?",
        options: ["2", "4", "7", "6"],
        answer: "7"
    },
    {
        category: "🧩 Number Puzzle",
        q: "What comes next: 3, 6, 9, 12, ?",
        options: ["14", "15", "16", "18"],
        answer: "15"
    },

    // GENERAL KNOWLEDGE
    {
        category: "🌍 General Knowledge",
        q: "What is the capital of India?",
        options: ["Mumbai", "Chennai", "New Delhi", "Kolkata"],
        answer: "New Delhi"
    },
    {
        category: "🌍 General Knowledge",
        q: "How many days are there in a week?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        category: "🌍 General Knowledge",
        q: "Which planet do we live on?",
        options: ["Mars", "Earth", "Venus", "Jupiter"],
        answer: "Earth"
    },
    {
        category: "🌍 General Knowledge",
        q: "How many months are there in a year?",
        options: ["10", "11", "12", "13"],
        answer: "12"
    },
    {
        category: "🌍 General Knowledge",
        q: "Which star gives Earth light and heat?",
        options: ["Moon", "Sun", "Mars", "Venus"],
        answer: "Sun"
    },
    {
        category: "🌍 General Knowledge",
        q: "Which is the largest ocean?",
        options: [
            "Indian Ocean",
            "Atlantic Ocean",
            "Pacific Ocean",
            "Arctic Ocean"
        ],
        answer: "Pacific Ocean"
    },
    {
        category: "🌍 General Knowledge",
        q: "How many colours are traditionally in a rainbow?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },

    // SCIENCE
    {
        category: "🔬 Simple Science",
        q: "Which gas do humans need to breathe?",
        options: ["Oxygen", "Helium", "Hydrogen", "Neon"],
        answer: "Oxygen"
    },
    {
        category: "🔬 Simple Science",
        q: "At what temperature does water freeze in Celsius?",
        options: ["0°C", "10°C", "50°C", "100°C"],
        answer: "0°C"
    },
    {
        category: "🔬 Simple Science",
        q: "Which organ pumps blood around the body?",
        options: ["Lungs", "Brain", "Heart", "Stomach"],
        answer: "Heart"
    },
    {
        category: "🔬 Simple Science",
        q: "Which part of a plant absorbs water?",
        options: ["Flower", "Roots", "Fruit", "Leaves"],
        answer: "Roots"
    },
    {
        category: "🔬 Simple Science",
        q: "Which is a natural source of light?",
        options: ["Mirror", "Sun", "Book", "Chair"],
        answer: "Sun"
    },
    {
        category: "🔬 Simple Science",
        q: "How many legs does a spider have?",
        options: ["6", "8", "10", "4"],
        answer: "8"
    },

    // RIDDLES
    {
        category: "🤔 Fun Riddle",
        q: "What has hands but cannot clap?",
        options: ["A robot", "A clock", "A monkey", "A doll"],
        answer: "A clock"
    },
    {
        category: "🤔 Fun Riddle",
        q: "What has teeth but cannot eat?",
        options: ["A comb", "A lion", "A dog", "A tiger"],
        answer: "A comb"
    },
    {
        category: "🤔 Fun Riddle",
        q: "What gets wetter as it dries?",
        options: ["A towel", "A book", "A table", "A shoe"],
        answer: "A towel"
    },
    {
        category: "🤔 Fun Riddle",
        q: "Which has a neck but no head?",
        options: ["A bottle", "A cat", "A bird", "A tree"],
        answer: "A bottle"
    },
    {
        category: "🤔 Fun Riddle",
        q: "What has keys but cannot open locks?",
        options: ["A door", "A piano", "A box", "A bag"],
        answer: "A piano"
    },
    {
        category: "🤔 Fun Riddle",
        q: "What has one eye but cannot see?",
        options: ["A needle", "A person", "A cat", "A bird"],
        answer: "A needle"
    },

    // ANIMALS AND NATURE
    {
        category: "🐾 Animals",
        q: "Which animal is called the king of the jungle?",
        options: ["Tiger", "Lion", "Elephant", "Horse"],
        answer: "Lion"
    },
    {
        category: "🐾 Animals",
        q: "Which animal gives us wool?",
        options: ["Cow", "Sheep", "Dog", "Cat"],
        answer: "Sheep"
    },
    {
        category: "🐾 Animals",
        q: "Which bird can mimic human speech?",
        options: ["Crow", "Parrot", "Eagle", "Owl"],
        answer: "Parrot"
    },
    {
        category: "🐾 Animals",
        q: "Which is the tallest land animal?",
        options: ["Elephant", "Giraffe", "Horse", "Camel"],
        answer: "Giraffe"
    },
    {
        category: "🐾 Animals",
        q: "What is a baby frog called?",
        options: ["Cub", "Calf", "Tadpole", "Chick"],
        answer: "Tadpole"
    },

    // EVERYDAY KNOWLEDGE
    {
        category: "💡 Quick Thinking",
        q: "How many wheels does a bicycle have?",
        options: ["1", "2", "3", "4"],
        answer: "2"
    },
    {
        category: "💡 Quick Thinking",
        q: "Which shape has three sides?",
        options: ["Square", "Circle", "Triangle", "Rectangle"],
        answer: "Triangle"
    },
    {
        category: "💡 Quick Thinking",
        q: "How many minutes are in one hour?",
        options: ["30", "45", "60", "100"],
        answer: "60"
    },
    {
        category: "💡 Quick Thinking",
        q: "Which direction does the Sun rise from?",
        options: ["North", "South", "East", "West"],
        answer: "East"
    },
    {
        category: "💡 Quick Thinking",
        q: "What do bees make?",
        options: ["Milk", "Honey", "Juice", "Butter"],
        answer: "Honey"
    },
    {
        category: "💡 Quick Thinking",
        q: "Which month comes after March?",
        options: ["May", "February", "April", "June"],
        answer: "April"
    }
];

// ====================================
// SCREEN MANAGEMENT
// ====================================

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    document.getElementById(screenId).classList.remove("hidden");
}

// ====================================
// START GAME
// ====================================

function startGame() {
    currentLevel = 1;
    questionIndex = 0;
    score = 0;
    correctAnswers = 0;

    prepareLevel();
    showScreen("game-screen");
    loadQuestion();
}

// ====================================
// PREPARE EACH LEVEL
// ====================================

function prepareLevel() {
    currentQuestions = [...questionBank];

    // Shuffle the question order.
    for (let i = currentQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [currentQuestions[i], currentQuestions[j]] =
        [currentQuestions[j], currentQuestions[i]];
    }

    // Each level contains exactly 20 questions.
    currentQuestions = currentQuestions.slice(
        0,
        QUESTIONS_PER_LEVEL
    );
}

// ====================================
// LOAD QUESTION
// ====================================

function loadQuestion() {
    clearInterval(timerInterval);

    if (questionIndex >= QUESTIONS_PER_LEVEL) {
        showLevelResult();
        return;
    }

    answered = false;
    timer = QUESTION_TIME;

    const questionData = currentQuestions[questionIndex];

    document.getElementById("level").textContent = currentLevel;

    document.getElementById("score").textContent = score;

    document.getElementById("question-number").textContent =
        questionIndex + 1;

    document.getElementById("progress-bar").style.width =
        ((questionIndex + 1) / QUESTIONS_PER_LEVEL) * 100 + "%";

    document.getElementById("category").textContent =
        questionData.category;

    document.getElementById("question").textContent =
        questionData.q;

    document.getElementById("feedback").textContent = "";

    document.getElementById("next-button").classList.add("hidden");

    const optionsContainer = document.getElementById("options");

    optionsContainer.innerHTML = "";

    // Shuffle the answer options.
    const shuffledOptions = [...questionData.options];

    for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledOptions[i], shuffledOptions[j]] =
        [shuffledOptions[j], shuffledOptions[i]];
    }

    shuffledOptions.forEach(option => {
        const button = document.createElement("button");

        button.className = "option-button";
        button.textContent = option;

        button.onclick = () => checkAnswer(option, button);

        optionsContainer.appendChild(button);
    });

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

// ====================================
// TIMER
// ====================================

function updateTimer() {
    document.getElementById("timer").textContent = timer;

    const timerElement = document.getElementById("timer");

    timerElement.classList.toggle("urgent", timer <= 10);

    if (timer <= 0) {
        clearInterval(timerInterval);

        if (!answered) {
            timeUp();
        }

        return;
    }

    timer--;
}

// ====================================
// CHECK ANSWER
// ====================================

function checkAnswer(selectedAnswer, selectedButton) {
    if (answered) return;

    answered = true;

    clearInterval(timerInterval);

    const questionData = currentQuestions[questionIndex];

    const buttons = document.querySelectorAll(".option-button");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === questionData.answer) {
            button.classList.add("correct");
        }
    });

    const feedback = document.getElementById("feedback");

    if (selectedAnswer === questionData.answer) {
        correctAnswers++;
        score += POINTS_PER_ANSWER;

        document.getElementById("score").textContent = score;

        feedback.textContent = "🎉 Correct! Amazing!";
        feedback.style.color = "#008f56";

    } else {
        selectedButton.classList.add("wrong");

        feedback.textContent =
            "❌ Not quite! Answer: " + questionData.answer;

        feedback.style.color = "#d62f4d";
    }

    document.getElementById("next-button").classList.remove("hidden");
}

// ====================================
// TIME UP
// ====================================

function timeUp() {
    answered = true;

    const questionData = currentQuestions[questionIndex];

    document.querySelectorAll(".option-button").forEach(button => {
        button.disabled = true;

        if (button.textContent === questionData.answer) {
            button.classList.add("correct");
        }
    });

    document.getElementById("feedback").textContent =
        "⏰ Time's up! Answer: " + questionData.answer;

    document.getElementById("feedback").style.color = "#d62f4d";

    document.getElementById("next-button").classList.remove("hidden");
}

// ====================================
// NEXT QUESTION
// ====================================

function nextQuestion() {
    questionIndex++;
    loadQuestion();
}

// ====================================
// SHOW LEVEL RESULT
// ====================================

function showLevelResult() {
    clearInterval(timerInterval);

    showScreen("result-screen");

    document.getElementById("correct-count").textContent =
        correctAnswers + " / " + QUESTIONS_PER_LEVEL;

    document.getElementById("final-score").textContent = score;

    const title = document.getElementById("result-title");
    const message = document.getElementById("result-message");
    const icon = document.getElementById("result-icon");
    const button = document.getElementById("continue-button");

    if (currentLevel < TOTAL_LEVELS) {
        title.textContent = "Level " + currentLevel + " Complete!";

        message.textContent =
            "Great job! You answered " + correctAnswers +
            " questions correctly. Ready for the next challenge?";

        icon.textContent = correctAnswers >= 15 ? "🏆" : "🎉";

        button.textContent = "Next Level 🚀";

    } else {
        title.textContent = "🎊 You Finished All 10 Levels!";

        message.textContent =
            "Amazing effort! You completed all 200 question rounds!";

        icon.textContent = "👑";

        button.textContent = "Play Again 🔄";
    }
}

// ====================================
// CONTINUE TO NEXT LEVEL
// ====================================

function continueGame() {
    if (currentLevel >= TOTAL_LEVELS) {
        startGame();
        return;
    }

    currentLevel++;
    questionIndex = 0;
    correctAnswers = 0;

    prepareLevel();

    showScreen("game-screen");

    loadQuestion();
}
