const displayHTML = document.getElementById("stopwatch-display");
const startPauseHTML = document.querySelector(".stopwatch-button.start");
const resetHTML = document.querySelector(".stopwatch-button.reset");
const wheelLine1HTML = document.querySelectorAll(".stopwatch-wheel-line")[0];
const wheelLine2HTML = document.querySelectorAll(".stopwatch-wheel-line")[1];

let stopwatch = {
  display: displayHTML,
  startPause: startPauseHTML,
  reset: resetHTML,
  wheel1: wheelLine1HTML,
  wheel2: wheelLine2HTML,
  hours: 0,
  minutes: 0,
  seconds: 0,
  watchStarted: false,
  intervalID: null,
  wheelIntervalID: null,
  wheelRotation: 0,
};

stopwatch.startPause.addEventListener("click", function () {
  toggleWatch(stopwatch);
  toggleWatchClass(stopwatch);
  moveWatchTime(stopwatch);
  spinWatchWheels(stopwatch);
});

stopwatch.reset.addEventListener("click", function () {
  resetWatch(stopwatch);
});

function toggleWatch(_stopwatch) {
  _stopwatch.watchStarted = !_stopwatch.watchStarted;
}

function toggleWatchClass(stopwatch) {
  stopwatch.startPause.innerText = stopwatch.watchStarted ? "‖" : "▶";
  stopwatch.startPause.classList.toggle("start");
  stopwatch.startPause.classList.toggle("pause");
}

function moveWatchTime(stopwatch) {
  if (stopwatch.watchStarted) {
    stopwatch.intervalID = setInterval(() => {
      stopwatch.seconds++;
      if (stopwatch.seconds === 60) {
        stopwatch.minutes++;
        stopwatch.seconds = 0;
      }
      if (stopwatch.minutes === 60) {
        stopwatch.hours++;
        stopwatch.minutes = 0;
      }
      if (stopwatch.hours === 24) {
        stopwatch.hours = 0;
        stopwatch.minutes = 0;
        stopwatch.seconds = 0;
      }
      updateWatchDisplay(stopwatch);
    }, 1000);
  } else {
    clearInterval(stopwatch.intervalID);
  }
}

function updateWatchDisplay(stopwatch) {
  const secondsString =
    stopwatch.seconds < 10 ? `0${stopwatch.seconds}` : `${stopwatch.seconds}`;
  const minutesString =
    stopwatch.minutes < 10 ? `0${stopwatch.minutes}` : `${stopwatch.minutes}`;
  const hoursString =
    stopwatch.hours < 10 ? `0${stopwatch.hours}` : `${stopwatch.hours}`;
  stopwatch.display.innerText = `${hoursString}:${minutesString}:${secondsString}`;
}

function resetWatch(stopwatch) {
  stopwatch.watchStarted = false;

  stopwatch.hours = 0;
  stopwatch.minutes = 0;
  stopwatch.seconds = 0;

  stopwatch.startPause.innerText = "▶";
  stopwatch.startPause.classList.remove("pause");
  stopwatch.startPause.classList.add("start");

  stopwatch.wheelRotation = 0;
  stopwatch.wheel1.style.transform = `rotate(${stopwatch.wheelRotation}deg)`;
  stopwatch.wheel2.style.transform = `rotate(${stopwatch.wheelRotation}deg)`;

  clearInterval(stopwatch.intervalID);
  clearInterval(stopwatch.wheelIntervalID);
  updateWatchDisplay(stopwatch);
}

function spinWatchWheels(stopwatch) {
  if (stopwatch.watchStarted) {
    stopwatch.wheelIntervalID = setInterval(() => {
      stopwatch.wheelRotation = (stopwatch.wheelRotation + 1) % 360;
      stopwatch.wheel1.style.transform = `rotate(${stopwatch.wheelRotation}deg)`;
      stopwatch.wheel2.style.transform = `rotate(${stopwatch.wheelRotation}deg)`;
    }, 10);
  } else {
    clearInterval(stopwatch.wheelIntervalID);
  }
}
