import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
export const metadata: Metadata = {
  title: "PamoFocus: The Calm Timer",
  description: "Um pamodoro feito usando next.js",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
