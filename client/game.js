const STATIC = typeof io === "undefined";
const socket = STATIC ? { id: "offline", connected: false, on() {}, emit() {} } : io({ transports: ["websocket"] });

const DEFAULT_THEME = { floor: "#1d232d", grid: "#2a323e", wall: "#3d4654", wallBorder: "#5a6578", border: "#79828f" };

const STATIC_MAPS = [
  {
    name: "SİMETRİK",
    theme: { floor: "#1d232d", grid: "#2a323e", wall: "#3d4654", wallBorder: "#5a6578", border: "#79828f" },
    walls: [
      [900, 60, 400, 70], [900, 1170, 400, 70], [330, 320, 110, 280],
      [1760, 320, 110, 280], [1040, 565, 120, 170], [610, 500, 110, 110],
      [1480, 500, 110, 110], [140, 520, 100, 100], [1960, 520, 100, 100],
      [140, 940, 280, 70], [1780, 940, 280, 70]
    ],
    spawns: [
      [100, 100], [2100, 100], [100, 1200], [2100, 1200],
      [1100, 250], [1100, 1050], [100, 780], [2100, 780]
    ]
  },
  {
    name: "KAPALI",
    theme: { floor: "#12222a", grid: "#1c3340", wall: "#1f4a52", wallBorder: "#2f6f7a", border: "#4a94a0" },
    walls: [
      [900, 60, 400, 70], [900, 1170, 400, 70], [330, 320, 110, 280],
      [1760, 320, 110, 280], [1040, 565, 120, 170], [560, 200, 90, 90],
      [1550, 200, 90, 90], [560, 1010, 90, 90], [1550, 1010, 90, 90],
      [140, 520, 100, 260], [1960, 520, 100, 260], [140, 940, 280, 70],
      [1780, 940, 280, 70]
    ],
    spawns: [
      [100, 100], [2100, 100], [100, 1200], [2100, 1200],
      [1100, 250], [1100, 1050], [420, 650], [1780, 650]
    ]
  },
  {
    name: "AÇIK",
    theme: { floor: "#241d14", grid: "#33291b", wall: "#4a3a22", wallBorder: "#6b5532", border: "#9a7f4a" },
    walls: [
      [900, 60, 400, 70], [900, 1170, 400, 70], [1040, 565, 120, 170],
      [330, 420, 110, 460], [1760, 420, 110, 460]
    ],
    spawns: [
      [100, 100], [2100, 100], [100, 1200], [2100, 1200],
      [1100, 250], [1100, 1050], [100, 780], [2100, 780]
    ]
  },
  {
    name: "NEON",
    theme: { floor: "#14121f", grid: "#241f3a", wall: "#3a2a6b", wallBorder: "#7a4ae0", border: "#c06bff" },
    walls: [
      [600, 140, 200, 80], [1400, 140, 200, 80],
      [900, 380, 400, 60],
      [480, 700, 140, 140], [1580, 700, 140, 140],
      [900, 700, 200, 120],
      [300, 900, 240, 70], [1660, 900, 240, 70],
      [900, 1140, 300, 70]
    ],
    spawns: [
      [100, 100], [2100, 100], [100, 1200], [2100, 1200],
      [1100, 280], [1100, 1000], [380, 600], [1820, 600]
    ]
  },
  {
    name: "ORMAN",
    theme: { floor: "#14201a", grid: "#1f3324", wall: "#2a4a2f", wallBorder: "#3f6b45", border: "#5f9a68" },
    walls: [
      [380, 180, 90, 90], [1730, 180, 90, 90], [1100, 220, 90, 90],
      [380, 930, 90, 90], [1730, 930, 90, 90], [1100, 970, 90, 90],
      [180, 540, 90, 90], [1930, 540, 90, 90], [1050, 500, 200, 200]
    ],
    spawns: [
      [100, 100], [2100, 100], [100, 1200], [2100, 1200],
      [600, 330], [1600, 330], [600, 970], [1600, 970]
    ]
  },
  {
    name: "CEHENNEM",
    theme: { floor: "#2a1410", grid: "#3a1c14", wall: "#5a1f18", wallBorder: "#b03a28", border: "#e0553a" },
    walls: [
      [500, 150, 180, 80], [1520, 150, 180, 80],
      [900, 120, 400, 60],
      [300, 400, 140, 140], [1760, 400, 140, 140],
      [900, 450, 400, 60],
      [900, 700, 200, 160],
      [300, 950, 240, 70], [1660, 950, 240, 70],
      [900, 1130, 400, 60]
    ],
    spawns: [
      [100, 100], [2100, 100], [100, 1200], [2100, 1200],
      [1100, 300], [1100, 1000], [380, 620], [1820, 620]
    ]
  },
  {
    name: "BUZ",
    theme: { floor: "#101826", grid: "#16263a", wall: "#1e3a56", wallBorder: "#2e6b96", border: "#5aa0c8" },
    walls: [
      [400, 180, 100, 100], [1700, 180, 100, 100],
      [1100, 220, 100, 100],
      [400, 950, 100, 100], [1700, 950, 100, 100],
      [1100, 980, 100, 100],
      [200, 550, 100, 100], [1900, 550, 100, 100],
      [900, 500, 400, 60],
      [900, 740, 400, 60]
    ],
    spawns: [
      [100, 100], [2100, 100], [100, 1200], [2100, 1200],
      [600, 330], [1600, 330], [600, 970], [1600, 970]
    ]
  }
];

// ---------------- sabitler ----------------
const SKINS = [
  { name: "Buz", body: "#e8edf2", border: "#ffffff", cost: 0 },
  { name: "Kızıl", body: "#c73e43", border: "#e5484d", cost: 0 },
  { name: "Orman", body: "#3d9a4e", border: "#46a758", cost: 0 },
  { name: "Gök", body: "#3488bf", border: "#3e9ed6", cost: 0 },
  { name: "Limon", body: "#d9b522", border: "#e7c127", cost: 5 },
  { name: "Menekşe", body: "#7b5ecb", border: "#8e6fd8", cost: 10 },
  { name: "Gül", body: "#d1569a", border: "#e067a8", cost: 15 },
  { name: "Ateş", body: "#dc7d24", border: "#ec8b2f", cost: 20 },
  { name: "Gece", body: "#262b33", border: "#4d5563", cost: 30 },
  { name: "Altın", body: "#c9a53a", border: "#f0cd6b", cost: 50 }
];

const FIRE_MS = 160;
const RELOAD_MS = 1100;
const SWAP_MS = 600;
const WEAPONS = [
  { id: 0, name: "TABANCA", mag: 8, dmg: 24, falloff: 0.15, pellets: 1, spread: 0, speed: 850, range: 520, fireMs: 160, reloadMs: 1100 },
  { id: 1, name: "POMPALI", mag: 4, dmg: 16, falloff: 0.7, pellets: 6, spread: 0.2, speed: 700, range: 340, fireMs: 750, reloadMs: 1400 },
  { id: 2, name: "BAZUKA", mag: 1, dmg: 65, falloff: 0, pellets: 1, spread: 0, speed: 520, range: 700, fireMs: 1100, reloadMs: 1800, splash: 130 }
];
const DUR_OPTS = [
  { label: "2DK", s: 120 },
  { label: "5DK", s: 300 },
  { label: "8DK", s: 480 },
  { label: "SÜRESİZ", s: 0 }
];
const LIMIT_OPTS = [
  { label: "10", v: 10 },
  { label: "20", v: 20 },
  { label: "30", v: 30 },
  { label: "YOK", v: 0 }
];
const DIFFS = [
  { name: "KOLAY", speed: 165, reactMin: 550, reactMax: 950, noise: 0.3, fireMs: 420, bots: 3 },
  { name: "NORMAL", speed: 205, reactMin: 260, reactMax: 640, noise: 0.16, fireMs: 300, bots: 4 },
  { name: "ZOR", speed: 245, reactMin: 110, reactMax: 320, noise: 0.07, fireMs: 210, bots: 5 }
];
const BASE_SPEED = 225;
const SPRINT_SPEED = 365;
const DASH_SPEED = 950;
const DASH_MS = 180;
const DASH_CD = 3000;
const BOT_NAMES = [
  "Kartal", "Poyraz", "Zümrüt", "Boran", "Lodos", "Tipi",
  "Atlas", "Rüzgar", "Demir", "Çınar", "Aras", "Toprak",
  "Yağmur", "Deniz", "Bulut", "Yıldırım", "Şimşek", "Volkan",
  "Alev", "Kuzey", "Güney", "Doğu", "Batı", "Ayaz",
  "Demirci", "Tuna", "Meriç", "Fırat", "Dicle", "Ararat",
  "Toros", "Alp", "Aslan", "Kaplan", "Şahin", "Doğan",
  "Kaan", "Mete", "Alparslan", "Oğuz", "Barlas", "Timur",
  "Cenk", "Bora", "Barış", "Umut", "Efe", "Kerem",
  "Alaz", "Utku", "Tunç", "Doruk", "Meriç", "Çağan",
  "Güneş", "Yıldız", "Ay", "Gece", "Şafak", "Tan",
  "Sabah", "Akşam", "Kar", "Buz", "Fırtına", "Kasırga",
  "Tsunami", "Girdap", "Gölge", "Işık", "Kıvılcım", "Kor",
  "Kılıç", "Kalkan", "Mızrak", "Yay", "Ok", "Zırh",
  "Demirbilek", "Çelik", "Elmas", "Yakut", "Safir", "İnci",
  "Mercan", "Sedef", "Kehribar", "Oltu", "Obsidyen", "Granit",
  "Mermer", "Kaya", "Tepe", "Dağ", "Vadi", "Ova",
  "Orman", "Yaprak", "Dal", "Kök", "Çiçek", "Gül",
  "Lale", "Nergis", "Menekşe", "Papatya", "Sümbül", "Yasemin"
];
const PLAYER_R = 19;

