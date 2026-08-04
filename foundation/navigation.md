# TIM Navigation — spec (behavior + components)

Source: Figma **Global Navigation** file `42yas7Q9FfwhL6xUocjEAl`.
Prototype: plain HTML/CSS/JS in this repo (`../index.html`, `../main.css`, `../main.js`), no build step.

This doc is the spec for the **global navigation chrome** — the top nav, slide-out
panel (container), level-up pill, and global footer: how they behave and their
component structure (props, states, Figma node ids). The nav is the *mechanism*;
what surrounds it lives elsewhere: the render model, screen types, device frame,
and persona/screen inventory are in [system.md](system.md); color/type/motion
tokens, the icon-tinting system, and asset provenance are in [design.md](design.md);
and the content **surfaces** the nav leads to have their own docs —
[landing.md](../domains/landing.md) (Splash Landing), [library.md](../domains/library.md) (topics),
[community.md](../domains/community.md), [account.md](../domains/account.md) (the profile dropdown + its
screens), and [onboarding.md](../domains/onboarding.md) (sign-up). History is in
[DECISIONS.md](../DECISIONS.md). Code is the source of truth if any of these disagree
— correct the doc, don't erase the stale entry.

---

## Personas & screens

The four personas (nav treatment, `navVariant`; the panel is now shared, so
`panelType` was removed) and the full per-persona screen inventory live in the architecture doc,
[system.md](system.md) → Personas / Screens per persona. Each persona's nav
*variant* is detailed in §1 below; the content surfaces those screens belong to
are in [landing.md](../domains/landing.md), [library.md](../domains/library.md),
[community.md](../domains/community.md), and [account.md](../domains/account.md).

---

## Interactions (as built)

