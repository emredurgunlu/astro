import en from "./locales/en.json";
import tr from "./locales/tr.json";

export const ui = { en, tr} as const;

export type Locale = typeof en;
