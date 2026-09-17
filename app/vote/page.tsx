import { PageHero } from "@/components/PageHero";
import { votes } from "@/data/demo";

export default function VotePage() {
  return (
    <>
      <PageHero eyebrow="DAILY REWARDS" title="VOTE & EARN" text="Vote server setiap hari dan ambil reward in-game. Ganti URL demo dengan listing server lu sendiri." />
      <section className="section"><div className="container narrow-wide"><div className="vote-grid">{votes.map((v,i) => <a className="vote-card" href={v.url} target="_blank" rel="noreferrer" key={v.name}><span>0{i+1}</span><div><h3>{v.name}</h3><p>{v.reward}</p></div><b>VOTE ↗</b></a>)}</div></div></section>
    </>
  );
}
