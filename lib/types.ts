export interface CropNFT {
  id: string
  name: string
  type: "tomato" | "carrot" | "lettuce" | "eggplant" | "potato"
  rarity: "common" | "rare" | "epic" | "legendary"
  growthStage: "seed" | "sprout" | "growing" | "mature" | "harvested"
  harvestDate?: string
  owner: string
}

export interface Product {
  id: string
  title: string
  price: string
  currency: "KRW" | "USD" | "EUR"
  image: string
  buyLink: string
  description: string
  seller: string
  rating: number
  inStock: boolean
  category: string
  tags: string[]
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
