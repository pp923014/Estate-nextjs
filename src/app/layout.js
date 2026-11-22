import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Estate & Co. | Find a place to call home", template: "%s | Estate & Co." },
  description: "Discover thoughtfully curated homes, apartments, resorts and rental properties across India.",
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "Estate & Co." }
};

export default function RootLayout({children}) {
  return <html lang="en"><body><SiteHeader/><main>{children}</main><SiteFooter/></body></html>;
}
