/* =====================
   CONFIG (EDIT HERE)
===================== */

const customerName = "Ayşe ❤️ Mehmet";

const images = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
  "images/7.jpg"
];

const captions = [
  "İlk günkü gibi ❤️",
  "Bu anı asla unutamam 🥹",
  "En güzel gülüşün 😍",
  "Sen benim mucizemsin ✨",
  "Sen benim mucizemsin ✨",
  "Sen benim mucizemsin ✨",
  "Hikayemizin en güzel karesi 💖"
];

/* ===================== */

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
    storyBars.appendChild(span);
  });
}

function updateBars() {
  [...storyBars.children].forEach((bar, i) => {
    bar.style.setProperty("--progress", "0%");
    bar.querySelector("::after");
    bar.classList.remove("active");
    bar.querySelector?.("::after");
    if (i < current) {
      bar.style.setProperty("--width", "100%");
      bar.style.setProperty("--progress", "100%");
      bar.style.setProperty("background", "var(--accent)");
      bar.firstChild?.style?.setProperty("width", "100%");
    }
  });

  const active = storyBars.children[current];
  if (active) {
    active.querySelector?.("::after");
  }
}

function fillBar(index) {
  const bar = storyBars.children[index];
  const inner = bar.querySelector("::after");
}

function showStory(index) {
  current = index;
  storyImage.src = images[current];
  overlayText.textContent = captions[current] || "";
  overlayText.classList.add("show");
  setTimeout(() => overlayText.classList.remove("show"), 1800);

  animateBars();
}

function animateBars() {
  [...storyBars.children].forEach((bar, i) => {
    bar.innerHTML = "";
    const fill = document.createElement("div");
    fill.style.height = "100%";
    fill.style.width = i < current ? "100%" : "0%";
    fill.style.background = "var(--accent)";
    fill.style.borderRadius = "999px";
    fill.style.transition = "width linear";
    bar.appendChild(fill);
  });

  const activeFill = storyBars.children[current].firstChild;
  activeFill.style.transitionDuration = "6s";
  setTimeout(() => activeFill.style.width = "100%", 20);
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
