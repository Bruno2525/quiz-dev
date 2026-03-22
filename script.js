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
    question: "Qual linguagem usamos para estilizar?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false },
    ],
  },
  {
    question: "Qual linguagem usamos para adicionar interatividade ao site?",
    answers: [
      { text: "CSS", correct: false },
      { text: "JavaScript", correct: true },
      { text: "HTML", correct: false },
      { text: "SQL", correct: false },
    ],
  },
  {
    question: "Qual tag é usada para criar um link em HTML?",
    answers: [
      { text: "<p>", correct: false },
      { text: "<a>", correct: true },
      { text: "<div>", correct: false },
      { text: "<link>", correct: false },
    ],
  },
  {
    question: "Qual propriedade CSS muda a cor do texto?",
    answers: [
      { text: "background-color", correct: false },
      { text: "font-size", correct: false },
      { text: "color", correct: true },
      { text: "text-align", correct: false },
    ],
  },
  {
    question: "O que o document.getElementById faz?",
    answers: [
      { text: "Cria um elemento novo", correct: false },
      { text: "Pega um elemento pelo id", correct: true },
      { text: "Remove um elemento", correct: false },
      { text: "Troca a cor do elemento", correct: false },
    ],
  },
  {
    question: "Para que serve o innerText?",
    answers: [
      { text: "Para estilizar o elemento", correct: false },
      { text: "Para adicionar texto ao elemento", correct: true },
      { text: "Para apagar o HTML inteiro", correct: false },
      { text: "Para criar botão", correct: false },
    ],
  },
  {
    question: "O que o appendChild faz?",
    answers: [
      { text: "Apaga um elemento filho", correct: false },
      { text: "Adiciona um elemento filho dentro de outro", correct: true },
      { text: "Copia o CSS", correct: false },
      { text: "Oculta um elemento", correct: false },
    ],
  },
];

questions.sort(() => Math.random() - 0.5);

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const savedScoreElement = document.getElementById("savedScore");

let currentQuestionIndex = 0;

const savedScore = localStorage.getItem("score-geral");
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
// 
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
//
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
    localStorage.setItem("score-geral", score);
    savedScoreElement.innerText = `Última pontuação: ${score}`;
  }
});

showQuestion();
