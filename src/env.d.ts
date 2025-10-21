/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_ID?: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
