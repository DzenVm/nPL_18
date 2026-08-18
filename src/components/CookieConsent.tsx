"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import styles from "./CookieConsent.module.css";

interface StoredConsent {
  necessary: true;
  analytics: boolean;
  ads: boolean;
  decidedAt: string;
}

const STORAGE_KEY = "nometuwe-cookie-consent";
const CHANGE_EVENT = "nometuwe-cookie-consent-changed";

function saveConsent(consent: StoredConsent) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function readDecidedOnClient() {
  return window.localStorage.getItem(STORAGE_KEY) !== null;
}

function readDecidedOnServer() {
  return true;
}

export function CookieConsent() {
  const alreadyDecided = useSyncExternalStore(subscribe, readDecidedOnClient, readDecidedOnServer);
  const [showOptions, setShowOptions] = useState(false);
  const [wantsAnalytics, setWantsAnalytics] = useState(false);
  const [wantsAds, setWantsAds] = useState(false);

  if (alreadyDecided) return null;

  function decide(analytics: boolean, ads: boolean) {
    saveConsent({ necessary: true, analytics, ads, decidedAt: new Date().toISOString() });
  }

  return (
    <div className={styles.wrap} role="dialog" aria-live="polite" aria-label="Zgoda na pliki cookie">
      <div className={styles.panel}>
        <p className={styles.text}>
          Ta strona korzysta z plików cookie niezbędnych do jej działania oraz — wyłącznie za
          Twoją zgodą — z plików analitycznych i reklamowych (w tym powiązanych z Google Ads).
          Odmowa niczego nie blokuje. Szczegóły: {" "}
          <Link href="/cookies">polityka cookie</Link> i{" "}
          <Link href="/polityka-prywatnosci">polityka prywatności</Link>.
        </p>

        {showOptions && (
          <div className={styles.options}>
            <label className={styles.option}>
              <input type="checkbox" checked disabled />
              <span>
                <strong>Niezbędne</strong>
                <span className="small">Wymagane do podstawowego działania strony. Zawsze włączone.</span>
              </span>
            </label>
            <label className={styles.option}>
              <input
                type="checkbox"
                checked={wantsAnalytics}
                onChange={(e) => setWantsAnalytics(e.target.checked)}
              />
              <span>
                <strong>Analityczne</strong>
                <span className="small">Pomagają zobaczyć, które fragmenty strony są czytane, a które pomijane.</span>
              </span>
            </label>
            <label className={styles.option}>
              <input
                type="checkbox"
                checked={wantsAds}
                onChange={(e) => setWantsAds(e.target.checked)}
              />
              <span>
                <strong>Reklamowe</strong>
                <span className="small">Służą do pomiaru skuteczności kampanii, w tym Google Ads.</span>
              </span>
            </label>
          </div>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.btnPrimary} onClick={() => decide(true, true)}>
            Akceptuj wszystkie
          </button>
          <button type="button" className={styles.btnGhost} onClick={() => decide(false, false)}>
            Tylko niezbędne
          </button>
          {showOptions ? (
            <button
              type="button"
              className={styles.btnGhost}
              onClick={() => decide(wantsAnalytics, wantsAds)}
            >
              Zapisz wybór
            </button>
          ) : (
            <button type="button" className={styles.btnLink} onClick={() => setShowOptions(true)}>
              Wybierz sam
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
