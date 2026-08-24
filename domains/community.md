# TIM Community — spec

The Community surface: the **Community Overview hub** and the feature pages it
leads to (Activity / Q&A / Groups / People / Community Values). The hub is the
**primary navigation surface** into community features — reached from the shared
panel's single **Community** tab (all personas) and the Splash Landing's "Join
the conversation" CTA. The panel *container* itself is nav chrome, specified in
[navigation.md](../foundation/navigation.md) §3. Chronological history is in
[DECISIONS.md](../DECISIONS.md). Code is the source of truth — correct this doc if
it drifts.

All screens here are **labelled placeholders** (the Figma source models the
nav/panel states, not full page layouts) — real list/detail UI is not built.

---

## Panel → Community

The slide-out panel no longer carries a 5-item Community list. As of the
2026-08-03 flat-panel redesign it has a single **Community** row (tab) that points
at the hub:

| Panel row | Screen id |
|---|---|
| Community | `community-overview` |

The hub is then the sole path into the community feature pages below.

---

## Detail screens

Distinct *detail* screens, deliberately separate from the `com-*` list pages.
Each carries a **level-up pill** stepping one level up to its parent list (the pill
mechanism and the Figma node id for each screen are spec'd in
[navigation.md](../foundation/navigation.md) §2):

| Screen | id | Levels up to |
|---|---|---|
| Group Detail | `group` | Groups (`com-groups`) |
| Question Show | `question` | Questions & Answers (`com-questions`) |
| Activity Show | `activity` | Activity (`com-activities`) |
| Someone's Member Profile | `profile` | Meet Others (`com-meet`) |

(These are the *Logged In Member* detail screens. "Someone's Member Profile" is
another member's profile, reached via Meet Others — distinct from the viewer's
own **My Profile**, which is an Account screen; see [account.md](account.md).)

---

## Community Overview (the hub)

`community-overview` (label "Community Overview") — a top-level `page` that renders
**one of four surfaces, split by persona** (all branch off `screen.id ===
"community-overview"` in `render()`):

| Persona | Surface | Render fn |
|---|---|---|
| **Visitor, Subscriber** | **Community Features** tour — Figma `184:588` / `184:441` | `renderCommunityFeatures()` |
| **Logged-Out Member** | Activity **feed**, gated (blurred + login reminder) — Figma `9:134` / `9:200` | `renderCommunityFeed(true)` |
| **Logged-In Member** | Activity **feed**, live — Figma `34:609` / `34:536` | `renderCommunityFeed(false)` |

`renderCommunityHub()` (old wireframe menu) and `renderCommunityPreview()` (the
stats/upsell preview + member-gate) are no longer reached by any persona — kept as
fallbacks / reference only.

### Visitor + Subscriber — the Community Features tour (`renderCommunityFeatures`)

The Anonymous Visitor and the Subscriber get a **"Community Features"** page (added
2026-08-14, Figma `184:588` desktop / `184:441` mobile) — a feature tour, not the
stats/upsell preview. Data-driven from `COMMUNITY_FEATURES` + `COMMUNITY_PAIR` in
`main.js`: a `Community Features` heading, then four feature cards (`.feat-card`),
then a two-card **feature pair** (`.feat-pair`). Each feature card has a magenta
category eyebrow, a DM-Serif title, a description, and a magenta line-art
illustration bleeding off the top-right over a faint blue panel:

| Card | Category | Title | → screen |
|---|---|---|---|
| Posts | POSTS | What people are talking about | `com-activities` |
| Meet Others | MEET OTHERS | Discover women like you | `com-meet` |
| Q&A | Q&A | Ask, answer, and be heard | `com-questions` |
| Groups | GROUPS | Find the circle that fits your journey | `com-groups` |

**Feature pair** (`COMMUNITY_PAIR`, Figma `212:110`) — two richer cards below the
four, **side-by-side on desktop** (`.feat-pair` row, equal width/height) and
**stacked on mobile**:

- **Ambassadors & CEMs** — "The women who provide support" + a preview of two people
  (avatar + name + role) → **View people →** (`com-meet`).
