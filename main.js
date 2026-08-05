/* ============================================================
   TIM Global Navigation — working prototype (persona-locked build)
   Source: Figma "Global Navigation" file (42yas7Q9FfwhL6xUocjEAl)
   Each flow page sets <body data-persona="..."> to lock this
   script to one persona — no switcher, so sharing one flow's URL
   doesn't expose the others.
   ============================================================ */

/* ---------------- Icons — real assets exported from Figma
   (Global Navigation 42yas7Q9FfwhL6xUocjEAl), saved under
   assets/ and referenced by relative path. See
   foundation/navigation.md → Assets for the source node id behind each file.

   Paths are relative to each flow page (e.g. /visitor/index.html),
   which sits one level above /assets/ — hence the "../assets" base. ---- */

const ASSET_BASE = "../assets";

// Inline SVG icons (monochrome, fill="currentColor") sourced from Figma — see
// foundation/navigation.md → Assets for the node id behind each. Inlined (not <img>/mask)
// so `color` can tint them AND they render over file:// (external mask/url
// refs are blocked there). Sizing/colour live in .icon (main.css).
const ICON_SVGS = {
  menu: `<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path id="Icon" d="M20.5066 15.5676C21.1816 15.5676 21.7288 16.1121 21.7288 16.7838C21.7288 17.4555 21.1816 18 20.5066 18H1.22222C0.547208 18 0 17.4555 0 16.7838C0 16.1121 0.547208 15.5676 1.22222 15.5676H20.5066ZM17.5188 7.78378C18.1937 7.78396 18.7411 8.32841 18.7411 9C18.7411 9.67159 18.1937 10.216 17.5188 10.2162H1.22222C0.547208 10.2162 0 9.6717 0 9C0 8.3283 0.547208 7.78378 1.22222 7.78378H17.5188ZM20.7778 0C21.4528 0 22 0.544519 22 1.21622C22 1.88791 21.4528 2.43243 20.7778 2.43243H1.22222C0.547208 2.43243 0 1.88791 0 1.21622C0 0.544519 0.547208 0 1.22222 0H20.7778Z" fill="currentColor"/> </svg>`,
  search: `<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path id="Icon" d="M9.29892 18.5978C6.69999 18.5978 4.50068 17.6975 2.70098 15.8969C0.901281 14.0962 0.000954492 11.8969 7.56933e-07 9.29892C-0.000952979 6.70095 0.899373 4.50163 2.70098 2.70098C4.50259 0.900326 6.7019 0 9.29892 0C11.8959 0 14.0957 0.900326 15.8983 2.70098C17.7009 4.50163 18.6007 6.70095 18.5978 9.29892C18.5978 10.348 18.4309 11.3375 18.0971 12.2674C17.7633 13.1973 17.3103 14.0199 16.7381 14.7352L21.6066 19.6037C21.8689 19.866 22 20.1998 22 20.6052C22 21.0105 21.8689 21.3443 21.6066 21.6066C21.3443 21.8689 21.0105 22 20.6052 22C20.1998 22 19.866 21.8689 19.6037 21.6066L14.7352 16.7381C14.0199 17.3103 13.1973 17.7633 12.2674 18.0971C11.3375 18.4309 10.348 18.5978 9.29892 18.5978ZM9.29892 15.7366C11.0872 15.7366 12.6074 15.111 13.8597 13.8597C15.1119 12.6084 15.7376 11.0881 15.7366 9.29892C15.7357 7.50971 15.11 5.98994 13.8597 4.73959C12.6093 3.48924 11.0891 2.86311 9.29892 2.86121C7.50876 2.8593 5.98898 3.48543 4.73959 4.73959C3.4902 5.99375 2.86407 7.51353 2.86121 9.29892C2.85835 11.0843 3.48447 12.6046 4.73959 13.8597C5.99471 15.1148 7.51448 15.7405 9.29892 15.7366Z" fill="currentColor"/> </svg>`,
  ai: `<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path id="stars" d="M10.1398 2.10306C11.0667 2.17361 11.7925 2.76841 11.9829 3.72057C12.7953 8.18883 13.8111 9.20464 18.2794 10.0171C19.2948 10.2202 19.9046 11.0322 19.9047 12.0476L19.8969 12.2359C19.8261 13.1626 19.2313 13.8887 18.2794 14.0791L17.481 14.2344C13.685 15.0317 12.7445 16.1866 11.9829 20.3755L11.9378 20.5604C11.6775 21.4642 10.9044 21.9999 9.95234 22L9.76403 21.9931C8.899 21.927 8.20889 21.404 7.96603 20.5604L7.92091 20.3755C7.15925 16.1864 6.21926 15.0317 2.42279 14.2344L1.62445 14.0791C0.609125 13.8758 0 13.063 0 12.0476C6.48301e-05 11.0956 0.535802 10.3224 1.43961 10.0622L1.62445 10.0171C5.81338 9.25543 6.96824 8.31499 7.76558 4.51891L7.92091 3.72057C8.12402 2.70504 8.93681 2.09525 9.95234 2.09525L10.1398 2.10306ZM9.95234 4.91461C9.55607 6.83354 8.98656 8.53835 7.71438 9.81053C6.44232 11.0824 4.73797 11.6514 2.81935 12.0476C4.73813 12.4439 6.44228 13.0135 7.71438 14.2856C8.9863 15.5575 9.55608 17.2613 9.95234 19.1798C10.3486 17.2615 10.9177 15.5575 12.1894 14.2856C13.4614 13.0136 15.1659 12.4439 17.0845 12.0476C15.1659 11.6514 13.4614 11.0825 12.1894 9.81053C10.9173 8.53836 10.3486 6.83351 9.95234 4.91461ZM18.3545 0C18.7264 0.000101788 19.0239 0.223224 19.0984 0.595079C19.396 2.23194 19.7681 2.60403 21.4049 2.90164C21.7768 2.97607 21.9999 3.27364 22 3.64549C22 4.01747 21.7769 4.31554 21.4049 4.38998L21.1125 4.44656C19.7217 4.73865 19.3774 5.16194 19.0984 6.69654L19.0818 6.76457C18.9864 7.09538 18.7031 7.29153 18.3545 7.29162L18.2852 7.28908C17.9685 7.26487 17.7156 7.07336 17.6266 6.76457L17.61 6.69654C17.331 5.1619 16.9868 4.73865 15.5959 4.44656L15.3035 4.38998C14.9316 4.3155 14.7084 4.01743 14.7084 3.64549C14.7085 3.27368 14.9317 2.97611 15.3035 2.90164C16.9403 2.60403 17.3124 2.23194 17.61 0.595079C17.6845 0.223124 17.9825 0 18.3545 0Z" fill="currentColor"/> </svg>`,
  myHealth: `<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="22.5" height="19.5001" viewBox="0 0 22.5 19.5001" fill="none" xmlns="http://www.w3.org/2000/svg"> <path id="Vector" d="M15.7875 0.250066L15.5629 0.255222C13.9977 0.327357 12.588 1.1555 11.3431 2.68053L11.25 2.79703L11.1569 2.68053C9.85274 1.08288 8.36763 0.250066 6.7125 0.250066C3.07131 0.250066 0.25 3.43345 0.25 6.52685C0.25 8.99837 1.53719 11.1671 4.35519 13.4785L7.5323 16.0182C8.13507 16.5063 8.44936 16.7722 8.69164 16.9937L9.07856 17.3656L10.5965 18.9662C10.9564 19.3455 11.5467 19.3446 11.9055 18.9642L13.1155 17.682C14.3915 16.3356 15.4724 15.3976 17.8164 13.7413C20.8631 11.5885 22.25 9.23174 22.25 6.52685C22.25 3.43345 19.4287 0.250066 15.7875 0.250066ZM15.7875 2.15007C18.3797 2.15007 20.4167 4.44843 20.4167 6.52685C20.4167 8.48513 19.4313 10.227 17.0447 11.9832L16.1476 12.6256C14.1254 14.0865 13.0435 15.0464 11.8066 16.3517L11.25 16.9407L10.5726 16.225L10.225 15.8726L9.8359 15.506C9.30959 15.0317 8.46977 14.3584 5.7579 12.2026C3.1504 10.1298 2.08333 8.39805 2.08333 6.52685C2.08333 4.44843 4.12027 2.15007 6.7125 2.15007C8.04231 2.15007 9.29211 3.0332 10.4821 4.92511C10.8437 5.50008 11.6563 5.50008 12.0179 4.92511C13.2079 3.0332 14.4577 2.15007 15.7875 2.15007Z" fill="currentColor" stroke="currentColor" stroke-width="0.5"/> </svg>`,
  messages: `<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M19.7174 2.07079L19.7868 2.24617C21.1226 2.7433 22.0505 4.03215 21.9979 5.51048L21.5976 16.7524C21.5315 18.6097 19.9426 20.0628 18.0489 19.9979L4.92073 19.5483C3.81802 19.5105 2.85507 18.9664 2.25604 18.1518C1.31687 17.5945 0.666851 16.6051 0.60506 15.4488L0.0047873 4.21546C-0.0943858 2.35956 1.35926 0.776213 3.25159 0.678949L16.3697 0.00469512C17.8584 -0.0718234 19.1752 0.79422 19.7174 2.07079ZM5.38569 3.27281L5.4638 3.27377L18.52 3.72339C19.4617 3.75582 20.1985 4.53493 20.1656 5.46359L19.7675 16.7055C19.7346 17.6342 18.9446 18.3607 18.0029 18.3283L4.94662 17.8786C4.00492 17.8462 3.26817 17.0671 3.30106 16.1384L3.69915 4.89654C3.73112 3.99367 4.47879 3.28186 5.38569 3.27281ZM6.0089 12.3641C5.63971 12.3499 5.32997 12.6682 5.31708 13.0752C5.30419 13.4821 5.59302 13.8235 5.96221 13.8377L14.8911 14.1814C15.2603 14.1956 15.57 13.8772 15.5829 13.4703C15.5958 13.0634 15.307 12.722 14.9378 12.7078L6.0089 12.3641ZM6.18311 9.81862C5.81879 9.80489 5.51313 10.1127 5.50041 10.5061C5.48769 10.8995 5.77271 11.2295 6.13703 11.2433L16.5502 11.6359C16.9145 11.6497 17.2202 11.3419 17.2329 10.9485C17.2456 10.5551 16.9606 10.225 16.5963 10.2113L6.18311 9.81862ZM6.38812 7.2732C6.01224 7.25849 5.69688 7.58817 5.68376 8.00958C5.67063 8.43098 5.9647 8.78453 6.34059 8.79924L13.7785 9.09043C14.1544 9.10515 14.4698 8.77547 14.4829 8.35406C14.496 7.93266 14.202 7.57911 13.8261 7.5644L6.38812 7.2732Z" fill="currentColor"/> </svg>`,
  notifications: `<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path id="vector" fill-rule="evenodd" clip-rule="evenodd" d="M0.772289 8.29594C1.286 3.57547 5.26305 0 10 0C14.7369 0 18.714 3.57547 19.2277 8.29594L19.9865 15.2681C20.1318 16.6032 19.0886 17.7692 17.7488 17.7692H15.45C14.8254 20.2022 12.6221 22 10 22C7.37789 22 5.17465 20.2022 4.54995 17.7692H2.25119C0.911406 17.7692 -0.131763 16.6032 0.0135335 15.2681L0.772289 8.29594ZM6.92975 17.7692C7.46323 18.9344 8.63734 19.7436 10 19.7436C11.3627 19.7436 12.5368 18.9344 13.0702 17.7692H6.92975ZM10 2.25641C6.41173 2.25641 3.39908 4.96485 3.00995 8.54064L2.25119 15.5128L17.7488 15.5128L16.9901 8.54064C16.6009 4.96485 13.5883 2.25641 10 2.25641Z" fill="currentColor"/> </svg>`,
  settings: `<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M7.19231 9.42857C9.08671 9.42857 10.6903 10.6898 11.2294 12.4286L20.7308 12.4286C21.4317 12.4286 22 13.0042 22 13.7143C22 14.4244 21.4317 15 20.7308 15L11.2293 15.0004C10.69 16.7389 9.08656 18 7.19231 18C5.29806 18 3.69457 16.7389 3.15534 15.0004L1.26923 15L1.19465 14.9978C0.528389 14.9587 0 14.399 0 13.7143C0 13.0042 0.568254 12.4286 1.26923 12.4286L3.15521 12.4286C3.6943 10.6898 5.2979 9.42857 7.19231 9.42857ZM7.19231 11.5714C6.02401 11.5714 5.07692 12.5308 5.07692 13.7143C5.07692 14.8978 6.02401 15.8571 7.19231 15.8571C8.3606 15.8571 9.30769 14.8978 9.30769 13.7143C9.30769 12.5308 8.3606 11.5714 7.19231 11.5714ZM14.8077 0C16.7021 0 18.3057 1.26126 18.8448 3.00005L20.7308 3C21.4317 3 22 3.57563 22 4.28571C22 4.99579 21.4317 5.57143 20.7308 5.57143L18.8447 5.57181C18.3054 7.31037 16.7019 8.57143 14.8077 8.57143C12.9134 8.57143 11.31 7.31037 10.7707 5.57181L1.26923 5.57143L1.19465 5.56925C0.528389 5.53014 0 4.97043 0 4.28571C0 3.57563 0.568254 3 1.26923 3L10.7706 3.00005C11.3097 1.26126 12.9133 0 14.8077 0ZM14.8077 2.14286C13.6394 2.14286 12.6923 3.10225 12.6923 4.28571C12.6923 5.46918 13.6394 6.42857 14.8077 6.42857C15.976 6.42857 16.9231 5.46918 16.9231 4.28571C16.9231 3.10225 15.976 2.14286 14.8077 2.14286Z" fill="currentColor"/> </svg>`,
  logout: `<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path id="vector" d="M10.1358 0.357981C10.6131 -0.119327 11.3869 -0.119327 11.8642 0.357981L16.7531 5.24687C17.2304 5.72418 17.2304 6.49805 16.7531 6.97535C16.2758 7.45266 15.502 7.45266 15.0246 6.97535L12.2222 4.17293V14.6667C12.2222 15.3417 11.675 15.8889 11 15.8889C10.325 15.8889 9.77778 15.3417 9.77778 14.6667V4.17293L6.97535 6.97535C6.49805 7.45266 5.72418 7.45266 5.24687 6.97535C4.76956 6.49805 4.76956 5.72418 5.24687 5.24687L10.1358 0.357981ZM1.22222 13.4444C1.89724 13.4444 2.44445 13.9917 2.44445 14.6667V14.9111C2.44445 15.958 2.4454 16.6697 2.49034 17.2198C2.53412 17.7557 2.61348 18.0297 2.71087 18.2209C2.94523 18.6808 3.31918 19.0548 3.77914 19.2891C3.97029 19.3865 4.24432 19.4659 4.78016 19.5097C5.33027 19.5546 6.04196 19.5556 7.08889 19.5556H14.9111C15.958 19.5556 16.6697 19.5546 17.2198 19.5097C17.7557 19.4659 18.0297 19.3865 18.2209 19.2891C18.6808 19.0548 19.0548 18.6808 19.2891 18.2209C19.3865 18.0297 19.4659 17.7557 19.5097 17.2198C19.5546 16.6697 19.5556 15.958 19.5556 14.9111V14.6667C19.5556 13.9917 20.1028 13.4444 20.7778 13.4444C21.4528 13.4444 22 13.9917 22 14.6667V14.9616C22 15.9455 22 16.7574 21.946 17.4189C21.8899 18.1059 21.7694 18.7374 21.4671 19.3306C20.9984 20.2505 20.2505 20.9984 19.3306 21.4671C18.7374 21.7694 18.1059 21.8899 17.4189 21.946C16.7574 22 15.9455 22 14.9616 22H7.03838C6.05454 22 5.24256 22 4.5811 21.946C3.89409 21.8899 3.26257 21.7694 2.66938 21.4671C1.74948 20.9984 1.00157 20.2505 0.532858 19.3306C0.230614 18.7374 0.110146 18.1059 0.0540155 17.4189C-2.78834e-05 16.7574 -1.50628e-05 15.9454 5.27133e-07 14.9616L1.10993e-06 14.6667C1.10993e-06 13.9917 0.547209 13.4444 1.22222 13.4444Z" fill="currentColor"/> </svg>`,
  // Launchpad / grid (2×2) — used by the "back to all flows" hotspot.
  grid: `<svg style="display: block;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="6.5" height="6.5" rx="1.6" fill="currentColor"/><rect x="11.5" y="2" width="6.5" height="6.5" rx="1.6" fill="currentColor"/><rect x="2" y="11.5" width="6.5" height="6.5" rx="1.6" fill="currentColor"/><rect x="11.5" y="11.5" width="6.5" height="6.5" rx="1.6" fill="currentColor"/></svg>`,
};

