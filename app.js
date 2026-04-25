let profit = localStorage.getItem("profit")
  ? parseInt(localStorage.getItem("profit"))
  : 0;

let history = localStorage.getItem("history")
  ? JSON.parse(localStorage.getItem("history"))
  : [];

document.getElementById("profit").innerText = profit;

function save() {
  localStorage.setItem("profit", profit);
  localStorage.setItem("history", JSON.stringify(history));
  drawChart();
}

function win() {
  profit += 5000;
  history.push(profit);
  document.getElementById("profit").innerText = profit;
  save();
}

function loss() {
  profit -= 5000;
  history.push(profit);
  document.getElementById("profit").innerText = profit;
  save();
}

function reset() {
  profit = 0;
  history = [];
  document.getElementById("profit").innerText = profit;
  save();
}

function drawChart() {
  const canvas = document.getElementById("chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, 100);

  history.forEach((value, i) => {
    ctx.lineTo(i * 20, 100 - value / 1000);
  });

  ctx.strokeStyle = "green";
  ctx.stroke();
}

drawChart();
