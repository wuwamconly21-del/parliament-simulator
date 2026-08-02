/* ==========================================================================
   POWER - Malaysia Geopolitics & Real-Time Midnight Simulator
   Game Engine & Application Logic
   ========================================================================== */

const STATE_SEATS = {
  "Johor": 56, "Kedah": 36, "Kelantan": 45, "Melaka": 28,
  "Negeri Sembilan": 36, "Pahang": 42, "Perak": 59, "Perlis": 15,
  "Pulau Pinang": 40, "Sabah": 73, "Sarawak": 82, "Selangor": 56,
  "Terengganu": 32, "Wilayah Persekutuan": 0
};

function majorityOf(seats) {
  return seats > 0 ? Math.floor(seats / 2) + 1 : 0;
}

function defaultStates() {
  const base = {
    "Johor": { mb: "Onn Hafiz Ghazi (Johor MB)", gov: "Barisan Nasional (30 Kerusi)" },
    "Kedah": { mb: "Muhammad Sanusi Md Nor (Kedah MB)", gov: "Perikatan Nasional (20 Kerusi)" },
    "Kelantan": { mb: "Mohd Nassuruddin Daud (Kelantan MB)", gov: "Perikatan Nasional (41 Kerusi)" },
    "Melaka": { mb: "Ab Rauf Yusoh (Melaka CM)", gov: "Barisan Nasional (16 Kerusi)" },
    "Negeri Sembilan": { mb: "Aminuddin Harun (N.Sembilan MB)", gov: "Pakatan Harapan (22 Kerusi)" },
    "Pahang": { mb: "Wan Rosdy Wan Ismail (Pahang MB)", gov: "Barisan Nasional (24 Kerusi)" },
    "Perak": { mb: "Saarani Mohamad (Perak MB)", gov: "Unity Alliance (33 Kerusi)" },
    "Perlis": { mb: "Mohd Shukri Ramli (Perlis MB)", gov: "Perikatan Nasional (10 Kerusi)" },
    "Pulau Pinang": { mb: "Chow Kon Yeow (Penang CM)", gov: "Pakatan Harapan (29 Kerusi)" },
    "Sabah": { mb: "Hajiji Noor (Sabah CM)", gov: "GRS Alliance (44 Kerusi)" },
    "Sarawak": { mb: "Abang Johari Openg (Sarawak Premier)", gov: "GPS Alliance (76 Kerusi)" },
    "Selangor": { mb: "Amirudin Shari (Selangor MB)", gov: "Pakatan Harapan (34 Kerusi)" },
    "Terengganu": { mb: "Ahmad Samsuri Mokhtar (Terengganu MB)", gov: "Perikatan Nasional (24 Kerusi)" },
    "Wilayah Persekutuan": { mb: "Ditadbir Kerajaan Persekutuan (Menteri WP)", gov: "Kerajaan Persekutuan" }
  };
  const out = {};
  for (const name in STATE_SEATS) {
    out[name] = { seats: STATE_SEATS[name], mb: base[name].mb, gov: base[name].gov };
  }
  return out;
}

