// auth.js - handle Supabase Auth flow and expose current user to the app
window.supabaseClient = null;
window.currentUser = null;

function initAuth() {
  if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) return console.log('Supabase not configured (auth). Copy js/config.example.js to js/config.js and set keys.');
  window.supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

  // Listen for auth changes
  window.supabaseClient.auth.onAuthStateChange((event, session) => {
    window.currentUser = session && session.user ? session.user : null;
    updateAuthUI();
    // create player row if newly logged in
    if (window.currentUser) ensurePlayerRow(window.currentUser);
  });

  // try to get current session right away
  (async ()=>{
    const { data } = await window.supabaseClient.auth.getSession();
    window.currentUser = data && data.session && data.session.user ? data.session.user : null;
    updateAuthUI();
    if (window.currentUser) ensurePlayerRow(window.currentUser);
  })();

  wireAuthButtons();
}

function wireAuthButtons(){
  const btnLogin = document.getElementById('btnLogin');
  const btnRegister = document.getElementById('btnRegister');
  btnLogin.addEventListener('click', ()=> showLoginModal());
  btnRegister.addEventListener('click', ()=> showRegisterModal());
}

function updateAuthUI(){
  const box = document.getElementById('userBox');
  if(!box) return;
  if(window.currentUser){
    box.innerHTML = `${escapeHtml(window.currentUser.email || window.currentUser.id)}`;
    // change buttons
    document.getElementById('btnLogin').textContent = 'Logout';
    document.getElementById('btnLogin').onclick = async ()=>{ await window.supabaseClient.auth.signOut(); };
    document.getElementById('btnRegister').style.display = 'none';
  } else {
    box.textContent = 'Not signed in';
    document.getElementById('btnLogin').textContent = 'Log Masuk';
    document.getElementById('btnLogin').onclick = ()=> showLoginModal();
    document.getElementById('btnRegister').style.display = '';
  }
}

async function ensurePlayerRow(user){
  try{
    // create or update a players row
    const players = window.supabaseClient.from('players');
    await players.upsert({ id: user.id, email: user.email, name: user.email }, { onConflict: 'id' });
  }catch(e){ console.warn('Could not ensure player row', e); }
}

function showLoginModal(){
  openModal(`
    <h3>Log Masuk</h3>
    <div class="auth-form">
      <input id="loginEmail" placeholder="Email" />
      <input id="loginPassword" type="password" placeholder="Password" />
      <button onclick="doLogin()">Log Masuk</button>
    </div>
  `);
}

function showRegisterModal(){
  openModal(`
    <h3>Daftar Akaun</h3>
    <div class="auth-form">
      <input id="regEmail" placeholder="Email" />
      <input id="regPassword" type="password" placeholder="Password" />
      <button onclick="doRegister()">Daftar</button>
    </div>
  `);
}

async function doLogin(){
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  if(!email || !password) return alert('Isi email dan password');
  try{
    const { error } = await window.supabaseClient.auth.signInWithPassword({ email, password });
    if(error) return alert('Login error: '+error.message);
    closeModal();
  }catch(e){ alert('Login failed'); }
}

async function doRegister(){
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  if(!email || !password) return alert('Isi email dan password');
  try{
    const { error } = await window.supabaseClient.auth.signUp({ email, password });
    if(error) return alert('Register error: '+error.message);
    alert('Sila semak email anda untuk pengesahan (jika diaktifkan)');
    closeModal();
  }catch(e){ alert('Register failed'); }
}

function requireAuth(action){
  if(!window.currentUser) return alert('Sila log masuk dahulu.');
  return action();
}

// small helper (copied) used in game UI
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

// init auth on DOM ready
window.addEventListener('DOMContentLoaded', initAuth);
