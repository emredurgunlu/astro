import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'ContactPage'});
 
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('metaKeywords'),
  };
}

export default function ContactLayout({children}) {
  
  
  return (
    <div className="contact-layout">
      {children}
    </div>
  );
}
