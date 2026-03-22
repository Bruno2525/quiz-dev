let score = 0;

const questions = [
  {
    question: "Qual propriedade muda a cor do texto?",
    answers: [
      { text: "background-color", correct: false },
      { text: "color", correct: true },
      { text: "font-size", correct: false },
      { text: "text-align", correct: false },
    ],
  },
  {
    question: "Qual propriedade muda o tamanho da fonte?",
    answers: [
      { text: "font-size", correct: true },
      { text: "text-size", correct: false },
      { text: "size", correct: false },
      { text: "font-style", correct: false },
    ],
  },
  {
    question: "Qual propriedade centraliza texto horizontalmente?",
    answers: [
      { text: "align", correct: false },
      { text: "text-align", correct: true },
      { text: "center", correct: false },
      { text: "margin", correct: false },
    ],
  },
  {
    question: "Qual propriedade muda a cor de fundo?",
    answers: [
      { text: "color", correct: false },
      { text: "background-color", correct: true },
      { text: "bgcolor", correct: false },
      { text: "background", correct: false },
    ],
  },
  {
    question: "Qual propriedade cria espaçamento interno?",
    answers: [
      { text: "margin", correct: false },
      { text: "padding", correct: true },
      { text: "border", correct: false },
      { text: "spacing", correct: false },
    ],
  },
];

questions.sort(() => Math.random() - 0.5);

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const savedScoreElement = document.getElementById("savedScore");

let currentQuestionIndex = 0;

const savedScore = localStorage.getItem("score-css");
savedScoreElement.innerText = `Última pontuação: ${savedScore !== null ? savedScore : 0}`;

function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  question.style.animation = "none";
  question.offsetHeigth;
  question.style.animation = "fadeQuestion 0.4s ease";

  answersElement.innerHTML = "";
  nextBtn.disabled = true;

  currentQuestion.answers.sort(() => Math.random() - 0.5);

  currentQuestion.answers.forEach((answer, index) => {
    let button = document.createElement("button");
    button.innerText = answer.text;

    button.classList.add("anwser-animation");
    button.style.animationDelay = `${index * 0.1}s`;

    button.addEventListener("click", function () {
      let allButtons = answersElement.querySelectorAll("button");

      allButtons.forEach((btn) => {
        btn.disabled = true;
      });

      if (answer.correct) {
        button.style.backgroundColor = "green";
        score++;
      } else {
        button.style.backgroundColor = "red";
      }

      allButtons.forEach((btn, index) => {
        if (currentQuestion.answers[index].correct) {
          btn.style.backgroundColor = "green";
        }
      });

      nextBtn.disabled = false;
    });

    answersElement.appendChild(button);
  });
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questions.sort(() => Math.random() - 0.5);
  nextBtn.innerText = "Próxima";
  showQuestion();
}

nextBtn.addEventListener("click", function () {
  if (nextBtn.innerText === "Reiniciar") {
    restartQuiz();
    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    questionElement.innerText = `Você acertou ${score} de ${questions.length}!`;
    answersElement.innerHTML = "";
    nextBtn.innerText = "Reiniciar";
    nextBtn.disabled = false;

    localStorage.setItem("score-css", score);
    savedScoreElement.innerText = `Última pontuação: ${score}`;
  }
});

showQuestion();
