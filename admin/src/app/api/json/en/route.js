import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// EN JSON dosyasının yolu
const jsonFilePath = path.join(process.cwd(), "messages", "en.json");

export async function GET() {
  try {
    const fileContent = fs.readFileSync(jsonFilePath, "utf8");
    const jsonData = JSON.parse(fileContent);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return NextResponse.json({ error: "Failed to read JSON file" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const jsonData = await request.json();
    
    // JSON verisini dosyaya yaz
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf8");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing JSON file:", error);
    return NextResponse.json({ error: "Failed to write JSON file" }, { status: 500 });
  }
}