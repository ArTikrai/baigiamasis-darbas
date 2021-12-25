"use strict";

//
// About section tab navigation
//

const tabNavigationElements = document.querySelectorAll(
  ".about .tab-navigation li"
);
const tabContentElements = document.querySelectorAll(".about .tab-content");

function removeActiveClassesFromElements(elements) {
  for (let element of elements) {
    element.classList.remove("active");
  }
}

for (let tabElement of tabNavigationElements) {
  tabElement.addEventListener("click", function () {
    const target = this.dataset.target; // "register" / "apply" / "receive"

    removeActiveClassesFromElements(tabNavigationElements);
    this.classList.add("active");

    removeActiveClassesFromElements(tabContentElements);
    document
      .querySelector('.tab-content[data-tab="' + target + '"]')
      .classList.add("active");
  });
}

//
// Reviews section swiper gallery
//

const swiper = new Swiper(".reviews-swiper", {
  speed: 2000,
  slidesPerView: 1,
  spaceBetween: 50,
  // slidesPerGroup: 3,
  // autoHeight: true,
  loop: true,
  autoplay: {
    delay: 2000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    1100: {
      slidesPerView: 3,
      spaceBetween: 120,
    },
    700: {
      slidesPerView: 2,
      spaceBetween: 100,
    },
  },
});

//
// Get weather data from openweather API
//

const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Vilnius&units=metric&appid=311b9d4d0f48a2eaec9e0024d33228e1";
const weatherElement = document.getElementById("weather-in-celsius");

function getCurrentWeatherInCelsius() {
  const http = new XMLHttpRequest();
  http.open("GET", url);
  http.addEventListener("load", function () {
    const response = JSON.parse(http.response);
    const temperature = Math.round(response.main.temp);

    if (temperature > 0) {
      weatherElement.innerText = "+" + temperature;
    } else {
      weatherElement.innerText = temperature;
    }
  });
  http.send();
}

window.addEventListener("load", getCurrentWeatherInCelsius);

// Hamburger nav
const btn = document.querySelector(".fancy-burger");

btn.addEventListener("click", () => {
  btn.querySelectorAll("span").forEach((span) => span.classList.toggle("open"));
});