// ---------------- durum ----------------
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let me = socket.id;
let room = "";
let screen = "lobby";
let mapData = null;
let mapsCatalog = null;
let worldDims = { w: 2200, h: 1300 };
let players = {};
let bullets = [];
let particles = [];
let keys = {};
let mouse = { x: innerWidth / 2, y: innerHeight / 2, down: false };
let running = false;
let lastFrame = performance.now();
let lastMoveSent = 0;
let lastShot = 0;
let reloadStart = 0;
let swapStart = 0;
let shake = 0;
let hitmarkUntil = 0;
let ammo = { weapon: 0, mags: [8, 4, 1], magSize: 8, reloading: false, reloadMs: 1100 };
let cups = 0;
let myName = "";
let friendPoll = null;
let localGame = false;
let localRespawns = [];
let localNextBullet = 1;
let localBotSeq = 0;
let lastDust = 0;
let paused = false;
let ping = 0;
let rings = [];
let diffIdx = 1;
let stamina = 100;
let exhausted = false;
let lastSpPct = -1;
let lastSyncHp = -1;
let regenFlash = null;
let dashUntil = 0;
let dashCdUntil = 0;
let dashDir = { x: 0, y: 0 };
let lastDashTrail = 0;
let lastDashPct = -1;
let fps = 0;
let fpsFrames = 0;
let fpsLast = 0;
let matchCups = 0;
let perfMode = false;
let sensitivity = 1;

let selMap = 0;
let selDur = 300;
let selLimit = 20;
let pendingMap = 0;
let matchEndsAt = 0;
let killLimit = 0;
let isParty = false;
let chatOpen = false;
let lastTimerSec = -1;
let sfxVol = 0.8;
let lastPartyInfo = null;
let lastLocalSettings = null;
let matchEnded = false;

// ---------------- yardimcilar ----------------
const $ = id => document.getElementById(id);

function loadLS(k, d) {
  try { const v = localStorage.getItem("forekes_" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; }
}
function saveLS(k, v) {
  try { localStorage.setItem("forekes_" + k, JSON.stringify(v)); } catch (e) {}
}

let toastTimer = null;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add("hidden"), 2200);
}

// ---------------- ses ----------------
let actx = null;
function ensureAudio() {
  if (!actx) {
    try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }
  if (actx && actx.state === "suspended") actx.resume();
}
function sfx(freq, dur, type, vol) {
  if (!actx || sfxVol <= 0) return;
  const o = actx.createOscillator();
  const g = actx.createGain();
  o.type = type || "square";
  o.frequency.value = freq;
  g.gain.setValueAtTime((vol || 0.12) * sfxVol, actx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
  o.connect(g);
  g.connect(actx.destination);
  o.start();
  o.stop(actx.currentTime + dur);
}
addEventListener("mousedown", ensureAudio, { once: false });
addEventListener("keydown", ensureAudio, { once: false });

// ---------------- canvas boyut ----------------
function fit() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
}
addEventListener("resize", fit);
fit();

// ---------------- giris ----------------
addEventListener("keydown", e => {
  if (e.target && e.target.id === "chatInput") {
    if (e.key === "Enter") { sendChat(); }
    else if (e.key === "Escape") { closeChat(); }
    return;
  }
  if (chatOpen) {
    if (e.key === "Enter") { e.preventDefault(); openChat(); }
    return;
  }
  const k = e.key.toLowerCase();
  keys[k] = true;
  if (e.code === "KeyR" && running && !paused) {
    if (localGame) startLocalReload(performance.now());
    else socket.emit("reload");
  }
  if (running && (e.code === "Digit1" || e.code === "Digit2" || e.code === "Digit3")) {
    trySwitch(Number(e.code.slice(5)) - 1);
  }
  if (e.code === "KeyQ" && running && !paused) {
    e.preventDefault();
    startDash();
  }
  if (e.code === "Tab" && running) {
    e.preventDefault();
    showScoreboard(true);
  }
  if (e.key === "Escape" && running) togglePause();
  if (e.key === "Enter" && running && !paused && !localGame) {
    e.preventDefault();
    openChat();
  }
});
addEventListener("wheel", e => {
  if (!running || paused) return;
  const dir = e.deltaY > 0 ? 1 : -1;
  trySwitch((ammo.weapon + dir + 3) % 3);
});

function trySwitch(slot) {
  if (!running || paused || slot === ammo.weapon) return;
  const p = players[me];
  if (!p || p.health <= 0) return;
  ammo.weapon = slot;
  ammo.reloading = false;
  swapStart = performance.now();
  if (localGame) {
    p.weapon = slot;
    ammo.reloadMs = WEAPONS[slot].reloadMs;
  } else {
    socket.emit("switchWeapon", { slot });
  }
  renderAmmo();
  sfx(420, 0.04, "sine", 0.08);
}

function startDash() {
  const p = players[me];
  if (!p || p.health <= 0) return;
  const now = performance.now();
  if (now < dashCdUntil) return;
  dashUntil = now + DASH_MS;
  dashCdUntil = now + DASH_CD;
  const dx = (keys.d ? 1 : 0) - (keys.a ? 1 : 0);
  const dy = (keys.s ? 1 : 0) - (keys.w ? 1 : 0);
  if (dx || dy) {
    const len = Math.hypot(dx, dy);
    dashDir = { x: dx / len, y: dy / len };
  } else {
    dashDir = { x: Math.cos(p.angle), y: Math.sin(p.angle) };
  }
  sfx(300, 0.08, "sawtooth", 0.1);
}
addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
  if (e.code === "Tab") showScoreboard(false);
});
addEventListener("blur", () => {
  keys = {};
  mouse.down = false;
});
canvas.addEventListener("contextmenu", e => e.preventDefault());
canvas.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
canvas.addEventListener("mousedown", e => {
  if (e.button === 0) mouse.down = true;
});
addEventListener("mouseup", e => {
  if (e.button === 0) mouse.down = false;
});

// ---------------- lobi ----------------
$("name").value = loadLS("name", "");
cups = loadLS("cups", 0);
$("cupsValue").textContent = cups;

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    $("tab-" + btn.dataset.tab).classList.add("active");

    if (btn.dataset.tab === "cups") socket.emit("leaderboard");
    if (btn.dataset.tab === "friends") { renderFriends(); startFriendPoll(); }
    else stopFriendPoll();
  };
});

function playerIdentity() {
  myName = ($("name").value.trim() || "Oyuncu").slice(0, 16);
  saveLS("name", myName);
  let skin = loadLS("skin", 0);
  if (!STATIC && SKINS[skin] && SKINS[skin].cost > cups) skin = 0;
  return { name: myName, skin };
}

$("quickBtn").onclick = () => {
  socket.emit("quickPlay", playerIdentity());
};
$("singleBtn").onclick = () => {
  startLocal();
};
$("createBtn").onclick = () => {
  socket.emit("createParty", Object.assign({
    map: selMap,
    durationSec: selDur,
    killLimit: selLimit
  }, playerIdentity()));
};
$("joinBtn").onclick = () => {
  const code = $("roomInput").value.trim().toUpperCase();
  if (code.length < 3) { toast("Geçerli bir oda kodu gir."); return; }
  socket.emit("join", Object.assign({ room: code }, playerIdentity()));
};
$("roomInput").addEventListener("keydown", e => {
  if (e.key === "Enter") $("joinBtn").click();
});
$("roomInput").addEventListener("input", e => {
  e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
});
$("name").addEventListener("keydown", e => {
  if (e.key === "Enter") $("quickBtn").click();
});

$("boardRefresh").onclick = () => socket.emit("leaderboard");

socket.on("leaderboard", list => {
  const board = $("board");
  board.innerHTML = "";
  if (!list || !list.length) {
    board.innerHTML = '<li class="empty">Henüz kimse kupa kazanmadı. İlk sen ol.</li>';
    return;
  }
  const trophy = '<svg viewBox="0 0 24 24" class="ic"><path d="M6 3h12v2h3v3a5 5 0 0 1-5 5 6 6 0 0 1-3 2.6V18h3v3H8v-3h3v-2.4A6 6 0 0 1 8 13a5 5 0 0 1-5-5V5h3V3zm-1 4v1a3 3 0 0 0 2 2.8V7H5zm14 0h-2v3.8A3 3 0 0 0 19 8V7z"/></svg>';
  list.forEach((row, i) => {
    const li = document.createElement("li");
    li.innerHTML =
      '<span class="rank">' + (i + 1) + "</span>" +
      '<span class="bname"></span>' +
      '<span class="bkills">' + row.kills + " kill</span>" +
      '<span class="bcups">' + trophy + row.cups + "</span>";
    li.querySelector(".bname").textContent = row.name;
    board.appendChild(li);
  });
});

// ---------------- skinler ----------------
function renderSkins() {
  const grid = $("skinGrid");
  grid.innerHTML = "";
  const selected = loadLS("skin", 0);
  SKINS.forEach((s, i) => {
    const unlocked = cups >= s.cost || STATIC;
    const card = document.createElement("button");
    card.className = "skin-card" + (selected === i ? " selected" : "") + (unlocked ? "" : " locked");
    card.innerHTML =
      '<div class="swatch" style="background:' + s.body + ';border:3px solid ' + s.border + '"></div>' +
      '<div class="sname">' + s.name + "</div>" +
      '<div class="scost">' + (unlocked ? (s.cost === 0 ? "Ücretsiz" : "") : s.cost + " kupa") + "</div>" +
      (selected === i ? '<div class="check">&#10003;</div>' : "");
    card.onclick = () => {
      if (!unlocked) { toast(s.cost + " kupa gerekli. Şu an " + cups + " kupan var."); return; }
      saveLS("skin", i);
      renderSkins();
    };
    grid.appendChild(card);
  });
}

// ---------------- arkadaslar ----------------
function friendsList() { return loadLS("friends", []); }

function renderFriends(statuses) {
  const ul = $("friendList");
  const friends = friendsList();
  ul.innerHTML = "";

  if (!friends.length) {
    ul.innerHTML = '<li class="empty-row">Henüz arkadaş eklemedin.</li>';
    return;
  }

  friends.forEach(name => {
    const st = statuses && statuses.find(s => s.name.toLowerCase() === name.toLowerCase());
    const li = document.createElement("li");
    const online = st && st.online;
    li.innerHTML =
      '<span class="dot' + (online ? " on" : "") + '"></span>' +
      '<span class="fname"></span>' +
      '<span class="fstate' + (online ? " on" : "") + '">' + (online ? "Çevrimiçi" : "Çevrimdışı") + "</span>";
    li.querySelector(".fname").textContent = name;

    if (online && st.room) {
      const join = document.createElement("button");
      join.className = "btn";
      join.textContent = "KATIL";
      join.onclick = () => socket.emit("join", Object.assign({ room: st.room }, playerIdentity()));
      li.appendChild(join);
    }
    const del = document.createElement("button");
    del.className = "btn btn-ghost";
    del.textContent = "SİL";
    del.onclick = () => {
      saveLS("friends", friendsList().filter(f => f !== name));
      renderFriends();
    };
    li.appendChild(del);
    ul.appendChild(li);
  });
}

