import { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "FocusFlow: The Calm Timer",
  description: "Um pamodoro feito usando next.js",
};
import { ThemeProvider } from "next-themes";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`antialiased`}
        cz-shortcut-listen="true"
        z-shortcut-listen="true"
      >
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
