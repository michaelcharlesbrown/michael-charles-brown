import type { Metadata } from "next";
import Header from "@/components/Header";
import NotFoundContent from "@/components/NotFoundContent";

// Next emits <meta name="robots" content="noindex"> on 404 responses already.
export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <NotFoundContent />
      </main>
    </>
  );
}
