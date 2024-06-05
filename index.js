const allImgs = document.querySelectorAll("img");
const header = document.querySelector(".header");
const start = document.querySelector(".start");
const timerDisplay = document.querySelector(".timer");
const score = document.querySelector(".score");
const again = document.querySelector(".again");
const audio = document.querySelector("#audio");

//! Timer

let totalTime = 10; // 3 dakika, 60 saniye * 3 = 180 saniye

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

toStart();

//? Variables

let points = 0;
let activeOne = false;
let activeTwo = false;

//! Start Button
start.addEventListener("click", () => {
  toStart();
  start.classList.add("none");
  timerDisplay.classList.remove("none");
  // ! Image Movements
  allImgs.forEach((image) => {
    image.addEventListener("click", () => {
      if (!activeOne) {
        activeOne = image;
        activeOne.classList.remove("close");
        activeOne.classList.add("open");
      } else if (!activeTwo && image !== activeOne) {
        activeTwo = image;
        activeTwo.classList.remove("close");
        activeTwo.classList.add("open");

        //! Control
        setTimeout(() => {
          if (activeOne.src === activeTwo.src) {
            points++;
            score.textContent = points;
            if (points === 10) {
              header.textContent = "Herzlichen Glückwunsch!";
            }
          } else {
            activeOne.classList.remove("open");
            activeOne.classList.add("close");
            activeTwo.classList.remove("open");
            activeTwo.classList.add("close");
          }
          activeOne = false;
          activeTwo = false;

          if (totalTime <= 0 || points !== 10) {
            again.classList.remove("none");
            again.classList.add("block");
          }
        }, 1000);
      }
    });
  });
});
