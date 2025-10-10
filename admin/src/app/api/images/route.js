import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Resim klasörünün yolu
const imagesBasePath = path.join(process.cwd(), "public", "images");

// Dosya boyutunu formatla
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder") || "";
  
  const folderPath = path.join(imagesBasePath, ...folder.split("/").filter(Boolean));
  
  try {
    // Klasörün varlığını kontrol et
    if (!fs.existsSync(folderPath)) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }
    
    const items = fs.readdirSync(folderPath, { withFileTypes: true });
    
    const folders = items
      .filter(item => item.isDirectory())
      .map(item => item.name);
    
    const images = items
      .filter(item => item.isFile() && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item.name))
      .map(item => {
        const filePath = path.join(folderPath, item.name);
        const stats = fs.statSync(filePath);
        const relativePath = path.join("/images", folder, item.name).replace(/\\/g, "/");
        
        return {
          name: item.name,
          url: relativePath,
          size: formatFileSize(stats.size),
          lastModified: stats.mtime.toISOString()
        };
      });
    
    return NextResponse.json({ folders, images });
  } catch (error) {
    console.error("Error reading images directory:", error);
    return NextResponse.json({ error: "Failed to read images directory" }, { status: 500 });
  }
}