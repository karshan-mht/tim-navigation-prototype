# TIM Splash Landing — spec

Source: the **Mobile_Splash_Landing** frame in Figma file `EWsXKakhyFLhkse035AoHX`
(node `4101:3`), the desktop frame `4113:51` (listicles) / `4101:349` (community
quotes), and type from the **MHT Style Guide** (`zV2gbuNONeoyeRVcFUFWeZ`, node
`3941:17`).
Prototype: plain HTML/CSS/JS in this repo (`../index.html`, `../main.css`, `../main.js`), no build step.

This doc is the self-contained spec for the **Splash Landing** — the
Visitor/Subscriber home built from content modules, plus the flow/deep-link pages
its CTAs open. The global navigation chrome (top nav, panel, dropdown, level-up
bar, footer) is a separate surface — see [navigation.md](navigation.md). The
chronological history of every change lives in [DECISIONS.md](../DECISIONS.md). Code
is the source of truth if any of these disagree — correct the doc, don't erase the
stale entry.

**Code source of truth:** the landing is rendered by `renderModules()` in
`main.js` (starts ~`main.js:376`); the CTA deep-link screens live in the
`SPLASH_FLOW_SCREENS` array (~`main.js:139`). `render()` calls `renderModules()`
for home screens flagged `modules: true`.

---

## Where it renders

`renderModules()` runs only on the personas whose home is the Visitor-style
splash:

- **Anonymous Visitor** — the Splash Landing is the home.
- **Subscriber** — top nav and landing **mirror the Visitor** exactly
  (`navVariant: "visitor"`; home screens mirror Visitor's Splash / Topic /
  Article), **but** its slide-out panel keeps a subscriber-specific access card
  ("Finish up now").

It does **not** render for:

- **Logged In Member** — home is "Home as a hub" (still to be designed), a
  placeholder label, not the splash.
- **Logged Out Member** — a gated home ("Welcome back… you're not logged in").

---

## The six sections (Figma order)

Built out 2026-07-27 from the `Mobile_Splash_Landing` frame, in this order:

1. **Checker** — hero: avatar stack + community count + symptom-checker card.
2. **Listicles** — 5 cards (see asset table below).
3. **Articles** — horizontal carousel, 324×170 thumbnails, simple diagonal-hatch
   placeholder pattern (no gradients), no eyebrows.
4. **Experts** — solid `#EDF3F9` background (`--color-bg-blue-soft`); avatar
   circles use the placeholder pattern.
5. **Factoid** — the 82% / 72% stats with the "Survey of 1,000 U.S. women ages
   35–59" source line, straight from the frame.
6. **Community** — quote carousel (the two real desktop-frame quotes, `4101:349`)
   + closing CTA.

**Data note — nothing fabricated:** the hero community count renders as
`[TBD] women in the community` — the real figure is still needed from the
community team (it is **not** to be pulled from `Menopause_Survey_4`). The 82% /
72% stats and the survey source line come straight from the frame.

---

## Styling spec

The color tokens, DM Serif type scale, and the size-based letter-spacing rule
this landing uses are the shared design system — catalogued in
[design.md](design.md) (the landing's build is where several tokens, e.g.
`--color-bg-*` and the purple accents, were first added). This section covers only
what's **specific to the splash sections**:

- **Section padding:** 48px top/bottom, 12px sides (per the frame).
- **Listicles:** 5 cards from the desktop frame (`4113:51`), left-aligned, wider
  (210px), 80px icon circles using `assets/listicles_*.svg`, non-wrapping
  buttons; rollover uses `--color-primary-soft` (not the panel pink).
- **Articles:** horizontal carousel, 324×170 thumbnails, diagonal-hatch
  placeholder pattern.
- **Footer tagline:** "Expert advice. Real women. Real talk." at 20px / -0.75px
  Regular (frame `4101:162`).

---

## Flow / deep-link screens

The splash CTAs open placeholder destination pages within the same persona
(`SPLASH_FLOW_SCREENS`, ~`main.js:139`):

| CTA / trigger | Opens |
|---|---|
| "Check all my symptoms" / "Check symptoms first" | **Symptom Checker** |
| Listicle cards | **Listicle Detail** |
| One Article card | **Article Show** (in a collection) → links back to its **Collection** via an in-page label pill |
| "View all advisors" | **Advisors** |
| "Join the conversation" (Community) / panel "Get a preview first" | **Community Overview** |
| Community section **Join for free** | **Sign Up Start** — see [onboarding.md](onboarding.md) |

The splash's **Join** CTAs open the sign-up flow; that surface (Sign Up Start /
Registration Step, chromeless rendering, and the entry points from the nav and
panel too) is specified in [onboarding.md](onboarding.md).

---

## Assets — listicles (`assets/`, flat folder)

The 5 listicle icons are full-colour SVGs exported from the desktop listicles
frame (`4113:51`), rendered in 80px circles:

| File | Listicle |
|---|---|
| `listicles_flashes.svg` | Hot flashes |
| `listicles_fog.svg` | Brain fog |
| `listicles_libido.svg` | Libido |
| `listicles_sleep.svg` | Sleep |
| `listicles_weight.svg` | Weight |

Article / expert thumbnails are **not** real assets — they use a simple
diagonal-hatch placeholder pattern (no gradients), deliberately, until real
imagery is provided.
