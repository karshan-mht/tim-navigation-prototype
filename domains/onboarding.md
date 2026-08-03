# TIM Onboarding — spec

The onboarding surface: the start of account creation — **Sign Up Start** and
**Registration Step** — and every CTA that opens them, plus the auth transitions
that are deliberately *not* wired yet. These CTAs originate on other surfaces (the
splash in [landing.md](landing.md), the nav Join button in
[navigation.md](../foundation/navigation.md)), but the destination
pages and their behavior are specified here. Chronological history is in
[DECISIONS.md](../DECISIONS.md). Code is the source of truth — correct this doc if it
drifts.

**Code source of truth:** the two screens are declared in `main.js` —
`signup-start` in `SPLASH_FLOW_SCREENS` (~`main.js:142`) and `registration-step`
appended to the Subscriber persona only (~`main.js:203`). Chromeless rendering is
the `screen.chromeless` branch of `render()` (~`main.js:571`); the ✕ runs the
`close-flow` action (~`main.js:721`), returning to `state.prevScreenId`
(remembered on every navigation, ~`main.js:681`).

---

## Screens

Both are `type: "page"`, `chromeless: true` — they render with **no top nav, no
level-up bar, no footer**; just an **✕** in the top-left (`.flow-close`,
`data-action="close-flow"`) that closes **back to the page they opened from**
(`state.prevScreenId`).

| Screen id | Label | Available to |
|---|---|---|
| `signup-start` | **Sign Up Start** | Visitor **and** Subscriber (part of the shared `SPLASH_FLOW_SCREENS`) |
| `registration-step` | **Registration Step** | **Subscriber only** (appended to that persona's `screens`) — pending a fuller subscriber-specific design |

Both are labelled placeholder pages, consistent with the rest of the prototype —
real form UI is not built.

---

## Entry points (as wired)

Every entry point uses `data-screen` (a real in-persona navigation to the
chromeless page), **not** a cross-folder jump:

| Trigger | Persona(s) | Opens |
|---|---|---|
| Nav **Join** pill (`visitor` nav variant) | Visitor, Subscriber | `signup-start` |
| Splash Community **Join for free** | Visitor, Subscriber | `signup-start` |

> **Note (2026-08-03 shared-panel redesign):** the panel's **Join for free** and
> **Finish up now** access cards were removed. `signup-start` is still reached via
> the nav Join pill and the splash. **`registration-step` currently has no UI entry
> point** (its only trigger was the panel's "Finish up now" card) — the screen is
> kept for the pending subscriber-specific design. Flagged, not deleted.

---

## Auth transitions — intentionally not wired

Two CTAs *look* like auth transitions but are **currently no-ops** — they carry a
`data-action` that has **no matching case** in the click handler, so nothing
happens (`main.js:732–734`: "Cross-flow auth transitions … are intentionally
no-ops in this prototype — these CTAs no longer jump to another persona's page;
each flow stays self-contained").

| CTA | Where | Action | Behavior today |
|---|---|---|---|
| **Log in now** | Logged Out Member gated-home welcome card | `data-action="log-in"` | no-op |
| **Log out** | Logged In Member profile dropdown | `data-action="log-out"` | no-op |

This **supersedes** the earlier (2026-07-24) design in which Log out did a real
cross-folder navigation into the `../logged-out-member/` flow — see
[DECISIONS.md](../DECISIONS.md). A real implementation would replace these no-ops
with an actual auth flow rather than a client-side folder swap; that decision is
still open ("on the horizon" in [DECISIONS.md](../DECISIONS.md)).
