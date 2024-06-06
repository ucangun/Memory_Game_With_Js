const allImgs = document.querySelectorAll("img");
const header = document.querySelector(".header");
const start = document.querySelector(".start");
const timerDisplay = document.querySelector(".timer");
const score = document.querySelector(".score");
const again = document.querySelector(".again");
const audio = document.querySelector("#audio");
const imagesBox = document.querySelector(".row");

//! Random Images
// Function to shuffle the images array
const mixImages = function (arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  return arr;
};

// Created an image array
let images = [];
for (let i = 1; i <= 10; i++) {
  images.push(`./img/img${i}-min.jpg`);
  images.push(`./img/img${i}-min.jpg`);
}

//Shuffle the images array
images = mixImages(images);

//! Images to HTML
images.forEach((src) => {
  const colDiv = document.createElement("div");
  colDiv.className = "col border border-1 border-white p-0";

  // Yeni bir img elementi oluşturma
  const img = document.createElement("img");
  img.src = src;
  img.alt = "";

  // img elementini col div'inin içine ekleme
  colDiv.appendChild(img);

  // col div'ini row div'inin içine ekleme
  imagesBox.appendChild(colDiv);
});

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
            activeOne = false;
            activeTwo = false;
          } else {
            setTimeout(() => {
              activeOne.classList.remove("open");
              activeOne.classList.add("close");
              activeTwo.classList.remove("open");
              activeTwo.classList.add("close");
              activeOne = false;
              activeTwo = false;
            }, 1000);
          }
        }, 0);
      }
    });
  });
});
