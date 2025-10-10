"use client";

import { Button } from "@/components/ui/button";
import ImageManager from "@/components/image-manager";
import Link from "next/link";

export default function ImageManagerPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Resim Yönetimi</h1>
          <p className="text-gray-500">Public/images klasöründeki resimleri yönetin</p>
        </div>
        <Link href="/">
          <Button variant="outline">Ana Sayfaya Dön</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <ImageManager />
      </div>
    </div>
  );
}