const dDay = document.getElementById("dDay");
const date = new Date();
const standard = new Date(2023, 5, 4);
const diffDays = Math.ceil(Math.abs(standard - date) / (1000 * 60 * 60 * 24));

const toggleBtn = document.getElementById("dDayToggleBtn");

const dDayOnOffDisplay = () => {
  if (localStorage.getItem("dDay") === "on") {
    dDay.className = "";
  } else {
    dDay.className = "none";
  }
};

const init = () => {
  dDay.innerHTML = `D + ${diffDays} 💕`;
  if (!localStorage.getItem("dDay")) {
    localStorage.setItem("dDay", "on");
  }
  dDayOnOffDisplay();

  toggleBtn.addEventListener("click", () => {
    const state = localStorage.getItem("dDay");
    if (state === "on") {
      localStorage.setItem("dDay", "off");
    } else {
      localStorage.setItem("dDay", "on");
    }
    dDayOnOffDisplay();
  });
};

export { init as calendar_init };
