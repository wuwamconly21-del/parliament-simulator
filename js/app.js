/* ==========================================================================
   POWER - Malaysia Geopolitics, Cabinet & 1-Week Election Simulator
   Game Engine & Application Logic (Robust Timeout & Fallback Edition)
   ========================================================================== */

/* Real Malaysian Political Parties & Coalitions */
const REAL_MALAYSIAN_PARTIES = [
  { 
    id: "ph", 
    name: "Pakatan Harapan (PH)", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Pakatan_Harapan_logo.png", 
    color: "#ef4444", 
    seats: 82, 
    polling: 36.8, 
    leader: "Anwar Ibrahim", 
    ideology: "Social Democracy / Reformist" 
  },
  { 
    id: "pn", 
    name: "Perikatan Nasional (PN)", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/External_link_font_awesome.svg", 
    color: "#0284c7", 
    seats: 74, 
    polling: 33.2, 
    leader: "Muhyiddin Yassin", 
    ideology: "Conservatism / Malay-Muslim Unity" 
  },
  { 
    id: "bn", 
    name: "Barisan Nasional (BN)", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Symbol_green_circle.svg", 
    color: "#1e3a8a", 
    seats: 30, 
    polling: 18.5, 
    leader: "Ahmad Zahid Hamidi", 
    ideology: "Traditional Conservatism / Nationalism" 
  },
  { 
    id: "gps", 
    name: "Gabungan Parti Sarawak (GPS)", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Blue_flag_icon.svg", 
    color: "#f59e0b", 
    seats: 23, 
    polling: 6.2, 
    leader: "Abang Johari Openg", 
    ideology: "Regional Autonomy / Sarawak First" 
  },
  { 
    id: "grs", 
    name: "Gabungan Rakyat Sabah (GRS)", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/Sabah_flag_icon.png", 
    color: "#10b981", 
    seats: 6, 
    polling: 2.8, 
    leader: "Hajiji Noor", 
    ideology: "Sabah Regional Autonomy" 
  },
  { 
    id: "warisan", 
    name: "Parti Warisan (WARISAN)", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Blue_flag_icon.svg", 
    color: "#a855f7", 
    seats: 3, 
    polling: 1.5, 
    leader: "Shafie Apdal", 
    ideology: "Multiracialism / Sabah Unity" 
  },
  { 
    id: "muda", 
    name: "Ikatan Demokratik Malaysia (MUDA)", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Pakatan_Harapan_logo.png", 
    color: "#f43f5e", 
    seats: 1, 
    polling: 1.0, 
    leader: "Syed Saddiq", 
    ideology: "Youth Politics / Progressive" 
  }
];

