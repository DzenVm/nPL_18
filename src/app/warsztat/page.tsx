import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { vehicleClasses } from "@/content/workshop";

export const metadata: Metadata = {
  title: "Warsztat",
  description:
    "Pięć klas nadwozia budowanych własnoręcznie — z klocków, sklejki, drukarki 3D, giętego drutu i przerobionych starych zabawek.",
};

export default function WarsztatPage() {
  return (
    <div className={styles.wrap}>
      <span className={styles.kicker}>Warsztat</span>
      <h1 className={styles.h1}>Z czego naprawdę buduje się zawodnika</h1>
      <p className={styles.lede}>
        Żadna z klas poniżej nie istnieje jako gotowy egzemplarz. To pięć różnych podejść do
        złożenia auta, z zupełnie innym zestawem wad i zalet. Wybór klasy to pierwsza decyzja —
        jeszcze przed balastem, jeszcze przed torem.
      </p>

      <p className={styles.notice}>
        W obecnej wersji grywalnego demo wybiera się balast, a nie klasę nadwozia — pełny wybór
        klasy pojazdu trafi do rozgrywki razem z kolejnymi trybami gry. Ten opis to warsztatowe
        zaplecze, które już teraz można poznać.
      </p>

      <div className={styles.list}>
        {vehicleClasses.map((v) => (
          <article className={styles.item} key={v.slug}>
            <h2 className={styles.itemTitle}>{v.title}</h2>
            <p className={styles.itemSummary}>{v.summary}</p>
            <p className={styles.itemDetail}>{v.detail}</p>
            <div className={styles.tradeoffs}>
              <span className={styles.good}>+ {v.advantage}</span>
              <span className={styles.bad}>− {v.drawback}</span>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.closing}>
        <p>
          Obiektywnie najlepszej klasy po prostu nie ma — dobór zależy od toru, balastu i tego, na
          ile ktoś jest gotów majstrować przy naprawach między wyścigami. Więcej o samych torach
          znajdziesz na <Link href="/#tory">stronie głównej</Link>, a mechanikę zmiany biegów
          możesz sprawdzić już teraz w <Link href="/wyscig">grywalnym demie</Link>.
        </p>
      </div>
    </div>
  );
}
