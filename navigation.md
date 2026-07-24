# TIM Navigation — behavior spec & decisions log

Source: Figma **Global Navigation** file `42yas7Q9FfwhL6xUocjEAl`.
Prototype: plain HTML/CSS/JS in this repo (`index.html`, `main.css`, `main.js`), no build step.

This doc tracks *behavior and decisions*. Component-level structure (props, states, node ids) lives in `components.md`. Code is source of truth if the two ever disagree — correct this doc, don't erase the stale entry.

---

## Personas

Four auth states, each with its own nav treatment and panel content:

| Persona | Nav treatment | Panel content | Has profile dropdown? |
|---|---|---|---|
| **Anonymous Visitor** | Full logotype + "Join" button, no profile icon | Library (6 topics) + "Join for free" access card | No |
| **Logged Out Member** | Logomark + generic profile icon (no photo), no Join button | Library (4 topics, no upsell) + Community (5 items) | Yes, but not exercised in prototype (no logged-out-specific dropdown content in source file) |
| **Logged In Member** | Logomark + profile photo | Library (4 topics) + Community (5 items), no upsell | Yes — user card + My Health / Messages / Notifications / Settings / Log out |
| **Subscriber** | *Assumed* same as Member (source file has no Subscriber top-nav frame) | Library (6 topics, full set) + "Finish up now" access card | Not defined in source |

**Open question:** should Subscriber have its own top-nav frame (e.g. a different CTA than Join/profile), or is reusing Member's nav correct? Flagging rather than deciding — no Subscriber tabs/uplevel frame exists in the Figma file to confirm either way.

---

## Screens per persona

The screens marked **(panel dest.)** / **(dropdown dest.)** are prototype-added
list/section landing views that the slide-out Panel and profile Dropdown items
navigate to. They aren't distinct Figma frames (the source file only models the
nav/panel/dropdown states, not full pages) — they're placeholder screens so the
menu items lead *somewhere* instead of being inert. All are `uplevel`-type with a
back bar labelled "Home" that returns to the persona's home screen. The Library
destinations are shared across personas (`lib-*` ids); Community are `com-*`;
Dropdown/account are `acct-*`. See `components.md` §3/§4 for the item→screen map.

**Anonymous Visitor**
- Splash Landing (tabs nav)
- Topic Center (uplevel, back label "All Topics")
- Article Show (uplevel, back label "Topic Center")
- Library topics (panel dest., uplevel, back "Home"): HRT & Other Treatments `lib-hrt`, Mood & Mental Health `lib-mood`, Sleep & Insomnia `lib-sleep`, Diet & Nutrition `lib-diet`, Family & Relationships `lib-family`, All Topics `lib-all`

**Logged Out Member**
- Home as a hub — gated (tabs nav, welcome card: "Welcome back, Jannie123! You're not logged in." → "Log in now")
- Library topics (panel dest.): HRT `lib-hrt`, Mood `lib-mood`, Sleep `lib-sleep`, All Topics `lib-all`
- Community (panel dest.): Stories `com-stories`, Questions & Answers `com-questions`, Groups `com-groups`, Meet Others `com-meet`, All Activities `com-activities`

**Logged In Member**
- Home as a Hub (tabs nav, photo profile)
- Home as a Hub with account dropdown open
- Article Show (uplevel, back label "Topic")
- Group Detail (uplevel, back label "Groups")
- Program Detail (uplevel, back label "Programs")
- Someone's Member Profile (uplevel, back label "Meet Others")
- Question Show (uplevel, back label "Questions & Answers")
- Activity Show (uplevel, back label "Activity")
- Library topics (panel dest.): HRT `lib-hrt`, Mood `lib-mood`, Sleep `lib-sleep`, All Topics `lib-all`
- Community (panel dest.): Stories `com-stories`, Questions & Answers `com-questions`, Groups `com-groups`, Meet Others `com-meet`, All Activities `com-activities`
- Account (dropdown dest.): My Health `acct-health`, Messages `acct-messages`, Notifications `acct-notifications`, Settings `acct-settings` (Log out is not a screen — it navigates to the Logged Out Member flow)

**Subscriber**
- Panel only defined in source file — no home/tabs screen exists to switch to. Prototype fabricates a placeholder home screen and labels it as assumed.
- Library topics (panel dest.): HRT `lib-hrt`, Mood `lib-mood`, Sleep `lib-sleep`, Diet `lib-diet`, Family `lib-family`, All Topics `lib-all`

