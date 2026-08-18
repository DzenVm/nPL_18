import type { ProductionStatus } from "./types";

export interface GameMode {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  status: ProductionStatus;
}

export const modes = [
  {
    slug: "trening-swobodny",
    title: "Trening swobodny",
    summary:
      "Bez presji czasu i bez przeciwników — uczysz się okna zmiany biegu we własnym tempie, ile razy chcesz.",
    detail:
      "To właśnie ten tryb działa już teraz jako grywalne demo. Trzy okrążenia, jeden tor, wybór balastu przed startem i zapis Twojego czasu lokalnie w przeglądarce. Dobry punkt startowy, zanim spróbujesz czegoś bardziej wymagającego.",
    status: "demo",
  },
  {
    slug: "wyzwanie-dnia",
    title: "Wyzwanie dnia",
    summary:
      "Codziennie inny zestaw startowy — balast, tor i ustawienie paska napędu dobierane raz na dobę przez serwer.",
    detail:
      "Parametry wyzwania liczone są po stronie serwera z bieżącej daty, więc każdy w Polsce dostaje tego samego dnia identyczny układ startowy. Sama rozgrywka w tym trybie jest jeszcze w przygotowaniu — na stronie głównej widać już jednak, jak wygląda dzisiejszy zestaw.",
    status: "w-przygotowaniu",
  },
  {
    slug: "sprint-sasiedzki",
    title: "Sprint sąsiedzki",
    summary:
      "Jedno okrążenie, krótki tor, brak marginesu na pomyłkę — wersja dla tych, którzy wolą krócej i intensywniej.",
    detail:
      "Zamiast trzech okrążeń jest jedno, za to zakręty następują szybciej po sobie, a okno zmiany biegu domyślnie węższe. Format pomyślany pod krótką przerwę, a nie pod cały wieczór przed ekranem.",
    status: "w-planach",
  },
  {
    slug: "maraton-podworkowy",
    title: "Maraton podwórkowy",
    summary:
      "Dłuższy przejazd na kilku połączonych torach pod rząd, gdzie zarządzanie paskiem napędu liczy się bardziej niż pojedynczy odruch.",
    detail:
      "Tu decyduje wytrzymałość ustawień, nie jeden dobrze złapany moment. Planujemy, żeby pasek napędu grzał się i chłodził wolniej niż w treningu, za to każda pomyłka kumulowała się na dłuższym dystansie.",
    status: "w-planach",
  },
] as const satisfies readonly GameMode[];