// Logo + profile assets (raster wordmark/mark exported at 3x; profile is SVG).
const LOGO_FULL = `${ASSET_BASE}/logotype.png`; // full "this is Menopause" wordmark
const LOGO_MARK = `${ASSET_BASE}/logomark.svg`; // compact circular logomark
const PROFILE_PLACEHOLDER = `${ASSET_BASE}/placeholder_profile.svg`;
// Panel wordmark — the distinct horizontal "this is Menopause" logo the user
// added (assets/logotype.svg), vs the stacked lockup used in the nav.
// Falls back to the nav wordmark via <img onerror> if the file is ever missing.
const PANEL_LOGO = `${ASSET_BASE}/logotype.svg`;

/* ---------------- Content data (pulled verbatim from Figma nodes —
   see foundation/navigation.md for the node-id source of each list) ---- */

// Topic Hubs — the new primary entry point in the side panel (Figma Global
// Navigation, panel node 7299:1987). The redesign drops the old per-persona
// Resources/Community menu lists in favour of one shared list of topic hubs.
// Labels are intentionally the Figma placeholders (the real hub taxonomy isn't
// settled); these are the up-to-8 pre-defined Topic Hubs. Every row opens the
// generic Topic Hub surface (`topic-hub` — see TOPIC_HUBS below). Icons are
// pre-tinted SVGs (magenta glyph on a pale circle) in assets/hub-{1..8}.svg
// — used as <img>, not currentColor-tinted.
const HUBS = [
  { icon: "hub-1", label: "Topic Hub Longer Name" },
  { icon: "hub-2", label: "Topic Hub Short" },
  { icon: "hub-3", label: "Topic Hub Longer Name" },
  { icon: "hub-4", label: "Topic Hub Long Name" },
  { icon: "hub-5", label: "Topic Hub Short" },
  { icon: "hub-6", label: "Topic Hub Longer Name" },
  { icon: "hub-7", label: "Topic Hub Short" },
  { icon: "hub-8", label: "Topic Hub Long Name" },
];
// The three top-level tabs at the top of the panel. Home resolves per-persona
// (each persona's first screen); Resources / Community are shared destinations.
const PANEL_TABS = [
  { icon: "tab-home", label: "Home", target: "home" },        // resolved to persona.screens[0].id
  { icon: "tab-resources", label: "Resources", target: "lib-all" },
  { icon: "tab-community", label: "Community", target: "community-overview" },
];
// Community Overview hub modules — the orientation menu into community features.
// Wireframe-level: an outlined box per module (title, one-line description,
// optional [TBD] count badge, link). Counts are ALWAYS the literal "[TBD]"
// placeholder, never a fabricated number (same rule as the splash community
// count — see DECISIONS 2026-07-27). Order is fixed.
const COMMUNITY_MODULES = [
  { title: "Activity Feed", desc: "See what members are sharing today", count: "[TBD]", screen: "com-activities" },
  { title: "Q&A", desc: "Ask or answer real member questions", count: "[TBD]", screen: "com-questions" },
  { title: "Groups", desc: "Join circles built around your journey", count: "[TBD]", screen: "com-groups" },
  { title: "People", desc: "Meet ambassadors, CEMs, and peers", count: "[TBD]", screen: "com-meet" },
  { title: "Community Values & Ambassador Program", desc: "How we look after each other", screen: "com-values" },
];

