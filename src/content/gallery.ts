export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export const heroImage: GalleryImage = {
  src: "/images/podjazd-o-zmierzchu.png",
  alt: "Podjazd przy garażu o zmierzchu, z kredowymi liniami toru na betonie",
  caption: "Podjazd przy garażu — tor numer jeden, dostępny jako demo",
};

export const gallery = [
  {
    src: "/images/stol-warsztatowy.png",
    alt: "Stół warsztatowy z narzędziami, taśmą i częściami zapasowego nadwozia",
    caption: "Warsztat — tu powstają i psują się wszystkie klasy pojazdów",
  },
  {
    src: "/images/rampa-z-desek.png",
    alt: "Rampa najazdowa zbudowana z deski opartej o dwie cegły",
    caption: "Rampa z deski i cegieł — najpopularniejsza domowa przeszkoda",
  },
  {
    src: "/images/tor-kredowy.png",
    alt: "Linie toru narysowane białą kredą na betonowej płycie podwórka",
    caption: "Kredowe linie toru, odświeżane po każdym większym deszczu",
  },
  {
    src: "/images/szykana-z-weza.png",
    alt: "Szykana ułożona z pogiętego węża ogrodowego w kształt litery S",
    caption: "Szykana z węża ogrodowego na sezonowym torze przy grządkach",
  },
  {
    src: "/images/finisz-wieczorem.png",
    alt: "Linia mety pod snopem światła z pojedynczej latarni po zmroku",
    caption: "Finisz po zmroku — jedyne źródło światła to latarnia nad boiskiem",
  },
] as const satisfies readonly GalleryImage[];
