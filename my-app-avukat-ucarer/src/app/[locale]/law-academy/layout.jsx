import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'LawAcademyPage'});
 
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('metaKeywords'),
  };
}

export default function LawAcademyPage({children}) {
  
  
  return (
    <div className="lawAcademyPage-layout">
      {children}
    </div>
  );
}
