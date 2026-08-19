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
    summary: "Bez presji czasu i bez przeciwników. Uczysz się okna zmiany biegu we własnym tempie.",
    detail:
      "To ten tryb działa już teraz jako grywalne demo — trzy okrążenia, jeden tor, wybór balastu przed startem. Twój czas zapisuje się lokalnie w przeglądarce. Dobry punkt startowy, zanim spróbujesz czegoś bardziej wymagającego.",
    status: "demo",
  },
  {
    slug: "wyzwanie-dnia",
    title: "Wyzwanie dnia",
    summary: "Codziennie inny zestaw startowy, liczony po stronie serwera z bieżącej daty.",
    detail:
      "Balast, tor i drobny szczegół dnia zmieniają się raz na dobę, więc każdy w Polsce widzi tego samego dnia identyczny układ. Sama rozgrywka w tym trybie jest jeszcze w przygotowaniu — na stronie głównej widać już jednak, jak wygląda dzisiejszy zestaw.",
    status: "w-przygotowaniu",
  },
  {
    slug: "sprint-sasiedzki",
    title: "Sprint sąsiedzki",
    summary: "Jedno okrążenie. Krótki tor. Zero marginesu na pomyłkę.",
    detail:
      "Zamiast trzech okrążeń jest jedno, a zakręty następują szybciej po sobie. Okno na zmianę biegu domyślnie węższe niż w treningu. Format pomyślany pod krótką przerwę, nie pod cały wieczór przed ekranem.",
    status: "w-planach",
  },
  {
    slug: "maraton-podworkowy",
    title: "Maraton podwórkowy",
    summary: "Kilka połączonych torów pod rząd, gdzie zarządzanie paskiem napędu liczy się bardziej niż jeden dobrze złapany moment.",
    detail:
      "Planujemy, żeby pasek napędu grzał się i chłodził wolniej niż w treningu, za to każda pomyłka kumulowała się na dłuższym dystansie. Nie decyduje tu jeden odruch, tylko wytrzymałość ustawień na cały przejazd.",
    status: "w-planach",
  },
] as const satisfies readonly GameMode[];
