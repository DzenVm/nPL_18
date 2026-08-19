// Procedural, seeded generative-art scenes rendered to raster PNG via headless
// Chromium. No stock photos, no external image APIs, no third-party assets —
// every shape below is plain SVG built from the site's own colour tokens.
import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");

const palette = {
  bg0: "#171310",
  bg1: "#1e1811",
  bg2: "#241c15",
  concrete: "#4a4038",
  concreteLight: "#5c5145",
  concreteDark: "#332b23",
  wood: "#7a4f2e",
  woodDark: "#5c3a20",
  brick: "#7d3a26",
  brickDark: "#5e2a1b",
  marginDark: "#242015",
  rust300: "#e79a68",
  rust400: "#e08148",
  rust500: "#d9713c",
  rust600: "#b85a2c",
  green300: "#b7d488",
  green400: "#a1c368",
  green600: "#4d6b2c",
  amber400: "#f0c04d",
  amber500: "#dda934",
  text0: "#f5efe2",
  text1: "#cdc0aa",
  text2: "#968971",
  chalk: "#f2ead9",
  duskTop: "#1c1830",
  duskMid: "#3a2440",
  daySky: "#8f9a9c",
  goldSky: "#caa15a",
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function between(rand, min, max) {
  return min + rand() * (max - min);
}

function dots(rand, { count, xMin, xMax, yMin, yMax, rMin, rMax, color, opMin, opMax }) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = between(rand, xMin, xMax).toFixed(1);
    const y = between(rand, yMin, yMax).toFixed(1);
    const r = between(rand, rMin, rMax).toFixed(2);
    const o = between(rand, opMin, opMax).toFixed(2);
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${o}"/>`;
  }
  return out;
}

function jitter(rand, points, amount) {
  return points
    .map(([x, y]) => [x + between(rand, -amount, amount), y + between(rand, -amount, amount)])
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
}

