// App data
const apps = {
  vaultify: {
    name: 'Vaultify',
    subtitle: 'Encrypted Storage on AnthroGate',
    color: '#0984e3',
    gradient: 'linear-gradient(135deg, #0984e3, #74b9ff)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="white" stroke-width="1.5"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16" r="1.5" fill="white"/></svg>'
  },
  humanpay: {
    name: 'HumanPay',
    subtitle: 'Human-Verified Payments',
    color: '#00b894',
    gradient: 'linear-gradient(135deg, #00b894, #55efc4)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  votetrue: {
    name: 'VoteTrue',
    subtitle: 'One Human, One Vote',
    color: '#e17055',
    gradient: 'linear-gradient(135deg, #e17055, #fab1a0)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  airdropx: {
    name: 'AirdropX',
    subtitle: 'Fair Token Distribution',
    color: '#6c5ce7',
    gradient: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><path d="M2 17l10 5 10-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12l10 5 10-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  idguard: {
    name: 'IDGuard',
    subtitle: 'Identity Protection Service',
    color: '#fdcb6e',
    gradient: 'linear-gradient(135deg, #fdcb6e, #ffeaa7)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  meshchat: {
    name: 'MeshChat',
    subtitle: 'Verified Messaging',
    color: '#e84393',
    gradient: 'linear-gradient(135deg, #fd79a8, #e84393)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="8" y1="9" x2="16" y2="9" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="13" x2="13" y2="13" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>'
  },
  provenance: {
    name: 'Provenance',
    subtitle: 'Content Authentication',
    color: '#00cec9',
    gradient: 'linear-gradient(135deg, #00cec9, #81ecec)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>'
  },
  reputon: {
    name: 'Reputon',
    subtitle: 'Reputation Scoring',
    color: '#636e72',
    gradient: 'linear-gradient(135deg, #2d3436, #636e72)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="white" stroke-width="1.5" stroke-linejoin="round" fill="none"/></svg>'
  }
};

const tips = [
  "AKMA uses zero-knowledge proofs to verify you're human without revealing your identity",
  "Your AKMA credential is stored locally on your device — we never see it",
  "Over 2.8 million humans have been verified through AnthroGate",
  "AKMA verification works offline — no internet needed for proof generation",
  "Each AKMA proof is unique and cannot be reused or transferred",
  "AnthroGate apps can verify humanhood in under 2 seconds"
];

let currentApp = null;
let tipInterval = null;

function switchScreen(from, to) {
  const fromEl = document.getElementById(from);
  const toEl = document.getElementById(to);
  fromEl.classList.remove('active');
  toEl.classList.add('active');
}

function setAppIcon(elementId, app) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.style.background = app.gradient;
  el.innerHTML = app.iconSvg.replace('width="32"', 'width="18"').replace('height="32"', 'height="18"');
  el.style.display = 'flex';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
}

function openApp(appId) {
  currentApp = apps[appId];
  if (!currentApp) return;

  // Set splash screen
  document.getElementById('splash-app-name').textContent = currentApp.name;
  const splashLogo = document.getElementById('splash-logo');
  splashLogo.style.background = currentApp.gradient;
  splashLogo.innerHTML = currentApp.iconSvg;
  setAppIcon('splash-icon', currentApp);

  switchScreen('screen-home', 'screen-app-splash');

  // After splash, show main app screen
  setTimeout(() => {
    document.getElementById('main-app-name').textContent = currentApp.name;
    document.getElementById('main-subtitle').textContent = currentApp.subtitle;
    document.getElementById('sheet-app-ref').textContent = currentApp.name;
    setAppIcon('main-icon', currentApp);

    switchScreen('screen-app-splash', 'screen-app-main');
  }, 1800);
}

function goHome() {
  // Find active screen
  const activeScreen = document.querySelector('.screen.active');
  if (activeScreen) {
    switchScreen(activeScreen.id, 'screen-home');
  }
  hideSignIn();
  if (tipInterval) clearInterval(tipInterval);
}

function showSignIn() {
  document.getElementById('signin-overlay').classList.add('active');
}

function hideSignIn() {
  document.getElementById('signin-overlay').classList.remove('active');
}

function startVerification() {
  hideSignIn();

  // Set verifying screen app name
  document.getElementById('verify-app-name').textContent = currentApp.name;

  setTimeout(() => {
    switchScreen('screen-app-main', 'screen-verifying');

    // Cycle tips
    let tipIndex = 0;
    const tipEl = document.getElementById('tip-text');
    tipEl.textContent = tips[tipIndex];

    tipInterval = setInterval(() => {
      tipIndex = (tipIndex + 1) % tips.length;
      tipEl.style.opacity = 0;
      setTimeout(() => {
        tipEl.textContent = tips[tipIndex];
        tipEl.style.opacity = 1;
      }, 300);
    }, 3000);

    // After verification completes
    setTimeout(() => {
      clearInterval(tipInterval);

      document.getElementById('verified-app-name').textContent = currentApp.name;
      setAppIcon('verified-icon', currentApp);

      switchScreen('screen-verifying', 'screen-verified');

      // Show success toast
      setTimeout(() => {
        document.getElementById('success-toast').classList.add('show');
      }, 500);

      // Hide toast after a while
      setTimeout(() => {
        document.getElementById('success-toast').classList.remove('show');
      }, 4500);
    }, 5000);
  }, 300);
}

// Add smooth tip text transition
const style = document.createElement('style');
style.textContent = '#tip-text { transition: opacity 0.3s ease; }';
document.head.appendChild(style);
