"use client";
import dynamic from "next/dynamic";

// Dynamically load NextStudio with ssr:false inside a Client Component (required by Next.js)
const NextStudioDynamic = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

import config from "../../../../sanity.config";

export default function Studio() {
  return <NextStudioDynamic config={config} />;
}
