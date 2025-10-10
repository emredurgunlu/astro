import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-gray-500">İçerik Yönetim Sistemi</p>
      </header>
      
      <main className="space-y-6">
        <section className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">JSON Dosyaları</h2>
          <p className="mb-4">Messages klasöründeki JSON dosyalarını düzenleyin.</p>
          <div className="flex gap-4">
            <Link href="/json-editor/en">
              <Button>EN JSON Düzenle</Button>
            </Link>
            <Link href="/json-editor/tr">
              <Button>TR JSON Düzenle</Button>
            </Link>
          </div>
        </section>
        
        <section className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Resim Yönetimi</h2>
          <p className="mb-4">Public/images klasöründeki resimleri yönetin.</p>
          <Link href="/image-manager">
            <Button>Resimleri Yönet</Button>
          </Link>
        </section>
        
        <section className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Değişiklikleri Uygula</h2>
          <p className="mb-4">Yapılan değişiklikleri statik site reposuna commit edin.</p>
          <Link href="/github-commit">
            <Button variant="outline">Değişiklikleri Uygula</Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
