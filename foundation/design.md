# TIM Design — tokens, type & assets

The visual language shared across every surface: color tokens, type, spacing,
motion, the icon-tinting system, and the chrome asset provenance. Surface docs
reference this for the *system*; they keep only their own section-specific layout
and their own icon tables. Type/style sources: the **MHT Style Guide**
(`zV2gbuNONeoyeRVcFUFWeZ`, node `3941:17`) and the **Mobile_Splash_Landing** frame.
`main.css` is the source of truth for token values — correct this doc if it drifts.

---

## Color tokens

Defined in `:root` (`main.css`):

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#0f57a8` | primary blue — Join button, links, level-up label |
| `--color-primary-soft` | `#dee5f1` | soft blue — listicle & panel Explore rollover |
| `--color-navy` | `#2b2b68` | hero / factoid gradient (was the old panel access-card bg) |
| `--color-text` | `#0d1b29` | ink — body + nav icon tint |
| `--color-text-secondary` | `#626b74` | secondary/label text |
| `--color-text-muted` | `rgba(13,27,41,0.7)` | muted text |
| `--color-border` | `#dbdddf` | hairlines (nav border, dropdown border) |
| `--color-badge` | `#ff741d` | notification badge dot + Notifications chip (orange) |
| `--color-badge-soft` | `rgba(255,116,29,0.05)` | Notifications dropdown chip background |
| `--color-magenta` | `#a440bc` | Library / Community icon tint |
| `--color-magenta-soft` | `rgba(164,65,188,0.08)` | pink circle behind panel icons |
| `--color-magenta-soft-solid` | `#f8f0fa` | opaque equivalent, used for the pill rollover so nothing alpha-stacks |
| `--color-purple-light` | `#d483cf` | Factoid headline highlight |
| `--color-bg-purple-soft` | `#f6eff8` | Listicles / Community section bg |
| `--color-bg-cool` | `#fafcff` | Articles section bg |
| `--color-bg-blue-soft` | `#edf3f9` | Experts section bg |
| `--color-card-border` | `rgba(13,27,41,0.15)` | card borders |
| `--color-pill-border` | `rgba(13,27,41,0.44)` | pill borders |

---

## Type

- `--font-display`: **"DM Serif Display"** — headlines.
- `--font-body`: **"Lato"** — body/UI.

**Display scale** (Splash Landing / headlines): hero & stat **40px**, section /
factoid / CTA **32px**, footer tagline **20px**. Sizes matched per-element to the
frame.

**Letter-spacing (size-based rule):** **≥20px → -0.75px**, **≤18px → -0.25px**.

---

## Spacing, radius & motion

- `--radius-pill`: `999px` (buttons, panel row rollover); `--radius-card`: `16px`.
- **Section padding** (splash content modules): **48px** top/bottom, **12px** sides.
- **Panel:** open slide/fade `0.24s` ease-out; close (`.is-closing`) slower `0.32s`
  ease-out (`closePanel()`, removed on `animationend`). Row rollover is a flat pill
  (`--color-magenta-soft-solid`); on hover the icon circle goes transparent so it
  merges into the pill (no alpha-stacking).
- **Dropdown:** Notifications bell **wiggles periodically** (`bell-wiggle`).
- **Motion is gated:** animations are disabled under `prefers-reduced-motion`.
- Scrollbars are hidden globally (`scrollbar-width: none` + `::-webkit-scrollbar`),
  scrolling still works.

---

## Icon-tinting system

Icons come in **two forms**:

1. **Inline, CSS-tinted** — monochrome SVGs in the `ICON_SVGS` map in `main.js`
   (normalized to `fill="currentColor"`, rendered by `icon()` as
   `<span class="icon">…</span>`), tinted by each context's `color`. Used by the
   **top nav** (menu / search / AI / grid) and the **profile dropdown**, both ink
   `#0D1B29`.
2. **Pre-tinted images** (`<img src>`, colour baked in) — the **panel tabs**
   (`tab-*.svg`, ink) and **topic hubs** (`hub-*.svg`, magenta `#A440BC` glyph on a
   pale `#F6EFF8` circle), and the **level-up pill's** section icons (`up-*.svg`,
   blue `#0F57A8`).

The old currentColor-tinted Library/Community panel icons and the back-chevron were
**removed** in the 2026-08-03 panel + level-up redesigns.

Inlining (rather than `<img>` or CSS `mask` of external files) is **deliberate**:
CSS `mask`/`url()` refs to external SVGs are **blocked over `file://`**, so masked
icons vanished when the prototype was opened directly. Inline SVG works over
`file://` and still tints via `color`. The standalone `assets/icons/*.svg` files
were removed (redundant); the node-id tables (here + per surface) are their Figma
provenance.

Per-surface icon tables live with their surfaces: Library `topic-*.svg`
([library.md](../domains/library.md)), Community `community-*.svg` ([community.md](../domains/community.md)),
dropdown `menu-*.svg` ([account.md](../domains/account.md)). The chrome assets are below.

---

## Chrome assets (`assets/`, flat folder)

Real assets pulled from Figma **Global Navigation** `42yas7Q9FfwhL6xUocjEAl` into a
single flat `assets/` folder, referenced by relative path from `main.js`. Logos and
the profile illustration are full-colour `<img>` (load fine over `file://`). Node
ids are the leaf vector/frame node each file was exported from.

### Logo (PNG, 3× — the Figma nav logo is a raster image-fill, not vector)
| File | What | Source node |
|---|---|---|
| `logotype.png` | Full "this is Menopause" wordmark | 6950:211 |
| `logomark.png` | Compact circular logomark | 7082:926 |
| `logotype.svg` | Horizontal wordmark (panel top + footer) | — |

### Nav icons (inline, provenance node ids)
| File | Source node |
|---|---|
| `menu.svg` | 6875:148 |
| `search.svg` | 6875:153 |
| `ai.svg` (sparkle) | 6875:155 |

### Panel + level-up image icons (pre-tinted `<img>`, Global Navigation)
| File(s) | What | Source |
|---|---|---|
| `tab-home.svg` / `tab-resources.svg` / `tab-community.svg` | Panel tab icons (ink) | panel `7299:1987` |
| `hub-1.svg` … `hub-8.svg` | Topic-hub icons (magenta on pale circle) | panel `7299:1987` |
| `up-activity.svg` / `up-qa.svg` / `up-hub.svg` / `up-groups.svg` / `up-programs.svg` / `up-meet.svg` | Level-up pill section icons (blue) | uplevel `7294:1952` |

### Profile
| File | What | Source node |
|---|---|---|
| `placeholder_profile.svg` | Magenta silhouette on a light-magenta circle (128×128, self-contained circular avatar) | 7042:626 |

### Footer
| File | What |
|---|---|
| `privacy-choices.png` | CCPA "Your Privacy Choices" opt-out icon |

### Still placeholder / not pulled — deliberate
- **Notification badge**: CSS dot (`.badge`, `--color-badge`). The Figma badge (7042:629) is pixel-identical to the CSS version — better as a positioned element than an `<img>`.
- **Panel close (X)**: inline SVG in `main.js` (`INLINE_ICONS.close`). The Figma panel has no close node (dismiss via scrim) — a prototype-only affordance.
- **Logged-in member avatar**: reuses `placeholder_profile.svg`. The source `member-photo` variant shows a `Photo` image-fill, but there's no distinct curated headshot to export.
