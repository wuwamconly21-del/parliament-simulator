/* ==========================================================================
   POWER - Geopolitik, Monarki, Bajet & Engine SPR 15-Hari
   ========================================================================== */

let state = {
  player: { 
    name: "Wan Luqman", 
    pp: 300.0, 
    capitalFund: 1000000, 
    campaignFund: 1000000,
    royalFavor: 78,
    homebase: "Selangor",
    role: "Perdana Menteri / Presiden Parti",
    contestedParliament: "P.100 Pandan",
    contestedDUN: "N.19 Seri Setia"
  },
  coalitions: [
    { name: "Pakatan Harapan (PH)", chairman: "Wan Luqman (Anda)", components: "PKR, DAP, AMANAH", seats: 82, discord: "https://discord.gg/ph-official" },
    { name: "Perikatan Nasional (PN)", chairman: "[Kekosongan]", components: "PAS, BERSATU, GERAKAN", seats: 74, discord: "https://discord.gg/pn-official" },
    { name: "Barisan Nasional (BN)", chairman: "[Kekosongan]", components: "UMNO, MCA, MIC", seats: 30, discord: "https://discord.gg/bn-official" },
    { name: "Gabungan Parti Sarawak (GPS)", chairman: "[Kekosongan]", components: "PBB, SUPP, PRS, PDP", seats: 23, discord: "https://discord.gg/gps-official" }
  ],
  partyComponents: [
    { name: "Parti Keadilan Rakyat (PKR)", coalition: "Pakatan Harapan", pres: "Wan Luqman (Anda)", vice: "[Kekosongan]", youth: "[Kekosongan]", discord: "https://discord.gg/pkr" },
    { name: "Democratic Action Party (DAP)", coalition: "Pakatan Harapan", pres: "[Kekosongan]", vice: "[Kekosongan]", youth: "[Kekosongan]", discord: "https://discord.gg/dap" },
    { name: "Parti Islam Se-Malaysia (PAS)", coalition: "Perikatan Nasional", pres: "[Kekosongan]", vice: "[Kekosongan]", youth: "[Kekosongan]", discord: "https://discord.gg/pas" },
    { name: "Pertubuhan Kebangsaan Melayu Bersatu (UMNO)", coalition: "Barisan Nasional", pres: "[Kekosongan]", vice: "[Kekosongan]", youth: "[Kekosongan]", discord: "https://discord.gg/umno" }
  ],
  stocks: [
    { id: 1, name: "PETRONAS Gas", price: 18.50, owned: 500, div: 0.85 },
    { id: 2, name: "Maybank Berhad", price: 9.80, owned: 1000, div: 0.65 },
    { id: 3, name: "Sime Darby Plantation", price: 4.30, owned: 2000, div: 0.35 }
  ],
  statesData: {
    "Selangor": { maj: 29, mb: "[Belum Dilantik]" },
    "Johor": { maj: 29, mb: "[Belum Dilantik]" },
    "Sabah": { maj: 37, mb: "[Belum Dilantik]" },
    "Sarawak": { maj: 42, mb: "[Belum Dilantik]" },
    "Perak": { maj: 30, mb: "[Belum Dilantik]" },
    "Pulau Pinang": { maj: 21, mb: "[Belum Dilantik]" }
  }
};

/* Hourly Resource Regeneration Engine (+PP, +Capital, +Campaign) */
function startHourlyResourceRegen() {
  setInterval(() => {
    let ppGain = 10.0; // Base PP per hour
    let capitalGain = 20000;
    let campaignGain = 20000;

    if (state.player.role.includes("Perdana Menteri")) {
      ppGain += 15.0;
      capitalGain += 30000;
    }
    if (state.player.homebase) {
      ppGain += 5.0;
    }

    state.player.pp += ppGain;
    state.player.capitalFund += capitalGain;
    state.player.campaignFund += campaignGain;

    showToast(`⏳ HOURLY REGEN: +${ppGain} PP | +MYR ${capitalGain.toLocaleString()} Capital | +MYR ${campaignGain.toLocaleString()} Campaign Fund!`);
    updateUI();
  }, 3600000); // Every 1 hour (3600000 ms)
}

function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById("authEmail").value;
  state.player.name = email.split("@")[0];
  
  document.getElementById("authModal").style.display = "none";
  document.getElementById("mainHeader").style.display = "flex";
  document.getElementById("mainContainer").style.display = "block";
  document.getElementById("mainFooter").style.display = "flex";
  
  startHourlyResourceRegen();
  updateUI();
  showToast(`Selamat datang ${state.player.name}! Sistem geopolitik bersedia.`);
}

