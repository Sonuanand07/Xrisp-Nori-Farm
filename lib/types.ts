// This file is kept for type definitions, but the mock data is now centralized in lib/mock-data.ts.

export interface CropNFT {
  id: string
  name: string
  type: "tomato" | "carrot" | "lettuce" | "eggplant" | "potato" | "banana" | "radish" | "pumpkin"
  rarity: "common" | "rare" | "epic" | "legendary"
  growthStage: "seed" | "sprout" | "growing" | "mature" | "harvested"
  harvestDate?: string
  owner: string
}

export interface Product {
  id: string // Added id for consistency
  cropType: string // Added to link to crop input
  title: string
  title_ko?: string // Added for Korean translation
  price: string
  image: string
  buyLink: string // This will now be an internal path like /mock-shop/product/[slug]
  description: string
  description_ko?: string // Added for Korean translation
  seller: string
  rating: number
  inStock: boolean
  slug: string // Added for internal routing
  category?: string
  tags?: string[]
}

export interface CropMatchResult {
  crop: string
  matchedProduct: Product | null
  confidence: number
  matchReason: string
  timestamp: string
  alternatives?: Product[]
}

export interface IntegrationConfig {
  apiEndpoint: string
  apiKey?: string
  supportedCrops: string[]
  defaultCurrency: string
  maxResults: number
}
