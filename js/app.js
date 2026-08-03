/* ==========================================================================
   POWER - Malaysia Geopolitics, Stock Exchange & Real-Time Simulator
   Game Engine & Application Logic ("A House Divided" Coalitions & Zero-Baseline Edition)
   ========================================================================== */

/* 34+ Million Real Malaysian Population & Registered Voter Breakdown */
const MALAYSIA_POPULATION_STATS = {
  totalPopulation: 34100000,
  totalRegisteredVoters: 21180000,
  voterDemographics: {
    undi18: { label: "Pengundi Belia (Undi18 / Gen-Z)", share: 32, favor: "Reformist / Youth" },
    rural: { label: "Pengundi Luar Bandar & Felda", share: 28, favor: "Conservatism / Islamism" },
    urban: { label: "Pengundi Bandar & Suburb", share: 25, favor: "Social Democracy / Liberalism" },
    business: { label: "Komuniti Perniagaan & Industri", share: 15, favor: "Free Market / Stability" }
  }
};

/* Real Malaysian Corporations listed on Bursa Malaysia (KLSE) */
const BURSA_MALAYSIA_CORPORATIONS = [
  {
    id: 1,
    name: "PETRONAS Gas Berhad",
    sector: "Energy",
    sectorClass: "sector-energy",
    exchange: "Bursa Main",
    price: 18.50,
    dividend: 0.85,
    owned: 200,
    mktCap: "MYR 36.6B",
    dailyRev: "+MYR 8.5M/d",
    logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?w=100&auto=format&fit=crop",
    progress: 85
  },
  {
    id: 2,
    name: "Maybank Berhad",
    sector: "Banking",
    sectorClass: "sector-banking",
    exchange: "Bursa Main",
    price: 9.80,
    dividend: 0.65,
    owned: 500,
    mktCap: "MYR 118.2B",
    dailyRev: "+MYR 14.2M/d",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop",
    progress: 92
  },
  {
    id: 3,
    name: "Sime Darby Plantation",
    sector: "Agriculture",
    sectorClass: "sector-retail",
    exchange: "Bursa Main",
    price: 4.30,
    dividend: 0.35,
    owned: 1000,
    mktCap: "MYR 29.7B",
    dailyRev: "+MYR 6.1M/d",
    logo: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&auto=format&fit=crop",
    progress: 70
  },
  {
    id: 4,
    name: "Tenaga Nasional Berhad",
    sector: "Energy",
    sectorClass: "sector-energy",
    exchange: "Bursa Main",
    price: 13.20,
    dividend: 0.75,
    owned: 100,
    mktCap: "MYR 76.4B",
    dailyRev: "+MYR 11.8M/d",
    logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&auto=format&fit=crop",
    progress: 88
  },
  {
    id: 5,
    name: "Skeedoo Real Estate MY",
    sector: "Real Estate",
    sectorClass: "sector-realestate",
    exchange: "Bursa ACE",
    price: 1.25,
    dividend: 0.12,
    owned: 2000,
    mktCap: "MYR 12.5M",
    dailyRev: "+MYR 450K/d",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&auto=format&fit=crop",
    progress: 60
  },
  {
    id: 6,
    name: "Gamuda Infrastructure",
    sector: "Manufacturing",
    sectorClass: "sector-manufacturing",
    exchange: "Bursa Main",
    price: 6.10,
    dividend: 0.45,
    owned: 300,
    mktCap: "MYR 16.5B",
    dailyRev: "+MYR 3.9M/d",
    logo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=100&auto=format&fit=crop",
    progress: 75
  }
];

/* Real Commodities Market (Malaysia Focus) */
const MALAYSIAN_COMMODITIES = [
  { name: "Crude Palm Oil (CPO)", unit: "Ton", price: "MYR 3,850", daily: "+MYR 120/d", sectorClass: "sector-retail" },
  { name: "Petroleum (Brent Crude)", unit: "Barrel", price: "MYR 380", daily: "+MYR 14/d", sectorClass: "sector-energy" },
  { name: "Rubber (SMR 20 Grade)", unit: "100kg", price: "MYR 720", daily: "+MYR 8/d", sectorClass: "sector-manufacturing" },
  { name: "Tin (Bursa Tin Market)", unit: "Ton", price: "MYR 125,000", daily: "+MYR 1,500/d", sectorClass: "sector-banking" },
  { name: "Gold (999 Physical Gold)", unit: "Gram", price: "MYR 345", daily: "+MYR 6/d", sectorClass: "sector-realestate" }
];

