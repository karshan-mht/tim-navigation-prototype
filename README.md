# TIM — Global Navigation Prototype

A plain HTML/CSS/JS prototype of the **This Is Menopause** global navigation
(top nav, slide-out panel, account dropdown) and the **Splash Landing** — the
Visitor/Subscriber home built from content modules — across four auth states.
No framework, no build step — just open a file in a browser.

Design sources: Figma **Global Navigation** file `42yas7Q9FfwhL6xUocjEAl`, the
**Mobile_Splash_Landing** frame in `EWsXKakhyFLhkse035AoHX` (node `4101:3`), and
type from the **MHT Style Guide** (`zV2gbuNONeoyeRVcFUFWeZ`, node `3941:17`).

The Splash Landing has six sections — **Checker** (hero + symptom-checker card),
**Listicles**, **Articles**, **Experts**, **Factoid**, **Community** — whose CTAs
deep-link to in-prototype pages (Symptom Checker, Listicle Detail, Article Show →
Collection → All Articles, Advisors, Community Overview, Sign Up Start).

## Quick start

Open the launcher and pick a flow:

```bash
open index.html          # macOS — or just double-click it
```

Everything works straight from `file://`. To serve it over HTTP instead
(any static server is fine):

```bash
npx serve .              # then visit the printed URL
# or: python3 -m http.server 8000
```

Then open the four flows from the launcher, or directly:
`visitor/`, `logged-out-member/`, `logged-in-member/`, `subscriber/`.

## Structure

```
index.html                     Launcher — static picker linking to each flow
main.css                       All styles (shared by every page)
main.js                        All behavior — reads <body data-persona> and
                               renders the nav/panel/dropdown for that persona
assets/                        Real assets exported from Figma (flat folder):
                               logotype.png/.svg + logomark.png (logos),
                               placeholder_profile.svg, privacy-choices.png,
                               listicles_*.svg (splash listicle icons),
                               hero-rings-*.svg / factoid-blob-*.svg /
                               closing-blob.svg (splash decorative graphics)
                               (nav/UI icons are inlined in main.js, not files)
visitor/index.html             Anonymous Visitor flow
logged-out-member/index.html   Logged Out Member flow
logged-in-member/index.html    Logged In Member flow (has the dropdown)
subscriber/index.html          Subscriber flow
MANUAL.md                      Index of the spec docs (start here)
DECISIONS.md                   Chronological decisions log + "on the horizon"
foundation/                    System & behavior (the how):
  system.md                      Architecture & persona model (render, screens, device)
  design.md                      Design language (tokens, type, tinting, chrome assets)
  navigation.md                  Global-nav chrome (top nav, panel, level-up, footer)
domains/                       Product surfaces (the what):
  landing.md                     Splash Landing (modules + deep-links + assets)
  advisors.md                    Medical Advisory Committee page (splash deep-link)
  library.md                     Library / "Resources" (topic pages, Topic Center, Article)
  community.md                   Community (list + detail screens, icons)
  account.md                     Account (profile dropdown + its screens)
  onboarding.md                  Onboarding (Sign Up Start, Registration Step)
```

(A local `.claude/` folder holds an optional preview helper; it's gitignored and
not part of the repo — serve with `npx serve .` instead.)

## How it works

Each flow lives in its own folder and is a thin shell that sets one attribute and
loads the two shared files:

```html
<body data-persona="logged-in-member">
  <link rel="stylesheet" href="../main.css" />
  <script src="../main.js"></script>
</body>
```

`main.js` reads `data-persona` and renders that persona's nav/panel/dropdown and
screens — no framework, no build step, no persona switcher. The phone is a fixed
**iPhone 16 Pro** frame (402 × 874) that scales to fit the window. Navigation
happens via `data-screen="<id>"` elements inside the prototype; each flow stays
self-contained.

The full architecture — render model, screen types, the device frame, and the
four personas — is in **[foundation/system.md](foundation/system.md)**.

## Docs

- **[MANUAL.md](MANUAL.md)** — index of the spec docs (start here).
- **[DECISIONS.md](DECISIONS.md)** — the chronological decisions log.
- **[foundation/](foundation/)** — system & behavior: system, design, navigation.
- **[domains/](domains/)** — the product surfaces: landing, advisors, library,
  community, account, onboarding.
