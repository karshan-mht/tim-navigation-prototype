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

**Display scale** (Splash Landing / headlines): hero **52px desktop / 40px
mobile** (responsive, verified against the Splash Landing Figma file
`EWsXKakhyFLhkse035AoHX` — mobile node `4101:14`, desktop node `4101:222`; this
prototype is mobile-only, so only the 40px value is built, in
`.mod-hero__title`), stat **40px**, section / factoid / CTA **32px mobile /
36px desktop** (verified: mobile node `4113:...`/`4101:109`, desktop node
`4113:44` and siblings), footer tagline **20px**. Sizes matched per-element to
the frame.

DM Serif Display is now the standing headline treatment across the whole app —
Article, Advisors, Community Hub, and Topic Hub H1/H2 all use it too (not just
Splash Landing), at their existing sizes (Article 28/26/24px, Advisors 28/24px,
hubs 28px). This supersedes the Figma Style Guide's generic Lato SemiBold H1–H6
scale (`zV2gbuNONeoyeRVcFUFWeZ`, node `21:74`) for this product — that page
documents a Lato-based scale this app doesn't use for headings.

The actual DM Serif Display scale lives in its own specimen frame in the same
file: confirmed nodes `3942:2211` (32px / 40px line-height / -0.75px / weight
400 — matches `.mod-section-text__title`, `.mod-factoid__title`) and `3942:2192`
(28px / 36px line-height / -0.75px / weight 400 — matches `.art__title`,
`.mod-advisors__title`). Both check out exactly against the code.

**Section headers are also responsive**, mirroring the hero: mobile **32px /
40px line-height** (built, confirmed above) → desktop **36px / 44px
line-height** (confirmed via the Splash Landing file, `EWsXKakhyFLhkse035AoHX`
node `4113:44`, not yet built since this prototype is mobile-only). Same
-0.75px letter-spacing, same weight 400, same size+8 line-height pattern as
every other DM Serif Display step.

**Article / Advisors / Community Hub / Topic Hub titles are responsive too**
(this is the Landing/Article distinction to watch — Landing tiers scale by a
bigger desktop jump, this tier scales like Section Header): mobile **28px /
36px line-height** (built, confirmed against the Entry-Points file
`ugVVY70ovzigulEMouzHx7`, node `49:1947`) → desktop **32px / 40px
line-height** — per team direction; no desktop frame exists in Figma yet to
verify this against, so treat it as directional until a real frame confirms
it. Notably this desktop value (32/40) is identical to Section Header's
*mobile* value — the type scale has 5 shared steps (28, 32, 36, 40, 52) reused
across tiers/breakpoints, not 6 independent ones.

**Responsive deltas are not uniform**: Hero jumps +12px desktop→mobile
(52→40), but Section Header and this title tier both jump only +4px
(36→32, 32→28). Don't extrapolate one tier's delta onto another.

**Letter-spacing (size-based rule):** **≥20px → -0.75px**, **≤18px → -0.25px**.

---

## Responsive type scale — engineering reference

Three DM Serif Display tiers, each with a mobile size and a desktop size. **Both
are now built** — the device frame was removed and the prototype is a real
responsive product with a desktop layout at `min-width: 1024px` (see the tokens
in `main.css` `:root` + the `@media (min-width:1024px)` override):

| Tier | Mobile | Desktop | Jump | Verified? |
|---|---|---|---|---|
| Hero | 40px / 48px lh | 52px / 60px lh | +12px (+30%) | Figma (Splash Landing) |
| Section header | 32px / 40px lh | 36px / 44px lh | +4px (+12.5%) | Figma (Splash Landing, all 5 sections) |
| Article/Advisors/Hub title | 28px / 36px lh | 32px / 40px lh | +4px (+14%) | Mobile: Figma (Entry-Points). Desktop: per team direction, no frame yet |
| Sub-heading | 24px / 32px lh | 28px / 36px lh | +4px (+17%) | Mobile: Figma (Entry-Points). Desktop: per team direction, no frame yet |

Letter-spacing is `-0.75px` and weight is `400` across every cell — only size
and line-height change per breakpoint. Line-height is always size **+8px**.

**Is the uneven jump (+30% vs +12–14%) intentional and good?** Yes — this is a
standard pattern in responsive/fluid type systems (e.g. Utopia-style fluid
scales): the top-level display/hero treatment gets the most dramatic scale-up
on wide viewports because it's a branding/impact moment with room to breathe,
while secondary and tertiary headings stay closer to their mobile size so they
don't overwhelm line length or break rhythm with body copy at reading widths.
Don't "fix" this into one flat ratio — the unevenness is the correct design,
not an inconsistency.

