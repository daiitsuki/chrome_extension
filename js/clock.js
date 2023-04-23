function time() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let yoil = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let sec = date.getSeconds();
  const yoilKR = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
  };
  const ampm = `${hours >= 12 ? "PM" : "AM"}`;
  hours = `${hours > 12 ? hours - 12 : hours}`;
  hours = `${hours < 10 ? "0" + `${hours}` : hours}`;
  hours = `${hours === "00" ? 12 : hours}`;
  minutes = `${minutes < 10 ? "0" + `${minutes}` : minutes}`;
  sec = `${sec < 10 ? "0" + `${sec}` : sec}`;
  yoil = yoilKR[yoil];
  return {
    month: month,
    day: day,
    yoil: yoil,
    hours: hours,
    minutes: minutes,
    ampm: ampm,
    sec: sec,
  };
}

function clock() {
  const hourform = document.getElementById("hour");
  const minuteform = document.getElementById("minute");
  const dateform = document.getElementById("time_date_form");
  // const ampmform = document.getElementById("ampm");
  // const secform = document.getElementById("second");
  hourform.innerHTML = time().hours;
  minuteform.innerHTML = time().minutes;
  dateform.innerHTML = `${time().month}월 ${time().day}일 ${time().yoil}요일`;
  // ampmform.innerHTML = time().ampm;
  // secform.innerHTML = time().sec;
}

function init() {
  clock();
  setInterval(clock, 1000);
}

export { init as clock_init };
