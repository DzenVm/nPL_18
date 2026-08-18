export interface Principle {
  title: string;
  detail: string;
}

export const principles = [
  {
    title: "Żadnych zakupów w trakcie gry",
    detail:
      "Balastu, paska napędu ani nowej klasy nadwozia nie da się kupić za prawdziwe pieniądze — bo nie ma czego kupować. Wszystko, co dostępne, dostępne jest od razu i dla każdego tak samo.",
  },
  {
    title: "Wynik zależy od wyczucia, nie od losowania",
    detail:
      "W demie nie ma skrzynek z nagrodami, losowych bonusów ani ukrytych mnożników. Szybszy czas bierze się z lepszego wyczucia momentu zmiany biegu, a nie z farta.",
  },
  {
    title: "Status budowy podany wprost",
    detail:
      "Przy każdym torze, trybie i klasie pojazdu piszemy uczciwie, czy to działa, czy dopiero powstaje. Nie publikujemy dat premiery, bo przy jednoosobowym tempie prac i tak byśmy ich nie dotrzymali.",
  },
  {
    title: "Zgoda na cookies nie blokuje dostępu do treści",
    detail:
      "Odmowa zgody na pliki analityczne czy reklamowe nie ogranicza dostępu do żadnej części serwisu — działa on identycznie, z pełną treścią, niezależnie od wyboru w bannerze.",
  },
  {
    title: "Bez silnika 3D na siłę",
    detail:
      "Cały ruch w demie renderujemy w SVG i na zwykłych elementach strony, bez zewnętrznego silnika gry. Prościej się to utrzymuje, a na słabszym telefonie po prostu szybciej się ładuje.",
  },
  {
    title: "Dostępność sprawdzana, nie doklejana później",
    detail:
      "Nawigacja klawiaturą, widoczny fokus i ustawienie „ogranicz animacje” w systemie działają od pierwszej wersji każdej podstrony — nie jako poprawka wprowadzona po skargach.",
  },
] as const satisfies readonly Principle[];