// Topic Hubs — a NEW surface (distinct from the old Topic Center, which was
// retired and folded into Collections 2026-08-04). A hub aggregates content across feature types for
// one patient concern (up to 8 per site), so a member can explore a concern
// without bouncing between Q&A, conversations, groups, and resources. Reached
// from the side panel's topic-hub rows (see renderPanel). Richer than the
// /community orientation menu: modules flagged `preview: true` show a content-
// preview affordance (placeholder skeleton rows — no fabricated posts/questions),
// closer in spirit to the Splash Landing modules. Data-driven so more hubs are
// added as data, not one-off screens (see TOPIC_HUB_PAGES + renderTopicHub).
// For now there is a single **generic** hub used as the template for every panel
// item (the real per-concern hubs + names come later). `stat` is ALWAYS the
// literal "[TBD]" placeholder, never a fabricated number.
const TOPIC_HUBS = [
  {
    id: "topic-hub",
    name: "Topic Hub",
    desc: "Everything on this topic — questions, conversations, groups, and resources — in one place.",
    stat: "[TBD]% of community discussion this month",
    modules: [
      // No topic-filtering exists yet, so Top Q&A points at the general Q&A page.
      { title: "Top Q&A", desc: "Most helpful answered questions", preview: true, screen: "com-questions", note: "General Q&A — topic filtering not built yet" },
      { title: "Active Conversations", desc: "Relevant peer discussions", preview: true, screen: "com-activities" },
      // "Expert Resources" is a curated set of articles (plural), so it points at
      // All Resources rather than a single Article Show (the `lib-all` fallback
      // the brief allows — no single article fits, and lib-all resolves everywhere).
      { title: "Expert Resources", desc: "Curated, medically-reviewed articles", preview: true, screen: "lib-all" },
      { title: "Groups & People", desc: "Circles and members walking the same path", screen: "com-groups" },
      // No tools surface exists yet — dead/disabled placeholder for now.
      { title: "Action-Oriented Tools", desc: "Guides, checklists, step-by-step programs", disabled: true },
    ],
  },
];
const DROPDOWN_MENU = [
  // Notifications sits above the divider as a distinct orange "chip" (its own
  // pill styling reflects the orange badge colour); the divider sits below it,
  // above the rest of the menu.
  { icon: "notifications", label: "Notifications (5)", screenId: "acct-notifications", iconMod: "notif" },
  { icon: "myHealth", label: "My Health", screenId: "acct-health", divider: true },
  { icon: "messages", label: "Messages", screenId: "acct-messages" },
  { icon: "settings", label: "Settings", screenId: "acct-settings" },
  // Log out is an auth transition, not an in-page screen — it crosses into the
  // Logged Out Member flow (see the "log-out" action), like the Join / Log in /
  // Finish up CTAs cross into Logged In Member. Its own divider sits above it.
  { icon: "logout", label: "Log out", action: "log-out", divider: true, iconMod: "logout" },
];

/* ---------------- Persona / screen model ---- */

// Destination screens for the Panel Library / Community items and the
// Dropdown account items. These are top-level list/section pages (type "page")
// \u2014 so they have NO level-up bar (there's nowhere "up" to go; the nav logo
// returns home). Placeholder content like every other screen. Defined once here
// and shared into each persona that shows the matching menu, so every item's
// screenId resolves within its own persona.
const LIB = {
  hrt: { id: "lib-hrt", label: "HRT & Other Treatments", type: "page", title: "HRT & Other Treatments" },
  mood: { id: "lib-mood", label: "Mood & Mental Health", type: "page", title: "Mood & Mental Health" },
  sleep: { id: "lib-sleep", label: "Sleep & Insomnia", type: "page", title: "Sleep & Insomnia" },
  diet: { id: "lib-diet", label: "Diet & Nutrition", type: "page", title: "Diet & Nutrition" },
  family: { id: "lib-family", label: "Family & Relationships", type: "page", title: "Family & Relationships" },
  all: { id: "lib-all", label: "All Resources", type: "page", title: "All Resources" },
};
// Full Library set (Visitor, Subscriber) vs short set (Member personas). These
// are destination screens; the side panel no longer lists them individually.
const LIBRARY_SCREENS_FULL = [LIB.hrt, LIB.mood, LIB.sleep, LIB.diet, LIB.family, LIB.all];
const LIBRARY_SCREENS_MEMBER = [LIB.hrt, LIB.mood, LIB.sleep, LIB.all];

// Community destination screens (the Community Overview hub's module targets).
// `com-stories` (Posts) was retired 2026-08-03 — Stories folded into Activity, so
// `com-activities` is now "Activity" and absorbs it. `com-values` is a new
// placeholder for the Community Values & Ambassador Program. All are plain
// top-level pages (no level-up pill) and are injected into every persona (via
// SHARED_TARGET_SCREENS) so the shared Community hub can reach them everywhere.
const COMMUNITY_SCREENS = [
  { id: "com-activities", label: "Activity", type: "page", title: "Activity" },
  { id: "com-questions", label: "Questions & Answers", type: "page", title: "Questions & Answers" },
  { id: "com-groups", label: "Groups", type: "page", title: "Groups" },
  { id: "com-meet", label: "Meet Others", type: "page", title: "Meet Others" },
  { id: "com-values", label: "Community Values & Ambassador Program", type: "page", title: "Community Values & Ambassador Program" },
];

const ACCOUNT_SCREENS = [
  { id: "acct-health", label: "My Health", type: "page", title: "My Health" },
  { id: "acct-messages", label: "Messages", type: "page", title: "Messages" },
  { id: "acct-notifications", label: "Notifications", type: "page", title: "Notifications" },
  { id: "acct-settings", label: "Settings", type: "page", title: "Settings" },
  // No acct-logout screen: "Log out" navigates out to the Logged Out Member flow.
];

// Shared panel/level-up destinations: the Community Overview (the Community tab),
// All Articles ("Explore (ToC)"), and the Advisors page (global footer's "Medical
// Advisors" link). Defined once and injected into every persona (see below) so
// these shared-chrome targets resolve in all four personas. The Resources tab
// points at LIB.all.
// (`all-articles` keeps the internal id `all-collections` — only its display
// label/title were renamed from "All Collections".)
const COMMUNITY_OVERVIEW_SCREEN = { id: "community-overview", label: "Community Overview", type: "page", title: "Community Overview" };
const ALL_ARTICLES_SCREEN = { id: "all-collections", label: "All Articles", type: "page", title: "All Articles" };
const ADVISORS_SCREEN = { id: "advisors", label: "Advisors", type: "page", title: "Advisors" };

// NAMING (2026-08-04): the old **Topic Center** (`topic`) was **folded into
// Collections** and retired. It was "a collection of sponsored content," so it's
// now just a **Collection** (the `collection` screen). The **Topic Hub** surface
// (`topic-hub` in TOPIC_HUB_PAGES, from the TOPIC_HUBS data array) is a separate,
// kept concept — the panel's up-to-8 pre-defined hub rows. An Article Show links
// **up to a Topic Hub** (level-up pill labelled "Topic Hub"); a different article
// links **to a Collection** (in-body collection callout — see article-collection).
const TOPIC_HUB_PAGES = TOPIC_HUBS.map((h) => ({ id: h.id, label: h.name, type: "page", title: h.name, topicHub: h }));