function svgDoc(w, h, inner, seed = 1) {
  const grainSeed = (seed % 97) / 97;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;background:${palette.bg0};}
    svg{display:block;}
  </style></head><body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" seed="${Math.round(grainSeed * 100) + 1}" stitchTiles="stitch" result="noise"/>
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0"/>
      </filter>
      <radialGradient id="vignette" cx="50%" cy="46%" r="72%">
        <stop offset="50%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.42"/>
      </radialGradient>
      <linearGradient id="grade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3a2a52"/>
        <stop offset="100%" stop-color="#2a1a08"/>
      </linearGradient>
    </defs>
    ${inner}
    <rect width="${w}" height="${h}" fill="url(#grade)" opacity="0.12" style="mix-blend-mode:soft-light"/>
    <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.16" style="mix-blend-mode:overlay"/>
    <rect width="${w}" height="${h}" fill="url(#vignette)"/>
  </svg>
  </body></html>`;
}

/* ---------- Scene 1: hero — driveway at dusk ---------- */
function sceneDriveway(w, h, seed) {
  const rand = mulberry32(seed);
  const horizon = h * 0.52;
  const gravel = dots(rand, {
    count: 140,
    xMin: 0,
    xMax: w,
    yMin: horizon,
    yMax: h,
    rMin: 0.6,
    rMax: 2.2,
    color: palette.concreteDark,
    opMin: 0.25,
    opMax: 0.6,
  });

  const garageW = w * 0.2;
  const wallTop = horizon - h * 0.24;
  const wallBottom = horizon + 8;
  const doorX = garageW * 0.16;
  const doorY = wallTop + (wallBottom - wallTop) * 0.3;
  const doorW = garageW * 0.56;
  const doorH = wallBottom - doorY - 6;

  return svgDoc(
    w,
    h,
    `
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${palette.duskTop}"/>
        <stop offset="55%" stop-color="${palette.duskMid}"/>
        <stop offset="100%" stop-color="${palette.rust600}"/>
      </linearGradient>
      <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${palette.concreteLight}"/>
        <stop offset="100%" stop-color="${palette.concreteDark}"/>
      </linearGradient>
      <radialGradient id="doorglow" cx="50%" cy="42%" r="65%">
        <stop offset="0" stop-color="${palette.amber400}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="${palette.rust600}" stop-opacity="0.5"/>
      </radialGradient>
      <radialGradient id="spill" cx="50%" cy="0%" r="60%">
        <stop offset="0" stop-color="${palette.amber400}" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="${palette.amber400}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="sunglow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${palette.rust300}" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="${palette.rust300}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <ellipse cx="${w * 0.8}" cy="${horizon - 10}" rx="${w * 0.22}" ry="${h * 0.14}" fill="url(#sunglow)"/>

    <rect y="${horizon}" width="${w}" height="${h - horizon}" fill="${palette.marginDark}"/>
    <polygon points="${w * 0.16},${h} ${w * 0.84},${h} ${w * 0.56},${horizon} ${w * 0.44},${horizon}"
      fill="url(#ground)"/>
    ${gravel}

    <polygon points="-4,${wallTop} ${garageW + 4},${wallTop} ${garageW - 12},${wallTop - 20} 6,${wallTop - 20}"
      fill="${palette.bg0}"/>
    <rect x="0" y="${wallTop}" width="${garageW}" height="${wallBottom - wallTop}" fill="${palette.bg1}"/>
    <rect x="${doorX}" y="${doorY}" width="${doorW}" height="${doorH}" fill="url(#doorglow)" rx="3"/>
    <ellipse cx="${doorX + doorW / 2}" cy="${wallBottom}" rx="${garageW * 1.1}" ry="${h * 0.1}" fill="url(#spill)"/>

    <g transform="translate(${w * 0.9} ${horizon})" opacity="0.85">
      <rect x="-4" y="0" width="8" height="${h * 0.09}" fill="${palette.woodDark}"/>
      <circle cx="2" cy="-${h * 0.03}" r="${w * 0.045}" fill="${palette.green600}"/>
      <circle cx="-${w * 0.03}" cy="-${h * 0.015}" r="${w * 0.032}" fill="${palette.green600}"/>
      <circle cx="${w * 0.03}" cy="0" r="${w * 0.03}" fill="${palette.green600}"/>
    </g>

    <path d="M ${w * 0.46} ${h * 0.98} C ${w * 0.5} ${h * 0.8}, ${w * 0.4} ${h * 0.72}, ${w * 0.47} ${horizon + 6}"
      fill="none" stroke="${palette.chalk}" stroke-width="4" stroke-dasharray="14 10" opacity="0.75" stroke-linecap="round"/>
    <path d="M ${w * 0.58} ${h * 0.98} C ${w * 0.56} ${h * 0.8}, ${w * 0.64} ${h * 0.7}, ${w * 0.55} ${horizon + 6}"
      fill="none" stroke="${palette.chalk}" stroke-width="4" stroke-dasharray="14 10" opacity="0.6" stroke-linecap="round"/>
    <g transform="translate(${w * 0.52} ${h * 0.87}) scale(1.15)">
      <ellipse cx="0" cy="34" rx="46" ry="8" fill="#000" opacity="0.35"/>
      <rect x="-40" y="4" width="80" height="24" rx="10" fill="${palette.bg1}" stroke="${palette.rust400}" stroke-width="2"/>
      <rect x="-24" y="-14" width="42" height="20" rx="8" fill="${palette.bg1}" stroke="${palette.rust400}" stroke-width="2"/>
      <circle cx="-24" cy="30" r="9" fill="${palette.bg0}" stroke="${palette.text2}" stroke-width="2"/>
      <circle cx="26" cy="30" r="9" fill="${palette.bg0}" stroke="${palette.text2}" stroke-width="2"/>
    </g>
    <rect width="${w}" height="${h}" fill="black" opacity="0.06"/>
  `
  , seed);
}

/* ---------- Scene 2: workshop table ---------- */
function sceneWorkshop(w, h, seed) {
  const rand = mulberry32(seed);
  const benchTop = h * 0.55;
  const screws = dots(rand, {
    count: 22,
    xMin: w * 0.1,
    xMax: w * 0.9,
    yMin: benchTop + 24,
    yMax: h - 20,
    rMin: 2,
    rMax: 4,
    color: palette.bg0,
    opMin: 0.4,
    opMax: 0.7,
  });
  let pegHoles = "";
  for (let x = w * 0.1; x < w * 0.58; x += 30) {
    for (let y = h * 0.09; y < benchTop - 18; y += 30) {
      pegHoles += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="${palette.bg0}" opacity="0.65"/>`;
    }
  }
  return svgDoc(
    w,
    h,
    `
    <defs>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${palette.bg2}"/>
        <stop offset="100%" stop-color="${palette.bg1}"/>
      </linearGradient>
      <linearGradient id="bench" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${palette.wood}"/>
        <stop offset="100%" stop-color="${palette.woodDark}"/>
      </linearGradient>
      <radialGradient id="lamp" cx="50%" cy="15%" r="75%">
        <stop offset="0" stop-color="${palette.amber400}" stop-opacity="0.75"/>
        <stop offset="100%" stop-color="${palette.amber400}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${benchTop}" fill="url(#wall)"/>
    <rect x="${w * 0.06}" y="${h * 0.06}" width="${w * 0.54}" height="${benchTop - h * 0.14}" rx="6"
      fill="${palette.bg1}" stroke="${palette.bg2}" stroke-width="10"/>
    ${pegHoles}

    <g stroke="${palette.text1}" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9">
      <line x1="${w * 0.16}" y1="${h * 0.15}" x2="${w * 0.2}" y2="${h * 0.15}"/>
      <line x1="${w * 0.18}" y1="${h * 0.15}" x2="${w * 0.18}" y2="${h * 0.32}"/>
      <circle cx="${w * 0.18}" cy="${h * 0.36}" r="9" stroke-width="4"/>
      <path d="M ${w * 0.18 - 9} ${h * 0.36} l -7 -3" stroke-width="4"/>
    </g>

    <g stroke="${palette.rust300}" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9">
      <line x1="${w * 0.32}" y1="${h * 0.13}" x2="${w * 0.36}" y2="${h * 0.13}"/>
      <line x1="${w * 0.34}" y1="${h * 0.13}" x2="${w * 0.3}" y2="${h * 0.36}"/>
    </g>
    <rect x="${w * 0.325 - 7}" y="${h * 0.1}" width="14" height="10" rx="2" fill="${palette.rust400}"/>

    <g transform="translate(${w * 0.84} ${h * 0.05})">
      <line x1="0" y1="0" x2="0" y2="${h * 0.1}" stroke="${palette.text2}" stroke-width="4" stroke-linecap="round"/>
      <path d="M -30 ${h * 0.1} L 30 ${h * 0.1} L 16 ${h * 0.17} L -16 ${h * 0.17} Z" fill="${palette.bg2}" stroke="${palette.text2}" stroke-width="2.5"/>
      <ellipse cx="0" cy="${h * 0.17}" rx="26" ry="7" fill="${palette.amber400}" opacity="0.9"/>
    </g>
    <ellipse cx="${w * 0.84}" cy="${h * 0.24}" rx="${w * 0.28}" ry="${h * 0.24}" fill="url(#lamp)"/>

    <rect x="0" y="${benchTop}" width="${w}" height="${h - benchTop}" fill="url(#bench)"/>
    <g stroke="${palette.woodDark}" stroke-width="2" opacity="0.5">
      <line x1="0" y1="${benchTop + 20}" x2="${w}" y2="${benchTop + 20}"/>
      <line x1="0" y1="${benchTop + 55}" x2="${w}" y2="${benchTop + 50}"/>
      <line x1="0" y1="${h - 30}" x2="${w}" y2="${h - 35}"/>
    </g>
    ${screws}

    <g transform="translate(${w * 0.26} ${benchTop + h * 0.14})">
      <ellipse cx="0" cy="26" rx="60" ry="9" fill="#000" opacity="0.3"/>
      <rect x="-52" y="0" width="104" height="26" rx="10" fill="${palette.bg1}" stroke="${palette.rust400}" stroke-width="2"/>
      <circle cx="-30" cy="28" r="10" fill="${palette.bg0}" stroke="${palette.text2}" stroke-width="2"/>
      <circle cx="30" cy="28" r="10" fill="${palette.bg0}" stroke="${palette.text2}" stroke-width="2"/>
    </g>

    <g transform="translate(${w * 0.56} ${benchTop + h * 0.28})" opacity="0.9">
      <ellipse cx="0" cy="16" rx="30" ry="6" fill="#000" opacity="0.25"/>
      <circle cx="-14" cy="8" r="11" fill="none" stroke="${palette.text2}" stroke-width="4"/>
      <circle cx="4" cy="10" r="11" fill="none" stroke="${palette.text2}" stroke-width="4"/>
      <circle cx="20" cy="6" r="11" fill="none" stroke="${palette.text2}" stroke-width="4"/>
    </g>

    <g transform="translate(${w * 0.78} ${benchTop + h * 0.22})">
      <ellipse cx="0" cy="46" rx="26" ry="6" fill="#000" opacity="0.25"/>
      <path d="M -18 44 L -15 -4 L 15 -4 L 18 44 Z" fill="${palette.bg1}" stroke="${palette.text2}" stroke-width="2"/>
      <ellipse cx="0" cy="-4" rx="15" ry="5" fill="${palette.bg2}" stroke="${palette.text2}" stroke-width="2"/>
      <rect x="-14" y="10" width="28" height="12" fill="${palette.text0}" opacity="0.12"/>
      <circle cx="-6" cy="26" r="3.5" fill="${palette.rust400}"/>
      <circle cx="4" cy="30" r="3.5" fill="${palette.green400}"/>
      <circle cx="8" cy="20" r="3.5" fill="${palette.rust400}"/>
    </g>
  `
  , seed);
}

