# TIM Navigation — spec (behavior + components)

Source: Figma **Global Navigation** file `42yas7Q9FfwhL6xUocjEAl`.
Prototype: plain HTML/CSS/JS in this repo (`../index.html`, `../main.css`, `../main.js`), no build step.

This doc is the spec for the **global navigation chrome** — the top nav, slide-out
panel (container), level-up bar, and global footer: how they behave and their
component structure (props, states, Figma node ids). The nav is the *mechanism*;
what surrounds it lives elsewhere: the render model, screen types, device frame,
and persona/screen inventory are in [system.md](system.md); color/type/motion
tokens, the icon-tinting system, and asset provenance are in [design.md](design.md);
and the content **surfaces** the nav leads to have their own docs —
[landing.md](landing.md) (Splash Landing), [library.md](library.md) (topics),
[community.md](community.md), [account.md](account.md) (the profile dropdown + its
screens), and [onboarding.md](onboarding.md) (sign-up). History is in
[DECISIONS.md](../DECISIONS.md). Code is the source of truth if any of these disagree
— correct the doc, don't erase the stale entry.

---

## Personas & screens

The four personas (nav treatment, `navVariant` / `panelType`) and the full
per-persona screen inventory live in the architecture doc,
[system.md](system.md) → Personas / Screens per persona. Each persona's nav
*variant* is detailed in §1 below; the content surfaces those screens belong to
are in [landing.md](landing.md), [library.md](library.md),
[community.md](community.md), and [account.md](account.md).

---

## Interactions (as built)

- **Top nav** → sticky at the top, but **auto-hides on scroll-down and returns on scroll-up** (`attachAutoHide()` toggles `.is-hidden` on the sticky `.screen__nav`). The **level-up bar** (`.screen__uplevel`) is a separate sticky element that **stays pinned** — it docks below the nav when the nav shows and rises to the top edge when the nav hides.
- **Hamburger (☰)** → opens the slide-out Panel for the current persona. Tapping the overlay (not the panel surface) closes it with a slower ease-out slide-out animation (`closePanel()`).
- **Nav logotype / logomark** → returns to the persona's home screen (Splash Landing for Visitor and Subscriber, Home as a hub for the member states). In-page `go-home`.
- **Hidden home hotspot** → a small circle fixed in the top-left corner of each flow page, invisible until hovered, that links back to the root launcher (`../index.html`). Uses a launchpad / 2×2 grid icon. Injected by `main.js`, so it only appears on flow pages (not the launcher).
- **Panel items** (Library / Community) → navigate to that item's destination screen (an in-page state change within the same persona) and close the panel. Library items and screens are in [library.md](library.md); Community in [community.md](community.md).
- **Profile avatar** (member nav variant) → opens the account **Dropdown** (wired for Logged In Member; tapping outside closes it). The dropdown's menu and its destination screens are spec'd in [account.md](account.md).
- **Level-up bar** → only on *detail* screens (Article/Group/Program/Profile/Question/Activity). It steps **one level up** to the parent list/topic (via `upTo` → `data-screen`, e.g. Group Detail → Groups, Article Show → its topic page), not "back" and not necessarily home. Top-level pages (the panel/dropdown destinations) have no level-up bar — the nav logo returns home instead. (`program` has no list parent in the source, so it falls back to home.)
- **Join CTAs** (nav **Join** pill, panel **Join for free** / **Finish up now**) → open the chromeless sign-up flow **in-persona** (`Sign Up Start` / `Registration Step`) — full spec in [onboarding.md](onboarding.md).
- **"Log in now"** (Logged Out gated home) and **"Log out"** (dropdown) → currently **no-ops** (auth not wired); see [onboarding.md](onboarding.md).

---

## 1. Top Nav

Fixed bar, 68px tall, white background, `inset 0 -1px 0 #dbdddf` hairline bottom border.

**Layout:** `[ Menu icon | Logo ]  ...  [ Search | AI | Join-button OR Profile ]`

The logotype/logomark is a button that returns to the persona's home screen (`go-home`). The stacked visitor logotype renders at 40px, hugging the menu icon.

### Variant: `visitor`
- Logo slot: full logotype (`ThisIsMenopause_Logo_FullColor_Digital`), 133×44
- Right slot: Search icon, AI icon, **Join** pill button (bg `#0f57a8`, white text)
- No profile icon
- Node refs: 6538:148 (Splash Landing), 7082:1269 (Topic Center), 6951:800 (Article Show)

