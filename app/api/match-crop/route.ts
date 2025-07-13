import { type NextRequest, NextResponse } from "next/server"
import { mockProductsArray } from "@/lib/mock-data" // Import centralized mock data array

interface MatchedProduct {
  title: string
  price: string
  image: string
  buyLink: string
  description: string
  seller: string
  rating: number
  inStock: boolean
  slug: string
  title_ko?: string
  description_ko?: string
}

interface CropMatchResult {
  crop: string
  matchedProduct: MatchedProduct | null
  confidence: number
  matchReason: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const { cropInput } = await request.json()

    if (!cropInput || typeof cropInput !== "string") {
      return NextResponse.json({ error: "Invalid crop input" }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 700))

    // Extract crop name from input (handle NFT IDs like "Tomato #124")
    const cropName = cropInput.toLowerCase().replace(/#\d+/g, "").trim()

    // Find matching product by cropType
    const matchedProduct = mockProductsArray.find((product) => product.cropType === cropName) || null

    // Calculate confidence based on exact match
    const confidence = matchedProduct ? 95 : 0

    const matchReason = matchedProduct
      ? `Exact match found for ${cropName} in product database.`
      : `No direct matching product found for "${cropName}". Try "tomato", "carrot", "eggplant", "banana", "radish", or "pumpkin".`

    const result: CropMatchResult = {
      crop: cropInput,
      matchedProduct,
      confidence,
      matchReason,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in crop matching API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Nori Farm Crop Matching API",
    version: "1.0.0",
    supportedCrops: mockProductsArray.map((p) => p.cropType),
    endpoints: {
      match: "POST /api/match-crop",
      health: "GET /api/match-crop",
    },
  })
}
