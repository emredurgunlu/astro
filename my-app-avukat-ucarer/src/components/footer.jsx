import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

export async function Footer({ locale }) {
    const t = await getTranslations({ locale, namespace: 'Footer' });
    const tNavbar = await getTranslations({ locale, namespace: 'Navbar' });
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 md:px-6">
                {/* Ana Footer İçeriği */}
                <div className="grid grid-cols-12 gap-8 py-12">
                    {/* Logo ve Açıklama */}
                    <div className="col-span-full text-center flex flex-col items-center md:col-span-6 lg:col-span-3">
                        <span className="text-lg font-semibold">{tNavbar('brandName')}</span>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Avukat Yasemin DURGUNLU
                        </p>
                        <Image
                            src="/images/logo.webp"
                            alt={tNavbar('brandName')}
                            width={150}
                            height={138}
                            className="h-auto"
                        />
                    </div>

                    {/* Hızlı Linkler */}
                    <div className="col-span-full space-y-4 text-center md:col-span-6 lg:col-span-2">
                        <h3 className="font-semibold text-sm">
                            {t('quickLinks', 'Hızlı Linkler')}
                        </h3>
                        <nav className="flex flex-col gap-2">
                            <Link
                                href="/"
                                locale={locale}
                                className="text-sm text-muted-foreground hover:text-foreground "
                            >
                                {tNavbar('home')}
                            </Link>
                            <Link
                                href="/faq"
                                locale={locale}
                                className="text-sm text-muted-foreground hover:text-foreground "
                            >
                                {tNavbar('faq')}
                            </Link>
                            <Link
                                href="/law-academy"
                                locale={locale}
                                className="text-sm text-muted-foreground hover:text-foreground "
                            >
                                {tNavbar('lawAcademy')}
                            </Link>
                            <Link
                                href="/contact"
                                locale={locale}
                                className="text-sm text-muted-foreground hover:text-foreground "
                            >
                                {tNavbar('contact')}
                            </Link>
                        </nav>
                    </div>

                    {/* Legal Services */}
                    <div className="col-span-full space-y-4 text-center md:col-span-5 lg:col-span-3">
                        <h3 className="font-semibold text-sm">
                            {t('ourServices')}
                        </h3>
                        <nav className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">
                                {t('service1')}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {t('service2')}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {t('service3')}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {t('service4')}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {t('service5')}
                            </span>
                        </nav>
                    </div>

                    {/* İletişim Bilgileri */}
                    <div className="col-span-full flex flex-col items-center md:col-span-6 lg:col-span-3 md:items-start md:gap-8">
                        <div className="space-y-4 w-full">
                            <h3 className="font-semibold text-sm text-center">
                                {tNavbar('contact')}
                            </h3>
                            <div className="space-y-3">
                                <a
                                    href="https://maps.app.goo.gl/riBmHzqj7KcKxn2x9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex justify-center items-center gap-3 md:justify-start md:items-start"
                                >
                                    <MapPin className="h-6 w-6 mt-0.5 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground whitespace-pre-line">
                                        {t('address')}
                                    </span>
                                </a>

                                <div className="flex justify-center items-center gap-3 md:justify-start md:items-start">
                                    <Phone className="text-muted-foreground" />
                                    <a
                                        href="tel:+905362191550"
                                        className="text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        +90 536 219 15 50
                                    </a>
                                </div>

                                <div className="flex justify-center items-center gap-3 md:justify-start md:items-start">
                                    <Mail className="text-muted-foreground" />
                                    <a
                                        href="mailto:yaseminucarer@hotmail.com"
                                        className="text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        yaseminucarer@hotmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sosyal Medya */}
                    <div className="col-span-full flex flex-row justify-center gap-3 md:col-span-1 md:flex-col md:items-start mt-6 md:mt-0">
                        <a
                            href="https://www.facebook.com/profile.php?id=100004305138447&mibextid=rS40aB7S9Ucbxw6v"
                            className="p-2 rounded-md hover:text-foreground text-muted-foreground"
                            aria-label="Facebook"
                        >
                            <Facebook className="h-6 w-6" />
                        </a>
                        <a
                            href="/"
                            className="p-2 rounded-md hover:text-foreground text-muted-foreground"
                            aria-label="Twitter"
                        >
                            <Twitter className="h-6 w-6" />
                        </a>
                        <a
                            href="https://www.instagram.com/avukat_yasemin_ucarer/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md hover:text-foreground text-muted-foreground"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-6 w-6" />
                        </a>
                        <a
                            href="/"
                            className="p-2 rounded-md hover:text-foreground text-muted-foreground"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-6 w-6" />
                        </a>
                    </div>

                </div>

                {/* Alt Çizgi ve Telif Hakkı */}
                <div className="border-t py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            © 2025 YuduSoft. {t('allRightsReserved', 'Tüm hakları saklıdır.')}
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="/"
                                locale={locale}
                                className="text-sm text-muted-foreground hover:text-foreground "
                            >
                                {t('privacy')}
                            </Link>
                            <Link
                                href="/"
                                locale={locale}
                                className="text-sm text-muted-foreground hover:text-foreground "
                            >
                                {t('terms')}
                            </Link>
                            <Link
                                href="/"
                                locale={locale}
                                className="text-sm text-muted-foreground hover:text-foreground "
                            >
                                {tNavbar('contact')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}