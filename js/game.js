// Main game script: Leaflet map + simple game state + supabase sync hooks
const game = {
  players: [], // empty at start
  parties: [
    { id: 'umno', name: 'UMNO', leader: null, seats: 0, treasury: 120000, portfolio: [] },
    { id: 'pakatan', name: 'Pakatan Harapan', leader: null, seats: 0, treasury: 110000, portfolio: [] },
    { id: 'dap', name: 'DAP', leader: null, seats: 0, treasury: 90000, portfolio: [] },
    { id: 'pas', name: 'PAS', leader: null, seats: 0, treasury: 80000, portfolio: [] },
    { id: 'pbs', name: 'PBS', leader: null, seats: 0, treasury: 40000, portfolio: [] }
  ],
  government: null,
  seats: {}, // e.g. 'seat-1': null
  regionSelected: null
};

let map, geojsonLayer, supabaseClient = null;

function init() {
  renderUI();
  initMap();
  wireUI();
  initSupabaseIfConfigured();
}

function initMap() {
  map = L.map('map').setView([4.2105,101.9758], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

  fetch('assets/geojson/malaysia-regions.geojson')
    .then(r => r.json())
    .then(geo => {
      geojsonLayer = L.geoJSON(geo, {
        style: f => ({ color: '#444', weight: 1, fillOpacity: 0.6 }),
        onEachFeature: (feature, layer) => {
          layer.on('click', () => onRegionClick(feature, layer));
          layer.bindTooltip(feature.properties && feature.properties.name ? feature.properties.name : 'Wilayah');
        }
      }).addTo(map);
    }).catch(err => {
      console.warn('Could not load geojson:', err);
    });
}

function onRegionClick(feature, layer) {
  const id = feature.id || (feature.properties && feature.properties.id) || null;
  game.regionSelected = { id, feature, layer };
  showRegionPanel(feature);
}

function showRegionPanel(feature) {
  const div = document.getElementById('regionInfo');
  const name = (feature.properties && feature.properties.name) || 'Kawasan';
  const html = `\n    <h3>${name}</h3>\n    <div>Assign seat to party:</div>\n    <div style="margin-top:8px">${game.parties.map(p => `<button class=\"small\" onclick=\"assumeLeadershipOfSeat('${p.id}')\">${escapeHtml(p.name)}</button>`).join(' ')}</div>\n    <div style=\"margin-top:12px\">Region id: ${escapeHtml(String(feature.id || (feature.properties && feature.properties.id) || 'unknown'))}</div>\n  `;
  div.innerHTML = html;
}

function assumeLeadershipOfSeat(partyId) {
  const region = game.regionSelected;
  if (!region) return alert('Pilih kawasan dulu');
  const seatId = region.id || (region.feature && (region.feature.properties && region.feature.properties.id)) || `seat-${Date.now()}`;
  game.seats[seatId] = partyId;
  const party = game.parties.find(p => p.id === partyId);
  if (party) party.seats = (party.seats || 0) + 1;
  renderUI();
  syncStateToSupabase();
}

function assumeLeadership(partyId, playerId) {
  const party = game.parties.find(p => p.id === partyId);
  if (!party) return;
  // remove player's previous leadership
  game.parties.forEach(p => { if (p.leader === playerId) p.leader = null; });
  // add player if not exist
  if (playerId && !game.players.find(pl => pl.id === playerId)) game.players.push({ id: playerId, name: playerId });
  party.leader = playerId;
  renderUI();
  syncStateToSupabase();
}

function createParty(name) {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (game.parties.find(p => p.id === id)) return alert('Parti sudah wujud');
  game.parties.push({ id, name, leader: null, seats: 0, treasury: 50000, portfolio: [] });
  renderUI();
  syncStateToSupabase();
}

function resetGovernmentAndSeats() {
  game.government = null;
  game.parties.forEach(p => p.seats = 0);
  Object.keys(game.seats).forEach(k => game.seats[k] = null);
  renderUI();
  syncStateToSupabase();
}

function transferFunds(partyId, amount) {
  const p = game.parties.find(x => x.id === partyId);
  if (!p) return false;
  if ((p.treasury || 0) + amount < 0) return false;
  p.treasury = (p.treasury || 0) + amount;
  renderUI();
  syncStateToSupabase();
  return true;
}

function renderUI() {
  const ul = document.getElementById('parties');
  ul.innerHTML = '';
  game.parties.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<div><strong>${escapeHtml(p.name)}</strong><div style=\"font-size:12px;color:#666\">Leader: ${escapeHtml(p.leader || '—')} · Seats: ${p.seats || 0} · RM ${Number(p.treasury||0).toLocaleString()}</div></div>`;
    const actions = document.createElement('div');
    const btnLead = document.createElement('button'); btnLead.className='small'; btnLead.textContent='Jadi Ketua'; btnLead.onclick = () => openLeadershipModal(p.id);
    const btnPort = document.createElement('button'); btnPort.className='small'; btnPort.textContent='Portfolio'; btnPort.onclick=()=>openPortfolioModal(p.id);
    actions.appendChild(btnLead); actions.appendChild(btnPort);
    li.appendChild(actions);
    ul.appendChild(li);
  });
}

