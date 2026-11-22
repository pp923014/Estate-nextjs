import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Property } from "@/models";
import PropertyCard, { formatPrice } from "@/components/PropertyCard";
import PropertyInquiry from "./property-inquiry";

export const revalidate = 60;
export async function generateMetadata({ params }) {
    try {
        await connectDB();
        const p = await Property.findOne({
            slug: params.slug,
            publicationStatus: "Published",
        }).lean();
        if (!p) return {};
        return {
            title: p.seo?.title || p.title,
            description:
                p.seo?.description || p.shortDescription || p.description.slice(0, 160),
            keywords: p.seo?.keywords || [],
            alternates: { canonical: p.seo?.canonical || `/property/${p.slug}` },
            robots: { index: p.seo?.index !== false, follow: true },
            openGraph: { images: [p.coverImage] },
        };
    } catch {
        return {};
    }
}
export default async function PropertyDetails({ params }) {
    await connectDB();
    const p = await Property.findOne({
        slug: params.slug,
        publicationStatus: "Published",
    }).lean();
    if (!p) notFound();
    const related = await Property.find({
        _id: { $ne: p._id },
        publicationStatus: "Published",
        category: p.category,
    })
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();
    const property = JSON.parse(JSON.stringify(p));
    return (
        <div>
            <div className="container-shell py-8">
                <div className="mb-6">
                    <p className="eyebrow">{p.category}</p>
                    <h1 className="section-title mt-2">{p.title}</h1>
                    <p className="mt-2 text-sm text-muted">
                        ⌖ {p.locality ? `${p.locality}, ` : ""}
                        {p.city}
                    </p>
                </div>
                <div className="grid gap-3 md:grid-cols-[1.5fr_1fr]">
                    <img
                        src={p.coverImage}
                        alt={p.title}
                        className="h-[360px] w-full rounded-sm object-cover md:h-[500px]"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        {(p.images || [])
                            .filter((i) => i.url !== p.coverImage)
                            .slice(0, 4)
                            .map((i, n) => (
                                <img
                                    key={i.publicId || n}
                                    src={i.url}
                                    alt={`${p.title} view ${n + 1}`}
                                    className="h-[175px] w-full rounded-sm object-cover md:h-[243px]"
                                />
                            ))}
                    </div>
                </div>
                <div className="grid gap-10 py-12 lg:grid-cols-[1fr_340px]">
                    <article>
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
                            <div>
                                <p className="text-sm text-muted">{p.availabilityStatus}</p>
                                <p className="mt-1 font-serif text-3xl font-semibold">
                                    {formatPrice(p.price, p.listingType)}
                                </p>
                            </div>
                            <div className="flex gap-5 text-sm text-muted">
                                <span>{p.bedrooms} Beds</span>
                                <span>{p.bathrooms} Baths</span>
                                {p.areaSqft && (
                                    <span>{p.areaSqft.toLocaleString("en-IN")} sqft</span>
                                )}
                            </div>
                        </div>
                        <h2 className="mt-8 font-serif text-2xl">About this property</h2>
                        <p className="mt-4 whitespace-pre-line text-sm leading-8 text-muted">
                            {p.description}
                        </p>
                        {p.amenities?.length > 0 && (
                            <>
                                <h2 className="mt-10 font-serif text-2xl">Amenities</h2>
                                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {p.amenities.map((a) => (
                                        <div
                                            key={a}
                                            className="rounded-lg bg-paper px-4 py-3 text-sm"
                                        >
                                            {a}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <h2 className="mt-10 font-serif text-2xl">Location</h2>
                        <p className="mt-3 text-sm leading-7 text-muted">
                            {p.address || p.locality}, {p.city}
                        </p>
                        <a
                            className="mt-3 inline-block text-sm font-semibold text-accent underline"
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.address || p.locality}, ${p.city}`)}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open in Google Maps ↗
                        </a>
                    </article>
                    <aside className="h-fit rounded-xl border border-line p-6">
                        <p className="eyebrow">INTERESTED IN THIS PROPERTY?</p>
                        <h3 className="mt-2 font-serif text-2xl">
                            Let&apos;s arrange a conversation.
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-muted">
                            Share your details and our property team will get back to you.
                        </p>
                        <PropertyInquiry property={property} />
                        <p className="mt-4 text-center text-xs text-muted">
                            Your details are handled securely.
                        </p>
                    </aside>
                </div>
                {related.length > 0 && (
                    <section className="border-t border-line py-12">
                        <h2 className="section-title mb-7">You may also like</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((x) => (
                                <PropertyCard
                                    key={x._id}
                                    property={JSON.parse(JSON.stringify(x))}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