/* Real Malaysian Coalitions & Full Component Parties (PARTI KOMPONEN) */
const REAL_MALAYSIAN_PARTIES = [
  { id: "ph", name: "Pakatan Harapan (PH)", components: "PKR, DAP, AMANAH, UPKO", logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Pakatan_Harapan_logo.png", color: "#ef4444", seats: 0, polling: 0.0, campaignPower: 0.0, leader: "[Kekosongan - Tandingi Sekarang]", ideology: "Social Democracy / Reformist", discord: "https://discord.gg/ph-official" },
  { id: "pn", name: "Perikatan Nasional (PN)", components: "PAS, BERSATU, GERAKAN", logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/External_link_font_awesome.svg", color: "#0284c7", seats: 0, polling: 0.0, campaignPower: 0.0, leader: "[Kekosongan - Tandingi Sekarang]", ideology: "Islamism / Malay Nationalism", discord: "https://discord.gg/pn-official" },
  { id: "bn", name: "Barisan Nasional (BN)", components: "UMNO, MCA, MIC, PBRS", logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Symbol_green_circle.svg", color: "#1e3a8a", seats: 0, polling: 0.0, campaignPower: 0.0, leader: "[Kekosongan - Tandingi Sekarang]", ideology: "Traditional Conservatism / Ketuanan Melayu", discord: "https://discord.gg/bn-official" },
  { id: "gps", name: "Gabungan Parti Sarawak (GPS)", components: "PBB, SUPP, PRS, PDP", logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Blue_flag_icon.svg", color: "#f59e0b", seats: 0, polling: 0.0, campaignPower: 0.0, leader: "[Kekosongan - Tandingi Sekarang]", ideology: "Borneo Regional Autonomy", discord: "https://discord.gg/gps-official" },
  { id: "grs", name: "Gabungan Rakyat Sabah (GRS)", components: "Gagasan Rakyat, PBS, STAR, USNO", logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/Sabah_flag_icon.png", color: "#10b981", seats: 0, polling: 0.0, campaignPower: 0.0, leader: "[Kekosongan - Tandingi Sekarang]", ideology: "Sabah Regional Nationalism", discord: "https://discord.gg/grs-official" },
  { id: "warisan", name: "Parti Warisan (WARISAN)", components: "Parti Warisan", logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Blue_flag_icon.svg", color: "#a855f7", seats: 0, polling: 0.0, campaignPower: 0.0, leader: "[Kekosongan - Tandingi Sekarang]", ideology: "Multiracialism / Sabah Unity", discord: "https://discord.gg/warisan-official" },
  { id: "muda", name: "Ikatan Demokratik Malaysia (MUDA)", components: "MUDA", logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Pakatan_Harapan_logo.png", color: "#f43f5e", seats: 0, polling: 0.0, campaignPower: 0.0, leader: "[Kekosongan - Tandingi Sekarang]", ideology: "Youth Politics / Progressive", discord: "https://discord.gg/muda-official" }
];

/* 14 Malaysian States/Territories - NO NPC MENTERI BESAR */
const STATE_SEATS = {
  "Selangor": { seats: 56, pop: "7.2M", voters: "3.8M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Johor": { seats: 56, pop: "4.1M", voters: "2.6M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Sabah": { seats: 73, pop: "3.4M", voters: "1.7M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Sarawak": { seats: 82, pop: "2.9M", voters: "1.9M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Perak": { seats: 59, pop: "2.5M", voters: "1.6M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Kedah": { seats: 36, pop: "2.2M", voters: "1.3M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Wilayah Persekutuan": { seats: 0, pop: "2.0M", voters: "1.1M", mb: "Ditadbir Persekutuan (Menteri WP)", gov: "Kerajaan Persekutuan" },
  "Kelantan": { seats: 45, pop: "1.8M", voters: "1.2M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Pulau Pinang": { seats: 40, pop: "1.8M", voters: "1.2M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Pahang": { seats: 42, pop: "1.6M", voters: "1.0M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Terengganu": { seats: 32, pop: "1.3M", voters: "0.9M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Negeri Sembilan": { seats: 36, pop: "1.2M", voters: "0.8M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Melaka": { seats: 28, pop: "1.0M", voters: "0.7M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" },
  "Perlis": { seats: 15, pop: "0.3M", voters: "0.2M", mb: "[Belum Dilantik - Menunggu PRN]", gov: "Kerajaan Negeri Pemain" }
};

function majorityOf(seats) {
  return seats > 0 ? Math.floor(seats / 2) + 1 : 0;
}

function defaultStates() {
  const out = {};
  for (const name in STATE_SEATS) {
    out[name] = { 
      seats: STATE_SEATS[name].seats, 
      pop: STATE_SEATS[name].pop,
      voters: STATE_SEATS[name].voters,
      mb: STATE_SEATS[name].mb, 
      gov: STATE_SEATS[name].gov 
    };
  }
  return out;
}

function defaultGameState() {
  return {
    player: {
      name: "Wan Luqman",
      title: "YBhg.",
      pp: 400.0,
      funds: 1000000,
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop",
      location: "Selangor / Malaysia",
      partyPower: 220,
      reputation: 75.0,
      btc: 0,
      bio: "Memacu reformasi ekonomi, kebajikan rakyat dan perpaduan nasional.",
      partyName: "Pakatan Harapan (PH)",
      ideology: "Islamism / Islamic Democracy",
      role: "Perdana Menteri / Presiden Parti"
    },
    monarchy: {
      kingName: "Kewawasan Seri Paduka Baginda Yang di-Pertuan Agong XVII",
      royalAssentCount: 12,
      royalAudienceCount: 3,
      royalLegitimacy: "Tinggi (Sangat Diperkenan)"
    },
    myTokPosts: [
      { id: 1, title: "Ucapan Rasmi Perdana Menteri Mengenai Bajet 2026 #MalaysiaMadani", author: "Wan Luqman", views: "1.2M", likes: "340K", shares: "45K", tags: "#PolitikMY #DewanRakyat" }
    ],
    sdnBhdList: [
      { id: 1, name: "Sentral Gaming Malaysia Sdn Bhd", sector: "Gaming & Technology", val: "MYR 250,000", dailyDiv: "MYR 12,500/d" }
    ],
    cabinet: {
      finance: "[Belum Dilantik - Pilih Ahli]",
      defense: "[Belum Dilantik - Pilih Ahli]",
      home: "[Belum Dilantik - Pilih Ahli]",
      education: "[Belum Dilantik - Pilih Ahli]",
      health: "[Belum Dilantik - Pilih Ahli]",
      foreign: "[Belum Dilantik - Pilih Ahli]"
    },
    sprmAudit: { status: "Bersih", risk: "Rendah", activeInvestigations: 0 },
    pdrmStatus: { orderLevel: "Aman", riotRisk: "Rendah", officersDeployed: 12000 },
    articles: [
      { title: "Pelan Pembangunan Ekonomi Digital Selangor 2026", author: "Wan Luqman", date: "2 jam lepas", views: 4250, likes: 890 }
    ],
    chatMessages: [
      { sender: "Sistem", text: "Selamat datang ke Server Geopolitik & Istana Negara!" }
    ],
    corporations: JSON.parse(JSON.stringify(BURSA_MALAYSIA_CORPORATIONS)),
    parties: JSON.parse(JSON.stringify(REAL_MALAYSIAN_PARTIES)),
    states: defaultStates(),
    lobbies: [
      { group: "PETRONAS Energy & Petroleum", head: "Konsortium PETRONAS", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop", stateStr: 120, natStr: 95, rel: 65 },
      { group: "Palm Oil & Plantation Guild (MPOB)", head: "Konsortium Sawit", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop", stateStr: 90, natStr: 85, rel: 55 },
      { group: "Banking & Islamic Finance Consortium", head: "Konsortium Perbankan", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop", stateStr: 110, natStr: 90, rel: 60 }
    ],
    bills: [
      { code: "RUU.2020: Pakej Rangsangan Ekonomi", law: "Dana Bantuan Perniagaan & Infrastruktur", ayes: 118, nays: 90, abstentions: 14, author: "Wan Luqman", timer: "23 jam" },
      { code: "RUU.2021: Akta Cukai E-Dagang & Teknologi", law: "Kerangka Perlesenan Ekonomi Digital", ayes: 112, nays: 98, abstentions: 12, author: "Jawatankuasa Dewan", timer: "12 jam" }
    ],
    roster: [
      { name: "Wan Luqman (Anda)", power: 220, inf: 85, role: "Pengerusi / Presiden Parti" }
    ],
    spectrum: ["Extremely Left Wing", "Very Left Wing", "Left Wing", "Center Left", "Centrist", "Center Right", "Right Wing", "Extremely Right Wing"],
    econPos: 4,
    socialPos: 5,
    selectedState: "Selangor",
    stockSubTab: "listings"
  };
}

let state = defaultGameState();
let currentUser = null;
let lastMidnightReset = null;
let saveTimer = null;

/* Instant Boot & Auth Handling - Zero Loading Screen Delay */
window.addEventListener("DOMContentLoaded", async () => {
  try {
    if (sb && sb.auth) {
      const { data } = await sb.auth.getSession();
      if (data && data.session && data.session.user) {
        currentUser = data.session.user;
        await routeAfterAuth();
        return;
      }
    }
  } catch (err) {
    console.warn("Supabase session check error:", err);
  }

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

        if (gs.parties) {
          gs.parties.forEach(p => {
            const def = REAL_MALAYSIAN_PARTIES.find(d => d.id === p.id);
            if (def) {
              p.components = def.components;
            }
            if (!p.campaignPower || p.campaignPower === 0) {
              p.seats = 0;
              p.polling = 0.0;
              p.campaignPower = 0.0;
            }
          });
          state.parties = gs.parties;
        }

        if (gs.states) state.states = gs.states;
        if (gs.lobbies) state.lobbies = gs.lobbies;
        if (gs.bills) state.bills = gs.bills;
        if (gs.roster) state.roster = gs.roster;
        if (gs.cabinet) state.cabinet = gs.cabinet;
        if (gs.articles) state.articles = gs.articles;
        if (gs.corporations) state.corporations = gs.corporations;
        if (gs.sdnBhdList) state.sdnBhdList = gs.sdnBhdList;
        if (gs.myTokPosts) state.myTokPosts = gs.myTokPosts;
        if (gs.monarchy) state.monarchy = gs.monarchy;
        lastMidnightReset = gs.last_midnight_reset;
      }
    }
  } catch (err) {
    console.warn("DB route load fallback:", err);
  }

  document.getElementById("dashboardScreen").style.display = "block";
  document.getElementById("mainHeader").style.display = "flex";
  document.getElementById("mainFooter").style.display = "flex";

  applyCatchUpMidnightResets();
  startMYTMidnightClock();
  start1WeekElectionCountdown();
  startLivingStockEngine();
  updateUI();
  showToast(`Selamat kembali, ${state.player.name}! Status dana & PP dikemaskini.`);
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
      components: "Parti Bebas / Reformasi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Blue_flag_icon.svg",
      color: "#38bdf8",
      seats: 0,
      polling: 0.0,
      campaignPower: 0.0,
      leader: `${name} (Anda)`,
      ideology: ideology,
      discord: "https://discord.gg/parti-saya"
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
  startLivingStockEngine();
  updateUI();
  showToast(`Selamat datang ${state.player.name}! Pilihan raya bermula dengan 0 Kerusi & 0% Polling.`);
}

/* Living Stock Market Price Fluctuation Loop */
function startLivingStockEngine() {
  setInterval(() => {
    state.corporations.forEach(c => {
      const delta = (Math.random() * 0.4 - 0.18);
      c.price = Math.max(0.20, Number((c.price + delta).toFixed(2)));
    });
    renderStockMarketList();
  }, 4000);
}

function calculateTotalDailyDividends() {
  let total = 0;
  state.corporations.forEach(c => {
    if (c.owned && c.owned > 0) {
      total += (c.owned * (c.dividend || 0.50));
    }
  });
  if (state.sdnBhdList) {
    state.sdnBhdList.forEach(s => {
      total += 10000;
    });
  }
  return Math.round(total);
}

function calculateTotalStockPortfolioValue() {
  let total = 0;
  state.corporations.forEach(c => {
    if (c.owned && c.owned > 0) {
      total += (c.owned * c.price);
    }
  });
  return Math.round(total);
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
    corporations: state.corporations,
    sdnBhdList: state.sdnBhdList,
    myTokPosts: state.myTokPosts,
    monarchy: state.monarchy,
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
    const divs = calculateTotalDailyDividends() * daysPassed;
    state.player.pp += 20.0 * daysPassed;
    state.player.funds += (100000 * daysPassed) + divs;
    showToast(`🌅 ${daysPassed} reset harian diproses: +${(20*daysPassed).toFixed(1)} PP, +MYR ${(100000*daysPassed).toLocaleString()} & +MYR ${divs.toLocaleString()} Dividen!`);
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
  const divs = calculateTotalDailyDividends();
  state.player.pp += 20.0;
  state.player.funds += 100000 + divs;
  lastMidnightReset = new Date().toISOString();
  showToast(`🌅 RESET HARIAN MIDNIGHT: +20 PP, +MYR 100,000 & +MYR ${divs.toLocaleString()} Dividen Saham diterima!`);
  updateUI();
  queueSave();
}

function resetElectionCycle() {
  state.parties.forEach(p => {
    p.polling = 0.0;
    p.seats = 0;
    p.campaignPower = 0.0;
  });
  showToast("🗳 PARLIMEN DIBUBARKAN: Semua kerusi (0), polling (0.0%), & kekuatan kempen di-reset ke KOSONG!");
  updateUI();
  queueSave();
}

function seekRoyalAudience() {
  if (state.player.pp >= 15) {
    state.player.pp -= 15;
    state.monarchy.royalAudienceCount++;
    state.player.reputation = Math.min(100, state.player.reputation + 5.0);
    showToast("👑 Menghadap Seri Paduka Baginda YDPA di Istana Negara! Legitimasi & Reputasi Politik meningkat.");
    updateUI();
    queueSave();
  } else showToast("Diperlukan sekurang-kurangnya 15 PP untuk menghadap Seri Paduka Baginda!", true);
}

function requestRoyalAssent() {
  if (state.player.pp >= 10) {
    state.player.pp -= 10;
    state.monarchy.royalAssentCount++;
    showToast("📜 Perkenan Diraja (Royal Assent) dikurniakan untuk RUU Persekutuan!");
    updateUI();
    queueSave();
  } else showToast("Diperlukan sekurang-kurangnya 10 PP!", true);
}

function postMYTokVideo() {
  const title = document.getElementById("myTokTitleInput").value;
  const tags = document.getElementById("myTokTagInput").value || "#MYTok #PolitikMY";

  if (title) {
    const randomViews = (Math.floor(Math.random() * 800) + 100) + "K";
    const randomLikes = (Math.floor(Math.random() * 200) + 20) + "K";
    state.myTokPosts.unshift({
      id: Date.now(),
      title: title,
      author: state.player.name,
      views: randomViews,
      likes: randomLikes,
      shares: "12K",
      tags: tags
    });
    state.player.pp += 20;
    state.player.funds += 15000;
    document.getElementById("myTokTitleInput").value = "";
    showToast("📱 Video MYTok tular! +20 PP & +MYR 15,000 sumbangan kempen!");
    updateUI();
    queueSave();
  } else showToast("Sila masukkan tajuk video MYTok!", true);
}

function changePlayerParty(partyId) {
  const target = state.parties.find(p => p.id === partyId);
  if (target) {
    state.player.partyName = target.name;
    target.leader = `${state.player.name} (Anda)`;
    showToast(`Beralih parti politik kepada ${target.name}!`);
    updateUI();
    queueSave();
  }
}

function updatePlayerIdeologyInParties(newIdeology) {
  state.player.ideology = newIdeology;
  showToast(`Ideologi calon dikemaskini kepada: ${newIdeology}`);
  updateUI();
  queueSave();
}

function createSdnBhdCompany() {
  const name = prompt("Masukkan nama Syarikat Sendirian Berhad (Sdn Bhd) baharu anda:", "Sentral Media Technology Sdn Bhd");
  if (name && state.player.funds >= 25000) {
    state.player.funds -= 25000;
    state.sdnBhdList.unshift({
      id: Date.now(),
      name: name,
      sector: "Perkhidmatan / Teknologi",
      val: "MYR 250,000",
      dailyDiv: "MYR 10,000/d"
    });
    showToast(`🏢 Syarikat '${name}' berjaya ditubuhkan! Dividen harian didaftarkan.`);
    updateUI();
    queueSave();
  } else showToast("Diperlukan MYR 25,000 modal penubuhan Sdn Bhd!", true);
}

function buyCorporateShares(corpId) {
  const corp = state.corporations.find(c => c.id === corpId);
  if (!corp) return;
  const qtyStr = prompt(`Berapa unit saham ${corp.name} mahu dibeli? (Harga: MYR ${corp.price.toFixed(2)}/unit, Dividen: MYR ${corp.dividend || 0.50}/unit/hari):`, "100");
  const qty = parseInt(qtyStr);
  if (qty && qty > 0) {
    const cost = Math.round(qty * corp.price);
    if (state.player.funds >= cost) {
      state.player.funds -= cost;
      corp.owned = (corp.owned || 0) + qty;
      showToast(`Berjaya membeli ${qty} unit saham ${corp.name}! Dividen harian dijangka: +MYR ${Math.round(corp.owned * corp.dividend)}/hari.`);
      updateUI();
      queueSave();
    } else showToast(`Modal Kas tidak mencukupi (Diperlukan MYR ${cost.toLocaleString()})!`, true);
  }
}

function sellCorporateShares(corpId) {
  const corp = state.corporations.find(c => c.id === corpId);
  if (!corp || !corp.owned || corp.owned <= 0) {
    showToast("Anda tiada pegangan saham dalam syarikat ini!", true);
    return;
  }
  const qtyStr = prompt(`Berapa unit saham ${corp.name} mahu dijual? (Pegangan semasa: ${corp.owned} unit, Harga Pasaran: MYR ${corp.price.toFixed(2)}/unit):`, corp.owned.toString());
  const qty = parseInt(qtyStr);
  if (qty && qty > 0 && qty <= corp.owned) {
    const totalCash = Math.round(qty * corp.price);
    corp.owned -= qty;
    state.player.funds += totalCash;
    showToast(`Berjaya menjual ${qty} unit saham ${corp.name}! +MYR ${totalCash.toLocaleString()} diterima.`);
    updateUI();
    queueSave();
  }
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
    box.innerHTML += `<div class="log-item"><b style="color:var(--accent-red);">${c.sender}:</b> ${c.text}</div>`;
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

function switchStockSubTab(tab) {
  state.stockSubTab = tab;
  document.getElementById("btnSubListings").className = tab === 'listings' ? 'sub-tab-btn active' : 'sub-tab-btn';
  document.getElementById("btnSubCommodities").className = tab === 'commodities' ? 'sub-tab-btn active' : 'sub-tab-btn';
  renderStockMarketList();
}

function renderStockMarketList() {
  const container = document.getElementById("stockListContainer");
  if (!container) return;
  container.innerHTML = "";

  if (state.stockSubTab === 'listings') {
    state.corporations.forEach((c, idx) => {
      const card = document.createElement("div");
      card.className = "stock-item-card";
      const ownedCnt = c.owned || 0;
      const expectedDiv = Math.round(ownedCnt * (c.dividend || 0.50));
      card.innerHTML = `
        <div class="stock-left">
          <div class="stock-rank">${idx + 1}</div>
          <img src="${c.logo}" class="stock-avatar" alt="Corp">
          <div class="stock-info">
            <h4>${c.name}</h4>
            <span class="sector-pill ${c.sectorClass}">${c.sector}</span>
            <div class="stock-mktcap">MKT CAP <b>${c.mktCap}</b> • Pegangan: <b style="color:var(--success);">${ownedCnt} Unit</b> (Dividen: +MYR ${expectedDiv}/d)</div>
          </div>
        </div>
        <div class="stock-right">
          <div class="stock-price">MYR ${c.price.toFixed(2)}</div>
          <div class="stock-daily">${c.exchange} ${c.dailyRev}</div>
          <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${c.progress}%"></div></div>
          <div style="display:flex; gap:6px; margin-top:8px;">
            <button class="btn-primary" style="padding:4px 10px; font-size:11px;" onclick="buyCorporateShares(${c.id})">Beli Saham</button>
            <button class="btn-warning" style="padding:4px 10px; font-size:11px;" onclick="sellCorporateShares(${c.id})">Jual Saham</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } else {
    MALAYSIAN_COMMODITIES.forEach((cm, idx) => {
      const card = document.createElement("div");
      card.className = "stock-item-card";
      card.innerHTML = `
        <div class="stock-left">
          <div class="stock-rank">${idx + 1}</div>
          <div class="stock-info">
            <h4>${cm.name}</h4>
            <span class="sector-pill ${cm.sectorClass}">Komoditi Malaysia</span>
            <div class="stock-mktcap">Unit <b>${cm.unit}</b></div>
          </div>
        </div>
        <div class="stock-right">
          <div class="stock-price">${cm.price}</div>
          <div class="stock-daily">${cm.daily}</div>
          <button class="btn-green" style="margin-top:8px; padding:4px 10px; font-size:11px;" onclick="showToast('Pembelian unit komoditi ${cm.name} berjaya!')">Beli Komoditi</button>
        </div>
      `;
      container.appendChild(card);
    });
  }
}

function promptFoundCorporation() {
  const name = prompt("Masukkan nama syarikat korporat baharu untuk disenaraikan di Bursa Malaysia:", "Genting Synergies Berhad");
  if (name && state.player.funds >= 100000) {
    state.player.funds -= 100000;
    state.corporations.unshift({
      id: Date.now(),
      name: name,
      sector: "Real Estate",
      sectorClass: "sector-realestate",
      exchange: "Bursa ACE",
      price: 1.00,
      dividend: 0.20,
      owned: 5000,
      mktCap: "MYR 10.0M",
      dailyRev: "+MYR 200K/d",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&auto=format&fit=crop",
      progress: 50
    });
    showToast(`🏢 Syarikat Awam '${name}' berjaya disenaraikan di Bursa Malaysia! 5000 unit saham dipegang.`);
    updateUI();
    queueSave();
  } else showToast("Sila pastikan dana mencukupi (MYR 100,000 required)!", true);
}

function updateUI() {
  document.getElementById("navPlayerName").innerText = state.player.name;
  document.getElementById("bottomPlayerName").innerText = state.player.name;
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
  renderMYTokPosts();
  renderStockMarketList();
  renderSdnBhdList();
  loadStateDUN(state.selectedState);
  
  if (document.getElementById("econSlider")) {
    document.getElementById("econSlider").value = state.econPos;
    document.getElementById("socialSlider").value = state.socialPos;
    document.getElementById("lblEconPos").innerText = state.spectrum[state.econPos - 1];
    document.getElementById("lblSocialPos").innerText = state.spectrum[state.socialPos - 1];
  }

  const portVal = calculateTotalStockPortfolioValue();
  const dailyDivs = calculateTotalDailyDividends();

  if (document.getElementById("portFunds")) document.getElementById("portFunds").innerText = `MYR ${Math.round(state.player.funds).toLocaleString()}`;
  if (document.getElementById("portBtc")) document.getElementById("portBtc").innerText = `${state.player.btc} BTC`;
  if (document.getElementById("portStockVal")) document.getElementById("portStockVal").innerText = `MYR ${portVal.toLocaleString()}`;
  if (document.getElementById("portDailyDiv")) document.getElementById("portDailyDiv").innerText = `+MYR ${dailyDivs.toLocaleString()}/hari`;
  
  if (document.getElementById("monarchyAssentCnt")) document.getElementById("monarchyAssentCnt").innerText = state.monarchy ? state.monarchy.royalAssentCount : 12;
  if (document.getElementById("monarchyAudienceCnt")) document.getElementById("monarchyAudienceCnt").innerText = state.monarchy ? state.monarchy.royalAudienceCount : 3;
}

function renderMYTokPosts() {
  const container = document.getElementById("myTokContainer");
  if (!container || !state.myTokPosts) return;
  container.innerHTML = "";
  state.myTokPosts.forEach(post => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.background = "rgba(10, 15, 29, 0.6)";
    card.style.borderLeft = "4px solid var(--accent-red)";
    card.innerHTML = `
      <div style="font-size:11px; color:var(--accent-red); font-weight:bold;">📱 MYTok Viral Video</div>
      <h4 style="color:#fff; font-size:15px; margin-top:2px;">${post.title}</h4>
      <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Oleh <b>${post.author}</b> • 👁 ${post.views} Tontonan • ❤️ ${post.likes} • 🔄 ${post.shares} Perkongsian</div>
      <div style="font-size:11px; color:var(--accent-blue); margin-top:4px;">${post.tags}</div>
    `;
    container.appendChild(card);
  });
}

function renderSdnBhdList() {
  const container = document.getElementById("sdnBhdContainer");
  if (!container || !state.sdnBhdList) return;
  container.innerHTML = "";
  state.sdnBhdList.forEach(s => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.background = "rgba(10,15,29,0.5)";
    card.innerHTML = `
      <h4 style="color:var(--accent-red); font-size:15px;">${s.name}</h4>
      <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">
        Sektor: <b>${s.sector}</b> • Nilai: <b style="color:var(--success);">${s.val}</b> • Dividen: <b>${s.dailyDiv}</b>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderCabinet() {
  const container = document.getElementById("cabinetListContainer");
  if (!container || !state.cabinet) return;
  container.innerHTML = "";
  for (const [role, ministerName] of Object.entries(state.cabinet)) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.background = "rgba(10,15,29,0.5)";
    card.style.padding = "12px";
    card.innerHTML = `
      <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase;">${role.toUpperCase()}</div>
      <div style="font-size:14px; font-weight:bold; color:var(--accent-red); margin-top:2px;">${ministerName}</div>
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
    card.style.background = "rgba(10,15,29,0.5)";
    card.innerHTML = `
      <h4 style="color:var(--accent-red); font-size:15px;">${a.title}</h4>
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
      ? `${name} (${info.seats} Kerusi | Pop: ${info.pop} | Voters: ${info.voters})`
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
    const cpVal = (p.campaignPower || 0).toFixed(1);
    tbody.appendChild(tr);
    tr.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${p.logo}" class="party-logo">
          <span style="font-weight:bold; color:#38bdf8">${p.leader}</span>
        </div>
      </td>
      <td>
        <span style="font-weight:600; color:${p.color || '#38bdf8'}">${p.name}</span>
        <div style="font-size:10px; color:var(--gold);">Komponen: <b>${p.components || '-'}</b></div>
        <div style="font-size:10px; color:var(--text-muted);">${p.discord || 'Tiada Link Discord'}</div>
      </td>
      <td style="font-weight:bold; color:var(--gold);">${cpVal}</td>
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
  });
}

function campaignForParty(idx) {
  if (state.player.pp >= 10 && state.player.funds >= 100000) {
    state.player.pp -= 10;
    state.player.funds -= 100000;
    state.parties[idx].campaignPower = (state.parties[idx].campaignPower || 0) + 15.0;
    state.parties[idx].polling = Math.min(100, (state.parties[idx].polling || 0) + 2.5);
    state.parties[idx].seats = Math.round(222 * (state.parties[idx].polling / 100));

    showToast(`Kempen dilancar untuk ${state.parties[idx].name}! Kekuatan Kempen & Unjuran Kerusi Dewan Rakyat meningkat.`);
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

  const popEl = document.getElementById("statePopInfo");
  if (popEl) popEl.innerText = `Populasi: ${s.pop || '2.0M'} | Pengundi Berdaftar: ${s.voters || '1.2M'}`;

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
  promptFoundCorporation();
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
  if (urlDataURL(file);
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
    updateUI();
  }
}
