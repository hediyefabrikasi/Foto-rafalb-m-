/* =======================
   CONFIG
======================= */

const customerName = "Sevgilim 💖";
const autoDuration = 5000; // ms
const themes = ["theme-romantic","theme-pastel","theme-neon","theme-dark"];

/* =======================
   ELEMENTS
======================= */

const data = window.ALBUM_DATA || [];

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const player = document.getElementById("player");
const storyImage = document.getElementById("storyImage");
const overlayText = document.getElementById("overlayText");
const overlayFX = document.getElementById("overlayFX");
const storyBars = document.getElementById("storyBars");
const customerNameEl = document.getElementById("customerName");
const soundToggle = document.getElementById("soundToggle");
const themeToggle = document.getElementById("themeToggle");
const bgMusic = document.getElementById("bgMusic");

const finalScreen = document.getElementById("finalScreen");
const replayBtn = document.getElementById("replayBtn");
const shareBtn = document.getElementById("shareBtn");

/* =======================
   STATE
======================= */

let current = 0;
let interval = null;
let isMuted = false;
let themeIndex = 0;

/* =======================
   INIT
======================= */

customerNameEl.textContent = customerName;
document.getElementById("albumTitle").textContent = customerName;

/* =======================
   BUILD UI
======================= */

function buildBars() {
  storyBars.innerHTML = "";
  data.forEach(() => {
    const span = document.createElement("span");
    const fill = document.createElement("div");
    span.appendChild(fill);
    storyBars.appendChild(span);
  });
}

function resetBars() {
  [...storyBars.children].forEach(bar => {
    bar.classList.remove("active");
    bar.firstChild.style.transition = "none";
    bar.firstChild.style.width = "0%";
  });
}

/* =======================
   STORY ENGINE
======================= */

function showStory(index) {
  current = index;
  const item = data[index];

  storyImage.src = item.src;
  overlayText.textContent = item.text || "";

  resetBars();
  const bar = storyBars.children[index];
  bar.classList.add("active");

  animateBar(bar.firstChild);
  spawnFX();
}

function animateBar(el) {
  el.style.transition = "none";
  el.style.width = "0%";
  requestAnimationFrame(() => {
    el.style.transition = `width ${autoDuration}ms linear`;
    el.style.width = "100%";
  });
}

function next() {
  clearInterval(interval);
  if (current < data.length - 1) {
    showStory(current + 1);
    interval = setInterval(next, autoDuration);
  } else {
    endStory();
  }
}

function prev() {
  clearInterval(interval);
  if (current > 0) {
    showStory(current - 1);
    interval = setInterval(next, autoDuration);
  }
}

function startStory() {
  buildBars();
  showStory(0);
  interval = setInterval(next, autoDuration);
  bgMusic.play().catch(()=>{});
}

function endStory() {
  clearInterval(interval);
  finalScreen.classList.remove("hidden");
}

/* =======================
   FX SYSTEM
======================= */

function spawnFX() {
  overlayFX.innerHTML = "";

  const count = 6 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    if (Math.random() > 0.5) spawnHeart();
    else spawnSparkle();
  }
}

function spawnHeart() {
  const el = document.createElement("div");
  el.className = "heart";
  el.textContent = "💖";
  el.style.left = Math.random() * 90 + "%";
  el.style.bottom = Math.random() * 20 + "%";
  overlayFX.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

function spawnSparkle() {
  const el = document.createElement("div");
  el.className = "sparkle";
  el.style.left = Math.random() * 100 + "%";
  el.style.top = Math.random() * 100 + "%";
  overlayFX.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

/* =======================
   EVENTS
======================= */

startBtn.onclick = () => {
  startScreen.style.display = "none";
  player.classList.remove("hidden");
  startStory();
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
  document.body.className = themes[themeIndex];
};

replayBtn.onclick = () => {
  finalScreen.classList.add("hidden");
  startStory();
};

shareBtn.onclick = async () => {
  if (navigator.share) {
    await navigator.share({
      title: "Animasyonlu Albüm",
      url: window.location.href
    });
  } else {
    alert("Linki kopyalayarak paylaşabilirsiniz 💖");
  }
};
