import { PageHero } from "@/components/PageHero";
import { news } from "@/data/demo";
export const metadata={title:"News"};
export default function NewsPage(){return <><PageHero eyebrow="NETWORK TRANSMISSIONS" title="NEWS & PATCHES" text="Patch notes, season updates, events, incident reports, dan developer notes."/><section className="section"><div className="container"><div className="news-grid news-grid-page">{[...news,...news].map((n,i)=><article className="news-card" key={`${n.title}-${i}`}><div><span>{n.tag}</span><small>{n.date}</small></div><h3>{n.title}{i>2?' // Archive':''}</h3><p>{n.excerpt}</p><b>READ TRANSMISSION →</b></article>)}</div></div></section></>}
