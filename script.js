"use strict";

// creating an Object for questions
const quizData = [
  {
    question: "What does HTML stands for?",
    a: "Home Tool Markup Language",
    b: "Hyper Links and Text Markup Language",
    c: "Hyper Text Markup Language",
    d: "Hyper Tool Markup Language",
    correct: "c",
  },
  {
    question: "What does CSS stands for?",
    a: "Central Style Sheet",
    b: "Cascading Style Sheet",
    c: "Cascading Simple Sheet",
    d: "Central Simple Sheet",
    correct: "b",
  },
  {
    question:
      "The correct place to refer to an external style sheet in HTML file?",
    a: "In <body> tag",
    b: "In <head> tag",
    c: "In the End of the Document",
    d: "None",
    correct: "b",
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    a: "<style> tag",
    b: "<script> tag",
    c: "<css>",
    d: "None",
    correct: "a",
  },
  {
    question:
      "Which built-in method reverses the order of the element of an array?",
    a: "changeOrder(order)",
    b: "sort(order)",
    c: "rewrite(order)",
    d: "reverse(order)",
    correct: "d",
  },
];

//Assigning variables
const quiz = document.getElementById("quiz");
const resultEls = document.getElementById("result");

const answerEls = document.querySelectorAll(".answer");
const labelEls = document.querySelectorAll(".op_label");
const questionEls = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const scoreEls = document.getElementById("score");
const reloadBtn = document.getElementById("reload");

let currentQuestion = 0;
let answered = 0;

let submitted = false;

let userSelected = {};

//Q&A to appear in the Document
loadQuiz();
function loadQuiz() {
  questionEls.innerText = quizData[currentQuestion].question;
  a_text.innerText = quizData[currentQuestion].a;
  b_text.innerText = quizData[currentQuestion].b;
  c_text.innerText = quizData[currentQuestion].c;
  d_text.innerText = quizData[currentQuestion].d;
  deselectAnswer();

  if (userSelected[currentQuestion]) {
    let selected = userSelected[currentQuestion];
    document.getElementById(selected).checked = true;
  }
  if (currentQuestion == quizData.length - 1) {
    nextBtn.style.display = "none";
    if (submitted) {
      submitBtn.style.display = "none";
      reloadBtn.style.display = "block";
    } else {
      submitBtn.style.display = "block";
      reloadBtn.style.display = "none";
    }
  }
  //To show correct and wrong answers with adding colors
  if (submitted) {
    let actualAnswer = quizData[currentQuestion].correct;
    let userAnswered = userSelected[currentQuestion];
    labelEls.forEach((labelEls) => {
      labelEls.classList.remove("correct");
      labelEls.classList.remove("wrong");
    });
    if (actualAnswer === userAnswered) {
      let op = actualAnswer + "_text";
      document.getElementById(op).classList.add("correct");
    } else {
      let correct_op = actualAnswer + "_text";
      document.getElementById(correct_op).classList.add("correct");
      let user_op = userAnswered + "_text";
      document.getElementById(user_op).classList.add("wrong");
    }
  }
}

function deselectAnswer() {
  answerEls.forEach((answerEls) => {
    answerEls.checked = false;
  });
}
//event handling for next button
nextBtn.addEventListener("click", () => {
  let answer = getSelected();
  if (!submitted) {
    if (answer) {
      if (answer === quizData[currentQuestion].correct) {
        answered++;
      }
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuiz();
      }
    }
  } else {
    currentQuestion++;
    loadQuiz();
  }
});
//event handling for previous button
prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) currentQuestion--;

  loadQuiz();
});

submitBtn.addEventListener("click", () => {
  if (getSelected()) {
    submitted = true;
    quiz.style.display = "none";
    resultEls.style.display = "block";
    scoreEls.innerText =
      answered + "/" + quizData.length + "questions answered correctly";
  }
});

function getSelected() {
  let answer;
  answerEls.forEach((answerEls) => {
    if (answerEls.checked) {
      answer = answerEls.id;
      userSelected[currentQuestion] = answer;
    }
  });
  return answer;
}
//To show answers and disable submit button
function loadAnswers() {
  currentQuestion = 0;
  quiz.style.display = "block";
  resultEls.style.display = "none";
  answerEls.forEach((answerEls) => {
    answerEls.disabled = true;
  });
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
  loadQuiz();
}
