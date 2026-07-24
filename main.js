/* ============================================================
   TIM Global Navigation — working prototype (persona-locked build)
   Source: Figma "Global Navigation" file (42yas7Q9FfwhL6xUocjEAl)
   Each flow page sets <body data-persona="..."> to lock this
   script to one persona — no switcher, so sharing one flow's URL
   doesn't expose the others.
   ============================================================ */

/* ---------------- Icons — real assets exported from Figma
   (Global Navigation 42yas7Q9FfwhL6xUocjEAl), saved under
   assets/ and referenced by relative path. See components.md
   → Assets for the source node id behind each file.

   Paths are relative to each flow page (e.g. /visitor/index.html),
   which sits one level above /assets/ — hence the "../assets" base. ---- */

const ASSET_BASE = "../assets";

// Figma-exported SVG icons, keyed by the names used throughout this script.
// Each icon carries its own fill straight from Figma (nav = ink, library &
// community = magenta, back chevron = blue), so they are dropped in as <img>
// with no CSS tinting.
const ICON_FILES = {
  menu: "icons/menu.svg",
  search: "icons/search.svg",
  ai: "icons/ai.svg",
  back: "icons/back.svg",
  hrt: "icons/topic-hrt.svg",
  mood: "icons/topic-mood.svg",
  sleep: "icons/topic-sleep.svg",
  diet: "icons/topic-diet.svg",
  family: "icons/topic-family.svg",
  allTopics: "icons/topic-all.svg",
  stories: "icons/community-stories.svg",
  qa: "icons/community-qa.svg",
  groups: "icons/community-groups.svg",
  meetOthers: "icons/community-meet.svg",
  allActivities: "icons/community-activities.svg",
  myHealth: "icons/menu-myhealth.svg",
  messages: "icons/menu-messages.svg",
  notifications: "icons/menu-notifications.svg",
  settings: "icons/menu-settings.svg",
  logout: "icons/menu-logout.svg",
};

