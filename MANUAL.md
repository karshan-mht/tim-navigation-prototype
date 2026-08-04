# TIM — Manual

The spec docs for the TIM prototype. Start with the root
[README.md](README.md) for project overview and quick-start; these are the
detailed references. **`foundation/`** holds the cross-cutting system & behavior
docs (how it works, how it looks, the nav chrome); **`domains/`** holds the
product surfaces the navigation leads to.

## foundation/ — system & behavior

- **[system.md](foundation/system.md)** — architecture & persona model: the `data-persona`
  render model, screen types + state machine, the device frame, the four personas,
  the per-persona screen inventory, and the file layout.
- **[design.md](foundation/design.md)** — the design language: color tokens, type scale +
  letter-spacing, spacing/radius/motion, the icon-tinting system, and the chrome
  asset provenance.
- **[navigation.md](foundation/navigation.md)** — the global-nav chrome: top nav, slide-out
  panel (container), level-up pill, and global footer — behavior, component
  structure, and Figma node ids.

## domains/ — the product surfaces

- **[landing.md](domains/landing.md)** — the Splash Landing surface: the six content-module
  sections (Checker, Listicles, Articles, Experts, Factoid, Community), the splash
  CTA deep-link screens, and the landing's styling + listicle assets.
- **[advisors.md](domains/advisors.md)** — the Medical Advisory Committee page (a splash
  deep-link): intro, the five advisor cards with real headshots, and the "Watch
  Now" clip.
- **[library.md](domains/library.md)** — the Library surface (labelled "Resources" in the
  panel): the topic pages (HRT, Mood, Sleep, Diet, Family, All Resources), Topic
  Center / Article Show, and the panel topic icons.
- **[community.md](domains/community.md)** — the Community surface: the Posts / Q&A /
  Groups / Meet-Others / All-Community list pages, their detail screens, Community
  Overview, and the community panel icons.
- **[topic-hub.md](domains/topic-hub.md)** — the Topic Hub surface (a new page type,
  distinct from the old `topic`/Topic Center): a per-concern hub aggregating Q&A /
  conversations / groups / resources. Templated from data; currently one generic
  hub reached from the side panel's topic-hub rows.
- **[account.md](domains/account.md)** — the Account surface: the profile dropdown menu
  and its destination screens (My Health / Messages / Notifications / Settings /
  My Profile) plus the dropdown icons.
- **[onboarding.md](domains/onboarding.md)** — the Onboarding surface (start of account
  creation): the Sign Up Start and Registration Step (chromeless) pages, every CTA
  that opens them, and the auth transitions (Log in / Log out) that are
  deliberately not wired yet.

## Root

- **[DECISIONS.md](DECISIONS.md)** — the chronological decisions log for the
  whole prototype (all surfaces interleaved in time order) plus what's
  "on the horizon."

Code (`main.css`, `main.js`) is the source of truth if it ever disagrees
with a doc — correct the doc, don't erase the stale entry.
