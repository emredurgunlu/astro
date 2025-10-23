import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'FaqPage'});
 
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('metaKeywords'),
  };
}

export default function FaqLayout({children}) {
  
  
  return (
    <div className="faq-layout">
      {children}
    </div>
  );
}
