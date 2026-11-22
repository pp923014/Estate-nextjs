import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Property, SeoPage } from "@/models";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";

const categories={
 rent:{name:"Places for rent",category:"Rent",intro:"Find a rental that fits your lifestyle, location and budget."},
 sale:{name:"Properties for sale",category:"Sale",intro:"Explore homes and properties available to purchase."},
 offers:{name:"Recent offers",category:"Offers",intro:"Explore special property opportunities selected for you."},
 featured:{name:"Featured properties",category:"Featured",intro:"A curated collection of distinctive properties."},
 apartments:{name:"Apartments",category:"Apartments",intro:"Explore apartments in considered neighbourhoods."},
 "vacation-homes":{name:"Vacation homes",category:"Vacation Homes",intro:"Find a welcoming home for your next escape."},
 resorts:{name:"Resorts",category:"Resorts",intro:"Discover resort properties and memorable stays."}
};
export async function generateMetadata({params}){
 const item=categories[params.category]; if(!item)return {};
 try{await connectDB();const seo=await SeoPage.findOne({path:`/${params.category}`}).lean();return {title:seo?.title||item.name,description:seo?.description||item.intro,keywords:seo?.keywords||[],alternates:{canonical:seo?.canonical||`/${params.category}`},robots:{index:seo?.index!==false,follow:true}};}catch{return {title:item.name,description:item.intro};}
}
export default async function CategoryPage({params,searchParams}){
 const item=categories[params.category];if(!item)notFound();
 const page=Math.max(1,Number(searchParams.page)||1),limit=12;
 const filters={publicationStatus:"Published",category:item.category};
 if(searchParams.location)filters.city={$regex:searchParams.location,$options:"i"};
 if(searchParams.minPrice||searchParams.maxPrice)filters.price={...(searchParams.minPrice?{$gte:Number(searchParams.minPrice)}:{}),...(searchParams.maxPrice?{$lte:Number(searchParams.maxPrice)}:{})};
 if(searchParams.bedrooms)filters.bedrooms={$gte:Number(searchParams.bedrooms)};
 const sort=searchParams.sort==="price-low"?{price:1}:searchParams.sort==="price-high"?{price:-1}:{createdAt:-1};
 await connectDB();const [properties,total]=await Promise.all([Property.find(filters).sort(sort).skip((page-1)*limit).limit(limit).lean(),Property.countDocuments(filters)]);
 return <div className="bg-white"><section className="bg-paper py-16"><div className="container-shell"><p className="eyebrow">EXPLORE OUR COLLECTION</p><h1 className="section-title mt-3">{item.name}</h1><p className="mt-3 max-w-xl text-sm leading-7 text-muted">{item.intro}</p></div></section><div className="container-shell py-12"><form className="mb-8 grid gap-3 rounded-xl border border-line p-4 sm:grid-cols-2 lg:grid-cols-5"><input name="location" defaultValue={searchParams.location} placeholder="City or location" className="field"/><input name="minPrice" type="number" defaultValue={searchParams.minPrice} placeholder="Min price (₹)" className="field"/><input name="maxPrice" type="number" defaultValue={searchParams.maxPrice} placeholder="Max price (₹)" className="field"/><select name="bedrooms" defaultValue={searchParams.bedrooms||""} className="field"><option value="">Any bedrooms</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}+ bedrooms</option>)}</select><select name="sort" defaultValue={searchParams.sort||"newest"} className="field"><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><button className="btn-dark sm:col-span-2 lg:col-span-5">Apply filters</button></form><div className="mb-6 flex justify-between text-sm text-muted"><span>{total} properties found</span><span>Page {page}</span></div>{properties.length?<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{properties.map(p=><PropertyCard key={p._id} property={JSON.parse(JSON.stringify(p))}/>)}</div>:<div className="rounded-xl bg-paper py-20 text-center"><h2 className="font-serif text-2xl">No properties found yet</h2><p className="mt-2 text-sm text-muted">Try changing your filters or check back soon.</p><Link href="/" className="mt-5 inline-block text-sm font-bold text-accent">Back to home</Link></div>}{total>limit&&<div className="mt-10 flex justify-center gap-3">{page>1&&<Link className="btn-dark" href={`?page=${page-1}`}>Previous</Link>}{page*limit<total&&<Link className="btn-dark" href={`?page=${page+1}`}>Next</Link>}</div>}</div></div>;
}
