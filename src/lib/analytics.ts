declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackWhatsAppClick(servicio?: string) {
  // Meta Pixel — Contact event
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact", {
      content_name: servicio || "WhatsApp General",
    });
  }

  // GA4 — custom event
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "whatsapp_click", {
      event_category: "contact",
      event_label: servicio || "general",
    });
  }
}
