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
    summary: "Żadnego automatu. Bieg zmieniasz sam, patrząc na wskazówkę obrotów.",
    detail:
      "Wskazówka jedzie w górę, a gdzieś na skali czeka wąska zielona kreska. Trafisz w nią i auto przyspiesza czysto. Klikniesz wcześniej — silnik traci obroty, trzeba łapać rozpęd od nowa. Spóźnisz się — grzejesz pasek napędu. Po kilku okrążeniach człowiek przestaje to liczyć w głowie i zaczyna po prostu czuć, kiedy nacisnąć.",
  },
  {
    slug: "pasek-napedu",
    title: "Pasek napędu, który się grzeje",
    summary:
      "Spóźnione zmiany podgrzewają gumowy pasek. Przegrzany pasek zatrzymuje auto na kilka sekund.",
    detail:
      "Wskaźnik rośnie powoli przy równej jeździe i skacze, kiedy się spieszysz. Po dojściu do końca skali auto samo zjeżdża na krótki postój — tak jak w prawdziwym garażu, gdzie nikt nie wozi zapasowego paska w bagażniku.",
  },
  {
    slug: "balast-startowy",
    title: "Balast dobierany przed startem",
    summary: "Decydujesz raz, jeszcze przed sygnałem: ile obciążenia dołożyć do nadwozia.",
    detail:
      "Lżejszy układ szybciej łapie prędkość, ale okno na zmianę biegu robi się węższe i mniej wybacza spóźnienia. Cięższy jest cierpliwszy dla nadgarstka, za to rozpędza się jak przez błoto. Który lepszy? Zależy od toru — inny pasuje do ciasnych zakrętów, inny do prostej pod górkę.",
  },
  {
    slug: "tor-z-tego-co-pod-reka",
    title: "Tor z tego, co akurat było pod ręką",
    summary: "Deski, doniczki, kawałek węża ogrodowego, cegły postawione na sztorc.",
    detail:
      "Rampa oparta o dwie cegły zachowuje się inaczej niż fabryczny najazd. Szykana z pogiętego węża wymaga innego wyczucia niż linia namalowana farbą. Każdy tor ma przez to swój, trochę nieprzewidywalny charakter — bliżej podwórka niż stadionu.",
  },
  {
    slug: "zeszyt-prob",
    title: "Zeszyt prób",
    summary: "Twoje czasy i ustawienia zapisują się lokalnie, w tej przeglądarce.",
    detail:
      "Porównujesz się z sobą sprzed pięciu minut, nie z anonimowym kontem gdzieś w sieci. Żadnej globalnej tabeli, żadnych cudzych wyników do prześcignięcia — i tak nie mielibyśmy jak sprawdzić, czy są prawdziwe.",
  },
] as const satisfies readonly Mechanic[];
