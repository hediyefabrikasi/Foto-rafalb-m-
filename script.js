/* =====================
   CONFIG (EDIT HERE)
===================== */

const customerName = "Ayşe ❤️ Mehmet";
const captions = []; // Boş bırakabilirsin, otomatik çalışır

/* ===================== */

const images = window.ALBUM_IMAGES || [];

let current = 0;
let interval;
let isMuted = false;
let themes = ["romantic", "pastel", "neon", "dark"];
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
document.getElementById("title").textContent = customerName + "’in Hikayesi";

function buildBars() {
  storyBars.innerHTML = "";
  images.forEach(() => {
    const span = document.createElement("span");
    const fill = document.createElement("div");
    fill.className = "bar-fill";
    span.appendChild(fill);
    storyBars.appendChild(span);
  });
}

function showStory(index) {
  current = index;
  storyImage.src = images[current];
  overlayText.textContent = captions[current] || "";
  overlayText.classList.add("show");
  setTimeout(() => overlayText.classList.remove("show"), 1600);
  animateBars();
}

function animateBars() {
  [...storyBars.children].forEach((bar, i) => {
    const fill = bar.firstChild;
    fill.style.width = i < current ? "100%" : "0%";
    fill.style.transition = "none";
  });

  const activeFill = storyBars.children[current].firstChild;
  activeFill.style.transition = "width 6s linear";
  requestAnimationFrame(() => activeFill.style.width = "100%");
}

function next() {
  heartBurst();
  if (current < images.length - 1) {
    showStory(current + 1);
    restartInterval();
  } else {
    endStory();
  }
}

function prev() {
  if (current > 0) {
    showStory(current - 1);
    restartInterval();
  }
}

function restartInterval() {
  clearInterval(interval);
  interval = setInterval(next, 6000);
}

function heartBurst() {
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.bottom = "40px";
    heart.style.fontSize = 16 + Math.random() * 12 + "px";
    document.getElementById("storyArea").appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }
}

function endStory() {
  clearInterval(interval);
  overlayText.textContent = "Hikayemiz burada bitmedi... ❤️";
  overlayText.classList.add("show");
}

startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  player.classList.remove("hidden");
  buildBars();
  showStory(0);
  interval = setInterval(next, 6000);
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
  themeIndex = (themeIndex + 1) % themes.length;
  document.body.className = "theme-" + themes[themeIndex];
};
