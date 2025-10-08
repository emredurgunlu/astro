"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Menu, Scale, Home, HelpCircle, BookOpen, Mail, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function renderServiceAreaLinks(t, serviceAreas) {
  return Object.entries(serviceAreas).map(([slug, area]) => (
    <NavigationMenuLink asChild className="p-2" key={slug}>
      <Link href={`/service-areas/${slug}`}>{area.title}</Link>
    </NavigationMenuLink>
  ));
}

function renderServiceAreaLinksMobile(t, serviceAreas, onLinkClick) {
  return Object.entries(serviceAreas).map(([slug, area]) => (
    <Link
      key={slug}
      href={`/service-areas/${slug}`}
      onClick={onLinkClick}
      className="flex items-center py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
    >
      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full mr-3 flex-shrink-0" />
      {area.title}
    </Link>
  ));
}

export function Navbar({ locale }) {
  const t = useTranslations("Navbar");
  const tServiceAreas = useTranslations("ServiceAreasPage");
  const serviceAreas = tServiceAreas.raw("serviceAreas");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header>
      <div className="flex items-center justify-between px-4 py-2 border-b">
        {/* Logo */}
        <Link href="/" locale={locale} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <Scale className="h-4 w-4 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight">{t("brandName")}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" locale={locale} className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">
                    {t("home")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  {t("serviceAreas")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="z-2">
                  <div className="grid grid-cols-2 p-4 gap-3 md:w-[500px]">
                    {renderServiceAreaLinks(t, serviceAreas)}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/faq" locale={locale} className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">
                    {t("faq")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/law-academy" locale={locale} className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">
                    {t("lawAcademy")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact" locale={locale} className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">
                    {t("contact")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t('openMenu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px]">
                <SheetHeader className="text-left pb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 bg-primary/10 rounded-md">
                      <Scale className="h-3.5 w-3.5 text-primary" />
                    </div>
                    {t('brandName')}
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-1 py-2">
                  {/* Home */}
                  <Link
                    href="/"
                    locale={locale}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                  >
                    <Home className="h-4 w-4 text-muted-foreground" />
                    {t('home')}
                  </Link>

                  {/* Service Areas - Accordion ile */}
                  <Accordion type="single" collapsible>
                    <AccordionItem value="service-areas">
                      <AccordionTrigger className="flex items-center justify-between w-full px-3 py-3 text-base font-medium rounded-lg hover:bg-accent transition-colors">
                        <div className="flex items-center gap-3">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          {t('serviceAreas')}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="ml-4 space-y-1 py-2 border-l-2 border-border/50 pl-4">
                          {renderServiceAreaLinksMobile(t, serviceAreas, handleLinkClick)}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* FAQ */}
                  <Link
                    href="/faq"
                    locale={locale}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                  >
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    {t('faq')}
                  </Link>

                  {/* Law Academy */}
                  <Link
                    href="/law-academy"
                    locale={locale}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                  >
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    {t('lawAcademy')}
                  </Link>

                  {/* Contact */}
                  <Link
                    href="/contact"
                    locale={locale}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {t('contact')}
                  </Link>
                </div>

                <Separator className="my-4" />

                {/* Settings Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{t('theme')}</span>
                    </div>
                    <ModeToggle />
                  </div>

                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{t('language')}</span>
                    </div>
                    <LanguageToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}