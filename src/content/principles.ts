export interface Principle {
  title: string;
  detail: string;
}

export const principles = [
  {
    title: "Nic nie jest sztucznie zablokowane",
    detail:
      "Balast, klasa nadwozia i dostępny tor są widoczne od pierwszej wizyty — nie trzeba niczego odblokowywać ani czekać. Czego nie ma, tego po prostu jeszcze nie zbudowaliśmy.",
  },
  {
    title: "Status budowy bez owijania w bawełnę",
    detail:
      "Przy każdym torze, trybie i klasie pojazdu piszemy wprost, czy to już działa, czy dopiero powstaje. Dat premiery nie podajemy — przy tempie pracy jednej osoby i tak byśmy ich nie dotrzymali.",
  },
  {
    title: "Każdy przycisk robi to, co obiecuje",
    detail:
      "Elementy oznaczone jako „w przygotowaniu” albo „w planach” nie prowadzą donikąd — po prostu jeszcze ich nie pokazujemy. Zero martwych linków i animacji udających funkcję, której nie ma.",
  },
  {
    title: "Odmowa w bannerze cookies nic nie zmienia",
    detail:
      "Kliknij „tylko niezbędne”, a strona i tak pokaże Ci całą treść. Zgoda na pliki analityczne czy reklamowe to osobna sprawa, która na dostęp nie wpływa.",
  },
  {
    title: "Bez silnika gry na siłę",
    detail:
      "Ruch w demie to zwykłe elementy strony i SVG animowane w przeglądarce, bez zewnętrznego silnika w tle. Prościej to utrzymać, a na starszym telefonie szybciej się ładuje.",
  },
  {
    title: "Dostępność od pierwszej wersji, nie po skardze",
    detail:
      "Klawiatura, widoczny fokus i systemowe „ogranicz animacje” działają na każdej podstronie od początku. Nikt nas o to nie prosił — po prostu tak miało być od razu.",
  },
] as const satisfies readonly Principle[];
