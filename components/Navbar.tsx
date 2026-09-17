"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";

const links = [
  ["/", "Home"],
  ["/leaderboard", "Ranks"],
  ["/dungeons", "Dungeons"],
  ["/collections", "Collections"],
  ["/store", "Store"],
  ["/status", "Status"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-shell">
      <nav className="nav container">
        <Link href="/" className="brand" aria-label={`${siteConfig.name} home`}>
          <span className="brand-mark">R</span>
          <span>{siteConfig.name}</span>
        </Link>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="nav-dashboard" href="/dashboard" onClick={() => setOpen(false)}>COMMAND CENTER</Link>
          <a className="nav-discord" href={siteConfig.discord} target="_blank" rel="noreferrer">Discord ↗</a>
        </div>
      </nav>
    </header>
  );
}
