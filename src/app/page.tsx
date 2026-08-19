import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { mechanics } from "@/content/mechanics";
import { modes } from "@/content/modes";
import { tracks } from "@/content/tracks";
import { vehicleClasses } from "@/content/workshop";
import { principles } from "@/content/principles";
import { faq } from "@/content/faq";
import { gallery, heroImage } from "@/content/gallery";
import { statusLabel } from "@/content/types";
import { site } from "@/content/site";
import { TodayChallenge, TodayChallengeSkeleton } from "@/components/TodayChallenge";

export const metadata: Metadata = {
  title: "Strona główna",
  description:
    "Przeglądarkowa gra wyścigowa: ręczna skrzynia biegów na wyczucie, balast dobierany przed startem i tory z desek, kredy oraz węża ogrodowego. Zaczynasz od razu, bez instalowania niczego.",
};

const requirements = [
  {
    label: "Platforma",
    value: "Wyłącznie przeglądarka — komputer, tablet albo telefon. Bez instalacji i bez konta.",
  },
  {
    label: "Wymagania techniczne",
    value: "Aktualna przeglądarka z obsługą JavaScript. System operacyjny nie ma znaczenia.",
  },
  {
    label: "Zapis wyników",
    value: "Najlepszy czas z demo zostaje lokalnie w tej przeglądarce, dopóki nie wyczyścisz jej danych.",
  },
  {
    label: "Sugerowany wiek",
    value: "Bez przemocy — nasza własna, nieformalna rekomendacja to około 8 lat.",
  },
  {
    label: "Dostępność",
    value: "Pełna obsługa klawiatury, widoczny fokus i poszanowanie ustawienia „ogranicz animacje”.",
  },
  {
    label: "Dane i prywatność",
    value: (
      <>
        Szczegóły w{" "}
        <Link href="/polityka-prywatnosci" className={styles.inlineLink}>
          polityce prywatności
        </Link>{" "}
        oraz{" "}
        <Link href="/cookies" className={styles.inlineLink}>
          polityce cookie
        </Link>
        .
      </>
    ),
  },
];

