# TIM Advisors — spec

The **Medical Advisory Committee** page — the intro, the five advisor cards, and a
"Watch Now" clip. Reached two ways: the landing's Experts "View all advisors →"
(see [landing.md](landing.md)) and the **global footer's "Medical Advisors"** link
(see [navigation.md](../foundation/navigation.md) §5) — the latter makes it reachable
from every persona. This doc owns the page itself. Built from the separate
Figma file **Medical Advisors** (`Zkiv6o4d7eyQOLAvwjVYTy`, mobile `2:43`).
Chronological history is in [DECISIONS.md](../DECISIONS.md). Code
(`../main.js`, `../main.css`) is the source of truth — correct this doc if it drifts.

---

## Screen & rendering

- `advisors` screen: top-level `type: "page"` (no level-up bar). In the splash
  personas (Visitor, Subscriber) via `SPLASH_FLOW_SCREENS`, and injected into the
  member personas too (`SHARED_TARGET_SCREENS`) so the footer link resolves for all.
- `render()` branches on `screen.id === "advisors"` → `renderAdvisors()`; the page
  flows at natural height (excluded from `screen__body--fill`).
- Content data is the `ADVISORS` array in `main.js` (real names/roles/affiliations/
  bios from the frame).

## Sections

- **Intro** — DM Serif title (28px, navy `#2b2b68`), a bold lede, a body paragraph,
  and an italic closing line, then a hairline divider (`#e5e5e5`).
- **Committee** — the five advisors, each a card: 96px round **photo**, name
  (20px semibold ink), role (16px magenta), affiliation (14px grey), bio (16px),
  and a non-navigating **"Read full bio →"** placeholder (no bio-detail page
  exists). Cards separated by hairline dividers.
- **Watch now** — a DM Serif "Watch Now" headline (24px, navy `#2b2b68`,
  title-case), a **video placeholder** (218px, rounded, the neutral-grey
  diagonal-hatch pattern used elsewhere — a real thumbnail asset is pending), and
  the clip title in grey (16px).

## The five advisors (card order)

| # | Name | Role | Affiliation |
|---|---|---|---|
| 1 | Christy James Guepet, M.D., FACOG, FPMRS | OB-GYN | Southern Women’s Specialists |
| 2 | Cindi Rauert Lanners, PT, DPT | Physical Therapist | University of Colorado School of Physical Therapy |
| 3 | Angela McCool-Pearson, M.D. | OB-GYN | Southern Women’s Specialists |
| 4 | Chevon Rariy, M.D. | Endocrinologist | Visana Health |
| 5 | Lauren Tetenbaum, LCSW, JD, PMH-C, MSCP | Licensed Clinical Social Worker | Menopause Society Certified Practitioner |

## Assets

**Real advisor headshots** exported from Figma into `assets/advisor-{1..5}.jpg`
(index = card order above), shown as 96px circles (`object-fit: cover`). The
mapping was verified against the committee render so no photo is paired with the
wrong person. The Watch card has no asset yet (placeholder pattern in the
meantime).

## Pending / placeholders

- **"Read full bio →"** — non-navigating (no per-advisor bio page).
- **Watch card** — diagonal-hatch placeholder until a real video thumbnail asset
  is added.