function defaultGameState() {
  return {
    player: {
      name: "Ahli Politik Baharu",
      pp: 50.0,
      funds: 500000,
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop",
      location: "Selangor / Malaysia",
      partyPower: 220,
      reputation: 68.5,
      btc: 0,
      bio: "Memacu reformasi ekonomi, kebajikan rakyat dan perpaduan nasional.",
      partyName: "Gabungan Reformasi Rakyat",
      ideology: "Social Democracy"
    },
    candidates: [
      { name: "Dato' Sri Haris", party: "Barisan Nasional (BN)", logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Symbol_green_circle.svg", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop", strength: 5253.3, polling: 48.5, votes: 5430210, electoral: 108 },
      { name: "Tan Sri Razak", party: "Perikatan Nasional (PN)", logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/External_link_font_awesome.svg", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop", strength: 5120.5, polling: 42.0, votes: 4878521, electoral: 95 },
      { name: "Ahli Politik Baharu (You)", party: "Gabungan Reformasi Rakyat", logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Blue_flag_icon.svg", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop", strength: 350.0, polling: 9.5, votes: 1243559, electoral: 19 }
    ],
    states: defaultStates(),
    lobbies: [
      { group: "PETRONAS Energy & Petroleum", head: "Dato' Azman", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop", stateStr: 120, natStr: 95, rel: 65 },
      { group: "Palm Oil & Plantation Guild (MPOB)", head: "Tan Sri Lim", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop", stateStr: 90, natStr: 85, rel: 55 },
      { group: "Banking & Islamic Finance Consortium", head: "Tengku Zafrul", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop", stateStr: 110, natStr: 90, rel: 60 }
    ],
    bills: [
      { code: "RUU: Pakej Rangsangan Ekonomi", law: "Dana Bantuan Perniagaan & Infrastruktur", ayes: 118, nays: 90, abstentions: 14, author: "Anda", timer: "23 jam" },
      { code: "RUU: Akta Cukai E-Dagang & Teknologi", law: "Kerangka Perlesenan Ekonomi Digital", ayes: 112, nays: 98, abstentions: 12, author: "Jawatankuasa Dewan", timer: "12 jam" }
    ],
    roster: [
      { name: "Anda (Pengerusi)", power: 220, inf: 85, role: "Pengerusi Parti" },
      { name: "Syed Saddiq", power: 180, inf: 70, role: "Ketua Pemuda" },
      { name: "Rafizi Ramli", power: 150, inf: 65, role: "Pengarah Ekonomi" }
    ],
    spectrum: ["Extremely Left Wing", "Very Left Wing", "Left Wing", "Center Left", "Centrist", "Center Right", "Right Wing", "Extremely Right Wing"],
    econPos: 4,
    socialPos: 5,
    selectedState: "Selangor"
  };
}

let state = defaultGameState();
let currentUser = null;
let lastMidnightReset = null;
let saveTimer = null;

/* Boot & Auth Handling */
window.addEventListener("DOMContentLoaded", async () => {
  if (!sb) {
    document.getElementById("bootLoader").innerHTML =
      "<p style='max-width:360px;text-align:center;color:#fca5a5;'>⚠️ Supabase belum dikonfigurasi. Sila isi SUPABASE_URL & SUPABASE_ANON_KEY di dalam js/supabase-client.js</p>";
    return;
  }
  const { data: { session } } = await sb.auth.getSession();
  if (session && session.user) {
    currentUser = session.user;
    await routeAfterAuth();
  } else {
    document.getElementById("bootLoader").style.display = "none";
    document.getElementById("authModal").style.display = "flex";
  }

  sb.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      currentUser = null;
    }
  });
});

async function routeAfterAuth() {
  document.getElementById("authModal").style.display = "none";
  setBtnLoading("loginBtn", false, "⚡ Log Masuk Ke Server Game");
  setBtnLoading("registerBtn", false, "✨ Cipta Akaun Baru");

  const { data: profile } = await sb.from("player_profiles").select("*").eq("user_id", currentUser.id).maybeSingle();

  if (!profile) {
    document.getElementById("bootLoader").style.display = "none";
    document.getElementById("setupScreen").style.display = "block";
    document.getElementById("charName").value = currentUser.email.split("@")[0];
    return;
  }

  const { data: gs } = await sb.from("game_state").select("*").eq("user_id", currentUser.id).maybeSingle();

  state = defaultGameState();
  state.player.name = profile.character_name;
  state.player.partyName = profile.party_name;
  state.player.ideology = profile.ideology;
  state.player.bio = profile.bio || state.player.bio;
  state.player.portrait = profile.portrait_url || state.player.portrait;
  state.player.location = (profile.base_state || "Selangor") + " / Malaysia";
  state.selectedState = profile.base_state || "Selangor";

  if (gs) {
    state.player.pp = Number(gs.political_power);
    state.player.funds = Number(gs.liquid_capital);
    state.player.partyPower = Number(gs.party_power);
    state.player.reputation = Number(gs.reputation);
    state.player.btc = Number(gs.btc);
    state.econPos = gs.econ_position;
    state.socialPos = gs.social_position;
    if (gs.candidates) state.candidates = gs.candidates;
    if (gs.states) state.states = gs.states;
    if (gs.lobbies) state.lobbies = gs.lobbies;
    if (gs.bills) state.bills = gs.bills;
    if (gs.roster) state.roster = gs.roster;
    lastMidnightReset = gs.last_midnight_reset;
  }

  document.getElementById("bootLoader").style.display = "none";
  document.getElementById("dashboardScreen").style.display = "block";
  document.getElementById("mainHeader").style.display = "flex";
  document.getElementById("mainFooter").style.display = "flex";

  applyCatchUpMidnightResets();
  startMYTMidnightClock();
  updateUI();
  showToast(`Selamat kembali, ${state.player.name}! Data permainan dimuatkan.`);
}

