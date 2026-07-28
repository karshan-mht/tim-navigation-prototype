# TIM — Manual

The spec docs for the TIM prototype. Start with the root
[README.md](README.md) for project overview and quick-start; these are the
detailed references. Two docs are cross-cutting foundations (**system** = how it
works, **design** = the visual language); **navigation** is the chrome/mechanism;
the rest are the content **surfaces** it leads to.

- **[system.md](foundation/system.md)** — architecture & persona model: the `data-persona`
  render model, screen types + state machine, the device frame, the four personas,
  the per-persona screen inventory, and the file layout.
- **[design.md](foundation/design.md)** — the design language: color tokens, type scale +
  letter-spacing, spacing/radius/motion, the icon-tinting system, and the chrome
  asset provenance.
- **[navigation.md](foundation/navigation.md)** — the global-nav chrome: top nav, slide-out
  panel (container), level-up bar, and global footer — behavior, component
  structure, and Figma node ids.
- **[landing.md](foundation/landing.md)** — the Splash Landing surface: the six content-module
  sections (Checker, Listicles, Articles, Experts, Factoid, Community), the splash
  CTA deep-link screens, and the landing's styling + listicle assets.
- **[library.md](foundation/library.md)** — the Library surface: the topic pages (HRT, Mood,
  Sleep, Diet, Family, All Topics), Topic Center / Article Show, and the panel
  topic icons.
- **[community.md](foundation/community.md)** — the Community surface: the Stories / Q&A /
  Groups / Meet-Others / Activities list pages, their detail screens, Community
  Overview, and the community panel icons.
- **[account.md](foundation/account.md)** — the Account surface: the profile dropdown menu
  and its destination screens (My Health / Messages / Notifications / Settings /
  My Profile) plus the dropdown icons.
- **[onboarding.md](foundation/onboarding.md)** — the Onboarding surface (start of account
  creation): the Sign Up Start and Registration Step (chromeless) pages, every CTA
  that opens them, and the auth transitions (Log in / Log out) that are
  deliberately not wired yet.
- **[DECISIONS.md](DECISIONS.md)** — the chronological decisions log for the
  whole prototype (all surfaces interleaved in time order) plus what's
  "on the horizon."

Code (`main.css`, `main.js`) is the source of truth if it ever disagrees
with a doc — correct the doc, don't erase the stale entry.
