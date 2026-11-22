import Link from "next/link";
import {getSession} from "@/lib/auth";
import {redirect} from "next/navigation";
export const metadata={title:"Admin",robots:{index:false,follow:false}};
const nav=[["Overview","/admin/dashboard"],["Properties","/admin/properties"],["Inquiries","/admin/inquiries"],["Owner requests","/admin/owner-requests"],["SEO manager","/admin/seo"]];
export default async function AdminLayout({children}){const session=await getSession();return <div className="min-h-[80vh] bg-paper"><div className="container-shell py-8"><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><p className="eyebrow">ESTATE & CO. / PRIVATE</p><h1 className="font-serif text-3xl">Administration</h1></div>{session&&<form action="/api/admin/logout" method="post"><button className="rounded-full border border-line bg-white px-4 py-2 text-sm">Sign out</button></form>}</div>{session&&<nav className="mb-8 flex flex-wrap gap-2">{nav.map(([n,u])=><Link key={u} href={u} className="rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-accent">{n}</Link>)}</nav>}{children}</div></div>}
