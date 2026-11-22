import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().trim().min(5).max(120),
  slug: z.string().trim().min(3).max(140).regex(/^[a-z0-9-]+$/),
  category: z.enum(["Rent", "Sale", "Offers", "Featured", "Apartments", "Vacation Homes", "Resorts"]),
  listingType: z.enum(["Rent", "Sale"]),
  price: z.coerce.number().positive(),
  city: z.string().trim().min(2).max(80),
  locality: z.string().trim().max(100).optional().default(""),
  address: z.string().trim().max(250).optional().default(""),
  description: z.string().trim().min(30).max(10000),
  shortDescription: z.string().trim().max(300).optional().default(""),
  bedrooms: z.coerce.number().int().min(0).max(30).optional().default(0),
  bathrooms: z.coerce.number().int().min(0).max(30).optional().default(0),
  areaSqft: z.coerce.number().positive().optional().nullable(),
  propertyType: z.string().max(60).optional().default(""),
  amenities: z.array(z.string().max(60)).optional().default([]),
  images: z.array(z.object({ url: z.string().url(), publicId: z.string() })).min(1),
  coverImage: z.string().url(),
  publicationStatus: z.enum(["Draft", "Published", "Inactive", "Archived"]).default("Draft"),
  availabilityStatus: z.enum(["Available", "Under Offer", "Sold", "Rented"]).default("Available"),
  isFeatured: z.boolean().optional().default(false),
  homepageSections: z.array(z.string()).optional().default([]),
  seo: z.object({
    title: z.string().max(70).optional().default(""),
    description: z.string().max(170).optional().default(""),
    keywords: z.array(z.string()).optional().default([]),
    canonical: z.string().optional().default(""),
    index: z.boolean().optional().default(true)
  }).optional().default({})
});

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  phone: z.string().trim().min(8).max(20),
  message: z.string().trim().max(2000).optional().default(""),
  propertyId: z.string().optional().nullable(),
  propertyTitle: z.string().max(120).optional().default("")
});

export const ownerRequestSchema = z.object({
  ownerName: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(20),
  title: z.string().trim().min(5).max(120),
  category: z.enum(["Rent", "Sale", "Apartments", "Vacation Homes", "Resorts"]),
  listingType: z.enum(["Rent", "Sale"]),
  price: z.coerce.number().positive(),
  city: z.string().trim().min(2),
  description: z.string().trim().min(20).max(5000)
});
