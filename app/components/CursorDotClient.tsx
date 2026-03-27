"use client";

import dynamic from "next/dynamic";

const CursorDot = dynamic(() => import("./CursorDot"), { ssr: false });

export default function CursorDotClient() {
  return <CursorDot />;
}
