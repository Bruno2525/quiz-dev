let score = 0;

const questions = [
  {
    question: "Qual método usamos para pegar um elemento pelo id?",
    answers: [
      { text: "document.querySelector()", correct: false },
      { text: "document.getElementById()", correct: true },
      { text: "document.createElement()", correct: false },
      { text: "document.innerHTML()", correct: false },
    ],
  },
  {
    question: "Qual propriedade usamos para mudar o texto de um elemento?",
    answers: [
      { text: "innerStyle", correct: false },
      { text: "innerText", correct: true },
      { text: "textContent()", correct: false },
      { text: "appendChild", correct: false },
    ],
  },
  {
    question: "Qual método cria um novo elemento HTML pelo JavaScript?",
    answers: [
      { text: "document.createElement()", correct: true },
      { text: "document.getElementById()", correct: false },
      { text: "document.querySelector()", correct: false },
      { text: "document.write()", correct: false },
    ],
  },
  {
    question: "O que o addEventListener faz?",
    answers: [
      { text: "Remove um elemento", correct: false },
      { text: "Adiciona um evento a um elemento", correct: true },
      { text: "Cria uma variável", correct: false },
      { text: "Muda o CSS automaticamente", correct: false },
    ],
  },
  {
    question: "O que o appendChild faz?",
    answers: [
      { text: "Apaga um elemento", correct: false },
      { text: "Adiciona um elemento dentro de outro", correct: true },
      { text: "Esconde um botão", correct: false },
      { text: "Troca o texto da página", correct: false },
    ],
  },
];

questions.sort(() => Math.random() - 0.5);

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const savedScoreElement = document.getElementById("savedScore");

let currentQuestionIndex = 0;

const savedScore = localStorage.getItem("score-js");
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

    localStorage.setItem("score-js", score);
    savedScoreElement.innerText = `Última pontuação: ${score}`;
  }
});

showQuestion();
