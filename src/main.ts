import './style.css';

// ============================================
// HairFlow Landing — Device detection & redirect
// ============================================

// Store URLs — update these with real IDs
const STORE_URLS = {
  ios: 'https://apps.apple.com/app/hairflow/id6740487880',
  android: 'https://play.google.com/store/apps/details?id=com.hairflow.app',
};

type Platform = 'ios' | 'android' | 'desktop';

function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';

  return 'desktop';
}

function init() {
  const platform = detectPlatform();
  const notice = document.getElementById('redirect-notice');
  const btnIos = document.getElementById('btn-ios') as HTMLAnchorElement | null;
  const btnAndroid = document.getElementById('btn-android') as HTMLAnchorElement | null;
  const desktopNote = document.getElementById('desktop-note');

  // Set iOS store URL
  if (btnIos) {
    btnIos.href = STORE_URLS.ios;
  }

  // Set Android store URL
  if (btnAndroid) {
    btnAndroid.href = STORE_URLS.android;
  }

  if (platform === 'ios') {
    // iOS: highlight App Store button, dim Android
    if (btnAndroid) btnAndroid.style.display = 'none';
    if (desktopNote) desktopNote.style.display = 'none';
    if (notice) notice.textContent = 'Redirecting to the App Store...';

    // Auto-redirect after brief visual pause
    setTimeout(() => {
      window.location.href = STORE_URLS.ios;
    }, 1500);

  } else if (platform === 'android') {
    // Android: highlight Play Store button, dim iOS
    if (btnIos) btnIos.style.display = 'none';
    if (desktopNote) desktopNote.style.display = 'none';
    if (notice) notice.textContent = 'Redirecting to Google Play...';

    setTimeout(() => {
      window.location.href = STORE_URLS.android;
    }, 1500);

  } else {
    // Desktop: show both buttons, no redirect
    if (notice) notice.style.display = 'none';
    if (desktopNote) desktopNote.style.display = 'block';
  }
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