function checkFriends() {
  const friends = friendsList();
  if (friends.length) socket.emit("friendsCheck", { names: friends });
}

socket.on("friendsStatus", list => {
  if ($("tab-friends").classList.contains("active")) renderFriends(list);
});

function startFriendPoll() {
  stopFriendPoll();
  checkFriends();
  friendPoll = setInterval(checkFriends, 7000);
}
function stopFriendPoll() {
  if (friendPoll) { clearInterval(friendPoll); friendPoll = null; }
}

$("friendAdd").onclick = () => {
  const val = $("friendInput").value.trim().slice(0, 16);
  if (!val) return;
  const friends = friendsList();
  if (friends.some(f => f.toLowerCase() === val.toLowerCase())) {
    toast("Bu arkadaş zaten listede.");
    return;
  }
  friends.push(val);
  saveLS("friends", friends);
  $("friendInput").value = "";
  renderFriends();
  checkFriends();
};
$("friendInput").addEventListener("keydown", e => {
  if (e.key === "Enter") $("friendAdd").click();
});

// ---------------- parti ----------------
socket.on("party", info => {
  if (screen === "game") {
    lastPartyInfo = info;
    return;
  }
  renderParty(info);
});

function renderParty(info) {
  screen = "party";
  $("lobby").classList.add("hidden");
  $("party").classList.remove("hidden");
  $("partyCode").textContent = info.code;
  room = info.code;

  if (info.settings) {
    const d = DUR_OPTS.find(x => x.s === info.settings.durationSec);
    const l = LIMIT_OPTS.find(x => x.v === info.settings.killLimit);
    $("partySettings").textContent = info.settings.mapName + " · " + (d ? d.label : "?") +
      " · " + (info.settings.killLimit ? l.label + " kill" : "süreli");
  }

  const box = $("partyPlayers");
  box.innerHTML = "";
  info.players.forEach(p => {
    const skin = SKINS[p.skin] || SKINS[0];
    const el = document.createElement("div");
    el.className = "pp";
    el.innerHTML =
      '<div class="swatch" style="background:' + skin.body + ';border:2px solid ' + skin.border + '"></div>' +
      "<span></span>" +
      (p.id === info.leader ? '<span class="lead">LİDER</span>' : "");
    el.querySelector("span").textContent = p.name;
    box.appendChild(el);
  });

  const isLeader = info.leader === me;
  $("startMatch").style.display = isLeader ? "" : "none";
  $("partyNote").textContent = isLeader
    ? "Herkes hazır olduğunda maçı başlat."
    : "Liderin maçı başlatması bekleniyor...";
}

$("copyCode").onclick = () => {
  const code = $("partyCode").textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => toast("Oda kodu kopyalandı: " + code));
  } else {
    toast("Oda kodu: " + code);
  }
};
$("startMatch").onclick = () => socket.emit("start");
$("leaveParty").onclick = () => {
  socket.emit("leave");
  backToLobby();
};

// ---------------- oyuna giris ----------------
socket.on("started", data => {
  me = socket.id;
  room = data.code;
  screen = "game";
  running = true;
  matchEnded = false;
  $("lobby").classList.add("hidden");
  $("party").classList.add("hidden");
  $("results").classList.add("hidden");
  $("countdown").classList.add("hidden");
  isParty = !!data.party;
  killLimit = data.killLimit || 0;
  pendingMap = data.map !== undefined ? data.map : 0;
  setMap(pendingMap);
  matchEndsAt = data.durationMs ? Date.now() + data.durationMs : 0;
  lastTimerSec = -1;

  players = {};
  bullets = [];
  particles = [];
  ammo = { weapon: 0, mags: [8, 4, 1], magSize: 8, reloading: false, reloadMs: 1100 };
  stamina = 100;
  exhausted = false;
  lastSpPct = -1;
  updateStaminaBar();
  renderAmmo();

  $("hud").classList.remove("hidden");
  document.body.classList.add("ingame");
  $("roomText").textContent = room;
  $("pingChip").style.display = "";
  $("chatTab").classList.remove("hidden");
  closeChat();
  setHp(100);
  $("killText").textContent = "0";
  $("killfeed").innerHTML = "";
  matchCups = 0;
  $("cupText").textContent = "0";
  $("cupChip").classList.toggle("hidden", !!isParty);
  $("timerChip").classList.toggle("hidden", !matchEndsAt);
  $("limitChip").classList.toggle("hidden", !killLimit);
  $("limitText").textContent = "0 / " + killLimit;

  lastFrame = performance.now();
  requestAnimationFrame(frame);
});

function backToLobby() {
  running = false;
  screen = "lobby";
  localGame = false;
  localRespawns = [];
  paused = false;
  chatOpen = false;
  matchEnded = false;
  matchEndsAt = 0;
  matchCups = 0;
  players = {};
  bullets = [];
  particles = [];
  rings = [];
  document.body.classList.remove("ingame");
  $("hud").classList.add("hidden");
  $("party").classList.add("hidden");
  $("pause").classList.add("hidden");
  $("death").classList.add("hidden");
  $("results").classList.add("hidden");
  $("countdown").classList.add("hidden");
  $("scoreboard").classList.add("hidden");
  $("leaveWarn").classList.add("hidden");
  $("chatWrap").classList.add("hidden");
  $("chatTab").classList.add("hidden");
  $("lobby").classList.remove("hidden");
  renderSkins();
  $("cupsValue").textContent = cups;
}

socket.on("errorMsg", toast);

// ---------------- oyun olaylari ----------------
socket.on("state", state => {
  const prev = players[me];
  players = state;
  const cur = state[me];
  // normal oyun: kendi pozisyonum yerel (client otoriter)
  // olumden donus: sunucunun spawn pozisyonunu kabul et
  if (cur && prev && screen === "game" && prev.health > 0 && cur.health > 0) {
    cur.x = prev.x;
    cur.y = prev.y;
    cur.angle = prev.angle;
  }
  if (cur && prev && prev.health <= 0 && cur.health > 0) {
    stamina = 100;
    exhausted = false;
    lastSpPct = -1;
    updateStaminaBar();
  }
  if (cur && Math.round(cur.health) !== lastSyncHp) {
    setHp(cur.health);
  }
  for (const id in players) {
    const p = players[id];
    if (p.rx === undefined) { p.rx = p.x; p.ry = p.y; }
    if (id === me) { p.rx = p.x; p.ry = p.y; }
  }
});

let bulletMap = {};
socket.on("projectiles", list => {
  const next = {};
  for (const b of list) next[b.id] = b;
  for (const id in bulletMap) {
    if (!next[id]) spawnParticles(bulletMap[id].x, bulletMap[id].y, "#9aa0ab", 3, 90);
  }
  bulletMap = next;
  bullets = list;
});

socket.on("scores", scores => {
  $("killText").textContent = scores[me] || 0;
  if (killLimit) {
    $("limitText").textContent = (scores[me] || 0) + " / " + killLimit;
  }
});

socket.on("matchEnd", data => {
  if (matchEnded) return;
  matchEnded = true;
  running = false;
  $("hud").classList.add("hidden");
  document.body.classList.remove("ingame");
  closeChat();
  $("chatTab").classList.add("hidden");
  showResults(data.rankings, data.reason, "mp");
});

socket.on("ammo", a => {
  const wasReloading = ammo.reloading;
  ammo = {
    weapon: a.weapon,
    mags: a.mags,
    magSize: a.magSize,
    reloading: a.reloading,
    reloadMs: a.reloadMs
  };
  if (a.reloading && !wasReloading) reloadStart = performance.now();
  renderAmmo();
});

socket.on("boom", d => boomFx(d.x, d.y, d.r));

function boomFx(x, y, r) {
  spawnParticles(x, y, "#ec8b2f", Math.max(12, Math.round(r / 9)), 300);
  spawnParticles(x, y, "#facc15", Math.max(6, Math.round(r / 16)), 180);
  rings.push({ x, y, r, life: 0.4, max: 0.4 });
  shake = Math.max(shake, 10);
  sfx(60, 0.35, "sawtooth", 0.25);
}

socket.on("cupsYou", data => {
  cups = data.cups;
  matchCups = data.matchCups || 0;
  saveLS("cups", cups);
  $("cupsValue").textContent = cups;
  const ct = $("cupText");
  if (ct) ct.textContent = matchCups;
});

socket.on("damaged", data => {
  if (data.id !== me) return;
  setHp(data.health);
  $("vignette").classList.remove("hit");
  void $("vignette").offsetWidth;
  $("vignette").classList.add("hit");
  shake = Math.max(shake, 5);
  sfx(300, 0.08, "sawtooth", 0.14);
});

socket.on("dead", data => {
  if (data.id !== me) return;
  setHp(0);
  matchCups = Math.max(0, matchCups - 1);
  $("cupText").textContent = matchCups;
  $("killerText").textContent = data.killer ? data.killer + " seni eledi" : "Yeniden doğuyorsun...";
  $("death").classList.remove("hidden");
  sfx(110, 0.3, "sawtooth", 0.2);
  setTimeout(() => $("death").classList.add("hidden"), 900);
});

function addFeed(killerName, victimName, mine) {
  const feed = $("killfeed");
  const row = document.createElement("div");
  row.className = "feed-row" + (mine ? " mine" : "");
  row.innerHTML = '<b class="k"></b><span>&#9656;</span><i></i>';
  row.querySelector(".k").textContent = killerName;
  row.querySelector("i").textContent = victimName;
  feed.prepend(row);
  while (feed.children.length > 5) feed.lastChild.remove();
  setTimeout(() => row.remove(), 4200);
}

socket.on("kill", data => {
  addFeed(data.killer, data.victim, data.killer === myName);
  if (data.killer === myName) {
    matchCups++;
    $("cupText").textContent = matchCups;
    sfx(660, 0.07, "square", 0.15);
    setTimeout(() => sfx(880, 0.09, "square", 0.15), 80);
  }
});

socket.on("hitConfirm", () => {
  hitmarkUntil = performance.now() + 140;
  sfx(950, 0.05, "sine", 0.16);
});

socket.on("disconnect", () => {
  if (running || screen !== "lobby") {
    backToLobby();
    toast("Sunucu bağlantısı koptu.");
  }
});
if (!STATIC) {
  socket.on("connect", () => {
    me = socket.id;
  });
  socket.on("connect_error", () => {
    if (screen === "lobby") toast("Sunucuya bağlanılamadı. Birazdan tekrar deneniyor...");
  });
}

