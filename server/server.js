const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  transports: ["websocket"],
  pingInterval: 10000,
  pingTimeout: 15000,
  maxHttpBufferSize: 1e6
});

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});
app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: Math.round(process.uptime()) });
});

const WORLD = { w: 2200, h: 1300 };

const MAPS = [
  {
    name: "SİMETRİK",
    theme: { floor: "#1d232d", grid: "#2a323e", wall: "#3d4654", wallBorder: "#5a6578", border: "#79828f" },
    walls: [
      [900, 60, 400, 70], [900, 1170, 400, 70],
      [330, 320, 110, 280], [1760, 320, 110, 280],
      [1040, 565, 120, 170], [610, 500, 110, 110],
      [1480, 500, 110, 110], [140, 520, 100, 100],
      [1960, 520, 100, 100], [140, 940, 280, 70],
      [1780, 940, 280, 70]
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
      [900, 60, 400, 70], [900, 1170, 400, 70],
      [330, 320, 110, 280], [1760, 320, 110, 280],
      [1040, 565, 120, 170], [560, 200, 90, 90],
      [1550, 200, 90, 90], [560, 1010, 90, 90],
      [1550, 1010, 90, 90], [140, 520, 100, 260],
      [1960, 520, 100, 260], [140, 940, 280, 70],
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
      [900, 60, 400, 70], [900, 1170, 400, 70],
      [1040, 565, 120, 170], [330, 420, 110, 460],
      [1760, 420, 110, 460]
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
      [380, 180, 90, 90], [1730, 180, 90, 90],
      [1100, 220, 90, 90],
      [380, 930, 90, 90], [1730, 930, 90, 90],
      [1100, 970, 90, 90],
      [180, 540, 90, 90], [1930, 540, 90, 90],
      [1050, 500, 200, 200]
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

// 0: Tabanca, 1: Pompali, 2: Bazuka
const WEAPONS = [
  { id: 0, name: "Tabanca", mag: 8, dmg: 24, falloff: 0.15, pellets: 1, spread: 0, speed: 850, range: 520, fireMs: 160, reloadMs: 1100 },
  { id: 1, name: "Pompalı", mag: 4, dmg: 16, falloff: 0.7, pellets: 6, spread: 0.2, speed: 700, range: 340, fireMs: 750, reloadMs: 1400 },
  { id: 2, name: "Bazuka", mag: 1, dmg: 65, falloff: 0, pellets: 1, spread: 0, speed: 520, range: 700, fireMs: 1100, reloadMs: 1800, splash: 130 }
];
const SWAP_MS = 600;

const MAX_PLAYERS = 10;
const HIT_R = 26;
const SHIELD_MS = 1400;
const RESPAWN_MS = 900;

const DURS = [0, 120, 300, 480];
const LIMITS = [0, 10, 20, 30];

const rooms = new Map();
const presence = new Map();

// ---------------- kupa istatistikleri (kalici) ----------------
const DATA_FILE = path.join(__dirname, "data.json");
const stats = new Map();
try {
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  for (const k of Object.keys(raw)) stats.set(k, raw[k]);
} catch (e) {}

let saveTimer = null;
function persist() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    const out = {};
    for (const [k, v] of stats) out[k] = v;
    try { fs.writeFileSync(DATA_FILE, JSON.stringify(out)); } catch (e) {}
  }, 2000);
}

function statOf(name) {
  const key = String(name).toLowerCase();
  let s = stats.get(key);
  if (!s) {
    s = { name, cups: 0, kills: 0, deaths: 0 };
    stats.set(key, s);
  }
  s.name = name;
  return s;
}