Note: the underlying content behind each nav (article body, profile grid, etc.) is placeholder in the *Figma file itself* — those frames just show a greyed-out screenshot placeholder. The real design surface in this file is the nav/panel/dropdown states, not full page layouts. The prototype reflects that: content areas are intentionally blank/labeled, not fleshed out. The panel/dropdown destination screens above follow the same convention — they're labelled placeholders, not fleshed-out list pages.

---

## Interactions (as built)

- **Hamburger (☰)** → opens the slide-out Panel for the current persona. Tapping the overlay (not the panel surface) closes it with a slower ease-out slide-out animation (`closePanel()`).
- **Nav logotype / logomark** → returns to the persona's home screen (Splash Landing for Visitor, Home as a Hub for Members/Subscriber). In-page `go-home`.
- **Panel items** (Library / Community) → navigate to that item's destination screen (an in-page state change within the same persona) and close the panel. See "Screens per persona" for the id each item points to.
- **Profile avatar** (Member/Subscriber personas only) → opens the account Dropdown. Tapping outside closes it.
- **Dropdown items** (My Health / Messages / Notifications / Settings — Logged In Member) → navigate to that item's destination screen and close the dropdown (in-persona). **Log out** is the exception: it's an auth transition, so it does a real page navigation into the Logged Out Member flow (see CTA buttons below), not an in-page screen switch.
- **Uplevel back bar** → returns to that persona's first/home screen. (Source file doesn't define true nested back-stacks — this is a reasonable simplification, not a Figma-confirmed behavior.)
- **CTA buttons** ("Join", "Log in now", "Finish up now") → jump to Logged In Member → Home, and **"Log out"** (dropdown) → jump to Logged Out Member. These dramatize the intended auth transitions via a real cross-folder page navigation; it is a prototype convenience, not something specified in Figma. Real implementation would presumably go through actual auth, not a client-side folder swap.
- **"View Profile"** in the dropdown → jumps to the Member Profile screen if available for that persona.

---

## Decisions log

