import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}) {
  const {locale, 'service-area-slug': slug} = await params;
  const t = await getTranslations({locale, namespace: 'ServiceAreasPage'});
  const serviceAreas = t.raw('serviceAreas');
  const area = serviceAreas[slug];

  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    keywords: area.metaKeywords,
  };
}


export default function ServiceAreasLayout({children}) {
  return <div>{children}</div>;
}