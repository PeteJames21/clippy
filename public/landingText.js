// public/landingText.js


const headings = [
  "Get More Done",
  "Achieve Your Goals",
  "Master Your Time"
];
let index = 0;

function changeHeading() {
  const changingHeading = document.getElementById('changing-heading');
  changingHeading.style.opacity = 0;
  setTimeout(() => {
      changingHeading.textContent = headings[index];
      changingHeading.style.opacity = 1;
      index = (index + 1) % headings.length;
  }, 500);
}

setInterval(changeHeading, 3000);
