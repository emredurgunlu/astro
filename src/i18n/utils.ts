import { ui } from "./ui";

export const LANGUAGES = {
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
} as const;

export const LANGUAGES_KEYS = Object.keys(LANGUAGES) as UiType[];

export const DEFAULT_LANG = "tr" as const; // <— en yerine tr

export type UiType = keyof typeof LANGUAGES;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang && lang in LANGUAGES) return lang as UiType;
  return DEFAULT_LANG;
}

export function useTranslations(lang?: UiType) {
  return lang ? ui[lang] : ui[DEFAULT_LANG];
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

export function translateTag(tag: string, toLang: UiType): string {
  const match = tag.match(/^(.+?)(en|tr)$/);
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
