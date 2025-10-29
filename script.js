const images = ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png"];
let cards = [...images, ...images];
cards.sort(() => 0.5 - Math.random());

let board = document.getElementById("game-board");
let flipped = [];
let matched = 0;
let lock = false;
let timerStarted = false;
let seconds = 0;
let moves = 0;
let interval;

// Create animated bees
function createBee() {
  const bee = document.createElement('div');
  bee.className = 'bee-flying';
  bee.innerHTML = '🐝';
  bee.style.left = Math.random() * 100 + '%';
  bee.style.top = Math.random() * 100 + '%';
  bee.style.animationDuration = (Math.random() * 8 + 10) + 's';
  bee.style.animationDelay = Math.random() * 5 + 's';
  document.getElementById('beeSwarm').appendChild(bee);
}

for(let i = 0; i < 15; i++) {
  createBee();
}

// Create honeycomb cards with FAST flip
cards.forEach(img => {
  const card = document.createElement("div");
  card.classList.add("honeycomb-card");
  
  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");
  
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  
  const image = document.createElement("img");
  image.src = `images/${img}`;
  cardBack.appendChild(image);
  
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  card.addEventListener("click", function handleClick() {
    // Prevent multiple clicks
    if (lock) return;
    if (card.classList.contains("flipped")) return;
    if (card.classList.contains("matched")) return;
    
    // Start timer on first click
    if (!timerStarted) startTimer();

    // Flip card immediately
    card.classList.add("flipped");
    flipped.push(card);
    
    // Update moves
    moves++;
    document.getElementById("moves").textContent = moves;

    // Check for match when 2 cards are flipped
    if (flipped.length === 2) {
      checkMatch();
    }
  });
  
  board.appendChild(card);
});

function checkMatch() {
  lock = true;
  const [card1, card2] = flipped;
  const img1 = card1.querySelector("img").src;
  const img2 = card2.querySelector("img").src;
  
  if (img1 === img2) {
    // Match found!
    setTimeout(() => {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matched += 2;
      flipped = [];
      lock = false;
      
      // Check if game complete
      if (matched === cards.length) {
        clearInterval(interval);
        setTimeout(showPopup, 600);
      }
    }, 400);
  } else {
    // No match - flip back quickly
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flipped = [];
      lock = false;
    }, 800);
  }
}

function startTimer() {
  timerStarted = true;
  interval = setInterval(() => {
    seconds++;
    document.getElementById("time").textContent = seconds;
  }, 1000);
  document.getElementById("subtitle").style.display = "none";
}

function showPopup() {
  document.getElementById("finalTime").textContent = seconds;
  document.getElementById("finalMoves").textContent = moves;
  document.getElementById("popup").classList.remove("hidden");
  
  localStorage.setItem("level1Complete", "true");
  localStorage.setItem("level1Time", seconds);
  localStorage.setItem("level1Moves", moves);
  
  const btn = document.getElementById("nextLevelBtn");
  btn.addEventListener("click", () => {
    window.location.href = "level2.html";
  }, { once: true });
}