/* ---------- Scene 3: plank ramp, overcast day ---------- */
function sceneRamp(w, h, seed) {
  const rand = mulberry32(seed);
  const horizon = h * 0.42;
  const gravel = dots(rand, {
    count: 90,
    xMin: 0,
    xMax: w,
    yMin: horizon,
    yMax: h,
    rMin: 0.8,
    rMax: 2.4,
    color: palette.concreteDark,
    opMin: 0.3,
    opMax: 0.55,
  });
  return svgDoc(
    w,
    h,
    `
    <defs>
      <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#454b4d"/>
        <stop offset="100%" stop-color="${palette.daySky}"/>
      </linearGradient>
      <linearGradient id="ground2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${palette.concreteLight}"/>
        <stop offset="100%" stop-color="${palette.concrete}"/>
      </linearGradient>
      <linearGradient id="plank" x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0" stop-color="${palette.wood}"/>
        <stop offset="100%" stop-color="${palette.woodDark}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky2)"/>
    <rect y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#ground2)"/>
    ${gravel}
    <g fill="${palette.green600}" opacity="0.8">
      <circle cx="${w * 0.07}" cy="${horizon}" r="16"/>
      <circle cx="${w * 0.1}" cy="${horizon + 3}" r="20"/>
      <circle cx="${w * 0.14}" cy="${horizon}" r="14"/>
      <circle cx="${w * 0.9}" cy="${horizon + 2}" r="13"/>
      <circle cx="${w * 0.94}" cy="${horizon}" r="17"/>
      <circle cx="${w * 0.97}" cy="${horizon + 2}" r="11"/>
    </g>
    <ellipse cx="${w * 0.52}" cy="${h * 0.86}" rx="${w * 0.26}" ry="18" fill="#000" opacity="0.28"/>
    <polygon points="${jitter(rand, [[w * 0.3, h * 0.78], [w * 0.39, h * 0.78], [w * 0.39, h * 0.88], [w * 0.3, h * 0.88]], 3)}"
      fill="${palette.brick}" stroke="${palette.brickDark}" stroke-width="2"/>
    <polygon points="${jitter(rand, [[w * 0.63, h * 0.8], [w * 0.72, h * 0.8], [w * 0.72, h * 0.88], [w * 0.63, h * 0.88]], 3)}"
      fill="${palette.brick}" stroke="${palette.brickDark}" stroke-width="2"/>
    <g transform="rotate(-9 ${w * 0.5} ${h * 0.72})">
      <polygon points="${jitter(rand, [[w * 0.27, h * 0.68], [w * 0.73, h * 0.68], [w * 0.73, h * 0.755], [w * 0.27, h * 0.755]], 4)}"
        fill="url(#plank)" stroke="${palette.woodDark}" stroke-width="2" stroke-linejoin="round"/>
      <line x1="${w * 0.3}" y1="${h * 0.705}" x2="${w * 0.7}" y2="${h * 0.703}" stroke="${palette.woodDark}" stroke-width="1.5" opacity="0.6"/>
      <line x1="${w * 0.3}" y1="${h * 0.727}" x2="${w * 0.7}" y2="${h * 0.724}" stroke="${palette.woodDark}" stroke-width="1.5" opacity="0.4"/>
    </g>
    <path d="M ${w * 0.02} ${h * 0.96} C ${w * 0.12} ${h * 0.88}, ${w * 0.2} ${h * 0.84}, ${w * 0.29} ${h * 0.775}"
      fill="none" stroke="${palette.chalk}" stroke-width="5" stroke-dasharray="14 10" opacity="0.75" stroke-linecap="round"/>
  `
  , seed);
}

