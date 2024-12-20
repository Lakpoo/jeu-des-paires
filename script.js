const images = ["/assets/symfony.png", "/assets/react.png", "/assets/laravel.png", "/assets/js.png", "/assets/java.png", "/assets/html.png", "/assets/css.png", "/assets/csharp.png"];
const imagesMelange = [...images, ...images].sort(() => 0.5 - Math.random());

let flippedCards = [];
let matchedPairs = 0;
let clickCounter = 0;
let isChecking = false;

let score = 0;
let bestScore = 0;

function getBestScore() {
  const savedBestScore = localStorage.getItem("bestScore");
  return savedBestScore ? parseInt(savedBestScore) : 0;
}

function updateBestScore() {
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore.toString());
  }
}

function updateScoreDisplay() {
  document.getElementById("score-display").textContent = `Score : ${score}`;
  document.getElementById("best-score-display").textContent = `Meilleur score : ${bestScore}`;
}

function creationPlanche(images) {
  const planche = document.getElementById("planche");

  images.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("card", "hidden");
    card.dataset.symbol = image;

    const img = document.createElement("img");
    img.src = image;
    img.classList.add("card-image");

    card.appendChild(img);
    planche.appendChild(card);

    card.addEventListener("click", handleCardClick);
  });

  const affichageScore = document.createElement("div");
  affichageScore.id = "score-display";
  document.body.insertBefore(affichageScore, planche);

  const affichageBestScore = document.createElement("div");
  affichageBestScore.id = "best-score-display";
  document.body.insertBefore(affichageBestScore, planche);

  updateScoreDisplay();
}

function handleCardClick(event) {
  if (isChecking || clickCounter >= 3) return;

  const card = event.currentTarget;
  if (card.classList.contains("matched") || !card.classList.contains("hidden")) return;

  card.classList.remove("hidden");
  flippedCards.push(card);
  clickCounter++;

  if (flippedCards.length === 2) {
    isChecking = true;
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;
    score += 200;
    if (matchedPairs === images.length) {
      endGame();
    }
  } else {
    card1.classList.add("hidden");
    card2.classList.add("hidden");
    score -= 50;
  }

  updateScoreDisplay();

  flippedCards = [];
  clickCounter = 0;
  isChecking = false;
}

function endGame() {
  updateBestScore();
  updateScoreDisplay();
  setTimeout(() => {
    alert(`BRAVO LE BOSS TU AS GAGNÉ!\Tu a eu : ${score}`);
  }, 500);
}

function initGame() {
  bestScore = getBestScore();

  creationPlanche(imagesMelange);

  updateScoreDisplay();
}

window.addEventListener("load", initGame);
