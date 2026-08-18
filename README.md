# nometuwe.best

Polskojęzyczny serwis SSR na Next.js 16 (App Router) poświęcony przeglądarkowej
grze wyścigowej o modelach budowanych własnoręcznie i torach układanych z
domowych przedmiotów — desek, kredy, cegieł i węża ogrodowego. Strona główna
jest maksymalnie nasycona treścią (mechaniki, tryby, tory, warsztat, galeria,
FAQ), a `/wyscig` zawiera realnie grywalne demo jednej z mechanik — ręcznej
skrzyni biegów na wyczucie.

## Stos technologiczny i czym się wyróżnia

- **Next.js 16** (App Router) + React 19 + TypeScript, z włączonym
  **Cache Components** (`cacheComponents: true`) — nowoczesny model
  cache'owania Next 16, a nie starsze `force-dynamic`/ISR `revalidate`.
  Strona główna jest w większości statycznym shellem HTML, a tylko widżet
  „Wyzwanie dnia" jest prawdziwą dziurą dynamiczną (`connection()` +
  `<Suspense>`), liczoną z bieżącej daty serwera w strefie `Europe/Warsaw`.
- **Bez Tailwind i bez UI-kitów** — własny system tokenów w `globals.css`
  (CSS Modules per komponent), z rejestrowanymi przez `@property`
  animowanymi custom properties (`--needle-pos`, `--meter-fill`) używanymi
  m.in. do płynnego przejścia koloru paska napędu przez `color-mix()`, oraz
  z `@container` do responsywności niezależnej od szerokości viewportu.
- **Natywny View Transitions API** przez komponent `<ViewTransition>` z
  React (nie przez żadną bibliotekę) — nagłówek jest zakotwiczony
  (`viewTransitionName`), a treść strony miękko się przenika między
  podstronami.
- **Grywalne demo bez silnika gry i bez canvas** — cały gauge obrotów i tor
  postępu to zwykłe elementy DOM/SVG animowane przez `requestAnimationFrame`
  i CSS custom properties, nie piksele na `<canvas>`.
- **6 rastrowych obrazów PNG wygenerowanych proceduralnie** — `scripts/generate-images.mjs`
  buduje sceny z kodu (seedowany PRNG, SVG) i renderuje je do PNG przez
  headless Chromium (Playwright), zamiast używać zdjęć stockowych czy
  gotowych SVG rysowanych ręcznie.
- Fawikona to osobny, abstrakcyjny znak (zegar obrotów z igłą) —
  wygenerowany na potrzeby tego projektu, nieużywany nigdzie indziej w
  serwisie jako logo.
- Zero brandingu: gra nie ma nazwy własnej ani logotypu — w nagłówku widnieje
  wyłącznie sama domena, tekstowo.

## Komendy

```bash
npm install
npm run dev         # lokalny serwer deweloperski, http://localhost:3000
npm run build        # produkcyjny build
npm run start         # uruchomienie builda lokalnie
npm run lint           # ESLint (flat config, eslint-config-next)
npm run gen:images      # regeneracja 6 obrazów w public/images
```

Wymagania: Node.js ≥ 20.9.

## Struktura

```
src/app/              # trasy App Router (/, /wyscig, /warsztat, strony prawne, sitemap/robots/manifest/OG)
src/components/        # nagłówek, stopka, cookie banner, GoogleTag, TodayChallenge
src/components/game/    # RaceDemo — interaktywne demo skrzyni biegów
src/content/             # typizowana treść (mechaniki, tryby, tory, warsztat, FAQ, zasady, galeria)
src/lib/                  # seedowany generator „wyzwania dnia"
public/images/             # 6 proceduralnie wygenerowanych obrazów PNG
scripts/generate-images.mjs # generator obrazów (Playwright + SVG)
```

## Deploy na Vercel

1. Zaimportuj to repozytorium/gałąź jako nowy projekt na
   [vercel.com](https://vercel.com) — framework Next.js wykryje się
   automatycznie (`vercel.json` ustawia jedynie region `fra1`, najbliższy
   Polsce).
2. Zmienne środowiskowe nie są wymagane do działania serwisu. Opcjonalnie:
   `NEXT_PUBLIC_GOOGLE_ADS_ID` — jeśli ustawiona, znacznik Google zostanie
   załadowany, ale i tak wyłącznie po zgodzie użytkownika na cookies
   reklamowe (patrz `src/components/GoogleTag.tsx`).
3. Po pierwszym deployu: **Project → Settings → Domains → Add** → wpisz
   `nometuwe.best` (opcjonalnie też `www.nometuwe.best`).
4. U rejestratora domeny ustaw rekordy DNS wskazane przez Vercel podczas
   dodawania domeny (zwykle `A @ 76.76.21.21` dla apeksu i/lub
   `CNAME www cname.vercel-dns.com`) — warto kierować się dokładnie tym, co
   pokaże panel Vercel w danym momencie.
5. Certyfikat SSL wystawia się automatycznie po potwierdzeniu DNS, zwykle w
   ciągu kilku minut.

## Google Ads / RODO — co już uwzględniono

- Banner zgody na cookies (niezbędne / analityczne / reklamowe) z realnym
  zapisem wyboru w `localStorage`, bez dark patterns i bez blokowania
  treści przy odmowie.
- `/polityka-prywatnosci`, `/regulamin`, `/cookies`, `/kontakt` — treściwe
  strony napisane pod ten konkretny serwis, nie szablonowe zaślepki.
- Znacznik Google (`GoogleTag.tsx`) ładuje się wyłącznie po zgodzie i
  wyłącznie gdy skonfigurowany jest `NEXT_PUBLIC_GOOGLE_ADS_ID`.
- Uczciwe oznaczenie statusu każdego trybu, toru i klasy pojazdu
  (demo / w przygotowaniu / w planach) — bez fałszywych dat premiery,
  fałszywych recenzji czy nieistniejących linków do sklepów z aplikacjami.
- `/wyscig` to realne, działające demo — nie zrzut ekranu i nie martwy
  przycisk „Pobierz".
