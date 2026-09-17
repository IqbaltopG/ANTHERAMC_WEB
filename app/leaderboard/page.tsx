import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { leaderboard } from "@/data/demo";

export const metadata={title:"Leaderboard"};
export default function LeaderboardPage() {
  return <><PageHero eyebrow="SEASON 00 // GLOBAL COMPETITION" title="LEADERBOARD" text="Power ranking, class, level, dan season placement. Endpoint /api/leaderboard sudah tersedia sebagai scaffold integrasi database."/><section className="section"><div className="container narrow-wide"><div className="board-tabs"><button className="active">Power</button><button>Dungeon</button><button>Wealth</button><button>Playtime</button><button>Season XP</button></div><div className="podium podium-v2">{[leaderboard[1],leaderboard[0],leaderboard[2]].map((p,i)=><Link href={`/player/${p.name}`} className={`podium-card podium-${i}`} key={p.name}><span>#{p.rank}</span><img src={`https://mc-heads.net/avatar/${encodeURIComponent(p.name)}/96`} alt=""/><small>{p.class} · LV {p.level}</small><h3>{p.name}</h3><b>{p.value}</b><em>{p.metric}</em></Link>)}</div><div className="leaderboard-card full-board"><div className="leader-table-head"><span>RANK</span><span>PLAYER</span><span>CLASS</span><span>LEVEL</span><span>POWER</span></div>{leaderboard.map(p=><Link href={`/player/${p.name}`} className="leader-table-row" key={p.name}><span>#{String(p.rank).padStart(2,'0')}</span><span><img src={`https://mc-heads.net/avatar/${encodeURIComponent(p.name)}/40`} alt=""/><b>{p.name}</b></span><span>{p.class}</span><span>LV {p.level}</span><strong>{p.value}</strong></Link>)}</div></div></section></>;
}
