"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// "use client";

// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { useEffect, useState } from "react";

// export function ThemeProvider({ children, ...props }) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return <div suppressHydrationWarning>{children}</div>;
//   }

//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }
