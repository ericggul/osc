//google analytics write code

const GA_TRACKING_ID = "G-2D4T5PS78F";

export default function gaEvent(action, category, label, value = 0) {
  try {
    console.log("7", action, category, label, value);
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } catch (e) {
    console.log(e);
  }
}

export function pageView(url) {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
}
