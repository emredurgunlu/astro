import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// Resim klasörünün yolu
const imagesBasePath = path.join(process.cwd(), "public", "images");

export async function DELETE(request) {
  try {
    const { imageName, folder = "" } = await request.json();
    
    if (!imageName) {
      return NextResponse.json({ error: "Image name is required" }, { status: 400 });
    }
    
    // Dosya yolunu oluştur
    const filePath = path.join(imagesBasePath, ...folder.split("/").filter(Boolean), imageName);
    
    // Dosyanın varlığını kontrol et
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    
    // Dosyayı sil
    await unlink(filePath);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}