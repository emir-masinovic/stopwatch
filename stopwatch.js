const display = document.getElementById("stopwatch-display");
const startPause = document.querySelector(".stopwatch-button.start");
const restart = document.querySelector(".stopwatch-button.reset");

let hours = 0;
let minutes = 0;
let seconds = 0;

let intervalId;
let intervalRunning = false;

startPause.addEventListener("click", toggleWatch);
restart.addEventListener("click", resetWatch);

function toggleWatch() {
  intervalRunning = !intervalRunning;
  startPause.innerText = intervalRunning ? "‖" : "▶";
  startPause.classList.toggle("start");
  startPause.classList.toggle("pause");

  if (intervalRunning) {
    intervalId = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
  } else {
    clearInterval(intervalId);
  }
}

function updateDisplay() {
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
  if (hours === 24) {
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;

  display.innerText = `${hoursString}:${minutesString}:${secondsString}`;
}

function resetWatch() {
  intervalRunning = false;

  hours = 0;
  minutes = 0;
  seconds = 0;

  startPause.innerText = "▶";
  startPause.classList.remove("pause");
  startPause.classList.add("start");
  clearInterval(intervalId);
  updateDisplay();
}
