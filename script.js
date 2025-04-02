const quizData = [
  {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      answer: "Paris"
  },
  {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
  },
  {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      answer: "Blue Whale"
  },
  {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
  },
  {
      question: "What year was JavaScript launched?",
      options: ["1996", "1995", "1994", "1997"],
      answer: "1995"
  },
  {
      question: "What does HTML stand for?",
      options: [
          "Hypertext Markup Language",
          "Hypertext Markdown Language",
          "Hyperloop Machine Language",
          "Helicopters Terminals Motorboats Lamborginis"
      ],
      answer: "Hypertext Markup Language"
  },
  {
      question: "Which of these is not a programming language?",
      options: ["Python", "HTML", "Java", "C++"],
      answer: "HTML"
  },
  {
      question: "Which of these is not a JavaScript framework?",
      options: ["React", "Angular", "Vue", "Django"],
      answer: "Django"
  },
  {
      question: "What does CSS stand for?",
      options: [
          "Cascading Style Sheets",
          "Colorful Style Sheets",
          "Computer Style Sheets",
          "Creative Style Sheets"
      ],
      answer: "Cascading Style Sheets"
  },
  {
      question: "Which symbol is used for single line comments in JavaScript?",
      options: ["//", "#", "/*", "--"],
      answer: "//"
  }
];

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const questionNumberElement = document.getElementById('question-number');
const timeElement = document.getElementById('time');
const currentScoreElement = document.getElementById('current-score');
const finalScoreElement = document.getElementById('final-score');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
  startScreen.classList.add('hide');
  quizScreen.classList.remove('hide');
  showQuestion();
  startTimer();
}

function showQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = '';
  
  currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('option');
      button.addEventListener('click', selectAnswer);
      optionsElement.appendChild(button);
  });
  
  questionNumberElement.textContent = currentQuestionIndex + 1;
  nextBtn.classList.add('hide');
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.textContent === quizData[currentQuestionIndex].answer;
  
  if (correct) {
      selectedButton.classList.add('correct');
      score++;
      currentScoreElement.textContent = score;
  } else {
      selectedButton.classList.add('incorrect');
      // Highlight correct answer
      Array.from(optionsElement.children).forEach(button => {
          if (button.textContent === quizData[currentQuestionIndex].answer) {
              button.classList.add('correct');
          }
      });
  }
  
  // Disable all options after selection
  Array.from(optionsElement.children).forEach(button => {
      button.disabled = true;
  });
  
  nextBtn.classList.remove('hide');
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
      showQuestion();
  } else {
      endQuiz();
  }
}

function startTimer() {
  timer = setInterval(() => {
      timeLeft--;
      timeElement.textContent = timeLeft;
      
      if (timeLeft <= 0) {
          endQuiz();
      }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  quizScreen.classList.add('hide');
  resultScreen.classList.remove('hide');
  finalScoreElement.textContent = score;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  currentScoreElement.textContent = '0';
  resultScreen.classList.add('hide');
  startQuiz();
}