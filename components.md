# TIM Navigation — component spec

Companion to `navigation.md` (behavior/decisions). This doc covers structure: each component's variants, content slots, states, and the Figma node ids they were pulled from, so the Figma MCP sync loop can re-check them later.

Figma file: **Global Navigation** `42yas7Q9FfwhL6xUocjEAl`.

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
- Right slot: Search icon, AI icon, **Profile** avatar (generic placeholder silhouette) + red notification badge (8px dot, top-right)
- No Join button
- Node ref: 6960:52 (Logged Out Member — Home gated)

### Variant: `member-photo` (logged-in member)
- Same as `member`, but Profile avatar shows a real photo instead of the generic placeholder, still with the badge
- Node refs: 7025:302 (Article Show), 7025:371 (Group Detail), 7031:509 (Program Detail), 7025:440 (Member Profile), 6951:734 (Question Show), 6951:531 (Activity Show), 7042:711 (Home + Dropdown)

**Open gap:** Subscriber has no top-nav frame in the source file. Prototype currently reuses `member` variant — see `navigation.md` open question.

---

## 2. Uplevel bar (back navigation)

44px tall, sits directly under the Top Nav, `0 1px 0 #dbdddf` bottom hairline shadow.

**Content slot:** `[ back-chevron icon ]  [ label ]` — label color `#0f57a8`, 16px semibold.

| Screen | Back label | Node id |
|---|---|---|
| Visitor — Topic Center | All Topics | 7082:1269 |
| Visitor — Article Show | Topic Center | 6951:800 |
| Member — Article Show | Topic | 7025:302 |
| Member — Group Detail | Groups | 7025:371 |
| Member — Program Detail | Programs | 7031:509 |
| Member — Someone's Member Profile | Meet Others | 7025:440 |
| Member — Question Show | Questions & Answers | 6951:734 |
| Member — Activity Show | Activity | 6951:531 |

No back-arrow destination logic is specified in Figma (each frame is static) — the prototype sends all of these to the persona's home screen as a simplification.

---

## 3. Slide-out Panel

Full-height overlay: `rgba(0,0,0,0.75)` scrim + 300px white panel sliding from left, 24px padding, 24px gap between sections.

**Structure:** `Logotype → Library section → [Community section] → [Access card] → Footer note`

### Content slots

Each Library / Community item carries a `data-screen` and navigates to a placeholder destination screen within the current persona (in-page state change; the panel closes on click). Item → screen id:

**Library** — bulleted icon list, section label "LIBRARY" (uppercase, `#626b74`, 14px)
- Full set (Visitor, Subscriber): HRT & Other Treatments → `lib-hrt`, Mood & Mental Health → `lib-mood`, Sleep & Insomnia → `lib-sleep`, Diet & Nutrition → `lib-diet`, Family & Relationships → `lib-family`, All Topics → `lib-all`
- Short set (Logged Out Member, Logged In Member): HRT → `lib-hrt`, Mood → `lib-mood`, Sleep → `lib-sleep`, All Topics → `lib-all`

**Community** — only present for Logged Out Member / Logged In Member. Section label "COMMUNITY".
- Stories → `com-stories`, Questions & Answers → `com-questions`, Groups → `com-groups`, Meet Others → `com-meet`, All Activities → `com-activities`

These are *list*-type destinations, deliberately separate from the existing *detail* screens (`group` = Group Detail, `question` = Question Show, `activity` = Activity Show, `profile` = Member Profile), which are left untouched.

**Access card** — only present for Visitor / Subscriber. Navy (`#2b2b68`) rounded card, `DM Serif Display` headline "Don't miss out!", body copy, white pill CTA, secondary link.
- Visitor: "Join our community to access posts, questions, groups, and meet people." → **Join for free** → "Get a preview first"
- Subscriber: "Create your account to access posts, questions, groups, and meet people." → **Finish up now** → "Get a preview first"

**Footer** — "Powered by" on line 1, "MyHealthTeam, a Swoop company" on line 2 (`#626b74`, 14px), pinned to bottom.

