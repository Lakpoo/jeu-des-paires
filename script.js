const images = ["/assets/symfony.png", "/assets/react.png", "/assets/laravel.png", "/assets/js.png", "/assets/java.png", "/assets/html.png", "/assets/css.png", "/assets/csharp.png"];
const imagesMelange = [...images, ...images].sort(() => 0.5 - Math.random());

let flippedCards = [];
let matchedPairs = 0;
let clickCounter = 0;
let isChecking = false;

let score = 0;

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
    if (matchedPairs === images.length) {
      setTimeout(() => alert("BRAVO LE BOSS TU A GAGNER"), 500);
    }
  } else {
    card1.classList.add("hidden");
    card2.classList.add("hidden");
  }

  flippedCards = [];
  clickCounter = 0;
  isChecking = false;
}

creationPlanche(imagesMelange);
