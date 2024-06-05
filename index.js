const allImgs = document.querySelectorAll("img");
const start = document.querySelector(".start");
const timerDisplay = document.querySelector(".timer");
const score = document.querySelector(".score");
const again = document.querySelector(".again");
const audio = document.querySelector("#audio");

allImgs.forEach((image) => {
  image.classList.add("close");
});

//! Timer

let totalTime = 180; // 3 dakika, 60 saniye * 3 = 180 saniye

const timer = setInterval(() => {
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  const displayString =
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;

  timerDisplay.textContent = `Timer : ${displayString}`;

  if (totalTime <= 0) {
    clearInterval(timer);
    timerDisplay.textContent = "Süre Bitti!";
  } else {
    totalTime--;
  }
}, 1000);

//! Init Position
function toStart() {
  score.textContent = 0;
  again.classList.add("none");
  allImgs.forEach((image) => {
    image.classList.add("close");
  });
  audio.play();
  audio.volume = 0.1;
}

//! Start Button
start.addEventListener("click", () => {
  toStart();
  start.classList.add("none");
  timerDisplay.classList.remove("none");
});

allImgs.forEach((image) => {});