**Implemented CSS** (this is now live in `main.css` — the `.phone` device mock
was removed and the app reflows into a real desktop layout at the `1024px`
breakpoint; the token block below drives the per-tier size/line-height swap):

```css
:root {
  /* DM Serif Display responsive scale — mobile-first, desktop overrides below */
  --display-hero-size: 40px;
  --display-hero-lh: 48px;
  --display-section-size: 32px;
  --display-section-lh: 40px;
  --display-title-size: 28px;
  --display-title-lh: 36px;
  --display-subhead-size: 24px;
  --display-subhead-lh: 32px;
  --display-tracking: -0.75px;
}

@media (min-width: 1024px) {
  :root {
    --display-hero-size: 52px;
    --display-hero-lh: 60px;
    --display-section-size: 36px;
    --display-section-lh: 44px;
    --display-title-size: 32px;
    --display-title-lh: 40px;
    --display-subhead-size: 28px;
    --display-subhead-lh: 36px;
  }
}

.mod-hero__title {
  font-size: var(--display-hero-size);
  line-height: var(--display-hero-lh);
  letter-spacing: var(--display-tracking);
}

.mod-section-text__title,
.mod-factoid__title {
  font-size: var(--display-section-size);
  line-height: var(--display-section-lh);
  letter-spacing: var(--display-tracking);
}

.art__title,
.mod-advisors__title,
.comm-hub__title,
.topic-hub__name {
  font-size: var(--display-title-size);
  line-height: var(--display-title-lh);
  letter-spacing: var(--display-tracking);
}

.art-conv__title,
.art-answered__title,
.art-keep__h,
.mod-advisors__watch-head {
  font-size: var(--display-subhead-size);
  line-height: var(--display-subhead-lh);
  letter-spacing: var(--display-tracking);
}
```

Why this shape: one `:root` override block per breakpoint (not per-selector
media queries scattered through the file) keeps the three tiers' mobile/desktop
pairs in one place, matches the existing token convention (`--color-*`,
`--radius-*`), and means adding a 4th tier later is a 2-line diff instead of
a new media query block. `1024px` is a placeholder breakpoint — swap for
whatever value the desktop frame actually targets once one exists (the Splash
Landing desktop canvas is ~1194px wide with 97px side margins).

---

## Lato / body-UI type scale

Unlike DM Serif Display, Lato (body/UI text) never had a documented scale —
sizes accumulated per-component. Auditing every `font-size` in `main.css`
outside the DM Serif Display tiers found 8 distinct values in active use. Two
were near-duplicates and have been consolidated:

**Fixed (2026-08-07):** `13px` → `14px` (7 call sites: `.mod-article__meta`,
`.collection-callout__label`, `.comm-mod__badge`, `.topic-hub__stat`,
`.footer__legal`, `.footer__link--dark`, `.footer__disclaimer` /
`.footer__copyright`) and `15px` → `16px` (2 call sites: `.comm-mod__desc`,
`.topic-hub-mod__desc`). `.launcher__section-title` keeps its `13px` — it's the
root `index.html` launcher, explicitly "rig chrome, not part of the design
system," same exemption as the entry-point mocks.

**Resulting scale** (6 sizes, down from 8):

| Size | Role | Matches Figma Typography (node `21:74`)? | Example components |
|---|---|---|---|
| 12px | Note / fine print | Yes — "Note", 18px lh, -0.25px | `.mod-article__eyebrow`, `.topic-hub-mod__note`, `.topic-hub-mod__soon` |
| 14px | Caption | Yes — "Caption", 20px lh, -0.25px | `.mod-article__meta`, `.footer__legal`, `.art__byline`, badges/pills (post-fix) |
| 16px | Body Small | Yes — "Body Small", 22px lh, -0.25px | `.mod-expert-card__role`, `.topic-hub__desc`, descriptions (post-fix) |
| 18px | Body Large | Yes — "Body Large", 24px lh, -0.25px | `.mod-cta-card__sub`, `.art__lede p`, most paragraph/button text |
| 20px | Card/component title | No — extends beyond the base Figma Body scale | `.mod-checker-card__title`, `.mod-listicle-card__title`, `.mod-view-all-link` |
| 22px | Emphasis title | No | `.welcome-card__title`, `.art-note__title` |
| 24px | Quote (Lato SemiBold) | No — **same pixel value as the DM Serif Display 24px tier, different font/weight** | `.mod-quote-card__text` only |

Base sizes (12/14/16/18) map directly onto the Lato Body scale already
documented in the Figma Style Guide's Typography page (`zV2gbuNONeoyeRVcFUFWeZ`,
node `21:74` — Note / Caption / Body Small / Body Large), just never
cross-referenced here before now. 20/22/24 are component-specific extensions
beyond that base scale, not yet formalized as named Figma text styles.

