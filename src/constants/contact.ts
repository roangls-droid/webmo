export const EMAIL = "webmo.belgique@gmail.com";
export const PHONE_DISPLAY = "+32 492 96 87 45";
export const PHONE_HREF = "tel:+32492968745";

export const CONTACT_LINKS = [
  { label: "Email", href: `mailto:${EMAIL}`, display: EMAIL },
  { label: "Téléphone", href: PHONE_HREF, display: PHONE_DISPLAY },
] as const;