const SHARED_TARGET_SCREENS = [COMMUNITY_OVERVIEW_SCREEN, ALL_ARTICLES_SCREEN, ADVISORS_SCREEN, LIB.all, ...COMMUNITY_SCREENS, ...TOPIC_HUB_PAGES];

// Home + splash-flow screens shared by Visitor and Subscriber (Subscriber
// mirrors the Visitor landing). The splash content modules deep-link into these:
// the symptom-checker CTA, the listicle detail page, Article Show (levels up to a
// Topic Hub) and a second Article Show that belongs to a Collection.
const SPLASH_FLOW_SCREENS = [
  { id: "splash", label: "Splash Landing", type: "tabs", title: "Splash Landing", modules: true },
  { id: "symptom-checker", label: "Symptom Checker", type: "page", title: "Symptom Checker" },
  { id: "signup-start", label: "Sign Up Start", type: "page", title: "Sign Up Start", chromeless: true },
  { id: "listicle-detail", label: "Listicle Detail", type: "page", title: "Listicle Detail" },
  ADVISORS_SCREEN,
  { id: "article", label: "Article Show", type: "uplevel", title: "Article Show", backLabel: "Skin-related Hub", upTo: "topic-hub", upIcon: "up-hub" },
  ALL_ARTICLES_SCREEN,
  // A Collection — the rebranded old "Topic Center": a collection of sponsored content.
  { id: "collection", label: "Collection", type: "page", title: "Collection" },
  // Article Show that belongs to a Collection — no level-up pill; instead an
  // in-body "collection" callout box at the top links to its Collection.
  { id: "article-collection", label: "Article Show (in Collection)", type: "page", title: "Article Show", collection: { screen: "collection" } },
  COMMUNITY_OVERVIEW_SCREEN,
  ...LIBRARY_SCREENS_FULL,
];

const PERSONAS = {
  visitor: {
    label: "Anonymous Visitor",
    navVariant: "visitor",
    screens: SPLASH_FLOW_SCREENS,
  },
  "logged-out-member": {
    label: "Logged Out Member",
    navVariant: "member",
    screens: [
      { id: "home-gated", label: "Home (gated)", type: "gated-home", title: "Home as a hub\n(gated)" },
      ...LIBRARY_SCREENS_MEMBER,
      ...COMMUNITY_SCREENS,
    ],
  },
  "logged-in-member": {
    label: "Logged In Member",
    navVariant: "member-photo",
    screens: [
      // Home is a hub (still to be designed) — NOT the Visitor landing. Renders
      // the placeholder label until the hub is designed.
      { id: "home", label: "Home as a Hub", type: "tabs", title: "Home as a hub\n(still to be designed)" },
      // The member's OWN profile (from the dropdown's "View Profile") — a top
      // page with no level-up bar. Distinct from the "profile" screen below,
      // which is SOMEONE ELSE's profile (reached from Meet Others).
      { id: "my-profile", label: "My Profile", type: "page", title: "My Profile" },
      { id: "article", label: "Article Show", type: "uplevel", title: "Article Show", backLabel: "Skin-related Hub", upTo: "topic-hub", upIcon: "up-hub" },
      { id: "group", label: "Group Detail", type: "uplevel", title: "Group Detail", backLabel: "Groups", upTo: "com-groups", upIcon: "up-groups" },
      { id: "program", label: "Program Detail", type: "uplevel", title: "Program Detail", backLabel: "Programs", upIcon: "up-programs" },
      { id: "profile", label: "Member Profile", type: "uplevel", title: "Someone\u2019s Member Profile", backLabel: "Meet Others", upTo: "com-meet", upIcon: "up-meet" },
      { id: "question", label: "Question Show", type: "uplevel", title: "Question Show", backLabel: "Questions & Answers", upTo: "com-questions", upIcon: "up-qa" },
      { id: "activity", label: "Activity Show", type: "uplevel", title: "Activity Show", backLabel: "Activity", upTo: "com-activities", upIcon: "up-activity" },
      ...LIBRARY_SCREENS_MEMBER,
      ...COMMUNITY_SCREENS,
      ...ACCOUNT_SCREENS,
    ],
  },
  // Subscriber's top nav (visitor variant) and landing mirror the Visitor
  // experience; the side panel is now the shared panel (see renderPanel).
  subscriber: {
    label: "Subscriber",
    navVariant: "visitor",
    // Subscriber-only "Registration Step" page; everything else mirrors the
    // Visitor splash flow.
    screens: [...SPLASH_FLOW_SCREENS, { id: "registration-step", label: "Registration Step", type: "page", title: "Registration Step", chromeless: true }],
  },
};

// The side panel is now identical for every persona (Home / Resources /
// Community tabs + topic hubs + Explore), and the global footer links to the
// Advisors page. Guarantee these shared-chrome destinations resolve everywhere
// by injecting any that a persona's screen list is missing.
Object.values(PERSONAS).forEach((p) => {
  const have = new Set(p.screens.map((s) => s.id));
  SHARED_TARGET_SCREENS.forEach((s) => {
    if (!have.has(s.id)) p.screens.push(s);
  });
});

/* ---------------- Locked persona (set per-page via <body data-persona>) ---- */

const LOCKED_PERSONA_KEY = document.body.dataset.persona;
const persona = PERSONAS[LOCKED_PERSONA_KEY];

if (!persona) {
  console.error(`Unknown or missing persona key on <body data-persona>: "${LOCKED_PERSONA_KEY}"`);
}

// Entry Points support: a persona flow normally opens on its own home screen
// (persona.screens[0]), but the launcher's "Entry Points" section links to
// specific starting screens instead (e.g. landing straight on an Article Show
// as if arriving from Search, instead of the Splash Landing home) via
// ?start=<screen-id>. Falls back to the normal default if the param is
// missing, blank, or doesn't match a real screen in this persona — so a typo'd
// or stale link degrades to "just open the persona normally" rather than
// breaking.
const requestedStart = new URLSearchParams(window.location.search).get("start");
const startScreenId =
  requestedStart && persona.screens.some((s) => s.id === requestedStart)
    ? requestedStart
    : persona.screens[0].id;

let state = {
  screenId: startScreenId,
  prevScreenId: null,
  panelOpen: false,
  dropdownOpen: false,
};

/* ---------------- Render helpers ---- */

function icon(name) {
  const svg = ICON_SVGS[name];
  // Inline SVG (fill=currentColor) so `color` tints it and it renders over file://.
  return svg ? `<span class="icon">${svg}</span>` : "";
}

function renderTopNav() {
  const isVisitor = persona.navVariant === "visitor";

  const logoImg = isVisitor
    ? `<img class="logo logo--full" src="${LOGO_FULL}" alt="This is Menopause" />`
    : `<img class="logo logo--mark" src="${LOGO_MARK}" alt="This is Menopause" />`;
  // The logotype / mark returns to the persona's home screen (go-home).
  const left = `<button class="logo-btn" data-action="go-home" aria-label="Home">${logoImg}</button>`;

  // The nav pill is persona-aware within the shared `visitor` variant: a
  // Subscriber has already started signing up, so it reads "Finish" →
  // Registration Step (matching the splash "Finish up now" card); a Visitor sees
  // "Join" → Sign Up Start. Both member states use Figma's placeholder_profile
  // illustration for the avatar (the source file has no distinct member
  // headshot, and the stock Unsplash photo it replaced was a prototype stand-in).
  const isSubscriber = LOCKED_PERSONA_KEY === "subscriber";
  const right = isVisitor
    ? `<button class="join-btn" data-screen="${isSubscriber ? "registration-step" : "signup-start"}">${isSubscriber ? "Finish" : "Join"}</button>`
    : `<button class="profile-btn" data-action="toggle-dropdown" aria-label="Account menu">
         <span class="profile-avatar"><img class="profile-img" src="${PROFILE_PLACEHOLDER}" alt="" /></span>
         <span class="badge"></span>
       </button>`;

  return `
    <div class="nav">
      <div class="nav__top">
        <div class="nav__left">
          <button class="icon-btn" data-action="toggle-panel" aria-label="Open menu">${icon("menu")}</button>
          ${left}
        </div>
        <div class="nav__right">
          <button class="icon-btn" aria-label="Search">${icon("search")}</button>
          <button class="icon-btn" aria-label="Ask AI">${icon("ai")}</button>
          ${right}
        </div>
      </div>
    </div>
  `;
}

// Level-up pill (only on detail screens): a small blue pill (Figma Global
// Navigation 7294:1952) — a section icon + the parent's name — that steps one
// level up via data-screen (falls back to home if a screen has no `upTo`). Not a
// "back" button — it always goes up a level. It sits in-page (top-left) but
// sticks to the top on scroll (see .screen__uplevel + attachAutoHide), replacing
// the old full-width level-up bar. Each screen's `upIcon` is a pre-tinted blue
// SVG in assets/up-*.svg.
function renderUplevel(screen) {
  const upTo = screen.upTo || persona.screens[0].id;
  const iconImg = screen.upIcon
    ? `<img class="uplevel__icon" src="${ASSET_BASE}/${screen.upIcon}.svg" alt="" />`
    : "";
  return `
    <button class="uplevel" data-screen="${upTo}">
      ${iconImg}
      <span>${screen.backLabel}</span>
    </button>
  `;
}

