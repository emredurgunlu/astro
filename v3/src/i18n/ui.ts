import en from "./locales/en";
import tr from "./locales/tr";

export const ui = { en, tr } as const;

export type Locale = typeof en;
