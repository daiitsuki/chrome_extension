import { icons_show_init } from "./icons.js";
import { makeHTML, chromeget, chromeset } from "./default.js";

function link_modify_on(event) {
  event.preventDefault();
  const number = event.target.getAttribute("n");
  const container = document.getElementById("link_modify_container");
  const wrapper = document.getElementById(`icon_wrapper${number}`);
  const link_input = document.getElementById("link_input");
  const name_input = document.getElementById("name_input");
  const link_input_btn = document.getElementById("link_input_btn");
  const name_input_btn = document.getElementById("name_input_btn");
  link_input.setAttribute("n", number);
  link_input_btn.setAttribute("n", number);
  name_input.setAttribute("n", number);
  name_input_btn.setAttribute("n", number);
  container.classList.toggle("fade_in");
  inputText(number);
  nameText(number);
}

function link_modify_exit() {
  const container = document.getElementById("link_modify_container");
  const info = document.getElementById("link_modify_info");
  container.classList.toggle("fade_in");
  info.innerText = "";
  const force_btn = document.getElementById("forcedInputBtn");
  force_btn.style = "display:none";
}

async function inputText(number) {
  const input = document.getElementById("link_input");
  const NT_URL_N = "New Tab url" + number;
  const text = await chromeget(NT_URL_N);
  if (text == undefined) {
    input.value = "";
  } else {
    input.value = text;
  }
  input.select();
}

async function nameText(number) {
  const name = document.getElementById("name_input");
  const NT_TITLE_N = "New Tab title" + number;
  const text = await chromeget(NT_TITLE_N);

  if (text == undefined) {
    name.value = "";
  } else {
    name.value = text;
  }
}

function errorLink() {
  const input = document.getElementById("link_input");
  const info = document.getElementById("link_modify_info");
  const force_btn = document.getElementById("forcedInputBtn");
  info.innerText = "URL이 유효하지 않습니다.";
  input.select();
  force_btn.style = "display: block";
}

async function forcedSaveLink() {
  const input = document.getElementById("link_input");
  const number = input.getAttribute("n");
  let url = input.value;
  let NEWurl = "";
  const NT_URL_N = "New Tab url" + number;
  const NT_TITLE_N = "New Tab title" + number;

  if (!url.includes("http://") && !url.includes("https://")) {
    NEWurl = "https://" + url;
  }
  chromeset(NT_URL_N, NEWurl);
  chromeset(NT_TITLE_N, url);

  link_modify_exit();
  icons_show_init();
}

function saveLink() {
  const input = document.getElementById("link_input");
  const info = document.getElementById("link_modify_info");
  const number = Number(input.getAttribute("n"));
  let url = input.value;
  const NT_URL_N = "New Tab url" + number;
  const NT_TITLE_N = "New Tab title" + number;
  info.innerText = "URL 유효성 검사중";

  if (url === "") {
    errorLink();
  } else {
    if (!url.includes("http://") && !url.includes("https://")) {
      url = "https://" + url;
    }
    fetch(url)
      .then((res) => {
        res.text().then((text) => {
          if (text.includes("<title>")) {
            const titleText = text.split("<title>")[1].split("</title>")[0];
            chromeset(NT_URL_N, url);
            chromeset(NT_TITLE_N, titleText);
            info.innerText = "completed";
            link_modify_exit();
            icons_show_init();
            info.innerText = "";
          } else {
            errorLink();
          }
        });
      })
      .catch(() => {
        errorLink();
      });
  }
}

function deleteLink() {
  const input = document.getElementById("link_input");
  const number = input.getAttribute("n");
  const NT_URL_N = "New Tab url" + number;
  const NT_TITLE_N = "New Tab title" + number;
  chrome.storage.sync.remove([NT_URL_N, NT_TITLE_N]);
  link_modify_exit();
  icons_show_init();
}

function saveName() {
  const name = document.getElementById("name_input");
  const info = document.getElementById("link_modify_info");
  const number = name.getAttribute("n");
  let text = name.value;
  const NT_TITLE_N = "New Tab title" + number;
  if (text === "") {
    info.innerText = "1자 이상 입력하세요.";
  } else {
    chromeset(NT_TITLE_N, text);
    link_modify_exit();
    icons_show_init();
  }
}

async function orderUp() {
  const input = document.getElementById("link_input");
  const info = document.getElementById("link_modify_info");
  let number = Number(input.getAttribute("n"));
  let number_1 = number - 1;

  let nturl = "New Tab url" + number;
  let nttitle = "New Tab title" + number;
  let nturl_1 = "New Tab url" + number_1;
  let nttitle_1 = "New Tab title" + number_1;

  if (number === 1) {
    info.innerText = "더이상 이동할 수 없습니다.";
  } else {
    const url = await chromeget(nturl);
    const name = await chromeget(nttitle);
    const newUrl = await chromeget(nturl_1);
    const newName = await chromeget(nttitle_1);

    chromeset(nturl, newUrl);
    chromeset(nttitle, newName);
    chromeset(nturl_1, url);
    chromeset(nttitle_1, name);

    await new Promise((resolve, reject) => setTimeout(resolve, 100));
    info.innerText = "completed";
    // link_modify_exit();
    input.setAttribute("n", number_1);
    makeHTML();
    icons_show_init();
    info.innerText = "";
  }
}

async function orderDown() {
  const input = document.getElementById("link_input");
  const info = document.getElementById("link_modify_info");
  let number = Number(input.getAttribute("n"));
  let number_1 = number + 1;

  let nturl = "New Tab url" + number;
  let nttitle = "New Tab title" + number;
  let nturl_1 = "New Tab url" + number_1;
  let nttitle_1 = "New Tab title" + number_1;

  if (number === 10) {
    info.innerText = "더이상 이동할 수 없습니다.";
  } else {
    const url = await chromeget(nturl);
    const name = await chromeget(nttitle);
    const newUrl = await chromeget(nturl_1);
    const newName = await chromeget(nttitle_1);

    chromeset(nturl, newUrl);
    chromeset(nttitle, newName);
    chromeset(nturl_1, url);
    chromeset(nttitle_1, name);

    await new Promise((resolve, reject) => setTimeout(resolve, 100));
    info.innerText = "completed";
    // link_modify_exit();
    input.setAttribute("n", number_1);
    makeHTML();
    icons_show_init();
    info.innerText = "";
  }
}

function init() {
  const modify_container = document.getElementById("link_modify_container");
  modify_container.addEventListener("click", (event) => {
    if (event.target === modify_container) {
      link_modify_exit();
    }
  });
  const input_btn = document.getElementById("link_input_btn");
  const delete_btn = document.getElementById("link_delete_btn");
  const name_btn = document.getElementById("name_input_btn");
  const input = document.getElementById("link_input");
  const name = document.getElementById("name_input");
  const force_btn = document.getElementById("forcedInputBtn");
  const up_btn = document.getElementById("order_up_btn");
  const down_btn = document.getElementById("order_down_btn");

  input_btn.addEventListener("click", saveLink);
  delete_btn.addEventListener("click", deleteLink);
  name_btn.addEventListener("click", saveName);
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      saveLink();
    }
  });
  name.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      saveName();
    }
  });
  force_btn.style = "display:none";
  force_btn.addEventListener("click", forcedSaveLink);

  up_btn.addEventListener("click", orderUp);
  down_btn.addEventListener("click", orderDown);
}

export { init as link_modify_init, link_modify_on, link_modify_exit };
