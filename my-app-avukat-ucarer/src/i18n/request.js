import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

import tr from '../../messages/tr.json';
import en from '../../messages/en.json';

const messagesMap = {tr, en};

export default getRequestConfig(({locale}) => {
  // Gelen locale geçerli mi, kontrol et
  const finalLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  return {
    locale: finalLocale,
    messages: messagesMap[finalLocale]
  };
});
