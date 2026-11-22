
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: String,
    slug: { type: String, unique: true },
    category: String,
    listingType: String,
    price: Number,
    city: String,
    locality: String,
    address: String,
    description: String,
    shortDescription: String,
    bedrooms: Number,
    bathrooms: Number,
    areaSqft: Number,
    propertyType: String,
    amenities: [String],
    images: { type: Array, default: [] },
    coverImage: { type: String, default: "" },
    publicationStatus: { type: String, default: "Draft" },
    availabilityStatus: { type: String, default: "Available" },
    isFeatured: { type: Boolean, default: false },
    homepageSections: [String],
    seo: mongoose.Schema.Types.Mixed
}, { timestamps: true, strict: false });

const Property =
    mongoose.models.Property ||
    mongoose.model("Property", propertySchema);

const properties = [
    // RENT
    {
        title: "Modern 2BHK Apartment",
        slug: "modern-2bhk-apartment-noida",
        category: "Rent", listingType: "Rent", price: 25000,
        city: "Noida", locality: "Sector 137",
        bedrooms: 2, bathrooms: 2, areaSqft: 1250,
        propertyType: "Apartment",
        description: "A beautifully planned furnished apartment with spacious bedrooms, modern interiors, natural light and convenient access to metro stations, offices and daily essentials.",
        amenities: ["Parking", "Gym", "Security", "Lift"]
    },
    {
        title: "Luxury 3BHK Flat",
        slug: "luxury-3bhk-flat-gurgaon",
        category: "Rent", listingType: "Rent", price: 55000,
        city: "Gurgaon", locality: "Golf Course Road",
        bedrooms: 3, bathrooms: 3, areaSqft: 1850,
        propertyType: "Apartment",
        description: "A spacious luxury family apartment with premium fittings, comfortable living spaces, modern kitchen and excellent connectivity to major business destinations.",
        amenities: ["Clubhouse", "Swimming Pool", "Gym", "Parking"]
    },
    {
        title: "Fully Furnished Studio",
        slug: "furnished-studio-pune",
        category: "Rent", listingType: "Rent", price: 18000,
        city: "Pune", locality: "Hinjewadi",
        bedrooms: 1, bathrooms: 1, areaSqft: 550,
        propertyType: "Studio Apartment",
        description: "A compact and fully furnished studio apartment designed for comfortable urban living with convenient access to technology parks and shopping areas.",
        amenities: ["Furnished", "Security", "Parking", "Power Backup"]
    },

    // SALE
    {
        title: "Premium 3BHK Residence",
        slug: "premium-3bhk-residence-noida",
        category: "Sale", listingType: "Sale", price: 14500000,
        city: "Noida", locality: "Sector 150",
        bedrooms: 3, bathrooms: 3, areaSqft: 2100,
        propertyType: "Apartment",
        description: "A premium residential apartment with spacious bedrooms, elegant interiors, modern amenities and a peaceful environment for comfortable family living.",
        amenities: ["Clubhouse", "Gym", "Swimming Pool", "Parking"]
    },
    {
        title: "Independent Villa",
        slug: "independent-villa-bangalore",
        category: "Sale", listingType: "Sale", price: 28000000,
        city: "Bengaluru", locality: "Whitefield",
        bedrooms: 4, bathrooms: 4, areaSqft: 3200,
        propertyType: "Villa",
        description: "A beautiful independent villa featuring generous family spaces, private garden, modern architecture and excellent neighbourhood connectivity.",
        amenities: ["Private Garden", "Parking", "Security", "Terrace"]
    },
    {
        title: "Luxury 4BHK Apartment",
        slug: "luxury-4bhk-apartment-mumbai",
        category: "Sale", listingType: "Sale", price: 42500000,
        city: "Mumbai", locality: "Powai",
        bedrooms: 4, bathrooms: 4, areaSqft: 2600,
        propertyType: "Apartment",
        description: "A luxury apartment with spacious interiors, premium residential facilities, beautiful views and convenient access to business and lifestyle destinations.",
        amenities: ["Swimming Pool", "Gym", "Concierge", "Parking"]
    },

    // OFFERS
    {
        title: "Ready-to-Move 2BHK",
        slug: "ready-to-move-2bhk-greater-noida",
        category: "Offers", listingType: "Sale", price: 6200000,
        city: "Greater Noida", locality: "Greater Noida West",
        bedrooms: 2, bathrooms: 2, areaSqft: 1050,
        propertyType: "Apartment",
        description: "A ready-to-move residential apartment with a practical floor plan, comfortable bedrooms and essential community facilities.",
        amenities: ["Lift", "Parking", "Security", "Play Area"]
    },
    {
        title: "Premium 3BHK Apartment",
        slug: "premium-3bhk-zirakpur",
        category: "Offers", listingType: "Sale", price: 8900000,
        city: "Zirakpur", locality: "VIP Road",
        bedrooms: 3, bathrooms: 3, areaSqft: 1650,
        propertyType: "Apartment",
        description: "A spacious modern apartment with contemporary finishes, family-friendly spaces and convenient access to Chandigarh.",
        amenities: ["Clubhouse", "Gym", "Parking", "Power Backup"]
    },
    {
        title: "Luxury 2BHK Flat",
        slug: "luxury-2bhk-bangalore",
        category: "Offers", listingType: "Sale", price: 7200000,
        city: "Bengaluru", locality: "Electronic City",
        bedrooms: 2, bathrooms: 2, areaSqft: 1180,
        propertyType: "Apartment",
        description: "A modern residential apartment with an efficient layout, well-sized bedrooms and convenient access to offices and everyday services.",
        amenities: ["Swimming Pool", "Gym", "Security", "Parking"]
    },

    // FEATURED
    {
        title: "The Grand Penthouse",
        slug: "grand-penthouse-gurgaon",
        category: "Featured", listingType: "Sale", price: 37500000,
        city: "Gurgaon", locality: "Golf Course Extension Road",
        bedrooms: 4, bathrooms: 5, areaSqft: 3800,
        propertyType: "Penthouse",
        description: "An exceptional luxury penthouse featuring expansive interiors, a private terrace, premium amenities and an exclusive residential setting.",
        amenities: ["Private Terrace", "Clubhouse", "Swimming Pool", "Concierge"],
        isFeatured: true
    },
    {
        title: "Skyline Luxury Apartment",
        slug: "skyline-apartment-mumbai",
        category: "Featured", listingType: "Sale", price: 55000000,
        city: "Mumbai", locality: "Worli",
        bedrooms: 4, bathrooms: 4, areaSqft: 2900,
        propertyType: "Apartment",
        description: "A landmark luxury residence with sweeping city views, elegant living spaces and access to premium lifestyle facilities.",
        amenities: ["Sea View", "Gym", "Swimming Pool", "Valet Parking"],
        isFeatured: true
    },
    {
        title: "Premium Garden Villa",
        slug: "premium-garden-villa-bangalore",
        category: "Featured", listingType: "Sale", price: 21500000,
        city: "Bengaluru", locality: "Sarjapur Road",
        bedrooms: 4, bathrooms: 4, areaSqft: 3000,
        propertyType: "Villa",
        description: "A premium villa with a landscaped garden, generous family spaces and a peaceful residential environment.",
        amenities: ["Private Garden", "Clubhouse", "Parking", "Security"],
        isFeatured: true
    },

    // APARTMENTS
    {
        title: "Elegant 2BHK Apartment",
        slug: "elegant-2bhk-ghaziabad",
        category: "Apartments", listingType: "Sale", price: 7800000,
        city: "Ghaziabad", locality: "Indirapuram",
        bedrooms: 2, bathrooms: 2, areaSqft: 1150,
        propertyType: "Apartment",
        description: "An elegant apartment with comfortable living spaces, well-planned bedrooms and convenient access to schools and markets.",
        amenities: ["Lift", "Parking", "Security", "Power Backup"]
    },
    {
        title: "Spacious 3BHK Apartment",
        slug: "spacious-3bhk-lucknow",
        category: "Apartments", listingType: "Sale", price: 11000000,
        city: "Lucknow", locality: "Gomti Nagar",
        bedrooms: 3, bathrooms: 3, areaSqft: 1750,
        propertyType: "Apartment",
        description: "A spacious city apartment with a family-friendly layout, airy rooms and convenient access to offices, hospitals and shopping.",
        amenities: ["Clubhouse", "Gym", "Parking", "Lift"]
    },
    {
        title: "Contemporary 1BHK Apartment",
        slug: "contemporary-1bhk-pune",
        category: "Apartments", listingType: "Sale", price: 4800000,
        city: "Pune", locality: "Kharadi",
        bedrooms: 1, bathrooms: 1, areaSqft: 720,
        propertyType: "Apartment",
        description: "A contemporary compact apartment suited to first-time buyers and professionals, with an efficient layout and access to business hubs.",
        amenities: ["Security", "Parking", "Lift", "Power Backup"]
    },

    // VACATION HOMES
    {
        title: "Mountain View Cottage",
        slug: "mountain-view-cottage-manali",
        category: "Vacation Homes", listingType: "Sale", price: 9500000,
        city: "Manali", locality: "Old Manali",
        bedrooms: 2, bathrooms: 2, areaSqft: 1450,
        propertyType: "Cottage",
        description: "A cosy mountain retreat with scenic surroundings, warm interiors and inviting spaces for relaxed holidays and extended stays.",
        amenities: ["Mountain View", "Fireplace", "Balcony", "Parking"]
    },
    {
        title: "Riverside Holiday Villa",
        slug: "riverside-villa-rishikesh",
        category: "Vacation Homes", listingType: "Sale", price: 13500000,
        city: "Rishikesh", locality: "Shivpuri",
        bedrooms: 3, bathrooms: 3, areaSqft: 2200,
        propertyType: "Villa",
        description: "A peaceful holiday villa with comfortable accommodation, open spaces and a relaxing getaway atmosphere near the river landscape.",
        amenities: ["River View", "Garden", "Outdoor Deck", "Parking"]
    },
    {
        title: "Beachside Holiday Home",
        slug: "beachside-home-goa",
        category: "Vacation Homes", listingType: "Sale", price: 22000000,
        city: "Goa", locality: "Anjuna",
        bedrooms: 3, bathrooms: 3, areaSqft: 2400,
        propertyType: "Holiday Home",
        description: "A stylish holiday home with relaxed indoor-outdoor living, generous bedrooms and convenient access to beaches and cafes.",
        amenities: ["Private Pool", "Garden", "Outdoor Shower", "Parking"]
    },

    // RESORTS
    {
        title: "The Palm Luxury Resort",
        slug: "palm-luxury-resort-goa",
        category: "Resorts", listingType: "Sale", price: 85000000,
        city: "Goa", locality: "Candolim",
        bedrooms: 12, bathrooms: 14, areaSqft: 12500,
        propertyType: "Resort",
        description: "A boutique resort-style property with guest accommodation, leisure spaces and a location suited to hospitality and holiday stays.",
        amenities: ["Swimming Pool", "Restaurant", "Spa", "Garden", "Parking"]
    },
    {
        title: "Himalayan Retreat Resort",
        slug: "himalayan-retreat-resort-shimla",
        category: "Resorts", listingType: "Sale", price: 57500000,
        city: "Shimla", locality: "Kufri Road",
        bedrooms: 10, bathrooms: 12, areaSqft: 9800,
        propertyType: "Resort",
        description: "A mountain retreat resort with guest rooms, scenic surroundings and shared leisure spaces designed for destination stays.",
        amenities: ["Mountain View", "Restaurant", "Conference Room", "Parking"]
    },
    {
        title: "Lakeside Boutique Resort",
        slug: "lakeside-boutique-resort-udaipur",
        category: "Resorts", listingType: "Sale", price: 62500000,
        city: "Udaipur", locality: "Lake Pichola",
        bedrooms: 11, bathrooms: 13, areaSqft: 10800,
        propertyType: "Resort",
        description: "A boutique hospitality property with guest suites, relaxing common areas and a location inspired by Udaipur's lakeside setting.",
        amenities: ["Lake View", "Restaurant", "Terrace", "Event Space"]
    }
];

