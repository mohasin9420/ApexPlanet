const themes = ['light-theme', 'dark-theme', 'sky-theme', 'purple-theme'];
let currentTheme = 0;

const toggleBtn = document.getElementById('toggleTheme');

toggleBtn.addEventListener('click', () => {
  document.body.classList.remove(...themes);
  currentTheme = (currentTheme + 1) % themes.length;
  document.body.classList.add(themes[currentTheme]);
});

let score = 0;

function animateScore() {
  const scoreValue = document.getElementById('score-value');
  scoreValue.classList.remove('score-animate-pop');
  void scoreValue.offsetWidth; // trigger reflow
  scoreValue.classList.add('score-animate-pop');
}

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Rome', 'Berlin'],
    answer: 'Paris'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Mars'
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    answer: 'Pacific'
  },
  {
    question: 'Who wrote Hamlet?',
    options: ['Shakespeare', 'Dickens', 'Tolstoy', 'Hemingway'],
    answer: 'Shakespeare'
  }
];

let currentQuestion = 0;

function showQuestion(idx) {
  const q = questions[idx];
  document.getElementById('question').innerText = q.question;
  const optionsDiv = document.querySelector('.quiz .options');
  optionsDiv.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.onclick = function() { checkAnswer(this); };
    optionsDiv.appendChild(btn);
  });
  document.getElementById('quiz-result').innerText = '';
}

function checkAnswer(button) {
  const result = document.getElementById('quiz-result');
  const q = questions[currentQuestion];
  if (button.innerText === q.answer) {
    result.innerText = '✅ Correct!';
    result.style.color = 'green';
    score++;
    document.getElementById('score-value').innerText = score;
    animateScore();
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
      } else {
        endQuiz();
      }
    }, 900);
  } else {
    result.innerText = '❌ Incorrect. Test Ended!';
    result.style.color = 'red';
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById('question').innerText = '🎉 Quiz Complete!';
  document.querySelector('.quiz .options').innerHTML = '';
  document.getElementById('quiz-result').innerHTML = `Final Score: <span style='color:#b721ff;font-size:1.5em;'>${score}</span> / ${questions.length}<br><button id='retest-btn' class='retest-btn'>Retest</button>`;
  document.getElementById('score-value').innerText = score;
  animateScore();
  document.getElementById('retest-btn').onclick = function() {
    score = 0;
    currentQuestion = 0;
    document.getElementById('score-value').innerText = score;
    showQuestion(currentQuestion);
  };
}

// Show the first question on page load
window.addEventListener('DOMContentLoaded', () => {
  showQuestion(currentQuestion);
});

async function getJoke() {
  const jokeBox = document.getElementById('joke');
  jokeBox.innerText = 'Fetching a joke...';

  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await res.json();
    jokeBox.innerHTML = `<strong>${data.setup}</strong><br><br>${data.punchline}`;
  } catch (error) {
    jokeBox.innerText = 'Failed to load joke. Please try again.';
    console.error(error);
  }
}