### Variant: `member` (logged-out and logged-in, non-photo state)
- Logo slot: compact **Logomark** (circle mark, ~47×44), not the full wordmark
- Right slot: Search icon, AI icon, **Profile** avatar (self-contained circular placeholder silhouette — no button border/background) + orange notification badge (`--color-badge`, `#ff741d`) that sits **outside, on top of** the avatar's top-right edge (11px dot with a 2px white ring). The circular crop is on an inner `.profile-avatar` wrapper so the badge (a sibling) isn't clipped by it.
- No Join button
- Node ref: 6960:52 (Logged Out Member — Home gated)

### Variant: `member-photo` (logged-in member)
- Same as `member`, but Profile avatar shows a real photo instead of the generic placeholder, still with the badge
- Node refs: 7025:302 (Article Show), 7025:371 (Group Detail), 7031:509 (Program Detail), 7025:440 (Member Profile), 6951:734 (Question Show), 6951:531 (Activity Show), 7042:711 (Home + Dropdown)

**Subscriber:** no subscriber-specific top-nav frame in the source file, so the prototype reuses the **`visitor`** variant (full logotype + Join CTA) and the Visitor landing. Its slide-out panel keeps a subscriber-specific access card ("Finish up now"). See [system.md](system.md) → Personas.

---

## 2. Level-up bar (one level up)

44px tall, sits directly under the Top Nav, `0 1px 0 #dbdddf` bottom hairline shadow.

**Content slot:** `[ chevron icon ]  [ label ]` — label color `#0f57a8`, 16px semibold.

Only on **detail** screens. It steps **one level up** to the parent list (`upTo` → `data-screen`), not "back" and not home. Top-level pages (panel/dropdown destinations) have no level-up bar — the nav logo returns home. The nav and the level-up bar are **independent sticky elements**: the nav (`.screen__nav`) auto-hides on scroll-down and returns on scroll-up, while the level-up bar (`.screen__uplevel`) **stays pinned**. While the nav shows, the bar pins just below it (its `top` = nav height); when the nav hides, the bar docks to the very top edge (`attachAutoHide` animates the `top`).

| Screen | Back label | Node id |
|---|---|---|
| Visitor — Article Show | Topic | 6951:800 |
| Member — Article Show | Topic | 7025:302 |
| Member — Group Detail | Groups | 7025:371 |
| Member — Program Detail | Programs | 7031:509 |
| Member — Someone's Member Profile | Meet Others | 7025:440 |
| Member — Question Show | Questions & Answers | 6951:734 |
| Member — Activity Show | Activity | 6951:531 |

Figma frames are static (no destination logic). The prototype routes each detail screen's level-up bar to its parent list where one exists (`upTo`); `Program Detail` has no Programs list, so it falls back to home.

**In-page pill (alternative to the level-up bar).** A screen can instead carry a `pill: { label, screen }` — rendered as a rounded **label pill** at the top of the body (`.page-pill`, label only, no chevron, navigates via `data-screen`), scrolling with the content rather than pinned as a bar. The **Article Show (in Collection)** screen uses this (`type: "page"` + `pill` → Collection) instead of a level-up bar. Its parent **Collection** is a plain `page` (no bar, no pill).

---

## 3. Slide-out Panel

Full-height overlay: `rgba(0,0,0,0.75)` scrim + 300px white panel sliding from left, 24px padding, 24px gap between sections.

**Structure:** `Logotype → Resources section → [Community section] → [Access card] → Footer note`

### Content slots

Each Library / Community item carries a `data-screen` and navigates to a placeholder destination screen within the current persona (in-page state change; the panel closes on click). Both sections' item→screen maps, destination screens, and panel icons live in their surface docs:

**Resources** (internally the Library surface; screen ids stay `lib-*`) — bulleted icon list, section label "RESOURCES" (uppercase, `#626b74`, 14px). Present in every persona's panel (full or short set). Items, browse screens, and icons in [library.md](library.md).

**Community** — only present for Logged Out Member / Logged In Member. Section label "COMMUNITY". Items, detail screens, and icons in [community.md](community.md).

Both sections' items are *list*-type destinations (top-level `page`s, no level-up bar), deliberately separate from the *detail* screens they don't reach directly.

