import { getTranslations } from 'next-intl/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function LawAcademyPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LawAcademyPage' });

  const articles = t.raw('articles');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">{t('title')}</h1>
      <p className="text-lg text-center mb-8">{t('description')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.values(articles).map((article, index) => (
          <Card
            key={index}
            className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{article.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {article.publishDate}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-700 dark:text-gray-300">{article.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}