// ---------------- geometri ----------------
function resolveWalls(x, y, r, walls) {
  for (const [wx, wy, ww, wh] of walls) {
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
  x = Math.max(25, Math.min(WORLD.w - 25, x));
  y = Math.max(25, Math.min(WORLD.h - 25, y));
  return [x, y];
}

function pointInWall(x, y, pad, walls) {
  pad = pad || 0;
  for (const [wx, wy, ww, wh] of walls) {
    if (x > wx - pad && x < wx + ww + pad && y > wy - pad && y < wy + wh + pad) return true;
  }
  return false;
}

// ---------------- odalar ----------------
function genCode() {
  let code;
  do {
    code = Math.random().toString(36).slice(2, 8).toUpperCase();
  } while (rooms.has(code));
  return code;
}

function newRoom(code, opts) {
  return {
    code,
    state: opts.state || "waiting",
    leader: opts.leader || null,
    isParty: !!opts.isParty,
    map: opts.map,
    durationSec: opts.durationSec,
    killLimit: opts.killLimit,
    endsAt: 0,
    players: new Map(),
    scores: {},
    deaths: {},
    bullets: [],
    nextBullet: 1
  };
}

function publicPlayers(r) {
  const out = {};
  const now = Date.now();
  for (const [id, p] of r.players) {
    out[id] = {
      id: p.id,
      name: p.name,
      skin: p.skin,
      weapon: p.weapon,
      x: p.x,
      y: p.y,
      angle: p.angle,
      health: p.health,
      ping: p.ping || 0,
      kills: r.scores[p.id] || 0,
      deaths: r.deaths[p.id] || 0,
      shield: p.shieldUntil > now
    };
  }
  return out;
}

function partyInfo(r) {
  return {
    code: r.code,
    leader: r.leader,
    state: r.state,
    players: [...r.players.values()].map(p => ({ id: p.id, name: p.name, skin: p.skin })),
    settings: {
      map: r.map,
      mapName: MAPS[r.map].name,
      durationSec: r.durationSec,
      killLimit: r.killLimit
    }
  };
}

function startedPayload(r) {
  return {
    code: r.code,
    map: r.map,
    durationMs: r.endsAt ? Math.max(0, r.endsAt - Date.now()) : 0,
    killLimit: r.killLimit,
    party: r.isParty
  };
}

function spawnPlayer(p, map) {
  const spawns = MAPS[map].spawns;
  const s = spawns[Math.floor(Math.random() * spawns.length)];
  p.x = s[0];
  p.y = s[1];
  p.health = 100;
  p.angle = p.angle || 0;
  p.mags = [WEAPONS[0].mag, WEAPONS[1].mag, WEAPONS[2].mag];
  p.reloadEnd = 0;
  p.lastShot = 0;
  p.swapEnd = 0;
  p.shieldUntil = Date.now() + SHIELD_MS;
}

function emitAmmo(p) {
  const w = WEAPONS[p.weapon];
  io.to(p.id).emit("ammo", {
    weapon: p.weapon,
    mags: p.mags,
    magSize: w.mag,
    reloading: p.reloadEnd > Date.now(),
    reloadMs: w.reloadMs
  });
}

function startReload(p) {
  const now = Date.now();
  const w = WEAPONS[p.weapon];
  if (p.mags[p.weapon] >= w.mag || p.reloadEnd > now) return;
  p.reloadEnd = now + w.reloadMs;
  emitAmmo(p);
  setTimeout(() => {
    if (p.reloadEnd === 0) return;
    p.reloadEnd = 0;
    p.mags[p.weapon] = w.mag;
    emitAmmo(p);
  }, w.reloadMs);
}

function enterRoom(socket, code, name, skin) {
  const r = rooms.get(code);
  if (!r) return;

  const p = {
    id: socket.id,
    name,
    skin,
    weapon: 0,
    mags: [WEAPONS[0].mag, WEAPONS[1].mag, WEAPONS[2].mag],
    x: 1100,
    y: 400,
    angle: 0,
    health: 100,
    reloadEnd: 0,
    lastShot: 0,
    swapEnd: 0,
    ping: 0,
    pendCups: 0,
    pendKills: 0,
    pendDeaths: 0,
    shieldUntil: 0
  };

  r.players.set(socket.id, p);
  if (!(socket.id in r.scores)) r.scores[socket.id] = 0;

  socket.join(code);
  socket.data.room = code;
  presence.set(socket.id, { name, room: code });

  const st = statOf(name);
  persist();
  socket.emit("cupsYou", { cups: st.cups, kills: st.kills, deaths: st.deaths });

  if (r.state === "playing") {
    spawnPlayer(p, r.map);
    socket.emit("started", Object.assign({ id: socket.id }, startedPayload(r)));
    io.to(code).emit("state", publicPlayers(r));
  } else {
    io.to(code).emit("party", partyInfo(r));
  }
  io.to(code).emit("scores", r.scores);
}

function leaveRoom(socket) {
  const code = socket.data.room;
  const r = rooms.get(code);
  presence.delete(socket.id);
  socket.data.room = null;

  if (!r) return;

  const p = r.players.get(socket.id);
  if (p && r.state === "playing" && !r.isParty) {
    const s = statOf(p.name);
    socket.emit("cupsYou", { cups: s.cups, matchCups: 0 });
  }

  r.players.delete(socket.id);
  delete r.scores[socket.id];
  delete r.deaths[socket.id];

  if (r.players.size === 0) {
    rooms.delete(code);
    return;
  }

  if (r.leader === socket.id) {
    r.leader = r.players.keys().next().value;
  }

  if (r.state === "waiting") {
    io.to(code).emit("party", partyInfo(r));
  } else {
    io.to(code).emit("state", publicPlayers(r));
  }
  io.to(code).emit("scores", r.scores);
}

// ---------------- socket ----------------
io.on("connection", socket => {
  socket.emit("maps", {
    world: WORLD,
    maps: MAPS.map(m => ({ name: m.name, walls: m.walls, spawns: m.spawns, theme: m.theme }))
  });

  socket.on("quickPlay", ({ name, skin }) => {
    if (socket.data.room) leaveRoom(socket);
    name = String(name || "Oyuncu").slice(0, 16);
    skin = Number(skin) || 0;

    for (const [code, r] of rooms) {
      if (r.state === "playing" && !r.isParty && r.players.size < MAX_PLAYERS) {
        enterRoom(socket, code, name, skin);
        return;
      }
    }

    const code = genCode();
    rooms.set(code, newRoom(code, {
      state: "playing",
      leader: socket.id,
      isParty: false,
      map: Math.floor(Math.random() * MAPS.length),
      durationSec: 300,
      killLimit: 20
    }));
    const r = rooms.get(code);
    r.endsAt = Date.now() + r.durationSec * 1000;
    enterRoom(socket, code, name, skin);
  });

  socket.on("createParty", ({ name, skin, map, durationSec, killLimit }) => {
    if (socket.data.room) leaveRoom(socket);
    name = String(name || "Oyuncu").slice(0, 16);
    skin = Number(skin) || 0;
    map = Number.isInteger(map) && map >= 0 && map < MAPS.length ? map : 0;
    durationSec = DURS.includes(durationSec) ? durationSec : 300;
    killLimit = LIMITS.includes(killLimit) ? killLimit : 20;

    const code = genCode();
    rooms.set(code, newRoom(code, {
      state: "playing",
      leader: socket.id,
      isParty: true,
      map,
      durationSec,
      killLimit
    }));
    const r = rooms.get(code);
    r.endsAt = r.durationSec > 0 ? Date.now() + r.durationSec * 1000 : 0;
    enterRoom(socket, code, name, skin);
  });

  socket.on("join", ({ room, name, skin }) => {
    room = String(room || "").toUpperCase();
    name = String(name || "Oyuncu").slice(0, 16);
    skin = Number(skin) || 0;

    if (!rooms.has(room)) {
      socket.emit("errorMsg", "Bu oda bulunamadı.");
      return;
    }

    const r = rooms.get(room);
    if (r.players.size >= MAX_PLAYERS) {
      socket.emit("errorMsg", "Oda dolu.");
      return;
    }

    if (socket.data.room) leaveRoom(socket);
    enterRoom(socket, room, name, skin);
  });

  socket.on("start", () => {
    const r = rooms.get(socket.data.room);
    if (!r || r.state !== "waiting") return;

    r.state = "playing";
    r.endsAt = r.durationSec > 0 ? Date.now() + r.durationSec * 1000 : 0;
    r.scores = {};
    r.deaths = {};
    const spawns = [...MAPS[r.map].spawns].sort(() => Math.random() - 0.5);
    let i = 0;
    for (const p of r.players.values()) {
      p.pendCups = 0;
      p.pendKills = 0;
      p.pendDeaths = 0;
      spawnPlayer(p, r.map);
      p.x = spawns[i % spawns.length][0];
      p.y = spawns[i % spawns.length][1];
      i++;
    }

    io.to(r.code).emit("started", Object.assign({ id: null }, startedPayload(r)));
    io.to(r.code).emit("state", publicPlayers(r));
    io.to(r.code).emit("scores", r.scores);
  });

  socket.on("leave", () => leaveRoom(socket));

  socket.on("move", ({ x, y, angle }) => {
    const r = rooms.get(socket.data.room);
    const p = r && r.players.get(socket.id);
    if (!p || r.state !== "playing" || p.health <= 0) return;

    x = Number(x);
    y = Number(y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;

    const res = resolveWalls(x, y, 21, MAPS[r.map].walls);
    p.x = res[0];
    p.y = res[1];

    angle = Number(angle);
    if (Number.isFinite(angle)) p.angle = angle;
  });

  socket.on("shoot", ({ angle }) => {
    const r = rooms.get(socket.data.room);
    const p = r && r.players.get(socket.id);
    if (!r || r.state !== "playing" || !p || p.health <= 0) return;

    const now = Date.now();
    angle = Number(angle);
    if (!Number.isFinite(angle)) return;

    const w = WEAPONS[p.weapon];
    if (now - p.lastShot < w.fireMs) return;
    if (p.reloadEnd > now) return;
    if (p.swapEnd > now) return;
    if (p.mags[p.weapon] <= 0) {
      startReload(p);
      return;
    }

    const sx = p.x + Math.cos(angle) * 30;
    const sy = p.y + Math.sin(angle) * 30;
    if (pointInWall(sx, sy, 4, MAPS[r.map].walls)) {
      p.lastShot = now;
      return;
    }

    p.lastShot = now;
    p.angle = angle;
    p.mags[p.weapon]--;

    for (let i = 0; i < w.pellets; i++) {
      const off = w.pellets > 1
        ? (i / (w.pellets - 1) - 0.5) * 2 * w.spread + (Math.random() - 0.5) * 0.04
        : 0;
      const a2 = angle + off;
      const life = w.range / w.speed;
      r.bullets.push({
        id: r.nextBullet++,
        owner: socket.id,
        ownerName: p.name,
        w: p.weapon,
        x: sx,
        y: sy,
        vx: Math.cos(a2) * w.speed,
        vy: Math.sin(a2) * w.speed,
        life,
        life0: life
      });
    }

    emitAmmo(p);

    if (p.mags[p.weapon] === 0) startReload(p);
  });

  socket.on("switchWeapon", ({ slot }) => {
    const r = rooms.get(socket.data.room);
    const p = r && r.players.get(socket.id);
    if (!r || r.state !== "playing" || !p || p.health <= 0) return;

    slot = Number(slot);
    if (!Number.isInteger(slot) || slot < 0 || slot > 2) return;
    if (slot === p.weapon) return;

    p.weapon = slot;
    p.reloadEnd = 0;
    p.swapEnd = Date.now() + SWAP_MS;
    emitAmmo(p);
  });

  socket.on("reload", () => {
    const r = rooms.get(socket.data.room);
    const p = r && r.players.get(socket.id);
    if (!r || r.state !== "playing" || !p || p.health <= 0) return;
    startReload(p);
  });

  socket.on("chat", ({ text }) => {
    const r = rooms.get(socket.data.room);
    const p = r && r.players.get(socket.id);
    if (!r || !p) return;

    const now = Date.now();
    if (now - (socket.data.lastChat || 0) < 400) return;
    socket.data.lastChat = now;

    text = String(text || "").slice(0, 80).trim();
    if (!text) return;

    io.to(r.code).emit("chat", { name: p.name, text });
  });

  socket.on("ping", t => {
    socket.emit("pong", t);
  });

  socket.on("pingReport", ms => {
    const r = rooms.get(socket.data.room);
    const p = r && r.players.get(socket.id);
    if (!p) return;
    ms = Number(ms);
    if (Number.isFinite(ms)) p.ping = Math.max(0, Math.min(9999, Math.round(ms)));
  });

  socket.on("friendsCheck", ({ names }) => {
    if (!Array.isArray(names)) return;
    const list = names.slice(0, 50).map(n => {
      const e = [...presence.values()].find(pr => pr.name.toLowerCase() === String(n).toLowerCase());
      return {
        name: e ? e.name : String(n),
        online: !!e,
        room: e ? e.room : null
      };
    });
    socket.emit("friendsStatus", list);
  });

  socket.on("leaderboard", () => {
    const top = [...stats.values()]
      .sort((a, b) => b.cups - a.cups || b.kills - a.kills)
      .slice(0, 10)
      .map(s => ({ name: s.name, cups: s.cups, kills: s.kills }));
    socket.emit("leaderboard", top);
  });

  socket.on("disconnect", () => leaveRoom(socket));
});

// ---------------- oyun dongusu ----------------
function applyDamage(code, r, target, dmg, shooterId, direct) {
  if (target.health <= 0) return;

  target.lastHit = Date.now();
  target.health = Math.max(0, Math.round(target.health - dmg));
  io.to(code).emit("damaged", { id: target.id, health: target.health });

  if (direct && shooterId && shooterId !== target.id) {
    io.to(shooterId).emit("hitConfirm", { x: target.x, y: target.y });
  }

  if (target.health > 0) return;

  const selfKill = shooterId === target.id;
  const shooter = selfKill ? target : r.players.get(shooterId);

  if (!selfKill && shooter) {
    r.scores[shooterId] = (r.scores[shooterId] || 0) + 1;
  }
  r.deaths[target.id] = (r.deaths[target.id] || 0) + 1;

  if (!r.isParty) {
    if (shooter && !selfKill) {
      shooter.pendKills = (shooter.pendKills || 0) + 1;
      shooter.pendCups = (shooter.pendCups || 0) + 1;
    }
    target.pendDeaths = (target.pendDeaths || 0) + 1;
    target.pendCups = Math.max(0, (target.pendCups || 0) - 1);

    const vs = statOf(target.name);
    io.to(target.id).emit("cupsYou", { cups: vs.cups + target.pendCups, matchCups: target.pendCups });
    if (shooter && !selfKill) {
      const ks = statOf(shooter.name);
      io.to(shooter.id).emit("cupsYou", { cups: ks.cups + shooter.pendCups, matchCups: shooter.pendCups });
    }
  }

  io.to(code).emit("kill", { killer: shooter ? shooter.name : "??", victim: target.name });
  io.to(code).emit("dead", { id: target.id, killer: shooter ? shooter.name : "??" });
  io.to(code).emit("scores", r.scores);
  io.to(code).emit("state", publicPlayers(r));

  setTimeout(() => {
    if (!rooms.has(code)) return;
    const rr = rooms.get(code);
    if (rr.state !== "playing") return;
    const cur = rr.players.get(target.id);
    if (!cur) return;
    spawnPlayer(cur, rr.map);
    io.to(cur.id).emit("ammo", {
      weapon: cur.weapon,
      mags: cur.mags,
      magSize: WEAPONS[cur.weapon].mag,
      reloading: false,
      reloadMs: WEAPONS[cur.weapon].reloadMs
    });
    io.to(code).emit("state", publicPlayers(rr));
  }, RESPAWN_MS);
}

function explode(code, r, b) {
  const w = WEAPONS[b.w];
  const now = Date.now();
  io.to(code).emit("boom", { x: b.x, y: b.y, r: w.splash });

  for (const t of r.players.values()) {
    if (t.health <= 0) continue;
    if (t.shieldUntil > now) continue;
    const d = Math.hypot(t.x - b.x, t.y - b.y);
    if (d <= w.splash + 19) {
      const fall = 1 - Math.min(1, d / w.splash) * 0.6;
      applyDamage(code, r, t, w.dmg * fall, b.owner, false);
    }
  }
}

function endMatch(code, r, reason) {
  if (r.state !== "playing") return;
  r.state = "waiting";
  r.bullets = [];
  r.endsAt = 0;

  if (!r.isParty) {
    for (const p of r.players.values()) {
      if (p.pendKills || p.pendDeaths || p.pendCups) {
        const s = statOf(p.name);
        s.kills += p.pendKills || 0;
        s.deaths += p.pendDeaths || 0;
        s.cups = Math.max(0, s.cups + (p.pendCups || 0));
        p.pendKills = 0;
        p.pendDeaths = 0;
        p.pendCups = 0;
      }
    }
    persist();
  }

  const rankings = [...r.players.values()]
    .map(p => ({ id: p.id, name: p.name, kills: r.scores[p.id] || 0, deaths: r.deaths[p.id] || 0 }))
    .sort((a, b) => b.kills - a.kills);

  r.scores = {};
  r.deaths = {};

  io.to(code).emit("matchEnd", { rankings, reason });
  io.to(code).emit("scores", {});
  io.to(code).emit("party", partyInfo(r));
}

let lastTick = Date.now();
setInterval(() => {
  const now = Date.now();
  let dt = (now - lastTick) / 1000;
  lastTick = now;
  if (dt <= 0 || dt > 0.1) dt = 0.016;

  for (const [code, r] of rooms) {
    if (r.state !== "playing") continue;

    if (r.endsAt && now >= r.endsAt) {
      endMatch(code, r, "time");
      continue;
    }
    if (r.killLimit) {
      let done = false;
      for (const v of Object.values(r.scores)) {
        if (v >= r.killLimit) { done = true; break; }
      }
      if (done) {
        endMatch(code, r, "limit");
        continue;
      }
    }

    const walls = MAPS[r.map].walls;
    const next = [];

    for (const b of r.bullets) {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;

      let dead = b.life <= 0 || b.x < 0 || b.y < 0 || b.x > WORLD.w || b.y > WORLD.h || pointInWall(b.x, b.y, 3, walls);

      if (!dead) {
        for (const t of r.players.values()) {
          if (t.id === b.owner || t.health <= 0) continue;
          if (t.shieldUntil > now) continue;

          const dx = t.x - b.x;
          const dy = t.y - b.y;
          if (dx * dx + dy * dy <= HIT_R * HIT_R) {
          dead = true;
          if (b.w !== 2) {
            const wdef = WEAPONS[b.w];
            let dmg = wdef.dmg;
            if (wdef.falloff) {
              const traveled = (b.life0 - b.life) * wdef.speed;
              const t2 = Math.min(1, Math.max(0, traveled / wdef.range));
              dmg = wdef.dmg * (1 - wdef.falloff * t2);
            }
            applyDamage(code, r, t, dmg, b.owner, true);
          }
          break;
          }
        }
      }

      if (dead) {
        if (b.w === 2) explode(code, r, b);
      } else {
        next.push(b);
      }
    }

    r.bullets = next;

    for (const p of r.players.values()) {
      if (p.health > 0 && p.health < 100 && now - (p.lastHit || 0) > 3000) {
        p.health = Math.min(100, Math.round(p.health + 15 * dt));
      }
    }

    if (now - (r.lastNet || 0) >= 33) {
      r.lastNet = now;
      io.to(code).emit("projectiles", r.bullets.map(b => ({
        id: b.id,
        x: b.x,
        y: b.y,
        vx: b.vx,
        vy: b.vy,
        w: b.w,
        life: b.life,
        life0: b.life0,
        mine: b.owner
      })));

      io.to(code).emit("state", publicPlayers(r));
    }
  }
}, 16);

server.listen(PORT, "0.0.0.0", () => {
  console.log("Forekes running on port " + PORT);
});
