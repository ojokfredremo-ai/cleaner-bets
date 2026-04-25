let profit = localStorage.getItem("profit")
  ? parseInt(localStorage.getItem("profit"))
  : 0;

document.getElementById("profit").innerText = profit;

function updateUI() {
  document.getElementById("profit").innerText = profit;
  localStorage.setItem("profit", profit);
}

function win() {
  profit += 5000;
  updateUI();
}

function loss() {
  profit -= 5000;
  updateUI();
}

function reset() {
  profit = 0;
  updateUI();
}
