# TIM Navigation — behavior spec & decisions log

Source: Figma **Global Navigation** file `42yas7Q9FfwhL6xUocjEAl`.
Prototype: plain HTML/CSS/JS in this repo (`index.html`, `main.css`, `app.js`), no build step.

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

**Anonymous Visitor**
- Splash Landing (tabs nav)
- Topic Center (uplevel, back label "All Topics")
- Article Show (uplevel, back label "Topic Center")

**Logged Out Member**
- Home as a hub — gated (tabs nav, welcome card: "Welcome back, Jannie123! You're not logged in." → "Log in now")

**Logged In Member**
- Home as a Hub (tabs nav, photo profile)
- Home as a Hub with account dropdown open
- Article Show (uplevel, back label "Topic")
- Group Detail (uplevel, back label "Groups")
- Program Detail (uplevel, back label "Programs")
- Someone's Member Profile (uplevel, back label "Meet Others")
- Question Show (uplevel, back label "Questions & Answers")
- Activity Show (uplevel, back label "Activity")

**Subscriber**
- Panel only defined in source file — no home/tabs screen exists to switch to. Prototype fabricates a placeholder home screen and labels it as assumed.

Note: the underlying content behind each nav (article body, profile grid, etc.) is placeholder in the *Figma file itself* — those frames just show a greyed-out screenshot placeholder. The real design surface in this file is the nav/panel/dropdown states, not full page layouts. The prototype reflects that: content areas are intentionally blank/labeled, not fleshed out.

---

## Interactions (as built)

- **Hamburger (☰)** → opens the slide-out Panel for the current persona. Tapping the overlay (not the panel surface) closes it.
- **Profile avatar** (Member/Subscriber personas only) → opens the account Dropdown. Tapping outside closes it.
- **Uplevel back bar** → returns to that persona's first/home screen. (Source file doesn't define true nested back-stacks — this is a reasonable simplification, not a Figma-confirmed behavior.)
- **CTA buttons** ("Join", "Log in now", "Finish up now") → jump to Logged In Member → Home. This dramatizes the intended auth transition; it is a prototype convenience, not something specified in Figma. Real implementation would presumably go through actual auth, not a client-side persona swap.
- **"View Profile"** in the dropdown → jumps to the Member Profile screen if available for that persona.

---

## Decisions log

- **2026-07-24** — Built as plain HTML/CSS/JS to match `tim-splash-landing` conventions (no framework, no build step, easy Rails ERB port later).
- **2026-07-24** — Chose to represent Panel/Dropdown as *interactive overlays* triggered from any screen, rather than as separate static tabs, since that's how they actually function (overlay on top of a base screen), even though Figma models them as separate frames.
- **2026-07-24** — Subscriber nav styled like Member's, flagged as an assumption (see Open question above) rather than invented independently.
- **2026-07-24** — Icons and logo are placeholders (generic inline SVG set / text wordmark), not Figma exports, because the MCP asset URLs expire after 7 days and would break a prototype meant to last. Real asset pull-in is tracked as a follow-up (see `components.md` → Assets).
- **2026-07-24** — Profile photo uses a stock placeholder image; Figma's own `placeholder_profile` illustration should replace it once assets are pulled locally.
- **2026-07-24** — Pulled real assets from Figma (`42yas7Q9FfwhL6xUocjEAl`) into `shared/assets/` and swapped out the placeholders: the inline-SVG icon set, the text-wordmark logo/logomark, and the hotlinked Unsplash profile photo are all gone. `app.js` now emits `<img>` tags pointing at local files (`../shared/assets/...`); `main.css` sizes them instead of styling text logos or tinting inline SVGs. Re-verified the documented node ids against the live file first — they all still resolve and match `components.md`, so no drift correction was needed. Icons keep the fills Figma exported (nav ink, library/community magenta, back-chevron blue). Three deliberate exceptions, all logged in `components.md` → Assets: the notification badge stays a CSS dot, the panel close (X) stays inline SVG (no Figma node for it), and the logged-in member avatar reuses `placeholder_profile` (no distinct headshot asset in source — matches the 2026-07-24 stock-photo decision below). Logo delivered as 3× PNG since the Figma nav logo is a raster image-fill, not vector.
- **2026-07-24** — Restructured from one combined `index.html` (with a persona switcher) into one folder per persona (`/visitor/`, `/logged-out-member/`, `/logged-in-member/`, `/subscriber/`), each with its own `index.html` locked to that persona. Reason: individual flows need to be shared as standalone starting points without exposing the others. `NOTES.md` is retired — its node-id table now lives in `components.md`, and its "how it works" section is folded into this doc. Shared CSS/JS moved to `/shared/`. The root `index.html` is now a static picker linking out to each flow (not itself interactive). CTA buttons ("Join", "Log in now", "Finish up now") now do a real page navigation to `/logged-in-member/` instead of an in-page persona swap.

---

## On the horizon

- ~~Pull real icon/logo/placeholder-profile assets from Figma into `/assets/`~~ — done 2026-07-24 (see decisions log + `components.md` → Assets).
- Confirm whether Subscriber needs its own top-nav design, or whether reusing Member's is actually correct product intent.
- Decide whether CTA buttons should trigger a real auth flow stub vs. the current persona-swap convenience.
- Eventual port to Rails ERB partials once nav/panel/dropdown are locked, per the tim-component-showcase workflow.