function setBtnLoading(id, loading, label) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.disabled = loading;
  btn.innerHTML = loading ? '<span class="spinner"></span> Sila tunggu...' : label;
}

function showAuthError(msg) {
  const el = document.getElementById("authError");
  el.innerText = msg;
  el.style.display = "block";
}
function hideAuthError() {
  document.getElementById("authError").style.display = "none";
}

function switchAuthTab(type) {
  hideAuthError();
  document.querySelectorAll('.auth-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (type === 'login') {
    document.getElementById('tabLoginBtn').classList.add('active');
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
  } else {
    document.getElementById('tabRegisterBtn').classList.add('active');
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
  }
}

async function handleAuth(e) {
  e.preventDefault();
  hideAuthError();
  if (!sb) return showAuthError("Supabase belum dikonfigurasi.");
  setBtnLoading("loginBtn", true);
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPass").value;
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    setBtnLoading("loginBtn", false, "⚡ Log Masuk Ke Server Game");
    return showAuthError(error.message);
  }
  currentUser = data.user;
  await routeAfterAuth();
}

async function handleRegister(e) {
  e.preventDefault();
  hideAuthError();
  if (!sb) return showAuthError("Supabase belum dikonfigurasi.");
  setBtnLoading("registerBtn", true);
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;
  const username = document.getElementById("regUsername").value;
  const { data, error } = await sb.auth.signUp({ email, password, options: { data: { username } } });
  if (error) {
    setBtnLoading("registerBtn", false, "✨ Cipta Akaun Baru");
    return showAuthError(error.message);
  }
  if (!data.session) {
    setBtnLoading("registerBtn", false, "✨ Cipta Akaun Baru");
    showAuthError("Akaun dicipta! Sila semak emel anda untuk sahkan akaun sebelum log masuk.");
    switchAuthTab('login');
    document.getElementById("authEmail").value = email;
    return;
  }
  currentUser = data.user;
  await routeAfterAuth();
}

async function logoutPlayer() {
  if (sb) await sb.auth.signOut();
  location.reload();
}

async function initGame(e) {
  e.preventDefault();
  setBtnLoading("startGameBtn", true);
  const name = document.getElementById("charName").value;
  const baseState = document.getElementById("startNation").value;
  const partyName = document.getElementById("partyName").value;
  const ideology = document.getElementById("partyIdeology").value;

  state = defaultGameState();
  state.player.name = name;
  state.player.location = baseState + " / Malaysia";
  state.player.partyName = partyName;
  state.player.ideology = ideology;
  state.selectedState = baseState;
  state.candidates.name = name + " (You)";
  state.candidates.party = partyName;

  if (sb && currentUser) {
    await sb.from("player_profiles").upsert({
      user_id: currentUser.id,
      username: currentUser.email.split("@")[0],
      character_name: name,
      party_name: partyName,
      ideology: ideology,
      bio: state.player.bio,
      portrait_url: state.player.portrait,
      base_state: baseState,
      updated_at: new Date().toISOString()
    });
    await sb.from("game_state").upsert(buildGameStateRow());
    lastMidnightReset = new Date().toISOString();
  }

  document.getElementById("setupScreen").style.display = "none";
  document.getElementById("dashboardScreen").style.display = "block";
  document.getElementById("mainHeader").style.display = "flex";
  document.getElementById("mainFooter").style.display = "flex";

  startMYTMidnightClock();
  updateUI();
  showToast(`Selamat datang ${state.player.name}! Permainan bermula dengan MYR 500,000.`);
}

