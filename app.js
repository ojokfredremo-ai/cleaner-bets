let profit = localStorage.getItem("profit")
  ? parseInt(localStorage.getItem("profit"))
  : 0;

let history = localStorage.getItem("history")
  ? JSON.parse(localStorage.getItem("history"))
  : [];

let wins = localStorage.getItem("wins")
  ? parseInt(localStorage.getItem("wins"))
  : 0;

let losses = localStorage.getItem("losses")
  ? parseInt(localStorage.getItem("losses"))
  : 0;

document.getElementById("profit").innerText = profit;

function save() {
  localStorage.setItem("profit", profit);
  localStorage.setItem("history", JSON.stringify(history));
  localStorage.setItem("wins", wins);
  localStorage.setItem("losses", losses);
  drawChart();
}

function notify(msg) {
  alert(msg);
}

function win() {
  profit += 5000;
  wins += 1;

  history.push(profit);

  document.getElementById("profit").innerText = profit;

  save();
  notify("✔ Win +5000 UGX");
}

function loss() {
  profit -= 5000;
  losses += 1;

  history.push(profit);

  document.getElementById("profit").innerText = profit;

  save();
  notify("✖ Loss -5000 UGX");
}

function reset() {
  profit = 0;
  history = [];
  wins = 0;
  losses = 0;

  document.getElementById("profit").innerText = profit;

  save();
  notify("System reset complete");
}

function drawChart() {
  const canvas = document.getElementById("chart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, 100);

  history.forEach((value, i) => {
    ctx.lineTo(i * 15, 100 - value / 1000);
  });

  ctx.strokeStyle = "#22c55e";
  ctx.stroke();
}

drawChart();
