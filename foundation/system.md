# TIM System — architecture & persona model

How the prototype is built and how it renders: the `data-persona` model, the
screen/state machine, the device frame, and the file layout. This is the "how it
works" reference; the visual language (tokens, type, tinting) is in
[design.md](design.md), and each content surface has its own doc. Code
(`../main.js`, `../main.css`) is the source of truth — correct this doc if it
drifts.

---

## Render model (`data-persona`)

No framework, no build step — each flow page is a thin shell that sets one
attribute and loads the two shared files:

```html
<body data-persona="logged-in-member">
  <link rel="stylesheet" href="../main.css" />
  <script src="../main.js"></script>
</body>
```

`main.js` reads `data-persona` (`LOCKED_PERSONA_KEY`), looks up that persona in the
`PERSONAS` map (`persona = PERSONAS[key]`), and renders its nav/panel/dropdown and
screens. There is **no persona switcher** — each page is locked to whatever
`data-persona` says, so a single flow can be shared standalone without exposing the
others. There are **no per-screen HTML files**; `main.js` renders every screen.

---

## Screen model

Each persona has a `screens` array; `state.screenId` selects the active one and
`render()` (~`main.js:568`) draws it. Screen shape: `{ id, label, type, title, … }`.

**Types:**
- `tabs` — the home screen (Splash Landing / hub); carries `modules: true` where it renders content modules.
- `page` — a top-level page with **no** level-up pill; the nav logo returns home. All panel/dropdown destinations (`lib-*`, `com-*`, `acct-*`) and most flow screens are `page`.
- `uplevel` — a detail screen with a level-up pill that steps one level up via `upTo` → `data-screen` (see [navigation.md](navigation.md) §2).
- `gated-home` — the Logged Out Member's gated welcome screen.
- `chromeless: true` — a flag (not a type) that drops nav/level-up/footer and shows an ✕ that closes back to `state.prevScreenId` (the onboarding pages — see [onboarding.md](../domains/onboarding.md)).

**State** (`state` object): `screenId`, `panelOpen`, `dropdownOpen`, `prevScreenId`
(remembered on every navigation so chromeless pages can close "back"). Navigation
is delegated: any element with `data-screen="<id>"` jumps to that screen and closes
overlays; `data-action` handles `toggle-panel` / `toggle-dropdown` / `go-home` /
`go-profile` / `close-flow`. The top nav auto-hides on scroll-down / returns on
scroll-up (`attachAutoHide()`); the level-up pill stays pinned independently.

---

## Device frame

The phone is a fixed **iPhone 16 Pro** device frame, **402 × 874**, set by the
`--device-width` / `--device-height` tokens in `main.css` (single source of truth).
The 8px bezel sits *outside* the screen (`box-sizing: content-box`) so the usable
width is a true 402px. `fitPhone()` (~`main.js:753`) scales the whole device down
with a `transform` to fit shorter/narrower windows (capped at 1× — never upscales),
collapsing the leftover layout box with negative margins so the page never
scrolls; skipped at ≤430px width, where a media query full-bleeds the phone.

---

## Personas

Four auth states, each with its own nav treatment and panel content (nav-variant
details in [navigation.md](navigation.md) §1):

The **side panel is now shared** across all four personas (Home / Resources /
Community tabs + topic hubs + Explore — see [navigation.md](navigation.md) §3),
so there is no longer a `panelType`. Only the top-nav treatment still varies:

| Persona | `navVariant` | Home | Dropdown? |
|---|---|---|---|
| **Anonymous Visitor** | `visitor` (full logotype + Join) | Splash Landing | No |
| **Logged Out Member** | `member` (logomark + generic profile) | Gated home | Icon only, not built |
| **Logged In Member** | `member-photo` (logomark + photo) | Hub (placeholder) | Yes |
| **Subscriber** | `visitor` (mirrors Visitor) | Splash Landing (mirrors Visitor) | No |

**Open question:** should Subscriber have its own top-nav frame, or is reusing the
Visitor nav correct? No Subscriber tabs/uplevel frame exists in the Figma file to
confirm either way — flagged, not decided.

---

## Screens per persona

Panel/dropdown destinations are prototype-added placeholder screens so the menu
items lead *somewhere*. They're top-level `page`s (no level-up pill). Library
destinations are shared across personas (`lib-*`); Community are `com-*`;
Dropdown/account are `acct-*`. Detailed in [library.md](../domains/library.md),
[community.md](../domains/community.md), [account.md](../domains/account.md); the Splash Landing home and
its CTA deep-links are in [landing.md](../domains/landing.md).

The **Community Overview hub** (`community-overview`) and its five feature targets
(`com-activities`, `com-questions`, `com-groups`, `com-meet`, `com-values`) are now
**shared across all four personas** (injected via `SHARED_TARGET_SCREENS`), since
every persona's panel Community tab opens the hub. The per-persona lists below note
Community only where it was persona-specific historically.

**Anonymous Visitor**
- Splash Landing (`tabs`), Article Show (levels up to a Topic Hub), Article Show in a Collection
- Resources (panel dest.): `lib-hrt`, `lib-mood`, `lib-sleep`, `lib-diet`, `lib-family`, `lib-all`

**Logged Out Member**
- Gated home (`gated-home`, welcome card → "Log in now")
- Resources (panel dest.): `lib-hrt`, `lib-mood`, `lib-sleep`, `lib-all`
- Community (via the Community Overview hub): `com-activities`, `com-questions`, `com-groups`, `com-meet`, `com-values`

**Logged In Member**
- Hub home (`tabs`, photo profile) + dropdown-open variant
- Detail screens: Article Show, Group Detail, Program Detail, Someone's Member Profile, Question Show, Activity Show (`uplevel`)
- Resources (panel dest.): `lib-hrt`, `lib-mood`, `lib-sleep`, `lib-all`
- Community (via the Community Overview hub): `com-activities`, `com-questions`, `com-groups`, `com-meet`, `com-values`
- Account (dropdown dest.): `acct-health`, `acct-messages`, `acct-notifications`, `acct-settings`, `my-profile` (Log out is a no-op, see [onboarding.md](../domains/onboarding.md))

**Subscriber**
- Mirrors the Visitor Splash Landing as its home (see [landing.md](../domains/landing.md))
- Resources (panel dest.): `lib-hrt`, `lib-mood`, `lib-sleep`, `lib-diet`, `lib-family`, `lib-all`
- Adds a Subscriber-only `registration-step` (see [onboarding.md](../domains/onboarding.md))

Content behind each nav is placeholder in the *Figma source itself* — the real
design surface there is the nav/panel/dropdown states, not full page layouts. The
prototype reflects that: content areas are intentionally labelled placeholders.

---

## File layout

```
index.html                     Launcher — static picker linking to each flow
main.css                       All styles (shared)
main.js                        All behavior + content data + renderers
assets/                        Flat folder of Figma-exported assets (see design.md)
visitor/ logged-out-member/    One folder per persona; each index.html is a thin
logged-in-member/ subscriber/    shell (data-persona + ../main.css + ../main.js)
foundation/                    These spec docs
.claude/                       Optional local static-server preview helper
```

Everything runs from `file://` (no server needed). Inline SVG icons (not external
`<img>`/CSS-`mask`) are used deliberately so icons render over `file://` — external
mask/url refs are blocked there (see [design.md](design.md) → icon tinting). Built
plain HTML/CSS/JS to match `tim-splash-landing` conventions and ease a later Rails
ERB port.
