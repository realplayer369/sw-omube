// AWU_WIDGET v1
// Always With You 💙 widget engine for Scriptable.
// This file lives on GitHub Pages. The loader on her iPad downloads it
// every time a widget refreshes, so editing this file updates her widgets.
//
// Widget parameters (set in Edit Widget > Parameter):
//   photo  note  weather  countdown  together  planner  song
//   voice  missme  clock  calendar  links  myspace  rates
//   Add a number to pick which countdown: "countdown 2" is the 2nd soonest.

let BASE = '';
let DATA = null;
let SLOT = 0; // "countdown 2" shows the 2nd soonest, for swiping through a widget stack

// ─────────────────────────────────────────────────────────────
//  THEME (matches the extension's blues)
// ─────────────────────────────────────────────────────────────
const dyn = (light, dark, a = 1) => Color.dynamic(new Color(light, a), new Color(dark, a));
const INK = dyn('#1a2d3f', '#eaf5ff');
const INK_MID = dyn('#4a6a82', '#b3cde2');
const INK_SOFT = dyn('#8aafc8', '#7f9db5');
const ACCENT = dyn('#1f7bbf', '#7ec8f7');
const PINK = dyn('#e46aa9', '#ff9fd0');
const TILE = dyn('#ffffff', '#1d3752', 0.72);
const WHITE = new Color('#ffffff');

const F = {
  r: s => Font.regularRoundedSystemFont(s),
  m: s => Font.mediumRoundedSystemFont(s),
  sb: s => Font.semiboldRoundedSystemFont(s),
  b: s => Font.boldRoundedSystemFont(s),
  h: s => Font.heavyRoundedSystemFont(s),
  script: s => new Font('SnellRoundhand-Bold', s),
  serif: s => new Font('Georgia-Italic', s),
};

function bg(w, style = 'soft') {
  const sets = {
    soft: [['#f4fbff', '#0d1b2a'], ['#cfe9ff', '#15324d']],
    blush: [['#fff5fb', '#1c1526'], ['#d9ecff', '#16283d']],
    deep: [['#7ec8f7', '#1f5f94'], ['#1f7bbf', '#0b2c4a']],
  };
  const g = new LinearGradient();
  g.colors = sets[style].map(([l, d]) => Color.dynamic(new Color(l), new Color(d)));
  g.locations = [0, 1];
  g.startPoint = new Point(0, 0);
  g.endPoint = new Point(1, 1);
  w.backgroundGradient = g;
}

function txt(stack, s, font, color, o = {}) {
  const t = stack.addText(String(s));
  t.font = font;
  t.textColor = color;
  if (o.lines != null) t.lineLimit = o.lines;
  if (o.scale) t.minimumScaleFactor = o.scale;
  if (o.align === 'center') t.centerAlignText();
  if (o.align === 'right') t.rightAlignText();
  if (o.shadow) {
    t.shadowColor = new Color('#000000', 0.4);
    t.shadowRadius = 3;
    t.shadowOffset = new Point(0, 1);
  }
  return t;
}

const eyebrow = (stack, s, color = ACCENT, size = 10) => txt(stack, s.toUpperCase(), F.b(size), color, { lines: 1, scale: 0.7 });

function symbol(stack, name, size, color) {
  const sym = SFSymbol.named(name);
  if (!sym) return null;
  sym.applyFont(Font.systemFont(size));
  const im = stack.addImage(sym.image);
  im.imageSize = new Size(size, size);
  im.tintColor = color;
  return im;
}

async function sticker(stack, name, size) {
  try {
    const img = await fetchCached(`${BASE}stickers/${name}.png`, `sticker_${name}.png`, 'image', 60 * 24 * 30);
    const im = stack.addImage(img);
    im.imageSize = new Size(size, size);
    return im;
  } catch (e) { return null; }
}

// ─────────────────────────────────────────────────────────────
//  NETWORK + CACHE (keeps working offline with the last copy)
// ─────────────────────────────────────────────────────────────
const fm = FileManager.local();
const CACHE = fm.joinPath(fm.cacheDirectory(), 'awu');

async function fetchCached(url, name, kind, maxAgeMin) {
  if (!fm.fileExists(CACHE)) fm.createDirectory(CACHE, true);
  const p = fm.joinPath(CACHE, name.replace(/[^a-z0-9._-]/gi, '_'));
  const read = () => (kind === 'json' ? JSON.parse(fm.readString(p)) : fm.readImage(p));
  if (maxAgeMin > 0 && fm.fileExists(p)) {
    const age = Date.now() - fm.modificationDate(p).getTime();
    if (age < maxAgeMin * 60000) return read();
  }
  try {
    const req = new Request(url);
    req.timeoutInterval = 12;
    if (kind === 'json') {
      const j = await req.loadJSON();
      if (req.response && req.response.statusCode >= 400) throw new Error('HTTP ' + req.response.statusCode);
      fm.writeString(p, JSON.stringify(j));
      return j;
    }
    const img = await req.loadImage();
    fm.writeImage(p, img);
    return img;
  } catch (e) {
    if (fm.fileExists(p)) return read();
    throw e;
  }
}

// ─────────────────────────────────────────────────────────────
//  DATE + TIME HELPERS
// ─────────────────────────────────────────────────────────────
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const startOfDay = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const parseDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const daysBetween = (a, b) => Math.round((startOfDay(b) - startOfDay(a)) / 86400000);
const nextMidnight = () => { const d = startOfDay(new Date()); d.setDate(d.getDate() + 1); return d; };
const minutesFromNow = m => new Date(Date.now() + m * 60000);
const earliest = (...ds) => new Date(Math.min(...ds.map(d => d.getTime())));

