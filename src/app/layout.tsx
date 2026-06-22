import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Ayush Jha Portfolio (AI Engineer)",
    template: "%s | Ayush Jha Portfolio",
  },
  description: "Ayush Jha is an AI Engineer and Agent Developer specializing in LangGraph, autonomous agents, and AI workflow automations. Shipped getPlaced (4,000+ users), LangGraph agentic validation engines, and custom ML recommendations. Hire an AI Engineer who understands business problems first.",
  metadataBase: new URL("https://hire-aj.space"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Ayush Jha",
    "Ayush Jha Portfolio",
    "Hire Ayush Jha",
    "Hire AI Engineer",
    "AI Agent Developer",
    "AI Automation Specialist",
    "LangGraph Expert",
    "Freelance AI Developer",
    "hire-aj.space",
    "getPlaced developer",
    "AI Agent Engineer",
    "Python AI Engineer",
    "LangGraph agent systems",
    "Machine Learning Intern",
    "Aligned Automation",
    "AI Developer Pune"
  ],
  authors: [{ name: "Ayush Jha", url: "https://hire-aj.space" }],
  creator: "Ayush Jha",
  publisher: "Ayush Jha",
  icons: {
    icon: [
      { url: "/favicon.ico?v=4" },
      { url: "/favicon.png?v=4", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=4",
    apple: "/favicon.png?v=4",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hire-aj.space",
    title: "Ayush Jha Portfolio (AI Engineer)",
    description: "Hire Ayush Jha - AI Engineer & Agent Developer. Specializing in LangGraph agents, workflow automation, and backend architectures. Shipped getPlaced to 4k+ users.",
    siteName: "Ayush Jha Portfolio",
    images: [
      {
        url: "/ayush.jpg",
        width: 800,
        height: 1067,
        alt: "Ayush Jha - AI Engineer & Agent Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Jha Portfolio (AI Engineer)",
    description: "Hire Ayush Jha - AI Engineer & Agent Developer. Specializing in LangGraph agents, workflow automation, and backend architectures. Shipped getPlaced to 4k+ users.",
    creator: "@aj_builds",
    images: ["/ayush.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ayush Jha",
    "url": "https://hire-aj.space",
    "image": "https://hire-aj.space/ayush.jpg",
    "jobTitle": "AI Engineer & Agent Developer",
    "description": "Ayush Jha is a freelance AI Engineer, Agent Developer, and Automation specialist. Shipped getPlaced to 4k+ users, LangGraph agents, and Python ML pipelines.",
    "knowsAbout": [
      "AI Agent Development",
      "LangGraph Orchestration",
      "FastAPI Backends",
      "Firebase Integrations",
      "Machine Learning Recommendations",
      "Deep Learning Image & Text Models",
      "AI Automations",
      "Python",
      "TypeScript",
      "Next.js"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "MMCOE Pune"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "B.E. in Artificial Intelligence & Data Science"
      }
    ],
    "sameAs": [
      "https://github.com/aj-codespy",
      "https://getplaced.online"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} antialiased bg-page-base text-gray-900 font-mono`}
      >
        {children}
      </body>
    </html>
  );
}