// ---------------- sohbet ----------------
function openChat() {
  if (localGame) return;
  chatOpen = true;
  keys = {};
  $("chatWrap").classList.remove("hidden");
  $("chatTab").classList.add("hidden");
  $("chatInput").focus();
}
function closeChat() {
  chatOpen = false;
  $("chatWrap").classList.add("hidden");
  if (!localGame && running) $("chatTab").classList.remove("hidden");
  $("chatInput").blur();
}
function sendChat() {
  const inp = $("chatInput");
  const text = inp.value.trim();
  if (!text) return;
  socket.emit("chat", { text });
  inp.value = "";
  inp.focus();
}
function copyRoomCode() {
  if (!room || localGame) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(room).then(() => toast("Oda kodu kopyalandı: " + room));
  } else {
    toast("Oda kodu: " + room);
  }
}
$("roomChip").onclick = copyRoomCode;

function addChatMsg(name, text, mine) {
  const log = $("chatLog");
  const d = document.createElement("div");
  d.className = "chat-msg" + (mine ? " mine" : "");
  d.innerHTML = "<b></b> <span></span>";
  d.querySelector("b").textContent = name + ":";
  d.querySelector("span").textContent = text;
  log.appendChild(d);
  while (log.children.length > 30) log.firstChild.remove();
  log.scrollTop = log.scrollHeight;
}
socket.on("chat", data => {
  addChatMsg(data.name, data.text, data.name === myName);
});
$("chatTab").onclick = () => openChat();
$("chatSend").onclick = () => sendChat();
$("chatClose").onclick = () => closeChat();
$("chatInput").addEventListener("input", e => {
  e.target.value = e.target.value.slice(0, 80);
});

// ---------------- mac sonucu ----------------
function showResults(rankings, reason, mode) {
  $("resultsSub").textContent = reason === "time" ? "Süre doldu." : "Skor hedefine ulaşıldı.";
  const body = $("resultsBody");
  body.innerHTML = "";
  rankings.forEach((row, i) => {
    const tr = document.createElement("tr");
    if (row.id === me) tr.className = "me";
    tr.innerHTML =
      "<td>" + (i + 1) + "</td>" +
      '<td><span class="pname"></span>' + (row.id === me ? ' <span class="you">(YOU)</span>' : "") + "</td>" +
      "<td>" + (row.kills || 0) + "</td>" +
      "<td>" + (row.deaths || 0) + "</td>";
    tr.querySelector(".pname").textContent = row.name;
    body.appendChild(tr);
  });

  $("resultsAgain").style.display = (mode === "sp" || (mode === "mp" && !isParty)) ? "" : "none";
  $("resultsOk").style.display = "";
  $("results").classList.remove("hidden");

  if (mode === "mp") {
    $("resultsAgain").style.display = "";
    $("resultsOk").onclick = () => {
      $("results").classList.add("hidden");
      socket.emit("leave");
      backToLobby();
    };
    $("resultsAgain").onclick = () => {
      $("results").classList.add("hidden");
      socket.emit("start");
    };
  } else {
    $("resultsOk").onclick = () => {
      $("results").classList.add("hidden");
      backToLobby();
    };
    $("resultsAgain").onclick = () => {
      $("results").classList.add("hidden");
      startLocal();
    };
  }
}

// ---------------- HUD ----------------
function setHp(hp) {
  const fill = $("hpFill");
  const pct = Math.round(Math.max(0, Math.min(100, hp)));
  const increasing = pct > lastSyncHp && lastSyncHp >= 0;
  lastSyncHp = pct;
  if (fill) {
    fill.style.width = pct + "%";
    fill.className = pct <= 25 ? "low" : pct <= 50 ? "mid" : "";
  }
  const hpText = $("hpText");
  if (hpText) hpText.textContent = pct;
  const low = $("lowhp");
  if (low) low.classList.toggle("hidden", !(pct > 0 && pct <= 20));
  if (increasing && fill) {
    fill.classList.add("regen");
    clearTimeout(regenFlash);
    regenFlash = setTimeout(() => fill.classList.remove("regen"), 400);
  }
}

function renderAmmo() {
  const w = WEAPONS[ammo.weapon];
  const count = ammo.mags ? ammo.mags[ammo.weapon] : 0;
  const pips = $("ammoPips");
  pips.innerHTML = "";
  for (let i = 0; i < w.mag; i++) {
    const pip = document.createElement("i");
    if (i >= count) pip.className = "off";
    pips.appendChild(pip);
  }
  $("reloadText").textContent = ammo.reloading ? "ŞARJÖR" : "";
  $("reloadFill").parentElement.classList.toggle("on", ammo.reloading);
  updateWeaponBar();
}

function updateWeaponBar() {
  document.querySelectorAll("#weaponBar .wslot").forEach((el, i) => {
    el.classList.toggle("active", i === ammo.weapon);
  });
}

// ---------------- harita ----------------
socket.on("maps", data => {
  mapsCatalog = data.maps;
  worldDims = data.world;
  setMap(pendingMap);
  buildSettings();
});

function setMap(idx) {
  const catalog = mapsCatalog || STATIC_MAPS;
  const m = catalog[idx] || catalog[0];
  mapData = {
    w: worldDims.w,
    h: worldDims.h,
    walls: m.walls,
    spawns: m.spawns,
    name: m.name,
    theme: m.theme || DEFAULT_THEME
  };
  drawMapPreview();
}

function drawMapPreview() {
  if (!mapData) return;
  const c = $("mapPrev");
  const g = c.getContext("2d");
  const s = c.width / mapData.w;
  g.clearRect(0, 0, c.width, c.height);
  g.fillStyle = "#101216";
  g.fillRect(0, 0, c.width, c.height);
  g.strokeStyle = "#2a2e37";
  g.lineWidth = 2;
  g.strokeRect(1, 1, c.width - 2, c.height - 2);
  g.fillStyle = "#3a4048";
  const th = mapData.theme || DEFAULT_THEME;
  g.fillStyle = th.wall;
  for (const [x, y, w, h] of mapData.walls) {
    g.fillRect(x * s, y * s, w * s, h * s);
  }
  g.fillStyle = "#facc15";
  for (const [x, y] of mapData.spawns) {
    g.fillRect(x * s - 1.5, y * s - 1.5, 3, 3);
  }
}

// ---------------- mac ayarlari ----------------
function buildSettings() {
  const mapRow = $("optMap");
  mapRow.innerHTML = "";
  (mapsCatalog || []).forEach((m, i) => {
    const b = document.createElement("button");
    b.className = "opt-btn" + (i === selMap ? " active" : "");
    b.textContent = m.name;
    b.onclick = () => {
      selMap = i;
      pendingMap = i;
      saveLS("selMap", i);
      buildSettings();
      setMap(i);
    };
    mapRow.appendChild(b);
  });

  const durRow = $("optDur");
  durRow.innerHTML = "";
  DUR_OPTS.forEach((d, i) => {
    const b = document.createElement("button");
    b.className = "opt-btn" + (d.s === selDur ? " active" : "");
    b.textContent = d.label;
    b.onclick = () => {
      selDur = d.s;
      saveLS("selDur", d.s);
      buildSettings();
    };
    durRow.appendChild(b);
  });

  const limRow = $("optLimit");
  limRow.innerHTML = "";
  LIMIT_OPTS.forEach((l, i) => {
    const b = document.createElement("button");
    b.className = "opt-btn" + (l.v === selLimit ? " active" : "");
    b.textContent = l.label;
    b.onclick = () => {
      selLimit = l.v;
      saveLS("selLimit", l.v);
      buildSettings();
    };
    limRow.appendChild(b);
  });
}

function fmtTime(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
}

// ---------------- cekirdek oyun ----------------
function resolveWalls(x, y, r) {
  if (!mapData) return [x, y];
  for (const [wx, wy, ww, wh] of mapData.walls) {
    const cx = Math.max(wx, Math.min(x, wx + ww));
    const cy = Math.max(wy, Math.min(y, wy + wh));
    const dx = x - cx;
    const dy = y - cy;
    const d2 = dx * dx + dy * dy;
    if (d2 < r * r) {
      if (d2 === 0) {
        const l = x - wx, ri = wx + ww - x, t = y - wy, b = wy + wh - y;
        const m = Math.min(l, ri, t, b);
        if (m === l) x = wx - r;
        else if (m === ri) x = wx + ww + r;
        else if (m === t) y = wy - r;
        else y = wy + wh + r;
      } else {
        const d = Math.sqrt(d2);
        x = cx + (dx / d) * r;
        y = cy + (dy / d) * r;
      }
    }
  }
  return [x, y];
}

function pointInWall(x, y, pad) {
  if (!mapData) return false;
  for (const [wx, wy, ww, wh] of mapData.walls) {
    if (x > wx - pad && x < wx + ww + pad && y > wy - pad && y < wy + wh + pad) return true;
  }
  return false;
}

function screenToWorld(sx, sy, p) {
  const scale = camScale();
  return {
    x: p.x + (sx - innerWidth / 2) / scale * sensitivity,
    y: p.y + (sy - innerHeight / 2) / scale * sensitivity
  };
}

function camScale() {
  return Math.min(innerWidth / 1500, innerHeight / 870);
}

function spawnParticles(x, y, color, count, speed) {
  if (perfMode) count = Math.max(2, Math.ceil(count * 0.4));
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = speed * (0.4 + Math.random() * 0.8);
    particles.push({
      x, y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      life: 0.5 + Math.random() * 0.3,
      size: 2 + Math.random() * 2.5,
      color
    });
  }
}

function shotSound(w) {
  if (w.id === 1) {
    sfx(140, 0.09, "square", 0.16);
    sfx(90, 0.12, "sawtooth", 0.12);
  } else if (w.id === 2) {
    sfx(70, 0.2, "sawtooth", 0.16);
  } else {
    sfx(190, 0.05, "square", 0.1);
  }
}

function fire(p, angle) {
  socket.emit("shoot", { angle });
  const w = WEAPONS[ammo.weapon];
  ammo.mags[ammo.weapon] = Math.max(0, ammo.mags[ammo.weapon] - 1);

  const mx = p.x + Math.cos(angle) * 34;
  const my = p.y + Math.sin(angle) * 34;
  spawnParticles(mx, my, "#facc15", w.pellets > 1 ? 5 : 3, 120);
  shotSound(w);
  if (w.id === 2) shake = Math.max(shake, 3);

  if (ammo.mags[ammo.weapon] === 0) {
    ammo.reloading = true;
    reloadStart = performance.now();
  }
  renderAmmo();
}