function openLeadershipModal(partyId){
  openModal(`\n    <h3>Ambil Kepimpinan ${escapeHtml(partyId)}</h3>\n    <div>Masukkan nama main (id pemain):</div>\n    <input id=\"playerIdInput\" placeholder=\"player-01\" style=\"width:100%;margin-top:8px;padding:8px\" />\n    <div style=\"margin-top:10px;text-align:right\"><button onclick=\"confirmTakeLeadership('${partyId}')\">Sahkan</button></div>\n  `);
}

function confirmTakeLeadership(partyId){
  const v = document.getElementById('playerIdInput').value.trim();
  if(!v) return alert('Masukkan id pemain');
  assumeLeadership(partyId, v);
  closeModal();
}

function openPortfolioModal(partyId){
  const p = game.parties.find(x=>x.id===partyId);
  if(!p) return;
  openModal(`\n    <h3>Portfolio: ${escapeHtml(p.name)}</h3>\n    <div>RM ${Number(p.treasury||0).toLocaleString()}</div>\n    <div style=\"margin-top:8px\">Aset: ${(p.portfolio && p.portfolio.length) ? escapeHtml(p.portfolio.join(', ')) : '—'}</div>\n  `);
}

function openModal(html){
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modal').classList.remove('hidden');
}
function closeModal(){ document.getElementById('modal').classList.add('hidden'); }

function wireUI(){
  document.getElementById('portfolioBtn').addEventListener('click', ()=>{
    openModal('<h3>Semua Portfolio</h3><div id="allPort">'+game.parties.map(p=>`<div><strong>${escapeHtml(p.name)}</strong>: RM ${Number(p.treasury||0).toLocaleString()}</div>`).join('')+'</div>');
  });
  document.getElementById('resetGovBtn').addEventListener('click', ()=>{
    if(confirm('Reset government and seats?')) resetGovernmentAndSeats();
  });
  document.getElementById('createPartyBtn').addEventListener('click', ()=>{
    openModal('<h3>Tubuhkan Parti Baru</h3><input id="newPartyName" placeholder="Nama Parti" style="width:100%;padding:8px" /><div style="margin-top:8px;text-align:right"><button onclick="createPartyFromModal()">Buat</button></div>');
  });
  document.getElementById('modalClose').addEventListener('click',closeModal);
}

function createPartyFromModal(){
  const v = document.getElementById('newPartyName').value.trim();
  if(!v) return alert('Masukkan nama parti');
  createParty(v);
  closeModal();
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

/* --- Supabase sync (optional) --- */
function initSupabaseIfConfigured(){
  if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) return console.log('Supabase not configured. Copy js/config.example.js to js/config.js and set keys.');
  try{
    supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    startSupabaseSync();
  }catch(e){ console.warn('Supabase init error', e); }
}

async function startSupabaseSync(){
  const id = window.GAME_ID || 'default';
  // ensure row exists
  try{
    const { data } = await supabaseClient.from('games').select('id,state').eq('id', id).limit(1);
    if(!data || data.length===0){
      await supabaseClient.from('games').insert([{ id, state: game }]);
    } else {
      // load server state (merge)
      const server = data[0].state;
      if(server) Object.assign(game, server);
      renderUI();
    }
  }catch(e){ console.warn('Supabase table access failed. Ensure a table `games (id text primary key, state jsonb)` exists and anon key has R/W.'); }

  // subscribe to changes (realtime). Try `.on` then fallback to polling.
  try{
    supabaseClient
      .from(`games:id=eq.${id}`)
      .on('UPDATE', payload => {
        if(payload && payload.new && payload.new.state){
          Object.assign(game, payload.new.state);
          renderUI();
        }
      })
      .subscribe();
  }catch(e){
    // fallback polling
    setInterval(async ()=>{
      try{
        const { data } = await supabaseClient.from('games').select('state').eq('id', id).limit(1);
        if(data && data[0] && data[0].state){ Object.assign(game, data[0].state); renderUI(); }
      }catch(err){ }
    }, 3000);
  }
}

async function syncStateToSupabase(){
  if(!supabaseClient) return;
  const id = window.GAME_ID || 'default';
  try{
    await supabaseClient.from('games').upsert({ id, state: game });
  }catch(e){ console.warn('Failed to sync to supabase', e); }
}

// init app
window.addEventListener('DOMContentLoaded', init);