- **Top nav** → sticky at the top, but **auto-hides on scroll-down and returns on scroll-up** (`attachAutoHide()` toggles `.is-hidden` on the sticky `.screen__nav`). The **level-up pill** (`.screen__uplevel`) is a separate sticky element that **stays pinned** — it docks below the nav when the nav shows and rises to the top edge when the nav hides.
- **Hamburger (☰)** → opens the slide-out Panel for the current persona. Tapping the overlay (not the panel surface) closes it with a slower ease-out slide-out animation (`closePanel()`).
- **Nav logotype / logomark** → returns to the persona's home screen (Splash Landing for Visitor and Subscriber, Home as a hub for the member states). In-page `go-home`.
- **Hidden home hotspot** → a small circle fixed in the top-left corner of each flow page, invisible until hovered, that links back to the root launcher (`../index.html`). Uses a launchpad / 2×2 grid icon. Injected by `main.js`, so it only appears on flow pages (not the launcher).
- **Panel tabs / hubs** → the shared panel's Home / Resources / Community tabs and its topic-hub rows each carry a `data-screen`; tapping navigates in-persona and closes the panel. See §3 for the full structure and targets.
- **Profile avatar** (member nav variant) → opens the account **Dropdown** (wired for Logged In Member; tapping outside closes it). The dropdown's menu and its destination screens are spec'd in [account.md](../domains/account.md).
- **Level-up pill** → only on *detail* screens (Article/Group/Program/Profile/Question/Activity). It steps **one level up** to the parent list/topic (via `upTo` → `data-screen`, e.g. Group Detail → Groups, Article Show → its topic page), not "back" and not necessarily home. Top-level pages (the panel/dropdown destinations) have no level-up pill — the nav logo returns home instead. (`program` has no list parent in the source, so it falls back to home.)
- **Nav pill** → opens the chromeless sign-up flow **in-persona**. Persona-aware: **Join** → `Sign Up Start` for the Visitor; **Finish** → `Registration Step` for the Subscriber (both share the `visitor` nav variant). Full spec in [onboarding.md](../domains/onboarding.md). *(The panel's old Join for free / Finish up now access cards were removed in the 2026-08-03 shared-panel redesign; those roles moved to the nav pill + splash closing card — see §3.)*
- **"Log in now"** (Logged Out gated home) and **"Log out"** (dropdown) → currently **no-ops** (auth not wired); see [onboarding.md](../domains/onboarding.md).

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

**Subscriber:** no subscriber-specific top-nav frame in the source file, so the prototype reuses the **`visitor`** variant (full logotype + Join CTA) and the Visitor landing. Its slide-out panel is the shared panel (the old subscriber "Finish up now" access card was removed in the 2026-08-03 redesign; the `registration-step` screen still exists for the sign-up flow). See [system.md](system.md) → Personas.

---

## 2. Level-up pill (one level up)

**Redesign (2026-08-03, Figma Global Navigation `42yas7Q9FfwhL6xUocjEAl`, pill `7294:1952`).** The old full-width level-up **bar** was replaced by a **pill** that sits in-page (top-left) but sticks to the top on scroll — same pinning behaviour as the bar had.

**Pill:** a blue-tinted pill (`background`/`border` = `rgba(15,87,168,0.1)`, `border-radius: 48px`, `padding: 6px 12px`, height 34px) holding a **section icon** (16px, pre-tinted blue, `assets/up-*.svg`) + the parent's name (Lato Semibold 14px, `#0f57a8`, `-0.25px`). No chevron — the section icon + label convey the destination.

Only on **detail** screens. It steps **one level up** to the parent (`upTo` → `data-screen`), not "back" and not home. Top-level pages have no pill — the nav logo returns home. The nav and the level-up pill are **independent sticky elements**: the nav (`.screen__nav`) auto-hides on scroll-down and returns on scroll-up, while the pill's sticky container (`.screen__uplevel`, transparent so the pill floats in-page) **stays pinned**. While the nav shows, it pins just below it (its `top` = nav height); when the nav hides, it docks to the very top edge (`attachAutoHide` animates the `top`).

| Screen | Pill label → up-to | Icon |
|---|---|---|
| Visitor / Member — Article Show | Topic Center → `topic` | `up-hub.svg` |
| Member — Group Detail | Groups → `com-groups` | `up-groups.svg` |
| Member — Program Detail | Programs → home | `up-programs.svg` |
| Member — Someone's Member Profile | Meet Others → `com-meet` | `up-meet.svg` |
| Member — Question Show | Questions & Answers → `com-questions` | `up-qa.svg` |
| Member — Activity Show | Activity → `com-activities` | `up-activity.svg` |

Article Show levels up to the **Topic Center** (`topic`). Activity Show levels up to **Activity** (`com-activities`) — after `com-stories`/"Posts" was retired and folded into Activity (2026-08-03), the `up-posts.svg` icon was renamed `up-activity.svg`. `Program Detail` has no Programs list, so it falls back to home.

**Naming (reconciled 2026-08-04):** the old `topic` screen — where Article Show levels up to — is now labelled **"Topic Center"** again (it had briefly been mislabelled "Topic Hub"). It's a **separate** screen from the new **Topic Hub** surface (§3, [topic-hub.md](../domains/topic-hub.md)); the two no longer share a name. Topic Center is Collections-bound — folding it fully into Collections is the remaining future work ([DECISIONS.md](../DECISIONS.md) → "on the horizon"). The `up-hub.svg` icon is reused for the Topic Center pill (no dedicated icon).

**Series callout (in-page, non-sticky).** An article that belongs to a series carries a `series: { screen }` and renders a small **callout box** near the top of the body (`.series-box` — "Part of a series" / a line of copy / an **"Explore the full series →"** link that navigates via `data-screen`), scrolling **with** the content. The **Article Show (in Collection)** screen uses this to link up to its **Collection**; the box is a **placeholder**. This replaced the old "Collection" label pill (removed 2026-08-03). Note: this screen has **no** page-title label — the callout is its only chrome. Its parent **Collection** is a plain `page`.

---

## 3. Slide-out Panel

Full-height overlay: `rgba(0,0,0,0.75)` scrim + 300px white panel sliding from left, 24px padding, 24px gap between blocks.

**Redesign (2026-08-03, Figma Global Navigation `42yas7Q9FfwhL6xUocjEAl`, panel `7299:1987`).** The panel is now **one shared component for every persona** — no more per-user-type menus or access cards. It moved from persona-specific Resources/Community lists to a single set of top-level entry points plus **topic hubs** as the primary route into content and conversations.

**Structure:** `Logotype → Tab card (Home · Resources · Community) → Topic-hub list → Explore (ToC) → Footer note`

### Content slots

**Tab card** — a bordered (`rgba(98,107,116,0.1)`, radius 16px), 12px-padded row with three icon-over-label tabs (Lato 14px, `#626b74`), each a 44px line icon:
- **Home** → the current persona's own home screen (`persona.screens[0].id` — Splash for Visitor/Subscriber, Home-as-a-hub for members, gated home for Logged Out).
- **Resources** → `lib-all` (All Resources). Library surface: [library.md](../domains/library.md).
- **Community** → `community-overview` (Community Overview). Community surface: [community.md](../domains/community.md).

**Topic-hub list** — eight rows, each a 44px pre-tinted icon (magenta glyph on a pale `#F6EFF8` circle, `assets/hub-{1..8}.svg`) + label (Lato 18px, `#0d1b29`). Labels are the **Figma placeholders** ("Topic Hub Longer Name" / "…Short" / "…Long Name") — the real hub taxonomy is not yet settled. **Every hub opens the generic `topic-hub` screen** — the new Topic Hub surface, spec'd in [topic-hub.md](../domains/topic-hub.md). This is a **different screen** from the old `topic` ("Topic Center", where Article Show levels up — §2); the two are no longer named alike (reconciled 2026-08-04). Topic Center is Collections-bound; Collections (`all-collections` / `collection`) are a separate construct from both.

**Explore (ToC)** — an outline pill (`#0f57a8`, radius pill, Lato 16px) below the hubs → the `all-collections` screen (display label **"All Articles"**; the internal id stays `all-collections`).

Because the panel is shared — and the footer's "Medical Advisors" link is global — these destinations (`community-overview`, `all-collections`, `advisors`, `lib-all`, plus the Community sub-screens and every `topic-hub-*` page) are injected into **every** persona's `screens` list (`SHARED_TARGET_SCREENS` loop in `main.js`) so they resolve everywhere, not just in the Visitor/Subscriber splash flow. `topic` (the old Topic Center) is in that same injected list too, but only because Article Show's level-up pill still targets it — see §2.

**Footer** — "Powered by" on line 1, "MyHealthTeam, a Swoop company" on line 2 (`#626b74`, 14px), pinned to bottom.

**Rendering notes:** hub icons are pre-tinted SVGs used as `<img>` (no CSS `currentColor` tint); the hub-row rollover is still a **pill** (`--radius-pill`) filled with the flat `--color-magenta-soft-solid` (`#f8f0fa`), bleeding wider than the text (negative inline margin into the 24px panel padding). There is **no close (X)** — the panel dismisses via the scrim with a slower ease-out slide-out (`closePanel()`). The top wordmark uses `logotype.svg` (see [design.md](design.md) → Chrome assets). Color tokens and motion timings are catalogued in [design.md](design.md).

### Node refs
- New shared panel (Member/Subscriber/Visitor variants, identical body): `7299:1987`, `7299:2055`, `7299:2123`, `7287:1599`
- *(Superseded)* old per-persona panels: Visitor 6950:226, Logged Out Member 6960:3, Logged In Member 6950:144, Subscriber 6959:904

---

## 4. Profile dropdown

The account menu opened from the top-nav profile avatar. It's a single-surface
component (it serves only Account), so its full spec — container styling, menu
structure, item→screen map, Notifications-above-divider, bell wiggle, Log-out
no-op, "View Profile" → My Profile, dropdown icons, and persona availability —
lives in **[account.md](../domains/account.md)**. The nav's role is just the trigger: the
profile avatar (§1, member/subscriber personas) toggles it open.

---

## 5. Global footer

Added 2026-07-24 to the bottom of **every screen's scroll area** (`renderFooter()` in `main.js`). Content mirrors the Figma mobile footer (`6371:29` / `6371:139`). It's separated from the page content by ample space (`48px` margin-top on `.footer`) — no divider line. Two bands:

- **Bar** (white): horizontal wordmark (`logotype.svg`) + headline "Expert advice. Real women. Real talk." (matches the Splash frame footer, node 4101:162), then two link columns — About / Editorial Process / Partner with Us / **Medical Advisors** · Getting Started / Community Guidelines / Help Center / Crisis. All are non-navigating placeholders **except "Medical Advisors"**, which links to the built Advisors page (`data-screen="advisors"`; replaced the former "Accessibility" placeholder). The footer is global, so `advisors` is injected into every persona (see §3).
- **End** (grey `#f3f4f6`): legal line "Terms of Use · Privacy Policy · Cookie Policy · Health Data · [icon] Your Privacy Choices · CA Notice at Collection" (the CCPA opt-out icon is `assets/privacy-choices.png`), the medical disclaimer, and "© 2026 MyHealthTeam, A Swoop Company."

Because the footer is tall, screens are now vertically scrollable: `.screen` is a flex column with a fixed nav/uplevel and a scrollable `.screen__scroll` holding the content + footer. Panel/dropdown overlays stay pinned to the phone viewport (absolute over `.screen`, don't scroll).

**Screen content** is a labelled placeholder by default. The Visitor / Subscriber home screens carry a `modules: true` flag and render the real **Splash Landing** content via `renderModules()` — see [landing.md](../domains/landing.md). There is no screenshot-image path.

---

## Assets

The chrome assets (logo, nav/uplevel icons, profile illustration, footer CCPA
icon), the **icon-tinting system**, and the color/type/motion tokens referenced
throughout this doc are catalogued in [design.md](design.md). The nav icons
(`menu`, `search`, `ai`, `back`) and logos (`logotype`, `logomark`) are there
under **Chrome assets**; per-surface panel icons live with their surfaces
([library.md](../domains/library.md), [community.md](../domains/community.md), [account.md](../domains/account.md)).
