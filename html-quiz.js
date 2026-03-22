let score = 0;

const questions = [
  {
    question: "O que significa HTML?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Tech Modern Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks Text Management Language", correct: false },
    ],
  },
  {
    question: "Qual tag é usada para criar um parágrafo?",
    answers: [
      { text: "<p>", correct: true },
      { text: "<h1>", correct: false },
      { text: "<div>", correct: false },
      { text: "<a>", correct: false },
    ],
  },
  {
    question: "Qual tag é usada para criar um link?",
    answers: [
      { text: "<link>", correct: false },
      { text: "<a>", correct: true },
      { text: "<p>", correct: false },
      { text: "<button>", correct: false },
    ],
  },
  {
    question: "Qual tag é usada para exibir uma imagem?",
    answers: [
      { text: "<img>", correct: true },
      { text: "<image>", correct: false },
      { text: "<src>", correct: false },
      { text: "<picture>", correct: false },
    ],
  },
  {
    question:
      "Qual atributo é usado para identificar um elemento de forma única?",
    answers: [
      { text: "class", correct: false },
      { text: "id", correct: true },
      { text: "name", correct: false },
      { text: "src", correct: false },
    ],
  },
];

questions.sort(() => Math.random() - 0.5);

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const savedScoreElement = document.getElementById("savedScore");

let currentQuestionIndex = 0;

const savedScore = localStorage.getItem("score-html");
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

  currentQuestion.answers.forEach((answer,index) => {
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

    // salva só no final
    localStorage.setItem("score-html", score);
    savedScoreElement.innerText = `Última pontuação: ${score}`;
  }
});

showQuestion();
