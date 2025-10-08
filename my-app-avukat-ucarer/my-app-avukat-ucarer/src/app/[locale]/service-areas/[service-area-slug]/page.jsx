import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateStaticParams() {
  const t = await getTranslations({
    locale: "tr",
    namespace: "ServiceAreasPage",
  });
  const serviceAreas = t.raw("serviceAreas");
  return Object.keys(serviceAreas).map((slug) => ({
    "service-area-slug": slug,
  }));
}

export default async function ServiceAreaDetailPage({ params }) {
  const { locale, "service-area-slug": slug } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceAreasPage" });
  const serviceAreas = t.raw("serviceAreas");
  const area = serviceAreas[slug];

  if (!area) return <div>Bulunamadı.</div>;

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-left mb-8">
      <Image
        src={area.image}
        alt={area.title}
        width={450}
        height={300}
        className="mx-auto rounded-2xl shadow-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-center mb-4">{area.title}</h1>
      <p className="text-lg text-muted-foreground text-center">{area.desc}</p>

      {area.content.map((item, index) => (
        <article key={index} className="mb-6 mt-4 text-base">
          <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
          <div
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
        </article>
      ))}
    </div>
  );
}
