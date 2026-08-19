import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { RaceDemo } from "@/components/game/RaceDemo";

export const metadata: Metadata = {
  title: "Zagraj w demo",
  description:
    "Grywalne demo: ręczna skrzynia biegów na wyczucie, trzy okrążenia i balast do wyboru przed startem. Działa w przeglądarce, bez instalacji.",
};

export default function WyscigPage() {
  return (
    <div className={styles.wrap}>
      <span className={styles.kicker}>Demo · tor: Podjazd przy garażu</span>
      <h1 className={styles.h1}>Złap moment, zmień bieg, dojedź trzy okrążenia</h1>
      <p className={styles.lede}>
        To jest realna, grywalna wersja pierwszego trybu — nie zrzut ekranu i nie zapowiedź.
        Poniżej wybierasz balast, a potem patrzysz na pasek obrotów: kliknięcie albo spacja w
        zielonym polu to czysta zmiana biegu.
      </p>

      <div className={styles.howTo}>
        <div className={styles.howToItem}>
          <div className={styles.howToNum}>01</div>
          <p className={styles.howToText}>
            Wybierz balast. Lekki szybciej przyspiesza, ale ma węższe okno na zmianę biegu.
            Ciężki wybacza więcej, choć wolniej łapie prędkość.
          </p>
        </div>
        <div className={styles.howToItem}>
          <div className={styles.howToNum}>02</div>
          <p className={styles.howToText}>
            Obserwuj pasek obrotów. Gdy biały znacznik wejdzie w zielone pole, kliknij „Zmień
            bieg” albo wciśnij spację.
          </p>
        </div>
        <div className={styles.howToItem}>
          <div className={styles.howToNum}>03</div>
          <p className={styles.howToText}>
            Spóźnione zmiany grzeją pasek napędu. Przy pełnym pasku czeka Cię krótki, przymusowy
            postój techniczny.
          </p>
        </div>
      </div>

      <RaceDemo />

      <p className={styles.note}>
        Czas z każdego przejazdu zapisujemy wyłącznie lokalnie, w pamięci tej przeglądarki —
        osobno dla każdego balastu. Nie wysyłamy go na żaden serwer i nie porównujemy z innymi
        graczami. Pozostałe tryby i tory są jeszcze w przygotowaniu — zobacz{" "}
        <Link href="/#tory">pełną listę torów</Link> albo{" "}
        <Link href="/warsztat">warsztat z klasami nadwozia</Link>.
      </p>
    </div>
  );
}
