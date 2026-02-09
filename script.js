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
const effects = document.getElementById("effects");

let current = 0;
let interval = null;
let muted = false;
let themeIndex = 0;
const themes = ["theme-romantic","theme-dark","theme-pastel","theme-neon"];

/* ---------- INIT ---------- */
function buildBars() {
  storyBars.innerHTML = "";
  data.forEach(() => {
    const s = document.createElement("span");
    const bar = document.createElement("div");
    s.appendChild(bar);
    storyBars.appendChild(s);
  });
}

function showStory(i) {
  current = i;
  const item = data[i];

  storyImage.src = item.src;
  overlayText.textContent = item.text;
  animateBar(i);
  animateFX();
}

function animateBar(index) {
  [...storyBars.children].forEach((span, idx) => {
    const bar = span.firstChild;
    bar.style.transition = "none";
    bar.style.width = idx < index ? "100%" : "0%";
  });

  const activeBar = storyBars.children[index].firstChild;
  requestAnimationFrame(() => {
    activeBar.style.transition = "width 4s linear";
    activeBar.style.width = "100%";
  });
}

function next() {
  clearInterval(interval);
  if (current < data.length - 1) {
    showStory(current + 1);
    interval = setInterval(next, 4000);
  } else {
    endStory();
  }
}

function prev() {
  clearInterval(interval);
  if (current > 0) showStory(current - 1);
  interval = setInterval(next, 4000);
}

function endStory() {
  clearInterval(interval);
  finalScreen.classList.remove("hidden");
}

startBtn.onclick = () => {
  if (!data.length) {
    alert("⚠️ Fotoğraf listesi boş!");
    return;
  }
  startScreen.classList.add("hidden");
  player.classList.remove("hidden");
  buildBars();
  showStory(0);
  interval = setInterval(next, 4000);

  bgMusic.volume = 0.35;
  bgMusic.play().catch(()=>{});
};

document.querySelector(".nav.right").onclick = next;
document.querySelector(".nav.left").onclick = prev;

soundToggle.onclick = () => {
  muted = !muted;
  bgMusic.muted = muted;
  soundToggle.textContent = muted ? "🔇" : "🔊";
};

themeToggle.onclick = () => {
  themeIndex = (themeIndex+1) % themes.length;
  document.body.className = themes[themeIndex];
};

replayBtn.onclick = () => {
  finalScreen.classList.add("hidden");
  showStory(0);
  interval = setInterval(next,4000);
};

shareBtn.onclick = () => {
  navigator.share?.({
    title: "Animasyonlu Albüm",
    url: location.href
  }) || alert("Paylaş kopyalayarak!");
};

/* ---------- FX ---------- */
function animateFX() {
  effects.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = "💖";
    el.style.left = Math.random()*90+"%";
    el.style.top = Math.random()*60+"%";
    effects.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}
