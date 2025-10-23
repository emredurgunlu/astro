export default function NotFound() {
    return (
      <html lang="en">
        <head>
          <title>Page Not Found</title>
          <style>
            {`
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
              }
              .container {
                text-align: center;
              }
              h1 {
                color: #333;
              }
              p {
                color: #666;
              }
              a {
                text-decoration: none;
                color: #0070f3;
              }
              a:hover {
                text-decoration: underline;
              }
            `}
          </style>
        </head>
        <body>
          <div className="container">
            <h1>404 - Sayfa Bulunamadı</h1>
            <p>Üzgünüz, aradığınız sayfa mevcut değil.</p>
            <a href="/">Ana Sayfaya Dön</a>
          </div>
        </body>
      </html>
    );
  }
  