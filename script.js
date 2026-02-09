const customerName = "Sevgili Albüm";

const images = window.ALBUM_IMAGES || [];
let current = 0;
let interval;
let isMuted = false;
let themes = ["theme-romantic","theme-pastel","theme-neon","theme-dark"];
let themeIndex = 0;

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const player = document.getElementById("player");
const storyImage = document.getElementById("storyImage");
const overlayText = document.getElementById("overlayText");
const storyBars = document.getElementById("storyBars");
const customerNameEl = document.getElementById("customerName");
const soundToggle = document.getElementById("soundToggle");
const themeToggle = document.getElementById("themeToggle");
const bgMusic = document.getElementById("bgMusic");

customerNameEl.textContent = customerName;
document.getElementById("title").textContent = `${customerName} 📸`;

function buildBars() {
  storyBars.innerHTML = "";
  images.forEach(() => {
    const span = document.createElement("span");
    span.innerHTML = "<div></div>";
    storyBars.appendChild(span);
  });
}

function showStory(i) {
  current = i;
  storyImage.src = images[i];
  overlayText.textContent = `Fotoğraf ${i+1} / ${images.length}`;
  animateBar(i);
}

function animateBar(i) {
  const fill = storyBars.children[i].firstChild;
  fill.style.width = "0";
  setTimeout(() => {
    fill.style.transition = "width 5s linear";
    fill.style.width = "100%";
  }, 20);
}

function next() {
  clearInterval(interval);
  if (current < images.length - 1) showStory(current+1);
  else endStory();
  interval = setInterval(next,5000);
}

function prev() {
  clearInterval(interval);
  if (current > 0) showStory(current-1);
  interval = setInterval(next,5000);
}

function endStory() {
  clearInterval(interval);
  overlayText.textContent = "Son fotoğraf 🎁";
}

startBtn.onclick = () => {
  startScreen.style.display = "none";
  player.classList.remove("hidden");
  buildBars();
  showStory(0);
  interval = setInterval(next,5000);
  bgMusic.play().catch(() => {});
};

document.querySelector(".nav.right").onclick = next;
document.querySelector(".nav.left").onclick = prev;

soundToggle.onclick = () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  soundToggle.textContent = isMuted ? "🔇" : "🔊";
};

themeToggle.onclick = () => {
  themeIndex = (themeIndex+1) % themes.length;
  document.body.className = themes[themeIndex];
};