- **2026-07-24** — Built as plain HTML/CSS/JS to match `tim-splash-landing` conventions (no framework, no build step, easy Rails ERB port later).
- **2026-07-24** — Chose to represent Panel/Dropdown as *interactive overlays* triggered from any screen, rather than as separate static tabs, since that's how they actually function (overlay on top of a base screen), even though Figma models them as separate frames.
- **2026-07-24** — Subscriber nav styled like Member's, flagged as an assumption (see Open question above) rather than invented independently.
- **2026-07-24** — Icons and logo are placeholders (generic inline SVG set / text wordmark), not Figma exports, because the MCP asset URLs expire after 7 days and would break a prototype meant to last. Real asset pull-in is tracked as a follow-up (see `components.md` → Assets).
- **2026-07-24** — Profile photo uses a stock placeholder image; Figma's own `placeholder_profile` illustration should replace it once assets are pulled locally.
- **2026-07-24** — Pulled real assets from Figma (`42yas7Q9FfwhL6xUocjEAl`) into `assets/` and swapped out the placeholders: the inline-SVG icon set, the text-wordmark logo/logomark, and the hotlinked Unsplash profile photo are all gone. `app.js` now emits `<img>` tags pointing at local files (`../assets/...`); `main.css` sizes them instead of styling text logos or tinting inline SVGs. Re-verified the documented node ids against the live file first — they all still resolve and match `components.md`, so no drift correction was needed. Icons keep the fills Figma exported (nav ink, library/community magenta, back-chevron blue). Three deliberate exceptions, all logged in `components.md` → Assets: the notification badge stays a CSS dot, the panel close (X) stays inline SVG (no Figma node for it), and the logged-in member avatar reuses `placeholder_profile` (no distinct headshot asset in source — matches the 2026-07-24 stock-photo decision below). Logo delivered as 3× PNG since the Figma nav logo is a raster image-fill, not vector.
- **2026-07-24** — Restructured from one combined `index.html` (with a persona switcher) into one folder per persona (`/visitor/`, `/logged-out-member/`, `/logged-in-member/`, `/subscriber/`), each with its own `index.html` locked to that persona. Reason: individual flows need to be shared as standalone starting points without exposing the others. `NOTES.md` is retired — its node-id table now lives in `components.md`, and its "how it works" section is folded into this doc. Shared CSS/JS moved into standalone files under `/shared/` (later flattened to the repo root — see next entry). The root `index.html` is now a static picker linking out to each flow (not itself interactive). CTA buttons ("Join", "Log in now", "Finish up now") now do a real page navigation to `/logged-in-member/` instead of an in-page persona swap.
- **2026-07-24** — Flattened the `/shared/` folder into the repo root to keep things lean: `main.css`, `app.js`, and `assets/` now sit at the top level. Each flow page references `../main.css` / `../app.js`, and `app.js`'s asset base became `../assets`. No behavior change — purely a path/layout move.
- **2026-07-24** — Renamed `app.js` → `main.js` so the two shared source files read as a matched pair (`main.css` / `main.js`); flow pages now load `../main.js`. Also added a `README.md` and pruned two CSS rules left dead by the asset swap (`.icon-btn svg`, `.profile-btn svg` — everything in the nav is now an `<img>`).
- **2026-07-24** — Removed the rig scaffolding from each flow page: the screen-tab switcher (`#screenTabs`) and the caption under the phone (`#stageHint`) are gone, along with their now-dead CSS and the `renderScreenTabs()` / hint code in `main.js`. Screen-to-screen navigation is meant to happen via elements linked *inside* the prototype instead — the `[data-screen="<id>"]` click handler is kept for exactly that (any nav/panel element can carry `data-screen` to jump to a screen). Each flow page is now just its persona `<h1>` label + the 393×852 phone (the label is dropped in the next entry). Also swept out older dead rig CSS this exposed (`.rig-header*`, `.persona-tabs`, `.tab-btn*`, `.rig-footer*`).
- **2026-07-24** — Dropped the persona `<h1>` header from each flow page too, to keep the page from scrolling vertically — a flow page is now just the 393×852 phone in a flush, centered `.stage` (padding removed). Removed the `.flow-header` CSS with it. Note: at full 393×852 the device still needs a viewport ≳860px tall to sit entirely scroll-free; below that the page scrolls rather than clipping the phone (the ≤430px-wide mobile media query already switches the phone to `100vh`).
- **2026-07-24** — Added scale-to-fit (`fitPhone()` in `main.js`) so the device never causes a vertical scroll regardless of window height. When the viewport is shorter/narrower than the phone, the whole 393×852 device is scaled down with a `transform: scale()` (capped at 1× — it never upscales past the intended size), and the transform's leftover full-size layout box is collapsed with a negative `margin-bottom` so it doesn't reserve scroll height. Runs on load and on `resize`; skipped at ≤430px width, where the media query full-bleeds the phone instead. Net effect: the device renders at true 393×852 when there's room and shrinks proportionally to fit otherwise — no vertical scroll either way. This supersedes the "needs ≳860px tall" caveat in the entry above.
- **2026-07-24** — Centered the device both vertically and horizontally instead of flush-to-top: `.stage` is now a full-viewport (`min-height: 100vh`) flex box that centers its child, and `fitPhone()` scales from `center center` with the collapsed layout box's negative margins split evenly on all four sides, so the scaled device sits dead-center at any window size (with no scroll either way).
- **2026-07-24** — Wired the Panel (Library + Community) and Dropdown (account) items to actually navigate instead of being inert. Each navigating item in `TOPIC_ITEMS` / `TOPIC_ITEMS_MEMBER` / `COMMUNITY_ITEMS` / `DROPDOWN_MENU` carries a `screenId`, rendered as `data-screen`, and the existing `[data-screen]` click handler (already used for in-prototype links) sets the screen and closes the panel/dropdown — no second handler. Added placeholder destination screens, shared into each persona's `screens` array via `LIB` / `LIBRARY_SCREENS_FULL` / `LIBRARY_SCREENS_MEMBER` / `COMMUNITY_SCREENS` / `ACCOUNT_SCREENS`: Library `lib-*`, Community `com-*`, account `acct-*` (My Health / Messages / Notifications / Settings), all `uplevel`-type with a "Home" back bar. These in-page switches stay inside the persona, matching the boundary rule. Panel items are *list* views, so they get their own new screens rather than reusing the existing *detail* screens (Group Detail, Question Show, etc.), which stay as-is. **Log out is the one dropdown item that is not a screen** — it's an auth transition, so it uses `data-action="log-out"` → `window.location.href` into the Logged Out Member flow (`../logged-out-member/`), joining Join / Log in now / Finish up as the folder-crossing CTAs. The Logged Out Member panel's items navigate into content screens even though that persona is gated (its panel already renders the member Library/Community lists, so the items had to point somewhere) — flagged to the user and left as-is. No screen-tab bar was re-added (it was removed earlier on 2026-07-24) — the user confirmed they don't want one, so the new screens are reachable via the panel/dropdown only.
- **2026-07-24** — "Log out" changed from an in-persona placeholder screen to a real auth transition: it now carries `data-action="log-out"` and navigates to the Logged Out Member flow (`../logged-out-member/`), joining Join / Log in now / Finish up as the folder-crossing CTAs. Removed the `acct-logout` screen.
- **2026-07-24** — Nav/panel visual pass to match Figma:
  - **Icons are now monochrome black source, tinted via CSS.** All 20 icon SVGs were normalized to black and are rendered as CSS-`mask`ed `<span class="icon">` elements whose `background-color` is `currentColor`, so each context's `color` tints them: nav = ink, Library/Community = magenta (`--color-magenta`), back-chevron = blue, dropdown = ink. (Replaces the previous per-icon Figma fills + `<img>` approach.)
  - **Panel:** light-pink circle (`--color-magenta-soft`) behind each Library/Community icon; wider (edge-bleeding) rollover; section labels back to 14px caps with normal tracking (they were double-spaced — a flex `gap` plus a label `margin`); "Powered by" now wraps to two lines; removed the close **X** entirely (Figma has none — dismiss via scrim); tightened item rhythm to ~24px feel.
  - **Panel close animation:** `closePanel()` adds `.is-closing` → slower ease-out `slideOut`/`fadeOut` (0.32s), removed on `animationend`. Open eased to 0.24s ease-out.
  - **Panel logo:** now a distinct asset at `assets/logo/panel-logo.svg` (user is providing it); until the file exists it falls back to the nav wordmark via `<img onerror>`.
  - **Top nav:** logotype/logomark is now a button that returns to the persona's home (`go-home`); stacked visitor logotype reduced to 40px and pulled close to the menu icon (`nav__left` gap 2px); more air between the right-side icons when Join is present (`nav__right` gap 10px).
  - Still TODO (next pass): add the global **footer** (Figma `6371:29` mobile / `6371:139` desktop) to all pages.