function buildGameStateRow() {
  return {
    user_id: currentUser.id,
    political_power: state.player.pp,
    liquid_capital: state.player.funds,
    party_power: state.player.partyPower,
    reputation: state.player.reputation,
    btc: state.player.btc,
    econ_position: state.econPos,
    social_position: state.socialPos,
    candidates: state.candidates,
    states: state.states,
    lobbies: state.lobbies,
    bills: state.bills,
    roster: state.roster,
    last_midnight_reset: lastMidnightReset || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

function queueSave() {
  if (!sb || !currentUser) return;
  const pill = document.getElementById("saveStatus");
  if (pill) { pill.innerText = "Menyimpan..."; pill.className = "save-status saving"; }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    const { error } = await sb.from("game_state").upsert(buildGameStateRow());
    if (pill) {
      if (error) { pill.innerText = "Ralat simpan"; pill.className = "save-status error"; }
      else { pill.innerText = "Tersimpan"; pill.className = "save-status saved"; }
    }
  }, 900);
}

async function saveProfileToDb() {
  if (!sb || !currentUser) return;
  await sb.from("player_profiles").update({
    character_name: state.player.name,
    bio: document.getElementById("inputCharBio") ? document.getElementById("inputCharBio").value : state.player.bio,
    portrait_url: state.player.portrait,
    updated_at: new Date().toISOString()
  }).eq("user_id", currentUser.id);
}

function nowInMYT() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (8 * 60 * 60000));
}

function applyCatchUpMidnightResets() {
  if (!lastMidnightReset) { lastMidnightReset = nowInMYT().toISOString(); return; }
  const last = new Date(lastMidnightReset);
  const nowMyt = nowInMYT();
  const lastUtc = last.getTime();
  const lastMytCalc = new Date(lastUtc + 8 * 60 * 60000);
  let daysPassed = Math.floor((nowMyt.setHours(0,0,0,0) - new Date(lastMytCalc).setHours(0,0,0,0)) / 86400000);

  if (daysPassed > 0) {
    state.player.pp += 15.0 * daysPassed;
    state.player.funds += 50000 * daysPassed;
    showToast(`🌅 ${daysPassed} reset harian tertangguh diproses: +${(15*daysPassed).toFixed(1)} PP & +MYR ${(50000*daysPassed).toLocaleString()}!`);
  }
  lastMidnightReset = new Date().toISOString();
  queueSave();
}

function startMYTMidnightClock() {
  setInterval(() => {
    const mytDate = nowInMYT();
    const nextMidnight = new Date(mytDate);
    nextMidnight.setHours(24, 0, 0, 0);

    const diffMs = nextMidnight - mytDate;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

    const formatTwo = num => String(num).padStart(2, '0');
    const el = document.getElementById("mytCountdown");
    if (el) el.innerText = `${formatTwo(hours)}:${formatTwo(mins)}:${formatTwo(secs)}`;

    if (hours === 0 && mins === 0 && secs === 0) {
      executeDailyMidnightReset();
    }
  }, 1000);
}

function executeDailyMidnightReset() {
  state.player.pp += 15.0;
  state.player.funds += 50000;
  lastMidnightReset = new Date().toISOString();
  showToast("🌅 RESET HARIAN MIDNIGHT (12:00 AM MYT): +15 Political Power & +MYR 50,000 ditambah!");
  updateUI();
  queueSave();
}

function showToast(msg, isError) {
  const banner = document.getElementById("toastBanner");
  banner.innerText = msg;
  banner.className = isError ? "error" : "";
  banner.style.display = "block";
  setTimeout(() => { banner.style.display = "none"; }, 3500);
}

