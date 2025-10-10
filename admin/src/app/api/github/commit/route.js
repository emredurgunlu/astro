import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const { token, commitMessage } = await request.json();
    
    if (!token) {
      return NextResponse.json({ error: "GitHub token gerekli" }, { status: 400 });
    }

    // GitHub API bilgileri
    const username = "emredurgunlu";
    const repo = "my-app";
    const apiUrl = `https://api.github.com/repos/${username}/${repo}`;
    
    // Önce mevcut repo içeriğini ve son commit SHA'sını al
    const repoResponse = await fetch(`${apiUrl}/git/refs/heads/main`, {
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!repoResponse.ok) {
      const errorData = await repoResponse.json();
      return NextResponse.json({ 
        error: `GitHub repo bilgisi alınamadı: ${errorData.message}` 
      }, { status: repoResponse.status });
    }

    const repoData = await repoResponse.json();
    const lastCommitSha = repoData.object.sha;

    // Son commit'in tree bilgisini al
    const commitResponse = await fetch(`${apiUrl}/git/commits/${lastCommitSha}`, {
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!commitResponse.ok) {
      const errorData = await commitResponse.json();
      return NextResponse.json({ 
        error: `Commit bilgisi alınamadı: ${errorData.message}` 
      }, { status: commitResponse.status });
    }

    const commitData = await commitResponse.json();
    const lastTreeSha = commitData.tree.sha;

    // Güncellenecek dosyaları hazırla
    const messagesDir = path.join(process.cwd(), "messages");
    const imagesDir = path.join(process.cwd(), "public", "images");
    
    const newTreeItems = [];
    
    // Messages klasöründeki dosyaları ekle
    await addFilesToTree(newTreeItems, messagesDir, "messages", token, apiUrl);
    
    // Images klasöründeki dosyaları ekle
    await addFilesToTree(newTreeItems, imagesDir, "public/images/", token, apiUrl);

    // Yeni tree oluştur
    const newTreeResponse = await fetch(`${apiUrl}/git/trees`, {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base_tree: lastTreeSha,
        tree: newTreeItems,
      }),
    });

    if (!newTreeResponse.ok) {
      const errorData = await newTreeResponse.json();
      return NextResponse.json({ 
        error: `Yeni tree oluşturulamadı: ${errorData.message}` 
      }, { status: newTreeResponse.status });
    }

    const newTreeData = await newTreeResponse.json();
    const newTreeSha = newTreeData.sha;

    // Yeni commit oluştur
    const newCommitResponse = await fetch(`${apiUrl}/git/commits`, {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: commitMessage,
        tree: newTreeSha,
        parents: [lastCommitSha],
      }),
    });

    if (!newCommitResponse.ok) {
      const errorData = await newCommitResponse.json();
      return NextResponse.json({ 
        error: `Yeni commit oluşturulamadı: ${errorData.message}` 
      }, { status: newCommitResponse.status });
    }

    const newCommitData = await newCommitResponse.json();
    const newCommitSha = newCommitData.sha;

    // Referansı güncelle (main branch'i yeni commit'e işaret ettir)
    const updateRefResponse = await fetch(`${apiUrl}/git/refs/heads/main`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sha: newCommitSha,
        force: false,
      }),
    });

    if (!updateRefResponse.ok) {
      const errorData = await updateRefResponse.json();
      return NextResponse.json({ 
        error: `Branch güncellenemedi: ${errorData.message}` 
      }, { status: updateRefResponse.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("GitHub commit hatası:", error);
    return NextResponse.json({ 
      error: `İşlem sırasında bir hata oluştu: ${error.message}` 
    }, { status: 500 });
  }
}

// Dosyaları tree'ye ekleyen yardımcı fonksiyon
async function addFilesToTree(treeItems, dirPath, targetPath, token, apiUrl) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    const sourcePath = path.join(dirPath, item.name);
    const targetFilePath = targetPath ? 
      path.join(targetPath, item.name).replace(/\\/g, "/") : 
      item.name;
    
    if (item.isDirectory()) {
      // Klasör ise, içindeki dosyaları recursive olarak ekle
      await addFilesToTree(treeItems, sourcePath, targetFilePath, token, apiUrl);
    } else {
      // Dosya ise, içeriğini oku ve GitHub'a yükle
      const content = fs.readFileSync(sourcePath);
      const base64Content = Buffer.from(content).toString("base64");
      
      // Dosyayı GitHub'a yükle
      const blobResponse = await fetch(`${apiUrl}/git/blobs`, {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: base64Content,
          encoding: "base64",
        }),
      });
      
      if (!blobResponse.ok) {
        throw new Error(`Dosya yüklenemedi: ${item.name}`);
      }
      
      const blobData = await blobResponse.json();
      
      // Tree'ye ekle
      treeItems.push({
        path: targetFilePath,
        mode: "100644", // Normal dosya
        type: "blob",
        sha: blobData.sha,
      });
    }
  }
}