// In-page "collection" callout box (placeholder) — an article that belongs to a
// Collection (a curated set of sponsored content — the rebranded old Topic Center)
// shows a small box near the top linking to the full collection. `collection.screen`
// is the Collection to open (in-page navigation via data-screen).
function renderCollectionCallout(collection) {
  return `
    <div class="collection-callout">
      <p class="collection-callout__label">Part of a collection</p>
      <p class="collection-callout__text">This article is part of a collection.</p>
      <button class="collection-callout__link" data-screen="${collection.screen}">Explore the full collection &rarr;</button>
    </div>
  `;
}

// Community Overview — the /community hub landing. A lightweight orientation menu
// (NOT a content feed): the COMMUNITY_MODULES rendered as outlined boxes, each a
// title + one-line description + optional [TBD] count badge + a link into that
// community feature. This is the primary navigation surface into community
// features (the panel's single Community tab points here). Wireframe-level: no
// live content previews, no fabricated counts.
function renderCommunityHub() {
  // Whole card is tappable (data-screen) — no separate link affordance; press
  // feedback comes from :active (mobile tap/press, not desktop rollover).
  const cards = COMMUNITY_MODULES.map(
    (m) => `
      <button class="comm-mod" data-screen="${m.screen}">
        <span class="comm-mod__head">
          <span class="comm-mod__title">${m.title}</span>
          ${m.count ? `<span class="comm-mod__badge">${m.count}</span>` : ""}
        </span>
        <span class="comm-mod__desc">${m.desc}</span>
      </button>`
  ).join("");
  return `
    <section class="comm-hub">
      <h1 class="comm-hub__title">Community</h1>
      <div class="comm-hub__list">${cards}</div>
    </section>
  `;
}

// Topic Hub — a NEW surface (see TOPIC_HUBS). Aggregates content across feature
// types for one patient concern. Richer than the /community orientation menu:
// modules flagged `preview: true` render a content-preview affordance (skeleton
// placeholder rows — no fabricated content). Templated: one render for any hub in
// the TOPIC_HUBS data array. Header = name + description + a [TBD] stat.
function renderTopicHub(hub) {
  const modules = hub.modules
    .map((m) => {
      const preview = m.preview
        ? `<span class="topic-hub-mod__preview" aria-hidden="true"><span></span><span></span></span>`
        : "";
      const note = m.note ? `<span class="topic-hub-mod__note">${m.note}</span>` : "";
      if (m.disabled) {
        // Dead/disabled state — no destination screen exists yet.
        return `
          <div class="topic-hub-mod topic-hub-mod--disabled" aria-disabled="true">
            <span class="topic-hub-mod__head">
              <span class="topic-hub-mod__title">${m.title}</span>
              <span class="topic-hub-mod__soon">Coming soon</span>
            </span>
            <span class="topic-hub-mod__desc">${m.desc}</span>
          </div>`;
      }
      // Whole card is tappable — no separate "Explore" link; :active gives the
      // press feedback (mobile tap/press, not a desktop rollover).
      return `
        <button class="topic-hub-mod" data-screen="${m.screen}">
          <span class="topic-hub-mod__head"><span class="topic-hub-mod__title">${m.title}</span></span>
          <span class="topic-hub-mod__desc">${m.desc}</span>
          ${preview}
          ${note}
        </button>`;
    })
    .join("");
  return `
    <section class="topic-hub">
      <header class="topic-hub__header">
        <h1 class="topic-hub__name">${hub.name}</h1>
        <p class="topic-hub__desc">${hub.desc}</p>
        <p class="topic-hub__stat">${hub.stat}</p>
      </header>
      <div class="topic-hub__list">${modules}</div>
    </section>
  `;
}

// The unified side panel (Figma Global Navigation 7299:1987). Same for every
// persona: a Home / Resources / Community tab card, the topic-hub list, and an
// "Explore (ToC)" pill. Home resolves to the current persona's own home screen;
// the other targets are shared destinations injected into every persona above.
function renderPanel() {
  const homeId = persona.screens[0].id;

  const tabs = PANEL_TABS.map((t) => {
    const target = t.target === "home" ? homeId : t.target;
    return `<button class="panel__tab" data-screen="${target}">
        <img class="panel__tab-icon" src="${ASSET_BASE}/${t.icon}.svg" alt="" />
        <span>${t.label}</span>
      </button>`;
  }).join("");

  // Every panel topic-hub row opens the (generic) Topic Hub surface for now —
  // the primary entry point into Topic Hubs. (Real per-row concerns come later.)
  const hubs = HUBS.map(
    (h) =>
      `<button class="panel__hub" data-screen="topic-hub">
        <img class="panel__hub-icon" src="${ASSET_BASE}/${h.icon}.svg" alt="" />
        <span>${h.label}</span>
      </button>`
  ).join("");

  return `
    <div class="panel-overlay" data-action="close-panel">
      <div class="panel" data-stop>
        <div class="panel__top">
          <div class="panel__brand">
            <img class="panel__logotype" src="${PANEL_LOGO}" onerror="this.onerror=null;this.src='${LOGO_FULL}'" alt="This is Menopause" />
          </div>
          <nav class="panel__tabs">${tabs}</nav>
        </div>
        <div class="panel__hubs">
          ${hubs}
          <button class="panel__explore" data-screen="all-collections">Explore (ToC)</button>
        </div>
        <div class="panel__footer">Powered by<br />MyHealthTeam, a Swoop company</div>
      </div>
    </div>
  `;
}