/* ---------- Scene 4: chalk track, midday ---------- */
function sceneChalkTrack(w, h, seed) {
  const rand = mulberry32(seed);
  const dust = dots(rand, {
    count: 150,
    xMin: w * 0.08,
    xMax: w * 0.92,
    yMin: h * 0.12,
    yMax: h * 0.92,
    rMin: 0.5,
    rMax: 1.8,
    color: palette.chalk,
    opMin: 0.15,
    opMax: 0.4,
  });
  const pebbles = dots(rand, {
    count: 55,
    xMin: 0,
    xMax: w,
    yMin: 0,
    yMax: h,
    rMin: 1,
    rMax: 3.2,
    color: palette.concreteDark,
    opMin: 0.3,
    opMax: 0.6,
  });
  return svgDoc(
    w,
    h,
    `
    <defs>
      <linearGradient id="ground3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${palette.concreteLight}"/>
        <stop offset="100%" stop-color="${palette.concrete}"/>
      </linearGradient>
      <radialGradient id="sun3" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${palette.amber400}" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="${palette.amber400}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#ground3)"/>
    <ellipse cx="${w * 0.06}" cy="${h * 0.04}" rx="${w * 0.32}" ry="${h * 0.26}" fill="url(#sun3)"/>
    ${pebbles}
    <path d="M ${w * 0.16} ${h * 0.88} C ${w * 0.22} ${h * 0.5}, ${w * 0.4} ${h * 0.62}, ${w * 0.52} ${h * 0.4}
      S ${w * 0.82} ${h * 0.18}, ${w * 0.9} ${h * 0.08}"
      fill="none" stroke="${palette.chalk}" stroke-width="6" stroke-dasharray="20 14" stroke-linecap="round" opacity="0.9"/>
    <path d="M ${w * 0.24} ${h * 0.9} C ${w * 0.32} ${h * 0.6}, ${w * 0.48} ${h * 0.72}, ${w * 0.6} ${h * 0.48}
      S ${w * 0.86} ${h * 0.26}, ${w * 0.95} ${h * 0.14}"
      fill="none" stroke="${palette.chalk}" stroke-width="6" stroke-dasharray="20 14" stroke-linecap="round" opacity="0.55"/>
    <line x1="${w * 0.12}" y1="${h * 0.91}" x2="${w * 0.32}" y2="${h * 0.885}" stroke="${palette.chalk}" stroke-width="7" opacity="0.9" stroke-linecap="round"/>
    <line x1="${w * 0.13}" y1="${h * 0.85}" x2="${w * 0.14}" y2="${h * 0.97}" stroke="${palette.chalk}" stroke-width="4" opacity="0.6" stroke-linecap="round"/>
    <line x1="${w * 0.31}" y1="${h * 0.825}" x2="${w * 0.32}" y2="${h * 0.945}" stroke="${palette.chalk}" stroke-width="4" opacity="0.6" stroke-linecap="round"/>
    ${dust}
  `
  , seed);
}

