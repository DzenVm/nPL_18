function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickForToday<T>(items: readonly T[], date: Date, salt: string): T {
  const dateKey = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(date);
  const random = mulberry32(hashString(dateKey + salt));
  const index = Math.floor(random() * items.length);
  return items[index] ?? items[0]!;
}

export function todayWarsawLabel(date: Date): string {
  return new Intl.DateTimeFormat("pl-PL", {
    timeZone: "Europe/Warsaw",
    dateStyle: "full",
  }).format(date);
}

const ballastOptions = ["Lekki", "Średni", "Ciężki"] as const;

const conditionNotes = [
  "Trawnik jeszcze wilgotny po porannym podlewaniu — zakręt przy grządkach będzie dziś śliski.",
  "Ktoś przestawił doniczkę na zakręcie, więc zmieniła się najszybsza linia przejazdu.",
  "Wiatr znosi dziś lżejsze nadwozia na prostej wzdłuż płotu — warto o tym pamiętać przy starcie.",
  "Koszenie trawnika u sąsiada skończyło się dopiero po południu, więc start jest przesunięty na wieczór.",
  "Świeża warstwa kredy na starcie — linia startowa jest dziś wyjątkowo wyraźna.",
  "Chłodny poranek: pasek napędu rozgrzewa się trochę wolniej niż zwykle.",
  "Sucho i ciepło — nawierzchnia podjazdu ma dziś najlepszą przyczepność w tym tygodniu.",
  "Krótka przerwa w ruchu przy podjeździe wydłużyła dziś okno na spokojny start.",
] as const;

export interface DailyChallenge {
  dateLabel: string;
  ballast: (typeof ballastOptions)[number];
  note: string;
}

export function getDailyChallenge(date: Date): DailyChallenge {
  return {
    dateLabel: todayWarsawLabel(date),
    ballast: pickForToday(ballastOptions, date, "ballast"),
    note: pickForToday(conditionNotes, date, "note"),
  };
}
