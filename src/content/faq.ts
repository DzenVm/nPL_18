export interface FaqItem {
  question: string;
  answer: string;
}

export const faq = [
  {
    question: "Trzeba coś instalować, żeby zagrać?",
    answer:
      "Nie. Demo działa bezpośrednio w przeglądarce, na komputerze, tablecie czy telefonie. Nie zakładasz konta i niczego nie pobierasz na dysk.",
  },
  {
    question: "Czy gdzieś po drodze pojawi się prośba o płatność?",
    answer:
      "Nie ma takiej opcji technicznej — w serwisie nie ma bramki płatności, koszyka ani żadnego mechanizmu do wnoszenia opłat. Nic tu nie jest do kupienia, więc nikt nie zapyta Cię o kartę.",
  },
  {
    question: "Od ilu lat można w to grać?",
    answer:
      "Treść nie zawiera przemocy ani elementów przeznaczonych dla dorosłych, więc opisowo sugerujemy wiek od około 8 lat — to nasza własna, nieoficjalna rekomendacja, nie formalna klasyfikacja wiekowa.",
  },
  {
    question: "Dlaczego nie widać rankingu graczy ani ich wyników?",
    answer:
      "Bo nie mielibyśmy jak uczciwie zweryfikować, że pokazywane liczby są prawdziwe. Zamiast tego demo zapamiętuje Twój czas lokalnie, w tej przeglądarce — to Twój prywatny zeszyt prób, nie tabela do publicznego porównywania się z nieznajomymi.",
  },
  {
    question: "Jakiego sprzętu potrzebuję?",
    answer:
      "Wystarczy w miarę aktualna przeglądarka z obsługą JavaScript. Na komputerze sterujesz klawiaturą, na telefonie czy tablecie — dotykiem. Nie ma wymagań co do konkretnego systemu operacyjnego.",
  },
  {
    question: "Czy moje dane trafiają do reklamodawców?",
    answer:
      "Pliki analityczne i reklamowe uruchamiają się wyłącznie po Twojej wyraźnej zgodzie w bannerze cookies, a odmowa nie ogranicza dostępu do treści. Pełny opis tego, co i po co zbieramy, jest w polityce prywatności.",
  },
  {
    question: "Czemu część torów i trybów jest oznaczona jako „w przygotowaniu”?",
    answer:
      "Bo to szczera informacja, a nie forma na później. Serwis rozwija się stopniowo, więc wolimy jasno napisać, co już działa, zamiast obiecywać funkcje, których jeszcze nie ma.",
  },
  {
    question: "Znalazłem błąd albo mam pomysł na nowy tor — gdzie to zgłosić?",
    answer:
      "Najprościej przez stronę kontaktową — jest tam adres e-mail i kilka wskazówek, co warto opisać, żeby zgłoszenie dało się szybko sprawdzić.",
  },
] as const satisfies readonly FaqItem[];
