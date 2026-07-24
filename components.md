# TIM Navigation — component spec

Companion to `navigation.md` (behavior/decisions). This doc covers structure: each component's variants, content slots, states, and the Figma node ids they were pulled from, so the Figma MCP sync loop can re-check them later.

Figma file: **Global Navigation** `42yas7Q9FfwhL6xUocjEAl`.

---

## 1. Top Nav

Fixed bar, 68px tall, white background, `inset 0 -1px 0 #dbdddf` hairline bottom border.

**Layout:** `[ Menu icon | Logo ]  ...  [ Search | AI | Join-button OR Profile ]`

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

**Library** — bulleted icon list, section label "LIBRARY" (uppercase, `#626b74`, 14px)
- Full set (Visitor, Subscriber): HRT & Other Treatments, Mood & Mental Health, Sleep & Insomnia, Diet & Nutrition, Family & Relationships, All Topics
- Short set (Logged Out Member, Logged In Member): HRT & Other Treatments, Mood & Mental Health, Sleep & Insomnia, All Topics

**Community** — only present for Logged Out Member / Logged In Member. Section label "COMMUNITY".
- Stories, Questions & Answers, Groups, Meet Others, All Activities

**Access card** — only present for Visitor / Subscriber. Navy (`#2b2b68`) rounded card, `DM Serif Display` headline "Don't miss out!", body copy, white pill CTA, secondary link.
- Visitor: "Join our community to access posts, questions, groups, and meet people." → **Join for free** → "Get a preview first"
- Subscriber: "Create your account to access posts, questions, groups, and meet people." → **Finish up now** → "Get a preview first"

**Footer** — "Powered by MyHealthTeam, a Swoop company" (`#626b74`, 14px), pinned to bottom.

### Node refs
- Visitor panel: 6950:226
- Logged Out Member panel: 6960:3
- Logged In Member panel: 6950:144 *(metadata-only confirmation — not independently fetched, assumed identical to 6960:3 structure since both are Member-tier)*
- Subscriber panel: 6959:904

---

## 4. Profile dropdown

Anchored card, top-right under the profile avatar, 246px wide, white, `#dbdddf` border, `0 0 8px rgba(13,27,41,0.1)` shadow, 24px padding.

**Structure:** `User block → menu items → divider → Log out`

- User block: name ("Janet Smithsonian"), handle ("@jannie1234"), "View Profile" link (`#0f57a8`)
- Menu: My Health, Messages, Notifications (5), Settings — icon + label rows
- Divider, then: Log out

Only defined for **Logged In Member** in the source file (node 7042:711). Logged Out Member and Subscriber have a profile-style icon in the nav but no corresponding dropdown content in Figma — not built for those personas in the prototype.

---

## Assets — real (pulled from Figma 2026-07-24)

Real assets are now pulled from the Figma file into `assets/` (at the repo root) and referenced by relative path from `main.js` (as `<img>`), so every flow folder picks them up automatically. Icons keep the fills Figma exported them with — nav = ink `#0D1B29`, library & community = magenta `#A440BC`, back-chevron = blue `#0F57A8`, dropdown = ink — so they are dropped in without any CSS tinting.

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
