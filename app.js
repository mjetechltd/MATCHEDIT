/* ========================================================================
   MATCH[e]DIT — Camera Database & Application Logic
   ======================================================================== */

// ── Camera Database ──
const CAMERAS = [
  {
    id: 'alexa35', brand: 'ARRI', model: 'ALEXA 35', segment: 'Cinema',
    color: '#00d4aa',
    profiles: [{
      name: 'LogC4', middleGrey: 28,
      baseISOs: [200, 400, 800, 1600, 3200, 6400],
      stopMap: [[-6, 10.16], [-5, 10.96], [-4, 12.38], [-3, 14.70], [-2, 18.11], [-1, 22.56], [0, 28], [1, 33.65], [2, 39.78], [3, 46.08], [4, 52.47], [5, 58.90], [6, 65.36], [7, 71.83], [8, 78.30], [9, 84.78], [10, 91.26]],
      dr: { total: 17, above: 9.3, below: 7.7 },
      notes: 'ALEV-4 sensor. DR split at EI 800.'
    }]
  },
  {
    id: 'alexamlf', brand: 'ARRI', model: 'ALEXA Mini LF', segment: 'Cinema',
    color: '#00d4aa',
    profiles: [{
      name: 'LogC3', middleGrey: 39,
      baseISOs: [200, 400, 800, 1600, 3200],
      stopMap: [[-6, 8], [-5, 10], [-4, 13], [-3, 17], [-2, 22], [-1, 30], [0, 39], [1, 48], [2, 56], [3, 64], [4, 71], [5, 77], [6, 83]],
      dr: { total: 14.5, above: 7.6, below: 6.9 },
      notes: 'ALEV-3 sensor. DR split at EI 800.'
    }]
  },
  {
    id: 'venice2', brand: 'Sony', model: 'VENICE 2 (8.6K)', segment: 'Cinema',
    color: '#4d8bff',
    profiles: [{
      name: 'S-Log3', middleGrey: 41,
      baseISOs: [500, 2500],
      stopMap: [[-6, 5.93], [-5, 8.09], [-4, 12.41], [-3, 20.36], [-2, 30.60], [-1, 35.83], [0, 41], [1, 45.37], [2, 50.10], [3, 54.83], [4, 59.58], [5, 64.37], [6, 75.68]],
      dr: { total: 16, above: 6, below: 10 },
      notes: 'Dual base ISO. DR split at ISO 3200.'
    }]
  },
  {
    id: 'vraptor', brand: 'RED', model: 'V-RAPTOR 8K VV', segment: 'Cinema',
    color: '#ff3b3b',
    profiles: [{
      name: 'Log3G10', middleGrey: 33.33,
      baseISOs: [250, 400, 800, 1600, 3200, 6400],
      stopMap: [[-6, 10.70], [-5, 12.03], [-4, 14.24], [-3, 17.57], [-2, 21.87], [-1, 27.04], [0, 33.33], [1, 40.60], [2, 48.65], [3, 57.07], [4, 65.63], [5, 74.19], [6, 82.63], [7, 86.50], [8, 93.25], [9, 100]],
      dr: { total: 13.4, above: null, below: null },
      notes: '18% grey = 1/3. 10 stops above maps to 1.0. CineD measured ~13.4 stops SNR=2.'
    }]
  },
  {
    id: 'c700', brand: 'Canon', model: 'EOS C700', segment: 'Cinema',
    color: '#e85d3a',
    profiles: [
      {
        name: 'Canon Log2', middleGrey: 39.8,
        baseISOs: [160, 400, 800, 1600, 3200],
        stopMap: [[-5, 14], [-4, 17], [-3, 22], [-2, 28], [-1, 34], [0, 39.8], [1, 45], [2, 50], [3, 54], [4, 57], [5, 59]],
        dr: { total: 15, above: null, below: null },
        notes: '15-stop class per Canon HDR docs. Full-range code %.'
      },
      {
        name: 'Canon Log3', middleGrey: 34.3,
        baseISOs: [160, 400, 800, 1600, 3200],
        stopMap: [[-5, 14], [-4, 16], [-3, 20], [-2, 25], [-1, 30], [0, 34.3], [1, 39], [2, 43], [3, 46], [4, 49], [5, 50]],
        dr: { total: 15, above: null, below: null },
        notes: 'Full-range code %.'
      }
    ]
  },
  {
    id: 'varicam', brand: 'Panasonic', model: 'VariCam / S1H', segment: 'Cinema',
    color: '#f0c040',
    profiles: [{
      name: 'V-Log', middleGrey: 42,
      baseISOs: [640, 4000],
      stopMap: [[-6, 8], [-5, 11], [-4, 15], [-3, 21], [-2, 28], [-1, 35], [0, 42], [1, 48], [2, 53], [3, 57], [4, 60], [5, 61]],
      dr: { total: 12.7, above: null, below: null },
      notes: 'Dual native ISO 640/4000. CineD: 12.7 stops SNR=2 at ISO640.'
    }]
  },
  {
    id: 'bmpcc6k', brand: 'Blackmagic', model: 'BMPCC 6K / 6K Pro', segment: 'Prosumer',
    color: '#a855f7',
    profiles: [{
      name: 'BMD Film Gen5', middleGrey: 38.36,
      baseISOs: [400, 3200],
      stopMap: [[-6, 11.58], [-5, 13.89], [-4, 17.45], [-3, 22.25], [-2, 27.88], [-1, 33.68], [0, 38.36], [1, 42.28], [2, 45.73], [3, 48.87], [4, 51.79], [5, 54.55], [6, 57.22]],
      dr: { total: 11.8, above: null, below: null },
      notes: 'Dual native ISO 400/3200. CineD: 11.8 stops SNR=2 at ISO400 BRAW.'
    }]
  },
  {
    id: 'a7s3', brand: 'Sony', model: 'a7S III', segment: 'Prosumer',
    color: '#4d8bff',
    profiles: [{
      name: 'S-Log3', middleGrey: 41,
      baseISOs: [640, 12800],
      stopMap: [[-6, 5.93], [-5, 8.09], [-4, 12.41], [-3, 20.36], [-2, 30.60], [-1, 35.83], [0, 41], [1, 45.37], [2, 50.10], [3, 54.83], [4, 59.58], [5, 64.37], [6, 75.68]],
      dr: { total: 12.4, above: null, below: null },
      notes: 'Dual base ISO. CineD: 12.4 stops SNR=2 at ISO640.'
    }]
  },
  {
    id: 'r5', brand: 'Canon', model: 'EOS R5', segment: 'Prosumer',
    color: '#e85d3a',
    profiles: [{
      name: 'Canon Log', middleGrey: 34.3,
      baseISOs: [400, 800],
      stopMap: [[-5, 14], [-4, 16], [-3, 20], [-2, 25], [-1, 30], [0, 34.3], [1, 39], [2, 44], [3, 48], [4, 51], [5, 53]],
      dr: { total: 10.3, above: null, below: null },
      notes: 'CineD: 10.3 stops SNR=2 at ISO400 8K RAW.'
    }]
  },
  {
    id: 'r6', brand: 'Canon', model: 'EOS R6', segment: 'Prosumer',
    color: '#e85d3a',
    profiles: [{
      name: 'Canon Log', middleGrey: 34.3,
      baseISOs: [400, 800],
      stopMap: [[-5, 14], [-4, 16], [-3, 20], [-2, 25], [-1, 30], [0, 34.3], [1, 39], [2, 44], [3, 48], [4, 51], [5, 53]],
      dr: { total: 10.5, above: null, below: null },
      notes: 'CineD: 10.5 stops SNR=2 at ISO400 UHD.'
    }]
  },
  {
    id: 'ursag2', brand: 'Blackmagic', model: 'URSA Mini Pro 4.6K G2', segment: 'Prosumer',
    color: '#a855f7',
    profiles: [{
      name: 'BMD Film Gen5', middleGrey: 38.36,
      baseISOs: [400, 3200],
      stopMap: [[-6, 11.58], [-5, 13.89], [-4, 17.45], [-3, 22.25], [-2, 27.88], [-1, 33.68], [0, 38.36], [1, 42.28], [2, 45.73], [3, 48.87], [4, 51.79], [5, 54.55], [6, 57.22]],
      dr: { total: 12.6, above: null, below: null },
      notes: 'CineD: 12.6 stops SNR=2.'
    }]
  }
];

