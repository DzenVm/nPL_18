import type { Metadata } from "next";
import styles from "@/components/LegalLayout.module.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Zasady korzystania z serwisu " + site.domain + " i grywalnego demo.",
};

export default function RegulaminPage() {
  return (
    <div className={styles.wrap}>
      <span className={styles.kicker}>Regulamin</span>
      <h1 className={styles.h1}>Regulamin korzystania z serwisu</h1>
      <p className={styles.updated}>Ostatnia aktualizacja: 18 sierpnia 2026</p>

      <div className={styles.prose}>
        <h2>1. Postanowienia ogólne</h2>
        <p>
          Serwis {site.domain} udostępnia treści opisujące przeglądarkową grę wyścigową oraz
          grywalne demo jednego z jej trybów. Korzystanie z serwisu nie wymaga zakładania konta —
          otwierasz stronę i od razu widzisz całą treść.
        </p>

        <h2>2. Kto może korzystać z serwisu</h2>
        <p>
          Treści nie zawierają przemocy ani materiałów przeznaczonych wyłącznie dla dorosłych.
          Nasza sugestia wiekowa (około 8 lat) ma charakter opisowy, nie jest oficjalną
          klasyfikacją, a osoby niepełnoletnie powinny korzystać z serwisu z wiedzą opiekuna.
        </p>

        <h2>3. Zasady korzystania z demo</h2>
        <ul>
          <li>Demo nie przerywa rozgrywki reklamami ani wyskakującymi oknami — jedziesz od startu do mety bez narzucanych z zewnątrz przerw.</li>
          <li>Zapisywane lokalnie czasy przejazdów służą wyłącznie Tobie. Nie budujemy z nich żadnego rankingu.</li>
          <li>Zabronione jest podejmowanie prób zakłócenia działania serwisu, w tym automatycznego, masowego wysyłania żądań do serwera.</li>
        </ul>

        <h2>4. Status prac nad grą</h2>
        <p>
          Serwis prezentuje projekt w trakcie rozwoju. Tryby, tory i klasy pojazdów oznaczone
          jako „w przygotowaniu” lub „w planach” mogą zmienić się, zostać przesunięte w czasie
          albo zrealizowane inaczej, niż sugeruje opis. Nie podajemy wiążących dat premiery.
        </p>

        <h2>5. Własność treści</h2>
        <p>
          Teksty, ilustracje i kod strony są własnością operatora serwisu. Możesz swobodnie
          przeglądać i udostępniać linki do serwisu — kopiowanie treści w całości w innych
          serwisach wymaga wcześniejszego kontaktu.
        </p>

        <h2>6. Odpowiedzialność</h2>
        <p>
          Serwis udostępniany jest w stanie „tak jak jest”. Nie gwarantujemy nieprzerwanej
          dostępności ani braku błędów w grywalnym demie — jeśli coś nie działa, prosimy o
          zgłoszenie przez stronę <a href="/kontakt">kontaktową</a>.
        </p>

        <h2>7. Zmiany regulaminu</h2>
        <p>
          Regulamin może być aktualizowany wraz z rozwojem serwisu. Data ostatniej zmiany zawsze
          widnieje na górze tej strony.
        </p>

        <h2>8. Postanowienia końcowe</h2>
        <p>
          W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa
          polskiego. Sądem właściwym do rozstrzygania sporów jest sąd właściwy dla siedziby
          operatora serwisu, o ile bezwzględnie obowiązujące przepisy nie stanowią inaczej —
          w szczególności przepisy chroniące konsumentów.
        </p>
      </div>
    </div>
  );
}
