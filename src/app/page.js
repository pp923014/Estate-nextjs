import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Property, HomepageSection } from "@/models";
import PropertySection from "@/components/PropertySection";

export const revalidate = 60;
const sections = [
  {key:"Offers",title:"Recent offers",description:"Thoughtful spaces and special opportunities worth a closer look.",href:"/offers"},
  {key:"Rent",title:"Places for rent",description:"Find a place that fits your next chapter.",href:"/rent"},
  {key:"Sale",title:"Places for sale",description:"Explore homes selected for lasting value.",href:"/sale"},
  {key:"Featured",title:"Featured properties",description:"A handpicked collection of standout properties.",href:"/featured"},
  {key:"Apartments",title:"Apartments",description:"Well-designed apartments in considered locations.",href:"/apartments"},
  {key:"Vacation Homes",title:"Vacation homes",description:"A change of scenery, whenever you need it.",href:"/vacation-homes"},
  {key:"Resorts",title:"Resorts",description:"Discover destinations made for slowing down.",href:"/resorts"}
];
async function getSections(){
  try{
    await connectDB();
    const [all,custom]=await Promise.all([
      Property.find({publicationStatus:"Published"}).sort({createdAt:-1}).limit(100).lean(),
      HomepageSection.find({enabled:true}).populate({path:"propertyIds",match:{publicationStatus:"Published"}}).lean()
    ]);
    return sections.map(s=>{
      const c=custom.find(x=>x.key===s.key);
      const list=c?.propertyIds?.length?c.propertyIds:all.filter(p=>p.category===s.key||(s.key==="Featured"&&p.isFeatured));
      return {...s,properties:list.slice(0,5)};
    });
  }catch{return sections.map(s=>({...s,properties:[]}));}
}
export default async function HomePage(){
 const data=await getSections();
 return <>
  <section className="relative isolate flex min-h-[590px] items-center overflow-hidden bg-[#26322e]">
   <div className="absolute inset-0 -z-10"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85" alt="Modern luxury home" className="h-full w-full object-cover opacity-55"/><div className="absolute inset-0 bg-gradient-to-r from-[#101b18]/80 via-[#101b18]/40 to-transparent"/></div>
   <div className="container-shell py-24 text-white"><p className="eyebrow text-[#d7b18b]">FIND YOUR PLACE</p><h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">A place that feels<br/><i className="font-normal">like it was meant for you.</i></h1><p className="mt-6 max-w-lg text-base leading-7 text-white/75">Explore considered homes, distinctive stays and spaces for every way of living.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/sale" className="rounded-full bg-white px-7 py-4 text-sm font-bold text-ink hover:bg-[#e8d4c1]">Explore properties</Link><Link href="/rent" className="rounded-full border border-white/60 px-7 py-4 text-sm font-bold text-white hover:bg-white/10">Find a rental</Link></div></div>
  </section>
  <section className="border-b border-line bg-paper py-8"><div className="container-shell flex flex-wrap items-center justify-between gap-5"><div><p className="eyebrow">A BETTER WAY TO FIND HOME</p><p className="mt-1 font-serif text-2xl">Browse by the way you want to live.</p></div><div className="flex flex-wrap gap-2">{sections.map(s=><Link key={s.key} href={s.href} className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold hover:border-accent">{s.key}</Link>)}</div></div></section>
  {data.map(s=><PropertySection key={s.key} {...s}/>)}
  <section className="bg-paper py-20"><div className="container-shell grid items-center gap-8 md:grid-cols-[1fr_auto]"><div><p className="eyebrow">HAVE A PROPERTY TO SHARE?</p><h2 className="section-title mt-3 max-w-2xl">The right people are looking for a place like yours.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-muted">Tell us about your property. Our team will review your details and help you take the next step.</p></div><Link href="/contact" className="btn-dark">Get in touch ↗</Link></div></section>
 </>;
}