function renderDropdown() {
  return `
    <div class="dropdown-overlay" data-action="close-dropdown">
      <div class="dropdown" data-stop>
        <div class="dropdown__user">
          <strong>Janet Smithsonian</strong>
          <span>@jannie1234</span>
          <a href="#" data-action="go-profile">View Profile</a>
        </div>
        <div class="dropdown__menu">
          ${DROPDOWN_MENU.map((it) => {
            const nav = it.action ? `data-action="${it.action}"` : `data-screen="${it.screenId}"`;
            const mod = it.iconMod ? ` dropdown__item--${it.iconMod}` : "";
            return `<button class="dropdown__item${it.divider ? " dropdown__divider" : ""}${mod}" ${nav}>${icon(it.icon)}<span>${it.label}</span></button>`;
          }).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderGatedHome() {
  return `
    <div class="welcome-card">
      <p class="welcome-card__title">Welcome back, Jannie123!</p>
      <p class="welcome-card__subtitle">You&rsquo;re not logged in.</p>
      <button class="welcome-card__cta" data-action="log-in">Log in now</button>
    </div>
  `;
}

// Medical Advisory Committee page (Figma "Medical Advisors", file
// Zkiv6o4d7eyQOLAvwjVYTy, mobile 2:43). Reached from the splash "View all
// advisors" link. Real advisor photos live in assets/advisor-{1..5}.jpg (index
// = card order). "Read full bio" is a non-navigating placeholder (no bio page).
const ADVISORS = [
  { photo: 1, name: "Christy James Guepet, M.D., FACOG, FPMRS", shortName: "Christy James Guepet, M.D.", role: "OB-GYN", org: "Southern Women’s Specialists", bio: "Board-certified OB-GYN, fellowship-trained urogynecologist, and certified menopause specialist. Co-owner of Southern Women’s Specialists in Fairhope, Alabama, focused on individualized care during perimenopause and menopause." },
  { photo: 2, name: "Cindi Rauert Lanners, PT, DPT", shortName: "Cindi Rauert Lanners, DPT", role: "Physical Therapist", org: "University of Colorado School of Physical Therapy", bio: "Physical therapist specializing in women’s and pelvic health, including strength training and patient education. Affiliate faculty at the University of Colorado School of Physical Therapy." },
  { photo: 3, name: "Angela McCool-Pearson, M.D.", shortName: "Angela McCool-Pearson, M.D.", role: "OB-GYN", org: "Southern Women’s Specialists", bio: "Board-certified OB-GYN and certified menopause specialist. Co-owner of Southern Women’s Specialists, where her practice focuses on perimenopause and menopause, sexual health, and overall wellness." },
  { photo: 4, name: "Chevon Rariy, M.D.", shortName: "Chevon Rariy, M.D.", role: "Endocrinologist", org: "Visana Health", bio: "Chief medical technology officer at Visana Health, a virtual women’s health platform, leading product and technology strategy across gynecology, hormonal health, and chronic condition care." },
  { photo: 5, name: "Lauren Tetenbaum, LCSW, JD, PMH-C, MSCP", shortName: "Lauren Tetenbaum, LCSW", role: "Licensed Clinical Social Worker", org: "Menopause Society Certified Practitioner", bio: "Licensed clinical social worker specializing in women’s reproductive mental health. Certified in perinatal mental health and a Menopause Society Certified Practitioner supporting people through pregnancy, postpartum, and menopause." },
];
function renderAdvisors() {
  return `
    <div class="mod-advisors">
      <div class="mod-advisors__intro">
        <h2 class="mod-advisors__title">ThisIsMenopause Medical Advisory Committee</h2>
        <p class="mod-advisors__lede">Menopause deserves better than guesswork &mdash; so we brought in real expertise to back it up.</p>
        <p class="mod-advisors__body">Our advisory committee is made up of doctors, nurse practitioners, and clinicians who&rsquo;ve spent their careers supporting women through this exact stage of life. They help shape what we cover, weigh in on the questions that matter most, and sometimes roll up their sleeves to contribute content directly.</p>
        <p class="mod-advisors__body mod-advisors__body--italic">Think of them as the knowledgeable friends in your corner &mdash; who also happen to have the medical degrees to back it up.</p>
      </div>
      <ul class="mod-advisors__list">
        ${ADVISORS.map((a) => `
          <li class="advisor-card">
            <img class="advisor-card__photo" src="${ASSET_BASE}/advisor-${a.photo}.jpg" alt="${a.name}" />
            <div class="advisor-card__identity">
              <p class="advisor-card__name">${a.name}</p>
              <p class="advisor-card__role">${a.role}</p>
              <p class="advisor-card__org">${a.org}</p>
            </div>
            <p class="advisor-card__bio">${a.bio}</p>
            <span class="advisor-card__link">Read full bio &rarr;</span>
          </li>`).join("")}
      </ul>
      <div class="mod-advisors__watch">
        <h3 class="mod-advisors__watch-head">Watch Now</h3>
        <div class="mod-advisors__watch-card"></div>
        <p class="mod-advisors__watch-title">What Partners Need To Know About Rage During Perimenopause and Menopause</p>
      </div>
    </div>
  `;
}

// Content modules for the home ("splash") screens — built from the Figma
// Mobile_Splash_Landing frame (file EWsXKakhyFLhkse035AoHX, node 4101:3).
// Nav and Footer are handled elsewhere (renderTopNav / renderFooter); this
// covers the six body sections in Figma order: Checker (hero), Listicles,
// Articles, Experts, Factoid, Community.
function renderModules() {
  const checkerPills = ["Irritability", "Low libido", "Anxiety", "Brain fog", "Joint pain", "Hot flashes"];

  // Five cards, matching the Figma desktop "Listicles" carousel (node 4113:51).
  // Cards 4 & 5 carry the frame's own "[symptom]" / "[Listicle]" placeholders —
  // kept verbatim rather than invented; the brackets signal they're not final.
  // `img` points at a graphic in assets/listicles_<name>.svg; the icon degrades
  // to an empty circle if a file is missing (onerror removes the <img>).
  const listicles = [
    { img: "weight", title: "Ways to manage weight gain", cta: "Weight Tips" },
    { img: "fog", title: "How to clear brain fog", cta: "Brain Fog Tips" },
    { img: "flashes", title: "Ways to manage hot flashes", cta: "Hot Flashes Tips" },
    { img: "sleep", title: "Ways to manage [symptom]", cta: "Sleep Tips" },
    { img: "libido", title: "Ways to manage [symptom]", cta: "[Listicle] Tips" },
  ];

  // Figma's Articles section is an image + title carousel ("Everything you need
  // to know"), no eyebrow/tag. The first two titles come from the frame's image
  // asset names; the rest are placeholder titles. Thumbnails are simple
  // placeholder patterns (no real images yet). Most cards open Article Show
  // (levels up to a Topic Hub); one opens an Article Show that belongs to a
  // Collection.
  const articles = [
    // First card = the fully-built skin-care Article Show (see renderArticle()).
    { title: "Skin Care for Menopausal Skin: Best Ingredients and Routine", screen: "article" },
    { title: "6 menopause facts women wish they'd known sooner", screen: "article" },
    { title: "Article title", screen: "article-collection" },
    { title: "Which doctors treat menopause?", screen: "article" },
    { title: "Article title", screen: "article" },
  ];

  // Teaser cards for the Experts section: the first three committee members
  // from ADVISORS, so the landing and the Advisors page stay in sync.
  const experts = ADVISORS.slice(0, 3);

  // The closing CTA card differs for the Subscriber: they've already started
  // signing up, so it's a "finish up" card whose primary button opens the
  // Registration Step — its only entry point after the 2026-08-03 panel
  // redesign removed the "Finish up now" panel access card. Visitors keep the
  // standard "Join for free" → Sign Up Start.
  const isSubscriber = LOCKED_PERSONA_KEY === "subscriber";
  const ctaTitle = isSubscriber
    ? "Don't miss out! You're almost in."
    : "You don't have to figure this out alone.";
  const ctaSub = isSubscriber
    ? "Finish setting up your account to unlock posts, questions, groups, and the full community."
    : "Get medically-reviewed resources, tips from real women, and a community who gets it.";
  const ctaPrimary = isSubscriber
    ? `<button class="mod-btn-primary" data-screen="registration-step">Finish up now</button>`
    : `<button class="mod-btn-primary" data-screen="signup-start">Join for free</button>`;

  return `
    <section class="mod-hero">
      <img class="mod-hero__ring mod-hero__ring--tl" src="${ASSET_BASE}/hero-rings-tl.svg" alt="" aria-hidden="true" />
      <img class="mod-hero__ring mod-hero__ring--br" src="${ASSET_BASE}/hero-rings-br.svg" alt="" aria-hidden="true" />
      <h2 class="mod-hero__title">Where expert advice meets real women.</h2>
      <p class="mod-hero__sub">Clear, trustworthy insights from women living it — real menopause talk, unfiltered.</p>
      <div class="mod-hero__users">
        <span class="mod-hero__avatars">
          ${[1, 2, 3]
            .map((n) => `<img class="mod-hero__avatar" src="${ASSET_BASE}/community-${n}.png" alt="" aria-hidden="true" />`)
            .join("")}
        </span>
        <span class="mod-hero__count">12,345 women in the community</span>
      </div>
      <div class="mod-checker-card">
        <p class="mod-checker-card__title">Could it be perimenopause? Start here.</p>
        <div class="mod-checker-card__pills">
          ${checkerPills.map((p) => `<span class="mod-pill">${p}</span>`).join("")}
        </div>
        <div class="mod-checker-card__action">
          <button class="mod-checker-card__cta" data-screen="symptom-checker">Check all my symptoms</button>
          <p class="mod-checker-card__note">Free — No Sign up Required</p>
        </div>
      </div>
    </section>

    <section class="mod-listicles">
      <div class="mod-section-text">
        <h3 class="mod-section-text__title">See what <em>actually works</em>.</h3>
        <p class="mod-section-text__sub">Clinician-backed tips, voted on by women who've tried them.</p>
      </div>
      <div class="mod-listicles__scroll">
        ${listicles
          .map(
            (l) => `
          <div class="mod-listicle-card">
            <span class="mod-listicle-card__icon"><img src="${ASSET_BASE}/listicles_${l.img}.svg" alt="" onerror="this.remove()" /></span>
            <p class="mod-listicle-card__title">${l.title}</p>
            <button class="mod-listicle-card__cta" data-screen="listicle-detail">${l.cta}</button>
          </div>`
          )
          .join("")}
      </div>
    </section>

    <section class="mod-articles">
      <div class="mod-section-text">
        <h3 class="mod-section-text__title">Everything you <em>need to know</em>.</h3>
        <p class="mod-section-text__sub">Medically-reviewed resources to help you prepare for your appointments.</p>
      </div>
      <div class="mod-articles__scroll">
        ${articles
          .map(
            (a) => `
          <button class="mod-article-card" data-screen="${a.screen}">
            <span class="mod-article-card__thumb"></span>
            <span class="mod-article-card__title">${a.title}</span>
          </button>`
          )
          .join("")}
      </div>
    </section>

    <section class="mod-experts">
      <div class="mod-section-text">
        <h3 class="mod-section-text__title">Meet our <em>menopause advisors</em>.</h3>
        <p class="mod-section-text__sub">Top experts helping you stay current on what matters.</p>
      </div>
      <div class="mod-experts__list">
        ${experts
          .map(
            (e) => `
          <div class="mod-expert-card">
            <img class="mod-expert-card__avatar" src="${ASSET_BASE}/advisor-${e.photo}.jpg" alt="${e.name}" />
            <span class="mod-expert-card__info">
              <span class="mod-expert-card__name">${e.shortName || e.name}</span>
              <span class="mod-expert-card__role">${e.role}</span>
            </span>
          </div>`
          )
          .join("")}
      </div>
      <button class="mod-view-all-link" data-screen="advisors">View all advisors →</button>
    </section>

    <section class="mod-factoid">
      <h3 class="mod-factoid__title">You're <em>not imagining</em> it.</h3>
      <div class="mod-factoid__stats">
        <div class="mod-stat-card">
          <img class="mod-stat-card__graphic" src="${ASSET_BASE}/factoid-blob-1.svg" alt="" aria-hidden="true" />
          <p class="mod-stat-card__number">82%</p>
          <p class="mod-stat-card__text">of women mistook their early symptoms for stress, anxiety, or depression — not perimenopause.</p>
        </div>
        <div class="mod-stat-card">
          <img class="mod-stat-card__graphic mod-stat-card__graphic--wide" src="${ASSET_BASE}/factoid-blob-2.svg" alt="" aria-hidden="true" />
          <p class="mod-stat-card__number">72%</p>
          <p class="mod-stat-card__text">of women faced pushback when they raised their symptoms, told it was "just aging" or they were "too young."</p>
        </div>
      </div>
      <p class="mod-factoid__source">ThisIsMenopause Survey of 1,000 U.S. women ages 35–59 in perimenopause</p>
    </section>

    <section class="mod-community">
      <div class="mod-section-text">
        <h3 class="mod-section-text__title">What women are <em>saying</em>.</h3>
      </div>
      <div class="mod-quotes__scroll">
        <div class="mod-quote-card">
          <p class="mod-quote-card__text">"The brain fog from the sleep loss is killing me. I'm tired all the time because of the night sweats."</p>
        </div>
        <div class="mod-quote-card">
          <p class="mod-quote-card__text">"I got three different answers on HRT from three different doctors. No wonder nobody gets it."</p>
        </div>
      </div>
      <button class="mod-view-all-link" data-screen="community-overview">Join the conversation →</button>

      <div class="mod-cta-card">
        <img class="mod-cta-card__graphic mod-cta-card__graphic--tr" src="${ASSET_BASE}/closing-blob.svg" alt="" aria-hidden="true" />
        <img class="mod-cta-card__graphic mod-cta-card__graphic--bl" src="${ASSET_BASE}/closing-blob.svg" alt="" aria-hidden="true" />
        <p class="mod-cta-card__title">${ctaTitle}</p>
        <p class="mod-cta-card__sub">${ctaSub}</p>
        <div class="mod-cta-card__buttons">
          ${ctaPrimary}
          <button class="mod-btn-secondary" data-screen="symptom-checker">Check symptoms first</button>
        </div>
      </div>
      <p class="mod-disclaimer-note">BTW, we don't sell supplements or prescribe treatments. Just unbiased information and real talk.</p>
    </section>
  `;
}

// Global site footer — added to the bottom of every screen's scroll area.
// Content mirrors the Figma mobile footer (6371:29). Most links are
// non-navigating placeholders; "Medical Advisors" links to the built Advisors
// page (`data-screen="advisors"`). "Your Privacy Choices" keeps its CCPA opt-out
// icon (raster, works over file://).
function renderFooter() {
  // Each item is a plain label (placeholder link) or { label, screen } to
  // navigate via the shared [data-screen] handler.
  const col = (items) =>
    items
      .map((it) => {
        const label = typeof it === "string" ? it : it.label;
        const attr = typeof it === "string" ? "" : ` data-screen="${it.screen}"`;
        return `<a class="footer__link"${attr}>${label}</a>`;
      })
      .join("");
  const legal = ["Terms of Use", "Privacy Policy", "Cookie Policy", "Health Data"];
  const sep = ` <span class="footer__dot">&middot;</span> `;
  return `
    <footer class="footer">
      <div class="footer__bar">
        <div class="footer__brand">
          <img class="footer__logo" src="${PANEL_LOGO}" onerror="this.onerror=null;this.src='${LOGO_FULL}'" alt="This is Menopause" />
          <p class="footer__headline">Expert advice. Real women. Real talk.</p>
        </div>
        <div class="footer__links">
          <div class="footer__col">${col(["About", "Editorial Process", "Partner with Us", { label: "Medical Advisors", screen: "advisors" }])}</div>
          <div class="footer__col">${col(["Getting Started", "Community Guidelines", "Help Center", "Crisis"])}</div>
        </div>
      </div>
      <div class="footer__end">
        <p class="footer__legal">
          ${legal.map((t) => `<a class="footer__link footer__link--dark">${t}</a>`).join(sep)}${sep}<a class="footer__link footer__link--dark footer__privacy"><img src="${ASSET_BASE}/privacy-choices.png" alt="" />Your Privacy Choices</a>${sep}<a class="footer__link footer__link--dark">CA Notice at Collection</a>
        </p>
        <p class="footer__disclaimer">ThisIsMenopause&trade; is not a medical referral site and does not recommend or endorse any particular provider or medical treatment. No information on ThisIsMenopause should be construed as medical and/or health advice.</p>
        <p class="footer__copyright">&copy; 2026 MyHealthTeam, A Swoop Company.</p>
      </div>
    </footer>
  `;
}

// Article Show — the skin-care article. Built from the Figma "Articles" file
// (title-first, no hero). The top nav, "Topic Hub" level-up pill, and global
// footer are added by render(); this returns only the article body. Auth CTAs
// point at the shared signup-start flow like every other Join in the prototype.
function renderArticle() {
  const ICON = {
    bookmark: `<svg class="art__ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>`,
    chat: `<svg class="art__ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>`,
    sparkle: `<svg class="art__ic" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 6.4L20 10l-6.1 1.6L12 18l-1.9-6.4L4 10l6.1-1.6L12 2z"/><path d="M19 3l.7 2.3L22 6l-2.3.7L19 9l-.7-2.3L16 6l2.3-.7L19 3z"/></svg>`,
    chevDown: `<svg class="art__ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
    chevRight: `<svg class="art__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>`,
    arrow: `<svg class="art__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  };

  const presets = [
    "Tips for managing menopause at work",
    "Can Menopause cause hair loss?",
    "Can Menopause cause itchy skin",
    "Can menopause cause bloating?",
  ];
  const keepReading = [
    "Perimenopause Hair Changes: Hair Texture, Growth, and More",
    "Cortisol and Menopause: How Stress Hormones Affect Your Body",
  ];

  return `
    <article class="art">
      <div class="art__body">
        <header class="art__head">
          <h1 class="art__title">Skin Care for Menopausal Skin: Best Ingredients and Routine</h1>
          <p class="art__byline">Medically reviewed by Ellen Byars, MSN, WHNP, MSCP &middot; Written by Kate Harrison &middot; June 18, 2026</p>
          <div class="art__strip">
            <span class="art__reaction"><span class="art__avatar"></span>1 Reaction</span>
            <span class="art__save">${ICON.bookmark}Save</span>
          </div>
        </header>

        <div class="art-cta">
          <p class="art-cta__title">Get trusted info about menopause and connect with women who get it.</p>
          <button class="art-cta__btn" data-screen="signup-start">Join</button>
        </div>

        <div class="art-note">
          <p class="art-note__title">Key Takeaways</p>
          <div class="art-note__item"><span class="art-note__bullet">&bull;</span><p class="art-note__text">Menopause can bring on noticeable skin changes, including dryness, sensitivity, and loss of firmness, largely due to falling estrogen levels that affect how skin produces moisture and collagen.</p></div>
          <button class="art-note__link">View all takeaways</button>
        </div>

        <div class="art__lede">
          <p>Skin changes like fine lines often come with age. But if you’ve found that the skin on your face has become drier, duller, or more sensitive to products as you approach menopause, you’re not alone.</p>
          <p>Here are the best skin care ingredients that can help you care for your menopausal skin.</p>
        </div>

        <div class="art-poll">Poll</div>

        <section class="art__sec">
          <h2 class="art__h2">How Menopause Affects Your Skin</h2>
          <p>Skin changes often appear abruptly during perimenopause, the time leading up to menopause, marked by irregular periods. This is because hormonal changes, in particular falling levels of the hormone estrogen, affect skin cells.</p>
          <p>Estrogen helps keep skin moisturized by telling skin cells to produce oil and other hydrating substances. Lower estrogen levels lead to drier skin, which can compromise the skin’s barrier, resulting in skin that’s easily irritated.</p>
          <p>When estrogen levels are low, the body also makes less collagen, the protein that helps keep skin strong and smooth. Less collagen can cause a loss of skin firmness and elasticity. Research has shown that skin can lose as much as 30 percent of its collagen within five years of menopause.</p>
          <p>Around menopause, women often develop dry skin, uneven skin texture, wrinkles, thinning or sagging skin, a dysfunctional skin barrier, slowed healing, or sensitive skin.</p>
        </section>

        <section class="art__sec art-collapse">
          <h2 class="art__h2">The Best Ingredients for Menopausal Skin</h2>
          <p>Whether you’re trying to tackle dryness, breakouts, or irritation, the best skin care ingredients for you will depend on your skin’s unique needs.</p>
          <button class="art-collapse__link">Read full article ${ICON.chevDown}</button>
        </section>
      </div>

      <div class="art__end">
        <section class="art-conv">
          <p class="art-conv__title">${ICON.chat}Join the conversation</p>
          <div class="art-conv__input">Share your thoughts&hellip;</div>
        </section>

        <section class="art-answered">
          <p class="art-answered__title">${ICON.sparkle}Menopause, answered</p>
          ${presets.map((q) => `<button class="art-answered__q">${q}${ICON.arrow}</button>`).join("")}
          <button class="art-answered__ask">Ask AI</button>
        </section>

        <section class="art-keep">
          <h2 class="art-keep__h">Keep Reading</h2>
          <div class="art-keep__scroll">
            ${keepReading.map((t) => `<button class="art-keep__card" data-screen="article"><span class="art-keep__thumb"></span><span class="art-keep__title">${t}</span></button>`).join("")}
          </div>
        </section>

        <div class="mod-cta-card art-access">
          <img class="mod-cta-card__graphic mod-cta-card__graphic--tr" src="${ASSET_BASE}/closing-blob.svg" alt="" aria-hidden="true" />
          <img class="mod-cta-card__graphic mod-cta-card__graphic--bl" src="${ASSET_BASE}/closing-blob.svg" alt="" aria-hidden="true" />
          <p class="mod-cta-card__title">You don’t have to figure this out alone.</p>
          <p class="mod-cta-card__sub">Get medically-reviewed resources, tips from real women, and a community who gets it.</p>
          <div class="mod-cta-card__buttons">
            <button class="mod-btn-primary" data-screen="signup-start">Join for free</button>
            <button class="mod-btn-secondary" data-screen="symptom-checker">Check symptoms first</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const screen = persona.screens.find((s) => s.id === state.screenId) || persona.screens[0];

  // Chromeless full-screen flow pages (Sign Up Start, Registration Step): no top
  // nav, level-up bar, or footer — just an X in the top-left that closes back to
  // the page the user came from.
  if (screen.chromeless) {
    document.getElementById("phone").innerHTML = `
      <div class="screen">
        <div class="screen__scroll">
          <div class="screen__body screen__body--fill screen__body--flow">
            <button class="flow-close" data-action="close-flow" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6 18 18M18 6 6 18" /></svg>
            </button>
            <div class="screen__placeholder">${screen.title}</div>
          </div>
        </div>
      </div>`;
    return;
  }

  // Screen content: content modules if the screen has them, the gated welcome
  // card, otherwise the labelled placeholder.
  let content;
  if (screen.modules) {
    content = renderModules();
  } else if (screen.id === "advisors") {
    content = renderAdvisors();
  } else if (screen.type === "gated-home") {
    content = renderGatedHome();
  } else if (screen.id === "community-overview") {
    content = renderCommunityHub();
  } else if (screen.topicHub) {
    content = renderTopicHub(screen.topicHub);
  } else if (screen.collection) {
    content = renderCollectionCallout(screen.collection);
  } else if (screen.id === "article") {
    content = renderArticle();
  } else {
    content = `<div class="screen__placeholder">${screen.title}</div>`;
  }
  // Fill the viewport (centering the label / keeping the footer below the fold)
  // only for label & gated screens; module/content screens (incl. the Community
  // hub and Topic Hubs) flow at natural height from the top.
  const bodyFill = !screen.modules && screen.id !== "advisors" && screen.id !== "community-overview" && screen.id !== "article" && !screen.topicHub ? " screen__body--fill" : "";

  // Nav + level-up bar are separate sticky elements at the top of the scroll
  // area. The nav auto-hides on scroll-down and returns on scroll-up; the
  // level-up bar (when present) stays pinned. See attachAutoHide.
  let chrome = `<div class="screen__nav">${renderTopNav()}</div>`;
  if (screen.type === "uplevel") chrome += `<div class="screen__uplevel">${renderUplevel(screen)}</div>`;

  let overlays = "";
  if (state.panelOpen) overlays += renderPanel();
  if (state.dropdownOpen && persona.navVariant !== "visitor") overlays += renderDropdown();

  document.getElementById("phone").innerHTML = `
    <div class="screen">
      <div class="screen__scroll">
        ${chrome}
        <div class="screen__body${bodyFill}">${content}</div>
        ${renderFooter()}
      </div>
      ${overlays}
    </div>`;

  attachAutoHide();
}

