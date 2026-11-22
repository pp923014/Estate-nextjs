import Link from "next/link";
import PropertyCard from "./PropertyCard";

export default function PropertySection({title,description,properties,href}) {
  if (!properties?.length) return null;
  return <section className="section-space">
    <div className="container-shell">
      <div className="mb-8 flex items-end justify-between gap-4"><div><p className="eyebrow">CURATED FOR YOU</p><h2 className="section-title">{title}</h2>{description&&<p className="mt-2 max-w-xl text-sm text-muted">{description}</p>}</div><Link href={href} className="shrink-0 text-sm font-semibold text-accent hover:underline">View more ↗</Link></div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{properties.slice(0,5).map(p=><PropertyCard key={p._id} property={p}/>)}</div>
    </div>
  </section>;
}