async function migrate() {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI missing in .env.local");
    }

    if (properties.length !== 21) {
        throw new Error("Expected 21 demo properties.");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    try {
        let inserted = 0;
        let updated = 0;

        for (const p of properties) {
            const data = {
                ...p,
                address: `${p.locality}, ${p.city}, India`,
                shortDescription: p.description.slice(0, 150),
                images: [],
                coverImage: "",
                publicationStatus: "Draft",
                availabilityStatus: "Available",
                homepageSections: [p.category],
                seo: {
                    title: `${p.title} | Estate & Co.`,
                    description: p.description.slice(0, 160),
                    keywords: [p.title, p.city, p.category],
                    canonical: `/property/${p.slug}`,
                    index: false
                }
            };

            const existed = await Property.exists({ slug: p.slug });

            await Property.findOneAndUpdate(
                { slug: p.slug },
                { $set: data },
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                    setDefaultsOnInsert: true
                }
            );

            existed ? updated++ : inserted++;
            console.log(`${existed ? "Updated" : "Inserted"}: ${p.title}`);
        }

        console.log("\nMigration completed!");
        console.log({ inserted, updated, total: properties.length });
        console.log("All listings are Draft. Images are empty.");
        console.log("Add images from Admin Panel before publishing.");

    } finally {
        await mongoose.disconnect();
    }
}

migrate().catch(error => {
    console.error("Migration failed:", error);
    process.exitCode = 1;
});
