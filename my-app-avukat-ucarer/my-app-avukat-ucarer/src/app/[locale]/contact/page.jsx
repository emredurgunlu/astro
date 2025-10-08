import { getTranslations } from 'next-intl/server';
import { Mail, Phone, MapPin } from "lucide-react";
import Image from 'next/image';

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });
  const tFooter = await getTranslations({ locale, namespace: 'Footer' });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-5">{t('title')}</h1>
      <p className="text-center text-muted-foreground mb-2">
        {t('descriptionPart1')}      </p>
      <p className="text-center text-muted-foreground mb-5">
        <strong>{t('descriptionPart2')}</strong>{' '}
        <strong>{t('descriptionPart3')}</strong>
      </p>

      <h3 className="text-3xl font-bold mb-5 text-center">{t('mapTitle')}</h3>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.0629371523258!2d35.48287740634327!3d38.73498485820772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152b13457f788433%3A0xa29b7d3beed1cff8!2sAvukat%20Yasemin%20U%C3%A7arer%20Durgunlu!5e0!3m2!1str!2str!4v1750064981693!5m2!1str!2str" width="100%"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={t('mapTitle')}
      ></iframe>

      {/* İletişim Bilgileri */}
      <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md mt-12 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">{t('contactInfoTitle')}</h2>
        <div className="space-y-6 text-center">
          <a
            href="https://maps.app.goo.gl/riBmHzqj7KcKxn2x9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-3 md:justify-start md:items-start"
          >
            <MapPin className="h-10 w-10 text-muted-foreground" />
            <span className="text-2xl text-muted-foreground whitespace-pre-line">
              {tFooter('address')}
            </span>
          </a>
          <div className="flex items-center justify-center gap-4">
            <Phone className="h-10 w-10 text-muted-foreground" />
            <a href="tel:+905362191550" className="text-2xl text-muted-foreground hover:text-foreground">+90 536 219 15 50</a>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Mail className="h-10 w-10 text-muted-foreground" />
            <a href="mailto:yaseminucarer@hotmail.com" className="text-2xl text-muted-foreground hover:text-foreground">yaseminucarer@hotmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}