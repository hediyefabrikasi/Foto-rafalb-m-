const data = window.ALBUM_DATA || [];

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const player = document.getElementById("player");
const storyImage = document.getElementById("storyImage");
const overlayText = document.getElementById("overlayText");
const storyBars = document.getElementById("storyBars");
const soundToggle = document.getElementById("soundToggle");
const themeToggle = document.getElementById("themeToggle");
const bgMusic = document.getElementById("bgMusic");
const finalScreen = document.getElementById("finalScreen");
const replayBtn = document.getElementById("replayBtn");
const shareBtn = document.getElementById("shareBtn");
const sparkles = document.getElementById("sparkles");

let current = 0;
let interval = null;
let muted = false;
let themeIndex = 0;
const themes = ["theme-romantic", "theme-dark", "theme-pastel", "theme-neon"];

/* ---------- INIT ---------- */
function init() {
  if (!data.length) {
    alert("manifest.js boş veya yüklenemedi!");
    return;
  }
  buildBars();
}

/* ---------- STORY BARS ---------- */
function buildBars() {
  storyBars.innerHTML = "";
  data.forEach(() => {
    const span = document.createElement("span");
    const inner = document.createElement("div");
    span.appendChild(inner);
    storyBars.appendChild(span);
  });
}

/* ---------- SHOW STORY ---------- */
function showStory(i) {
  current = i;
  const item = data[i];
  storyImage.src = item.src;
  overlayText.textContent = item.text || "";
  animateBar(i);
  sparkleBurst();
}

/* ---------- BAR ANIMATION ---------- */
function animateBar(i) {
  [...storyBars.children].forEach((bar, idx) => {
    bar.firstChild.style.transition = "none";
    bar.firstChild.style.width = idx < i ? "100%" : "0%";
  });

  const bar = storyBars.children[i].firstChild;
  requestAnimationFrame(() => {
    bar.style.transition = "width 4.5s linear";
    bar.style.width = "100%";
  });
}

/* ---------- NAV ---------- */
function next() {
  clearInterval(interval);
  if (current < data.length - 1) {
    showStory(current + 1);
    interval = setInterval(next, 4500);
  } else {
    endStory();
  }
}

function prev() {
  clearInterval(interval);
  if (current > 0) showStory(current - 1);
  interval = setInterval(next, 4500);
}

/* ---------- FINAL ---------- */
function endStory() {
  clearInterval(interval);
  finalScreen.classList.remove("hidden");
}

/* ---------- START ---------- */
startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  player.classList.remove("hidden");
  showStory(0);
  interval = setInterval(next, 4500);
  bgMusic.volume = 0.4;
  bgMusic.play().catch(()=>{});
};

/* ---------- REPLAY ---------- */
replayBtn.onclick = () => {
  finalScreen.classList.add("hidden");
  showStory(0);
  interval = setInterval(next, 4500);
};

/* ---------- SHARE ---------- */
shareBtn.onclick = () => {
  navigator.share?.({
    title: "💖 Dijital Albüm",
    text: "Benim için hazırlanmış albüme bak 💌",
    url: location.href
  }) || alert("Paylaşım desteklenmiyor.");
};

/* ---------- SOUND ---------- */
soundToggle.onclick = () => {
  muted = !muted;
  bgMusic.muted = muted;
  soundToggle.textContent = muted ? "🔇" : "🔊";
};

/* ---------- THEME ---------- */
themeToggle.onclick = () => {
  themeIndex = (themeIndex + 1) % themes.length;
  document.body.className = themes[themeIndex];
};

/* ---------- CLICK AREAS ---------- */
document.querySelector(".nav.right").onclick = next;
document.querySelector(".nav.left").onclick = prev;

/* ---------- SPARKLES ---------- */
function sparkleBurst() {
  for (let i = 0; i < 5; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.textContent = "✨";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = 40 + Math.random() * 30 + "%";
    sparkles.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }
}

init();