/* ---------- Scene 5: garden hose chicane, golden afternoon ---------- */
function sceneHose(w, h, seed) {
  const rand = mulberry32(seed);
  const grassBlades = (() => {
    let out = "";
    for (let i = 0; i < 70; i++) {
      const x = between(rand, 0, w);
      const y = between(rand, h * 0.55, h * 0.98);
      const len = between(rand, 8, 20);
      const lean = between(rand, -6, 6);
      const shade = rand() > 0.5 ? palette.green400 : palette.green600;
      out += `<path d="M ${x.toFixed(1)} ${y.toFixed(1)} q ${lean.toFixed(1)} -${len.toFixed(1)} ${(lean * 1.6).toFixed(1)} -${(len * 1.7).toFixed(1)}"
        stroke="${shade}" stroke-width="2.2" fill="none" opacity="0.75" stroke-linecap="round"/>`;
    }
    return out;
  })();
  return svgDoc(
    w,
    h,
    `
    <defs>
      <linearGradient id="sky5" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${palette.goldSky}"/>
        <stop offset="100%" stop-color="${palette.rust500}"/>
      </linearGradient>
      <linearGradient id="path5" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8a6a48"/>
        <stop offset="100%" stop-color="#5f4630"/>
      </linearGradient>
      <radialGradient id="dapple" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${palette.amber400}" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="${palette.amber400}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h * 0.4}" fill="url(#sky5)"/>
    <rect y="${h * 0.36}" width="${w}" height="${h * 0.64}" fill="${palette.green600}" opacity="0.55"/>
    <polygon points="${jitter(rand, [[w * 0.25, h], [w * 0.75, h], [w * 0.6, h * 0.4], [w * 0.4, h * 0.4]], 6)}" fill="url(#path5)"/>
    ${grassBlades}
    <ellipse cx="${w * 0.2}" cy="${h * 0.2}" rx="${w * 0.3}" ry="${h * 0.22}" fill="url(#dapple)"/>
    <ellipse cx="${w * 0.7}" cy="${h * 0.15}" rx="${w * 0.22}" ry="${h * 0.18}" fill="url(#dapple)"/>
    <path d="M ${w * 0.46} ${h * 0.99} C ${w * 0.4} ${h * 0.86}, ${w * 0.56} ${h * 0.78}, ${w * 0.5} ${h * 0.66}
      S ${w * 0.4} ${h * 0.52}, ${w * 0.48} ${h * 0.42}"
      fill="none" stroke="${palette.rust500}" stroke-width="10" stroke-linecap="round"/>
    <path d="M ${w * 0.46} ${h * 0.99} C ${w * 0.4} ${h * 0.86}, ${w * 0.56} ${h * 0.78}, ${w * 0.5} ${h * 0.66}
      S ${w * 0.4} ${h * 0.52}, ${w * 0.48} ${h * 0.42}"
      fill="none" stroke="${palette.chalk}" stroke-width="10" stroke-dasharray="4 16" stroke-linecap="round" opacity="0.8"/>
    <g transform="translate(${w * 0.18} ${h * 0.72})">
      <path d="M -18 20 L -14 -6 L 14 -6 L 18 20 Z" fill="${palette.brick}" stroke="${palette.brickDark}" stroke-width="2"/>
      <ellipse cx="0" cy="-10" rx="16" ry="9" fill="${palette.green400}"/>
      <ellipse cx="-6" cy="-16" rx="8" ry="10" fill="${palette.green300}"/>
    </g>
    <g transform="translate(${w * 0.84} ${h * 0.62})">
      <path d="M -14 16 L -11 -4 L 11 -4 L 14 16 Z" fill="${palette.brick}" stroke="${palette.brickDark}" stroke-width="2"/>
      <ellipse cx="0" cy="-8" rx="13" ry="7" fill="${palette.amber500}"/>
    </g>
  `
  , seed);
}

