function loadGameContainer() {
  const mainContent = document.getElementById("main-content");
  mainContent.setAttribute("data-include", "../partials/game-container.html");
  includeHTML();
}

function loadGame(gameName) {
  const gameFrame = document.getElementById("game-frame");
  gameFrame.src = `./games/${gameName}/index.html`;
  gameFrame.style.display = "block";
}

function loadHome() {
  const mainContent = document.getElementById("main-content");
  mainContent.setAttribute("data-include", "partials/home.html");
  includeHTML();
  document.getElementById("game-frame").style.display = "none";
}