function updateUI() {
  document.getElementById("playerNameDisplay").innerText = state.player.name;
  document.getElementById("barPP").innerText = state.player.pp.toFixed(1);
  document.getElementById("barCapital").innerText = Math.round(state.player.capitalFund).toLocaleString();
  document.getElementById("barCampaign").innerText = Math.round(state.player.campaignFund).toLocaleString();
  document.getElementById("barRoyal").innerText = `${state.player.royalFavor}%`;
  document.getElementById("royalFavorVal").innerText = `${state.player.royalFavor}% Baik`;

  // Profile Page UI
  document.getElementById("profName").innerText = state.player.name;
  document.getElementById("profRole").innerText = state.player.role;
  document.getElementById("profHomebase").innerText = `${state.player.homebase} (+10 PP Bonus Elaun/Jam)`;
  document.getElementById("profSeats").innerText = `${state.player.contestedDUN} / ${state.player.contestedParliament}`;
  document.getElementById("profCapital").innerText = `MYR ${Math.round(state.player.capitalFund).toLocaleString()}`;
  document.getElementById("profCampaign").innerText = `MYR ${Math.round(state.player.campaignFund).toLocaleString()}`;
  document.getElementById("profPP").innerText = `${state.player.pp.toFixed(1)} PP`;

  renderFederal();
  renderCoalitionsAndParties();
  renderStocks();
  loadStateDUN(document.getElementById("stateSelect").value);
}

function renderFederal() {
  const tbody = document.getElementById("federalTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  state.coalitions.forEach((c) => {
    tbody.innerHTML += `
      <tr>
        <td><b>${c.name}</b></td>
        <td style="color:var(--success)"><b>${c.seats} Kerusi</b></td>
        <td>35.5%</td>
        <td>1,245,000 Undi AI Civilian</td>
        <td><button class="btn-blue" onclick="campaignParty('${c.name}')">📢 Kempen (-10 PP / -MYR 50k Campaign Fund)</button></td>
      </tr>
    `;
  });
}

function renderCoalitionsAndParties() {
  const cBody = document.getElementById("coalitionTableBody");
  if (cBody) {
    cBody.innerHTML = "";
    state.coalitions.forEach((c) => {
      cBody.innerHTML += `
        <tr>
          <td><b style="color:#38bdf8">${c.name}</b></td>
          <td><b>${c.chairman}</b></td>
          <td>${c.components}</td>
          <td><b>${c.seats}</b></td>
          <td><a href="${c.discord}" target="_blank" style="color:var(--royal-gold-bright)">Pautan Discord AGM</a></td>
        </tr>
      `;
    });
  }

  const pBody = document.getElementById("partyHirarchyTableBody");
  if (pBody) {
    pBody.innerHTML = "";
    state.partyComponents.forEach((p) => {
      pBody.innerHTML += `
        <tr>
          <td><b style="color:var(--royal-gold-bright)">${p.name}</b></td>
          <td>${p.coalition}</td>
          <td>${p.pres}</td>
          <td>${p.vice}</td>
          <td>${p.youth}</td>
          <td><a href="${p.discord}" target="_blank" style="color:var(--accent-blue)">Pautan Discord</a></td>
        </tr>
      `;
    });
  }
}

function renderStocks() {
  const tbody = document.getElementById("stockTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  state.stocks.forEach((s) => {
    tbody.innerHTML += `
      <tr>
        <td><b>${s.name}</b></td>
        <td>MYR ${s.price.toFixed(2)}</td>
        <td style="color:var(--royal-gold-bright)"><b>${s.owned} Unit</b></td>
        <td>+MYR ${(s.owned * s.div).toFixed(0)}/hari</td>
        <td><button class="btn-gold" onclick="buyStock(${s.id})">Beli Saham (Capital Fund)</button></td>
      </tr>
    `;
  });
}

function loadStateDUN(stateName) {
  const data = state.statesData[stateName];
  if (!data) return;
  document.getElementById("stateNameDisplay").innerText = stateName;
  document.getElementById("stateInfoDisplay").innerText = `Majoriti: ${data.maj} Kerusi • MB: ${data.mb}`;
}

/* Permanent Resource Spending Logic */
function campaignParty(partyName) {
  if (state.player.pp >= 10 && state.player.campaignFund >= 50000) {
    state.player.pp -= 10;
    state.player.campaignFund -= 50000;
    showToast(`Kempen ${partyName} selesai! -10 PP & -MYR 50,000 Campaign Fund ditolak kekal.`);
    updateUI();
  } else showToast("PP atau Campaign Fund tidak mencukupi!", true);
}

function campaignDUN() {
  if (state.player.pp >= 15 && state.player.campaignFund >= 50000) {
    state.player.pp -= 15;
    state.player.campaignFund -= 50000;
    showToast("Kempen DUN Negeri selesai! -15 PP & -MYR 50,000 Campaign Fund ditolak kekal.");
    updateUI();
  } else showToast("PP atau Campaign Fund tidak mencukupi!", true);
}

