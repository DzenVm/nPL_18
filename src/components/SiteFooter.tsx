import Link from "next/link";
import styles from "./SiteFooter.module.css";
import { site } from "@/content/site";
import { CurrentYear } from "./CurrentYear";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.about}>
          <p className={styles.heading}>Czym jest ten serwis</p>
          <p className={styles.note}>
            {site.domain} to przeglądarkowa gra wyścigowa o modelach budowanych własnoręcznie
            i torach układanych z domowych przedmiotów. Serwis rozwija się stopniowo — status
            każdego elementu opisujemy wprost, bez dat premiery, których nie da się dotrzymać.
          </p>
        </div>
        <nav aria-label="Rozgrywka">
          <p className={styles.heading}>Rozgrywka</p>
          <ul className={styles.list}>
            <li><Link href="/#mechanika">Mechanika</Link></li>
            <li><Link href="/#tory">Tory</Link></li>
            <li><Link href="/warsztat">Warsztat</Link></li>
            <li><Link href="/wyscig">Zagraj w demo</Link></li>
          </ul>
        </nav>
        <nav aria-label="Informacje prawne">
          <p className={styles.heading}>Informacje</p>
          <ul className={styles.list}>
            <li><Link href="/polityka-prywatnosci">Polityka prywatności</Link></li>
            <li><Link href="/regulamin">Regulamin</Link></li>
            <li><Link href="/cookies">Pliki cookie</Link></li>
            <li><Link href="/kontakt">Kontakt</Link></li>
          </ul>
        </nav>
      </div>
      <div className={styles.bottom}>
        <span>© <CurrentYear /> {site.domain} — projekt w fazie rozwoju.</span>
        <span>{site.contactEmail}</span>
      </div>
    </footer>
  );
}
