import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// Resim klasörünün yolu
const imagesBasePath = path.join(process.cwd(), "public", "images");

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("images");
    const folder = formData.get("folder") || "";
    
    const uploadFolder = path.join(imagesBasePath, ...folder.split("/").filter(Boolean));
    
    // Klasörün varlığını kontrol et, yoksa oluştur
    if (!existsSync(uploadFolder)) {
      await mkdir(uploadFolder, { recursive: true });
    }
    
    const uploadedFiles = [];
    
    for (const file of files) {
      if (!(file instanceof File)) {
        continue;
      }
      
      // Dosya adını temizle
      const fileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "");
      const filePath = path.join(uploadFolder, fileName);
      
      // Dosyayı kaydet
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      
      uploadedFiles.push({
        name: fileName,
        path: path.join("/images", folder, fileName).replace(/\\/g, "/")
      });
    }
    
    return NextResponse.json({ success: true, files: uploadedFiles });
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json({ error: "Failed to upload images" }, { status: 500 });
  }
}

// POST isteğinin maksimum boyutunu artır
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};