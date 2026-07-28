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
Collection → All Collections, Advisors, Community Overview, Sign Up Start).

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
                               listicles_*.svg (splash listicle icons)
                               (nav/UI icons are inlined in main.js, not files)
visitor/index.html             Anonymous Visitor flow
logged-out-member/index.html   Logged Out Member flow
logged-in-member/index.html    Logged In Member flow (has the dropdown)
subscriber/index.html          Subscriber flow
navigation.md                  Behavior spec & decisions log
components.md                  Component spec + Figma node ids per asset
.claude/                       Optional local preview helper (static server)
```

## How it works

Each flow lives in its own folder so it can be shared as a standalone,
locked page without exposing the others. Every flow page is a thin shell that
sets one attribute and loads the two shared files:

```html
<body data-persona="logged-in-member">
  ...
  <link rel="stylesheet" href="../main.css" />
  <script src="../main.js"></script>
</body>
```

`main.js` reads `data-persona`, looks up that persona's nav variant, panel
content, and screens, and renders them. There is no persona switcher — the
page is locked to whatever `data-persona` says.

The phone is a fixed **iPhone 16 Pro** device frame (**402 × 874**), set by the
`--device-width` / `--device-height` tokens in `main.css`; the 8px bezel sits
*outside* the screen (`box-sizing: content-box`) so the usable width is a true
402px. `main.js` scales the whole device down to fit shorter/narrower windows
(capped at 1×, so it never upscales past the intended size), which keeps the
page from ever scrolling vertically while preserving the design.

Screen-to-screen navigation happens via elements *inside* the prototype — any
element with `data-screen="<id>"` jumps to that screen (valid ids live in the
`PERSONAS` map / `SPLASH_FLOW_SCREENS` in `main.js`). CTAs stay within the
current flow — there are no cross-flow folder jumps. **Chromeless** flow pages
(Sign Up Start, Registration Step) drop the nav and footer and show an **✕** in
the top-left that closes back to the page they opened from.

| Persona | Nav | Panel | Dropdown |
|---|---|---|---|
| Anonymous Visitor | Full logotype + Join | Library (6) + join card | — |
| Logged Out Member | Logomark + profile | Library (4) + Community (5) | — |
| Logged In Member | Logomark + profile | Library (4) + Community (5) | ✓ |
| Subscriber | Logomark + profile | Library (6) + finish-up card | — |

See **navigation.md** for behavior details and the decisions log, and
**components.md** for the per-component spec and the Figma node id behind
every asset.
