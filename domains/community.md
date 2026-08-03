# TIM Community — spec

The Community surface: the Posts / Questions / Groups / Meet-Others / All-Community
list pages, the detail pages reached from them, and the Community Overview. These
are reached **through** the slide-out panel's Community section — the panel
*container* itself is nav chrome, specified in [navigation.md](../foundation/navigation.md) §3.
The Splash Landing ([landing.md](landing.md)) also deep-links into Community
Overview. Chronological history is in [DECISIONS.md](../DECISIONS.md). Code is the
source of truth — correct this doc if it drifts.

All screens here are **labelled placeholders** (the Figma source models the
nav/panel states, not full page layouts) — real list/detail UI is not built.

---

## Panel Community items → list screens

The Community section appears in the slide-out panel **only for Logged Out Member
and Logged In Member** (Visitor and Subscriber panels show Resources + an access
card instead). Section label "COMMUNITY". Each item carries a `data-screen` and
navigates in-persona (the panel closes on click):

| Item | Screen id |
|---|---|
| Posts | `com-stories` |
| Questions & Answers | `com-questions` |
| Groups | `com-groups` |
| Meet Others | `com-meet` |
| All Community | `com-activities` |

These `com-*` list pages are top-level (`type: "page"`) with **no** level-up bar —
the nav logo returns home.

> **Flagged:** the Logged Out Member panel renders these Community items even
> though that persona's home is gated — its panel already carries the member
> Resources/Community lists, so the items had to point somewhere. Left as-is.

---

## Detail screens

Distinct *detail* screens, deliberately separate from the `com-*` list pages.
Each carries a **level-up bar** stepping one level up to its parent list (the bar
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

## Community Overview

`community-overview` (label "Community Overview") — a top-level page reached from:

- The shared panel's **Community** tab (all four personas, 2026-08-03 redesign — see [navigation.md](../foundation/navigation.md) §3)
- Splash Community section **"Join the conversation →"** (see [landing.md](landing.md))

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