function update(now) {
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  const p = players[me];
  if (!p || !mapData) return;

  const dx = (keys.d ? 1 : 0) - (keys.a ? 1 : 0);
  const dy = (keys.s ? 1 : 0) - (keys.w ? 1 : 0);
  const wantSprint = !!keys.shift && (dx || dy) && p.health > 0;
  const sprinting = wantSprint && !exhausted && stamina > 0;

  if (sprinting) {
    stamina -= 30 * dt;
    if (stamina <= 0) {
      stamina = 0;
      exhausted = true;
    }
  } else {
    stamina = Math.min(100, stamina + 16 * dt);
    if (exhausted && stamina >= 20) exhausted = false;
  }
  updateStaminaBar();

  const dashing = now < dashUntil;

  if (p.health > 0 && (dashing || dx || dy)) {
    let ndx, ndy, speed;
    if (dashing) {
      ndx = dashDir.x;
      ndy = dashDir.y;
      speed = DASH_SPEED;
      if (now - lastDashTrail > 20) {
        lastDashTrail = now;
        particles.push({
          x: p.x - ndx * 26, y: p.y - ndy * 26,
          vx: -ndx * 70, vy: -ndy * 70,
          life: 0.3, size: 4.5, color: "#a855f7"
        });
      }
    } else {
      const len = Math.hypot(dx, dy);
      ndx = dx / len;
      ndy = dy / len;
      speed = sprinting ? SPRINT_SPEED : BASE_SPEED;
    }
    let nx = Math.max(25, Math.min(mapData.w - 25, p.x + ndx * speed * dt));
    let ny = Math.max(25, Math.min(mapData.h - 25, p.y + ndy * speed * dt));
    const res = resolveWalls(nx, ny, PLAYER_R + 2);
    p.x = res[0];
    p.y = res[1];
    if (sprinting && !dashing && now - lastDust > 80) {
      lastDust = now;
      particles.push({
        x: p.x - ndx * 24, y: p.y - ndy * 24,
        vx: -ndx * 40, vy: -ndy * 40,
        life: 0.35, size: 3, color: "#565d68"
      });
    }
  }

  updateDashBar(now);

  const world = screenToWorld(mouse.x, mouse.y, p);
  p.angle = Math.atan2(world.y - p.y, world.x - p.x);

  const wdef = WEAPONS[ammo.weapon];
  const canFire = mouse.down && p.health > 0 && !ammo.reloading &&
    ammo.mags[ammo.weapon] > 0 && now - lastShot > wdef.fireMs &&
    now - swapStart > SWAP_MS;

  if (localGame) {
    if (canFire) {
      lastShot = now;
      localShoot(p, p.angle, now);
    }
    updateLocal(dt, now);
  } else {
    if (now - lastMoveSent > 33) {
      socket.emit("move", { x: p.x, y: p.y, angle: p.angle });
      lastMoveSent = now;
    }

    if (canFire) {
      lastShot = now;
      fire(p, p.angle);
    }

    for (const b of bullets) {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      if (b.life !== undefined) b.life -= dt;
      if (pointInWall(b.x, b.y, 3)) b.dead = true;
      if (b.x < 0 || b.y < 0 || b.x > mapData.w || b.y > mapData.h) b.dead = true;
      if (b.life !== undefined && b.life <= 0) b.dead = true;
      if (b.w === 2 && !b.dead && now - (b._sm || 0) > 40) {
        b._sm = now;
        particles.push({
          x: b.x, y: b.y,
          vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 0.5) * 30,
          life: 0.45, size: 4.5, color: "#565d68"
        });
      }
    }
    bullets = bullets.filter(b => !b.dead);
  }

  updateFx(dt);

  if (ammo.reloading) {
    const rl = ammo.reloadMs || RELOAD_MS;
    const prog = Math.min(1, (now - reloadStart) / rl);
    $("reloadFill").style.width = prog * 100 + "%";
    if (prog >= 1) {
      if (localGame) {
        p.mag = ammo.mags[ammo.weapon];
        p.reloadEnd = 0;
        ammo.reloading = false;
        ammo.mags[ammo.weapon] = WEAPONS[ammo.weapon].mag;
        renderAmmo();
        sfx(520, 0.05, "sine", 0.1);
      } else if (ammo.mags[ammo.weapon] > 0) {
        ammo.reloading = false;
        renderAmmo();
        sfx(520, 0.05, "sine", 0.1);
      }
    }
  }

  document.querySelectorAll("#weaponBar .wslot").forEach((el, i) => {
    const cd = el.querySelector(".wcd");
    let frac = 0;
    if (i === ammo.weapon) {
      frac = Math.max(0, 1 - (now - lastShot) / WEAPONS[i].fireMs);
    }
    cd.style.height = (frac * 100) + "%";
  });

  const swapping = now - swapStart < SWAP_MS;
  const swapBar = $("swapBar");
  swapBar.classList.toggle("on", swapping);
  if (swapping) {
    $("swapFill").style.width = ((now - swapStart) / SWAP_MS * 100) + "%";
  }
}

function updateStaminaBar() {
  const pct = Math.round(stamina * 10) / 10;
  if (pct === lastSpPct) return;
  lastSpPct = pct;
  const fill = $("spFill");
  fill.style.width = pct + "%";
  fill.classList.toggle("low", exhausted);
}

function updateDashBar(now) {
  const pct = Math.round(Math.min(100, Math.max(0, (now - (dashCdUntil - DASH_CD)) / DASH_CD * 100)));
  if (pct === lastDashPct) return;
  lastDashPct = pct;
  const fill = $("dashFill");
  if (fill) fill.style.width = pct + "%";
}

function updateFx(dt) {
  for (const part of particles) {
    part.x += part.vx * dt;
    part.y += part.vy * dt;
    part.vx *= 0.92;
    part.vy *= 0.92;
    part.life -= dt;
  }
  particles = particles.filter(pp => pp.life > 0);
  if (particles.length > 280) particles.splice(0, particles.length - 280);

  for (const g of rings) g.life -= dt;
  rings = rings.filter(g => g.life > 0);
}

function frame(now) {
  if (!running) return;
  fpsFrames++;
  if (now - fpsLast >= 500) {
    fps = Math.round(fpsFrames * 1000 / (now - fpsLast));
    fpsFrames = 0;
    fpsLast = now;
    const fe = $("fpsText");
    if (fe) fe.textContent = fps;
  }
  if (paused) {
    const dt = Math.min(0.05, (now - lastFrame) / 1000);
    lastFrame = now;
    if (!localGame) updateFx(dt);
    updateTimer(now);
    draw(now);
    requestAnimationFrame(frame);
    return;
  }
  update(now);
  updateTimer(now);
  draw(now);
  requestAnimationFrame(frame);
}

function updateTimer(now) {
  if (!matchEndsAt) {
    $("countdown").classList.add("hidden");
    return;
  }
  const rem = Math.max(0, matchEndsAt - Date.now());
  const s = Math.ceil(rem / 1000);
  if (s !== lastTimerSec) {
    lastTimerSec = s;
    $("timerText").textContent = fmtTime(rem);
    $("timerChip").classList.toggle("warn", rem <= 30000);
    if (rem <= 10000 && rem > 0) {
      const cd = $("countdown");
      cd.textContent = s;
      cd.classList.remove("hidden");
      sfx(880, 0.06, "sine", 0.15);
    } else {
      $("countdown").classList.add("hidden");
    }
  }
  if (rem <= 0 && localGame && !matchEnded) {
    endLocal("time");
  }
}

// ---------------- cizim ----------------
function draw(now) {
  const p = players[me];
  if (!p || !mapData) return;

  const dpr = Math.min(devicePixelRatio || 1, 2);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  const scale = camScale();
  const sh = perfMode ? 0 : shake;
  const ox = innerWidth / 2 - p.x * scale + (Math.random() - 0.5) * sh;
  const oy = innerHeight / 2 - p.y * scale + (Math.random() - 0.5) * sh;

  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);

  drawWorld();
  drawBullets();
  drawPlayers();
  drawRings();
  drawParticles();

  const wdef = WEAPONS[ammo.weapon];
  if (p.health > 0) {
    const col = wdef.id === 0 ? "232,237,242" : "250,204,21";

    ctx.beginPath();
    ctx.arc(p.x, p.y, wdef.range, 0, Math.PI * 2);
    ctx.setLineDash([14, 18]);
    ctx.strokeStyle = "rgba(" + col + ",0.25)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.setLineDash([]);

    const a = p.angle || 0;
    const half = 0.32;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, wdef.range, a - half, a + half);
    ctx.closePath();
    ctx.fillStyle = "rgba(" + col + ",0.05)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(p.x, p.y, wdef.range, a - half, a + half);
    ctx.strokeStyle = "rgba(" + col + ",0.4)";
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  ctx.restore();

  if (shake > 0) {
    shake *= 0.88;
    if (shake < 0.3) shake = 0;
  }

  drawMinimap();
  drawCrosshair(now);
}

function drawWorld() {
  const th = mapData.theme || DEFAULT_THEME;
  ctx.fillStyle = th.floor;
  ctx.fillRect(0, 0, mapData.w, mapData.h);

  ctx.strokeStyle = th.grid;
  ctx.lineWidth = 1;
  for (let x = 0; x <= mapData.w; x += 50) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, mapData.h); ctx.stroke();
  }
  for (let y = 0; y <= mapData.h; y += 50) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(mapData.w, y); ctx.stroke();
  }

  for (const [x, y, w, h] of mapData.walls) {
    ctx.fillStyle = th.wall;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = th.wallBorder;
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, w, h);
  }

  ctx.strokeStyle = th.border;
  ctx.lineWidth = 7;
  ctx.strokeRect(8, 8, mapData.w - 16, mapData.h - 16);
}

