"use client";

import { Button } from "@/components/ui/button";
import GitHubCommit from "@/components/github-commit";
import Link from "next/link";

export default function GitHubCommitPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">GitHub'a Commit</h1>
          <p className="text-gray-500">Değişiklikleri GitHub reposuna uygulayın</p>
        </div>
        <Link href="/">
          <Button variant="outline">Ana Sayfaya Dön</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">GitHub Repo Bilgileri</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p><strong>Kullanıcı Adı:</strong> emredurgunlu</p>
            <p><strong>Repo Adı:</strong> my-app</p>
            <p><strong>Güncellenecek Dosyalar:</strong></p>
            <ul className="list-disc pl-5 mt-2">
              <li><code>messages/</code> klasörü → <code>messages/</code> klasörüne</li>
              <li><code>public/images/</code> klasörü → repo <code>public/images</code> klasörüne</li>
            </ul>
          </div>
        </div>
        
        <GitHubCommit />
      </div>
    </div>
  );
}