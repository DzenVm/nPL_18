export interface Mechanic {
  slug: string;
  title: string;
  summary: string;
  detail: string;
}

export const mechanics = [
  {
    slug: "skrzynia-na-sluch",
    title: "Skrzynia biegów na wyczucie",
    summary:
      "Zmieniasz bieg dokładnie w momencie, gdy wskazówka wchodzi w wąskie okno na zegarze obrotów — nie wcześniej, nie później.",
    detail:
      "Zero automatyki. Wskazówka obrotów podjeżdża w górę, a Ty musisz złapać moment, w którym wchodzi w zieloną kreskę — spóźniona zmiana grzeje pasek napędu, zbyt wczesna gasi napęd i każe łapać rozpęd od nowa. Po paru okrążeniach zaczynasz to czuć w nadgarstku, nie liczyć w głowie.",
  },
  {
    slug: "pasek-napedu",
    title: "Pasek napędu, który się grzeje",
    summary:
      "Każda spóźniona zmiana biegu podgrzewa gumowy pasek — a przegrzany pasek oznacza przymusowy postój.",
    detail:
      "Wskaźnik paska rośnie powoli przy dobrej jeździe i skacze przy nerwowej. Kiedy dojdzie do końca skali, auto samo zjeżdża na pobocze na te kilka sekund, które psują cały okrążony rytm — dokładnie tak, jak w prawdziwym garażowym wyścigu, gdzie nikt nie wozi ze sobą zapasowego paska.",
  },
  {
    slug: "balast-startowy",
    title: "Balast, który dobierasz przed startem",
    summary:
      "Przed każdym wyścigiem wybierasz, ile obciążenia dołożyć do nadwozia — decyzja zapada raz, przed sygnałem startu.",
    detail:
      "Lekki układ szybciej łapie prędkość, ale okno zmiany biegu robi się węższe i mniej wybacza spóźnienia. Ciężki balast jest cierpliwszy dla nadgarstka, za to rozpędza się jak przez syrop. Nie ma tu jednej słusznej odpowiedzi — inny balast pasuje do toru z ciasnymi zakrętami, inny do prostej z podjazdem.",
  },
  {
    slug: "tor-z-tego-co-pod-reka",
    title: "Tor zbudowany z tego, co akurat było pod ręką",
    summary:
      "Żadnych asfaltowych obwodów — przeszkody to deski, doniczki, kawałek węża ogrodowego i cegły postawione na sztorc.",
    detail:
      "Rampa z dechy opartej o dwie cegły zachowuje się inaczej niż profesjonalny najazd, a szykana z pogiętego węża ogrodowego wymaga innego wyczucia niż wytyczona farbą krawędź. To sprawia, że każda trasa ma swój, trochę nieprzewidywalny charakter — bliżej podwórka niż stadionu.",
  },
  {
    slug: "zeszyt-prob",
    title: "Zeszyt prób zamiast tabeli wyników",
    summary:
      "Zapisujesz swoje czasy i ustawienia lokalnie, w przeglądarce — porównujesz się z sobą sprzed pięciu minut, nie z anonimowym rankingiem.",
    detail:
      "Po każdym przejeździe demo zapamiętuje Twój czas i wybrany balast wyłącznie w tej przeglądarce. Nie ma globalnej tabeli ani cudzych wyników do prześcignięcia — bo i tak nie umielibyśmy uczciwie zweryfikować, czy ktoś inny naprawdę je uzyskał.",
  },
] as const satisfies readonly Mechanic[];
