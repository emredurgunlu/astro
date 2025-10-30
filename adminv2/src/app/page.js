"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarSeparator,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FileTextIcon, PlusIcon, SaveIcon, Trash2Icon, ImageIcon, TagsIcon, FolderIcon } from "lucide-react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const LANGS = ["tr", "en", "de"];

export default function AdminHome() {
  const [lang, setLang] = React.useState("tr");
  const [content, setContent] = React.useState({ tr: "", en: "", de: "" });
  const [slug, setSlug] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [heroFile, setHeroFile] = React.useState(null);
  const [heroPreview, setHeroPreview] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const handleLangChange = (value) => setLang(value);
  const handleContentChange = (value) => setContent((prev) => ({ ...prev, [lang]: value ?? "" }));
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setHeroFile(file ?? null);
    setHeroPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-svh bg-background">
        <Sidebar className="border-r" collapsible="icon" variant="sidebar">
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <FolderIcon className="size-4" />
              <span className="font-medium">Admin Panel</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Blog Yönetimi</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Anasayfa">
                    <FileTextIcon />
                    <span>Blog Anasayfa</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Yeni Blog">
                    <PlusIcon />
                    <span>Yeni Blog</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Çeviriler (yakında)</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Çeviri Yönetimi" disabled>
                    <TagsIcon />
                    <span>Çeviri Anahtarları</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="text-xs text-muted-foreground">v2 içerikleri için panel</div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex items-center gap-2 border-b px-4 py-2">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <PlusIcon className="mr-1" /> Yeni Blog
              </Button>
              <Button variant="default" size="sm">
                <SaveIcon className="mr-1" /> Kaydet
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2Icon className="mr-1" /> Sil
              </Button>
            </div>
          </header>

          <main className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
            {/* Sol: Blog listesi ve arama */}
            <section className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Bloglar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Ara (kategori/başlık)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-3"
                  />
                  <div className="space-y-2">
                    {[
                      { name: "Araç Değer Kaybı", slug: "vehicle-value-loss" },
                      { name: "Aile Hukuku", slug: "family-law" },
                      { name: "Bilişim Suçları", slug: "cybercrimes" },
                      { name: "Miras Hukuku", slug: "inheritance-law" },
                    ]
                      .filter((i) =>
                        i.name.toLowerCase().includes(search.toLowerCase()) ||
                        i.slug.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((item) => (
                        <Button key={item.slug} variant="outline" className="w-full justify-start">
                          <FileTextIcon className="mr-2" /> {item.name}
                        </Button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Sağ: Editor ve meta alanları */}
            <section className="md:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle>Editor</CardTitle>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Dil</span>
                    <RadioGroup value={lang} onValueChange={handleLangChange} className="grid grid-cols-3 gap-2">
                      {LANGS.map((l) => (
                        <label key={l} className="flex items-center gap-2">
                          <RadioGroupItem value={l} id={`lang-${l}`} />
                          <span className="uppercase text-xs">{l}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                </CardHeader>
                <CardContent>
                  <MDEditor value={content[lang]} onChange={handleContentChange} height={300} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Görsel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Input type="file" accept="image/*" onChange={handleImageChange} />
                    {heroPreview && (
                      <img src={heroPreview} alt="Önizleme" className="h-16 w-16 rounded object-cover border" />
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Meta Bilgiler</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Slug</label>
                    <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ör. vehicle-value-loss" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Kategori</label>
                    <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="ör. family-law" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Etiketler (virgülle)</label>
                    <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="ör. hukuk, dava" />
                  </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <ImageIcon className="mr-1" /> Görseli Temizle
                  </Button>
                  <Button variant="default" size="sm">
                    <SaveIcon className="mr-1" /> Taslağı Kaydet
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
