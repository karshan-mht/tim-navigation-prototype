# TIM Library — spec

The Library surface (labelled **"Resources"** in the panel; screen ids stay `lib-*`):
the topic pages (HRT, Mood, Sleep, Diet, Family, All Resources) plus Topic Center
and Article Show. These are reached **through** the slide-out panel's Resources
section — the panel *container* itself is nav chrome, specified in
[navigation.md](../foundation/navigation.md) §3. Chronological history is in
[DECISIONS.md](../DECISIONS.md). Code is the source of truth — correct this doc if it
drifts.

All screens here are **labelled placeholders** — real topic/article UI is not
built.

---

## Panel Library items → topic screens

The Resources section appears in **every** persona's panel. Section label "RESOURCES".
Each item carries a `data-screen` and navigates in-persona (the panel closes on
click):

| Item | Screen id | In personas |
|---|---|---|
| HRT & Other Treatments | `lib-hrt` | all |
| Mood & Mental Health | `lib-mood` | all |
| Sleep & Insomnia | `lib-sleep` | all |
| Diet & Nutrition | `lib-diet` | Visitor, Subscriber (full set) |
| Family & Relationships | `lib-family` | Visitor, Subscriber (full set) |
| All Resources | `lib-all` | all |

- **Full set** (Visitor, Subscriber): all six.
- **Short set** (Logged Out Member, Logged In Member): HRT, Mood, Sleep, All
  Resources.

All `lib-*` topic pages are top-level (`type: "page"`) with **no** level-up pill —
the nav logo returns home.

---

## Browse screens

The Visitor topic-browsing chain (shared flow screens in `SPLASH_FLOW_SCREENS`).
**Topic Center** is a top-level `page` (no level-up pill — the side panel + in-page
navigation orient the user at that level). **Article Show** keeps a level-up pill
stepping one level up to the Topic Center (pill mechanism + Figma node ids in
[navigation.md](../foundation/navigation.md) §2):

| Screen | id | Level-up |
|---|---|---|
| Topic Center | `topic` | — (top-level page, no pill) |
| Article Show | `article` | Topic Center (`topic`) |

**Topic Center vs. Topic Hub:** `topic` here is the old **Topic Center** (the label
"Topic Hub" it briefly carried was reverted 2026-08-04). It's **not** the new Topic
Hub surface ([topic-hub.md](topic-hub.md)); per current product thinking Topic Center
is evolving into **Collections**.

The splash's "one Article card" opens a separate Article Show (in a collection).
That Article Show has no level-up pill and no page-title label; an in-page
**"part of a series" callout box** near the top links to its **Collection** (see
[navigation.md](../foundation/navigation.md) §2). Collection itself is a plain page.
That collection chain is a Splash Landing deep-link, documented in
[landing.md](landing.md).

---

## Assets — Library (panel topic) icons

> **Superseded (2026-08-03):** the side-panel redesign removed the per-topic
> Library menu list (and its `icon()` calls), so these icons are **no longer
> rendered**. The panel now shows generic topic-hub icons (`assets/hub-{1..8}.svg`,
> pre-tinted). The files below remain in `assets/` but are currently unused; kept
> for reference / a possible future Resources page. See
> [navigation.md](../foundation/navigation.md) §3.

From the Visitor panel `6950:226` (Library). Monochrome SVGs, tinted magenta via
CSS like the other panel icons (see [design.md](../foundation/design.md) → icon-tinting
system):

| File | Label | Source node |
|---|---|---|
| `topic-hrt.svg` | HRT & Other Treatments | 6950:246 |
| `topic-mood.svg` | Mood & Mental Health | 6950:251 |
| `topic-sleep.svg` | Sleep & Insomnia | 6950:256 |
| `topic-diet.svg` | Diet & Nutrition | 7010:168 |
| `topic-family.svg` | Family & Relationships | 7010:166 |
| `topic-all.svg` | All Resources | 6950:261 |
