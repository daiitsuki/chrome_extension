import { chromeset, chromeget, chromeremove } from "./default.js";

const searchForm = document.getElementById("searchForm");
const searchBtn = document.getElementById("searchBtn");
const removeBtn = document.getElementById("removeBtn");

function loadIconIMG(n, url) {
  const div = document.getElementById(`searchIcon${n}`);
  const src = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
  div.innerHTML = `<img src=${src} class="searchIconIMG noselect" id="searchIconIMG${n}"/>`;
}

async function mainSearchEngineSet(number) {
  const url = await chromeget(number);
  chromeset("searchEngine", url);
  engineBorder();
}

async function search(query) {
  if (query == "") {
    alert(
      "검색어를 1자 이상 입력하세요. \n사이트 이동은 아이콘 우클릭으로 가능합니다."
    );
  } else {
    const url = await chromeget("searchEngine", "https://www.naver.com");
    if (url == "https://www.naver.com") {
      let searchURL = `https://search.naver.com/search.naver?query=${query}`;
      location.href = searchURL;
    }
    if (url == "https://papago.naver.com") {
      let searchURL = `https://papago.naver.com/?sk=auto&tk=ko&st=${query}`;
      location.href = searchURL;
    }
    if (url == "https://www.youtube.com") {
      let searchURL = `https://www.youtube.com/results?search_query=${query}`;
      location.href = searchURL;
    }
    if (url == "https://namu.wiki") {
      let searchURL = `https://namu.wiki/w/${query}`;
      location.href = searchURL;
    }
  }
}

async function defaultEngineSet() {
  const url1 = await chromeget("search1");
  const url2 = await chromeget("search2");
  const url3 = await chromeget("search3");
  const url4 = await chromeget("search4");
  if (url1[0] === null) {
    chromeset("search1", "https://www.naver.com");
  }
  if (url2[0] === null) {
    chromeset("search2", "https://papago.naver.com");
  }
  if (url3[0] === null) {
    chromeset("search3", "https://www.youtube.com");
  }
  if (url4[0] === null) {
    chromeset("search4", "https://namu.wiki");
  }
}

// mainsearchengine => bordersetting
async function engineBorder() {
  const searchEngine = await chromeget("searchEngine", "https://www.naver.com");
  const searchForm = document.getElementById("searchForm");
  const img1 = document.getElementById(`searchIconIMG1`);
  const img2 = document.getElementById(`searchIconIMG2`);
  const img3 = document.getElementById(`searchIconIMG3`);
  const img4 = document.getElementById(`searchIconIMG4`);
  img1.style = "2px solid rgba(0, 0, 0, 0.2);";
  img2.style = "2px solid rgba(0, 0, 0, 0.2);";
  img3.style = "2px solid rgba(0, 0, 0, 0.2);";
  img4.style = "2px solid rgba(0, 0, 0, 0.2);";
  searchForm.placeholder = "검색어를 입력하세요.";
  if (searchEngine == "https://www.naver.com") {
    img1.style = "  border: 2px solid rgb(90, 70, 238);";
    searchForm.placeholder = "검색어를 입력하세요. (검색엔진: 네이버)";
  }
  if (searchEngine == "https://papago.naver.com") {
    img2.style = "  border: 2px solid rgb(90, 70, 238);";
    searchForm.placeholder = "검색어를 입력하세요. (검색엔진: 파파고 번역)";
  }
  if (searchEngine == "https://www.youtube.com") {
    img3.style = "  border: 2px solid rgb(90, 70, 238);";
    searchForm.placeholder = "검색어를 입력하세요. (검색엔진: 유튜브)";
  }
  if (searchEngine == "https://namu.wiki") {
    img4.style = "  border: 2px solid rgb(90, 70, 238);";
    searchForm.placeholder = "검색어를 입력하세요. (검색엔진: 나무위키)";
  }
}

async function goLink(i, event) {
  const searchForm = document.getElementById("searchForm");
  searchForm.placeholder = "사이트 연결 중입니다.";

  event.preventDefault();
  const url = await chromeget(`search${i}`);
  location.href = url;
}

async function init() {
  await defaultEngineSet();
  for (let i = 1; i < 5; i++) {
    const searchI = `search${i}`;
    if (i == 1) {
      const url = await chromeget(searchI);
      loadIconIMG(i, url);
    }
    if (i == 2) {
      const url = await chromeget(searchI);
      loadIconIMG(i, url);
    }
    if (i == 3) {
      const url = await chromeget(searchI);
      loadIconIMG(i, url);
    }
    if (i == 4) {
      const url = await chromeget(searchI);
      loadIconIMG(i, url);
    }
    const img = document.getElementById(`searchIconIMG${i}`);
    img.addEventListener("click", () => {
      mainSearchEngineSet(`search${i}`);
    });
    img.addEventListener("contextmenu", (event) => {
      goLink(i, event);
    });
  }

  engineBorder();

  searchForm.select();

  searchForm.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const input = searchForm.value;
      search(input);
    }
  });

  searchBtn.addEventListener("click", (event) => {
    const input = searchForm.value;
    search(input);
  });

  // 실험용 기능 [search 관련 chromedata 지우기]
  removeBtn.addEventListener("click", async () => {
    chrome.storage.sync.remove("search1");
    chrome.storage.sync.remove("search2");
    chrome.storage.sync.remove("search3");
    chrome.storage.sync.remove("search4");
    chrome.storage.sync.remove("searchEngine");
    const aa = await chromeget("search1");
    console.log(aa);
  });
}

export { init as search_init };
