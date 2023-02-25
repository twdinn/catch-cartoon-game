const screens = document.querySelectorAll(".screen");
const chooseCharacterBtns = document.querySelectorAll(".choose-character-btn");
const startBtn = document.getElementById("start-btn");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");
const gameContainer = document.getElementById("game-container");

let seconds = 0;
let score = 0;
let selectedCharacter = {};

startBtn.addEventListener("click", () => screens[0].classList.add("up"));

chooseCharacterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");

    selectedCharacter = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createCharacter, 1000);

    startGame();
  });
});

const startGame = () => {
  setInterval(increaseTime, 1000);
};

const increaseTime = () => {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  timeEl.innerHTML = `Time: ${min}:${sec}`;
  seconds++;
};

const createCharacter = () => {
  const character = document.createElement("div");
  character.className = "character";

  const { x, y } = getRandomLocation();
  character.style.top = `${y}px`;
  character.style.left = `${x}px`;

  character.innerHTML = `<img src="${selectedCharacter.src}" alt="${
    selectedCharacter.alt
  }" style="transform: rotate(${Math.random() * 360}deg)"/>`;

  character.addEventListener("click", catchCharacter);

  gameContainer.appendChild(character);
};

const getRandomLocation = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;

  return { x, y };
};

const catchCharacter = (e) => {
  increaseScore();
  e.target.classList.add("caught");
  setTimeout(() => e.target.remove(), 2000);
  addCharacters();
};

const addCharacters = () => {
  setTimeout(createCharacter, 1000);
  setTimeout(createCharacter, 1500);
};

const increaseScore = () => {
  score++;
  if (score > 19) {
    message.classList.add("visible");
  }
  scoreEl.innerHTML = `Score: ${score}`;
};
