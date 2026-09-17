import { PageHero } from "@/components/PageHero";
import { ProgressBar } from "@/components/ProgressBar";
import { achievements } from "@/data/demo";
export const metadata={title:"Achievements"};
export default function AchievementsPage(){return <><PageHero eyebrow="PLAYER MILESTONES" title="ACHIEVEMENTS" text="Permanent account milestones, cosmetic rewards, titles, dan progress lintas season."/><section className="section"><div className="container narrow-wide"><div className="achievement-list">{achievements.map((a,i)=><article className={a.done?'complete':''} key={a.name}><i>{a.done?'✓':String(i+1).padStart(2,'0')}</i><div><span>{a.done?'COMPLETED':'IN PROGRESS'}</span><h2>{a.name}</h2><p>{a.detail}</p><ProgressBar value={a.progress} max={a.total}/></div><aside><small>REWARD</small><b>{a.reward}</b><span>{a.progress}/{a.total}</span></aside></article>)}</div></div></section></>}
