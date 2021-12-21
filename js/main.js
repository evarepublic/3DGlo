window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  // Timer
  const countTimer = (deadline) => {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    const validTimeSlot = (timeSlot) => {
      if (timeSlot < 0) {
        timeSlot = 0;
      }
      return timeSlot;
    };

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = validTimeSlot((dateStop - dateNow) / 1000),
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return { timeRemaining, hours, minutes, seconds };
    };

    const addZero = (num) => {
      if (num <= 9) {
        num = `0${num}`;
      }
      return num;
    };

    const updateClock = () => {
      const timer = getTimeRemaining();

      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);

      if (timer.timeRemaining <= 0) {
        clearInterval(idInterval);
      }
    };

    updateClock();
  };

  const idInterval = setInterval(countTimer, 1000, "28 november 2021");

  // Menu
  const scrollToBlock = (block) => {
    const blockWrapper = document.getElementById(block),
      scrollTopToValue = blockWrapper.getBoundingClientRect().top;
    window.scrollTo({
      top: scrollTopToValue,
      behavior: "smooth",
    });
  };

  const toggleMenu = () => {
    const menu = document.querySelector("menu"),
      body = document.querySelector("body");

    const handlerMenu = (e) => {
      let target = e.target;
      if (!menu.classList.contains("active-menu")) {
        target = e.target.closest(".menu");
        if (target) {
          menu.classList.add("active-menu");
        } else {
          return;
        }
      } else {
        e.preventDefault();
        if (
          !target.matches("menu") ||
          target.matches(".close-btn") ||
          target.closest("ul>li")
        ) {
          menu.classList.remove("active-menu");
          if (target.closest("ul>li")) {
            const block = target.closest("li>a").href.split("#")[1];
            scrollToBlock(block);
          }
        } else {
          return;
        }
      }
    };

    body.addEventListener("click", handlerMenu);
  };

  toggleMenu();

  // ScrollDownBtn
  const scrollDown = (btnLink) => {
    const scrollDownBtn = document.querySelector(`a[href$="${btnLink}"`);
    scrollDownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToBlock(btnLink);
    });
  };

  scrollDown("service-block");

  // Popup
  const togglePopUp = () => {
    const popUp = document.querySelector(".popup"),
      popUpContent = popUp.querySelector(`[class$='-content']`),
      popUpBtns = document.querySelectorAll(".popup-btn");

    let count = 0,
      popUpInterval;

    const screenSizeCheck = () => {
      popUp.style.display = "block";
      if (document.documentElement.clientWidth <= 768) {
        cancelAnimationFrame(popUpInterval);
      } else {
        popUpInterval = requestAnimationFrame(popUpAnimate);
        count = 0;
      }
    };

    const popUpAnimate = function () {
      popUpInterval = requestAnimationFrame(popUpAnimate);
      count++;
      if (count > 70) {
        cancelAnimationFrame(popUpInterval);
        return;
      }
      if (count === 1) {
        popUp.style.opacity = 0;
      } else if (count < 30) {
        popUp.style.opacity = (count * 3.3) / 100;
      } else if (count >= 30 && count < 40) {
        popUpContent.style.transition = `1s`;
        popUpContent.style.transform = `rotate(15deg)`;
      } else if (count >= 40 && count < 50) {
        popUpContent.style.transition = `1s`;
        popUpContent.style.transform = `rotate(-15deg)`;
      } else if (count === 50) {
        popUpContent.style.transition = `1s`;
        popUpContent.style.transform = `rotate(0deg)`;
      }
    };

    popUpBtns.forEach((elem) =>
      elem.addEventListener("click", screenSizeCheck)
    );

    popUp.addEventListener("click", (event) => {
      let target = event.target;
      if (target.classList.contains("popup-close")) {
        popUp.style.display = "none";
      } else {
        target = target.closest(".popup-content");
        if (!target) {
          popUp.style.display = "none";
        }
      }
    });
  };

  togglePopUp();

  // Tabs
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      const target = event.target.closest(".service-header-tab");
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  // Slider
  const slider = () => {
    const slider = document.querySelector(".portfolio-content"),
      slide = slider.querySelectorAll(".portfolio-item"),
      dotsArea = slider.querySelector("ul");

    let currentSlide = 0,
      dot,
      intervalId;

    const createDot = (block) => {
      const dot = document.createElement("li");
      dot.classList.add("dot");
      block.insertAdjacentElement("beforeend", dot);
    };

    const dotsNavigation = () => {
      for (let i = 0; i < slide.length; i++) {
        createDot(dotsArea);
      }
      dot = dotsArea.querySelectorAll("li");
    };

    dotsNavigation();

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const overSlides = () => {
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      overSlides();
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (speed = 1500) => {
      intervalId = setInterval(autoPlaySlide, speed);
    };

    const stopSlide = () => {
      clearInterval(intervalId);
    };

    slider.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;

      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((elem, i) => {
          if (elem === target) {
            currentSlide = i;
          }
        });
      }

      overSlides();

      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    // события mouseenter/mouseleave не подходят
    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });

    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });
    startSlide();
  };

  slider();
});