// Auto-hiding nav: slide the top nav up on scroll-down (past a small threshold),
// reveal it on scroll-up. The level-up bar stays pinned — when the nav shows,
// the bar pins just below it (top = nav height); when the nav hides, the bar's
// top animates to 0 so it docks to the top edge. Re-bound each render.
function attachAutoHide() {
  const scroll = document.querySelector(".screen__scroll");
  const nav = scroll && scroll.querySelector(".screen__nav");
  if (!scroll || !nav) return;
  const uplevel = scroll.querySelector(".screen__uplevel");
  const navH = nav.offsetHeight;
  const setHidden = (hidden) => {
    nav.classList.toggle("is-hidden", hidden);
    if (uplevel) uplevel.style.top = hidden ? "0px" : navH + "px";
  };
  setHidden(false);
  let lastY = scroll.scrollTop;
  scroll.addEventListener("scroll", () => {
    const y = scroll.scrollTop;
    if (y > lastY && y > 80) setHidden(true);
    else if (y < lastY) setHidden(false);
    lastY = y;
  });
}

/* ---------------- Panel close animation ---- */

// Animate the panel out (slide + fade), then drop it from state when the
// animation ends. If the overlay is already gone, just sync state.
function closePanel() {
  const overlay = document.querySelector(".panel-overlay");
  if (!overlay) {
    state.panelOpen = false;
    return;
  }
  overlay.classList.add("is-closing");
  overlay.addEventListener(
    "animationend",
    () => {
      state.panelOpen = false;
      render();
    },
    { once: true }
  );
}

