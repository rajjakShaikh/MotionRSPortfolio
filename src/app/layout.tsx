import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Frontend Developer Portfolio",
  description:
    "A modern frontend developer portfolio showcasing my projects and skills",
  icons: {
    icon: "/rsfevIcon.webp",
    shortcut: "/rsfevIcon.webp",
    apple: "/rsfevIcon.webp",
    other: {
      rel: "apple-touch-icon",
      url: "/rsfevIcon.webp",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>

        {/* Suppress THREE.js errors without changing functionality */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Original console.error function
              const originalConsoleError = console.error;

              // Override console.error to filter out specific Three.js errors
              console.error = function(...args) {
                // Check if this is the specific THREE.BufferGeometry.computeBoundingSphere NaN error
                const errorMessage = args.length > 0 ? args[0] : '';

                if (typeof errorMessage === 'string' &&
                    errorMessage.includes('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN')) {
                  // Silently ignore this specific error
                  return;
                }

                // Pass all other errors to the original console.error
                originalConsoleError.apply(console, args);
              };
            `,
          }}
        />
      </body>
    </html>
  );
}
