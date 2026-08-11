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
- **"Log in now"** (Logged Out Member's panel access card — see §3) and **"Log out"** (dropdown) → currently **no-ops** (auth not wired); see [onboarding.md](../domains/onboarding.md).

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

**Pill:** an opaque blue-tinted pill (`background` = `--color-bg-blue-soft` `#EDF3F9`, `border` = `1px solid #d6e2f1`, `border-radius: 48px`, `padding: 6px 12px`, height 34px) holding a **section icon** (16px, inline `currentColor` from `ICON_SVGS`, tinted blue by the pill's `color`) + the parent's name (Lato Semibold 14px, `#0f57a8`, `-0.25px`). No chevron — the section icon + label convey the destination. The pill **floats** over content (its sticky container is transparent + `pointer-events:none`, so the pill's own opaque fill is what keeps text from bleeding through) and picks up a soft blue drop-shadow only once scrolled over content (`.screen__uplevel.is-lifted`, toggled in `attachAutoHide` — no glow while idle at the top).

Only on **detail** screens. It steps **one level up** to the parent (`upTo` → `data-screen`), not "back" and not home. Top-level pages have no pill — the nav logo returns home. The nav and the level-up pill are **independent sticky elements**: the nav (`.screen__nav`) auto-hides on scroll-down and returns on scroll-up, while the pill's sticky container (`.screen__uplevel`, transparent so the pill floats in-page) **stays pinned**. While the nav shows, it pins just below it (its `top` = nav height); when the nav hides, it docks to the very top edge (`attachAutoHide` animates the `top`).

| Screen | Pill label → up-to | Icon (inline, `ICON_SVGS`) |
|---|---|---|
| Visitor / Member — Article Show | Skin-related Hub → `topic-hub` | `derm` |
| Member — Group Detail | Groups → `com-groups` | `up-groups` |
| Member — Program Detail | Programs → home | `up-programs` |
| Member — Someone's Member Profile | Meet Others → `com-meet` | `up-meet` |
| Member — Question Show | Questions & Answers → `com-questions` | `up-qa` |
| Member — Activity Show | Activity → `com-activities` | `up-activity` |

Article Show levels up to a **Topic Hub** (`topic-hub`, §3, [topic-hub.md](../domains/topic-hub.md)) — an article belongs to a hub; the built skin-care article's pill reads **"Skin-related Hub"** with the `derm` icon. Activity Show levels up to **Activity** (`com-activities`) — after `com-stories`/"Posts" was retired and folded into Activity (2026-08-03), the `up-posts.svg` icon was renamed `up-activity.svg`. `Program Detail` has no Programs list, so it falls back to home.

**Topic Center folded into Collections (2026-08-04):** the old `topic` screen was retired. It was "a collection of sponsored content," so it's now simply a **Collection** (the `collection` screen). An article links **either** up to a Topic Hub (the pill above) **or** to a Collection (the callout below) — never to a standalone "Topic Center" any more.

**Collection callout (in-page, non-sticky).** An article that belongs to a **Collection** carries `collection: { screen }`. The **Article Show (in Collection)** screen renders the **full article template** (shared `renderArticleShell` — same as the standalone Article Show, with generic placeholder copy) and inserts a small **callout box** directly **above Key Takeaways** (`.collection-callout` — "Part of a collection" / a line of copy / an **"Explore the full collection →"** link that navigates via `data-screen`), scrolling **with** the content. The callout links to its **Collection** (the rebranded old Topic Center — a curated set of sponsored content).

---

## 3. Slide-out Panel

Full-height overlay: `rgba(0,0,0,0.75)` scrim + 300px white panel sliding from left, 24px padding, 24px gap between blocks.

**Aligned panel (2026-08-10, Figma Global Navigation `42yas7Q9FfwhL6xUocjEAl`).** Every persona's panel shares **one layout** — only the top card differs. (This supersedes the 2026-08-03 "tab card + topic-hub list + Explore" panel: the tabs and the in-panel Explore pill were dropped.)

**Structure:** `Logotype → persona card → TOPICS list → Footer note`

### Content slots

**Persona card** (`.panel__promo` — navy, DM Serif title + sub + a white pill CTA + a secondary text link). The card is the only per-persona difference:

| Persona | Title / sub | Pill CTA → | Link → |
|---|---|---|---|
| Visitor | "Don't miss out!" / join copy | **Join for free** → `signup-start` | Get a preview first → `community-overview` |
| Subscriber | "Don't miss out!" / finish copy | **Finish up now** → `registration-step` | Get a preview first → `community-overview` |
| **Logged Out Member** (Figma `7417:3673`, "Access") | "Welcome back, Jannie123!" / "You're not logged in." | **Log in now** → `data-action="log-in"` (no-op — auth not wired) | Join for free → `signup-start` |
| **Logged In Member** (Figma `7417:3712`) | "Jannie123, how are you today?" / "It's okay to open up." | **Share now** → `com-activities` (Activity) | Ask a question → `com-questions` (Q&A) |

Card data lives in `PANEL_CARDS` (`main.js`); the whole panel is one `renderPanel()`.

**TOPICS list** — the **same for every persona**: 3 library topics (HRT & Other Treatments, Mood & Mental Health, Sleep & Insomnia) + **All Articles** (`PANEL_TOPICS`). Each row is a pill (magenta glyph on a pale circle; All Articles has no icon) → its `lib-*` screen (All Articles → `lib-all`).

`signup-start` is a shared injected screen (`SIGNUP_START_SCREEN` in `SHARED_TARGET_SCREENS`) so "Join for free" resolves for the logged-out member too, not just the splash personas. `com-activities` / `com-questions` are already shared (community sub-screens).

**Footer** — "Powered by" / "MyHealthTeam, a Swoop company" (`#626b74`, 14px), pinned to bottom. There is **no close (X)** — the panel dismisses via the scrim (`closePanel()`).

### Node refs
- Persona cards: Logged-in `7417:3712`, Logged-out "Access" `7417:3673`.
- *(Superseded)* 2026-08-03 shared panel `7299:1987` / `7299:2055` / `7299:2123` / `7287:1599`; older per-persona panels 6950:226, 6960:3, 6950:144, 6959:904.

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
