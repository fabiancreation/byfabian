import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

// Sans + mono use system stacks (Helvetica Neue / system mono) to match the
// design's intent. Fraunces is loaded via next/font for the editorial italics.
const serif = Fraunces({
  subsets: ["latin"],
  variable: "--next-font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ByFabian — AI Image Direction",
  description:
    "AI-generated editorial campaigns by Fabian Arndt. One model, four campaigns, no shoot day.",
  openGraph: {
    title: "ByFabian — AI Image Direction",
    description:
      "AI-generated editorial campaigns. One model, four campaigns, no shoot day.",
    type: "website",
  },
};

const noFlashScript = `
(function() {
  try {
    var t = localStorage.getItem('byfabian-theme');
    if (t !== 'studio' && t !== 'daylight') t = 'studio';
    document.documentElement.dataset.theme = t;
  } catch (e) {
    document.documentElement.dataset.theme = 'studio';
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={serif.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