/* ---------------- Event wiring ---- */

document.addEventListener("click", (e) => {
  // In-prototype navigation: any element with data-screen="<id>" jumps to that
  // screen. This is the single path the Panel Library/Community items and the
  // profile Dropdown items all use — clicking one sets the screen and closes
  // whichever overlay it lived in (both flags cleared) before re-rendering.
  // Stays inside the current persona; crossing folders is the auth CTAs' job.
  const screenBtn = e.target.closest("[data-screen]");
  if (screenBtn) {
    state.prevScreenId = state.screenId; // remembered so chromeless flow pages can close "back"
    state.screenId = screenBtn.dataset.screen;
    state.panelOpen = false;
    state.dropdownOpen = false;
    render();
    return;
  }

  const actionEl = e.target.closest("[data-action]");
  if (!actionEl) return;
  const action = actionEl.dataset.action;

  switch (action) {
    case "toggle-panel":
      state.panelOpen = !state.panelOpen;
      state.dropdownOpen = false;
      render();
      break;
    case "close-panel":
      // Only when the scrim itself is tapped (not a click bubbling from inside).
      if (e.target.dataset.action === "close-panel") {
        closePanel();
      }
      break;
    case "toggle-dropdown":
      state.dropdownOpen = !state.dropdownOpen;
      state.panelOpen = false;
      render();
      break;
    case "close-dropdown":
      if (e.target.dataset.action === "close-dropdown") {
        state.dropdownOpen = false;
        render();
      }
      break;
    case "go-home":
      state.screenId = persona.screens[0].id;
      render();
      break;
    // Close a chromeless flow page (X in the corner) back to where it opened from.
    case "close-flow":
      state.screenId = state.prevScreenId || persona.screens[0].id;
      render();
      break;
    case "go-profile":
      if (persona.screens.some((s) => s.id === "my-profile")) {
        state.screenId = "my-profile";
        state.dropdownOpen = false;
        render();
      }
      break;
    // Cross-flow auth transitions (Join / Log in / Finish up / Log out) are
    // intentionally no-ops in this prototype — these CTAs no longer jump to
    // another persona's page; each flow stays self-contained.
  }
});

/* ---------------- Fit the fixed device frame to the viewport ----
   The phone is a fixed-size "device"; its size comes from the
   --device-width / --device-height tokens in main.css (single source of
   truth). On a viewport shorter (or narrower) than it, scale the whole
   device down with a transform so the page never scrolls — the design stays
   intact, just smaller. A transform is visual only and would otherwise leave
   its full-size layout box behind (still forcing scroll), so we collapse that
   leftover space with negative margins — split evenly on all four sides so the
   collapsed box stays centered on the same point the transform scales around,
   letting the flex .stage center it both ways.
   Skipped on <=430px-wide screens, where the CSS media query already makes
   the phone full-bleed (height:100vh). ---- */

const FIT_MARGIN = 16; // px of breathing room kept around the device

function fitPhone() {
  const phone = document.getElementById("phone");
  if (!phone) return;

  if (window.innerWidth <= 430) {
    phone.style.transform = "";
    phone.style.margin = "";
    return;
  }

  // Measure the device's true rendered box (screen + bezel border).
  // offsetWidth/offsetHeight are transform-independent, so the fit stays
  // correct regardless of box-sizing or border width.
  const w = phone.offsetWidth;
  const h = phone.offsetHeight;

  const scale = Math.min(
    1, // never upscale past the device's intrinsic size
    (window.innerHeight - FIT_MARGIN) / h,
    (window.innerWidth - FIT_MARGIN) / w
  );

  phone.style.transformOrigin = "center center";
  phone.style.transform = `scale(${scale})`;
  // Collapse the leftover layout box symmetrically so it stays centered.
  phone.style.margin = `${(-h * (1 - scale)) / 2}px ${(-w * (1 - scale)) / 2}px`;
}

window.addEventListener("resize", fitPhone);

// Hidden "back to all flows" hotspot — a small circle in the top-left corner
// that's invisible until hovered, linking back to the root launcher. Only on
// flow pages (this script runs there; the launcher doesn't load it).
function addHomeHotspot() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<a class="home-hotspot" href="../index.html" aria-label="Back to all flows" title="All flows">${icon("grid")}</a>`
  );
}

if (persona) {
  render();
  fitPhone();
  addHomeHotspot();
}
