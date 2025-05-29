// import type React from "react";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Anployee Dashboard",
//   description: "Modern employee and lead management dashboard",
//   generator: "v0.dev",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="light"
//           enableSystem={false}
//           disableTransitionOnChange
//         >
//           <div className="min-h-screen bg-gradient-to-b from-lime-50 to-lime-100">
//             {children}
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anployee Dashboard",
  description: "Modern employee and lead management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gradient-to-b from-lime-50 to-lime-100">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