**Rendering notes (2026-07-24):** each Library/Community item icon sits in a light-pink circle (`--color-magenta-soft`) with the icon in magenta; section labels are 14px uppercase, normal tracking; the row rollover bleeds wider than the text (negative inline margin into the 24px panel padding). There is **no close (X)** — the panel dismisses via the scrim with a slower ease-out slide-out (`closePanel()`). The top wordmark uses `panel-logo.svg` (see Assets).

### Node refs
- Visitor panel: 6950:226
- Logged Out Member panel: 6960:3
- Logged In Member panel: 6950:144 *(metadata-only confirmation — not independently fetched, assumed identical to 6960:3 structure since both are Member-tier)*
- Subscriber panel: 6959:904

---

## 4. Profile dropdown

Anchored card, top-right under the profile avatar, 246px wide, white, `#dbdddf` border, `0 0 8px rgba(13,27,41,0.1)` shadow, 24px padding.

**Structure:** `User block → menu items → divider → Log out`

- User block: name ("Janet Smithsonian"), handle ("@jannie1234"), "View Profile" link (`#0f57a8`) → navigates to `profile` (Member Profile)
- Menu: My Health → `acct-health`, Messages → `acct-messages`, Notifications (5) → `acct-notifications`, Settings → `acct-settings` — icon + label rows
- Divider, then: Log out → navigates to the **Logged Out Member flow** (`../logged-out-member/`)

The four menu rows carry a `data-screen` and navigate to a placeholder destination screen within the persona (in-page state change; the dropdown closes on click). **Log out** is the exception: it carries `data-action="log-out"` and does a real cross-folder page navigation into the Logged Out Member flow — modelled as an auth transition alongside the Join / Log in / Finish up CTAs, not an in-page screen.

Only defined for **Logged In Member** in the source file (node 7042:711). Logged Out Member and Subscriber have a profile-style icon in the nav but no corresponding dropdown content in Figma — not built for those personas in the prototype.

---

## 5. Global footer

Added 2026-07-24 to the bottom of **every screen's scroll area** (`renderFooter()` in `main.js`). Content mirrors the Figma mobile footer (`6371:29` / `6371:139`). Two bands:

- **Bar** (white): horizontal wordmark (`logo/logotype.svg`) + headline "Making sense of menopause, together", then two link columns — About / Editorial Process / Partner with Us / Accessibility · Getting Started / Community Guidelines / Help Center / Crisis (links are non-navigating placeholders).
- **End** (grey `#f3f4f6`): legal line "Terms of Use · Privacy Policy · Cookie Policy · Health Data Policy · [icon] Your Privacy Choices · CA Notice at Collection" (the CCPA opt-out icon is `assets/footer/privacy-choices.png`), the medical disclaimer, and "© 2026 MyHealthTeam, A Swoop Company. All Rights Reserved."

