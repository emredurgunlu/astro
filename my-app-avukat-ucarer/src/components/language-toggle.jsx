"use client";

import { Globe } from "lucide-react"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useLocale } from 'next-intl';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Dil değiştir</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("tr")}
          className={locale === "tr" ? "bg-muted" : ""}
        >
          🇹🇷 Türkçe
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("en")}
          className={locale === "en" ? "bg-muted" : ""}
        >
          🇺🇸 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}