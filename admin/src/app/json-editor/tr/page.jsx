"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import JsonEditor from "@/components/json-editor";
import Link from "next/link";

export default function TrJsonEditor() {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    // JSON dosyasını yükle
    const loadJsonData = async () => {
      try {
        const response = await fetch("/api/json/tr");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("JSON yükleme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJsonData();
  }, []);

  const handleSave = async (updatedJson) => {
    setSaveStatus("saving");
    try {
      const response = await fetch("/api/json/tr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJson),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error("JSON kaydetme hatası:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">TR JSON Düzenleyici</h1>
          <p className="text-gray-500">Türkçe dil dosyasını düzenleyin</p>
        </div>
        <Link href="/">
          <Button variant="outline">Ana Sayfaya Dön</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Yükleniyor...</p>
        </div>
      ) : jsonData ? (
        <div>
          <JsonEditor initialValue={jsonData} onSave={handleSave} />
          {saveStatus === "saving" && <p className="mt-2 text-blue-500">Kaydediliyor...</p>}
          {saveStatus === "saved" && <p className="mt-2 text-green-500">Başarıyla kaydedildi!</p>}
          {saveStatus === "error" && <p className="mt-2 text-red-500">Kaydetme hatası!</p>}
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>JSON dosyası yüklenemedi.</p>
        </div>
      )}
    </div>
  );
}