**Access card** — only present for Visitor / Subscriber. Navy (`#2b2b68`) rounded card, `DM Serif Display` headline "Don't miss out!", body copy, white pill CTA, secondary link.
- Visitor: "Join our community to access posts, questions, groups, and meet people." → **Join for free** → "Get a preview first"
- Subscriber: "Create your account to access posts, questions, groups, and meet people." → **Finish up now** → "Get a preview first"

The **Join for free** / **Finish up now** CTAs open the chromeless sign-up flow (`Sign Up Start` / `Registration Step`) — see [onboarding.md](onboarding.md).

**Footer** — "Powered by" on line 1, "MyHealthTeam, a Swoop company" on line 2 (`#626b74`, 14px), pinned to bottom.

**Rendering notes (2026-07-24):** each Library/Community item icon sits in a light-pink circle (`--color-magenta-soft`) with the icon in magenta; section labels are 14px uppercase, normal tracking; the row rollover is a **pill** (`--radius-pill`) filled with a **single flat colour** (`--color-magenta-soft-solid` = `#f8f0fa`, the opaque equivalent of the circle's `--color-magenta-soft` — now `rgba(164,65,188,0.08)` — over white), bleeding wider than the text (negative inline margin into the 24px panel padding). On hover the icon circle goes **transparent** so it disappears into the pill — one uniform colour, no darker circle stacked on the row (using two alpha layers would double up and read as two shades). There is **no close (X)** — the panel dismisses via the scrim with a slower ease-out slide-out (`closePanel()`). The top wordmark uses `logotype.svg` (see [design.md](design.md) → Chrome assets). Color tokens and motion timings referenced here are catalogued in [design.md](design.md).

### Node refs
- Visitor panel: 6950:226
- Logged Out Member panel: 6960:3
- Logged In Member panel: 6950:144 *(metadata-only confirmation — not independently fetched, assumed identical to 6960:3 structure since both are Member-tier)*
- Subscriber panel: 6959:904

---

## 4. Profile dropdown

The account menu opened from the top-nav profile avatar. It's a single-surface
component (it serves only Account), so its full spec — container styling, menu
structure, item→screen map, Notifications-above-divider, bell wiggle, Log-out
no-op, "View Profile" → My Profile, dropdown icons, and persona availability —
lives in **[account.md](account.md)**. The nav's role is just the trigger: the
profile avatar (§1, member/subscriber personas) toggles it open.

---

## 5. Global footer

Added 2026-07-24 to the bottom of **every screen's scroll area** (`renderFooter()` in `main.js`). Content mirrors the Figma mobile footer (`6371:29` / `6371:139`). It's separated from the page content by ample space (`48px` margin-top on `.footer`) — no divider line. Two bands:

- **Bar** (white): horizontal wordmark (`logotype.svg`) + headline "Expert advice. Real women. Real talk." (matches the Splash frame footer, node 4101:162), then two link columns — About / Editorial Process / Partner with Us / Accessibility · Getting Started / Community Guidelines / Help Center / Crisis (links are non-navigating placeholders).
- **End** (grey `#f3f4f6`): legal line "Terms of Use · Privacy Policy · Cookie Policy · Health Data · [icon] Your Privacy Choices · CA Notice at Collection" (the CCPA opt-out icon is `assets/privacy-choices.png`), the medical disclaimer, and "© 2026 MyHealthTeam, A Swoop Company."

Because the footer is tall, screens are now vertically scrollable: `.screen` is a flex column with a fixed nav/uplevel and a scrollable `.screen__scroll` holding the content + footer. Panel/dropdown overlays stay pinned to the phone viewport (absolute over `.screen`, don't scroll).

**Screen content** is a labelled placeholder by default. The Visitor / Subscriber home screens carry a `modules: true` flag and render the real **Splash Landing** content via `renderModules()` — see [landing.md](landing.md). There is no screenshot-image path.

---

## Assets

The chrome assets (logo, nav/uplevel icons, profile illustration, footer CCPA
icon), the **icon-tinting system**, and the color/type/motion tokens referenced
throughout this doc are catalogued in [design.md](design.md). The nav icons
(`menu`, `search`, `ai`, `back`) and logos (`logotype`, `logomark`) are there
under **Chrome assets**; per-surface panel icons live with their surfaces
([library.md](library.md), [community.md](community.md), [account.md](account.md)).
