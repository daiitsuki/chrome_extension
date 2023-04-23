import { darkmode_init } from "./darkmode.js";
import { weather_init } from "./weather.js";
import { clock_init } from "./clock.js";
import { search_init } from "./search.js";
import { link_modify_init } from "./form.js";
import { icons_show_init } from "./icons.js";
import { anitime_init } from "./anitime.js";
import { memo_init } from "./memo.js";

// import { todo_init, todolistOnOff } from "./todos.js";

//////////// Default
function bodyClicked(event) {
  const target = event.target;
  // todolist showing toggle
  // const todolist = document.getElementById("list_wrapper");
  // const todoShow = todolist.classList.contains("todolist-showing");
  // if (
  //   todoShow &&
  //   target.id !== "todolistBtnIMG" &&
  //   target.id !== "todolistBtn"
  // ) {
  //   todolistOnOff(event);
  // }
}

function makeHTML() {
  const wrapper = document.getElementById("icons_box");
  let HTML = "";
  for (let i = 1; i < 11; i++) {
    HTML =
      HTML +
      `        <div class="icon_wrapper" id="icon_wrapper${i}" n="${i}">
    <div class="link_option" id="link_option${i}" n="${i}">
      <img
        class="link_option_IMG noselect"
        id="LOIMG${i}"
        src="icons/etc/op.png"
        style="display: none"
        n="${i}"
      />
    </div>
    <div class="icon" n="${i}">
      <img
        class="favicon noselect"
        id="favicon${i}"
        src="icons/etc/favicon.png"
        n="${i}"
      />
    </div>
    <div class="icon_title noselect light" id="title${i}" n="${i}"></div>
  </div>`;
  }
  wrapper.innerHTML = HTML;
  // console.log("success");
}

async function chromeget(a, b) {
  var p = new Promise(function (resolve, reject) {
    chrome.storage.sync.get({ [a]: [b] }, function (options) {
      resolve(options[a]);
    });
  });

  let configOut = await p;
  if (configOut != null) {
    if (configOut[0] == null) {
      configOut = null;
    }
  }

  return configOut;
}

async function chromeset(a, b) {
  var p = new Promise(function (resolve, rejct) {
    chrome.storage.sync.set({ [a]: b }, function (options) {
      resolve(options);
    });
  });
  const configOut = await p;
}

async function chromeremove(a) {
  var p = new Promise(function (resolve, reject) {
    chrome.storage.sync.remove([a], function (options) {
      resolve(options[a]);
    });
  });
  const configout = await p;
}

/////////////////////////
////////// INIT /////////
/////////////////////////
function default_init() {
  makeHTML();
  document.body.addEventListener("click", bodyClicked);
}

function init() {
  default_init();
  darkmode_init();
  weather_init();
  clock_init();
  search_init();
  icons_show_init();
  link_modify_init();
  anitime_init();
  memo_init();
  // todo_init();
}

init();

export { init as default_init, makeHTML, chromeget, chromeset, chromeremove };
