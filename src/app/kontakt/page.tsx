import type { Metadata } from "next";
import styles from "@/components/LegalLayout.module.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Jak skontaktować się w sprawie serwisu " + site.domain + " — zgłoszenia błędów, pytania, sprawy prywatności.",
};

export default function KontaktPage() {
  return (
    <div className={styles.wrap}>
      <span className={styles.kicker}>Kontakt</span>
      <h1 className={styles.h1}>Napisz, jeśli coś nie zagrało</h1>
      <p className={styles.updated}>Odpowiadamy zwykle w ciągu kilku dni roboczych — to projekt prowadzony przez jedną osobę.</p>

      <div className={styles.prose}>
        <p>
          Serwis jest w trakcie rozwoju, więc każda wiadomość realnie coś zmienia: literówka w
          opisie toru, błąd w demie, pytanie o to, kiedy ruszy kolejny tryb. Nie obiecujemy
          gotowych odpowiedzi na wszystko, ale czytamy każdą wiadomość.
        </p>

        <h2>Adres e-mail</h2>
        <p>
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>

        <h2>Co warto napisać w zgłoszeniu</h2>
        <ul>
          <li>Na jakim urządzeniu i w jakiej przeglądarce coś nie zadziałało.</li>
          <li>Czy problem dotyczył demo na stronie „Zagraj”, czy raczej samej treści strony.</li>
          <li>Jeśli to możliwe — jaki balast był wybrany w momencie błędu.</li>
        </ul>

        <h2>Sprawy dotyczące danych osobowych</h2>
        <p>
          Pytania związane z przetwarzaniem danych i plikami cookie prosimy kierować na ten sam
          adres, z dopiskiem „prywatność” w temacie. Pełny opis znajdziesz w{" "}
          <a href="/polityka-prywatnosci">polityce prywatności</a>.
        </p>

        <h2>Czego raczej nie znajdziesz w odpowiedzi</h2>
        <p>
          Nie podajemy dat premiery kolejnych trybów ani torów — po prostu ich jeszcze nie znamy.
          Wolimy to napisać wprost, niż obiecać coś, czego nie dotrzymamy.
        </p>
      </div>
    </div>
  );
}
