if (localStorage.getItem("level1Complete") !== "true") {
    alert("Complete Level 1 first!");
    window.location.href = "index.html";
  }
  
  const images2 = [
    "image1.png", "image2.png", "image3.png", "image4.png", "image5.png",
    "image6.png", "image7.png", "image8.png", "image9.png", "image10.png"
  ];
  let cards2 = [...images2, ...images2];
  cards2.sort(() => 0.5 - Math.random());
  
  let board2 = document.getElementById("game-board2");
  let flipped2 = [];
  let matched2 = 0;
  let lock2 = false;
  let timerStarted2 = false;
  let seconds2 = 0;
  let moves2 = 0;
  let interval2;
  
  // Create bees
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
  
  for(let i = 0; i < 20; i++) {
    createBee();
  }
  
  // Create honeycomb cards with FAST flip
  cards2.forEach(img => {
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
      if (lock2) return;
      if (card.classList.contains("flipped")) return;
      if (card.classList.contains("matched")) return;
      
      // Start timer on first click
      if (!timerStarted2) startTimer2();
  
      // Flip card immediately
      card.classList.add("flipped");
      flipped2.push(card);
      
      // Update moves
      moves2++;
      document.getElementById("moves2").textContent = moves2;
  
      // Check for match when 2 cards are flipped
      if (flipped2.length === 2) {
        checkMatch2();
      }
    });
    
    board2.appendChild(card);
  });
  
  function checkMatch2() {
    lock2 = true;
    const [card1, card2] = flipped2;
    const img1 = card1.querySelector("img").src;
    const img2 = card2.querySelector("img").src;
    
    if (img1 === img2) {
      // Match found!
      setTimeout(() => {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matched2 += 2;
        flipped2 = [];
        lock2 = false;
        
        // Check if game complete
        if (matched2 === cards2.length) {
          clearInterval(interval2);
          setTimeout(showWinPopup, 600);
        }
      }, 400);
    } else {
      // No match - flip back quickly
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flipped2 = [];
        lock2 = false;
      }, 800);
    }
  }
  
  function startTimer2() {
    timerStarted2 = true;
    interval2 = setInterval(() => {
      seconds2++;
      document.getElementById("time2").textContent = seconds2;
    }, 1000);
  }
  
  function showWinPopup() {
    const level1Time = parseInt(localStorage.getItem("level1Time") || "0");
    const level1Moves = parseInt(localStorage.getItem("level1Moves") || "0");
    const totalTime = level1Time + seconds2;
    const totalMoves = level1Moves + moves2;
    
    document.getElementById("level1Time").textContent = level1Time;
    document.getElementById("level2Time").textContent = seconds2;
    document.getElementById("totalTime").textContent = totalTime;
    document.getElementById("totalMoves").textContent = totalMoves;
    document.getElementById("popup2").classList.remove("hidden");
  }
  
  function restartGame() {
    localStorage.clear();
    window.location.href = "index.html";
  }