// The panel close (X) is a prototype-only affordance — the Figma panel has no
// close-icon node (it dismisses by tapping the scrim), so this stays inline.
const INLINE_ICONS = {
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>`,
};

// Logo + profile assets (raster wordmark/mark exported at 3x; profile is SVG).
const LOGO_FULL = `${ASSET_BASE}/logo/logotype.png`; // full "this is Menopause" wordmark
const LOGO_MARK = `${ASSET_BASE}/logo/logomark.png`; // compact circular logomark
const PROFILE_PLACEHOLDER = `${ASSET_BASE}/profile/placeholder_profile.svg`;

/* ---------------- Content data (pulled verbatim from Figma nodes —
   see components.md for the node-id source of each list) ---- */

const TOPIC_ITEMS = [
  { icon: "hrt", label: "HRT & Other Treatments" },
  { icon: "mood", label: "Mood & Mental Health" },
  { icon: "sleep", label: "Sleep & Insomnia" },
  { icon: "diet", label: "Diet & Nutrition" },
  { icon: "family", label: "Family & Relationships" },
  { icon: "allTopics", label: "All Topics" },
];
const TOPIC_ITEMS_MEMBER = [
  { icon: "hrt", label: "HRT & Other Treatments" },
  { icon: "mood", label: "Mood & Mental Health" },
  { icon: "sleep", label: "Sleep & Insomnia" },
  { icon: "allTopics", label: "All Topics" },
];
const COMMUNITY_ITEMS = [
  { icon: "stories", label: "Stories" },
  { icon: "qa", label: "Questions & Answers" },
  { icon: "groups", label: "Groups" },
  { icon: "meetOthers", label: "Meet Others" },
  { icon: "allActivities", label: "All Activities" },
];
const DROPDOWN_MENU = [
  { icon: "myHealth", label: "My Health", divider: true },
  { icon: "messages", label: "Messages" },
  { icon: "notifications", label: "Notifications (5)" },
  { icon: "settings", label: "Settings", divider: true },
  { icon: "logout", label: "Log out" },
];

/* ---------------- Persona / screen model ---- */

const PERSONAS = {
  visitor: {
    label: "Anonymous Visitor",
    navVariant: "visitor",
    panelType: "visitor",
    screens: [
      { id: "splash", label: "Splash Landing", type: "tabs", title: "Splash Landing" },
      { id: "topic", label: "Topic Center", type: "uplevel", title: "Topic Center", backLabel: "All Topics" },
      { id: "article", label: "Article Show", type: "uplevel", title: "Article Show", backLabel: "Topic Center" },
    ],
  },
  "logged-out-member": {
    label: "Logged Out Member",
    navVariant: "member",
    panelType: "member",
    screens: [
      { id: "home-gated", label: "Home (gated)", type: "gated-home", title: "Home as a hub\n(gated)" },
    ],
  },
  "logged-in-member": {
    label: "Logged In Member",
    navVariant: "member-photo",
    panelType: "member",
    screens: [
      { id: "home", label: "Home as a Hub", type: "tabs", title: "Home as a Hub" },
      { id: "article", label: "Article Show", type: "uplevel", title: "Article Show", backLabel: "Topic" },
      { id: "group", label: "Group Detail", type: "uplevel", title: "Group Detail", backLabel: "Groups" },
      { id: "program", label: "Program Detail", type: "uplevel", title: "Program Detail", backLabel: "Programs" },
      { id: "profile", label: "Member Profile", type: "uplevel", title: "Someone\u2019s Member Profile", backLabel: "Meet Others" },
      { id: "question", label: "Question Show", type: "uplevel", title: "Question Show", backLabel: "Questions & Answers" },
      { id: "activity", label: "Activity Show", type: "uplevel", title: "Activity Show", backLabel: "Activity" },
    ],
  },
  subscriber: {
    label: "Subscriber",
    navVariant: "member",
    panelType: "subscriber",
    screens: [
      { id: "home", label: "Home (assumed)", type: "tabs", title: "Home\n(no Subscriber-specific\ntop nav in source file)" },
    ],
  },
};

// Every CTA that represents "become a logged-in member" sends the visitor
// to this folder as a real page navigation — not an in-page state swap —
// so each flow stays a genuinely separate, shareable page.
const LOGGED_IN_MEMBER_FOLDER = "../logged-in-member/index.html";

/* ---------------- Locked persona (set per-page via <body data-persona>) ---- */

const LOCKED_PERSONA_KEY = document.body.dataset.persona;
const persona = PERSONAS[LOCKED_PERSONA_KEY];

if (!persona) {
  console.error(`Unknown or missing persona key on <body data-persona>: "${LOCKED_PERSONA_KEY}"`);
}

let state = {
  screenId: persona.screens[0].id,
  panelOpen: false,
  dropdownOpen: false,
};

/* ---------------- Render helpers ---- */

function icon(name) {
  if (INLINE_ICONS[name]) return INLINE_ICONS[name];
  const file = ICON_FILES[name];
  return file ? `<img class="icon" src="${ASSET_BASE}/${file}" alt="" />` : "";
}

function renderTopNav() {
  const isVisitor = persona.navVariant === "visitor";

  const left = isVisitor
    ? `<img class="logo logo--full" src="${LOGO_FULL}" alt="This is Menopause" />`
    : `<img class="logo logo--mark" src="${LOGO_MARK}" alt="This is Menopause" />`;

  // Both member states use Figma's placeholder_profile illustration for the
  // avatar (the source file has no distinct member headshot, and the stock
  // Unsplash photo it replaced was a prototype stand-in). The member vs.
  // member-photo nav variants remain distinct in the persona model.
  const right = isVisitor
    ? `<button class="join-btn" data-action="join">Join</button>`
    : `<button class="profile-btn" data-action="toggle-dropdown" aria-label="Account menu">
         <img class="profile-img" src="${PROFILE_PLACEHOLDER}" alt="" />
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

function renderUplevel(backLabel) {
  return `
    <button class="uplevel" data-action="go-home">
      ${icon("back")}
      <span>${backLabel}</span>
    </button>
  `;
}

function renderPanelItems(items) {
  return items
    .map((it) => `<button class="panel__item">${icon(it.icon)}<span>${it.label}</span></button>`)
    .join("");
}

function renderPanel() {
  const topicItems = persona.panelType === "visitor" || persona.panelType === "subscriber" ? TOPIC_ITEMS : TOPIC_ITEMS_MEMBER;

  let accessCard = "";
  if (persona.panelType === "visitor") {
    accessCard = `
      <div class="panel__access">
        <h3>Don&rsquo;t miss out!</h3>
        <p>Join our community to access posts, questions, groups, and meet people.</p>
        <button class="panel__access-btn" data-action="join">Join for free</button>
        <div class="panel__access-note">Get a preview first</div>
      </div>`;
  } else if (persona.panelType === "subscriber") {
    accessCard = `
      <div class="panel__access">
        <h3>Don&rsquo;t miss out!</h3>
        <p>Create your account to access posts, questions, groups, and meet people.</p>
        <button class="panel__access-btn" data-action="finish-up">Finish up now</button>
        <div class="panel__access-note">Get a preview first</div>
      </div>`;
  }

  const communitySection =
    persona.panelType === "member"
      ? `<div class="panel__section">
           <p class="panel__section-label">Community</p>
           ${renderPanelItems(COMMUNITY_ITEMS)}
         </div>`
      : "";

  return `
    <div class="panel-overlay" data-action="close-panel">
      <div class="panel" data-stop>
        <div class="panel__top">
          <img class="logo logo--full panel__logotype" src="${LOGO_FULL}" alt="This is Menopause" />
          <button class="panel__close" data-action="close-panel" aria-label="Close menu">${icon("close")}</button>
        </div>
        <div class="panel__menu">
          <div class="panel__section">
            <p class="panel__section-label">Library</p>
            ${renderPanelItems(topicItems)}
          </div>
          ${communitySection}
          ${accessCard}
        </div>
        <div class="panel__footer">Powered by MyHealthTeam, a Swoop company</div>
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
          ${DROPDOWN_MENU.map(
            (it) => `<button class="dropdown__item${it.divider ? " dropdown__divider" : ""}">${icon(it.icon)}<span>${it.label}</span></button>`
          ).join("")}
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

function render() {
  const screen = persona.screens.find((s) => s.id === state.screenId) || persona.screens[0];

  let body = `<div class="screen__placeholder">${screen.title}</div>`;
  body += renderTopNav();

  if (screen.type === "uplevel") {
    body += renderUplevel(screen.backLabel);
  }
  if (screen.type === "gated-home") {
    body += renderGatedHome();
  }
  if (state.panelOpen) {
    body += renderPanel();
  }
  if (state.dropdownOpen && persona.navVariant !== "visitor") {
    body += renderDropdown();
  }

  document.getElementById("phone").innerHTML = `<div class="screen">${body}</div>`;
}

/* ---------------- Event wiring ---- */

document.addEventListener("click", (e) => {
  // In-prototype navigation: any element with data-screen="<id>" jumps to that
  // screen. This is how the flows link between screens now that the external
  // screen-tab switcher is gone — e.g. a panel/nav item can carry data-screen.
  const screenBtn = e.target.closest("[data-screen]");
  if (screenBtn) {
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
      if (e.target.dataset.action === "close-panel") {
        state.panelOpen = false;
        render();
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
    case "go-profile":
      if (persona.screens.some((s) => s.id === "profile")) {
        state.screenId = "profile";
        state.dropdownOpen = false;
        render();
      }
      break;
    // Real page navigation — this is what actually crosses from one
    // flow folder into another, on purpose, as a deliberate user action.
    case "join":
    case "log-in":
    case "finish-up":
      window.location.href = LOGGED_IN_MEMBER_FOLDER;
      break;
  }
});

if (persona) render();
