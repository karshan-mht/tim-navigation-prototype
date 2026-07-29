# TIM Account — spec

The Account surface: the **profile dropdown** menu and the destination screens it
opens (My Health / Messages / Notifications / Settings) plus the member's own
**My Profile**. The dropdown is triggered from the top-nav profile avatar — that
trigger is nav chrome, spec'd in [navigation.md](navigation.md) §1 (Top Nav) /
Interactions. **Log out** lives here structurally but is an auth transition — see
[onboarding.md](onboarding.md). Chronological history is in [DECISIONS.md](../DECISIONS.md). Code
is the source of truth — correct this doc if it drifts.

All destination screens here are **labelled placeholders** — real UI is not built.

---

## Profile dropdown

Anchored card, top-right under the profile avatar, 246px wide, white, `#dbdddf`
border, `0 0 8px rgba(13,27,41,0.1)` shadow, 24px padding. The user block uses
28px line rows for unhurried spacing at the top (matches Figma).

**Structure:** `User block → divider → Notifications · My Health · Messages · Settings → divider → Log out`

- **User block:** name ("Janet Smithsonian"), handle ("@jannie1234"), "View Profile" link (`#0f57a8`) → navigates to the member's own **My Profile** (`my-profile`, via `data-action="go-profile"`) — a page with **no** level-up bar, distinct from "Someone's Member Profile" reached via Meet Others (see [community.md](community.md)).
- Top divider (sits **above** Notifications) separates the user block from the whole menu.
- **Notifications (5)** → `acct-notifications` — leads the menu so the unread count reads first; its bell icon **wiggles periodically** to draw the eye (`bell-wiggle`, disabled under `prefers-reduced-motion`).
- Then: My Health → `acct-health`, Messages → `acct-messages`, Settings → `acct-settings`.
- Bottom divider (sits **above** Log out), then: **Log out** → currently a **no-op** (`data-action="log-out"` with no handler — auth transition not wired; see [onboarding.md](onboarding.md)). Its icon is rotated 90° so the arrow points **right** (matches Figma).

The `acct-*` rows carry a `data-screen` and navigate to a placeholder destination
screen within the persona (in-page state change; the dropdown closes on click).
**Log out** is the exception (see above).

**Persona availability:** only defined for **Logged In Member** in the source file
(node 7042:711). Logged Out Member has a profile-style icon in the nav but no
corresponding dropdown content in Figma — not built. Subscriber uses the Visitor
nav (Join button, no profile icon), so it has no dropdown either.

---

## Destination screens

| Screen | id | Reached from |
|---|---|---|
| My Health | `acct-health` | dropdown |
| Messages | `acct-messages` | dropdown |
| Notifications | `acct-notifications` | dropdown |
| Settings | `acct-settings` | dropdown |
| My Profile | `my-profile` | dropdown "View Profile" (`go-profile`) |

All `acct-*` rows are top-level `page`s with **no** level-up bar (the nav logo
returns home), as is `my-profile`. **Log out** is not a screen — it's an auth
no-op (see [onboarding.md](onboarding.md)).

---

## Assets — dropdown icons

From the Logged-In Member dropdown `7042:711 → 7042:776`. Monochrome SVGs, tinted
ink via CSS (see [design.md](design.md) → icon-tinting system):

| File | Label | Source node |
|---|---|---|
| `menu-myhealth.svg` | My Health | 7042:785 |
| `menu-messages.svg` | Messages | 7042:789 |
| `menu-notifications.svg` | Notifications | 7042:793 |
| `menu-settings.svg` | Settings | 7042:797 |
| `menu-logout.svg` | Log out | 7042:806 |