// ── State ──
const state = {
  hero: { cameraId: 'alexa35', profileIdx: 0, isoIdx: 2 },
  comparisons: []
};
let compIdCounter = 0;

// ── DOM Refs ──
const $ = s => document.querySelector(s);
const heroSel = $('#hero-camera');
const heroProf = $('#hero-profile');
const heroISO = $('#hero-iso');
const heroInfo = $('#hero-info');
const compList = $('#comp-list');
const addBtn = $('#add-comp-btn');
const canvas = $('#ire-canvas');
const ctx = canvas.getContext('2d');
const vizLegend = $('#viz-legend');
const resultsBody = $('#results-body');
const emptyState = $('#empty-state');
const resultsEmpty = $('#results-empty');

// ── Helpers ──
function getCam(id) { return CAMERAS.find(c => c.id === id); }
function getProfile(cam, idx) { return cam.profiles[idx] || cam.profiles[0]; }

function stopDiff(heroGrey, compGrey) {
  return Math.log2(compGrey / heroGrey);
}

function formatStops(v) {
  const abs = Math.abs(v);
  const thirds = Math.round(abs * 3) / 3;
  const sign = v > 0.02 ? '+' : v < -0.02 ? '−' : '';
  return sign + thirds.toFixed(1);
}

function eiRecommendation(stops) {
  if (Math.abs(stops) < 0.1) return 'No EI change needed — middle greys are matched.';
  const dir = stops > 0 ? 'lower' : 'raise';
  const verb = stops > 0 ? 'decrease' : 'increase';
  const abs = Math.abs(stops);
  const thirds = Math.round(abs * 3);
  const fullStops = Math.floor(thirds / 3);
  const rem = thirds % 3;
  let label = '';
  if (fullStops > 0) label += fullStops + ' stop' + (fullStops > 1 ? 's' : '');
  if (rem > 0) label += (label ? ' ' : '') + rem + '/3';
  return `${verb.charAt(0).toUpperCase() + verb.slice(1)} comparison camera EI by ~${label} (${dir} the EI number) to align its middle grey encoding with the hero.`;
}

function lutRecommendation(stops) {
  if (Math.abs(stops) < 0.1) return 'No LUT gain offset needed.';
  const dir = stops > 0 ? 'pull down (darken)' : 'push up (brighten)';
  return `Apply a ~${formatStops(Math.abs(stops))} stop ${dir} offset in a trim LUT or CDL node to match middle greys.`;
}

// ── Populate Hero ──
function populateHeroCamera() {
  heroSel.innerHTML = '';
  const groups = {};
  CAMERAS.forEach(c => {
    if (!groups[c.brand]) groups[c.brand] = [];
    groups[c.brand].push(c);
  });
  for (const [brand, cams] of Object.entries(groups)) {
    const og = document.createElement('optgroup');
    og.label = brand;
    cams.forEach(c => {
      const o = document.createElement('option');
      o.value = c.id; o.textContent = c.model;
      if (c.id === state.hero.cameraId) o.selected = true;
      og.appendChild(o);
    });
    heroSel.appendChild(og);
  }
  populateHeroProfiles();
}

