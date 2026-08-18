import type { ProductionStatus } from "./types";

export interface Track {
  slug: string;
  index: number;
  title: string;
  place: string;
  feature: string;
  detail: string;
  status: ProductionStatus;
}

export const tracks = [
  {
    slug: "podjazd-przy-garazu",
    index: 1,
    title: "Podjazd przy garażu",
    place: "Betonowa płyta między bramą a ulicą, trasa narysowana kredą",
    feature: "Plama oleju po starym aucie, którą trzeba omijać jako naturalną szykanę",
    detail:
      "Pierwszy tor, jaki w ogóle powstał — bo był najbliżej. Kredowe linie co tydzień trzeba odświeżać po deszczu, a plama oleju na środku prostej z czasem stała się stałym elementem trasy, a nie usterką do zamalowania. Dostępny już jako grywalne demo.",
    status: "demo",
  },
  {
    slug: "zimowy-tor-w-piwnicy",
    index: 2,
    title: "Zimowy tor w piwnicy",
    place: "Korytarz piwniczny między schowkami lokatorów",
    feature: "Niska rura pod sufitem, przez którą przejeżdżają tylko niższe nadwozia",
    detail:
      "Powstał, bo w styczniu na podjeździe robi się ślisko, a wyścigi nie znoszą przerwy zimowej. Wąski korytarz wymusza jazdę praktycznie po jednym torze jazdy — wyprzedzanie jest tu w zasadzie teoretyczne. Warstwa dźwiękowa: echo silniczka odbite od betonu.",
    status: "w-przygotowaniu",
  },
  {
    slug: "sciezka-przy-grzadkach",
    index: 3,
    title: "Ścieżka wzdłuż grządek",
    place: "Wąska ścieżka między rzędami warzyw a płotem sąsiada",
    feature: "Szykana z pogiętego węża do podlewania, ułożonego w literę S",
    detail:
      "Tor sezonowy — dostępny od maja do września, póki grządki zajmują swoje miejsce. Wąż ogrodowy zmienia ułożenie niemal codziennie, więc szykana nigdy nie wygląda identycznie dwa dni z rzędu.",
    status: "w-planach",
  },
  {
    slug: "hala-starego-warsztatu",
    index: 4,
    title: "Hala starego warsztatu",
    place: "Wypożyczona na niedzielne popołudnie hala po nieczynnym warsztacie samochodowym",
    feature: "Nogi warsztatowego stołu jako brama zwężająca tor do jednego auta szerokości",
    detail:
      "Największa dostępna przestrzeń w całym zestawieniu, ale też jedyna, z której trzeba korzystać punktowo — hala nie jest nasza na stałe. Zapach starego oleju silnikowego wisi w powietrzu, nawet gdy same auta w środku są od dawna miniaturowe.",
    status: "w-planach",
  },
  {
    slug: "strych-nad-garazem",
    index: 5,
    title: "Strych nad garażem",
    place: "Niskie poddasze, do którego prowadzi drabina",
    feature: "Skos dachu ograniczający wysokość nadwozia — nie każda konstrukcja się tam zmieści",
    detail:
      "Tor, który sam w sobie jest testem na to, czy Twój pojazd w ogóle nadaje się do rywalizacji w ciasnych warunkach. Zamiast szybkości liczy się tu przede wszystkim niska sylwetka i cierpliwość na zakrętach pod skosem.",
    status: "w-planach",
  },
  {
    slug: "boisko-osiedlowe-wieczorem",
    index: 6,
    title: "Boisko osiedlowe wieczorem",
    place: "Betonowe boisko do gry w klasy i piłkę ręczną, po zmroku, pod jedną latarnią",
    feature: "Linie boiska do gry w klasy przejęte jako oznaczenie toru zamiast rysowania od zera",
    detail:
      "Jedyny tor, na którym światła jest mniej niż cienia — latarnia rzuca ostry krąg blasku na środek płyty, a reszta trasy tonie w półmroku. Trzeba jeździć trochę na pamięć, nie tylko na wzrok.",
    status: "w-planach",
  },
] as const satisfies readonly Track[];
