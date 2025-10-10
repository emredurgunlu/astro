"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function GitHubCommit() {
  const [token, setToken] = useState("");
  const [commitMessage, setCommitMessage] = useState("Update content from admin panel");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const handleCommit = async () => {
    if (!token) {
      alert("Lütfen GitHub token'ı girin");
      return;
    }

    setIsLoading(true);
    setStatus("committing");

    try {
      const response = await fetch("/api/github/commit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          commitMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Commit işlemi başarısız oldu");
      }

      setStatus("success");
    } catch (error) {
      console.error("Commit hatası:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="token" className="block text-sm font-medium">
          GitHub Token
        </label>
        <div className="relative">
          <input
            id="token"
            type={showToken ? "text" : "password"}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="GitHub Personal Access Token"
            className="w-full p-2 border rounded-md"
          />
          <button
            type="button"
            onClick={() => setShowToken(!showToken)}
            className="absolute inset-y-0 right-0 px-3 text-sm text-gray-500 hover:text-gray-700"
          >
            {showToken ? "Gizle" : "Göster"}
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Token'ın repo içeriğini değiştirme yetkisine sahip olduğundan emin olun.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="commitMessage" className="block text-sm font-medium">
          Commit Mesajı
        </label>
        <input
          id="commitMessage"
          type="text"
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <Button
        onClick={handleCommit}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "İşlem Yapılıyor..." : "Değişiklikleri GitHub'a Uygula"}
      </Button>

      {status === "committing" && (
        <p className="text-blue-500">Değişiklikler GitHub'a gönderiliyor...</p>
      )}
      {status === "success" && (
        <p className="text-green-500">Değişiklikler başarıyla GitHub'a gönderildi!</p>
      )}
      {status === "error" && (
        <p className="text-red-500">Değişiklikleri gönderirken bir hata oluştu. Lütfen token'ı ve bağlantınızı kontrol edin.</p>
      )}
    </div>
  );
}