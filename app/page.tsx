import Link from "next/link";
import { CopyIpButton } from "@/components/CopyIpButton";
import { ServerStatus } from "@/components/ServerStatus";
import { ProgressBar } from "@/components/ProgressBar";
import { battlePass, dungeons, leaderboard, modes, news, pets, player } from "@/data/demo";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <>
      <section className="hero hero-v2">
        <div className="container hero-content hero-content-v2">
          <div className="hero-copy">
            <div className="hero-kicker"><ServerStatus compact /><span>SEASON 00 // {siteConfig.season}</span></div>
            <h1><span>NOT JUST A SERVER,</span><br/>IT'S A<br/><em>LIVING WORLD.</em></h1>
            <p>Lebih dari sekadar block. Rasakan pengalaman RPG sesungguhnya dengan custom combat, dungeon, ekonomi yang hidup, dan sistem class dalam satu network cross-play.</p>
            <div className="hero-actions">
              <CopyIpButton ip={siteConfig.javaIp} />
              <Link className="btn btn-ghost" href="/dashboard">ENTER DASHBOARD</Link>
            </div>
            <div className="ip-row"><span>JAVA</span><b>{siteConfig.javaIp}</b><span>BEDROCK</span><b>{siteConfig.bedrockIp}:{siteConfig.bedrockPort}</b></div>
          </div>

          <div className="hero-console">
            <div className="console-top"><span>LIVE CHARACTER</span><b>SEASON RANK #{player.seasonRank}</b></div>
            <div className="console-avatar">
              <div className="avatar-aura" />
              <img src={`https://mc-heads.net/body/${encodeURIComponent(player.name)}/240`} alt={`${player.name} Minecraft skin`} />
              <span className="level-orb">LV {player.level}</span>
            </div>
            <div className="console-name"><div><span>{player.className.toUpperCase()}</span><h3>{player.name}</h3></div><strong>{player.power.toLocaleString()}<small> POWER</small></strong></div>
            <div className="console-stats"><span><small>GUILD</small>{player.guild}</span><span><small>RANK</small>{player.rank}</span><span><small>PLAYTIME</small>{player.playtime}</span></div>
            <Link className="console-link" href="/dashboard">VIEW FULL LOADOUT & PROGRESSION →</Link>
          </div>
        </div>
        <div className="hero-bottom container"><span>SCROLL TO EXPLORE THE NETWORK</span><span className="down">⌄</span></div>
      </section>

      <section className="section section-dark"><div className="container"><ServerStatus /></div></section>

      <section className="section portal-intro">
        <div className="container">
          <div className="section-head"><div><span className="eyebrow">ONE ACCOUNT // WHOLE NETWORK</span><h2>YOUR GAME.<br/>OUTSIDE THE GAME.</h2></div><p>Website bukan brosur. Ini portal karakter. Player bisa lihat progress, collection, dungeon history, achievement, battle pass, rank, dan entitlement tanpa harus login ke Minecraft.</p></div>
          <div className="portal-grid">
            <Link href="/dashboard" className="portal-card portal-main">
              <h3>Player Dashboard</h3><p>Live character overview, currency, stats, skill progression, loadout, season rank, dan quick actions.</p>
              <div className="mini-terminal"><span>POWER</span><b>{player.power.toLocaleString()}</b><span>LEVEL</span><b>{player.level}</b><span>RANK</span><b>#{player.seasonRank}</b></div>
            </Link>
            <Link href="/collections" className="portal-card"><h3>Pets & Relics</h3><p>Collection completion, rarity, pet level, unlock source, dan cosmetic ownership.</p><div className="collection-icons">{pets.slice(0,4).map(p => <i key={p.name}>{p.icon}</i>)}</div></Link>
            <Link href="/dungeons" className="portal-card"><h3>Dungeon Records</h3><p>Tier progression, personal best, boss clears, party history, dan weekly challenge.</p><div className="run-line"><b>{dungeons[0].tier}</b><span>{dungeons[0].name}</span><strong>{dungeons[0].best}</strong></div></Link>
            <Link href="/battle-pass" className="portal-card"><h3>Battle Pass</h3><p>Season XP, free/premium reward track, mission progression, dan claim state.</p><div className="pass-progress"><span>LV {player.battlePassLevel}</span><ProgressBar value={player.battlePassXp} max={player.battlePassNext}/><b>{player.battlePassXp.toLocaleString()} / {player.battlePassNext.toLocaleString()} XP</b></div></Link>
          </div>
        </div>
      </section>

      <section className="section feature-band">
        <div className="container">
          <div className="section-head"><div><span className="eyebrow">THE NETWORK</span><h2>THREE RUNTIMES.<br/>ONE PROGRESSION.</h2></div><p>Mode bukan dunia terpisah yang tidak saling kenal. Progress karakter, season, collection, dan reward tetap terhubung.</p></div>
          <div className="mode-grid mode-grid-v2">
            {modes.map((mode, idx) => (
              <article className={`mode-card mode-${mode.accent}`} key={mode.code}>
                <div className="mode-index">0{idx + 1}</div><div className="mode-live"><i />{mode.online} ONLINE</div>
                <div className="mode-scene"><div className="mountain m1"/><div className="mountain m2"/><div className="pixel-sun"/></div>
                <div className="mode-body"><span>{mode.code}</span><h3>{mode.title}</h3><p>{mode.description}</p><div className="chips">{mode.bullets.map(b => <b key={b}>{b}</b>)}</div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section endgame-band">
        <div className="container endgame-layout">
          <div><span className="eyebrow">ENDGAME // ABYSS</span><h2>DUNGEONS THAT<br/>REMEMBER YOU.</h2><p>Personal best, clear history, difficulty unlock, weekly affix, leaderboard, dan boss progression. Jadi dungeon bukan ruangan isi zombie pakai nama warna-warni.</p><Link href="/dungeons" className="text-link">EXPLORE DUNGEONS →</Link></div>
          <div className="dungeon-stack">{dungeons.map((d,i)=><article className={`dungeon-mini ${d.status === 'LOCKED' ? 'locked' : ''}`} key={d.name}><span>0{i+1}</span><div><small>{d.tier} // {d.boss}</small><h3>{d.name}</h3></div><div><small>BEST</small><b>{d.best}</b></div></article>)}</div>
        </div>
      </section>

      <section className="section leaderboard-section">
        <div className="container leaderboard-layout">
          <div><span className="eyebrow">GLOBAL RANKING</span><h2>HALL OF<br/>LEGENDS.</h2><p>Season power ranking dengan class dan level. Endpoint demo sudah dipisah supaya nanti tinggal diganti query database.</p><Link href="/leaderboard" className="text-link">VIEW FULL LEADERBOARD →</Link></div>
          <div className="leaderboard-card">{leaderboard.slice(0,5).map((p) => <Link href={`/player/${p.name}`} className="leader-row leader-row-v2" key={p.name}><span className={`rank rank-${p.rank}`}>#{p.rank}</span><img src={`https://mc-heads.net/avatar/${encodeURIComponent(p.name)}/56`} alt=""/><div><b>{p.name}</b><small>{p.class} · LV {p.level}</small></div><span>{p.value}<small>{p.metric}</small></span></Link>)}</div>
        </div>
      </section>

      <section className="section season-preview">
        <div className="container season-preview-card">
          <div><span className="eyebrow">SEASON 00</span><h2>{siteConfig.season}</h2><p>World rifts, rotating dungeon affixes, relic crafting, global milestones, dan limited cosmetics dalam season pertama.</p><div className="season-actions"><Link className="btn btn-primary" href="/season">ENTER SEASON HUB</Link><Link className="btn btn-ghost" href="/battle-pass">VIEW BATTLE PASS</Link></div></div>
          <div className="season-track">{battlePass.map(t=><div className={t.current ? "current" : ""} key={t.level}><span>LV {t.level}</span><b>{t.premium}</b><small>{t.claimed ? "CLAIMED" : t.current ? "CURRENT" : "LOCKED"}</small></div>)}</div>
        </div>
      </section>

      <section className="section news-section"><div className="container"><div className="section-head"><div><span className="eyebrow">WORLD FEED</span><h2>LATEST TRANSMISSIONS.</h2></div><Link className="text-link" href="/news">VIEW ALL NEWS →</Link></div><div className="news-grid">{news.map(n=><article className="news-card" key={n.title}><div><span>{n.tag}</span><small>{n.date}</small></div><h3>{n.title}</h3><p>{n.excerpt}</p><b>READ TRANSMISSION →</b></article>)}</div></div></section>

      <section className="section cta-section"><div className="container cta-card cta-card-v2"><div><span className="eyebrow">JAVA + BEDROCK</span><h2>YOUR CHARACTER STARTS HERE.</h2><p>Masuk ke server, link akun Minecraft ke portal, lalu semua progress lu hidup juga di web.</p></div><div className="cta-actions"><CopyIpButton ip={siteConfig.javaIp}/><Link href="/account/link" className="btn btn-ghost">LINK ACCOUNT</Link></div></div></section>
    </>
  );
}
