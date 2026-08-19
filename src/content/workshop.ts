export interface VehicleClass {
  slug: string;
  title: string;
  summary: string;
  advantage: string;
  drawback: string;
  detail: string;
}

export const vehicleClasses = [
  {
    slug: "rama-z-klockow",
    title: "Rama z klocków konstrukcyjnych",
    summary: "Zbudowana z gotowych, spinanych ze sobą elementów — bez kleju, bez lutownicy.",
    advantage: "Naprawa w dwie minuty: wystarczy wymienić pękniętą belkę na identyczną.",
    drawback: "Przy mocniejszym uderzeniu w rampę rama potrafi się rozpiąć w najsłabszym złączu.",
    detail:
      "Najczęstszy pierwszy wybór, bo brakującą część łatwo znaleźć osobno, a błąd konstrukcyjny naprawia się bez narzędzi. Elastyczność złączy trochę tłumi drgania na nierównościach. Ta sama elastyczność oznacza jednak, że rama pracuje pod obciążeniem inaczej niż sztywna konstrukcja — trzeba to uwzględnić przy doborze balastu.",
  },
  {
    slug: "podwozie-ze-sklejki",
    title: "Podwozie wycięte ze sklejki",
    summary: "Płaski kształt wycięty ręcznie piłką włośnicową albo, jeśli ktoś ma dostęp, frezarką.",
    advantage: "Sztywność, jakiej nie da żadna rama klockowa. Zero luzu przy twardym hamowaniu.",
    drawback: "Cięższe od pozostałych klas, więc rozpęd łapie wyraźnie wolniej.",
    detail:
      "Ulubiona klasa tych, którzy wolą jeden solidny wieczór z papierem ściernym niż cotygodniowe naprawy. Warstwy sklejki trzeba dobrze zabezpieczyć przed wilgocią — tor przy grządkach bywa dla tej klasy szczególnie niełaskawy po deszczu.",
  },
  {
    slug: "karoseria-drukowana",
    title: "Karoseria z drukarki 3D",
    summary: "Nadwozie zaprojektowane w prostym programie do modelowania i wydrukowane warstwa po warstwie.",
    advantage: "Dowolny kształt, jaki tylko wymyślisz, łącznie z takim, którego nie znajdziesz nigdzie gotowego.",
    drawback: "Przy niskiej temperaturze warstwy robią się kruche i pękają na krawędziach.",
    detail:
      "Jedyna klasa, w której kształt nadwozia realnie zmienia opór powietrza na dłuższej prostej, choć w skali garażowych prędkości różnica jest subtelna, nie decydująca. Zimą tor w piwnicy bywa dla niej ryzykowny, dopóki wydruk porządnie się nie zaaklimatyzuje.",
  },
  {
    slug: "rama-druciana",
    title: "Rama z giętego drutu",
    summary: "Zgięta ręcznie z aluminiowego drutu albo starych wieszaków — bez żadnego gotowego zestawu.",
    advantage: "Najlżejsza konstrukcja w zestawieniu. Najszybszy rozpęd na starcie.",
    drawback: "Balans trzeba wyważyć ręcznie i dokładnie — źle rozłożony ciężar kładzie auto na pierwszym ostrym zakręcie.",
    detail:
      "Klasa dla cierpliwych. Każdy egzemplarz jest odrobinę inny, bo drut nigdy nie zegnie się dwa razy identycznie. W zamian za tę nieprzewidywalność dostaje się auto, które reaguje najszybciej ze wszystkich, zanim jeszcze pierwszy bieg zdąży się przegrzać.",
  },
  {
    slug: "przerobiona-zabawka",
    title: "Przerobiona stara zabawka",
    summary: "Gotowa skorupa znaleziona na strychu, z podmienionym napędem od środka.",
    advantage: "Rozkład masy, jakiego nie zaplanujesz na papierze — czasem wychodzi zaskakująco stabilny.",
    drawback: "Nigdy nie wiadomo do końca, co znajdzie się w środku, dopóki nie zdejmie się starej obudowy.",
    detail:
      "Najbardziej sentymentalna klasa i jednocześnie najmniej przewidywalna. Dwie z pozoru identyczne zabawki z tej samej epoki potrafią zachowywać się zupełnie inaczej po przebudowie. Część osób właśnie to lubi najbardziej.",
  },
] as const satisfies readonly VehicleClass[];
