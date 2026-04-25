let profit = localStorage.getItem("profit")
  ? parseInt(localStorage.getItem("profit"))
  : 0;

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

  updateAI(winrate);

  localStorage.setItem("profit", profit);
  localStorage.setItem("wins", wins);
  localStorage.setItem("losses", losses);
}

function win() {
  profit += 5000;
  wins++;
  updateUI();
}

function loss() {
  profit -= 5000;
  losses++;
  updateUI();
}

function reset() {
  profit = 0;
  wins = 0;
  losses = 0;
  updateUI();
}

//
// 🤖 AI ENGINE (SMART LOGIC LAYER)
//
function aiConfidence(winrate) {
  // base AI scoring model (simple but effective logic)

  let base = 50;

  // performance influence
  if (winrate > 70) base += 30;
  else if (winrate > 50) base += 15;
  else if (winrate < 40) base -= 20;

  // randomness factor (simulating real AI uncertainty)
  let noise = Math.floor(Math.random() * 10);

  let confidence = base + noise;

  if (confidence > 95) confidence = 95;
  if (confidence < 10) confidence = 10;

  return confidence;
}

function riskLevel(confidence) {
  if (confidence >= 75) return "🟢 LOW RISK";
  if (confidence >= 50) return "🟡 MEDIUM RISK";
  return "🔴 HIGH RISK";
}

function updateAI(winrate) {
  let confidence = aiConfidence(winrate);
  let risk = riskLevel(confidence);

  let message = "";

  if (confidence >= 75) {
    message = "🔥 AI: Strong bet conditions detected";
  } else if (confidence >= 50) {
    message = "📊 AI: Moderate opportunity, be careful";
  } else {
    message = "⚠️ AI: High risk — avoid or reduce stake";
  }

  // create or update AI panel
  let aiBox = document.getElementById("aiBox");

  if (!aiBox) {
    aiBox = document.createElement("div");
    aiBox.id = "aiBox";
    aiBox.style.margin = "10px";
    aiBox.style.padding = "10px";
    aiBox.style.background = "#f4f4f4";
    aiBox.style.borderRadius = "10px";
    document.body.appendChild(aiBox);
  }

  aiBox.innerHTML = `
    <h3>🤖 AI Prediction Engine</h3>
    <p><b>Confidence:</b> ${confidence}%</p>
    <p><b>Risk:</b> ${risk}</p>
    <p>${message}</p>
  `;
}

updateUI();
