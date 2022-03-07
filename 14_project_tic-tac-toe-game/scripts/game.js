function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custum player name for both players!");
    return;
  }

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI") {
    return;
  }

  const selectedField = event.target;

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  switchPlayer();
}