function populateHeroProfiles() {
  const cam = getCam(state.hero.cameraId);
  heroProf.innerHTML = '';
  cam.profiles.forEach((p, i) => {
    const o = document.createElement('option');
    o.value = i; o.textContent = p.name;
    if (i === state.hero.profileIdx) o.selected = true;
    heroProf.appendChild(o);
  });
  populateHeroISO();
}

function populateHeroISO() {
  const cam = getCam(state.hero.cameraId);
  const prof = getProfile(cam, state.hero.profileIdx);
  heroISO.innerHTML = '';
  prof.baseISOs.forEach((iso, i) => {
    const o = document.createElement('option');
    o.value = i; o.textContent = 'ISO ' + iso;
    if (i === state.hero.isoIdx) o.selected = true;
    heroISO.appendChild(o);
  });
  updateHeroInfo();
}

function updateHeroInfo() {
  const cam = getCam(state.hero.cameraId);
  const prof = getProfile(cam, state.hero.profileIdx);
  const iso = prof.baseISOs[state.hero.isoIdx] || prof.baseISOs[0];
  const dr = prof.dr;
  let drText = dr.total ? dr.total + ' stops' : 'N/A';
  let splitText = (dr.above && dr.below) ? `${dr.above} above / ${dr.below} below 18%` : 'Not published';
  heroInfo.innerHTML = `
    <div class="info-row"><span class="info-label">Brand</span><span class="info-value">${cam.brand}</span></div>
    <div class="info-row"><span class="info-label">Segment</span><span class="info-value">${cam.segment}</span></div>
    <div class="info-row"><span class="info-label">Profile</span><span class="info-value">${prof.name}</span></div>
    <div class="info-row"><span class="info-label">Middle Grey</span><span class="info-value ire">${prof.middleGrey}% IRE</span></div>
    <div class="info-row"><span class="info-label">Base ISO</span><span class="info-value">${iso}</span></div>
    <div class="info-row"><span class="info-label">Dynamic Range</span><span class="info-value">${drText}</span></div>
    <div class="info-row"><span class="info-label">DR Split</span><span class="info-value">${splitText}</span></div>
    <div class="info-row"><span class="info-label">Notes</span><span class="info-value" style="font-size:0.72rem;font-family:var(--font-sans);font-weight:400;color:var(--text-secondary);max-width:180px;text-align:right">${prof.notes}</span></div>
  `;
  render();
  renderCompactBars();
}

// ── Hero Events ──
heroSel.addEventListener('change', () => {
  state.hero.cameraId = heroSel.value;
  state.hero.profileIdx = 0;
  state.hero.isoIdx = 0;
  populateHeroProfiles();
});
heroProf.addEventListener('change', () => {
  state.hero.profileIdx = parseInt(heroProf.value);
  state.hero.isoIdx = 0;
  populateHeroISO();
});
heroISO.addEventListener('change', () => {
  state.hero.isoIdx = parseInt(heroISO.value);
  updateHeroInfo();
});

// ── Comparison Cameras ──
addBtn.addEventListener('click', addComparison);

function addComparison() {
  const defaultId = state.hero.cameraId === 'venice2' ? 'alexa35' : 'venice2';
  const comp = { uid: ++compIdCounter, cameraId: defaultId, profileIdx: 0, isoIdx: 0 };
  state.comparisons.push(comp);
  renderComparisons();
  render();
  renderCompactBars();
}

function removeComparison(uid) {
  state.comparisons = state.comparisons.filter(c => c.uid !== uid);
  renderComparisons();
  render();
}

function renderComparisons() {
  emptyState.classList.toggle('hidden', state.comparisons.length > 0);
  const existing = compList.querySelectorAll('.comp-card');
  existing.forEach(e => e.remove());

  state.comparisons.forEach((comp, ci) => {
    const cam = getCam(comp.cameraId);
    const card = document.createElement('div');
    card.className = 'comp-card';
    card.style.borderLeftColor = cam.color;
    card.style.borderLeftWidth = '3px';
    card.dataset.uid = comp.uid;

    let camOptions = '';
    const groups = {};
    CAMERAS.forEach(c => {
      if (!groups[c.brand]) groups[c.brand] = [];
      groups[c.brand].push(c);
    });
    for (const [brand, cams] of Object.entries(groups)) {
      camOptions += `<optgroup label="${brand}">`;
      cams.forEach(c => {
        camOptions += `<option value="${c.id}" ${c.id === comp.cameraId ? 'selected' : ''}>${c.model}</option>`;
      });
      camOptions += '</optgroup>';
    }

    const prof = getProfile(cam, comp.profileIdx);
    let profOptions = '';
    cam.profiles.forEach((p, i) => {
      profOptions += `<option value="${i}" ${i === comp.profileIdx ? 'selected' : ''}>${p.name}</option>`;
    });

    let isoOptions = '';
    prof.baseISOs.forEach((iso, i) => {
      isoOptions += `<option value="${i}" ${i === comp.isoIdx ? 'selected' : ''}>ISO ${iso}</option>`;
    });

    card.innerHTML = `
      <div class="comp-card-header">
        <div class="comp-card-brand"><div class="brand-dot" style="background:${cam.color}"></div><span class="comp-card-title">#${ci + 1}</span></div>
        <button class="comp-remove" data-uid="${comp.uid}" title="Remove"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
      <div class="form-group"><label>Camera</label><select class="comp-cam-sel">${camOptions}</select></div>
      <div class="form-group"><label>Profile</label><select class="comp-prof-sel">${profOptions}</select></div>
      <div class="form-group"><label>Base ISO</label><select class="comp-iso-sel">${isoOptions}</select></div>
    `;

    // Events
    card.querySelector('.comp-remove').addEventListener('click', () => removeComparison(comp.uid));
    card.querySelector('.comp-cam-sel').addEventListener('change', (e) => {
      comp.cameraId = e.target.value; comp.profileIdx = 0; comp.isoIdx = 0;
      renderComparisons(); render();
    });
    card.querySelector('.comp-prof-sel').addEventListener('change', (e) => {
      comp.profileIdx = parseInt(e.target.value); comp.isoIdx = 0;
      renderComparisons(); render();
    });
    card.querySelector('.comp-iso-sel').addEventListener('change', (e) => {
      comp.isoIdx = parseInt(e.target.value); render();
    });

    compList.appendChild(card);
  });
}

