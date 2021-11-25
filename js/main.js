window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  // Timer
  function countTimer(deadline) {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function validTimeSlot(timeSlot) {
      if (timeSlot < 0) {
        timeSlot = 0;
      }
      return timeSlot;
    }

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = validTimeSlot((dateStop - dateNow) / 1000),
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return { timeRemaining, hours, minutes, seconds };
    }

    function standardize(timeValue) {
      if (timeValue.toString().length === 1) {
        timeValue = `0${timeValue}`;
      }
      return timeValue;
    }

    function updateClock() {
      const timer = getTimeRemaining();

      timerHours.textContent = standardize(timer.hours);
      timerMinutes.textContent = standardize(timer.minutes);
      timerSeconds.textContent = standardize(timer.seconds);

      if (timer.timeRemaining <= 0) {
        clearInterval(idInterval);
      }
    }

    updateClock();
  }

  const idInterval = setInterval(countTimer, 1000, "26 november 2021");
});
