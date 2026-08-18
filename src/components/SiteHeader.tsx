import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { site } from "@/content/site";

const links = [
  { href: "/#o-grze", label: "O grze" },
  { href: "/#mechanika", label: "Mechanika" },
  { href: "/#tory", label: "Tory" },
  { href: "/warsztat", label: "Warsztat" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.mark}>
          {site.domain}
        </Link>
        <nav aria-label="Nawigacja główna" className={styles.nav}>
          <ul className={styles.navList}>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/wyscig" className={styles.cta}>
          Zagraj w demo
        </Link>
      </div>
    </header>
  );
}