// ── Canvas Rendering ──
function resizeCanvas() {
  const rect = canvas.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const isMobile = window.innerWidth <= 700 || document.body.classList.contains('compact-view');
  const h = isMobile ? 300 : 420;
  canvas.width = rect.width * dpr;
  canvas.height = h * dpr;
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);
}

function render() {
  resizeCanvas();
  const isMobile = window.innerWidth <= 700 || document.body.classList.contains('compact-view');
  const W = canvas.width / (window.devicePixelRatio || 1);
  const H = isMobile ? 300 : 420;
  const pad = { top: 50, bottom: 40, left: isMobile ? 44 : 60, right: isMobile ? 16 : 30 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#0e0e12';
  ctx.fillRect(0, 0, W, H);

  // IRE scale: 0–100 vertical
  const ireToY = ire => pad.top + plotH - (ire / 100) * plotH;
  const ireToX = null; // vertical scale

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let ire = 0; ire <= 100; ire += 5) {
    const y = Math.round(ireToY(ire)) + 0.5;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + plotW, y);
    ctx.stroke();
  }

  // IRE labels
  ctx.fillStyle = '#55555f';
  ctx.font = '500 10px "JetBrains Mono"';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let ire = 0; ire <= 100; ire += 10) {
    ctx.fillText(ire + '%', pad.left - 8, ireToY(ire));
  }

  // Y-axis label
  ctx.save();
  ctx.translate(14, pad.top + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#55555f';
  ctx.font = '600 10px "Inter"';
  ctx.textAlign = 'center';
  ctx.fillText('IRE', 0, 0);
  ctx.restore();

  // Hero data
  const heroCam = getCam(state.hero.cameraId);
  const heroProf = getProfile(heroCam, state.hero.profileIdx);
  const heroGrey = heroProf.middleGrey;

  // Collect all cameras to draw
  const allCams = [
    { cam: heroCam, prof: heroProf, grey: heroGrey, isHero: true, color: heroCam.color, label: heroCam.model + ' (' + heroProf.name + ')' }
  ];

  state.comparisons.forEach(comp => {
    const cam = getCam(comp.cameraId);
    const prof = getProfile(cam, comp.profileIdx);
    allCams.push({ cam, prof, grey: prof.middleGrey, isHero: false, color: cam.color, label: cam.model + ' (' + prof.name + ')' });
  });

  // Draw stop curves if available
  const curveSpacing = plotW / (allCams.length + 1);
  allCams.forEach((entry, i) => {
    const sm = entry.prof.stopMap;
    if (!sm || sm.length < 3) return;
    const cx = pad.left + curveSpacing * (i + 1);
    ctx.strokeStyle = entry.color + '40';
    ctx.lineWidth = 2;
    ctx.beginPath();
    sm.forEach(([stop, sig], j) => {
      const y = ireToY(sig);
      const x = cx + stop * 6;
      j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw dots on curve
    sm.forEach(([stop, sig]) => {
      const y = ireToY(sig);
      const x = cx + stop * 6;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = entry.color + '60';
      ctx.fill();
    });
  });

  // Draw middle grey markers
  allCams.forEach((entry, i) => {
    const y = ireToY(entry.grey);

    // Horizontal line across full width
    ctx.setLineDash(entry.isHero ? [] : [6, 4]);
    ctx.strokeStyle = entry.color + (entry.isHero ? 'cc' : '88');
    ctx.lineWidth = entry.isHero ? 2.5 : 1.5;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + plotW, y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Glow for hero
    if (entry.isHero) {
      ctx.shadowColor = entry.color;
      ctx.shadowBlur = 12;
      ctx.strokeStyle = entry.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + plotW, y);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Label pill
    const labelX = pad.left + 8 + i * 12;
    const pillW = ctx.measureText(entry.label).width + 16;
    const pillH = 18;
    const pillY = y - pillH - 4;

    ctx.fillStyle = entry.color + '18';
    ctx.strokeStyle = entry.color + '44';
    ctx.lineWidth = 1;
    roundRect(ctx, labelX, pillY, pillW, pillH, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = entry.color;
    ctx.font = '600 9px "Inter"';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(entry.label, labelX + 8, pillY + pillH / 2);

    // IRE value on right
    const ireLabel = entry.grey.toFixed(entry.grey % 1 === 0 ? 0 : 1) + '% IRE';
    ctx.fillStyle = entry.color;
    ctx.font = '700 10px "JetBrains Mono"';
    ctx.textAlign = 'right';
    ctx.fillText(ireLabel, pad.left + plotW - 4, y - 6);

    // Hero badge
    if (entry.isHero) {
      ctx.fillStyle = entry.color;
      ctx.font = '700 8px "Inter"';
      ctx.textAlign = 'left';
      ctx.fillText('HERO', pad.left + 8, y + 14);
    }
  });

  // Draw DR bars on the right side
  const drBarX = pad.left + plotW - 18;
  allCams.forEach((entry, i) => {
    const dr = entry.prof.dr;
    if (!dr || !dr.total) return;
    const abv = dr.above || dr.total / 2;
    const blw = dr.below || dr.total / 2;
    const y0 = ireToY(entry.grey);
    const topY = ireToY(Math.min(100, entry.grey + abv * 3));
    const botY = ireToY(Math.max(0, entry.grey - blw * 3));
    const barX = drBarX - i * 14;

    ctx.fillStyle = entry.color + '15';
    ctx.fillRect(barX, topY, 8, botY - topY);
    ctx.strokeStyle = entry.color + '30';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, topY, 8, botY - topY);

    // Middle marker
    ctx.fillStyle = entry.color + '80';
    ctx.fillRect(barX, y0 - 1, 8, 2);
  });

  // Draw offset arrows between hero and comparisons
  state.comparisons.forEach((comp, ci) => {
    const cam = getCam(comp.cameraId);
    const prof = getProfile(cam, comp.profileIdx);
    const compGrey = prof.middleGrey;
    const diff = stopDiff(heroGrey, compGrey);
    if (Math.abs(diff) < 0.05) return;

    const heroY = ireToY(heroGrey);
    const compY = ireToY(compGrey);
    const arrowX = pad.left + plotW * 0.75 + ci * 30;

    // Vertical line
    ctx.strokeStyle = cam.color + '88';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(arrowX, heroY);
    ctx.lineTo(arrowX, compY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Arrow head
    const dir = compGrey > heroGrey ? -1 : 1;
    ctx.fillStyle = cam.color + 'cc';
    ctx.beginPath();
    ctx.moveTo(arrowX, compY);
    ctx.lineTo(arrowX - 4, compY + dir * 8);
    ctx.lineTo(arrowX + 4, compY + dir * 8);
    ctx.closePath();
    ctx.fill();

    // Stop label in middle + direction
    const midY = (heroY + compY) / 2;
    const absDiff = Math.abs(diff);
    const dirLabel = diff > 0.05 ? '▼ PULL DOWN' : diff < -0.05 ? '▲ PUSH UP' : '● MATCHED';
    const stopLabel = formatStops(absDiff) + ' stop';
    ctx.fillStyle = diff > 0.05 ? '#ff8c42' : diff < -0.05 ? '#5eff8a' : '#00d4aa';
    ctx.font = '700 10px "JetBrains Mono"';
    ctx.textAlign = 'center';
    ctx.fillText(stopLabel, arrowX, midY - 8);
    ctx.font = '800 8px "Inter"';
    ctx.fillText(dirLabel, arrowX, midY + 6);
  });

  // Title
  ctx.fillStyle = '#8b8b97';
  ctx.font = '600 11px "Inter"';
  ctx.textAlign = 'left';
  ctx.fillText('18% Middle Grey Placement & Stop Curves', pad.left, 20);

  // Update legend
  updateLegend(allCams);
  // Update results
  updateResults();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function updateLegend(allCams) {
  vizLegend.innerHTML = allCams.map(e =>
    `<div class="legend-item"><div class="legend-dot" style="background:${e.color}"></div>${e.cam.brand} ${e.cam.model}</div>`
  ).join('');
}

// ── Results Panel ──
function updateResults() {
  if (state.comparisons.length === 0) {
    resultsBody.innerHTML = '<div class="empty-state"><p>Add comparison cameras to see stop offsets, EI bumps, and LUT adjustments</p></div>';
    return;
  }

  const heroCam = getCam(state.hero.cameraId);
  const hProf = getProfile(heroCam, state.hero.profileIdx);
  const heroGrey = hProf.middleGrey;

  resultsBody.innerHTML = state.comparisons.map(comp => {
    const cam = getCam(comp.cameraId);
    const prof = getProfile(cam, comp.profileIdx);
    const iso = prof.baseISOs[comp.isoIdx] || prof.baseISOs[0];
    const compGrey = prof.middleGrey;
    const diff = stopDiff(heroGrey, compGrey);
    const diffClass = Math.abs(diff) < 0.1 ? 'neutral' : (diff > 0 ? 'positive' : 'negative');
    const ireDelta = compGrey - heroGrey;
    const ireDeltaStr = (ireDelta >= 0 ? '+' : '') + ireDelta.toFixed(1);

    // Determine direction
    const absDiff = Math.abs(diff);
    let dirClass, dirLabel, dirArrow;
    if (absDiff < 0.1) {
      dirClass = 'matched';
      dirLabel = 'MATCHED';
      dirArrow = '●';
    } else if (diff > 0) {
      dirClass = 'pull-down';
      dirLabel = formatStops(absDiff) + ' STOP PULL DOWN';
      dirArrow = '▼';
    } else {
      dirClass = 'push-up';
      dirLabel = formatStops(absDiff) + ' STOP PUSH UP';
      dirArrow = '▲';
    }

    return `<div class="result-card" style="animation-delay:${state.comparisons.indexOf(comp) * 0.05}s">
      <div class="result-brand-block">
        <div class="result-brand-dot" style="background:${cam.color};box-shadow:0 0 10px ${cam.color}44"></div>
        <span class="result-brand-name">${cam.brand}</span>
      </div>
      <div class="result-details">
        <div class="result-camera-name">${cam.model} · ${prof.name} · ISO ${iso}</div>
        <div class="stop-direction ${dirClass}"><span class="dir-arrow">${dirArrow}</span> ${dirLabel}</div>
        <div class="result-metrics">
          <div class="result-metric">
            <span class="result-metric-label">Middle Grey</span>
            <span class="result-metric-value neutral">${compGrey}% IRE</span>
          </div>
          <div class="result-metric">
            <span class="result-metric-label">vs Hero</span>
            <span class="result-metric-value ${diffClass}">${ireDeltaStr}% IRE</span>
          </div>
          <div class="result-metric">
            <span class="result-metric-label">DR Total</span>
            <span class="result-metric-value">${prof.dr.total || '—'} stops</span>
          </div>
        </div>
        <div class="result-recommendation"><strong>EI Adjustment:</strong> ${eiRecommendation(diff)}</div>
        <div class="result-recommendation"><strong>LUT/CDL Offset:</strong> ${lutRecommendation(diff)}</div>
      </div>
    </div>`;
  }).join('');
}

// ── Compact Tile View ──
const compactBody = document.getElementById('compact-bars-body');
const addCompBtnCompact = document.getElementById('add-comp-btn-compact');
addCompBtnCompact.addEventListener('click', () => { addComparison(); });

function isCompactMode() {
  return document.body.classList.contains('compact-view');
}

// Track which tiles are expanded
const expandedTiles = new Set(['hero']);

function toggleTile(id) {
  if (expandedTiles.has(id)) expandedTiles.delete(id);
  else expandedTiles.add(id);
  renderCompactBars();
}

function ireRange() {
  const heroCam = getCam(state.hero.cameraId);
  const hProf = getProfile(heroCam, state.hero.profileIdx);
  const allGreys = [hProf.middleGrey];
  state.comparisons.forEach(c => {
    allGreys.push(getProfile(getCam(c.cameraId), c.profileIdx).middleGrey);
  });
  const min = Math.min(...allGreys);
  const max = Math.max(...allGreys);
  const rMin = Math.max(0, Math.floor((min - 12) / 5) * 5);
  const rMax = Math.min(100, Math.ceil((max + 12) / 5) * 5);
  const range = rMax - rMin;
  return { rMin, rMax, range, pct: (ire) => ((ire - rMin) / range) * 100 };
}

function buildBarHTML(heroGrey, compGrey, heroColor, compColor, ir) {
  const heroX = ir.pct(heroGrey);
  const compX = ir.pct(compGrey);
  const connLeft = Math.min(heroX, compX);
  const connWidth = Math.abs(compX - heroX);
  const diff = stopDiff(heroGrey, compGrey);
  const connColor = diff > 0.05 ? '#ff8c42' : diff < -0.05 ? '#5eff8a' : '#00d4aa';

  // Ticks
  let ticksHtml = '';
  const step = (ir.rMax - ir.rMin) <= 30 ? 5 : 10;
  for (let ire = ir.rMin; ire <= ir.rMax; ire += step) {
    const p = ir.pct(ire);
    ticksHtml += `<div class="bar-tick" style="left:${p}%"><span class="bar-tick-label">${ire}</span></div>`;
  }

  return `${ticksHtml}
    <div class="bar-ref-line" style="left:${heroX}%;background:${heroColor}"></div>
    <div class="bar-ref-label" style="left:${heroX}%;color:${heroColor}">REF ${heroGrey}%</div>
    <div class="bar-cam-marker" style="left:${compX}%;background:${compColor}22">
      <div class="bar-cam-marker-inner" style="background:${compColor}"></div>
    </div>
    ${connWidth > 0.5 ? `<div class="bar-conn" style="left:${connLeft}%;width:${connWidth}%;color:${connColor}"></div>` : ''}`;
}

function miniBarHTML(heroGrey, compGrey, heroColor, compColor, ir) {
  const heroX = ir.pct(heroGrey);
  const compX = ir.pct(compGrey);
  const connLeft = Math.min(heroX, compX);
  const connWidth = Math.abs(compX - heroX);
  const diff = stopDiff(heroGrey, compGrey);
  const connColor = diff > 0.05 ? '#ff8c42' : diff < -0.05 ? '#5eff8a' : '#00d4aa';

  return `<div class="tile-mini-bar">
    <div class="tile-mini-ref" style="left:${heroX}%;background:${heroColor}"></div>
    <div class="tile-mini-marker" style="left:${compX}%;background:${compColor}22">
      <div class="tile-mini-marker-inner" style="background:${compColor}"></div>
    </div>
    ${connWidth > 0.5 ? `<div class="tile-mini-conn" style="left:${connLeft}%;width:${connWidth}%;color:${connColor}"></div>` : ''}
  </div>`;
}

function dirInfo(diff) {
  const abs = Math.abs(diff);
  if (abs < 0.1) return { cls: 'matched', label: '● MATCHED', arrow: '●', short: 'MATCHED' };
  if (diff > 0) return { cls: 'pull-down', label: '▼ ' + formatStops(abs) + ' STOP PULL DOWN', arrow: '▼', short: formatStops(abs) + ' PULL' };
  return { cls: 'push-up', label: '▲ ' + formatStops(abs) + ' STOP PUSH UP', arrow: '▲', short: formatStops(abs) + ' PUSH' };
}

function camOptionsHTML(selectedId) {
  let html = '';
  const groups = {};
  CAMERAS.forEach(c => { if (!groups[c.brand]) groups[c.brand] = []; groups[c.brand].push(c); });
  for (const [brand, cams] of Object.entries(groups)) {
    html += `<optgroup label="${brand}">`;
    cams.forEach(c => { html += `<option value="${c.id}" ${c.id === selectedId ? 'selected' : ''}>${c.model}</option>`; });
    html += '</optgroup>';
  }
  return html;
}

function chevronSVG() {
  return `<svg class="tile-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`;
}

function smallChevronSVG() {
  return `<svg class="tile-recs-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`;
}

function renderCompactBars() {
  if (!isCompactMode()) return;

  const heroCam = getCam(state.hero.cameraId);
  const hProf = getProfile(heroCam, state.hero.profileIdx);
  const heroGrey = hProf.middleGrey;
  const heroISO = hProf.baseISOs[state.hero.isoIdx] || hProf.baseISOs[0];
  const ir = ireRange();
  const heroExpanded = expandedTiles.has('hero');

  // ── Hero Tile ──
  let heroProfileOpts = '';
  heroCam.profiles.forEach((p, i) => {
    heroProfileOpts += `<option value="${i}" ${i === state.hero.profileIdx ? 'selected' : ''}>${p.name}</option>`;
  });
  let heroISOOpts = '';
  hProf.baseISOs.forEach((iso, i) => {
    heroISOOpts += `<option value="${i}" ${i === state.hero.isoIdx ? 'selected' : ''}>ISO ${iso}</option>`;
  });
  const dr = hProf.dr;
  const drText = dr.total ? dr.total + ' stops' : '—';
  const splitText = (dr.above && dr.below) ? `${dr.above} / ${dr.below}` : '—';

  let html = `<div class="tile is-hero ${heroExpanded ? 'expanded' : ''}" data-tile-id="hero">
    <div class="tile-summary" data-toggle="hero">
      <div class="tile-dot" style="background:${heroCam.color};color:${heroCam.color}"></div>
      <div class="tile-info">
        <div class="tile-cam-name">${heroCam.model}</div>
        <div class="tile-cam-sub">${hProf.name} · ISO ${heroISO} · Reference</div>
      </div>
      <span class="tile-ire-pill ref">${heroGrey}%</span>
      ${chevronSVG()}
    </div>
    <div class="tile-body">
      <div class="tile-body-inner">
        <div class="tile-selectors">
          <div class="form-group"><label>Camera</label><select class="hero-cam-sel">${camOptionsHTML(state.hero.cameraId)}</select></div>
          <div class="form-group"><label>Profile</label><select class="hero-prof-sel">${heroProfileOpts}</select></div>
          <div class="form-group"><label>ISO</label><select class="hero-iso-sel">${heroISOOpts}</select></div>
        </div>
        <div class="tile-details tile-hero-info">
          <div class="tile-detail-row"><span class="tile-detail-label">Middle Grey</span><span class="tile-detail-value" style="color:var(--accent)">${heroGrey}% IRE</span></div>
          <div class="tile-detail-row"><span class="tile-detail-label">Dynamic Range</span><span class="tile-detail-value">${drText}</span></div>
          <div class="tile-detail-row"><span class="tile-detail-label">DR Split</span><span class="tile-detail-value">${splitText}</span></div>
          <div class="tile-detail-row"><span class="tile-detail-label">Segment</span><span class="tile-detail-value">${heroCam.segment}</span></div>
        </div>
      </div>
    </div>
  </div>`;

  // ── Comparison Tiles ──
  state.comparisons.forEach((comp) => {
    const cam = getCam(comp.cameraId);
    const prof = getProfile(cam, comp.profileIdx);
    const compGrey = prof.middleGrey;
    const compISO = prof.baseISOs[comp.isoIdx] || prof.baseISOs[0];
    const diff = stopDiff(heroGrey, compGrey);
    const di = dirInfo(diff);
    const isExpanded = expandedTiles.has(comp.uid);
    const ireDelta = compGrey - heroGrey;
    const ireDeltaStr = (ireDelta >= 0 ? '+' : '') + ireDelta.toFixed(1);

    let profOpts = '';
    cam.profiles.forEach((p, i) => { profOpts += `<option value="${i}" ${i === comp.profileIdx ? 'selected' : ''}>${p.name}</option>`; });
    let isoOpts = '';
    prof.baseISOs.forEach((iso, i) => { isoOpts += `<option value="${i}" ${i === comp.isoIdx ? 'selected' : ''}>ISO ${iso}</option>`; });

    html += `<div class="tile ${isExpanded ? 'expanded' : ''}" data-tile-id="${comp.uid}" data-uid="${comp.uid}">
      <div class="tile-summary" data-toggle="${comp.uid}">
        <div class="tile-dot" style="background:${cam.color};color:${cam.color}"></div>
        <div class="tile-info">
          <div class="tile-cam-name">${cam.model}</div>
          <div class="tile-cam-sub">${prof.name} · ISO ${compISO}</div>
        </div>
        <span class="tile-ire-pill" style="color:${cam.color};border-color:${cam.color}44;background:${cam.color}11">${compGrey}%</span>
        ${chevronSVG()}
      </div>
      <div class="tile-infographic">
        ${miniBarHTML(heroGrey, compGrey, heroCam.color, cam.color, ir)}
        <span class="tile-badge ${di.cls}">${di.arrow} ${di.short}</span>
      </div>
      <div class="tile-body">
        <div class="tile-body-inner">
          <div class="tile-direction ${di.cls}">${di.label}</div>
          <div class="tile-full-bar" style="margin-bottom:22px">
            ${buildBarHTML(heroGrey, compGrey, heroCam.color, cam.color, ir)}
          </div>
          <div class="tile-details">
            <div class="tile-detail-row"><span class="tile-detail-label">Middle Grey</span><span class="tile-detail-value" style="color:${cam.color}">${compGrey}% IRE</span></div>
            <div class="tile-detail-row"><span class="tile-detail-label">vs Hero</span><span class="tile-detail-value ${diff > 0.05 ? 'negative' : diff < -0.05 ? 'positive' : ''}">${ireDeltaStr}% IRE</span></div>
            <div class="tile-detail-row"><span class="tile-detail-label">Stop Offset</span><span class="tile-detail-value ${diff > 0.05 ? 'negative' : diff < -0.05 ? 'positive' : ''}">${formatStops(diff)} stops</span></div>
            <div class="tile-detail-row"><span class="tile-detail-label">Dynamic Range</span><span class="tile-detail-value">${prof.dr.total || '—'} stops</span></div>
          </div>
          <div class="tile-recs" data-recs-uid="${comp.uid}">
            <div class="tile-recs-header">Adjustment Details ${smallChevronSVG()}</div>
            <div class="tile-recs-body">
              <div class="tile-recs-content">
                <strong>EI Adjustment:</strong> ${eiRecommendation(diff)}<br><br>
                <strong>LUT/CDL Offset:</strong> ${lutRecommendation(diff)}
              </div>
            </div>
          </div>
          <div class="tile-selectors">
            <div class="form-group"><label>Camera</label><select class="comp-cam-sel">${camOptionsHTML(comp.cameraId)}</select></div>
            <div class="form-group"><label>Profile</label><select class="comp-prof-sel">${profOpts}</select></div>
            <div class="form-group"><label>ISO</label><select class="comp-iso-sel">${isoOpts}</select></div>
          </div>
          <div class="tile-remove-row"><button class="tile-remove-btn" data-uid="${comp.uid}">Remove Camera</button></div>
        </div>
      </div>
    </div>`;
  });

  // Add button
  html += `<div class="tile-add" id="tile-add-btn">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    Add Camera
  </div>`;

  compactBody.innerHTML = html;
  wireCompactEvents();
}

function wireCompactEvents() {
  // Tile toggle
  compactBody.querySelectorAll('.tile-summary[data-toggle]').forEach(el => {
    el.addEventListener('click', () => toggleTile(el.dataset.toggle === 'hero' ? 'hero' : parseInt(el.dataset.toggle)));
  });

  // Hero selectors
  const heroCamSel = compactBody.querySelector('.hero-cam-sel');
  const heroProfSel = compactBody.querySelector('.hero-prof-sel');
  const heroIsoSel = compactBody.querySelector('.hero-iso-sel');
  if (heroCamSel) heroCamSel.addEventListener('change', e => {
    state.hero.cameraId = e.target.value; state.hero.profileIdx = 0; state.hero.isoIdx = 0;
    populateHeroProfiles(); renderCompactBars();
  });
  if (heroProfSel) heroProfSel.addEventListener('change', e => {
    state.hero.profileIdx = parseInt(e.target.value); state.hero.isoIdx = 0;
    populateHeroISO(); renderCompactBars();
  });
  if (heroIsoSel) heroIsoSel.addEventListener('change', e => {
    state.hero.isoIdx = parseInt(e.target.value);
    updateHeroInfo();
  });

  // Comparison selectors
  compactBody.querySelectorAll('.tile[data-uid]').forEach(tile => {
    const uid = parseInt(tile.dataset.uid);
    const comp = state.comparisons.find(c => c.uid === uid);
    if (!comp) return;

    const camSel = tile.querySelector('.comp-cam-sel');
    const profSel = tile.querySelector('.comp-prof-sel');
    const isoSel = tile.querySelector('.comp-iso-sel');

    if (camSel) camSel.addEventListener('change', e => {
      comp.cameraId = e.target.value; comp.profileIdx = 0; comp.isoIdx = 0;
      renderComparisons(); render(); renderCompactBars();
    });
    if (profSel) profSel.addEventListener('change', e => {
      comp.profileIdx = parseInt(e.target.value); comp.isoIdx = 0;
      renderComparisons(); render(); renderCompactBars();
    });
    if (isoSel) isoSel.addEventListener('change', e => {
      comp.isoIdx = parseInt(e.target.value);
      renderComparisons(); render(); renderCompactBars();
    });
  });

  // Remove buttons
  compactBody.querySelectorAll('.tile-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const uid = parseInt(btn.dataset.uid);
      expandedTiles.delete(uid);
      removeComparison(uid);
      renderCompactBars();
    });
  });

  // Recommendation accordion toggle
  compactBody.querySelectorAll('.tile-recs-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('open');
    });
  });

  // Add camera tile
  const addTile = compactBody.querySelector('#tile-add-btn');
  if (addTile) addTile.addEventListener('click', () => {
    addComparison();
    // Expand the new tile
    const newest = state.comparisons[state.comparisons.length - 1];
    if (newest) expandedTiles.add(newest.uid);
    renderCompactBars();
  });
}

// ── Window Resize ──
window.addEventListener('resize', () => { render(); renderCompactBars(); });

// ── View Toggle ──
const viewToggle = document.getElementById('view-toggle');
const toggleIconCompact = document.getElementById('toggle-icon-compact');
const toggleIconDesktop = document.getElementById('toggle-icon-desktop');
const toggleLabel = document.getElementById('toggle-label');

function setCompactMode(compact) {
  if (compact) {
    document.body.classList.add('compact-view');
  } else {
    document.body.classList.remove('compact-view');
  }
  toggleIconCompact.style.display = compact ? 'none' : '';
  toggleIconDesktop.style.display = compact ? '' : 'none';
  toggleLabel.textContent = compact ? 'Desktop' : 'Compact';
  render();
  renderCompactBars();
}

viewToggle.addEventListener('click', () => {
  setCompactMode(!document.body.classList.contains('compact-view'));
});

// ── Init (compact is default) ──
populateHeroCamera();
renderComparisons();
render();
setCompactMode(true);