/* 14 Malaysian States/Territories & Real DUN Seat Counts */
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
    "Johor": { mb: "Onn Hafiz Ghazi (Johor MB)", gov: "Barisan Nasional (40 Kerusi)" },
    "Kedah": { mb: "Muhammad Sanusi Md Nor (Kedah MB)", gov: "Perikatan Nasional (33 Kerusi)" },
    "Kelantan": { mb: "Mohd Nassuruddin Daud (Kelantan MB)", gov: "Perikatan Nasional (42 Kerusi)" },
    "Melaka": { mb: "Ab Rauf Yusoh (Melaka CM)", gov: "Barisan Nasional (21 Kerusi)" },
    "Negeri Sembilan": { mb: "Aminuddin Harun (N.Sembilan MB)", gov: "Pakatan Harapan (31 Kerusi)" },
    "Pahang": { mb: "Wan Rosdy Wan Ismail (Pahang MB)", gov: "Barisan Nasional (24 Kerusi)" },
    "Perak": { mb: "Saarani Mohamad (Perak MB)", gov: "Unity Alliance (33 Kerusi)" },
    "Perlis": { mb: "Mohd Shukri Ramli (Perlis MB)", gov: "Perikatan Nasional (14 Kerusi)" },
    "Pulau Pinang": { mb: "Chow Kon Yeow (Penang CM)", gov: "Pakatan Harapan (29 Kerusi)" },
    "Sabah": { mb: "Hajiji Noor (Sabah CM)", gov: "GRS Alliance (44 Kerusi)" },
    "Sarawak": { mb: "Abang Johari Openg (Sarawak Premier)", gov: "GPS Alliance (76 Kerusi)" },
    "Selangor": { mb: "Amirudin Shari (Selangor MB)", gov: "Pakatan Harapan (34 Kerusi)" },
    "Terengganu": { mb: "Ahmad Samsuri Mokhtar (Terengganu MB)", gov: "Perikatan Nasional (32 Kerusi)" },
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
      name: "Wan Luqman",
      pp: 400.0,
      funds: 1000000,
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop",
      location: "Selangor / Malaysia",
      partyPower: 220,
      reputation: 75.0,
      btc: 0,
      bio: "Memacu reformasi ekonomi, kebajikan rakyat dan perpaduan nasional.",
      partyName: "Pakatan Harapan (PH)",
      ideology: "Social Democracy / Reformist",
      role: "Perdana Menteri / Presiden Parti"
    },
    cabinet: {
      finance: "Rafizi Ramli (Menteri Kewangan)",
      defense: "Mohamad Hasan (Menteri Pertahanan)",
      home: "Saifuddin Nasution (Menteri Dalam Negeri)",
      education: "Fadhlina Sidek (Menteri Pendidikan)",
      health: "Dzulkefly Ahmad (Menteri Kesihatan)",
      foreign: "Zambry Abdul Kadir (Menteri Luar Negeri)"
    },
    sprmAudit: { status: "Bersih", risk: "Rendah", activeInvestigations: 0 },
    pdrmStatus: { orderLevel: "Aman", riotRisk: "Rendah", officersDeployed: 12000 },
    articles: [
      { title: "Rancangan Pembangunan Ekonomi Digital Selangor 2026", author: "Wan Luqman", date: "2 jam lepas", views: 4250, likes: 890 }
    ],
    chatMessages: [
      { sender: "Sistem", text: "Selamat datang ke Server Geopolitik & Parlimen Malaysia!" }
    ],
    parties: JSON.parse(JSON.stringify(REAL_MALAYSIAN_PARTIES)),
    states: defaultStates(),
    lobbies: [
      { group: "PETRONAS Energy & Petroleum", head: "Dato' Azman", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop", stateStr: 120, natStr: 95, rel: 65 },
      { group: "Palm Oil & Plantation Guild (MPOB)", head: "Tan Sri Lim", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop", stateStr: 90, natStr: 85, rel: 55 },
      { group: "Banking & Islamic Finance Consortium", head: "Tengku Zafrul", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop", stateStr: 110, natStr: 90, rel: 60 }
    ],
    bills: [
      { code: "RUU.2020: Pakej Rangsangan Ekonomi", law: "Dana Bantuan Perniagaan & Infrastruktur", ayes: 118, nays: 90, abstentions: 14, author: "Wan Luqman", timer: "23 jam" },
      { code: "RUU.2021: Akta Cukai E-Dagang & Teknologi", law: "Kerangka Perlesenan Ekonomi Digital", ayes: 112, nays: 98, abstentions: 12, author: "Jawatankuasa Dewan", timer: "12 jam" }
    ],
    roster: [
      { name: "Wan Luqman (Anda)", power: 220, inf: 85, role: "Pengerusi / Presiden Parti" },
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

/* Robust Boot & Timeout Handler: Guarantees Loader Hides Within 2.5s */
window.addEventListener("DOMContentLoaded", async () => {
  const forceDismissTimeout = setTimeout(() => {
    const bootLoader = document.getElementById("bootLoader");
    if (bootLoader && bootLoader.style.display !== "none") {
      console.warn("Supabase network timeout reached. Falling back to local auth modal.");
      bootLoader.style.display = "none";
      document.getElementById("authModal").style.display = "flex";
    }
  }, 2500);

  try {
    if (sb && sb.auth) {
      const { data, error } = await sb.auth.getSession();
      if (data && data.session && data.session.user) {
        currentUser = data.session.user;
        clearTimeout(forceDismissTimeout);
        await routeAfterAuth();
        return;
      }
    }
  } catch (err) {
    console.warn("Supabase session check error:", err);
  }

  clearTimeout(forceDismissTimeout);
  document.getElementById("bootLoader").style.display = "none";
  document.getElementById("authModal").style.display = "flex";
});

async function routeAfterAuth() {
  document.getElementById("authModal").style.display = "none";
  setBtnLoading("loginBtn", false, "⚡ Log Masuk Ke Server Game");
  setBtnLoading("registerBtn", false, "✨ Cipta Akaun Baru");

  try {
    if (sb && currentUser) {
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
        if (gs.parties) state.parties = gs.parties;
        if (gs.states) state.states = gs.states;
        if (gs.lobbies) state.lobbies = gs.lobbies;
        if (gs.bills) state.bills = gs.bills;
        if (gs.roster) state.roster = gs.roster;
        if (gs.cabinet) state.cabinet = gs.cabinet;
        if (gs.articles) state.articles = gs.articles;
        lastMidnightReset = gs.last_midnight_reset;
      }
    }
  } catch (err) {
    console.warn("DB route load fallback:", err);
  }

  document.getElementById("bootLoader").style.display = "none";
  document.getElementById("dashboardScreen").style.display = "block";
  document.getElementById("mainHeader").style.display = "flex";
  document.getElementById("mainFooter").style.display = "flex";

  applyCatchUpMidnightResets();
  startMYTMidnightClock();
  start1WeekElectionCountdown();
  updateUI();
  showToast(`Selamat kembali, ${state.player.name}! 400 PP & MYR 1 Million sedia.`);
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
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPass").value;

  if (sb && sb.auth) {
    setBtnLoading("loginBtn", true);
    try {
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) {
        setBtnLoading("loginBtn", false, "⚡ Log Masuk Ke Server Game");
        return showAuthError(error.message);
      }
      currentUser = data.user;
      await routeAfterAuth();
      return;
    } catch (err) {
      console.warn("Supabase auth fallback:", err);
    }
  }

  // Fallback local auth if server offline
  currentUser = { id: "local_user", email: email };
  document.getElementById("authModal").style.display = "none";
  document.getElementById("setupScreen").style.display = "block";
  document.getElementById("charName").value = email.split("@")[0];
}

async function handleRegister(e) {
  e.preventDefault();
  hideAuthError();
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;
  const username = document.getElementById("regUsername").value;

  if (sb && sb.auth) {
    setBtnLoading("registerBtn", true);
    try {
      const { data, error } = await sb.auth.signUp({ email, password, options: { data: { username } } });
      if (error) {
        setBtnLoading("registerBtn", false, "✨ Cipta Akaun Baru");
        return showAuthError(error.message);
      }
      if (!data.session) {
        setBtnLoading("registerBtn", false, "✨ Cipta Akaun Baru");
        showAuthError("Akaun dicipta! Sila semak emel anda untuk sahkan akaun atau log masuk.");
        switchAuthTab('login');
        document.getElementById("authEmail").value = email;
        return;
      }
      currentUser = data.user;
      await routeAfterAuth();
      return;
    } catch (err) {
      console.warn("Supabase register fallback:", err);
    }
  }

  // Fallback local registration if server offline
  currentUser = { id: "local_user", email: email };
  document.getElementById("authModal").style.display = "none";
  document.getElementById("setupScreen").style.display = "block";
  document.getElementById("charName").value = username || email.split("@")[0];
}

async function logoutPlayer() {
  try {
    if (sb && sb.auth) await sb.auth.signOut();
  } catch (err) {}
  location.reload();
}

async function initGame(e) {
  e.preventDefault();
  setBtnLoading("startGameBtn", true);
  const name = document.getElementById("charName").value;
  const baseState = document.getElementById("startNation").value;
  const selectedPartyChoice = document.getElementById("partySelect").value;
  const customPartyName = document.getElementById("partyNameCustom").value;
  const ideology = document.getElementById("partyIdeology").value;

  state = defaultGameState();
  state.player.name = name;
  state.player.location = baseState + " / Malaysia";
  state.player.ideology = ideology;
  state.selectedState = baseState;

  if (selectedPartyChoice === "custom") {
    state.player.partyName = customPartyName || "Gabungan Reformasi Rakyat";
    state.parties.unshift({
      id: "player_party",
      name: state.player.partyName,
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Blue_flag_icon.svg",
      color: "#38bdf8",
      seats: 15,
      polling: 8.5,
      leader: `${name} (Anda)`,
      ideology: ideology
    });
  } else {
    const targetParty = state.parties.find(p => p.id === selectedPartyChoice);
    if (targetParty) {
      state.player.partyName = targetParty.name;
      targetParty.leader = `${name} (Anda)`;
    }
  }

  try {
    if (sb && currentUser && currentUser.id !== "local_user") {
      await sb.from("player_profiles").upsert({
        user_id: currentUser.id,
        username: currentUser.email.split("@")[0],
        character_name: name,
        party_name: state.player.partyName,
        ideology: ideology,
        bio: state.player.bio,
        portrait_url: state.player.portrait,
        base_state: baseState,
        updated_at: new Date().toISOString()
      });
      await sb.from("game_state").upsert(buildGameStateRow());
      lastMidnightReset = new Date().toISOString();
    }
  } catch (err) {
    console.warn("DB init save fallback:", err);
  }

  document.getElementById("setupScreen").style.display = "none";
  document.getElementById("dashboardScreen").style.display = "block";
  document.getElementById("mainHeader").style.display = "flex";
  document.getElementById("mainFooter").style.display = "flex";

  startMYTMidnightClock();
  start1WeekElectionCountdown();
  updateUI();
  showToast(`Selamat datang ${state.player.name}! Bermula dengan 400 PP & MYR 1,000,000 modal kempen.`);
}

function buildGameStateRow() {
  return {
    user_id: currentUser ? currentUser.id : "local_user",
    political_power: state.player.pp,
    liquid_capital: state.player.funds,
    party_power: state.player.partyPower,
    reputation: state.player.reputation,
    btc: state.player.btc,
    econ_position: state.econPos,
    social_position: state.socialPos,
    parties: state.parties,
    states: state.states,
    lobbies: state.lobbies,
    bills: state.bills,
    roster: state.roster,
    cabinet: state.cabinet,
    articles: state.articles,
    last_midnight_reset: lastMidnightReset || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

function queueSave() {
  if (!sb || !currentUser || currentUser.id === "local_user") return;
  const pill = document.getElementById("saveStatus");
  if (pill) { pill.innerText = "Menyimpan..."; pill.className = "save-status saving"; }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      const { error } = await sb.from("game_state").upsert(buildGameStateRow());
      if (pill) {
        if (error) { pill.innerText = "Ralat simpan"; pill.className = "save-status error"; }
        else { pill.innerText = "Tersimpan"; pill.className = "save-status saved"; }
      }
    } catch (err) {
      if (pill) { pill.innerText = "Simpan lokal"; pill.className = "save-status saved"; }
    }
  }, 900);
}

async function saveProfileToDb() {
  if (!sb || !currentUser || currentUser.id === "local_user") return;
  try {
    await sb.from("player_profiles").update({
      character_name: state.player.name,
      bio: document.getElementById("inputCharBio") ? document.getElementById("inputCharBio").value : state.player.bio,
      portrait_url: state.player.portrait,
      updated_at: new Date().toISOString()
    }).eq("user_id", currentUser.id);
  } catch (err) {}
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
    state.player.pp += 20.0 * daysPassed;
    state.player.funds += 100000 * daysPassed;
    showToast(`🌅 ${daysPassed} reset harian tertangguh diproses: +${(20*daysPassed).toFixed(1)} PP & +MYR ${(100000*daysPassed).toLocaleString()}!`);
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

function start1WeekElectionCountdown() {
  setInterval(() => {
    const now = new Date();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const remainder = weekMs - (now.getTime() % weekMs);

    const days = Math.floor(remainder / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainder % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((remainder % (1000 * 60 * 60)) / (1000 * 60));

    const el = document.getElementById("weekElectionTimer");
    if (el) el.innerText = `${days} Hari ${hours} Jam ${mins} Minit`;

    if (days === 0 && hours === 0 && mins === 0) {
      resetElectionCycle();
    }
  }, 10000);
}

function executeDailyMidnightReset() {
  state.player.pp += 20.0;
  state.player.funds += 100000;
  lastMidnightReset = new Date().toISOString();
  showToast("🌅 RESET HARIAN MIDNIGHT (12:00 AM MYT): +20 Political Power & +MYR 100,000 ditambah!");
  updateUI();
  queueSave();
}

function resetElectionCycle() {
  state.parties.forEach(p => {
    p.polling = (Math.random() * 25 + 10);
    p.seats = Math.round(222 * (p.polling / 100));
  });
  showToast("🗳 1 WEEKS IRL ELECTION RESET: Parlimen dibubarkan & kerusi dikemaskini secara automatik!");
  updateUI();
  queueSave();
}

function updateCabinetMinister(role, name) {
  if (state.cabinet) {
    state.cabinet[role] = name;
    showToast(`Kabinet dikemaskini: ${role.toUpperCase()} kini dipegang oleh ${name}`);
    updateUI();
    queueSave();
  }
}

function publishArticle() {
  const title = document.getElementById("articleTitleInput").value;
  const content = document.getElementById("articleContentInput").value;
  if (title && content) {
    state.articles.unshift({
      title: title,
      author: state.player.name,
      date: "Baru sahaja",
      views: 120,
      likes: 45
    });
    state.player.reputation = Math.min(100, state.player.reputation + 4.0);
    state.player.pp += 10;
    document.getElementById("articleTitleInput").value = "";
    document.getElementById("articleContentInput").value = "";
    showToast("📰 Artikel Politik Berjaya Diterbitkan! Reputasi & PP meningkat.");
    updateUI();
    queueSave();
  } else showToast("Sila masukkan tajuk dan kandungan artikel!", true);
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  if (input && input.value) {
    state.chatMessages.push({
      sender: state.player.name,
      text: input.value
    });
    input.value = "";
    renderChat();
  }
}

function renderChat() {
  const box = document.getElementById("publicChatBox");
  if (!box) return;
  box.innerHTML = "";
  state.chatMessages.forEach(c => {
    box.innerHTML += `<div class="log-item"><b style="color:var(--accent);">${c.sender}:</b> ${c.text}</div>`;
  });
  box.scrollTop = box.scrollHeight;
}

function triggerSPRMInvestigation() {
  showToast("🔍 SPRM melancarkan audit aset & siasatan integriti!");
  state.sprmAudit.activeInvestigations++;
  updateUI();
}

function triggerPDRMSecurity() {
  showToast("👮 PDRM mengetatkan kawalan keselamatan kawasan!");
  updateUI();
}

function showToast(msg, isError) {
  const banner = document.getElementById("toastBanner");
  banner.innerText = msg;
  banner.className = isError ? "error" : "";
  banner.style.display = "block";
  setTimeout(() => { banner.style.display = "none"; }, 3500);
}

function advanceTurn() {
  state.player.pp += 10.0;
  state.player.funds += 50000;
  showToast("Kempen Turn Selesai! +10 Political Power (PP) & +MYR 50,000 Liquid Capital.");
  updateUI();
  queueSave();
}

function updateUI() {
  document.getElementById("navPlayerName").innerText = state.player.name;
  document.getElementById("profileTitle").innerText = state.player.name;
  document.getElementById("barPower").innerText = state.player.pp.toFixed(1);
  document.getElementById("barFunds").innerText = `MYR ${Math.round(state.player.funds).toLocaleString()}`;
  if (document.getElementById("btcHoldings")) {
    document.getElementById("btcHoldings").innerText = state.player.btc;
  }

  if (document.getElementById("inputCharName")) {
    document.getElementById("inputCharName").value = state.player.name;
  }
  if (document.getElementById("inputLocation")) {
    document.getElementById("inputLocation").value = state.player.location;
  }

  populateStateSelect();
  renderPartiesAndCandidates();
  renderLobbies();
  renderBills();
  renderRoster();
  renderMBRoster();
  renderCabinet();
  renderArticles();
  renderChat();
  loadStateDUN(state.selectedState);
  
  if (document.getElementById("econSlider")) {
    document.getElementById("econSlider").value = state.econPos;
    document.getElementById("socialSlider").value = state.socialPos;
    document.getElementById("lblEconPos").innerText = state.spectrum[state.econPos - 1];
    document.getElementById("lblSocialPos").innerText = state.spectrum[state.socialPos - 1];
  }

  if (document.getElementById("portFunds")) {
    document.getElementById("portFunds").innerText = `MYR ${Math.round(state.player.funds).toLocaleString()}`;
  }
  if (document.getElementById("portBtc")) {
    document.getElementById("portBtc").innerText = `${state.player.btc} BTC`;
  }
}

function renderCabinet() {
  const container = document.getElementById("cabinetListContainer");
  if (!container || !state.cabinet) return;
  container.innerHTML = "";
  for (const [role, ministerName] of Object.entries(state.cabinet)) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.background = "rgba(0,0,0,0.3)";
    card.style.padding = "12px";
    card.innerHTML = `
      <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase;">${role.toUpperCase()}</div>
      <div style="font-size:14px; font-weight:bold; color:var(--accent); margin-top:2px;">${ministerName}</div>
      <button class="btn-blue" style="margin-top:8px; width:100%; padding:4px 8px; font-size:11px;" onclick="promptCabinetChange('${role}')">Tukar Menteri</button>
    `;
    container.appendChild(card);
  }
}

function promptCabinetChange(role) {
  const newName = prompt(`Masukkan nama baru untuk jawatan ${role.toUpperCase()}:`, state.cabinet[role]);
  if (newName) {
    updateCabinetMinister(role, newName);
  }
}

function renderArticles() {
  const list = document.getElementById("articlesListContainer");
  if (!list || !state.articles) return;
  list.innerHTML = "";
  state.articles.forEach(a => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.background = "rgba(0,0,0,0.3)";
    card.innerHTML = `
      <h4 style="color:var(--accent); font-size:15px;">${a.title}</h4>
      <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Oleh <b>${a.author}</b> • ${a.date} • 👁 ${a.views} Pembaca • 👍 ${a.likes} Menyukai</div>
    `;
    list.appendChild(card);
  });
}

function populateStateSelect() {
  const sel = document.getElementById("stateSelect");
  if (!sel) return;
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

function renderPartiesAndCandidates() {
  const tbody = document.getElementById("candidateTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  state.parties.sort((a, b) => b.seats - a.seats);
  const leading = state.parties[0];

  const pmEl = document.getElementById("pmStatus");
  if (pmEl) pmEl.innerText = `YAB Perdana Menteri: ${leading.leader} (${leading.name} - ${leading.seats} Kerusi Dewan Rakyat)`;

  state.parties.forEach((p, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${p.logo}" class="party-logo">
          <span style="font-weight:bold; color:#38bdf8">${p.leader}</span>
        </div>
      </td>
      <td>
        <span style="font-weight:600; color:${p.color || '#38bdf8'}">${p.name}</span>
      </td>
      <td style="font-weight:bold;">${(p.seats * 15.2).toFixed(1)}</td>
      <td>
        <div style="font-weight:bold;">${p.polling.toFixed(1)}%</div>
        <div style="font-size:11px; color:var(--text-muted);">${(p.seats * 35000).toLocaleString()} pengundi</div>
      </td>
      <td style="font-weight:bold; color:var(--success);">${p.seats} Kerusi</td>
      <td>
        <button class="btn-blue" onclick="campaignForParty(${idx})">📢 Kempen (10 PP, MYR 100k)</button>
        <button class="btn-purple" onclick="takeoverParty(${idx})">👑 Ambil Alih Parti</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function campaignForParty(idx) {
  if (state.player.pp >= 10 && state.player.funds >= 100000) {
    state.player.pp -= 10;
    state.player.funds -= 100000;
    state.parties[idx].polling = Math.min(100, state.parties[idx].polling + 1.8);
    state.parties[idx].seats = Math.min(222, state.parties[idx].seats + 3);

    showToast(`Kempen dilancar untuk ${state.parties[idx].name}! Kerusi Dewan Rakyat meningkat.`);
    updateUI();
    queueSave();
  } else {
    showToast("Memerlukan sekurang-kurangnya 10 PP dan MYR 100,000!", true);
  }
}

function takeoverParty(idx) {
  if (state.player.pp >= 20) {
    state.player.pp -= 20;
    state.parties[idx].leader = `${state.player.name} (Anda)`;
    state.player.partyName = state.parties[idx].name;
    showToast(`Kepimpinan ${state.parties[idx].name} berjaya diambil alih oleh ${state.player.name}!`);
    updateUI();
    queueSave();
  } else {
    showToast("Memerlukan 20 PP untuk mengambil alih kepimpinan parti!", true);
  }
}

function loadStateDUN(stateName) {
  state.selectedState = stateName;
  const s = state.states[stateName];
  if (!s) return;
  const titleEl = document.getElementById("stateTitle");
  if (titleEl) titleEl.innerText = stateName === "Wilayah Persekutuan" ? "Wilayah Persekutuan (KL / Putrajaya / Labuan)" : `Dewan Undangan Negeri (DUN) ${stateName}`;
  
  const seatsEl = document.getElementById("stateTotalSeats");
  if (seatsEl) seatsEl.innerText = s.seats > 0 ? `${s.seats} Kerusi` : "Tiada DUN";
  
  const majEl = document.getElementById("stateMajority");
  if (majEl) majEl.innerText = s.seats > 0 ? `${majorityOf(s.seats)} Kerusi` : "N/A";
  
  const mbEl = document.getElementById("stateMB");
  if (mbEl) mbEl.innerText = s.mb;
  
  const govEl = document.getElementById("stateGov");
  if (govEl) govEl.innerText = s.gov;

  const dunBody = document.getElementById("dunSeatTableBody");
  if (!dunBody) return;
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

function triggerPRNElection() {
  if (state.states[state.selectedState]) {
    showToast(`🗳 Pilihan Raya Negeri (PRN) ${state.selectedState} dilancarkan secara rasmi!`);
    updateUI();
    queueSave();
  }
}

function renderMBRoster() {
  const tbody = document.getElementById("mbRosterTableBody");
  if (!tbody) return;
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

function renderLobbies() {
  const tbody = document.getElementById("lobbyTableBody");
  if (!tbody) return;
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
  if (!tbody) return;
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
  if (!tbody) return;
  tbody.innerHTML = "";
  state.roster.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.name}</td><td>${r.power}</td><td>${r.inf}</td><td><b style="color:#38bdf8">${r.role}</b></td>`;
    tbody.appendChild(tr);
  });
}

function runCeramahAction() {
  if (state.player.pp >= 8 && state.player.funds >= 15000) {
    state.player.pp -= 8;
    state.player.funds -= 15000;
    state.player.reputation = Math.min(100, state.player.reputation + 2.5);
    showToast("📢 Ceramah Perdana & Jelajah Negeri selesai! Reputasi rakyat meningkat.");
    updateUI();
    queueSave();
  } else showToast("Perlu 8 PP & MYR 15,000!", true);
}

function runSocialMediaCampaign() {
  if (state.player.pp >= 12 && state.player.funds >= 25000) {
    state.player.pp -= 12;
    state.player.funds -= 25000;
    showToast("📱 Kempen Media Sosial & Perang Persepsi berjaya dilancarkan!");
    updateUI();
    queueSave();
  } else showToast("Perlu 12 PP & MYR 25,000!", true);
}

function runCorporateLobbying() {
  state.player.funds += 100000;
  showToast("💼 Persidangan Lobi Korporat berjaya! +MYR 100,000 Dana Kempen diperoleh.");
  updateUI();
  queueSave();
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
    if (state.parties[targetIdx]) {
      state.parties[targetIdx].polling = Math.max(0, state.parties[targetIdx].polling - 2.5);
      showToast(`Iklan serangan dilancar terhadap ${state.parties[targetIdx].name}! Polling mereka menurun.`);
    }
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
    showToast("URL gambar calon dikemaskini!");
    updateUI();
    saveProfileToDb();
    queueSave();
  }
}

function updateCharName(val) {
  if (val) {
    state.player.name = val;
    updateUI();
  }
}

function saveProfile() {
  state.player.name = document.getElementById("inputCharName").value;
  state.player.bio = document.getElementById("inputCharBio").value;
  updateUI();
  saveProfileToDb();
  queueSave();
  showToast("Profil calon berjaya disimpan!");
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-page').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).style.display = 'block';

  if (tabId === 'tabPortfolio') {
    if (document.getElementById("portFunds")) document.getElementById("portFunds").innerText = `MYR ${Math.round(state.player.funds).toLocaleString()}`;
    if (document.getElementById("portBtc")) document.getElementById("portBtc").innerText = `${state.player.btc} BTC`;
  }
}
