import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Przeglądarkowa gra wyścigowa — " + site.domain,
    short_name: site.domain,
    description:
      "Przeglądarkowa gra wyścigowa: ręczna skrzynia biegów na wyczucie i tory zbudowane z domowych przedmiotów.",
    start_url: "/",
    display: "standalone",
    background_color: "#171310",
    theme_color: "#171310",
    lang: "pl-PL",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
