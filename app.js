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

function updateUI() {
  document.getElementById("profit").innerText = profit;
  document.getElementById("wins").innerText = wins;
  document.getElementById("losses").innerText = losses;

  let winrate = wins + losses === 0
    ? 0
    : Math.round((wins / (wins + losses)) * 100);

  document.getElementById("winrate").innerText =
    "Win Rate: " + winrate + "%";

  updateInsight(winrate);

  localStorage.setItem("profit", profit);
  localStorage.setItem("history", JSON.stringify(history));
  localStorage.setItem("wins", wins);
  localStorage.setItem("losses", losses);

  drawChart();
}

function win() {
  profit += 5000;
  wins++;
  history.push(profit);
  updateUI();
}

function loss() {
  profit -= 5000;
  losses++;
  history.push(profit);
  updateUI();
}

function reset() {
  profit = 0;
  wins = 0;
  losses = 0;
  history = [];
  updateUI();
}

function updateInsight(winrate) {
  let msg = "";

  if (wins + losses === 0) {
    msg = "Start tracking your bets 📊";
  } else if (winrate >= 70) {
    msg = "🔥 Strong performance. Stay disciplined.";
  } else if (winrate >= 50) {
    msg = "📊 Average results. Improve selections.";
  } else {
    msg = "⚠️ High risk pattern. Be careful.";
  }

  document.getElementById("insight").innerText = msg;
}

function drawChart() {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, 100);

  history.forEach((value, i) => {
    ctx.lineTo(i * 15, 100 - value / 1000);
  });

  ctx.strokeStyle = "green";
  ctx.stroke();
}

updateUI();