- **Community Guidelines** (eyebrow: **"Guidelines"** — the full "Community
  Guidelines" wrapped in the narrow desktop column) — "How we look after each other"
  + a four-item checklist (magenta check + rule) → **View guidelines →** (`com-values`).

No stats, lock, member-gate, or upsell. The **line-art illustrations are inline SVG**
(`COMMUNITY_FEAT_SVGS` in `main.js`, keyed by `art` name), so they travel with the JS.
The **faint blue panels stay `<img>`** and are **bottom-aligned** (bled slightly off
the card's bottom-right): `community-feat-panel.svg` on the feature cards, the taller
gradient `community-feat-panel2.svg` on the pair; the checklist check stays
`community-feat-check.svg`. Responsive: illustration top-right + full-width
description on mobile; illustration centred on the right of a 728px card on desktop
(feature cards); the pair is a **row on desktop, stacked on mobile**. All DM-Serif
titles use the landing's `--color-navy` (see [DECISIONS](../DECISIONS.md) 2026-08-14).

Reached from:

- The shared panel's single **Community** tab (all four personas — see [navigation.md](../foundation/navigation.md) §3)
- Splash Community section **"Join the conversation →"** (see [landing.md](landing.md))

### (Superseded) Preview page + member-gate (`renderCommunityPreview`)

> **Superseded (2026-08-14):** the Subscriber now gets the Community Features tour
> above, so this preview — and the member-gate modal it triggered from the locked
> Posts card — is **no longer reached by any persona**. Kept as reference (and the
> `.gate` modal styles/handlers remain in place should a gate be wired up again).

A "get a glimpse what's happening inside" marketing preview (added 2026-08-13,
Figma Community `5:2` desktop / `6:68` mobile), not the orientation menu. Data-driven
(`COMMUNITY_PREVIEW` + `renderCommunityPreview` in `main.js`). Structure:

- **Beige intro banner** (`.comm-preview__banner`, full-bleed `#fbf7f3`): DM Serif
  "Community" title, subtitle "Get a glimpse what's happening inside — then join to
  take part.", avatar stack (`community-{1,2,3}.png`) + "12,345 women in the
  community", and a dotted corner graphic.
- **Four feature preview cards** (`.comm-card`) — 80px magenta glyph icon, title,
  headline stat, one-line summary, chevron:

  | Card | Stat | Chevron | Tap → |
  |---|---|---|---|
  | Posts | [TBD] updates shared **· Member only** | lock | **member-gate modal** |
  | Questions & Answers | [TBD] questions answered | arrow | `com-questions` |
  | Groups | [TBD] groups active | arrow | `com-groups` |
  | People | [TBD] people joined | arrow | `com-meet` |

  **Posts is `memberOnly`** — magenta "· Member only" tag + a **lock** (not an arrow).
  Instead of navigating, it opens the **member sign-up gate** (`renderMemberGate`,
  `data-action="member-gate"`): a modal with a DM-Serif headline **"This is for
  members only!"** and a smaller Lato-gray subline **"Join for free to view posts."**
  (`state.gateFeature` fills the feature word — `GATE_FEATURES` map), three "Continue
  with …" options (Facebook / Google / Email — all → `signup-start`), and an "Already
  a member? **Log In**" link that is a **no-op** (`data-action="log-in"` — no login
  screen exists in this prototype). Dismissed via the top-left ✕ or the scrim (both
  `data-action="close-gate"`). While open, the document scroll is **locked**
  (`html.is-modal-open { overflow: hidden }`, toggled in `render()`), so the page
  behind doesn't scroll. Brand glyphs (`gate-facebook/google/email`) are inlined in
  `COMMUNITY_SVGS`; the email envelope is tinted the action blue (`#0F57A8`).
- **Light join upsell** (`.comm-upsell` — white/bordered, *not* the navy splash CTA):
  persona-aware, mirroring the splash home's closing card. Visitor → "You don't have
  to figure this out alone." / **Join for free** (`signup-start`); Subscriber → "Don't
  miss out! You're almost in." / **Finish up now** (`registration-step`). Both share
  the secondary **Check symptoms first** (`symptom-checker`) and the disclaimer note.

**Counts:** each stat's number is the literal **`[TBD]`** placeholder ("[TBD] updates
shared", etc.) — never a fabricated number, same rule as the member hub and the splash
community count ([DECISIONS](../DECISIONS.md) 2026-07-27). The mockup's sample numbers
(123/12/3/32) are dropped. The one-line summary under each card stays as descriptive
preview copy (not a count).

Assets — the card **glyphs are inlined** in `main.js` as `COMMUNITY_SVGS`
(`community-{posts,questions,groups,people}` + `community-{lock,arrow}`; baked-in
fills, not `currentColor`-tinted like `ICON_SVGS`). The larger **decorative graphics
stay `<img>`** (too heavy to inline): `community-banner-graphic.svg` (inside
`.comm-preview__banner-inner`, right-aligned to the 728px column) and
`community-upsell-{tr,bl}.svg` (bleed off the upsell corners). Source `.svg` files
remain in `assets/`.

### Members — the activity feed (`renderCommunityFeed`)

The Logged-Out and Logged-In members get a real **activity feed** (added 2026-08-13,
Figma logged-out `9:134`/`9:200`, logged-in `34:609`/`34:536`), data-driven from
`COMMUNITY_FEED` in `main.js`. Same reused **beige banner** as the preview (`.comm-preview__banner`,
title + avatar stack + count — no subtitle), then four sections in `.comm-feed__body`:

| Section | Cards | Layout | Card → |
|---|---|---|---|
| **Trending Posts** | 3 post cards (52px avatar, uppercase eyebrow, body) + a "Post" button | vertical list | `com-activities` |
| **Open Questions** | 3 question cards (text, "Username asked…", comment icon + count) | **carousel** | `com-questions` |
| **Groups You're In** | 3 group cards (80px icon, name, count, membership ✓, description) | vertical list | `com-groups` |
| **People Near You** | 3 person cards (80px photo, Username, count, arrow) | **carousel** | `com-meet` |

Each section ends in a "View all … →" link. The two carousels reuse the shared
carousel mechanism — `.comm-feed__scroll` is wired into `attachCarousels()` and the
`[data-carousel]` arrow handler; arrows (`.comm-feed__arrows`) show on desktop only,
mobile is swipe. The **"Post" button** and cards point at the `com-*` list pages.

**Logged-Out vs Logged-In:** the logged-out member sees the feed **gated** —
`renderCommunityFeed(true)` adds the `.comm-feed--gated` class (blurs the card
content 4px and makes it non-interactive) and prepends a **login-reminder card**
("Welcome back, Jannie123! / You're not logged in. / **Log in now**", the
`data-action="log-in"` no-op auth transition — mirrors the panel access card). The
logged-in member sees it live, no reminder. Both share all four sections' content.

**Counts** are the literal **`[TBD]`** placeholder ("[TBD] members", "[TBD] team
members", question answer count "[TBD]") — no fabricated numbers ([DECISIONS](../DECISIONS.md)
2026-07-27). The post/question/group **text** is illustrative placeholder copy
(usernames are literally "Username"), kept to show what the feed looks like.

Assets: the "Post" pencil, question comment icon, and group membership check are
inlined into `COMMUNITY_SVGS`; post/people avatars reuse `community-{1,2,3}.png`;
the reminder-card corner graphics reuse `community-upsell-{tr,bl}.svg`.

### Members (fallback) — the orientation menu (`renderCommunityHub`)

> **Superseded (2026-08-13):** members now get the activity feed above. This
> wireframe hub is retained only as a defensive fallback for an unknown persona.

**Render:** module-based, following the Splash Landing pattern — a data array
(`COMMUNITY_MODULES` in `main.js`) + a render function (`renderCommunityHub()`),
not one-off inline HTML. `render()` branches on `screen.id === "community-overview"`;
the page is excluded from `screen__body--fill` so it flows from the top.

**Modules** (5, fixed order) — each an **outlined box** (`.comm-mod`, wireframe-level,
no visual polish, no live content preview) with a title, one-line description, an
optional count **badge**, and a "View →" link:

| # | Module | Description | Badge | → screen |
|---|---|---|---|---|
| 1 | Activity Feed | See what members are sharing today | `[TBD]` | `com-activities` |
| 2 | Q&A | Ask or answer real member questions | `[TBD]` | `com-questions` |
| 3 | Groups | Join circles built around your journey | `[TBD]` | `com-groups` |
| 4 | People | Meet ambassadors, CEMs, and peers | `[TBD]` | `com-meet` |
| 5 | Community Values & Ambassador Program | How we look after each other | — | `com-values` |

Any count is the literal **`[TBD]`** placeholder — never a fabricated number (same
rule as the splash community count, [DECISIONS](../DECISIONS.md) 2026-07-27).

Because the hub is shared across all personas, its five target screens are injected
into every persona (`SHARED_TARGET_SCREENS` in `main.js`) so the links resolve
everywhere, not just in the member personas. `com-values` (Community Values &
Ambassador Program) is a new placeholder `page` added for module 5.

(The [Topic Hub](topic-hub.md) surface is **not** reached from here — its entry
point is the side panel's topic-hub rows. See [topic-hub.md](topic-hub.md).)

---

## Assets — Community panel icons

> **Superseded (2026-08-03):** the side-panel redesign removed the Community menu
> list from the panel (Community is now a single tab → Community Overview), so
> these icons are **no longer rendered**. The files remain in `assets/` but are
> currently unused. See [navigation.md](../foundation/navigation.md) §3.

From the Logged-Out Member panel `6960:3` (Community). Monochrome SVGs, tinted
magenta via CSS like the other panel icons (see [design.md](../foundation/design.md) →
icon-tinting system):

| File | Label | Source node |
|---|---|---|
| `community-stories.svg` | Posts | 7042:583 |
| `community-qa.svg` | Questions & Answers | 7042:588 |
| `community-groups.svg` | Groups | 7042:593 |
| `community-meet.svg` | Meet Others | 7042:598 |
| `community-activities.svg` | All Community | 7042:603 |
