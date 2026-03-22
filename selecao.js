const scoreGeral = localStorage.getItem("score-geral") || 0;
const scoreHtml = localStorage.getItem("score-html") || 0;
const scoreCss = localStorage.getItem("score-css") || 0;
const scoreJs = localStorage.getItem("score-js") || 0;

document.getElementById("score-geral").innerText = `(${scoreGeral})`;
document.getElementById("score-html").innerText = `(${scoreHtml})`;
document.getElementById("score-css").innerText = `(${scoreCss})`;
document.getElementById("score-js").innerText = `(${scoreJs})`;