Because the footer is tall, screens are now vertically scrollable: `.screen` is a flex column with a fixed nav/uplevel and a scrollable `.screen__scroll` holding the content + footer. Panel/dropdown overlays stay pinned to the phone viewport (absolute over `.screen`, don't scroll).

**Screen content** is a labelled placeholder by default. A screen may optionally carry an `image` field to show a full-bleed sample image as the body instead (rendered as `.screen__shot`, natural height, scrolls); the image must be pre-cropped to just the page content, since the prototype wraps it with its own nav + footer. None is wired currently.

---

## Assets — real (pulled from Figma 2026-07-24)

Real assets are pulled from the Figma file into `assets/` (at the repo root) and referenced by relative path from `main.js`, so every flow folder picks them up automatically.

**Icons are monochrome (black) and tinted via CSS.** The 20 icons are **inlined** in `main.js` as the `ICON_SVGS` map — each SVG normalized to `fill="currentColor"` — and rendered by `icon()` as `<span class="icon">…inline svg…</span>`. Colour comes from each context's `color`: nav = ink `#0D1B29`, Library/Community = magenta `#A440BC` (`--color-magenta`, on a `--color-magenta-soft` pink circle), back-chevron = blue `#0F57A8`, dropdown = ink. Inlining (rather than `<img>` or CSS `mask` of external files) is deliberate: CSS `mask`/`url()` refs to external SVGs are **blocked over `file://`**, so masked icons vanished when the prototype was opened directly. Inline SVG works over `file://` and still tints via `color`. The standalone `assets/icons/*.svg` files were removed (now redundant); the node-id table below is their Figma provenance.

Logos and the profile illustration stay full-colour `<img>` (load fine over `file://`). Files in `assets/logo/`: `logotype.png` (stacked nav wordmark, 3×), `logomark.png` (compact mark), `logotype.svg` (horizontal wordmark — used by the panel top and the footer). Footer CCPA icon: `assets/footer/privacy-choices.png`.

Node ids below are the exact **vector/frame node** each file was exported from (verified against the live file on the pull date — the parent-frame ranges the earlier draft listed still resolve, but these are the leaf nodes actually exported).

### Logo — `assets/logo/` (PNG, exported at 3× because the Figma nav logo is a raster image-fill, not vector)
| File | What | Source node |
|---|---|---|
| `logotype.png` | Full "this is Menopause" wordmark | 6950:211 (`Logotype` → `ThisIsMenopause_Logo_FullColor_Digital`) |
| `logomark.png` | Compact circular logomark | 7082:926 (`Logomark`, member nav instance) |

### Nav / uplevel icons — `assets/icons/` (SVG)
| File | Source node |
|---|---|
| `menu.svg` | 6875:148 |
| `search.svg` | 6875:153 |
| `ai.svg` (sparkle) | 6875:155 |
| `back.svg` (chevron) | 7084:1412 (Uplevel `Icon`, node 7082:1277) |

### Panel topic icons — from Visitor panel 6950:226 (Library)
| File | Label | Source node |
|---|---|---|
| `topic-hrt.svg` | HRT & Other Treatments | 6950:246 |
| `topic-mood.svg` | Mood & Mental Health | 6950:251 |
| `topic-sleep.svg` | Sleep & Insomnia | 6950:256 |
| `topic-diet.svg` | Diet & Nutrition | 7010:168 |
| `topic-family.svg` | Family & Relationships | 7010:166 |
| `topic-all.svg` | All Topics | 6950:261 |

### Panel community icons — from Logged-Out Member panel 6960:3 (Community)
| File | Label | Source node |
|---|---|---|
| `community-stories.svg` | Stories | 7042:583 |
| `community-qa.svg` | Questions & Answers | 7042:588 |
| `community-groups.svg` | Groups | 7042:593 |
| `community-meet.svg` | Meet Others | 7042:598 |
| `community-activities.svg` | All Activities | 7042:603 |

### Dropdown icons — from Logged-In Member dropdown 7042:711 → 7042:776
| File | Label | Source node |
|---|---|---|
| `menu-myhealth.svg` | My Health | 7042:785 |
| `menu-messages.svg` | Messages | 7042:789 |
| `menu-notifications.svg` | Notifications | 7042:793 |
| `menu-settings.svg` | Settings | 7042:797 |
| `menu-logout.svg` | Log out | 7042:806 |

### Profile — `assets/profile/` (SVG)
| File | What | Source node |
|---|---|---|
| `placeholder_profile.svg` | Generic profile illustration (magenta silhouette on light circle) | 7042:626 (from Member gated 6960:52) |

### Still placeholder / not pulled — deliberate
- **Notification badge**: still the CSS dot (`.badge`, `--color-badge`). The Figma badge (ellipse 7042:629) is a solid-fill 8px dot with a white ring — pixel-identical to the CSS version and better kept as a positioned CSS element than an `<img>`, so no file was pulled.
- **Panel close (X)**: still an inline SVG in `main.js` (`INLINE_ICONS.close`). The Figma panel has no close-icon node — it dismisses by tapping the scrim — so there is no real asset to pull; the X is a prototype-only affordance.
- **Logged-in member avatar**: uses `placeholder_profile.svg`, same as the logged-out state. The source file's `member-photo` variant shows a `Photo` image-fill, but there is no distinct curated member headshot asset to export, and `navigation.md` had already decided the stock photo should be replaced by Figma's own `placeholder_profile` illustration. The `member` vs `member-photo` nav variants still exist in the persona model.
