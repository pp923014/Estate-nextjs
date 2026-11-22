import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({ url: String, publicId: String }, { _id: false });
const seoSchema = new mongoose.Schema({
  title: { type: String, default: "" }, description: { type: String, default: "" },
  keywords: { type: [String], default: [] }, canonical: { type: String, default: "" },
  index: { type: Boolean, default: true }
}, { _id: false });

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  category: { type: String, required: true, index: true },
  listingType: { type: String, enum: ["Rent", "Sale"], required: true },
  price: { type: Number, required: true, min: 1 },
  city: { type: String, required: true, index: true },
  locality: String, address: String,
  description: { type: String, required: true },
  shortDescription: String,
  bedrooms: { type: Number, default: 0 }, bathrooms: { type: Number, default: 0 },
  areaSqft: Number, propertyType: String, amenities: [String],
  images: [imageSchema], coverImage: { type: String, required: true },
  publicationStatus: { type: String, enum: ["Draft", "Published", "Inactive", "Archived"], default: "Draft", index: true },
  availabilityStatus: { type: String, enum: ["Available", "Under Offer", "Sold", "Rented"], default: "Available", index: true },
  isFeatured: { type: Boolean, default: false, index: true },
  homepageSections: { type: [String], default: [] },
  seo: { type: seoSchema, default: () => ({}) }
}, { timestamps: true });
propertySchema.index({ publicationStatus: 1, category: 1, createdAt: -1 });
propertySchema.index({ city: 1, price: 1, bedrooms: 1 });

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, default: "Administrator" }
}, { timestamps: true });

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true }, email: { type: String, required: true },
  phone: { type: String, required: true }, message: String,
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", default: null },
  propertyTitle: String,
  status: { type: String, enum: ["New", "Contacted", "Converted", "Closed"], default: "New", index: true },
  adminNotes: String
}, { timestamps: true });

const ownerRequestSchema = new mongoose.Schema({
  ownerName: String, email: String, phone: String, title: String,
  category: String, listingType: String, price: Number, city: String, description: String,
  status: { type: String, enum: ["Pending", "Approved", "Rejected", "Converted"], default: "Pending", index: true },
  adminNotes: String
}, { timestamps: true });

const seoPageSchema = new mongoose.Schema({
  path: { type: String, unique: true, required: true },
  title: String, description: String, keywords: [String],
  canonical: String, ogImage: String, content: String,
  index: { type: Boolean, default: true }
}, { timestamps: true });

const homepageSectionSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  title: String, enabled: { type: Boolean, default: true },
  propertyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

const siteSettingsSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: "main" },
  brandName: { type: String, default: "Estate & Co." },
  phone: String, email: String, whatsapp: String, address: String
}, { timestamps: true });

export const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);
export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);
export const OwnerRequest = mongoose.models.OwnerRequest || mongoose.model("OwnerRequest", ownerRequestSchema);
export const SeoPage = mongoose.models.SeoPage || mongoose.model("SeoPage", seoPageSchema);
export const HomepageSection = mongoose.models.HomepageSection || mongoose.model("HomepageSection", homepageSectionSchema);
export const SiteSettings = mongoose.models.SiteSettings || mongoose.model("SiteSettings", siteSettingsSchema);
