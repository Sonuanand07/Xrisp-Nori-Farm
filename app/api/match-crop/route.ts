import { type NextRequest, NextResponse } from "next/server"

interface MatchedProduct {
  title: string
  price: string
  image: string
  buyLink: string
  description: string
  seller: string
  rating: number
  inStock: boolean
}

interface CropMatchResult {
  crop: string
  matchedProduct: MatchedProduct | null
  confidence: number
  matchReason: string
  timestamp: string
}

// Mock product database - in real implementation, this would be a database or external API
const mockProducts: Record<string, MatchedProduct> = {
  tomato: {
    title: "Fresh Organic Tomato Box (2kg)",
    price: "19,000 KRW",
    image: "https://example.com/tomato.jpg",
    buyLink: "https://mock-shop.com/product/organic-tomato-box",
    description: "Premium organic tomatoes grown in sustainable farms",
    seller: "Green Valley Farm",
    rating: 4.8,
    inStock: true,
  },
  carrot: {
    title: "Premium Carrot Bundle (1.5kg)",
    price: "12,500 KRW",
    image: "https://example.com/carrot.jpg",
    buyLink: "https://mock-shop.com/product/premium-carrots",
    description: "Sweet and crunchy carrots perfect for cooking",
    seller: "Sunrise Agriculture",
    rating: 4.6,
    inStock: true,
  },
  lettuce: {
    title: "Fresh Lettuce Head (3 pieces)",
    price: "8,900 KRW",
    image: "https://example.com/lettuce.jpg",
    buyLink: "https://mock-shop.com/product/fresh-lettuce",
    description: "Crisp and fresh lettuce heads for salads",
    seller: "Urban Greens",
    rating: 4.7,
    inStock: true,
  },
  eggplant: {
    title: "Korean Eggplant (1kg)",
    price: "15,800 KRW",
    image: "https://example.com/eggplant.jpg",
    buyLink: "https://mock-shop.com/product/korean-eggplant",
    description: "Fresh Korean eggplants perfect for traditional dishes",
    seller: "Heritage Farms",
    rating: 4.5,
    inStock: false,
  },
  potato: {
    title: "Organic Potato Bag (3kg)",
    price: "16,200 KRW",
    image: "https://example.com/potato.jpg",
    buyLink: "https://mock-shop.com/product/organic-potatoes",
    description: "Versatile organic potatoes for all cooking needs",
    seller: "Mountain View Farm",
    rating: 4.9,
    inStock: true,
  },
}

export async function POST(request: NextRequest) {
  try {
    const { cropInput } = await request.json()

    if (!cropInput || typeof cropInput !== "string") {
      return NextResponse.json({ error: "Invalid crop input" }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Extract crop name from input (handle NFT IDs like "Tomato #124")
    const cropName = cropInput.toLowerCase().replace(/#\d+/g, "").trim()

    // Find matching product
    const matchedProduct = mockProducts[cropName] || null

    // Calculate confidence based on exact match
    const confidence = matchedProduct ? 95 : 0

    const matchReason = matchedProduct
      ? `Exact match found for ${cropName} in product database`
      : `No matching product found for "${cropName}". Available crops: ${Object.keys(mockProducts).join(", ")}`

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
    supportedCrops: Object.keys(mockProducts),
    endpoints: {
      match: "POST /api/match-crop",
      health: "GET /api/match-crop",
    },
  })
}
