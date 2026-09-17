import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";
import { achievements, dungeons, pets, player } from "@/data/demo";

export const metadata = { title: "Command Center" };

export default function DashboardPage() {
  return (
    <div className="app-page">
      <div className="container app-shell">
        <aside className="app-sidebar">
          <div className="app-user"><img src={`https://mc-heads.net/avatar/${player.name}/64`} alt=""/><div><span>CONNECTED AS</span><b>{player.name}</b></div></div>
          <nav><Link className="active" href="/dashboard">Overview</Link><Link href={`/player/${player.name}`}>Character</Link><Link href="/collections">Collections</Link><Link href="/dungeons">Dungeons</Link><Link href="/achievements">Achievements</Link><Link href="/battle-pass">Battle Pass</Link><Link href="/account/link">Account Link</Link></nav>
          <div className="sidebar-foot"><span>NETWORK ID</span><code>RY-26-88412</code><b>DEMO MODE</b></div>
        </aside>

        <section className="app-content">
          <div className="app-title"><div><span className="eyebrow">PLAYER COMMAND CENTER</span><h1>WELCOME BACK, {player.name.toUpperCase()}.</h1><p>Character telemetry, progression, collections, dan current season dalam satu dashboard.</p></div><span className="sync-pill"><i/> LAST SYNC 18s AGO</span></div>

          <div className="dashboard-hero">
            <div className="dash-character"><img src={`https://mc-heads.net/body/${player.name}/220`} alt=""/><div><span>{player.className.toUpperCase()}</span><h2>{player.name}</h2><p>{player.rank} · {player.guild}</p></div></div>
            <div className="power-core"><small>COMBAT POWER</small><b>{player.power.toLocaleString()}</b><span>GLOBAL RANK #{player.seasonRank}</span></div>
            <div className="currency-stack"><span><small>COINS</small><b>◈ {player.coins.toLocaleString()}</b></span><span><small>SHARDS</small><b>✦ {player.shards.toLocaleString()}</b></span></div>
          </div>

          <div className="dash-grid">
            <article className="dash-panel skills-panel"><div className="panel-title"><div><span>PROGRESSION</span><h3>Core Skills</h3></div><Link href={`/player/${player.name}`}>DETAILS →</Link></div>{player.skills.map(s=><div className="dash-skill" key={s.name}><span>{s.name}<b>LV {s.level}</b></span><ProgressBar value={s.progress}/></div>)}</article>
            <article className="dash-panel"><div className="panel-title"><div><span>SEASON 00</span><h3>Battle Pass</h3></div><Link href="/battle-pass">OPEN →</Link></div><div className="pass-level-big"><span>LEVEL</span><b>{player.battlePassLevel}</b></div><ProgressBar value={player.battlePassXp} max={player.battlePassNext}/><p className="micro-copy">{player.battlePassXp.toLocaleString()} / {player.battlePassNext.toLocaleString()} XP · next reward at level {player.battlePassLevel+1}</p></article>
            <article className="dash-panel"><div className="panel-title"><div><span>COLLECTION</span><h3>Active Companions</h3></div><Link href="/collections">ALL →</Link></div><div className="pet-mini-grid">{pets.filter(p=>p.owned).slice(0,3).map(p=><div key={p.name}><i>{p.icon}</i><span><b>{p.name}</b><small>{p.rarity} · LV {p.level}</small></span></div>)}</div></article>
            <article className="dash-panel"><div className="panel-title"><div><span>ENDGAME</span><h3>Recent Dungeon</h3></div><Link href="/dungeons">HISTORY →</Link></div><div className="recent-run"><span>{dungeons[0].tier}</span><div><b>{dungeons[0].name}</b><small>{dungeons[0].boss}</small></div><strong>{dungeons[0].best}</strong></div><div className="run-stats"><span><small>CLEARS</small>{dungeons[0].clears}</span><span><small>STATUS</small>{dungeons[0].status}</span><span><small>BEST</small>{dungeons[0].best}</span></div></article>
            <article className="dash-panel wide-panel"><div className="panel-title"><div><span>MILESTONES</span><h3>Achievement Progress</h3></div><Link href="/achievements">VIEW ALL →</Link></div><div className="achievement-strip">{achievements.map(a=><div key={a.name}><span className={a.done ? "done" : ""}>{a.done ? "✓" : `${a.progress}/${a.total}`}</span><div><b>{a.name}</b><small>{a.reward}</small></div></div>)}</div></article>
          </div>
        </section>
      </div>
    </div>
  );
}
