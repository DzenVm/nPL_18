import type { Metadata } from "next";
import styles from "@/components/LegalLayout.module.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Polityka plików cookie",
  description: "Jakich plików cookie i podobnych technologii używa serwis " + site.domain + ".",
};

const rows = [
  {
    name: "nometuwe-cookie-consent",
    type: "localStorage, niezbędne",
    purpose: "Zapamiętuje Twój wybór w bannerze zgody, żeby nie pytać o niego przy każdej wizycie.",
  },
  {
    name: "nometuwe-best-times",
    type: "localStorage, niezbędne do funkcji demo",
    purpose: "Przechowuje Twój najlepszy czas z demo, osobno dla każdego balastu. Nie opuszcza przeglądarki.",
  },
  {
    name: "_ga, _ga_* (opcjonalnie)",
    type: "cookie, analityczne",
    purpose: "Ustawiane wyłącznie po zgodzie na pliki analityczne, jeśli i gdy uruchomimy pomiar ruchu.",
  },
  {
    name: "znaczniki Google Ads (opcjonalnie)",
    type: "cookie, reklamowe",
    purpose: "Ustawiane wyłącznie po zgodzie na pliki reklamowe, do pomiaru skuteczności kampanii.",
  },
];

export default function CookiesPage() {
  return (
    <div className={styles.wrap}>
      <span className={styles.kicker}>Cookies</span>
      <h1 className={styles.h1}>Polityka plików cookie</h1>
      <p className={styles.updated}>Ostatnia aktualizacja: 18 sierpnia 2026</p>

      <div className={styles.prose}>
        <p>
          „Cookies” w tym dokumencie oznaczają zarówno klasyczne pliki cookie, jak i dane zapisane
          w mechanizmie localStorage przeglądarki — obie technologie służą tu do zapamiętywania
          informacji między odwiedzinami.
        </p>

        <h2>Niezbędne</h2>
        <p>
          Włączone zawsze, niezależnie od wyboru w bannerze — bez nich strona nie zapamięta
          Twojej decyzji o cookies ani wyniku z demo.
        </p>

        <h2>Analityczne i reklamowe</h2>
        <p>
          W chwili obecnej serwis nie ładuje żadnego zewnętrznego skryptu analitycznego ani
          reklamowego — mechanizm zgody jest już gotowy, ale sam skrypt Google uruchomi się
          dopiero, gdy zostanie skonfigurowany po stronie operatora serwisu. Jeśli to nastąpi,
          skrypt i tak odpali się wyłącznie po Twojej wyraźnej zgodzie, nigdy automatycznie.
        </p>

        <h2>Zestawienie</h2>
        <div className={styles.table}>
          <div className={styles.tableRow}>
            <span>Nazwa</span>
            <span>Typ i przeznaczenie</span>
          </div>
          {rows.map((r) => (
            <div className={styles.tableRow} key={r.name}>
              <span className={styles.tableKey}>{r.name}</span>
              <span>
                {r.type} — {r.purpose}
              </span>
            </div>
          ))}
        </div>

        <h2>Jak zmienić swój wybór</h2>
        <p>
          Wystarczy wyczyścić dane strony w ustawieniach przeglądarki (dla {site.domain}) —
          banner zgody pojawi się ponownie przy kolejnej wizycie. Nie ma osobnego panelu ustawień
          na stronie, bo przy tak małej liczbie plików cookie nie jest on potrzebny.
        </p>

        <h2>Powiązane dokumenty</h2>
        <p>
          Pełny opis przetwarzania danych osobowych znajduje się w{" "}
          <a href="/polityka-prywatnosci">polityce prywatności</a>.
        </p>
      </div>
    </div>
  );
}
