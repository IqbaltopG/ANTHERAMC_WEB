"use client";

import { useState } from "react";

export function CopyIpButton({ ip }: { ip: string }) {
  const [copied, setCopied] = useState(false);

  async function copyIp() {
    await navigator.clipboard.writeText(ip);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button className="btn btn-primary" onClick={copyIp} type="button">
      {copied ? "COPIED ✓" : "COPY SERVER IP"}
    </button>
  );
}
