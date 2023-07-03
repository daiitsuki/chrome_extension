const dDay = document.getElementById("dDay");
const date = new Date();
const standard = new Date(2023, 5, 4);

const diffDays = Math.ceil(Math.abs(standard - date) / (1000 * 60 * 60 * 24));
console.log(diffDays);

dDay.innerHTML = `D + ${diffDays} 💕`;
