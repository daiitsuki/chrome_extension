import { link_modify_on } from "./form.js";
import { makeHTML, chromeget, chromeset } from "./default.js";

async function gotolink(event) {
  const number = event.target.getAttribute("n");
  const NT_URL_N = "New Tab url" + number;
  if (event.target.className === "link_option_IMG noselect") {
  } else {
    const url = await chromeget(NT_URL_N);
    if (url == null) {
      link_modify_on(event);
    } else {
      location.href = url;
    }
  }
}

function loadFavicon(number) {
  const favicon = document.getElementById(`favicon${number}`);
  const NT_URL_N = "New Tab url" + number;
  chrome.storage.sync.get([NT_URL_N], (result) => {
    const url = result[NT_URL_N];
    let favicon_path = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", favicon_path);
    // xhr.setRequestHeader("Access-Control-Allow-Credentials", true);
    xhr.send();

    xhr.onerror = () => {
      // console.log(`${number}번째 URL에 연결할 수 없습니다.`);
      favicon_path = "icons/etc/favicon.png";
      favicon.setAttribute("src", favicon_path);
      favicon.classList.add("undifined");
    };
    if (url == null) {
      favicon_path = "icons/etc/favicon.png";
      favicon.classList.add("undifined");
    }
    favicon.setAttribute("src", favicon_path);
  });
}

function loadTitle(number) {
  const title = document.getElementById(`title${number}`);
  const NT_TITLE_N = "New Tab title" + number;
  chrome.storage.sync.get([NT_TITLE_N], (result) => {
    title.innerText = result[NT_TITLE_N];
  });
}

let link_option_timer;

function link_option_view(event) {
  const number = event.target.getAttribute("n");
  const img = document.getElementById(`LOIMG${number}`);
  link_option_timer = setTimeout(() => {
    img.style.display = "block";
  }, 500);
}

function link_option_not_view(event) {
  const number = event.target.getAttribute("n");
  const img = document.getElementById(`LOIMG${number}`);
  clearTimeout(link_option_timer);
  img.style.display = "none";
}

function init() {
  const icons = 10;
  for (let i = 1; i < icons + 1; i++) {
    const wrapper = document.getElementById(`icon_wrapper${i}`);
    const OPTION = document.getElementById(`LOIMG${i}`);
    const favicon = document.getElementById(`favicon${i}`);
    wrapper.addEventListener("click", gotolink);
    wrapper.addEventListener("contextmenu", link_modify_on);
    wrapper.addEventListener("mouseenter", link_option_view);
    wrapper.addEventListener("mouseleave", link_option_not_view);
    OPTION.addEventListener("click", link_modify_on);
    loadFavicon(i);
    loadTitle(i);
  }
}

export { init as icons_show_init };
