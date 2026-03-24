import './style.css';

// ============================================
// HairFlow Landing — i18n + device redirect
// ============================================

const STORE_URLS = {
  ios: 'https://apps.apple.com/fr/app/hairfloww/id6756860185',
  android: 'https://play.google.com/store/apps/details?id=com.hairflow.app',
};

type Lang = 'fr' | 'en';
type Platform = 'ios' | 'android' | 'desktop';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    pageTitle: 'HairFlow — See Your Perfect Cut',
    titleLine1: 'See Your',
    titleAccent: 'Perfect Cut',
    subtitle: 'Visualize any hairstyle on yourself with AI.<br/>Try before you cut.',
    redirectIos: 'Redirecting to the App Store\u2026',
    redirectAndroid: 'Redirecting to Google Play\u2026',
    iosLabel: 'Download on the',
    androidLabel: 'Get it on',
    desktopNote: 'Available on iOS and Android',
    privacy: 'Privacy',
  },
  fr: {
    pageTitle: 'HairFlow — Visualisez Votre Coupe',
    titleLine1: 'Visualisez Votre',
    titleAccent: 'Coupe Parfaite',
    subtitle: "Visualisez n'importe quelle coiffure sur vous avec l'IA.<br/>Essayez avant de couper.",
    redirectIos: "Redirection vers l'App Store\u2026",
    redirectAndroid: 'Redirection vers Google Play\u2026',
    iosLabel: "T\u00e9l\u00e9charger sur l'",
    androidLabel: 'Disponible sur',
    desktopNote: 'Disponible sur iOS et Android',
    privacy: 'Confidentialit\u00e9',
  },
};

function detectLang(): Lang {
  const nav = navigator.language || (navigator as any).userLanguage || 'en';
  return nav.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';
  return 'desktop';
}

function setText(id: string, html: string) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function init() {
  const lang = detectLang();
  const platform = detectPlatform();
  const t = translations[lang];

  // Set lang attribute
  document.documentElement.lang = lang;
  document.title = t.pageTitle;

  // Apply translations
  const titleEl = document.getElementById('title');
  if (titleEl) {
    titleEl.innerHTML = `${t.titleLine1}<br/><span class="title-accent">${t.titleAccent}</span>`;
  }
  setText('subtitle', t.subtitle);
  setText('ios-label', t.iosLabel);
  setText('android-label', t.androidLabel);
  setText('desktop-note', t.desktopNote);
  setText('footer-privacy', t.privacy);

  // Set store URLs
  const btnIos = document.getElementById('btn-ios') as HTMLAnchorElement | null;
  const btnAndroid = document.getElementById('btn-android') as HTMLAnchorElement | null;
  const notice = document.getElementById('redirect-notice');
  const desktopNote = document.getElementById('desktop-note');

  if (btnIos) btnIos.href = STORE_URLS.ios;
  if (btnAndroid) btnAndroid.href = STORE_URLS.android;

  if (platform === 'ios') {
    if (btnAndroid) btnAndroid.style.display = 'none';
    if (desktopNote) desktopNote.style.display = 'none';
    if (notice) notice.textContent = t.redirectIos;
    setTimeout(() => { window.location.href = STORE_URLS.ios; }, 1500);

  } else if (platform === 'android') {
    if (btnIos) btnIos.style.display = 'none';
    if (desktopNote) desktopNote.style.display = 'none';
    if (notice) notice.textContent = t.redirectAndroid;
    setTimeout(() => { window.location.href = STORE_URLS.android; }, 1500);

  } else {
    if (notice) notice.style.display = 'none';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
