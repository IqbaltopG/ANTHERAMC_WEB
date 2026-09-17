import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid footer-grid-v2">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">R</span><span>{siteConfig.name}</span></div>
          <p>A cross-play Minecraft RPG network untuk Java & Bedrock. Progression, dungeon, custom content, economy, dan seasonal world dalam satu ekosistem.</p>
          <div className="footer-systems"><span>JAVA</span><span>BEDROCK</span><span>PAPER</span><span>GEYSER</span></div>
        </div>
        <div><strong>PLAY</strong><Link href="/dungeons">Dungeons</Link><Link href="/collections">Collections</Link><Link href="/season">Season Hub</Link><Link href="/leaderboard">Leaderboard</Link></div>
        <div><strong>ACCOUNT</strong><Link href="/dashboard">Command Center</Link><Link href="/account/link">Link Minecraft</Link><Link href="/achievements">Achievements</Link><Link href="/battle-pass">Battle Pass</Link></div>
        <div><strong>NETWORK</strong><Link href="/status">Status</Link><Link href="/vote">Vote</Link><a href={siteConfig.map} target="_blank" rel="noreferrer">Live Map</a><a href={siteConfig.discord} target="_blank" rel="noreferrer">Discord</a></div>
      </div>
      <div className="container footer-bottom footer-bottom-v2"><span>© {new Date().getFullYear()} {siteConfig.name}. Not affiliated with Mojang Studios or Microsoft.</span><span>NETWORK BUILD // 26.09</span></div>
    </footer>
  );
}
