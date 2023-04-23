import { chromeget, chromeset, chromeremove } from "./default.js";

const toggleBtn = document.getElementById("memoToggleBtn");
const memoDisplay = document.getElementById("memo_display");
const memoInput = document.getElementById("memo_input");
const memoInputBtn = document.getElementById("memo_input_btn");

function toggle() {
  memoDisplay.classList.toggle("none");
}

async function saveMemo() {
  const text = memoInput.value;
  const max = await maxMemo();
  memoInput.value = "";

  await chromeset(`memo${max + 1}`, text);
  makeHTML();
  memoInit();
}

async function loadMemo() {
  const max = await maxMemo();
  for (let i = 1; i < max + 1; i++) {
    const memo_content = document.getElementById(`memo_content${i}`);
    const text = await chromeget(`memo${i}`);
    memo_content.innerHTML = text;
  }
}

async function removeMemo(event) {
  event.preventDefault();
  const n = Number(event.target.getAttribute("n"));

  const max = await maxMemo();

  for (let i = n; i < max; i++) {
    const next = await chromeget(`memo${i + 1}`);
    chromeset(`memo${i}`, next);
  }
  chromeremove(`memo${max}`);

  makeHTML();
  memoInit();
}

async function maxMemo() {
  let max = 0;
  for (let i = 1; i < 10; i++) {
    const content = await chromeget(`memo${i}`);
    if (content == null) {
      break;
    } else {
      max = i;
      continue;
    }
  }
  return max;
}

async function makeHTML() {
  const container = document.getElementById("memo_content_container");
  const max = await maxMemo();
  let HTML = "";
  for (let i = 1; i < max + 1; i++) {
    HTML =
      HTML + `<div class="memo_content" id="memo_content${i}" n="${i}"></div>`;
  }

  container.innerHTML = HTML;

  loadMemo();
}

async function memoInit() {
  const max = await maxMemo();
  for (let i = 1; i < max + 1; i++) {
    const memoContent = document.getElementById(`memo_content${i}`);
    memoContent.addEventListener("contextmenu", removeMemo);
  }
}

async function init() {
  toggleBtn.addEventListener("click", toggle);
  memoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      saveMemo();
    }
  });
  memoInputBtn.addEventListener("click", saveMemo);

  makeHTML();

  const max = await maxMemo();
  for (let i = 1; i < max + 1; i++) {
    const memoContent = document.getElementById(`memo_content${i}`);
    memoContent.addEventListener("contextmenu", removeMemo);
  }
}

export { init as memo_init };