**24px is overloaded — mitigated via naming, not by changing either value.**
`.mod-quote-card__text` (Lato, weight 600, line-height `--quote-lh` 30px —
tightened from an approximate `1.35` ratio to match the Figma Lato "Headline"
24px swatch exactly, node `40:260`) and a fourth DM Serif Display tier — a "sub-heading" size used for `.art-conv__title`,
`.art-answered__title`, `.art-keep__h`, and `.mod-advisors__watch-head`
(weight 400, line-height 32px, same size+8 rule as every other DM Serif
Display tier) — happen to share the same font-size number but are visually and
semantically unrelated. Both values are correct on their own (this sub-heading
tier is now Figma-confirmed too — see below), so the fix isn't to change
either number, just to stop referring to "24px" as if it were one thing.
`main.css` now encodes this with two separately-named tokens instead of a
shared bare literal: `--display-subhead-size` / `--display-subhead-lh` for the
DM Serif tier, `--quote-size` for the Lato quote. Fixing
`.mod-advisors__watch-head`'s line-height to use the shared token also caught
a real bug in the process — it was hardcoded to `40px` instead of the correct
`32px` (size+8), inconsistent with the other three components in this tier.

**DM Serif Display sub-heading tier (24px), now Figma-confirmed:** verified
against the Entry-Points file (`ugVVY70ovzigulEMouzHx7`) — node `49:1845`
("Join the conversation"), `49:1855` ("Menopause, answered"), `49:1890`
("Keep Reading") — all 24px / 32px line-height / -0.75px / weight 400. This
tier isn't in the Style Guide's generic DM Serif specimen frame (which only
has 28px and 32px), but it's confirmed directly against the real Article
screen, same as the Article title tier was. `.mod-advisors__watch-head`
("Watch Now") uses the same tier by convention; not independently verified
since Advisors isn't part of this file, but there's no reason to expect it
differs.

**This tier is responsive too:** mobile 24px / 32px line-height (built,
Figma-confirmed above) → desktop 28px / 36px line-height — per team direction,
same unverified status as the Title tier's desktop value (no desktop frame
exists to check it against). Notably this desktop value (28/36) is identical
to the Title tier's *mobile* value — another instance of the shared-steps
pattern (the full DM Serif Display scale is 24, 28, 32, 36, 40, 52 — six
steps reused across four tiers × two breakpoints, not eight independent
pairs).

**Dead code, found and removed (2026-08-07):** `.mod-section` /
`.mod-section__title` were never referenced in `main.js` — the real, in-use
component is `.mod-section-text` / `.mod-section-text__title` (with "-text-"),
likely a leftover from a rename. Removed from `main.css`.

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
   (normalized to `fill="currentColor"`), tinted by each context's `color`. Used by
   the **top nav** (menu / search / AI / grid) and **profile dropdown** (ink
   `#0D1B29`); the **level-up pill's** section icons (blue `#0F57A8` via the pill's
   `color`, incl. the article's `derm` icon); and the **topic-hub** icons (magenta
   `#A440BC` — the pale `#F6EFF8` circle behind them is drawn in CSS by
   `.panel__hub-icon`, not baked into the SVG). The nav/dropdown icons render via
   `icon()` as `<span class="icon">…</span>`; the pill and hub icons are inlined
   directly into their own wrappers.
2. **Pre-tinted images** (`<img src>`, colour baked in) — only the **panel tabs**
   (`tab-*.svg`, ink) now. The `up-*` / `hub-*` icons were migrated to form 1 on
   2026-08-05 (glyphs only, no baked circle) and their standalone files removed.

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
| `logomark.svg` | Compact circular logomark (vector) | 7082:926 |
| `logotype.svg` | Horizontal wordmark (panel top + footer) | — |

### Nav icons (inline, provenance node ids)
| File | Source node |
|---|---|
| `menu.svg` | 6875:148 |
| `search.svg` | 6875:153 |
| `ai.svg` (sparkle) | 6875:155 |

### Panel tab icons (pre-tinted `<img>`, Global Navigation)
| File(s) | What | Source |
|---|---|---|
| `tab-home.svg` / `tab-resources.svg` / `tab-community.svg` | Panel tab icons (ink) | panel `7299:1987` |

The **topic-hub** (`hub-1…8`) and **level-up** (`up-activity` / `up-qa` / `up-hub` /
`up-groups` / `up-programs` / `up-meet`) glyphs are now **inline** in `ICON_SVGS`
(`fill="currentColor"`, no baked circle — 2026-08-05); their standalone files were
removed. Figma provenance: hubs panel `7299:1987`, level-up icons uplevel
`7294:1952`. The article's `derm` icon is inline too (Figma **Articles** file).

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
