# TIM — Global Navigation Prototype

A plain HTML/CSS/JS prototype of the **This Is Menopause** global navigation
(top nav, slide-out panel, and account dropdown) across four auth states.
No framework, no build step — just open a file in a browser.

Design source: Figma **Global Navigation** file `42yas7Q9FfwhL6xUocjEAl`.

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
assets/                        Real assets exported from Figma
  icons/                         nav, topic, community & dropdown icons (SVG)
  logo/                          full wordmark + compact logomark (PNG @3x)
  profile/                       placeholder profile illustration (SVG)
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

| Persona | Nav | Panel | Dropdown |
|---|---|---|---|
| Anonymous Visitor | Full logotype + Join | Library (6) + join card | — |
| Logged Out Member | Logomark + profile | Library (4) + Community (5) | — |
| Logged In Member | Logomark + profile | Library (4) + Community (5) | ✓ |
| Subscriber | Logomark + profile | Library (6) + finish-up card | — |

See **navigation.md** for behavior details and the decisions log, and
**components.md** for the per-component spec and the Figma node id behind
every asset.