/* ---------- Scene 6: finish line at night ---------- */
function sceneFinish(w, h, seed) {
  const rand = mulberry32(seed);
  const stars = dots(rand, {
    count: 50,
    xMin: 0,
    xMax: w,
    yMin: 0,
    yMax: h * 0.45,
    rMin: 0.5,
    rMax: 1.4,
    color: palette.text1,
    opMin: 0.15,
    opMax: 0.5,
  });
  return svgDoc(
    w,
    h,
    `
    <defs>
      <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0e0c0a"/>
        <stop offset="100%" stop-color="${palette.bg1}"/>
      </linearGradient>
      <radialGradient id="lampglow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${palette.amber400}" stop-opacity="0.95"/>
        <stop offset="45%" stop-color="${palette.amber400}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${palette.amber400}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${palette.amber400}" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="${palette.amber400}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#night)"/>
    ${stars}
    <g opacity="0.5" fill="${palette.bg0}">
      <ellipse cx="${w * 0.08}" cy="${h * 0.7}" rx="${w * 0.14}" ry="${h * 0.22}"/>
      <ellipse cx="${w * 0.95}" cy="${h * 0.72}" rx="${w * 0.12}" ry="${h * 0.2}"/>
    </g>
    <polygon points="${w * 0.42},${h * 0.22} ${w * 0.58},${h * 0.22} ${w * 0.82},${h} ${w * 0.18},${h}" fill="url(#cone)"/>
    <line x1="${w * 0.5}" y1="${h * 0.06}" x2="${w * 0.5}" y2="${h * 0.24}" stroke="${palette.bg0}" stroke-width="6"/>
    <circle cx="${w * 0.5}" cy="${h * 0.22}" r="${w * 0.16}" fill="url(#lampglow)"/>
    <circle cx="${w * 0.5}" cy="${h * 0.22}" r="9" fill="${palette.amber400}"/>
    <rect y="${h * 0.9}" width="${w}" height="${h * 0.1}" fill="${palette.concreteDark}" opacity="0.6"/>
    <line x1="${w * 0.22}" y1="${h * 0.92}" x2="${w * 0.78}" y2="${h * 0.92}" stroke="${palette.chalk}" stroke-width="6" opacity="0.9"/>
    <line x1="${w * 0.24}" y1="${h * 0.85}" x2="${w * 0.24}" y2="${h * 0.98}" stroke="${palette.chalk}" stroke-width="3" opacity="0.6"/>
    <line x1="${w * 0.76}" y1="${h * 0.85}" x2="${w * 0.76}" y2="${h * 0.98}" stroke="${palette.chalk}" stroke-width="3" opacity="0.6"/>
    <g transform="translate(${w * 0.4} ${h * 0.82}) scale(0.9)">
      <ellipse cx="0" cy="18" rx="34" ry="6" fill="#000" opacity="0.4"/>
      <rect x="-30" y="0" width="60" height="18" rx="8" fill="${palette.bg2}" stroke="${palette.rust300}" stroke-width="2"/>
      <rect x="-16" y="-11" width="32" height="14" rx="6" fill="${palette.bg2}" stroke="${palette.rust300}" stroke-width="2"/>
      <circle cx="-18" cy="20" r="7" fill="${palette.bg0}" stroke="${palette.text2}" stroke-width="2"/>
      <circle cx="18" cy="20" r="7" fill="${palette.bg0}" stroke="${palette.text2}" stroke-width="2"/>
    </g>
  `
  , seed);
}

const jobs = [
  { file: "podjazd-o-zmierzchu.png", w: 1600, h: 900, build: sceneDriveway, seed: 101 },
  { file: "stol-warsztatowy.png", w: 1200, h: 900, build: sceneWorkshop, seed: 202 },
  { file: "rampa-z-desek.png", w: 1200, h: 900, build: sceneRamp, seed: 303 },
  { file: "tor-kredowy.png", w: 1200, h: 900, build: sceneChalkTrack, seed: 404 },
  { file: "szykana-z-weza.png", w: 1200, h: 900, build: sceneHose, seed: 505 },
  { file: "finisz-wieczorem.png", w: 1200, h: 900, build: sceneFinish, seed: 606 },
];

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  try {
    const page = await browser.newPage();
    for (const job of jobs) {
      await page.setViewportSize({ width: job.w, height: job.h });
      const html = job.build(job.w, job.h, job.seed);
      await page.setContent(html, { waitUntil: "load" });
      const outPath = path.join(outDir, job.file);
      await page.screenshot({ path: outPath });
      console.log("wrote", outPath);
    }
    await page.close();
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
