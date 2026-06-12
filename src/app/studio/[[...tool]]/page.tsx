/**
 * Embedded Sanity Studio at /studio
 * The Studio component handles client-side-only loading via dynamic import.
 * Access at http://localhost:3000/studio
 */
import type { Metadata } from "next";
import Studio from "./Studio";

export const metadata: Metadata = {
  title: "LuraLoop Blog Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <Studio />;
}
