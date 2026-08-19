export interface FaqItem {
  question: string;
  answer: string;
}

export const faq = [
  {
    question: "Trzeba coś instalować, żeby zagrać?",
    answer:
      "Nie. Demo działa w przeglądarce — na komputerze, tablecie, telefonie. Konta nie zakładasz, nic nie pobierasz na dysk.",
  },
  {
    question: "Czy mój najlepszy czas zostanie, jeśli zmienię przeglądarkę albo telefon?",
    answer:
      "Nie zostanie. Zapis trzyma się konkretnej przeglądarki na konkretnym urządzeniu, to zwykła pamięć lokalna, nie konto w chmurze. Na innym sprzęcie zaczynasz od zera.",
  },
  {
    question: "Od ilu lat można w to grać?",
    answer:
      "Treść nie zawiera przemocy. Opisowo sugerujemy wiek od około 8 lat — to nasza własna rekomendacja, nie formalna klasyfikacja.",
  },
  {
    question: "Dlaczego nie widać rankingu graczy?",
    answer:
      "Bo nie mielibyśmy jak uczciwie zweryfikować pokazywanych liczb. Demo zapamiętuje Twój czas lokalnie — to prywatny zeszyt prób, nie tabela do porównywania się z nieznajomymi.",
  },
  {
    question: "Jakiego sprzętu potrzebuję?",
    answer:
      "W miarę aktualnej przeglądarki z obsługą JavaScript. Na komputerze sterujesz klawiaturą, na telefonie czy tablecie dotykiem. Konkretny system operacyjny nie ma znaczenia.",
  },
  {
    question: "Czy moje dane trafiają do reklamodawców?",
    answer:
      "Pliki analityczne i reklamowe uruchamiają się wyłącznie po Twojej zgodzie w bannerze cookies, a odmowa nie ogranicza dostępu do treści. Co dokładnie zbieramy, opisujemy w polityce prywatności.",
  },
  {
    question: "Czemu część torów i trybów jest oznaczona jako „w przygotowaniu”?",
    answer:
      "Bo to szczera informacja, nie forma na później. Serwis rozwija się stopniowo — wolimy napisać wprost, co już działa, niż obiecywać funkcje, których jeszcze nie ma.",
  },
  {
    question: "Znalazłem błąd albo mam pomysł na nowy tor — gdzie to zgłosić?",
    answer:
      "Przez stronę kontaktową. Jest tam adres e-mail i kilka wskazówek, co warto opisać, żeby zgłoszenie dało się szybko sprawdzić.",
  },
] as const satisfies readonly FaqItem[];