- **2026-07-24** — Icon tinting reworked from CSS `mask` to **inline SVG**. The masked-`<img>`/`url()` approach tinted fine over http but the icons vanished when the prototype was opened directly (`file://` blocks external mask/SVG references). Fix: the 20 icons are now inlined in `main.js` as `ICON_SVGS` (each `fill="currentColor"`), rendered as `<span class="icon">…svg…</span>` and tinted by the context's `color`. Works over `file://` and http. Removed the now-redundant `assets/icons/*.svg` files (provenance node-ids kept in `components.md`).
- **2026-07-24** — Added the **global footer** to every screen and made screens **vertically scrollable**. `.screen` is now a flex column: fixed nav/uplevel on top, a scrollable `.screen__scroll` holding the screen content + `renderFooter()`; panel/dropdown overlays stay pinned over the whole screen (don't scroll). Footer content mirrors Figma `6371:29` (branding + headline, two link columns, legal/disclaimer/copyright, CCPA "Your Privacy Choices" icon at `assets/footer/privacy-choices.png`). Footer links are non-navigating placeholders. The panel wordmark and footer wordmark both use the user-provided horizontal `assets/logo/logotype.svg`.
- **2026-07-24** — Added an optional `image` field on screens to show a full-bleed sample image as the body (rendered as `.screen__shot`, scrolls). Briefly wired a full-page Splash Landing capture to test scrolling, then removed the placeholder — the capture bundled its own nav/footer, doubling the prototype's. The `image` support remains so a body-only cropped image can be dropped in later.

---

## On the horizon

- ~~Pull real icon/logo/placeholder-profile assets from Figma into `/assets/`~~ — done 2026-07-24 (see decisions log + `components.md` → Assets).
- Confirm whether Subscriber needs its own top-nav design, or whether reusing Member's is actually correct product intent.
- Decide whether CTA buttons should trigger a real auth flow stub vs. the current persona-swap convenience.
- Eventual port to Rails ERB partials once nav/panel/dropdown are locked, per the tim-component-showcase workflow.
