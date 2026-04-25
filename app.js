let profit = 0;

function win() {
  profit += 5000;
  document.getElementById("profit").innerText = profit;
}

function loss() {
  profit -= 5000;
  document.getElementById("profit").innerText = profit;
}
