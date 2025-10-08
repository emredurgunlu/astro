https://nextjs.org/docs/app/getting-started/installation

```bash
npx create-next-app@latest
```

√ Would you like to use TypeScript? ... No
√ Would you like to use ESLint? ... Yes
√ Would you like to use Tailwind CSS? ... Yes
√ Would you like your code inside a `src/` directory? ... Yes
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to use Turbopack for `next dev`? ... No
√ Would you like to customize the import alias (`@/*` by default)? ... No

package.json dosyasındaki "react" ve "react-dom" kısımlarını 18 yap. shadcn e güncelleme gelirse buna gerek kalmayacak.

```bash
npm i
npm run dev
```

https://ui.shadcn.com/docs/installation/next

```bash
npx shadcn@latest init
```
https://ui.shadcn.com/themes dan beğendiğin renk kodlarını globals.css dosyasına yapıştır

Tema dark mod için:
https://youtu.be/pfnhxqn03b8
```bash
npx shadcn@latest add button
npx shadcn@latest add dropdown-menu
npm install next-themes
``` 
theme-provider.js ve theme-toggle.jsx dosyalarını ekle.

layout.js dosyasına bunları ekle:
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div style={{ position: "fixed", top: 16, right: 16, zIndex: 50 }}>
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>

Navbar için:
```bash
npx shadcn@latest add sheet
```

Bu bir next js projesidir. Next Js versiyon olarak  "next": "15.3.2" kullanıyorum. App Router kullanıyorum. Typescript kullanılmadı. Javascript kullanıldı. Shadcnui kullanıldı. Stillendirme için tailwind css kullanılacak. Öncelikle tüm projeyi baştan sona incele. Özellikle de src klasörünü @src ve içindeki klasör ve dosyaları incele. Şu an için kodlarda bir değişiklik yapma

Artık next.config.mjs dosyanız statik export için ayarlandı. output: 'export' ayarını ekledim ve isteğe bağlı diğer yapılandırma seçeneklerini yorum olarak bıraktım.
Next.js 15.3 ile artık ayrıca next export komutunu kullanmanıza gerek yok. Sadece next build komutunu çalıştırdığınızda, Next.js otomatik olarak out klasöründe statik HTML/CSS/JS dosyalarını oluşturacaktır.

npm run build + npx serve@latest out
