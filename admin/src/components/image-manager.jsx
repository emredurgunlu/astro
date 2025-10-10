"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ImageManager() {
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");

  // Resimleri ve klasörleri yükle
  useEffect(() => {
    loadImagesAndFolders();
  }, [currentFolder]);

  const loadImagesAndFolders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/images?folder=${encodeURIComponent(currentFolder)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImages(data.images || []);
      setFolders(data.folders || []);
    } catch (error) {
      console.error("Resim yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // Klasöre git
  const navigateToFolder = (folder) => {
    if (folder === ".." && currentFolder) {
      // Bir üst klasöre git
      const parts = currentFolder.split("/");
      parts.pop();
      setCurrentFolder(parts.join("/"));
    } else {
      // Alt klasöre git
      const newPath = currentFolder ? `${currentFolder}/${folder}` : folder;
      setCurrentFolder(newPath);
    }
  };

  // Resim yükle
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadStatus("uploading");
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    
    if (currentFolder) {
      formData.append("folder", currentFolder);
    }

    try {
      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUploadStatus("success");
      setTimeout(() => setUploadStatus(""), 3000);
      loadImagesAndFolders();
    } catch (error) {
      console.error("Resim yükleme hatası:", error);
      setUploadStatus("error");
      setTimeout(() => setUploadStatus(""), 3000);
    }
  };

  // Resim sil
  const handleDeleteImage = async (imageName) => {
    if (!confirm(`${imageName} resmini silmek istediğinizden emin misiniz?`)) {
      return;
    }

    setDeleteStatus("deleting");
    try {
      const response = await fetch("/api/images/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageName,
          folder: currentFolder,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setDeleteStatus("success");
      setTimeout(() => setDeleteStatus(""), 3000);
      loadImagesAndFolders();
    } catch (error) {
      console.error("Resim silme hatası:", error);
      setDeleteStatus("error");
      setTimeout(() => setDeleteStatus(""), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Klasör Navigasyonu */}
      <div className="flex items-center space-x-2 mb-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentFolder("")}
          disabled={!currentFolder}
        >
          Ana Klasör
        </Button>
        
        {currentFolder && (
          <Button 
            variant="outline" 
            onClick={() => navigateToFolder("..")}>
            Üst Klasör
          </Button>
        )}
        
        <div className="text-sm text-gray-500">
          Şu anki konum: {currentFolder || "Ana Klasör"}
        </div>
      </div>

      {/* Resim Yükleme */}
      <div className="mb-6 p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">Resim Yükle</h3>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        {uploadStatus === "uploading" && <p className="mt-2 text-blue-500">Yükleniyor...</p>}
        {uploadStatus === "success" && <p className="mt-2 text-green-500">Resimler başarıyla yüklendi!</p>}
        {uploadStatus === "error" && <p className="mt-2 text-red-500">Resim yükleme hatası!</p>}
      </div>

      {/* Klasörler */}
      {folders.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Klasörler</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <div 
                key={folder}
                onClick={() => navigateToFolder(folder)}
                className="p-4 border rounded-md cursor-pointer hover:bg-gray-50 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span>{folder}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resimler */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Yükleniyor...</p>
        </div>
      ) : images.length > 0 ? (
        <div>
          <h3 className="text-lg font-medium mb-2">Resimler</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.name} className="border rounded-md overflow-hidden group relative">
                <div className="aspect-square relative">
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-2 bg-white">
                  <p className="text-sm truncate">{image.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">{image.size}</span>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteImage(image.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Sil
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {deleteStatus === "deleting" && <p className="mt-2 text-blue-500">Siliniyor...</p>}
          {deleteStatus === "success" && <p className="mt-2 text-green-500">Resim başarıyla silindi!</p>}
          {deleteStatus === "error" && <p className="mt-2 text-red-500">Resim silme hatası!</p>}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-md">
          <p>Bu klasörde resim bulunamadı.</p>
        </div>
      )}
    </div>
  );
}