function fmtDate(d, pattern) {
  const df = new DateFormatter();
  df.dateFormat = pattern;
  return df.string(d);
}

// Wall-clock parts of `date` in time zone `tz` (null = her iPad's own time)
function tzParts(date, tz) {
  if (!tz) {
    return { y: date.getFullYear(), mo: date.getMonth() + 1, d: date.getDate(), h: date.getHours(), mi: date.getMinutes(), s: date.getSeconds(), wd: date.getDay() };
  }
  try {
    const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23', weekday: 'short' });
    const o = {};
    f.formatToParts(date).forEach(p => { o[p.type] = p.value; });
    return { y: +o.year, mo: +o.month, d: +o.day, h: (+o.hour) % 24, mi: +o.minute, s: +o.second, wd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday) };
  } catch (e) {
    const u = new Date(date.getTime() + (DATA.joshua.utcOffsetFallback || -5) * 3600000);
    return { y: u.getUTCFullYear(), mo: u.getUTCMonth() + 1, d: u.getUTCDate(), h: u.getUTCHours(), mi: u.getUTCMinutes(), s: u.getUTCSeconds(), wd: u.getUTCDay() };
  }
}

// The moment it was last midnight in `tz`. A timer counting up from here
// shows the live time of day in that zone, ticking every second.
function midnightIn(tz) {
  const now = new Date();
  const p = tzParts(now, tz);
  return new Date(now.getTime() - (p.h * 3600 + p.mi * 60 + p.s) * 1000 - now.getMilliseconds());
}

function hoursAhead() {
  const now = new Date();
  const a = tzParts(now, null), b = tzParts(now, DATA.joshua.tz);
  return Math.round((Date.UTC(a.y, a.mo - 1, a.d, a.h, a.mi) - Date.UTC(b.y, b.mo - 1, b.d, b.h, b.mi)) / 3600000);
}

function liveClock(stack, tz, font, color) {
  const d = stack.addDate(midnightIn(tz));
  d.applyTimerStyle();
  d.font = font;
  d.textColor = color;
  return d;
}

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}

function duration(start, now) {
  let y = now.getFullYear() - start.getFullYear();
  let m = now.getMonth() - start.getMonth();
  let d = now.getDate() - start.getDate();
  if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  const parts = [];
  if (y > 0) parts.push(`${y}yr`);
  if (m > 0) parts.push(`${m}mo`);
  parts.push(`${d}d`);
  return parts.join(' ');
}

// ─────────────────────────────────────────────────────────────
//  CONTENT
// ─────────────────────────────────────────────────────────────
const cleanNote = s => s.replace(/^💗\s*/, '').replace(/\s*💗$/, '').trim();

function noteOfDay() {
  const today = ymd(new Date());
  const sp = DATA.specialNote;
  if (sp && sp.text && sp.date === today) return { text: sp.text, special: true };
  return { text: cleanNote(DATA.loveNotes[hashStr(today) % DATA.loveNotes.length]), special: false };
}

function missMeNow() {
  const now = new Date();
  return DATA.missMe[hashStr(ymd(now) + ':' + now.getHours()) % DATA.missMe.length];
}

function milestones() {
  const today = startOfDay(new Date());
  const ty = today.getFullYear();
  return DATA.milestones
    .filter(m => m.date !== '')
    .map(m => {
      let date;
      if (m.date) date = parseDate(m.date);
      else if (m.year === 'next') date = new Date(ty + 1, m.month - 1, m.day);
      else if (typeof m.year === 'number') date = new Date(m.year, m.month - 1, m.day);
      else {
        date = new Date(ty, m.month - 1, m.day);
        if (date < today) date = new Date(ty + 1, m.month - 1, m.day);
      }
      return Object.assign({}, m, { date, days: daysBetween(today, date) });
    })
    .filter(m => !isNaN(m.date) && m.days >= 0)
    .sort((a, b) => a.days - b.days);
}