export default function HomePage() {
  const demoTrack = tracks.find((t) => t.status === "demo");
  const demoModeCount = modes.filter((m) => m.status === "demo").length;

  return (
    <>
      <section className={styles.hero}>
        <Image src={heroImage.src} alt="" fill priority sizes="100vw" className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Demo dostępne teraz — tor: {demoTrack?.title}
          </span>
          <h1 className={styles.h1}>
            Wyścigi rysowane kredą po własnym podjeździe, z ręczną skrzynią biegów zamiast
            automatu.
          </h1>
          <p className={styles.heroLede}>
            Model rozpędza się tylko wtedy, gdy złapiesz właściwy moment na zmianę biegu. Sekundę
            za wcześnie i silnik gaśnie. Sekundę za późno i grzeje się pasek napędu. Reszta toru
            to deski, cegły i to, co akurat stało w garażu. Otwierasz przeglądarkę i grasz —
            żadnego pobierania, żadnego konta.
          </p>
          <div className={styles.heroActions}>
            <Link href="/wyscig" className={styles.btnPrimary}>
              Zagraj w demo
            </Link>
            <Link href="#o-grze" className={styles.btnSecondary}>
              Zobacz, jak to działa
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div>
              <div className={`${styles.statValue} numeric`}>{tracks.length}</div>
              <div className={styles.statLabel}>torów w budowie i na demo</div>
            </div>
            <div>
              <div className={`${styles.statValue} numeric`}>{vehicleClasses.length}</div>
              <div className={styles.statLabel}>klas nadwozia do wyboru</div>
            </div>
            <div>
              <div className={`${styles.statValue} numeric`}>3</div>
              <div className={styles.statLabel}>okrążenia w jednym przejeździe demo</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.todaySection}>
        <div className={styles.todayWrap}>
          <div className={styles.todayIntro}>
            <span className={styles.kicker}>Wyzwanie dnia · w przygotowaniu</span>
            <p className={styles.todayText}>
              Ten zestaw liczy serwer z dzisiejszej daty czasu warszawskiego — każdy odwiedzający
              z Polski widzi dziś dokładnie to samo. Sam tryb gry jeszcze powstaje, ale podgląd
              działa naprawdę.
            </p>
          </div>
          <Suspense fallback={<TodayChallengeSkeleton />}>
            <TodayChallenge />
          </Suspense>
        </div>
      </section>

      <section id="o-grze" className={styles.section}>
        <span className={styles.kicker}>O grze</span>
        <h2 className={styles.h2}>Garaż, podjazd i cierpliwość ważniejsza niż refleks</h2>
        <div className={styles.proseGrid}>
          <div className={styles.prose}>
            <p>
              Pomysł wziął się z pytania, które pewnie zadał sobie niejeden właściciel skrzynki z
              narzędziami. Co, gdyby złożyć własny model z tego, co akurat jest pod ręką, i puścić
              go na tor narysowany kredą na podjeździe? Ta gra jest odpowiedzią, tylko przeniesioną
              do przeglądarki — bez smaru pod paznokciami.
            </p>
            <p>
              Kto mocniej wciśnie gaz, ma tu najmniejsze znaczenie. Auto ma ręczną skrzynię biegów.
              Ty decydujesz, kiedy dokładnie zmienić przełożenie, patrząc na wskazówkę obrotów.
              Spóźniona zmiana grzeje gumowy pasek napędu. Przegrzany pasek to kilkusekundowy
              postój, który potrafi zepsuć całe dobrze jadące okrążenie.
            </p>
            <p>
              Gotowy do gry jest na razie jeden tor i jeden tryb. Reszta zestawienia niżej na tej
              stronie ma opisany status wprost — „w przygotowaniu” albo „w planach”, bez terminów,
              których jednoosobowy zespół i tak by nie dotrzymał.
            </p>
          </div>
          <figure className={styles.figure}>
            <Image
              src={gallery[0]!.src}
              alt={gallery[0]!.alt}
              width={1200}
              height={630}
              style={{ width: "100%", height: "auto" }}
            />
            <figcaption className={styles.figCaption}>{gallery[0]!.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTight}`}>
        <span className={styles.kicker}>Zasady, których się trzymamy</span>
        <h2 className={styles.h2}>Sześć rzeczy, które postanowiliśmy zrobić inaczej</h2>
        <p className={styles.lede}>
          Decyzje stojące za projektem mówią więcej niż lista funkcji. Łatwiej wtedy ocenić, czy
          to w ogóle coś dla Ciebie.
        </p>
        <div className={styles.grid3}>
          {principles.map((p, i) => (
            <div className={styles.card} key={p.title}>
              <div className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardText}>{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mechanika" className={styles.section}>
        <span className={styles.kicker}>Jak to się gra</span>
        <h2 className={styles.h2}>Pięć mechanik, które razem tworzą jeden wyścig</h2>
        <p className={styles.lede}>
          Każda z nich działa w tle nieustannie. Razem dają ten specyficzny, trochę nerwowy rytm
          garażowych wyścigów.
        </p>
        <div className={styles.grid3}>
          {mechanics.map((m, i) => (
            <div className={styles.card} key={m.slug}>
              <div className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</div>
              <h3 className={styles.cardTitle}>{m.title}</h3>
              <p className={styles.cardText}>{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTight}`}>
        <span className={styles.kicker}>Tryby gry</span>
        <h2 className={styles.h2}>Cztery sposoby na jeden zestaw reguł</h2>
        <p className={styles.lede}>
          Obecnie {demoModeCount === 1 ? "jeden tryb działa" : `${demoModeCount} tryby działają`}{" "}
          jako demo. Pozostałe są w przygotowaniu albo w planach — bez zgadywania dat premiery.
        </p>
        <div className={styles.modeList}>
          {modes.map((m) => (
            <article className={styles.modeRow} key={m.slug}>
              <div>
                <div className={styles.modeTitleRow}>
                  <h3 className={styles.modeTitle}>{m.title}</h3>
                  <span className={`${styles.status} ${styles[`status-${m.status}`]}`}>
                    {statusLabel[m.status]}
                  </span>
                </div>
                <p className={styles.modeSummary}>{m.summary}</p>
                <p className={styles.modeDetail}>{m.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="tory" className={styles.section}>
        <span className={styles.kicker}>Tory</span>
        <h2 className={styles.h2}>Sześć miejsc, w których toczą się wyścigi</h2>
        <p className={styles.lede}>
          Każdy tor wygląda inaczej, bo powstał z innych, przypadkowo dostępnych materiałów. Bez
          jednego, powtarzalnego szablonu przeszkód.
        </p>
        <div className={styles.trackList}>
          {tracks.map((t) => (
            <article className={styles.trackRow} key={t.slug}>
              <div className={styles.trackIndex}>{String(t.index).padStart(2, "0")}</div>
              <div className={styles.trackBody}>
                <div className={styles.trackTitleRow}>
                  <h3 className={styles.trackTitle}>{t.title}</h3>
                  <span className={`${styles.status} ${styles[`status-${t.status}`]}`}>
                    {statusLabel[t.status]}
                  </span>
                </div>
                <p className={styles.trackPlace}>{t.place}</p>
                <p className={styles.trackDetail}>{t.detail}</p>
                <div className={styles.trackFeature}>
                  <span className={styles.trackFeatureLabel}>Cecha toru:</span> {t.feature}
                </div>
              </div>
              <div className={styles.trackAside}>
                {t.status === "demo" ? (
                  <Link href="/wyscig" className={styles.trackAction}>
                    Zagraj →
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTight}`}>
        <span className={styles.kicker}>Warsztat</span>
        <h2 className={styles.h2}>Z czego buduje się zawodnika</h2>
        <p className={styles.lede}>
          Pięć klas nadwozia, żadna fabryczna. Różnią się wagą, sztywnością i tym, jak bardzo
          wybaczają błędy w utrzymaniu. Pełny opis każdej jest na osobnej stronie.
        </p>
        <div className={styles.grid3}>
          {vehicleClasses.map((v) => (
            <div className={styles.card} key={v.slug}>
              <h3 className={styles.cardTitle}>{v.title}</h3>
              <p className={styles.cardText}>{v.summary}</p>
              <div className={styles.tradeoffRow}>
                <span className={styles.tradeoffGood}>+ {v.advantage}</span>
                <span className={styles.tradeoffBad}>− {v.drawback}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sectionCta}>
          <Link href="/warsztat" className={styles.btnSecondary}>
            Zobacz pełny warsztat →
          </Link>
        </div>
      </section>

      <section id="galeria" className={styles.section}>
        <span className={styles.kicker}>Galeria</span>
        <h2 className={styles.h2}>Kilka kadrów z podwórka</h2>
        <p className={styles.lede}>
          Ilustracje, nie zdjęcia — chodziło nam o klimat, nie o dokumentację konkretnego miejsca.
        </p>
        <div className={styles.galleryGrid}>
          {gallery.map((g) => (
            <figure className={styles.galleryItem} key={g.src}>
              <div className={styles.galleryImgWrap}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 720px) 33vw, 50vw"
                  className={styles.galleryImg}
                />
              </div>
              <figcaption className={styles.galleryCaption}>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTight}`}>
        <span className={styles.kicker}>Zanim zaczniesz</span>
        <h2 className={styles.h2}>Konkrety zamiast obietnic</h2>
        <div className={styles.reqList}>
          {requirements.map((r) => (
            <div className={styles.reqRow} key={r.label}>
              <span className={styles.reqLabel}>{r.label}</span>
              <span className={styles.reqValue}>{r.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className={styles.section}>
        <span className={styles.kicker}>Pytania</span>
        <h2 className={styles.h2}>To, o co pytają najczęściej</h2>
        <div className={styles.faqList}>
          {faq.map((f) => (
            <details className={styles.faqItem} key={f.question}>
              <summary>{f.question}</summary>
              <p className={styles.faqAnswer}>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <span className={styles.kicker} style={{ justifyContent: "center" }}>
            Zacznij od jednego okrążenia
          </span>
          <h2 className={styles.h2} style={{ margin: "0 auto" }}>
            Tor jest narysowany, kreda jeszcze świeża — zostało tylko złapać właściwy moment na
            zmianę biegu
          </h2>
          <div className={styles.finalCtaActions}>
            <Link href="/wyscig" className={styles.btnPrimary}>
              Zagraj teraz
            </Link>
            <Link href="/kontakt" className={styles.btnSecondary}>
              Napisz do nas
            </Link>
          </div>
          <p className={styles.finalNote}>
            Serwis {site.domain} jest w fazie rozwoju. Dostępny jako demo: {demoTrack?.title}, tryb
            „{modes.find((m) => m.status === "demo")?.title}”.
          </p>
        </div>
      </section>
    </>
  );
}