function drawPlayers() {
  const now = performance.now();
  for (const p of Object.values(players)) {
    if (p.rx === undefined) { p.rx = p.x; p.ry = p.y; }
    p.rx += (p.x - p.rx) * 0.5;
    p.ry += (p.y - p.ry) * 0.5;
    const px = p.rx;
    const py = p.ry;
    const local = p.id === me;
    const skin = SKINS[p.skin] || SKINS[0];
    const wid = p.weapon !== undefined ? p.weapon : 0;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(p.angle || 0);
    ctx.fillStyle = "#0b0c0e";
    if (wid === 1) {
      ctx.fillRect(8, -4, 36, 8);
      ctx.fillRect(16, 2, 11, 6);
    } else if (wid === 2) {
      ctx.fillRect(4, -7, 42, 14);
    } else {
      ctx.fillRect(8, -5, 28, 10);
    }
    ctx.fillStyle = skin.border;
    if (wid === 2) ctx.fillRect(42, -7, 4, 14);
    else ctx.fillRect(wid === 1 ? 40 : 32, -3, 5, 6);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(px, py, PLAYER_R, 0, Math.PI * 2);
    ctx.fillStyle = skin.body;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = skin.border;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(px, py, 7, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(13,14,17,0.55)";
    ctx.fill();

    if (local) {
      ctx.beginPath();
      ctx.arc(px, py, PLAYER_R + 5, 0, Math.PI * 2);
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    if (p.shield || (p.shieldUntil || 0) > performance.now()) {
      ctx.beginPath();
      ctx.arc(px, py, PLAYER_R + 9, 0, Math.PI * 2);
      ctx.setLineDash([6, 5]);
      ctx.strokeStyle = "rgba(232,237,242,0.55)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = "#0b0c0e";
    ctx.fillRect(px - 24, py - 33, 48, 5);
    ctx.fillStyle = local ? "#facc15" : "#d9dde1";
    ctx.fillRect(px - 24, py - 33, 48 * Math.max(0, p.health) / 100, 5);

    ctx.fillStyle = local ? "#facc15" : "#e3e6e9";
    ctx.font = "bold 13px 'Segoe UI', Arial";
    ctx.textAlign = "center";
    ctx.fillText(p.name, px, py - 41);

    if (p.ping > 0) {
      ctx.font = "bold 10px 'Segoe UI', Arial";
      ctx.fillStyle = pingColor(p.ping);
      ctx.fillText(p.ping + "ms", px, py - 53);
    }
  }
}

function drawBullets() {
  for (const b of bullets) {
    const ratio = b.life0 && b.life !== undefined ? b.life / b.life0 : 1;
    const fade = Math.max(0.15, Math.min(1, ratio / 0.35));

    if (b.w === 1) {
      ctx.globalAlpha = fade;
      ctx.beginPath();
      ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#f4f4f4";
      ctx.fill();
    } else if (b.w === 2) {
      const vl = Math.hypot(b.vx, b.vy) || 1;
      const tx = b.x - b.vx / vl * 10;
      const ty = b.y - b.vy / vl * 10;
      ctx.beginPath();
      ctx.arc(tx, ty, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#23262d";
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#414652";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(b.x + b.vx / vl * 7, b.y + b.vy / vl * 7, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#facc15";
      ctx.fill();
    } else {
      const tx = b.x - b.vx * 0.014;
      const ty = b.y - b.vy * 0.014;
      ctx.globalAlpha = fade;
      ctx.strokeStyle = b.mine === me ? "rgba(250,204,21,0.75)" : "rgba(232,232,232,0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

function drawRings() {
  for (const g of rings) {
    const t = 1 - g.life / g.max;
    ctx.globalAlpha = Math.max(0, g.life / g.max);
    ctx.beginPath();
    ctx.arc(g.x, g.y, 12 + g.r * t, 0, Math.PI * 2);
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 5 * (1 - t) + 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(g.x, g.y, 6 + g.r * t * 0.7, 0, Math.PI * 2);
    ctx.strokeStyle = "#ec8b2f";
    ctx.lineWidth = 3 * (1 - t) + 1;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawParticles() {
  for (const p of particles) {
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 2));
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  }
  ctx.globalAlpha = 1;
}

function drawMinimap() {
  const w = 176;
  const h = w * mapData.h / mapData.w;
  const x = innerWidth - w - 16;
  const y = innerHeight - h - 16;
  const s = w / mapData.w;

  ctx.fillStyle = "rgba(13,14,17,0.85)";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#2a2e37";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = "#3a4048";
  const th = mapData.theme || DEFAULT_THEME;
  ctx.fillStyle = th.wall;
  for (const [wx, wy, ww, wh] of mapData.walls) {
    ctx.fillRect(x + wx * s, y + wy * s, ww * s, wh * s);
  }

  for (const p of Object.values(players)) {
    ctx.beginPath();
    ctx.arc(x + p.x * s, y + p.y * s, p.id === me ? 3.2 : 2.4, 0, Math.PI * 2);
    ctx.fillStyle = p.id === me ? "#facc15" : "#9aa0ab";
    ctx.fill();
  }
}

function drawCrosshair(now) {
  ctx.strokeStyle = "#f4f4f4";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(mouse.x - 14, mouse.y);
  ctx.lineTo(mouse.x - 5, mouse.y);
  ctx.moveTo(mouse.x + 5, mouse.y);
  ctx.lineTo(mouse.x + 14, mouse.y);
  ctx.moveTo(mouse.x, mouse.y - 14);
  ctx.lineTo(mouse.x, mouse.y - 5);
  ctx.moveTo(mouse.x, mouse.y + 5);
  ctx.lineTo(mouse.x, mouse.y + 14);
  ctx.stroke();

  ctx.fillStyle = "#f4f4f4";
  ctx.fillRect(mouse.x - 1, mouse.y - 1, 2, 2);

  if (now < hitmarkUntil) {
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 2.5;
    const g = 5;
    const o = 11;
    ctx.beginPath();
    ctx.moveTo(mouse.x - o, mouse.y - o); ctx.lineTo(mouse.x - g, mouse.y - g);
    ctx.moveTo(mouse.x + o, mouse.y - o); ctx.lineTo(mouse.x + g, mouse.y - g);
    ctx.moveTo(mouse.x - o, mouse.y + o); ctx.lineTo(mouse.x - g, mouse.y + g);
    ctx.moveTo(mouse.x + o, mouse.y + o); ctx.lineTo(mouse.x + g, mouse.y + g);
    ctx.stroke();
  }
}

// ---------------- tek oyunculu mod ----------------
function makeBot(name, sk, bw, prefDist, s, now) {
  return {
    id: "bot_" + (localBotSeq++),
    name,
    skin: sk,
    weapon: bw,
    mag: WEAPONS[bw].mag,
    prefDist,
    kills: 0,
    deaths: 0,
    x: s[0], y: s[1],
    angle: Math.random() * Math.PI * 2,
    health: 100,
    reloadEnd: 0, lastShot: 0,
    shieldUntil: now + 1400,
    target: null, retargetAt: 0, reactUntil: 0, hadLos: false,
    mode: "strafe", strafeDir: 1, aimNoise: 0,
    wanderAngle: 0, wanderAt: 0,
    stuckT: 0, unstickUntil: 0, unstickAngle: 0,
    rx: s[0], ry: s[1]
  };
}

function updateDiffButtons() {
  document.querySelectorAll(".diff-btn").forEach(btn => {
    btn.classList.toggle("active", Number(btn.dataset.d) === diffIdx);
  });
}

function applyDifficulty(idx) {
  if (idx < 0 || idx >= DIFFS.length) return;
  diffIdx = idx;
  saveLS("diff", idx);
  updateDiffButtons();

  if (!localGame) return;

  const want = DIFFS[idx].bots;
  const botIds = Object.keys(players).filter(id => id.indexOf("bot_") === 0);
  while (botIds.length > want) {
    const id = botIds.pop();
    delete players[id];
    localRespawns = localRespawns.filter(r => r.id !== id);
  }
  let n = botIds.length;
  const now = performance.now();
  const PREF_DIST = [480, 200, 420];
  while (n < want) {
    const bw = [1, 0, 2][n % 3];
    const s = mapData.spawns[(n + 2) % mapData.spawns.length];
    const bot = makeBot(BOT_NAMES[(n + 3) % BOT_NAMES.length], (n * 3 + 1) % SKINS.length, bw, PREF_DIST[bw], s, now);
    players[bot.id] = bot;
    n++;
  }
}

function startLocal() {
  lastLocalSettings = { map: selMap, dur: selDur, limit: selLimit };
  const identity = playerIdentity();
  pendingMap = selMap;
  setMap(selMap);
  localGame = true;
  screen = "game";
  running = true;
  matchEnded = false;
  me = "local_me";
  room = "ANTRENMAN";
  killLimit = selLimit;
  matchEndsAt = selDur ? Date.now() + selDur * 1000 : 0;
  lastTimerSec = -1;

  players = {};
  bullets = [];
  particles = [];
  localRespawns = [];
  localNextBullet = 1;

  const spawns = [...mapData.spawns].sort(() => Math.random() - 0.5);
  const now = performance.now();

  players[me] = {
    id: me,
    name: identity.name,
    skin: identity.skin,
    weapon: 0,
    kills: 0,
    deaths: 0,
    x: spawns[0][0], y: spawns[0][1],
    angle: 0, health: 100,
    reloadEnd: 0, lastShot: 0, swapEnd: 0,
    shieldUntil: now + 1400,
    rx: spawns[0][0], ry: spawns[0][1]
  };

  const usedSkins = [identity.skin];
  const diff = DIFFS[diffIdx];
  const botWeapons = [1, 0, 2];
  const PREF_DIST = [480, 200, 420];
  for (let i = 0; i < diff.bots; i++) {
    let sk = Math.floor(Math.random() * SKINS.length);
    while (usedSkins.includes(sk)) sk = (sk + 1) % SKINS.length;
    usedSkins.push(sk);
    const bw = botWeapons[i % 3];
    const s = spawns[i + 1];
    const bot = makeBot(BOT_NAMES[i % BOT_NAMES.length], sk, bw, PREF_DIST[bw], s, now);
    players[bot.id] = bot;
  }

  ammo = { weapon: 0, mags: [8, 4, 1], magSize: 8, reloading: false, reloadMs: 1100 };
  stamina = 100;
  exhausted = false;
  lastSpPct = -1;
  updateStaminaBar();
  renderAmmo();

  $("lobby").classList.add("hidden");
  $("party").classList.add("hidden");
  $("results").classList.add("hidden");
  $("hud").classList.remove("hidden");
  document.body.classList.add("ingame");
  $("roomText").textContent = "ANTRENMAN";
  $("pingChip").style.display = "none";
  $("chatTab").classList.add("hidden");
  closeChat();
  setHp(100);
  $("killText").textContent = "0";
  $("killfeed").innerHTML = "";
  matchCups = 0;
  $("cupText").textContent = "0";
  $("cupChip").classList.add("hidden");
  $("timerChip").classList.toggle("hidden", !matchEndsAt);
  $("limitChip").classList.toggle("hidden", !killLimit);
  $("limitText").textContent = "0 / " + killLimit;

  lastFrame = performance.now();
  requestAnimationFrame(frame);
}

function endLocal(reason) {
  if (matchEnded) return;
  matchEnded = true;
  running = false;
  const rankings = Object.values(players)
    .map(p => ({ id: p.id, name: p.name, kills: p.kills || 0, deaths: p.deaths || 0 }))
    .sort((a, b) => b.kills - a.kills);
  $("hud").classList.add("hidden");
  document.body.classList.remove("ingame");
  showResults(rankings, reason, "sp");
}

function togglePause(force) {
  if (!running) return;
  paused = force !== undefined ? force : !paused;
  $("pause").classList.toggle("hidden", !paused);
  if (paused) {
    if (localGame) {
      $("pauseTitle").textContent = "DURAKLATILDI";
      $("pauseSub").textContent = "Zorluk seçebilirsin. Devam için ESC.";
      $("diffBox").style.display = "";
      const d = DIFFS[diffIdx];
      $("diffHint").textContent = d.bots + " bot · hız " + d.speed + " · ortalama tepki " + Math.round((d.reactMin + d.reactMax) / 2) + "ms";
    } else {
      $("pauseTitle").textContent = "MENÜ";
      $("pauseSub").textContent = "Oyun arkada devam ediyor — ODA " + room;
      $("diffBox").style.display = "none";
    }
  }
}

function leaveMatch() {
  paused = false;
  $("pause").classList.add("hidden");
  $("leaveWarn").classList.add("hidden");
  $("scoreboard").classList.add("hidden");
  if (!localGame) socket.emit("leave");
  backToLobby();
}

function requestLeave() {
  if (!localGame && !isParty && matchCups > 0) {
    $("leaveWarnText").textContent = "Bu maçtan " + matchCups + " kupa kazanacaksın. Şimdi çıkarsan kupalar kaydedilmez.";
    $("leaveWarn").classList.remove("hidden");
    return;
  }
  leaveMatch();
}

function buildScoreboard() {
  const body = $("sbBody");
  body.innerHTML = "";
  const list = Object.values(players).sort((a, b) => (b.kills || 0) - (a.kills || 0));
  list.forEach((p, i) => {
    const tr = document.createElement("tr");
    if (p.id === me) tr.className = "me";
    tr.innerHTML =
      "<td>" + (i + 1) + "</td>" +
      '<td><span class="pname"></span>' + (p.id === me ? ' <span class="you">(YOU)</span>' : "") + "</td>" +
      "<td>" + (p.kills || 0) + "</td>" +
      "<td>" + (p.deaths || 0) + "</td>";
    tr.querySelector(".pname").textContent = p.name;
    body.appendChild(tr);
  });
}

function showScoreboard(show) {
  if (show) {
    buildScoreboard();
    $("scoreboard").classList.remove("hidden");
  } else {
    $("scoreboard").classList.add("hidden");
  }
}

setInterval(() => {
  if (socket.connected) socket.emit("ping", Date.now());
}, 1000);

socket.on("pong", t => {
  ping = Date.now() - t;
  const el = $("pingText");
  el.textContent = ping + "ms";
  el.style.color = pingColor(ping);
  if (ping > 0) socket.emit("pingReport", ping);
});

function pingColor(ms) {
  return ms <= 60 ? "#4ade80" : ms <= 120 ? "#facc15" : "#f87171";
}

function localShoot(p, angle, now) {
  const isMe = p.id === me;
  const wid = isMe ? ammo.weapon : p.weapon;
  const w = WEAPONS[wid];

  if (now - (p.lastShot || 0) < w.fireMs) return;
  if ((p.reloadEnd || 0) > now) return;
  if (isMe && (p.swapEnd || 0) > now) return;

  if (isMe) {
    if (ammo.mags[wid] <= 0) {
      startLocalReload(now);
      return;
    }
  } else if (p.mag <= 0) {
    p.reloadEnd = now + w.reloadMs;
    return;
  }

  const sx = p.x + Math.cos(angle) * 30;
  const sy = p.y + Math.sin(angle) * 30;
  if (pointInWall(sx, sy, 4)) {
    p.lastShot = now;
    return;
  }

  p.lastShot = now;
  p.angle = angle;

  const life = w.range / w.speed;
  for (let i = 0; i < w.pellets; i++) {
    const off = w.pellets > 1
      ? (i / (w.pellets - 1) - 0.5) * 2 * w.spread + (Math.random() - 0.5) * 0.04
      : 0;
    const a2 = angle + off;
    bullets.push({
      id: localNextBullet++,
      mine: p.id,
      owner: p.id,
      w: wid,
      x: sx, y: sy,
      vx: Math.cos(a2) * w.speed,
      vy: Math.sin(a2) * w.speed,
      life, life0: life
    });
  }

  if (isMe) {
    ammo.mags[wid] = Math.max(0, ammo.mags[wid] - 1);
    renderAmmo();
    spawnParticles(sx, sy, "#facc15", w.pellets > 1 ? 5 : 3, 120);
    shotSound(w);
    if (w.id === 2) shake = Math.max(shake, 3);
    if (ammo.mags[wid] === 0) startLocalReload(now);
  } else {
    p.mag--;
    if (p.mag <= 0) p.reloadEnd = now + w.reloadMs;
  }
}

function startLocalReload(now) {
  const p = players[me];
  if (!p || p.health <= 0 || ammo.reloading) return;
  const w = WEAPONS[ammo.weapon];
  if (ammo.mags[ammo.weapon] >= w.mag) return;
  p.reloadEnd = now + w.reloadMs;
  ammo.reloading = true;
  ammo.reloadMs = w.reloadMs;
  reloadStart = now;
  renderAmmo();
}

function localKill(victim, killer) {
  victim.health = 0;
  victim.deaths = (victim.deaths || 0) + 1;
  addFeed(killer ? killer.name : "??", victim.name, !!(killer && killer.id === me));

  if (killer) {
    killer.kills = (killer.kills || 0) + 1;
    if (killer.id === me) {
      $("killText").textContent = killer.kills;
      if (killLimit) $("limitText").textContent = killer.kills + " / " + killLimit;
      sfx(660, 0.07, "square", 0.15);
      setTimeout(() => sfx(880, 0.09, "square", 0.15), 80);
      if (killLimit && killer.kills >= killLimit) {
        setTimeout(() => endLocal("limit"), 900);
      }
    }
  }

  if (victim.id === me) {
    setHp(0);
    $("killerText").textContent = killer ? killer.name + " seni eledi" : "Yeniden doğuyorsun...";
    $("death").classList.remove("hidden");
    setTimeout(() => $("death").classList.add("hidden"), 900);
    sfx(110, 0.3, "sawtooth", 0.2);
  }

  localRespawns.push({ id: victim.id, at: performance.now() + 900 });
}

function pickSpawn() {
  let best = mapData.spawns[0];
  let bestD = -1;
  for (const s of mapData.spawns) {
    let minD = Infinity;
    for (const t of Object.values(players)) {
      if (t.health <= 0) continue;
      minD = Math.min(minD, Math.hypot(t.x - s[0], t.y - s[1]));
    }
    if (minD > bestD) {
      bestD = minD;
      best = s;
    }
  }
  return best;
}

function losClear(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  const steps = Math.ceil(dist / 24);
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    if (pointInWall(x1 + dx * t, y1 + dy * t, 6)) return false;
  }
  return true;
}

function updateBot(b, dt, now) {
  if (!b.target || b.target.health <= 0 || now > b.retargetAt) {
    let best = null;
    let bd = Infinity;
    for (const t of Object.values(players)) {
      if (t.id === b.id || t.health <= 0) continue;
      const d = (t.x - b.x) * (t.x - b.x) + (t.y - b.y) * (t.y - b.y);
      if (d < bd) {
        bd = d;
        best = t;
      }
    }
    if (best && best !== b.target) {
      const d = DIFFS[diffIdx];
      b.reactUntil = now + d.reactMin + Math.random() * (d.reactMax - d.reactMin);
    }
    b.target = best;
    b.retargetAt = now + 800;
    b.aimNoise = (Math.random() - 0.5) * DIFFS[diffIdx].noise;
    const dist = Math.sqrt(bd);
    const pref = b.prefDist || 480;
    b.mode = dist > pref + 160 ? "chase" : dist < pref - 140 ? "flee" : "strafe";
    b.strafeDir = Math.random() < 0.5 ? 1 : -1;
  }

  const t = b.target;
  let mvx = 0;
  let mvy = 0;

  if (t) {
    const dx = t.x - b.x;
    const dy = t.y - b.y;
    const dist = Math.hypot(dx, dy) || 1;
    const nx = dx / dist;
    const ny = dy / dist;

    if (b.mode === "chase") { mvx = nx; mvy = ny; }
    else if (b.mode === "flee") { mvx = -nx; mvy = -ny; }
    else { mvx = -ny * b.strafeDir; mvy = nx * b.strafeDir; }
    mvx += nx * 0.25;
    mvy += ny * 0.25;

    const want = Math.atan2(dy, dx) + b.aimNoise;
    let diff = want - b.angle;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    b.angle += diff * Math.min(1, dt * 6);

    const los = losClear(b.x, b.y, t.x, t.y);
    if (los && !b.hadLos) {
      const d = DIFFS[diffIdx];
      b.reactUntil = Math.max(b.reactUntil, now + d.reactMin * 0.6 + Math.random() * d.reactMax * 0.5);
    }
    b.hadLos = los;

    const bw = WEAPONS[b.weapon !== undefined ? b.weapon : 0];
    const maxEngage = bw.range * 0.85;
    if (los && dist < maxEngage && (b.weapon !== 2 || dist > 200) && now > b.reactUntil && Math.abs(diff) < 0.22 &&
        b.reloadEnd <= now && b.mag > 0 && now - (b.lastShot || 0) > Math.max(180, DIFFS[diffIdx].fireMs)) {
      localShoot(b, b.angle, now);
      if (Math.random() < 0.15) b.lastShot = now + 250 + Math.random() * 450;
    }
  } else {
    if (now > b.wanderAt) {
      b.wanderAngle = Math.random() * Math.PI * 2;
      b.wanderAt = now + 1200 + Math.random() * 1500;
    }
    mvx = Math.cos(b.wanderAngle) * 0.6;
    mvy = Math.sin(b.wanderAngle) * 0.6;
    b.angle += ((b.wanderAngle - b.angle + Math.PI * 3) % (Math.PI * 2) - Math.PI) * Math.min(1, dt * 3);
  }

  if (b.unstickUntil > now) {
    mvx = Math.cos(b.unstickAngle);
    mvy = Math.sin(b.unstickAngle);
  }

  const ml = Math.hypot(mvx, mvy);
  if (ml > 0.01) {
    const sp = DIFFS[diffIdx].speed;
    const px = b.x;
    const py = b.y;
    let nx = Math.max(25, Math.min(mapData.w - 25, b.x + (mvx / ml) * sp * dt));
    let ny = Math.max(25, Math.min(mapData.h - 25, b.y + (mvy / ml) * sp * dt));
    const res = resolveWalls(nx, ny, PLAYER_R + 2);
    b.x = res[0];
    b.y = res[1];
    const moved = Math.hypot(b.x - px, b.y - py);
    if (moved < sp * dt * 0.3) b.stuckT += dt;
    else b.stuckT = 0;
    if (b.stuckT > 0.5) {
      b.stuckT = 0;
      b.unstickUntil = now + 600;
      b.unstickAngle = Math.random() * Math.PI * 2;
    }
  }

  if (b.reloadEnd > 0 && now >= b.reloadEnd) {
    b.mag = WEAPONS[b.weapon].mag;
    b.reloadEnd = 0;
  }
  if (b.mag <= 0 && b.reloadEnd <= now) {
    b.reloadEnd = now + WEAPONS[b.weapon].reloadMs;
  }
}

function explodeLocal(bl) {
  const w = WEAPONS[2];
  const now = performance.now();
  boomFx(bl.x, bl.y, w.splash);

  for (const t of Object.values(players)) {
    if (t.health <= 0) continue;
    if ((t.shieldUntil || 0) > now) continue;
    const d = Math.hypot(t.x - bl.x, t.y - bl.y);
    if (d <= w.splash + 19) {
      const fall = 1 - Math.min(1, d / w.splash) * 0.6;
      t.lastHit = now;
      t.health = Math.max(0, Math.round(t.health - w.dmg * fall));
      spawnParticles(t.x, t.y, "#f87171", 4, 130);
      if (t.id === me) {
        setHp(Math.max(0, t.health));
        const v = $("vignette");
        v.classList.remove("hit");
        void v.offsetWidth;
        v.classList.add("hit");
        shake = Math.max(shake, 10);
        sfx(300, 0.08, "sawtooth", 0.14);
      }
      if (bl.owner === me && t.id !== me) {
        hitmarkUntil = now + 140;
        sfx(950, 0.05, "sine", 0.16);
      }
      if (t.health <= 0) localKill(t, players[bl.owner]);
    }
  }
}

function updateLocal(dt, now) {
  for (const b of Object.values(players)) {
    if (b.id !== me && b.health > 0) updateBot(b, dt, now);
  }

  for (const bl of bullets) {
    bl.x += bl.vx * dt;
    bl.y += bl.vy * dt;
    bl.life -= dt;

    if (bl.w === 2 && now - (bl._sm || 0) > 40) {
      bl._sm = now;
      particles.push({
        x: bl.x, y: bl.y,
        vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 0.5) * 30,
        life: 0.45, size: 4.5, color: "#565d68"
      });
    }

    let deadB = bl.life <= 0 || bl.x < 0 || bl.y < 0 || bl.x > mapData.w || bl.y > mapData.h || pointInWall(bl.x, bl.y, 3);

    if (!deadB) {
      for (const t of Object.values(players)) {
        if (t.id === bl.owner || t.health <= 0) continue;
        if ((t.shieldUntil || 0) > now) continue;

        const ddx = t.x - bl.x;
        const ddy = t.y - bl.y;
        if (ddx * ddx + ddy * ddy <= 26 * 26) {
          deadB = true;
          if (bl.w !== 2) {
            const wdef = WEAPONS[bl.w];
            let dmg = wdef.dmg;
            if (wdef.falloff) {
              const traveled = (bl.life0 - bl.life) * wdef.speed;
              const t2 = Math.min(1, Math.max(0, traveled / wdef.range));
              dmg = wdef.dmg * (1 - wdef.falloff * t2);
            }
            t.lastHit = now;
            t.health = Math.max(0, Math.round(t.health - dmg));
            spawnParticles(t.x, t.y, "#f87171", 5, 130);

            if (t.id === me) {
              setHp(Math.max(0, t.health));
              const v = $("vignette");
              v.classList.remove("hit");
              void v.offsetWidth;
              v.classList.add("hit");
              shake = Math.max(shake, 5);
              sfx(300, 0.08, "sawtooth", 0.14);
            }
            if (bl.owner === me) {
              hitmarkUntil = now + 140;
              sfx(950, 0.05, "sine", 0.16);
            }
            if (t.health <= 0) localKill(t, players[bl.owner]);
          }
          break;
        }
      }
    }

    if (deadB) {
      bl.dead = true;
      if (bl.w === 2) {
        explodeLocal(bl);
      } else {
        spawnParticles(bl.x, bl.y, "#9aa0ab", 3, 90);
      }
    }
  }
  bullets = bullets.filter(b => !b.dead);

  for (const p of Object.values(players)) {
    if (p.health > 0 && p.health < 100 && now - (p.lastHit || 0) > 3000) {
      p.health = Math.min(100, Math.round(p.health + 15 * dt));
      if (p.id === me) setHp(p.health);
    }
  }

  for (let i = localRespawns.length - 1; i >= 0; i--) {
    if (now < localRespawns[i].at) continue;
    const rp = players[localRespawns[i].id];
    if (rp) {
      const s = pickSpawn();
      rp.x = s[0];
      rp.y = s[1];
      rp.rx = s[0];
      rp.ry = s[1];
      rp.health = 100;
      rp.reloadEnd = 0;
      rp.shieldUntil = now + 1400;
      if (rp.id === me) {
        ammo.mags = [8, 4, 1];
        ammo.reloading = false;
        stamina = 100;
        exhausted = false;
        lastSpPct = -1;
        updateStaminaBar();
        setHp(100);
        renderAmmo();
      } else {
        rp.mag = WEAPONS[rp.weapon].mag;
      }
    }
    localRespawns.splice(i, 1);
  }
}

// ---------------- baslangic ----------------
diffIdx = Math.min(2, Math.max(0, loadLS("diff", 1)));
selMap = Math.min(2, Math.max(0, loadLS("selMap", 0)));
selDur = loadLS("selDur", 300);
selLimit = loadLS("selLimit", 20);
sfxVol = loadLS("vol", 0.8);
updateDiffButtons();

$("resumeBtn").onclick = () => togglePause(false);
$("quitBtn").onclick = () => requestLeave();
$("leaveYes").onclick = () => leaveMatch();
$("leaveNo").onclick = () => $("leaveWarn").classList.add("hidden");

perfMode = !!loadLS("perf", false);
function updatePerfToggle() {
  const btn = $("perfToggle");
  if (btn) {
    btn.textContent = perfMode ? "AÇIK" : "KAPALI";
    btn.classList.toggle("on", perfMode);
  }
}
$("perfToggle").onclick = () => {
  perfMode = !perfMode;
  saveLS("perf", perfMode);
  updatePerfToggle();
};
updatePerfToggle();

sensitivity = loadLS("sens", 1);
$("sensSlider").value = Math.round(sensitivity * 100);
$("sensVal").textContent = sensitivity.toFixed(1);
$("sensSlider").addEventListener("input", e => {
  sensitivity = e.target.value / 100;
  $("sensVal").textContent = sensitivity.toFixed(1);
  saveLS("sens", sensitivity);
});

$("gearBtn").onclick = () => {
  if (running) togglePause();
};

function saveSettings() {
  saveLS("vol", sfxVol);
  saveLS("sens", sensitivity);
  saveLS("perf", perfMode);
  saveLS("diff", diffIdx);
  toast("Ayarlar kaydedildi.");
}
function resetSettings() {
  sfxVol = 0.8;
  sensitivity = 1;
  perfMode = false;
  saveLS("vol", sfxVol);
  saveLS("sens", sensitivity);
  saveLS("perf", perfMode);
  $("volSlider").value = 80;
  $("volVal").textContent = "%80";
  $("sensSlider").value = 100;
  $("sensVal").textContent = "1.0";
  updatePerfToggle();
  toast("Ayarlar sıfırlandı.");
}
$("saveBtn").onclick = saveSettings;
$("resetBtn").onclick = resetSettings;

$("volSlider").value = Math.round(sfxVol * 100);
$("volVal").textContent = "%" + Math.round(sfxVol * 100);
$("volSlider").addEventListener("input", e => {
  sfxVol = e.target.value / 100;
  $("volVal").textContent = "%" + e.target.value;
  saveLS("vol", sfxVol);
});

document.querySelectorAll(".diff-btn").forEach(btn => {
  btn.onclick = () => {
    applyDifficulty(Number(btn.dataset.d));
    const d = DIFFS[diffIdx];
    $("diffHint").textContent = d.bots + " bot · hız " + d.speed + " · ortalama tepki " + Math.round((d.reactMin + d.reactMax) / 2) + "ms";
  };
});

renderSkins();
renderFriends();

if (STATIC) {
  mapsCatalog = STATIC_MAPS;
  pendingMap = selMap;
  setMap(pendingMap);
  buildSettings();

  const note = document.createElement("p");
  note.className = "static-note";
  note.textContent = "Statik sürüm: yalnızca Tek Oyuncu çalışır. Çok oyunculu için bilgisayarında npm start çalıştır.";
  const left = document.querySelector(".play-left");
  if (left) left.insertBefore(note, left.firstChild);

  ["quickBtn", "createBtn", "joinBtn", "roomInput"].forEach(id => {
    const el = $(id);
    if (el) el.disabled = true;
  });
  document.querySelectorAll('.nav-btn[data-tab="cups"], .nav-btn[data-tab="friends"]').forEach(b => b.disabled = true);
  const cupChip = $("cupsValue").parentElement;
  if (cupChip) cupChip.style.display = "none";
}
