import type { Metadata } from "next";
import styles from "@/components/LegalLayout.module.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Jakie dane przetwarza serwis " + site.domain + ", na jakiej podstawie i jakie masz prawa.",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <div className={styles.wrap}>
      <span className={styles.kicker}>Polityka prywatności</span>
      <h1 className={styles.h1}>Polityka prywatności</h1>
      <p className={styles.updated}>Ostatnia aktualizacja: 18 sierpnia 2026</p>

      <div className={styles.prose}>
        <p>
          Ten dokument opisuje, jakie dane przetwarzamy w związku z korzystaniem z serwisu{" "}
          {site.domain}, w jakim celu i na jakiej podstawie prawnej — zgodnie z RODO
          (Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679).
        </p>

        <h2>1. Kto odpowiada za dane</h2>
        <p>
          Administratorem danych przetwarzanych w związku z działaniem serwisu jest osoba
          prowadząca ten projekt. We wszystkich sprawach dotyczących danych osobowych można
          napisać na adres <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>

        <h2>2. Jakie dane przetwarzamy</h2>
        <ul>
          <li>
            <strong>Dane techniczne serwera</strong> — adres IP, znacznik czasu żądania i typ
            przeglądarki, zapisywane krótkoterminowo przez dostawcę hostingu wyłącznie w celach
            bezpieczeństwa i diagnostyki awarii.
          </li>
          <li>
            <strong>Dane w pamięci przeglądarki (localStorage)</strong> — Twój wybór w bannerze
            cookies, a po zagraniu w demo także najlepszy osiągnięty czas dla każdego balastu.
            Te dane nigdy nie są wysyłane na nasz serwer — zostają wyłącznie w Twojej
            przeglądarce, na Twoim urządzeniu.
          </li>
          <li>
            <strong>Dane analityczne i reklamowe</strong> — wyłącznie po wyrażeniu zgody w
            bannerze cookies. Szczegóły w{" "}
            <a href="/cookies">polityce plików cookie</a>.
          </li>
          <li>
            <strong>Treść wiadomości e-mail</strong> — jeśli napiszesz do nas, przetwarzamy adres
            nadawcy i treść wiadomości wyłącznie w celu udzielenia odpowiedzi.
          </li>
        </ul>

        <h2>3. Podstawy prawne przetwarzania</h2>
        <ul>
          <li>Art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes: zapewnienie bezpieczeństwa i poprawnego działania serwisu.</li>
          <li>Art. 6 ust. 1 lit. a RODO — zgoda: pliki analityczne i reklamowe, w tym związane z Google Ads.</li>
          <li>Art. 6 ust. 1 lit. b RODO — w zakresie niezbędnym do udzielenia odpowiedzi na wiadomość, którą sam wyślesz.</li>
        </ul>

        <h2>4. Komu przekazujemy dane</h2>
        <p>
          Dane techniczne trafiają do dostawcy infrastruktury hostingowej, który obsługuje
          serwis. Jeśli zaakceptujesz pliki analityczne lub reklamowe, część danych mogą
          przetwarzać także dostawcy tych usług — w tym Google, zgodnie z{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            polityką prywatności Google
          </a>
          . Nie sprzedajemy danych osobowych i nie udostępniamy ich w celach innych niż opisane
          w tym dokumencie.
        </p>

        <h2>5. Jak długo przechowujemy dane</h2>
        <ul>
          <li>Wybór w bannerze cookies — do czasu jego zmiany lub wyczyszczenia danych przeglądarki, standardowo nie dłużej niż 12 miesięcy.</li>
          <li>Zapisane czasy z demo — do momentu ręcznego wyczyszczenia danych strony w przeglądarce. Nie mamy do nich dostępu i nie możemy ich usunąć zdalnie.</li>
          <li>Logi serwera — maksymalnie kilka tygodni, w zakresie ustawionym przez dostawcę hostingu.</li>
          <li>Korespondencja e-mail — do czasu zakończenia sprawy, nie dłużej niż to konieczne.</li>
        </ul>

        <h2>6. Twoje prawa</h2>
        <p>Zgodnie z RODO przysługuje Ci prawo do:</p>
        <ul>
          <li>dostępu do swoich danych i uzyskania ich kopii,</li>
          <li>sprostowania danych,</li>
          <li>usunięcia danych,</li>
          <li>ograniczenia przetwarzania,</li>
          <li>wniesienia sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie,</li>
          <li>przenoszenia danych,</li>
          <li>cofnięcia zgody w dowolnym momencie, bez wpływu na zgodność z prawem wcześniejszego przetwarzania,</li>
          <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
        </ul>

        <h2>7. Bezpieczeństwo</h2>
        <p>
          Serwis działa wyłącznie po protokole HTTPS. Zbieramy tylko te dane, które są
          rzeczywiście potrzebne do działania strony i demo — bez formularzy rejestracyjnych,
          bez kont użytkowników i bez baz danych graczy.
        </p>

        <h2>8. Zmiany polityki</h2>
        <p>
          Jeśli zakres przetwarzanych danych się zmieni — na przykład wraz z dodaniem nowego
          trybu gry — zaktualizujemy tę stronę i datę na jej górze.
        </p>
      </div>
    </div>
  );
}
