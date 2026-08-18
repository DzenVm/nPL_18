"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "nometuwe-cookie-consent";
const CHANGE_EVENT = "nometuwe-cookie-consent-changed";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function readAdsConsent(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return (JSON.parse(raw) as { ads?: boolean }).ads === true;
  } catch {
    return false;
  }
}

function readAdsConsentOnServer(): boolean {
  return false;
}

/**
 * Loads the Google tag only after explicit ads-cookie consent, and only if
 * NEXT_PUBLIC_GOOGLE_ADS_ID is configured. Without both, this renders nothing —
 * there is no tracking script on the page by default.
 */
export function GoogleTag() {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const hasAdsConsent = useSyncExternalStore(subscribe, readAdsConsent, readAdsConsentOnServer);

  if (!adsId || !hasAdsConsent) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`} strategy="afterInteractive" />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${adsId}');
        `}
      </Script>
    </>
  );
}