function updateUI() {
  document.getElementById("navPlayerName").innerText = state.player.name;
  document.getElementById("profileTitle").innerText = state.player.name;
  document.getElementById("barPower").innerText = state.player.pp.toFixed(1);
  document.getElementById("barFunds").innerText = `MYR ${Math.round(state.player.funds).toLocaleString()}`;
  document.getElementById("btcHoldings").innerText = state.player.btc;

  document.getElementById("inputCharName").value = state.player.name;
  document.getElementById("inputLocation").value = state.player.location;

  populateStateSelect();
  renderCandidates();
  renderLobbies();
  renderBills();
  renderRoster();
  renderMBRoster();
  loadStateDUN(state.selectedState);
  document.getElementById("econSlider").value = state.econPos;
  document.getElementById("socialSlider").value = state.socialPos;
  document.getElementById("lblEconPos").innerText = state.spectrum[state.econPos - 1];
  document.getElementById("lblSocialPos").innerText = state.spectrum[state.socialPos - 1];
}

function populateStateSelect() {
  const sel = document.getElementById("stateSelect");
  if (sel.dataset.filled) { sel.value = state.selectedState; return; }
  sel.innerHTML = "";
  for (const [name, info] of Object.entries(state.states)) {
    const opt = document.createElement("option");
    opt.value = name;
    opt.innerText = info.seats > 0
      ? `${name} (${info.seats} Kerusi | ${majorityOf(info.seats)} Majoriti)`
      : `${name} (Ditadbir Persekutuan)`;
    sel.appendChild(opt);
  }
  sel.value = state.selectedState;
  sel.dataset.filled = "1";
}

