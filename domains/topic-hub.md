# TIM Topic Hub — spec

A **Topic Hub** is a single destination that aggregates content **across feature
types** — Q&A, conversations, groups/people, resources — for one specific, popular
patient concern (e.g. "Newly Diagnosed," "Fatigue & Energy Management"). Up to **8
per site**. The point: a member can explore one concern in one place instead of
bouncing between the Community feature pages and the Library. Chronological history
is in [DECISIONS.md](../DECISIONS.md). Code (`../main.js`, `../main.css`) is the
source of truth — correct this doc if it drifts.

> **Current state:** there is **one generic Topic Hub** (id `topic-hub`, titled
> "Topic Hub") used as the reusable template that every panel topic-hub row opens.
> The real per-concern hubs (their names + which ~8 concerns) come later; the
> render + data model already support multiple entries in `TOPIC_HUBS`.

> **Not the old `topic` screen.** Topic Hubs are a **brand-new surface**. Do not
> confuse them with the existing `topic` screen — the old **"Topic Center"** in
> [library.md](library.md), where Article Show levels up. The two no longer share a
> name (the "Topic Hub" label `topic` briefly carried was reverted to "Topic
> Center" 2026-08-04), and the panel's topic-hub rows open **this** surface
> (`topic-hub`), not `topic`. Per current product thinking Topic Center is evolving
> into **Collections** (not into Topic Hubs) — folding it fully into Collections is
> the one remaining piece, tracked in [DECISIONS.md](../DECISIONS.md) → "on the horizon."
>
> **Doc placement note:** the request named `foundation/topic-hub.md`, but every
> product *surface* lives in `domains/` (foundation/ is system + behaviour only),
> so this doc sits alongside its cited templates `community.md` / `library.md`.

Vs. the [Community Overview](community.md) hub: that's a lightweight *orientation
menu* (plain link-out boxes, no previews). A Topic Hub is richer — its modules are
meant to show **content previews**, closer in spirit to the Splash Landing modules.

---

## Screen & rendering

- **Templated, data-driven.** Hubs are entries in the `TOPIC_HUBS` array in
  `main.js`; `TOPIC_HUB_PAGES` maps each to a screen `{ id, label, type: "page",
  title, topicHub }`. Adding a hub = adding a data entry, **not** a one-off screen
  (same "data array + render function" convention as `renderModules()`).
- `render()` branches on `screen.topicHub` → `renderTopicHub(hub)`; the page is
  excluded from `screen__body--fill` so it flows from the top.
- `type: "page"` — **no level-up pill** (a top-level destination, like the other
  `com-*` / hub pages; the nav logo returns home).
- Each hub's screen is injected into **every** persona (`SHARED_TARGET_SCREENS`)
  so it (and its module targets) resolve everywhere.

## Structure

**Header** — topic **name** (DM Serif, navy), a one-line **description**, and a
**stat** pill. The stat is always the literal **`[TBD]`** placeholder
(`"[TBD]% of community discussion this month"`) — never a fabricated number (same
rule as the splash community count, [DECISIONS](../DECISIONS.md) 2026-07-27).

**Modules** — outlined boxes (`.topic-hub-mod`, same wireframe treatment as the
community hub). Each has a title and a one-line description. The **whole card is
tappable** (navigates via `data-screen`) — there is no separate link/arrow
affordance; press feedback comes from `:active` (this is a mobile prototype —
tap/press, not a desktop rollover). Modules flagged `preview: true` add a
**content-preview affordance**: skeleton placeholder rows (grey bars) standing in
for previewed items — **no fabricated posts/questions**. A module can be `disabled`
(dead state, no destination yet — non-tappable, no press feedback) or carry a
`note` (a small italic caveat).

---

## The generic hub (current placeholder)

One generic hub (`topic-hub`, titled "Topic Hub") stands in for every concern for
now. Five modules, fixed order:

| # | Module | Description | Preview? | → screen |
|---|---|---|---|---|
| 1 | Top Q&A | Most helpful answered questions | yes | `com-questions` ¹ |
| 2 | Active Conversations | Relevant peer discussions | yes | `com-activities` |
| 3 | Expert Resources | Curated, medically-reviewed articles | yes | `lib-all` ² |
| 4 | Groups & People | Circles and members walking the same path | no | `com-groups` |
| 5 | Action-Oriented Tools | Guides, checklists, step-by-step programs | no | **none** ³ |

¹ **Known placeholder limitation:** no topic-filtering exists yet, so Top Q&A
points at the general Q&A page rather than a topic-filtered view. Shown as an
italic note on the card.

² Expert Resources is a *curated set of articles* (plural), so it points at **All
Resources** (`lib-all`) — the brief's fallback "if no single article fits". A
single `article` (Article Show) detail didn't fit, and `lib-all` resolves in every
persona.

³ **Dead/disabled state:** no tools surface exists yet, so this module is a
non-interactive dashed box with a "Coming soon" chip — no destination.

---

## Reachability

The entry point is the **side panel**: each of the panel's topic-hub rows (under
the Home / Resources / Community tabs) opens the generic Topic Hub
(`data-screen="topic-hub"` — see [navigation.md](../foundation/navigation.md) §3).
Conceptually these sit in the **Resources** side of the panel. For now every row
opens the same generic hub; wiring each row to its own per-concern hub (and the
real hub names) is later work.

---

## Fidelity / placeholders

Wireframe-level only — outlined boxes, no visual polish, **no fabricated stats,
counts, or content previews**. The stat is `[TBD]`; preview modules show skeleton
rows, not real questions/posts/photos. There is no Figma source node yet — this is
a from-the-brief prototype of a new surface.
