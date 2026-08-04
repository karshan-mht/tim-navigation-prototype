// Scale-to-fit for the phone frame on these standalone entry-point mock pages.
// Same behavior as main.js's fitPhone() (scale the device down to fit shorter/
// narrower windows, capped at 1x, full-bleed under 430px) — kept as its own
// tiny file instead of loading main.js itself, since these pages have no
// <body data-persona> and main.js would error looking one up.
const FIT_MARGIN = 16; // px of breathing room kept around the device

function fitPhone() {
  const phone = document.getElementById("phone");
  if (!phone) return;

  if (window.innerWidth <= 430) {
    phone.style.transform = "";
    phone.style.margin = "";
    return;
  }

  const w = phone.offsetWidth;
  const h = phone.offsetHeight;

  const scale = Math.min(
    1, // never upscale past the device's intrinsic size
    (window.innerHeight - FIT_MARGIN) / h,
    (window.innerWidth - FIT_MARGIN) / w
  );

  phone.style.transformOrigin = "center center";
  phone.style.transform = `scale(${scale})`;
  phone.style.margin = `${(-h * (1 - scale)) / 2}px ${(-w * (1 - scale)) / 2}px`;
}

window.addEventListener("resize", fitPhone);
fitPhone();
