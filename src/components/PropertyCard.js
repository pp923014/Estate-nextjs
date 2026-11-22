import Link from "next/link";

export function formatPrice(price, listingType) {
  const formatted = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price || 0);
  return listingType === "Rent" ? `${formatted} / month` : formatted;
}

export default function PropertyCard({property}) {
  return <Link href={`/property/${property.slug}`} className="property-card group">
    <div className="relative overflow-hidden bg-stone-100">
      <img src={property.coverImage || property.images?.[0]?.url || "/images/placeholder.svg"} alt={property.title} loading="lazy" className="aspect-[1.55/1] w-full object-cover transition duration-700 group-hover:scale-105"/>
      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink">{property.availabilityStatus || "Available"}</span>
    </div>
    <div className="p-5">
      <h3 className="font-serif text-xl font-semibold leading-snug text-ink">{property.title}</h3>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">⌖ {property.locality ? `${property.locality}, ` : ""}{property.city}</p>
      <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-muted">{property.shortDescription || property.description}</p>
      <p className="mt-4 font-serif text-2xl font-semibold text-ink">{formatPrice(property.price, property.listingType)}</p>
      <div className="mt-4 flex flex-wrap gap-4 border-t border-line pt-4 text-xs text-muted">
        {property.bedrooms>0&&<span>♧ {property.bedrooms} Beds</span>}
        {property.bathrooms>0&&<span>♧ {property.bathrooms} Baths</span>}
        {property.areaSqft&&<span>▱ {property.areaSqft.toLocaleString("en-IN")} sqft</span>}
      </div>
    </div>
  </Link>;
}
