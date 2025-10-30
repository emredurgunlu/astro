import en from "./locales/en.json";
import tr from "./locales/tr.json";
import de from "./locales/de.json";

export const ui = { en, tr, de } as const;

export type Locale = typeof en;
