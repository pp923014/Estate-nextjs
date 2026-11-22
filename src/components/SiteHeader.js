"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { OwnerModal } from "./SiteModals";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  function search(e) { e.preventDefault(); router.push(`/search?q=${encodeURIComponent(query)}`); }
  return <>
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-shell flex min-h-[76px] items-center justify-between gap-5">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-ink">Estate<span className="text-accent">.</span></Link>
        <form onSubmit={search} className="hidden max-w-md flex-1 items-center rounded-full border border-line bg-paper px-4 py-2 md:flex">
          <span className="mr-2 text-muted">⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by property or location" className="w-full bg-transparent text-sm outline-none"/>
        </form>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link href="/" className="nav-link">Home</Link><Link href="/about" className="nav-link">About Us</Link>
          <button onClick={()=>setOpen(true)} className="rounded-full bg-ink px-5 py-3 font-semibold text-white transition hover:bg-accent">List Your Property</button>
        </nav>
        <button className="md:hidden" onClick={()=>setOpen(v=>!v)} aria-label="Toggle navigation">☰</button>
      </div>
      {open === true && <div className="border-t border-line bg-white px-5 py-4 md:hidden"><form onSubmit={search} className="mb-4 flex gap-2"><input className="field" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search properties"/><button className="btn-dark">Go</button></form><Link href="/about" className="block py-2">About Us</Link><button onClick={()=>setOpen("owner")} className="py-2">List Your Property</button></div>}
    </header>
    <OwnerModal open={open === "owner"} onClose={()=>setOpen(false)}/>
  </>;
}