function registerContestSeats() {
  const dun = prompt("Masukkan 1 Kerusi DUN tempatan yang mahu ditandingi:", state.player.contestedDUN);
  const parl = prompt("Masukkan 1 Kerusi Parlimen tempatan yang mahu ditandingi:", state.player.contestedParliament);
  if (dun && parl) {
    state.player.contestedDUN = dun;
    state.player.contestedParliament = parl;
    showToast(`Pendaftaran Calon Berjaya: 1 DUN (${dun}) & 1 Parlimen (${parl})! Peraturan 1 Parti 1 Calon Sekawasan Terpakai.`);
    updateUI();
  }
}

function transferCampaignFunds() {
  const target = document.getElementById("transferTargetInput").value;
  const amt = parseInt(document.getElementById("transferAmountInput").value);
  if (target && amt && state.player.campaignFund >= amt) {
    state.player.campaignFund -= amt;
    showToast(`Berjaya memindahkan MYR ${amt.toLocaleString()} Campaign Fund kepada ${target}!`);
    updateUI();
  } else showToast("Campaign Fund tidak mencukupi atau maklumat tidak sah!", true);
}

function requestMBBudgetFromPM() {
  const amt = parseInt(document.getElementById("mbBudgetReqAmount").value);
  if (amt) {
    showToast(`Permohonan Bajet Pembangunan Negeri MYR ${amt.toLocaleString()} berjaya dihantar kepada PM!`);
  }
}

function pmApproveBudget() {
  showToast("✅ Perdana Menteri LULUSKAN Permohonan Bajet Pembangunan Negeri!");
}

function pmRejectBudget() {
  showToast("❌ Perdana Menteri MENOLAK Permohonan Bajet Pembangunan Negeri!", true);
}

function manageKWSP() {
  showToast("📊 Dividen KWSP diisytiharkan secara rasmi kepada rakyat!");
}

function manageATM() {
  showToast("🪖 Agihan Bajet Pertahanan Angkatan Tentera Malaysia (ATM) diluluskan!");
}

function managePDRM() {
  showToast("👮 Agihan Bajet Ketenteraman Polis Diraja Malaysia (PDRM) diluluskan!");
}

function seekAudience() {
  if (state.player.pp >= 30) {
    state.player.pp -= 30; // permanent deduction
    state.player.royalFavor = Math.min(100, state.player.royalFavor + 6);
    showToast("Mengadap YDP Agong selesai. Sokongan Istana meningkat!");
    updateUI();
  } else showToast("Perlu 30 PP untuk mengadap YDP Agong!", true);
}

function requestDissolution() {
  if (state.player.royalFavor >= 65) {
    showToast("👑 YDP Agong berkenan memperkenankan pembubaran Parlimen untuk PRU 10-Jam!");
  } else {
    showToast("Sokongan Istana terlalu rendah (<65%). Perkenan pembubaran ditolak!", true);
  }
}

function triggerSPR10HourPolling() {
  showToast("🗳 Tempoh Polling Pilihan Raya 10-Jam SPR dilancarkan! Pengundi AI Civilian sedang membuang undi...");
}

function buyStock(id) {
  const stock = state.stocks.find(s => s.id === id);
  const cost = stock.price * 100;
  if (stock && state.player.capitalFund >= cost) {
    state.player.capitalFund -= cost; // permanent deduction from Capital Fund
    stock.owned += 100;
    showToast(`100 Unit ${stock.name} dibeli menggunakan Capital Fund!`);
    updateUI();
  } else showToast("Capital Fund MYR tidak mencukupi!", true);
}

function createSdnBhd() {
  const name = prompt("Masukkan nama Syarikat Sendirian Berhad (Sdn Bhd) baharu:", "Wawasan Media Sdn Bhd");
  if (name && state.player.capitalFund >= 50000) {
    state.player.capitalFund -= 50000;
    showToast(`Syarikat '${name}' ditubuhkan! Dividen harian didaftarkan.`);
    updateUI();
  } else showToast("Diperlukan MYR 50,000 Capital Fund penubuhan!", true);
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  if (input && input.value) {
    const box = document.getElementById("publicChatBox");
    box.innerHTML += `<div class="chat-item"><b>${state.player.name}:</b> ${input.value}</div>`;
    input.value = "";
    box.scrollTop = box.scrollHeight;
  }
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-page').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).style.display = 'block';
}

function showToast(msg, isError) {
  const banner = document.getElementById("toastBanner");
  banner.innerText = msg;
  banner.style.borderColor = isError ? "var(--accent-red)" : "var(--royal-gold)";
  banner.style.display = "block";
  setTimeout(() => { banner.style.display = "none"; }, 3500);
}

function logoutPlayer() { location.reload(); }
