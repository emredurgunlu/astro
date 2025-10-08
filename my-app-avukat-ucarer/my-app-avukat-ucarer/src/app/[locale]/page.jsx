import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Phone } from "lucide-react";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  const tNavbar = await getTranslations({ locale, namespace: 'Navbar' });
  const tServiceAreas = await getTranslations({ locale, namespace: 'ServiceAreasPage' });
  const serviceAreas = tServiceAreas.raw('serviceAreas');

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center mb-5">
        <div className="w-full max-h-[420px] rounded-3xl overflow-hidden shadow-lg relative">
          <Image
            src="/images/hero.webp"
            alt="Adalet Görseli"
            width={1200}
            height={365}
            className="w-full h-[220px] md:h-[320px] lg:h-[420px] object-cover object-center"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center">
            <div className="mb-4">
              <Image
                src="/images/logo.webp"
                alt={tNavbar('brandName')}
                width={300}
                height={275}
              />
            </div>
            <blockquote className="text-xl md:text-2xl font-semibold text-center text-white italic mb-2">
              "Bağımsızlık, istikbal, hürriyet; her şey adaletle mevcuttur."
            </blockquote>
            <div>
              <Image
                src="/images/ataturk.png"
                alt="Atatürk İmza"
                width={120}
                height={39}
                className="w-[120px] h-[39px] object-contain brightness-0 invert"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <h1 className="text-4xl font-bold text-center mb-5">Kayseri Avukat | {t('title')}</h1>
      <p className="text-center text-muted-foreground">
        Kayseri'de Adliyenin hemen yanında Avukat Yasemin DURGUNLU tarafından kurulan Uçarer Hukuk ve Danışmanlık; hukukun çeşitli alanlarında, yerli ve yabancı müvekkillerine avukatlık ve hukuki danışmanlık hizmeti vermektedir. Bilgili, ilgili ve hızlı avukatlık hizmeti anlayışını misyon edinen Avukatlık Büromuz müvekkillerimizin haklarını almaları konusunda en iyi avukatlık hizmetini vermeyi amaçlamaktadır. Ofis görüşmesi öncesi randevu almanız tavsiye edilir.
      </p>


      {/* İletişim Bölümü */}
      <div className="bg-gradient-to-r from-amber-600/20 via-background to-amber-600/20 dark:from-yellow-600/20 dark:via-background dark:to-yellow-600/20 rounded-lg mb-2">
        <div className="flex flex-col items-center">
          {/* Telefon Numarası */}
          <a
            href="tel:+905362191550"
            className="flex items-center gap-2 text-orange-600 font-bold text-3xl hover:text-orange-700 transition-all duration-300 hover:scale-120 hover:shadow-lg mt-5 animate-bounce"
          >
            <Phone className="w-8 h-8" />
            +90 536 219 15 50
          </a>

          {/* Sosyal Medya İkonları */}
          <div className="flex items-center gap-12 mb-2">
            <a
              href="https://wa.me/905362191550?text=Merhaba,%20Avukatlık%20-%20Danışmanlık%20Hizmeti%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-120 transition-transform"
            >
              <Image src="/images/whatsapp.webp" alt="whatsapp" width={52} height={52} />
            </a>
            <a
              href="https://www.instagram.com/avukat_yasemin_ucarer/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-120 transition-transform"
            >
              <Image src="/images/instagram.webp" alt="instagram" width={48} height={48} />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(serviceAreas).map(([slug, area], index) => (
          <Card key={slug} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 rounded-2xl py-0">
            <div className="relative w-full h-64 rounded-t-2xl overflow-hidden">
              <Image
                src={area.image}
                alt={area.title}
                fill
                className="object-cover"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <CardHeader className="relative -mt-16 bg-card rounded-t-3xl pt-4">
              <CardTitle className="text-xl font-bold text-center text-card-foreground">{area.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground text-center mt-2">
                {area.desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4 pt-0 text-center">
              <Link key={slug} href={`/service-areas/${slug}`} passHref>
                <Button variant="default" className="rounded-full">
                  Detaylı Bilgi
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Google Yorumlar Bölümü */}
      <section className="mt-16">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-center flex flex-wrap items-center gap-2">
            Avukatlık Büromuza Gelen Bazı
            <span className="ml-2 flex items-center">
              <span className="font-bold" style={{ color: '#4285F4' }}>G</span>
              <span className="font-bold" style={{ color: '#EA4335' }}>o</span>
              <span className="font-bold" style={{ color: '#FBBC05' }}>o</span>
              <span className="font-bold" style={{ color: '#4285F4' }}>g</span>
              <span className="font-bold" style={{ color: '#34A853' }}>l</span>
              <span className="font-bold" style={{ color: '#EA4335' }}>e</span>
            </span>
            Yorumları
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Yorum 1 */}
          <Card className="bg-card rounded-xl shadow p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Ayten Ayhan</span>
              <div className="flex ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Hiç tereddüt etmeden danışacağınız bir avukat... İşinin ustası ben çok memnun kaldım ilgilerinden dolayı kendisine teşekkürlerimi sunuyorum...
            </p>
          </Card>
          {/* Yorum 2 */}
          <Card className="bg-card rounded-xl shadow p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Heval Şekerci</span>
              <div className="flex ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Kendisi ile bir yıl önce tanıştım<br />Farklı bir şehirde olmama rağmen bana çok yardımcı oldu🙏🏻<br />İlgisine ve emeğine teşekkür ediyorum
            </p>
          </Card>
          {/* Yorum 3 */}
          <Card className="bg-card rounded-xl shadow p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Demet Özdemir</span>
              <div className="flex ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Yasemin Ucarer işinde başarılı ve deneyimli birisidir. Herhangi bir avukatlık işinizde gönül rahatlığı ile danışabilirsiniz. Kendisine bana yardımlarından dolayı teşekkür ediyorum
            </p>
          </Card>
          {/* Yorum 4 */}
          <Card className="bg-card rounded-xl shadow p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Şemsi Nur Ayışık</span>
              <div className="flex ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Avukat Hanım çok ilgiliydi, her sorumuza özenle cevap verdi. Kesinlikle tavsiye ederim.
            </p>
          </Card>
        </div>
        <div className="flex justify-center">
          <a
            href="https://www.google.com.tr/search?sa=X&sca_esv=d2336463bd812dcd&hl=tr&tbm=lcl&q=Avukat+Yasemin+U%C3%A7arer+Durgunlu+Yorumlar&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDQ3NDewNDM1NbSwNDc3MTcxsdjAyPiKUcOxrDQ7sUQhMrE4NTczTyH08PLEotQiBZfSovTSvJxShcj8otLcnMSiRaxEKwUASpHenHEAAAA&rldimm=11717096551897747448&ved=2ahUKEwjT4KbU2vONAxXRS_EDHdbbNAgQ9fQKegQIRBAF&biw=1912&bih=928&dpr=1#lkt=LocalPoiReviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-6 py-2 rounded-full text-base font-semibold transition-colors duration-300"
          >
            Tüm Yorumları İncele
          </a>
        </div>
      </section>
    </div>
  );
}