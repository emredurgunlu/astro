import { ui } from "./ui";

export const LANGUAGES = {
  en: "English",
  fr: "Français",
  es: "Español",
};

export const LANGUAGES_KEYS = Object.keys(LANGUAGES) as UiType[];

export const DEFAULT_LANG: UiType = "en";

export type UiType = keyof typeof ui;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as UiType;
  return DEFAULT_LANG;
}

export function useTranslations(lang?: UiType) {
  return function t(
    key: keyof (typeof ui)[typeof DEFAULT_LANG],
    ...args: any[]
  ) {
    let translation: string = ui[lang ?? DEFAULT_LANG][key] || ui[DEFAULT_LANG][key];
    if (args.length > 0) {
      for (let i = 0; i < args.length; i++) {
        translation = translation.replace(`{${i}}`, args[i]);
      }
    }
    return translation;
  };
}

export function pathNameIsInLanguage(pathname: string, lang: UiType) {
  return pathname.startsWith(`/${lang}`) || (lang === DEFAULT_LANG && !pathNameStartsWithLanguage(pathname));
}

function pathNameStartsWithLanguage(pathname: string) {
  let startsWithLanguage = false;
  const languages = Object.keys(LANGUAGES);

  for (let i = 0; i < languages.length; i++) {
    const lang = languages[i];
    if (pathname.startsWith(`/${lang}`)) {
      startsWithLanguage = true;
      break;
    }
  }

  return startsWithLanguage;
}

export function getLocalizedPathname(pathname: string, lang: UiType) {
  // First, swap the language segment or prefix with the desired language
  let localized = pathname;
  if (pathNameStartsWithLanguage(pathname)) {
    const availableLanguages = Object.keys(LANGUAGES).join('|');
    const regex = new RegExp(`^\/(${availableLanguages})`);
    localized = pathname.replace(regex, `/${lang}`);
  } else {
    localized = `/${lang}${pathname}`;
  }

  // If the path points to a tag page, translate the tag slug to the target language
  const parts = localized.split('/');
  // Expecting ['', lang, 'tags', '<tag>', ...]
  if (parts.length >= 4 && parts[2] === 'tags') {
    const currentTag = parts[3];
    parts[3] = translateTag(currentTag, lang);
    localized = parts.join('/');
  }

  return localized;
}

// Minimal tag localization: swap trailing language suffix (en|es|fr)
// Works for slugs like 'astroen', 'astroes', 'webdevfr', 'tutoriales'.
// If slug doesn't follow this pattern (e.g. 'mdx'), it remains unchanged.
export function translateTag(tag: string, toLang: UiType): string {
  const match = tag.match(/^(.+?)(en|es|fr)$/);
  if (!match) return tag;
  const base = match[1];
  return `${base}${toLang}`;
}

export function getTagsByLanguage(posts: Array<any>, lang: UiType) {
  const filteredPosts = posts.filter((post) => post?.data?.lang === lang);
  const allTags = filteredPosts.flatMap((post) => post?.data?.tags || []);
  const uniqueTags = Array.from(new Set(allTags));
  const tagsWithPosts = uniqueTags.map((tag) => ({
    tag,
    posts: filteredPosts.filter((post) => (post?.data?.tags || []).includes(tag)),
  }));
  return tagsWithPosts;
}
