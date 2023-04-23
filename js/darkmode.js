import { chromeget, chromeset, chromeremove } from "./default.js";

async function dark() {
  const tema = await chromeget("tema");

  //body
  let body = document.getElementsByTagName("body");
  body = body[0];

  //time_container
  const clock = document.getElementById("clock");

  //weather_container
  let weather = document.getElementsByClassName("weather_box");
  weather = weather[0];
  const weatherIMG = document.getElementById("weatherIMG");

  // icons_container
  let icons_box = document.getElementById("icons_box");

  // search_container
  const iconBox = document.getElementById("iconBox");
  const searchForm = document.getElementById("searchForm");
  const searchIMG = document.getElementById("searchIMG");
  const searchBtn = document.getElementById("searchBtn");

  // link_modify_container
  let link_modify_form = document.getElementsByClassName("link_modify_form");
  link_modify_form = link_modify_form[0];

  if (tema == "dark") {
    body.setAttribute("class", "dark");
    clock.classList.replace("light", "dark");
    weather.classList.replace("light", "dark");
    weatherIMG.classList.replace("light", "dark");

    icons_box.classList.replace("light", "dark");

    //search_container
    iconBox.classList.replace("light", "dark");
    searchForm.classList.replace("light", "dark");
    searchIMG.classList.replace("light", "dark");
    searchBtn.classList.replace("light", "dark");

    link_modify_form.classList.replace("light", "dark");
  } else if (tema == "light") {
    body.setAttribute("class", "light");
    clock.classList.replace("dark", "light");
    weather.classList.replace("dark", "light");
    weatherIMG.classList.replace("dark", "light");

    icons_box.classList.replace("dark", "light");

    //search_container
    iconBox.classList.replace("dark", "light");
    searchForm.classList.replace("dark", "light");
    searchIMG.classList.replace("dark", "light");
    searchBtn.classList.replace("dark", "light");

    link_modify_form.classList.replace("dark", "light");
  }
}

async function toggle() {
  const tema = await chromeget("tema");
  if (tema == "light") {
    chromeset("tema", "dark");
    init();
  } else if (tema == "dark") {
    chromeset("tema", "light");
    init();
  }
}

async function init() {
  const btn = document.getElementById("darkToggleBtn");
  const tema = await chromeget("tema");
  if (tema[0] == null) {
    chromeset("tema", "light");
  }
  btn.addEventListener("click", toggle);
  dark();
}

export { init as darkmode_init };
