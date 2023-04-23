const btn = document.getElementById("ani_toggle_btn");

function toggle() {
  const frame = document.getElementById("ani_time_frame");
  if (frame.innerHTML == "") {
    frame.innerHTML = `
    <iframe
        class="anitime"
        id="anitime"
        style="display:block"
        src="https://anissia.net/schedule/2015#ffffff5987b6fffffff2f2f2497ba79cb3c7ffffffffffff555555f8f8f82474cecb3434ffffff000000777777111111777777111111c3b443070707999999000000cccccc3a7da3"
        width="400"
        height="500"
        frameborder="0"
      ></iframe>
    `;
  } else {
    const anitime = document.getElementById("anitime");
    if (anitime.style.display == "block") {
      anitime.style.display = "none";
    } else {
      anitime.style.display = "block";
    }
  }
}

function init() {
  btn.addEventListener("click", toggle);
}

export { init as anitime_init };
