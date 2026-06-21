import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { TelemetryHud } from "@/components/TelemetryHud";

export const metadata: Metadata = {
  title: "Mishti Agarwal — Frontend Engineer & Systems Builder",
  description:
    "Portfolio of Mishti Agarwal — CS-AI student, frontend engineer, and open-source contributor building toward GSoC 2026.",
  metadataBase: new URL("https://mishtiagarwal.dev"),
  openGraph: {
    title: "Mishti Agarwal — Frontend Engineer & Systems Builder",
    description:
      "CS-AI student building toward GSoC 2026. Frontend engineering, open source, and systems work.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-void antialiased">
        <div className="noise" aria-hidden="true" />
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-void"
        >
          Skip to content
        </a>
        <CustomCursor />
        <TelemetryHud />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
