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
      "Pierwszy tor, jaki w ogóle powstał, bo był najbliżej. Kredowe linie trzeba co tydzień odświeżać po deszczu. Plama oleju na środku prostej z czasem stała się stałym elementem trasy, nie usterką do zamalowania. Dostępny już jako grywalne demo.",
    status: "demo",
  },
  {
    slug: "zimowy-tor-w-piwnicy",
    index: 2,
    title: "Zimowy tor w piwnicy",
    place: "Korytarz piwniczny między schowkami lokatorów",
    feature: "Niska rura pod sufitem, przez którą przejeżdżają tylko niższe nadwozia",
    detail:
      "Powstał, bo w styczniu na podjeździe robi się ślisko. Wąski korytarz wymusza jazdę praktycznie po jednym torze — wyprzedzanie jest tu w zasadzie teoretyczne. Do tego echo silniczka odbite od betonu, którego nie usłyszysz nigdzie indziej w tym zestawieniu.",
    status: "w-przygotowaniu",
  },
  {
    slug: "sciezka-przy-grzadkach",
    index: 3,
    title: "Ścieżka wzdłuż grządek",
    place: "Wąska ścieżka między rzędami warzyw a płotem sąsiada",
    feature: "Szykana z pogiętego węża do podlewania, ułożonego w literę S",
    detail:
      "Sezonowy — dostępny mniej więcej od maja do września, póki grządki zajmują swoje miejsce. Wąż zmienia ułożenie niemal codziennie, więc szykana rzadko wygląda tak samo dwa dni z rzędu.",
    status: "w-planach",
  },
  {
    slug: "hala-starego-warsztatu",
    index: 4,
    title: "Hala starego warsztatu",
    place: "Wypożyczona na niedzielne popołudnie hala po nieczynnym warsztacie samochodowym",
    feature: "Nogi warsztatowego stołu jako brama zwężająca tor do jednego auta szerokości",
    detail:
      "Największa przestrzeń w całym zestawieniu, ale jedyna, z której korzysta się punktowo, bo hala nie jest nasza na stałe. W powietrzu wciąż wisi zapach starego oleju silnikowego, nawet gdy same auta w środku są od dawna miniaturowe.",
    status: "w-planach",
  },
  {
    slug: "strych-nad-garazem",
    index: 5,
    title: "Strych nad garażem",
    place: "Niskie poddasze, do którego prowadzi drabina",
    feature: "Skos dachu ograniczający wysokość nadwozia — nie każda konstrukcja się tam zmieści",
    detail:
      "Ten tor sam w sobie jest testem: sprawdza, czy pojazd w ogóle nadaje się do jazdy w ciasnych warunkach. Liczy się niska sylwetka i cierpliwość pod skosem, nie prędkość.",
    status: "w-planach",
  },
  {
    slug: "boisko-osiedlowe-wieczorem",
    index: 6,
    title: "Boisko osiedlowe wieczorem",
    place: "Betonowe boisko do gry w klasy i piłkę ręczną, po zmroku, pod jedną latarnią",
    feature: "Linie boiska przejęte jako oznaczenie toru zamiast rysowania od zera",
    detail:
      "Jedyny tor, na którym cienia jest więcej niż światła. Latarnia rzuca ostry krąg blasku na środek płyty, reszta trasy tonie w półmroku — trzeba jeździć trochę z pamięci, nie tylko na wzrok.",
    status: "w-planach",
  },
] as const satisfies readonly Track[];