function renderCandidates() {
  const tbody = document.getElementById("candidateTableBody");
  tbody.innerHTML = "";
  document.getElementById("pmStatus").innerText =
    `YAB Perdana Menteri: ${state.candidates[0].name} (Unjuran Kerusi Terbesar: ${state.candidates[0].electoral})`;
  state.candidates.forEach((c, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${c.photo}" class="candidate-portrait">
          <span style="font-weight:bold; color:#38bdf8">${c.name}</span>
        </div>
      </td>
      <td>
        <div style="display:flex; align-items:center; gap:8px;">
          <img src="${c.logo}" class="party-logo">
          <span>${c.party}</span>
        </div>
      </td>
      <td style="font-weight:bold;">${c.strength.toFixed(1)}</td>
      <td>
        <div style="font-weight:bold;">${c.polling.toFixed(1)}%</div>
        <div style="font-size:11px; color:var(--text-muted);">${c.votes.toLocaleString()} pengundi</div>
      </td>
      <td style="font-weight:bold;">${c.electoral} Kerusi</td>
      <td>
        <button class="btn-blue" onclick="campaignForCandidate(${idx})">Kempen Calon (10 PP, MYR 100k)</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function loadStateDUN(stateName) {
  state.selectedState = stateName;
  const s = state.states[stateName];
  if (!s) return;
  document.getElementById("stateTitle").innerText =
    stateName === "Wilayah Persekutuan" ? "Wilayah Persekutuan (KL / Putrajaya / Labuan)" : `Dewan Undangan Negeri (DUN) ${stateName}`;
  document.getElementById("stateTotalSeats").innerText = s.seats > 0 ? `${s.seats} Kerusi` : "Tiada DUN";
  document.getElementById("stateMajority").innerText = s.seats > 0 ? `${majorityOf(s.seats)} Kerusi` : "N/A";
  document.getElementById("stateMB").innerText = s.mb;
  document.getElementById("stateGov").innerText = s.gov;

  const dunBody = document.getElementById("dunSeatTableBody");
  dunBody.innerHTML = "";
  if (s.seats === 0) {
    dunBody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:var(--text-muted);">Wilayah Persekutuan tidak mempunyai DUN — ditadbir terus oleh Kerajaan Persekutuan.</td></tr>`;
    return;
  }
  const sampleCount = Math.min(3, s.seats);
  for (let i = 1; i <= sampleCount; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>N.${i} Kawasan ${stateName}</td><td>ADUN Kawasan ${i}</td><td>${i <= majorityOf(s.seats) ? "Kerajaan Negeri" : "Pembangkang Negeri"}</td>`;
    dunBody.appendChild(tr);
  }
}

function campaignStateDUN() {
  if (state.player.pp >= 10 && state.player.funds >= 50000) {
    state.player.pp -= 10;
    state.player.funds -= 50000;
    showToast(`Kempen DUN ${state.selectedState} selesai! Unjuran kerusi DUN meningkat.`);
    updateUI();
    queueSave();
  } else showToast("Memerlukan sekurang-kurangnya 10 PP dan MYR 50,000!", true);
}

function renderMBRoster() {
  const tbody = document.getElementById("mbRosterTableBody");
  tbody.innerHTML = "";
  for (const [st, info] of Object.entries(state.states)) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-weight:bold; color:#38bdf8">${st}</td>
      <td><b>${info.mb}</b></td>
      <td>${info.gov}</td>
      <td>${info.seats > 0 ? info.seats + " Kerusi" : "Tiada DUN"}</td>
      <td><button class="btn-blue" onclick="switchTab('tabStateDUN'); loadStateDUN('${st}'); document.getElementById('stateSelect').value='${st}';">Semak DUN</button></td>
    `;
    tbody.appendChild(tr);
  }
}

function campaignForCandidate(idx) {
  if (state.player.pp >= 10 && state.player.funds >= 100000) {
    state.player.pp -= 10;
    state.player.funds -= 100000;
    state.candidates[idx].strength += 150.0;
    state.candidates[idx].polling = Math.min(100, state.candidates[idx].polling + 1.8);
    state.candidates[idx].electoral = Math.min(222, state.candidates[idx].electoral + 3);

    showToast(`Kempen dilancar untuk ${state.candidates[idx].name}! Unjuran kerusi Dewan Rakyat meningkat.`);
    updateUI();
    queueSave();
  } else {
    showToast("Memerlukan sekurang-kurangnya 10 PP dan MYR 100,000!", true);
  }
}

function renderLobbies() {
  const tbody = document.getElementById("lobbyTableBody");
  tbody.innerHTML = "";
  state.lobbies.forEach((l, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-weight:bold; color:#f8fafc;">${l.group}</td>
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${l.photo}" class="lobby-head-photo">
          <span>${l.head}</span>
        </div>
      </td>
      <td>${l.stateStr}</td>
      <td>${l.natStr}</td>
      <td style="color:#22c55e; font-weight:bold;">${l.rel}%</td>
      <td>
        <button class="btn-green" onclick="lobbyGroup(${idx})">Lobi Kumpulan (5 PP)</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function lobbyGroup(idx) {
  if (state.player.pp >= 5) {
    state.player.pp -= 5;
    state.lobbies[idx].rel = Math.min(100, state.lobbies[idx].rel + 8);
    showToast(`Hubungan dengan ${state.lobbies[idx].group} meningkat kepada ${state.lobbies[idx].rel}%!`);
    updateUI();
    queueSave();
  } else showToast("Memerlukan sekurang-kurangnya 5 PP!", true);
}

function renderBills() {
  const tbody = document.getElementById("billsTableBody");
  tbody.innerHTML = "";
  state.bills.forEach((b, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="color:#38bdf8; font-weight:bold;">${b.code}</td>
      <td>${b.law}</td>
      <td style="color:#22c55e; font-weight:bold;">${b.ayes}</td>
      <td style="color:#ef4444; font-weight:bold;">${b.nays}</td>
      <td>${b.abstentions}</td>
      <td>${b.author}</td>
      <td>${b.timer}</td>
      <td>
        <button class="btn-green" onclick="voteBill(${idx}, 'aye')">Setuju</button>
        <button class="btn-red" onclick="voteBill(${idx}, 'nay')">Bantah</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function voteBill(idx, vote) {
  if (vote === 'aye') state.bills[idx].ayes++;
  if (vote === 'nay') state.bills[idx].nays++;
  showToast(`Undian ${vote.toUpperCase()} dihantar untuk ${state.bills[idx].code} di Dewan Rakyat.`);
  updateUI();
  queueSave();
}

function renderRoster() {
  const tbody = document.getElementById("partyRosterBody");
  tbody.innerHTML = "";
  state.roster.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.name}</td><td>${r.power}</td><td>${r.inf}</td><td><b style="color:#38bdf8">${r.role}</b></td>`;
    tbody.appendChild(tr);
  });
}

function convertCapital() {
  const amt = parseInt(document.getElementById("convertAmount").value);
  if (amt && state.player.funds >= amt) {
    state.player.funds -= amt;
    state.player.pp += Math.floor(amt / 10000);
    showToast(`Penukaran MYR ${amt.toLocaleString()} kepada Dana Kempen berjaya! Reputasi meningkat.`);
    updateUI();
    queueSave();
  } else showToast("Liquid Capital tidak mencukupi!", true);
}

function runAttackAd() {
  const targetIdx = document.getElementById("attackTarget").value;
  if (state.player.pp >= 10 && state.player.funds >= 30000) {
    state.player.pp -= 10;
    state.player.funds -= 30000;
    state.candidates[targetIdx].polling = Math.max(0, state.candidates[targetIdx].polling - 2.5);
    showToast(`Iklan serangan dilancar terhadap ${state.candidates[targetIdx].name}! Polling pesaing menurun.`);
    updateUI();
    queueSave();
  } else showToast("Memerlukan sekurang-kurangnya 10 PP dan MYR 30,000!", true);
}

function updateIdeology(type, val) {
  if (type === 'econ') { state.econPos = parseInt(val); document.getElementById("lblEconPos").innerText = state.spectrum[val - 1]; }
  if (type === 'social') { state.socialPos = parseInt(val); document.getElementById("lblSocialPos").innerText = state.spectrum[val - 1]; }
  showToast(`Spektrum politik dikemaskini kepada ${state.spectrum[val - 1]}!`);
  queueSave();
}

function campaignPartyChair() {
  if (state.player.pp >= 10) {
    state.player.pp -= 10;
    state.player.partyPower += 25;
    state.roster[0].power = state.player.partyPower;
    showToast("Kempen Pengerusi Parti dilancar! Power parti meningkat.");
    updateUI();
    queueSave();
  } else showToast("Memerlukan sekurang-kurangnya 10 PP!", true);
}

function buyStock(name, price) {
  if (state.player.funds >= price) {
    state.player.funds -= price;
    showToast(`Pembelian unit saham ${name} berjaya!`);
    updateUI();
    queueSave();
  } else showToast("Liquid Capital tidak mencukupi!", true);
}

function buyCrypto(type, price) {
  if (state.player.funds >= price) {
    state.player.funds -= price;
    state.player.btc++;
    showToast(`Pembelian 1 unit ${type} berjaya!`);
    updateUI();
    queueSave();
  } else showToast("Liquid Capital tidak mencukupi!", true);
}

function createCorp() {
  const name = document.getElementById("corpName").value;
  if (name && state.player.funds >= 100000) {
    state.player.funds -= 100000;
    showToast(`Pendaftaran Syarikat Awam '${name}' berjaya!`);
    updateUI();
    queueSave();
  } else showToast("Sila masukkan nama & pastikan dana mencukupi!", true);
}

function uploadLocalPortrait(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      state.player.portrait = evt.target.result;
      document.getElementById("portraitPreview").src = state.player.portrait;
      state.candidates.photo = state.player.portrait;
      showToast("Foto calon berjaya dimuat naik!");
      updateUI();
      saveProfileToDb();
      queueSave();
    };
    reader.readAsDataURL(file);
  }
}

function updatePortraitUrl(url) {
  if (url) {
    state.player.portrait = url;
    document.getElementById("portraitPreview").src = url;
    state.candidates.photo = url;
    showToast("URL gambar calon dikemaskini!");
    updateUI();
    saveProfileToDb();
    queueSave();
  }
}

function updateCharName(val) {
  if (val) {
    state.player.name = val;
    state.candidates.name = val + " (You)";
    updateUI();
  }
}

function saveProfile() {
  state.player.name = document.getElementById("inputCharName").value;
  state.player.bio = document.getElementById("inputCharBio").value;
  state.candidates.name = state.player.name + " (You)";
  updateUI();
  saveProfileToDb();
  queueSave();
  showToast("Profil calon berjaya disimpan!");
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-page').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).style.display = 'block';
}