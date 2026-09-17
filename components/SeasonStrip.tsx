import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SeasonStrip() {
  return (
    <div className="season-strip">
      <div className="container season-strip-inner">
        <span><b>SEASON 00</b> {siteConfig.season}</span>
        <span className="season-status"><i /> LIVE NOW</span>
        <Link href="/season">OPEN SEASON HUB →</Link>
      </div>
    </div>
  );
}
