import { getTranslations } from 'next-intl/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from 'next/image';

export default async function FaqPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FaqPage' });

  const questions = t.raw('questions'); // questions arrayini doğrudan al

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Ofis Resmi */}
      <div className="flex justify-center mb-5">
        <Image
          src="/images/kayseri-avukat-buro-gorsel.webp"
          alt="Kayseri Avukat Buro Oda"
          width={791}
          height={480}
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-5">{t('title')}</h1>
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {questions.map((item, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="text-lg text-left">{item.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}