async function songOfDay() {
  const t = new Date();
  let id;
  const ov = DATA.songOverride;
  if (ov && ov.trackId && ov.date === ymd(t)) id = ov.trackId;
  else {
    // Same formula as the extension, so both show the same song each day
    const seed = t.getFullYear() * 10000 + (t.getMonth() + 1) * 100 + t.getDate();
    let h = seed ^ 0xDEADBEEF;
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = h ^ (h >>> 16);
    id = DATA.playlistTracks[Math.abs(h) % DATA.playlistTracks.length];
  }
  const url = `https://open.spotify.com/track/${id}`;
  // Open the track inside our playlist, so Spotify keeps playing from it after
  const pl = ((DATA.playlistUrl || '').match(/playlist\/(\w+)/) || [])[1];
  const openUrl = pl ? `${url}?context=${encodeURIComponent('spotify:playlist:' + pl)}` : url;
  let info = { title: 'Song of the Day' };
  try { info = await fetchCached(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`, `song_${id}.json`, 'json', 60 * 24 * 30); } catch (e) {}
  let art = null;
  if (info.thumbnail_url) {
    try { art = await fetchCached(info.thumbnail_url, `art_${id}.jpg`, 'image', 60 * 24 * 30); } catch (e) {}
  }
  return { url: openUrl, title: info.title || 'Song of the Day', art };
}

async function weatherFor(p, name) {
  const u = `https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lon}&current=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`;
  return fetchCached(u, name, 'json', 20);
}

function wxInfo(code, isDay) {
  const c = code;
  if (c === 0) return { sym: isDay ? 'sun.max.fill' : 'moon.stars.fill', label: 'Clear', sunny: isDay };
  if (c <= 2) return { sym: isDay ? 'cloud.sun.fill' : 'cloud.moon.fill', label: c === 1 ? 'Mostly clear' : 'Partly cloudy', sunny: isDay };
  if (c === 3) return { sym: 'cloud.fill', label: 'Cloudy' };
  if (c <= 48) return { sym: 'cloud.fog.fill', label: 'Foggy' };
  if (c <= 57) return { sym: 'cloud.drizzle.fill', label: 'Drizzle' };
  if (c <= 67) return { sym: c >= 65 ? 'cloud.heavyrain.fill' : 'cloud.rain.fill', label: 'Rain' };
  if (c <= 77) return { sym: 'cloud.snow.fill', label: 'Snow' };
  if (c <= 82) return { sym: 'cloud.rain.fill', label: 'Showers' };
  if (c <= 86) return { sym: 'cloud.snow.fill', label: 'Snow showers' };
  return { sym: 'cloud.bolt.rain.fill', label: 'Storms' };
}

// Photo filled to the widget's shape with a soft dark fade at the bottom
function composeBackground(img, family, fade = 0.6) {
  const A = { small: [1, 1], medium: [2.13, 1], large: [1, 1.05], extraLarge: [2.13, 1.05] }[family] || [1, 1];
  const H = 700, W = Math.round(H * A[0] / A[1]);
  const ctx = new DrawContext();
  ctx.size = new Size(W, H);
  ctx.opaque = true;
  ctx.respectScreenScale = false;
  const s = Math.max(W / img.size.width, H / img.size.height);
  const dw = img.size.width * s, dh = img.size.height * s;
  ctx.drawImageInRect(img, new Rect((W - dw) / 2, (H - dh) / 2, dw, dh));
  const start = H * 0.45, steps = 40, sh = (H - start) / steps;
  for (let i = 0; i < steps; i++) {
    ctx.setFillColor(new Color('#0b1d30', fade * Math.pow(i / steps, 1.4)));
    ctx.fillRect(new Rect(0, start + sh * i, W, sh + 1));
  }
  return ctx.getImage();
}

// Grid of tappable tiles, columns share the width evenly
function grid(parent, items, cols, o = {}) {
  for (let i = 0; i < items.length; i += cols) {
    const row = parent.addStack();
    row.layoutHorizontally();
    row.spacing = o.gap || 8;
    for (let j = 0; j < cols; j++) {
      const it = items[i + j];
      const tile = row.addStack();
      tile.layoutHorizontally();
      tile.centerAlignContent();
      tile.setPadding(o.padV || 8, 10, o.padV || 8, 8);
      tile.cornerRadius = 12;
      if (it) {
        tile.backgroundColor = TILE;
        tile.url = it.url;
        txt(tile, it.emoji, F.r(o.emoji || 15), INK);
        tile.addSpacer(6);
        txt(tile, it.label, F.sb(o.font || 12), INK, { lines: 1, scale: 0.6 });
      }
      tile.addSpacer();
    }
    if (i + cols < items.length) parent.addSpacer();
  }
}

// ─────────────────────────────────────────────────────────────
//  WIDGETS
// ─────────────────────────────────────────────────────────────
const W = {};

// 📸 Rotating photo of you two
W.photo = async (w, fam) => {
  const hrs = DATA.photoRotateHours || 4, block = hrs * 3600000;
  const slot = Math.floor(Date.now() / block);
  const file = DATA.photos[slot % DATA.photos.length];
  const v = DATA.photoVersion || 1;
  const img = await fetchCached(`${BASE}${file}?v=${v}`, `photo_v${v}_${file}`, 'image', 60 * 24 * 60);
  w.backgroundImage = composeBackground(img, fam);
  w.setPadding(14, 16, 14, 16);
  w.addSpacer();
  const small = fam === 'small';
  txt(w, 'Always With You', F.script(small ? 18 : 28), WHITE, { shadow: true, lines: 1, scale: 0.6 });
  const days = daysBetween(parseDate(DATA.togetherSince), new Date());
  txt(w, `day ${days.toLocaleString()} of us 💙`, F.sb(small ? 11 : 13), new Color('#ffffff', 0.92), { shadow: true, lines: 1 });
  w.url = BASE;
  w.refreshAfterDate = new Date((slot + 1) * block);
};

// 💌 Love note of the day (or the one Joshua set for today)
W.note = async (w, fam) => {
  bg(w, 'blush');
  const small = fam === 'small', big = fam === 'large' || fam === 'extraLarge';
  const n = noteOfDay();
  const top = w.addStack();
  top.centerAlignContent();
  txt(top, n.special ? 'just for today' : 'for you, today', F.script(small ? 16 : 22), ACCENT, { lines: 1, scale: 0.6 });
  top.addSpacer();
  await sticker(top, 'butterfly', small ? 22 : 30);
  w.addSpacer();
  txt(w, n.text, F.serif(small ? 13 : big ? 24 : 17), INK, { scale: 0.5, lines: small ? 5 : 6 });
  w.addSpacer();
  txt(w, 'love, Joshua 💙', F.m(small ? 10 : 11), INK_SOFT);
  w.url = BASE;
  w.refreshAfterDate = earliest(nextMidnight(), minutesFromNow(30));
};

// ☀️ Weather: Hornsby vs St. Louis, with live local times
function weatherColumn(parent, person, wx, tz, align) {
  const c = parent.addStack();
  c.layoutVertically();
  const cur = wx.current, info = wxInfo(cur.weather_code, cur.is_day === 1);
  eyebrow(c, `${person.name} · ${person.city}`);
  c.addSpacer(4);
  const r = c.addStack();
  r.centerAlignContent();
  symbol(r, info.sym, 26, info.sunny ? new Color('#f5b83d') : new Color('#45a8e8'));
  r.addSpacer(6);
  txt(r, `${Math.round(cur.temperature_2m)}°`, F.b(32), INK);
  if (tz) {
    r.addSpacer(4);
    txt(r, `${Math.round(cur.temperature_2m * 9 / 5 + 32)}°F`, F.m(11), INK_SOFT);
  }
  txt(c, info.label, F.m(12), INK_MID, { lines: 1 });
  txt(c, `H ${Math.round(wx.daily.temperature_2m_max[0])}°  L ${Math.round(wx.daily.temperature_2m_min[0])}°`, F.m(11), INK_SOFT);
  c.addSpacer(2);
  liveClock(c, tz, F.sb(11), ACCENT);
}

W.weather = async (w, fam) => {
  bg(w, 'soft');
  const [a, b] = await Promise.all([weatherFor(DATA.her, 'wx_her.json'), weatherFor(DATA.joshua, 'wx_him.json')]);
  if (fam === 'small') {
    weatherColumn(w, DATA.her, a, null);
    w.addSpacer();
    txt(w, `${DATA.joshua.name}: ${Math.round(b.current.temperature_2m)}° · ${wxInfo(b.current.weather_code, b.current.is_day === 1).label}`, F.sb(10), INK_SOFT, { lines: 1, scale: 0.7 });
  } else {
    const row = w.addStack();
    row.centerAlignContent();
    weatherColumn(row, DATA.her, a, null);
    row.addSpacer();
    const mid = row.addStack();
    mid.layoutVertically();
    mid.centerAlignContent();
    txt(mid, '💙', F.r(16), INK, { align: 'center' });
    txt(mid, `${DATA.distance.km} km`, F.m(9), INK_SOFT, { align: 'center' });
    row.addSpacer();
    weatherColumn(row, DATA.joshua, b, DATA.joshua.tz);
  }
  w.url = BASE;
  w.refreshAfterDate = earliest(nextMidnight(), minutesFromNow(30));
};

// ⏳ Countdowns, the top one ticks live
function heroCountdown(parent, m, fam) {
  const small = fam === 'small';
  const card = parent.addStack();
  card.layoutVertically();
  card.backgroundColor = TILE;
  card.cornerRadius = 16;
  card.setPadding(10, 12, 10, 12);
  const head = card.addStack();
  head.centerAlignContent();
  txt(head, m.emoji, F.r(small ? 16 : 22), INK);
  head.addSpacer(6);
  const names = head.addStack();
  names.layoutVertically();
  txt(names, m.name, F.b(small ? 13 : 16), INK, { lines: 1, scale: 0.7 });
  txt(names, fmtDate(m.date, 'd MMMM yyyy'), F.m(small ? 9 : 11), INK_SOFT, { lines: 1 });
  head.addSpacer();
  card.addSpacer(6);
  if (m.days === 0) {
    txt(card, 'Today! 🎉', F.h(small ? 22 : 30), PINK);
    return;
  }
  const row = card.addStack();
  row.bottomAlignContent();
  txt(row, `${m.days - 1}`, F.h(small ? 28 : 40), ACCENT, { lines: 1, scale: 0.6 });
  row.addSpacer(4);
  txt(row, m.days - 1 === 1 ? 'day' : 'days', F.sb(small ? 11 : 14), INK_MID);
  row.addSpacer();
  const t = card.addDate(nextMidnight());
  t.applyTimerStyle();
  t.font = F.b(small ? 15 : 20);
  t.textColor = INK;
  txt(card, 'hrs   min   sec', F.m(9), INK_SOFT);
}

W.countdown = async (w, fam) => {
  bg(w, 'soft');
  const list = milestones();
  w.url = BASE;
  w.refreshAfterDate = nextMidnight();
  if (!list.length) { txt(w, 'Nothing to count down to yet 💙', F.sb(13), INK); return; }
  const n = Math.min(SLOT, list.length - 1);
  const top = w.addStack();
  top.centerAlignContent();
  eyebrow(top, 'counting down');
  if (list.length > 1) {
    top.addSpacer(6);
    txt(top, `${n + 1} of ${list.length}`, F.sb(10), INK_SOFT);
  }
  top.addSpacer();
  if (fam !== 'small') await sticker(top, 'pengy', 28);
  w.addSpacer(6);
  heroCountdown(w, list[n], fam);
  const after = list[n + 1];
  if (fam === 'medium' && after) {
    w.addSpacer();
    txt(w, `then ${after.emoji} ${after.name} in ${after.days}d`, F.sb(11), INK_MID, { lines: 1, scale: 0.7 });
  }
  if (fam === 'large' || fam === 'extraLarge') {
    w.addSpacer(10);
    list.slice(n + 1, n + 6).forEach((m, i) => {
      if (i > 0) w.addSpacer();
      const r = w.addStack();
      r.centerAlignContent();
      txt(r, m.emoji, F.r(15), INK);
      r.addSpacer(8);
      txt(r, m.name, F.sb(13), INK, { lines: 1, scale: 0.7 });
      r.addSpacer();
      txt(r, m.days === 0 ? 'today!' : `${m.days}d`, F.b(13), ACCENT);
    });
  }
};

// 💙 Together since + distance
W.together = async (w, fam) => {
  bg(w, 'soft');
  const start = parseDate(DATA.togetherSince), now = new Date();
  const row = w.addStack();
  const left = row.addStack();
  left.layoutVertically();
  const top = left.addStack();
  top.centerAlignContent();
  eyebrow(top, 'together since');
  top.addSpacer();
  if (fam === 'small') await sticker(top, 'pengy', 26);
  left.addSpacer();
  txt(left, daysBetween(start, now).toLocaleString(), F.h(40), ACCENT, { lines: 1, scale: 0.6 });
  txt(left, 'days of us', F.sb(12), INK_MID);
  left.addSpacer(4);
  txt(left, duration(start, now), F.sb(12), INK);
  txt(left, fmtDate(start, 'd MMMM yyyy'), F.m(10), INK_SOFT);
  if (fam !== 'small') {
    row.addSpacer(16);
    const right = row.addStack();
    right.layoutVertically();
    const t2 = right.addStack();
    t2.centerAlignContent();
    eyebrow(t2, 'our distance');
    t2.addSpacer();
    await sticker(t2, 'pengy', 28);
    right.addSpacer();
    txt(right, DATA.distance.label, F.b(15), INK);
    txt(right, `${DATA.distance.km} km`, F.h(24), ACCENT, { lines: 1, scale: 0.6 });
    txt(right, `${DATA.distance.mi} miles`, F.sb(12), INK_MID);
    right.addSpacer(4);
    txt(right, 'and still right here', F.m(10), INK_SOFT);
  }
  w.url = BASE;
  w.refreshAfterDate = nextMidnight();
};

// 🗒️ Notion planner shortcut
W.planner = async (w, fam) => {
  bg(w, 'deep');
  symbol(w, 'book.closed.fill', 24, WHITE);
  w.addSpacer();
  txt(w, 'my planner', F.script(fam === 'small' ? 26 : 32), WHITE, { lines: 1, scale: 0.6 });
  txt(w, fmtDate(new Date(), 'yyyy') + ' ✦', F.sb(13), new Color('#ffffff', 0.85));
  w.url = DATA.notionUrl;
};

// 🎧 Song of the day
W.song = async (w, fam) => {
  const s = await songOfDay();
  w.url = s.url;
  w.refreshAfterDate = nextMidnight();
  if (fam === 'small' && s.art) {
    w.backgroundImage = composeBackground(s.art, 'small', 0.75);
    w.setPadding(12, 12, 12, 12);
    w.addSpacer();
    eyebrow(w, '♫ song of the day', new Color('#ffffff', 0.85), 9);
    txt(w, s.title, F.b(14), WHITE, { lines: 2, scale: 0.7, shadow: true });
    return;
  }
  bg(w, 'soft');
  const big = fam === 'large' || fam === 'extraLarge';
  const row = w.addStack();
  if (big) row.layoutVertically();
  row.centerAlignContent();
  const artSize = big ? 200 : 110;
  if (s.art) {
    const im = row.addImage(s.art);
    im.imageSize = new Size(artSize, artSize);
    im.cornerRadius = 14;
  } else {
    symbol(row, 'music.note', 60, new Color('#45a8e8'));
  }
  row.addSpacer(big ? 12 : 14);
  const col = row.addStack();
  col.layoutVertically();
  eyebrow(col, '♫ song of the day');
  col.addSpacer(4);
  txt(col, s.title, F.b(big ? 20 : 17), INK, { lines: 2, scale: 0.6 });
  txt(col, 'from our love potion 💙', F.m(11), INK_MID);
  col.addSpacer(8);
  const pill = col.addStack();
  pill.centerAlignContent();
  pill.backgroundColor = new Color('#1f7bbf');
  pill.cornerRadius = 10;
  pill.setPadding(4, 10, 4, 10);
  symbol(pill, 'play.fill', 10, WHITE);
  pill.addSpacer(4);
  txt(pill, 'tap to play', F.sb(11), WHITE);
};

// Numbered rows like the site's voice notes list
function noteRows(parent, notes, cols, size) {
  for (let i = 0; i < notes.length; i += cols) {
    if (i > 0) parent.addSpacer(4);
    const row = parent.addStack();
    row.spacing = 6;
    for (let j = 0; j < cols; j++) {
      const n = notes[i + j];
      const cell = row.addStack();
      cell.centerAlignContent();
      cell.setPadding(4, 8, 4, 6);
      cell.cornerRadius = 9;
      if (n) {
        cell.backgroundColor = TILE;
        txt(cell, String(i + j + 1), F.m(size - 2), INK_SOFT);
        cell.addSpacer(6);
        txt(cell, n.emoji, F.r(size), INK);
        cell.addSpacer(5);
        txt(cell, n.label, F.sb(size), INK, { lines: 1, scale: 0.6 });
      }
      cell.addSpacer();
    }
  }
}

// 🎙️ Voice notes: "listen when…" card, tap opens the full list on the site to pick one
W.voice = async (w, fam) => {
  bg(w, 'blush');
  const notes = DATA.voiceNotes;
  const small = fam === 'small', medium = fam === 'medium';
  const head = w.addStack();
  head.centerAlignContent();
  const ht = head.addStack();
  ht.layoutVertically();
  eyebrow(ht, '🎙️ voice notes');
  txt(ht, 'listen when…', F.script(small ? 22 : 26), ACCENT, { lines: 1, scale: 0.6 });
  head.addSpacer();
  if (!small) await sticker(head, 'dolphin', medium ? 26 : 34);
  w.addSpacer(small ? 2 : 8);
  if (small) txt(w, `${notes.length} notes from me`, F.m(11), INK_MID);
  else noteRows(w, medium ? notes.slice(0, 4) : notes, 2, medium ? 11 : 12);
  w.addSpacer();
  const pill = w.addStack();
  pill.centerAlignContent();
  pill.backgroundColor = new Color('#1f7bbf');
  pill.cornerRadius = 10;
  pill.setPadding(4, 10, 4, 10);
  symbol(pill, 'play.fill', 10, WHITE);
  pill.addSpacer(4);
  const more = medium && notes.length > 4 ? `  ·  +${notes.length - 4} more` : '';
  txt(pill, `Listen when…${more}`, F.sb(small ? 10 : 11), WHITE, { lines: 1, scale: 0.7 });
  w.url = BASE + '#vmemoShell';
};

// 🥺 Miss me? rotates every hour, tap plays the miss-me voice note
W.missme = async (w, fam) => {
  bg(w, 'blush');
  const small = fam === 'small', medium = fam === 'medium';
  const msg = missMeNow();
  const top = w.addStack();
  top.centerAlignContent();
  eyebrow(top, 'do I miss you?', PINK);
  top.addSpacer();
  if (!small) await sticker(top, 'dolphin', medium ? 26 : 40);
  w.addSpacer();
  txt(w, msg.title, F.script(small ? 22 : medium ? 28 : 40), ACCENT, { lines: 1, scale: 0.5 });
  w.addSpacer(small ? 2 : 6);
  txt(w, msg.body, F.serif(small ? 11 : medium ? 14 : 20), INK, { scale: 0.5, lines: small ? 4 : 5 });
  w.addSpacer();
  const pill = w.addStack();
  pill.centerAlignContent();
  pill.backgroundColor = TILE;
  pill.cornerRadius = 10;
  pill.setPadding(4, 10, 4, 10);
  txt(pill, 'tap to hear me 💗', F.sb(small ? 10 : 12), PINK);
  w.url = BASE + DATA.missMeVoice;
  const nextHour = new Date();
  nextHour.setMinutes(60, 0, 0);
  w.refreshAfterDate = nextHour;
};

// 🕰️ Her time and his time, both ticking live
function clockRow(parent, name, tz, fam, showDay) {
  const p = tzParts(new Date(), tz);
  const r = parent.addStack();
  r.layoutVertically();
  const head = r.addStack();
  head.centerAlignContent();
  txt(head, p.h >= 6 && p.h < 18 ? '☀️' : '🌙', F.r(11), INK);
  head.addSpacer(4);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  eyebrow(head, showDay ? `${name} · ${days[p.wd]}` : name, ACCENT, 10);
  liveClock(r, tz, F.b(fam === 'small' ? 24 : 30), INK);
}

W.clock = async (w, fam) => {
  bg(w, 'soft');
  const diff = hoursAhead();
  const her = tzParts(new Date(), null), him = tzParts(new Date(), DATA.joshua.tz);
  const container = w.addStack();
  if (fam === 'small') container.layoutVertically(); else container.layoutHorizontally();
  clockRow(container, 'you', null, fam, false);
  container.addSpacer();
  clockRow(container, DATA.joshua.name, DATA.joshua.tz, fam, her.d !== him.d);
  w.addSpacer();
  const note = diff === 0 ? 'same time zone 💙' : `you're ${Math.abs(diff)}h ${diff > 0 ? 'ahead of' : 'behind'} him`;
  txt(w, note, F.m(10), INK_SOFT, { lines: 1, scale: 0.7 });
  w.url = BASE;
  w.refreshAfterDate = earliest(nextMidnight(), minutesFromNow(60));
};

// 📅 Love calendar with special days marked
W.calendar = async (w, fam) => {
  bg(w, 'soft');
  const now = new Date();
  const y = now.getFullYear(), mo = now.getMonth();
  const isSpecial = d => DATA.specialDays.some(s => s.month === mo + 1 && s.day === d);
  const row = w.addStack();
  row.layoutHorizontally();

  if (fam !== 'small') {
    const left = row.addStack();
    left.layoutVertically();
    eyebrow(left, fmtDate(now, 'EEEE'));
    txt(left, String(now.getDate()), F.h(46), ACCENT);
    txt(left, fmtDate(now, 'MMMM'), F.script(20), INK, { lines: 1, scale: 0.7 });
    left.addSpacer();
    const next = milestones()[0];
    if (next) txt(left, next.days === 0 ? `${next.emoji} today!` : `${next.emoji} in ${next.days}d`, F.sb(10), INK_MID, { lines: 1 });
    row.addSpacer();
  }

  const cal = row.addStack();
  cal.layoutVertically();
  cal.spacing = 1;
  const cw = fam === 'small' ? 17 : 24, ch = fam === 'small' ? 15 : 17;
  const head = cal.addStack();
  ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(d => {
    const c = head.addStack();
    c.size = new Size(cw, ch);
    c.centerAlignContent();
    txt(c, d, F.b(9), INK_SOFT);
  });
  const first = new Date(y, mo, 1).getDay();
  const dim = new Date(y, mo + 1, 0).getDate();
  let day = 1 - first;
  while (day <= dim) {
    const wk = cal.addStack();
    for (let i = 0; i < 7; i++, day++) {
      const c = wk.addStack();
      c.size = new Size(cw, ch);
      c.centerAlignContent();
      c.cornerRadius = ch / 2;
      if (day < 1 || day > dim) continue;
      const today = day === now.getDate();
      const special = isSpecial(day);
      if (today) c.backgroundColor = new Color('#45a8e8');
      else if (special) c.backgroundColor = dyn('#ffd6ec', '#5a2c48');
      txt(c, String(day), F[today || special ? 'b' : 'm'](fam === 'small' ? 8 : 10), today ? WHITE : special ? PINK : INK);
    }
  }
  w.url = BASE;
  w.refreshAfterDate = nextMidnight();
};

// 📝 Her space on the site: each tile jumps to that card
W.myspace = async (w, fam) => {
  bg(w, 'soft');
  const small = fam === 'small', medium = fam === 'medium';
  const head = w.addStack();
  head.centerAlignContent();
  eyebrow(head, 'my space');
  head.addSpacer();
  if (!small) txt(head, 'tap to open ✦', F.script(16), ACCENT);
  w.addSpacer(8);
  const items = [
    { emoji: '✅', label: 'To-do list', url: BASE + '#todoList' },
    { emoji: '📝', label: 'Scratch pad', url: BASE + '#scratchPad' },
    { emoji: '📋', label: 'Quick copy', url: BASE + '#clipList' },
  ];
  if (small) grid(w, items, 1, { font: 11, emoji: 12, padV: 5, gap: 4 });
  else if (medium) grid(w, items, 3, { font: 12, emoji: 15, padV: 14, gap: 6 });
  else grid(w, items, 1, { font: 17, emoji: 22, padV: 20 });
  w.url = BASE;
};

// 💱 Quick conversions: exchange rate, temperature, distance (same three as the site)
const toF = c => Math.round(c * 9 / 5 + 32);
const toMi = km => km * 0.621371;
const num = (n, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

// Row of small "from / to" tiles
function convRow(parent, pairs) {
  const row = parent.addStack();
  row.spacing = 6;
  pairs.forEach(([from, to]) => {
    const c = row.addStack();
    c.layoutVertically();
    c.backgroundColor = TILE;
    c.cornerRadius = 10;
    c.setPadding(4, 8, 4, 8);
    txt(c, from, F.m(10), INK_SOFT, { lines: 1, scale: 0.7 });
    txt(c, to, F.b(12), INK, { lines: 1, scale: 0.6 });
  });
  row.addSpacer();
}

async function conversions() {
  const r = await fetchCached('https://api.frankfurter.dev/v1/latest?from=AUD&to=USD', 'rate_aud_usd.json', 'json', 180);
  let herC = null;
  try { herC = Math.round((await weatherFor(DATA.her, 'wx_her.json')).current.temperature_2m); } catch (e) {}
  const km = Number(String(DATA.distance.km).replace(/,/g, ''));
  return { rate: r.rates.USD, updated: fmtDate(parseDate(r.date), 'd MMM'), herC, km };
}

W.rates = async (w, fam) => {
  bg(w, 'soft');
  const c = await conversions();
  const small = fam === 'small', medium = fam === 'medium';
  const rows = [
    { head: '💱 exchange rate', main: `A$1 = $${c.rate.toFixed(4)} USD`, sub: `$1 = A$${(1 / c.rate).toFixed(4)} · updated ${c.updated}`,
      tiles: [10, 20, 50, 100].map(a => [`A$${a}`, `$${(a * c.rate).toFixed(2)}`]) },
    { head: '🌡️ temperature', main: c.herC == null ? '20°C = 68°F' : `${c.herC}°C = ${toF(c.herC)}°F`, sub: c.herC == null ? '' : `right now in ${DATA.her.city}`,
      tiles: [0, 10, 20, 30].map(t => [`${t}°C`, `${toF(t)}°F`]) },
    { head: '📏 distance', main: `${DATA.distance.km} km = ${DATA.distance.mi} mi`, sub: `${DATA.distance.label}, and still right here`,
      tiles: [1, 5, 10, 100].map(k => [`${k} km`, `${num(toMi(k), 1)} mi`]) },
  ];
  w.url = BASE + '#audUsdRate';
  w.refreshAfterDate = minutesFromNow(60);

  if (small) {
    eyebrow(w, 'conversions');
    w.addSpacer();
    rows.forEach((r, i) => {
      if (i > 0) w.addSpacer(6);
      txt(w, r.head.split(' ')[0] + ' ' + r.main.replace(' USD', ''), F.sb(11), INK, { lines: 1, scale: 0.6 });
    });
    w.addSpacer();
    txt(w, `rate updated ${c.updated}`, F.m(9), INK_SOFT);
    return;
  }

  if (medium) {
    const cols = w.addStack();
    cols.spacing = 8;
    rows.forEach(r => {
      const col = cols.addStack();
      col.layoutVertically();
      col.backgroundColor = TILE;
      col.cornerRadius = 12;
      col.setPadding(8, 8, 8, 8);
      eyebrow(col, r.head, ACCENT, 9);
      col.addSpacer();
      r.main.replace(' USD', '').split(' = ').forEach((part, i) => txt(col, i ? `= ${part}` : part, F.b(i ? 13 : 15), i ? ACCENT : INK, { lines: 1, scale: 0.5 }));
      col.addSpacer();
      txt(col, r.tiles[1][0] + ' = ' + r.tiles[1][1], F.m(9), INK_SOFT, { lines: 1, scale: 0.7 });
    });
    return;
  }

  rows.forEach((r, i) => {
    if (i > 0) w.addSpacer();
    eyebrow(w, r.head);
    txt(w, r.main, F.b(16), INK, { lines: 1, scale: 0.6 });
    if (r.sub) txt(w, r.sub, F.m(10), INK_SOFT, { lines: 1, scale: 0.7 });
    w.addSpacer(4);
    convRow(w, r.tiles);
  });
};

// 🔗 Quick links
W.links = async (w, fam) => {
  bg(w, 'soft');
  const head = w.addStack();
  head.centerAlignContent();
  eyebrow(head, 'quick links');
  head.addSpacer();
  txt(head, 'always & forever ✦', F.script(16), ACCENT);
  w.addSpacer(8);
  const items = fam === 'medium' ? DATA.links.slice(0, 6) : DATA.links;
  grid(w, items, fam === 'medium' ? 3 : 2, fam === 'medium' ? { font: 11, emoji: 13, padV: 6, gap: 6 } : { font: 13, emoji: 16, padV: 9 });
};

// ─────────────────────────────────────────────────────────────
//  ENTRY POINT
// ─────────────────────────────────────────────────────────────
const ALIASES = { photos: 'photo', notes: 'note', love: 'note', countdowns: 'countdown', days: 'together', notion: 'planner', music: 'song', voices: 'voice', voicenotes: 'voice', miss: 'missme', 'miss me': 'missme', clocks: 'clock', time: 'clock', cal: 'calendar', link: 'links', quicklinks: 'links', 'quick links': 'links', space: 'myspace', 'my space': 'myspace', todo: 'myspace', rate: 'rates', money: 'rates', exchange: 'rates', conversions: 'rates', convert: 'rates' };

const PICKER = [
  ['photo', 'large', 'Photo of us'], ['note', 'medium', 'Love note'], ['weather', 'medium', 'Weather x2'],
  ['countdown', 'large', 'Countdowns'], ['together', 'small', 'Together since'], ['planner', 'small', 'Planner'],
  ['song', 'medium', 'Song of the day'], ['voice', 'large', 'Voice notes'], ['missme', 'large', 'Miss me?'],
  ['clock', 'small', 'Two clocks'], ['calendar', 'medium', 'Calendar'], ['links', 'large', 'Quick links'],
  ['myspace', 'medium', 'My space'], ['rates', 'medium', 'Conversions'],
];

function helpWidget(param) {
  const w = new ListWidget();
  bg(w, 'soft');
  txt(w, '💙 Always With You', F.b(13), INK);
  w.addSpacer(4);
  txt(w, param ? `"${param}" isn't a widget name.` : 'Pick what this widget shows:', F.m(11), INK_MID);
  txt(w, 'Long press > Edit Widget > Parameter, then type one of:', F.m(10), INK_SOFT, { lines: 3 });
  w.addSpacer(4);
  txt(w, PICKER.map(p => p[0]).join(' · '), F.sb(10), ACCENT, { lines: 4, scale: 0.7 });
  return w;
}

function errorWidget(e) {
  const w = new ListWidget();
  bg(w, 'soft');
  txt(w, '💙', F.r(22), INK);
  w.addSpacer(6);
  txt(w, 'hold on, reconnecting…', F.sb(13), INK);
  txt(w, String(e).slice(0, 140), F.r(9), INK_SOFT, { lines: 4 });
  w.refreshAfterDate = minutesFromNow(15);
  return w;
}

async function build(type, fam) {
  const w = new ListWidget();
  w.setPadding(14, 16, 14, 16);
  w.refreshAfterDate = minutesFromNow(30);
  await W[type](w, fam);
  return w;
}

async function run(opts) {
  BASE = opts.base.endsWith('/') ? opts.base : opts.base + '/';
  let type = (opts.param || '').trim().toLowerCase();
  // A trailing number picks which one, e.g. "countdown 2"
  const numbered = type.match(/^(.*?)[\s:#-]*(\d+)$/);
  SLOT = 0;
  if (numbered && numbered[1]) { type = numbered[1]; SLOT = Math.max(0, +numbered[2] - 1); }
  type = ALIASES[type] || type;
  let fam = opts.family || 'medium';

  if (!opts.inWidget) {
    const a = new Alert();
    a.title = 'Always With You 💙';
    a.message = 'Preview a widget';
    PICKER.forEach(p => a.addAction(`${p[2]}  (${p[1]})`));
    a.addCancelAction('Close');
    const i = await a.presentSheet();
    if (i < 0 || i >= PICKER.length) { Script.complete(); return; }
    type = PICKER[i][0];
    fam = PICKER[i][1];
  }

  let widget;
  try {
    DATA = await fetchCached(`${BASE}data.json?t=${Date.now()}`, 'data.json', 'json', 0);
    widget = W[type] ? await build(type, fam) : helpWidget(type);
  } catch (e) {
    widget = errorWidget(e);
  }

  if (opts.inWidget) Script.setWidget(widget);
  else if (fam === 'small') await widget.presentSmall();
  else if (fam === 'large') await widget.presentLarge();
  else await widget.presentMedium();
  Script.complete();
}

module.exports = { run };
