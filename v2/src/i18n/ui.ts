import en from "./locales/en";
import tr from "./locales/tr";
import de from "./locales/de";

export const ui = { en, tr, de } as const;

export type Locale = typeof en;
