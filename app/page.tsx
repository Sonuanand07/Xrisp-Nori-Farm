"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sprout, ShoppingCart, ExternalLink } from "lucide-react"
import Image from "next/image"

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
}

// Mock product database
const mockProducts: Record<string, MatchedProduct> = {
  tomato: {
    title: "Fresh Organic Tomato Box (2kg)",
    price: "19,000 KRW",
    image: "/placeholder.svg?height=200&width=200",
    buyLink: "https://mock-shop.com/product/organic-tomato-box",
    description: "Premium organic tomatoes grown in sustainable farms",
    seller: "Green Valley Farm",
    rating: 4.8,
    inStock: true,
  },
  carrot: {
    title: "Premium Carrot Bundle (1.5kg)",
    price: "12,500 KRW",
    image: "/placeholder.svg?height=200&width=200",
    buyLink: "https://mock-shop.com/product/premium-carrots",
    description: "Sweet and crunchy carrots perfect for cooking",
    seller: "Sunrise Agriculture",
    rating: 4.6,
    inStock: true,
  },
  lettuce: {
    title: "Fresh Lettuce Head (3 pieces)",
    price: "8,900 KRW",
    image: "/placeholder.svg?height=200&width=200",
    buyLink: "https://mock-shop.com/product/fresh-lettuce",
    description: "Crisp and fresh lettuce heads for salads",
    seller: "Urban Greens",
    rating: 4.7,
    inStock: true,
  },
  eggplant: {
    title: "Korean Eggplant (1kg)",
    price: "15,800 KRW",
    image: "/placeholder.svg?height=200&width=200",
    buyLink: "https://mock-shop.com/product/korean-eggplant",
    description: "Fresh Korean eggplants perfect for traditional dishes",
    seller: "Heritage Farms",
    rating: 4.5,
    inStock: false,
  },
  potato: {
    title: "Organic Potato Bag (3kg)",
    price: "16,200 KRW",
    image: "/placeholder.svg?height=200&width=200",
    buyLink: "https://mock-shop.com/product/organic-potatoes",
    description: "Versatile organic potatoes for all cooking needs",
    seller: "Mountain View Farm",
    rating: 4.9,
    inStock: true,
  },
}

export default function NoriFarmIntegration() {
  const [cropInput, setCropInput] = useState("")
  const [result, setResult] = useState<CropMatchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [jsonView, setJsonView] = useState(false)

  const matchCropToProduct = async (cropInput: string): Promise<CropMatchResult> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Extract crop name from input (handle NFT IDs like "Tomato #124")
    const cropName = cropInput.toLowerCase().replace(/#\d+/g, "").trim()

    // Find matching product
    const matchedProduct = mockProducts[cropName] || null

    // Calculate confidence based on exact match
    const confidence = matchedProduct ? 95 : 0

    const matchReason = matchedProduct
      ? `Exact match found for ${cropName} in product database`
      : `No matching product found for "${cropName}". Available crops: ${Object.keys(mockProducts).join(", ")}`

    return {
      crop: cropInput,
      matchedProduct,
      confidence,
      matchReason,
    }
  }

  const handleSearch = async () => {
    if (!cropInput.trim()) return

    setLoading(true)
    try {
      const matchResult = await matchCropToProduct(cropInput)
      setResult(matchResult)
    } catch (error) {
      console.error("Error matching crop:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Nori Farm Integration</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Map your virtual crops to real-world products. Enter a crop name or NFT ID to find matching products from
            our partner stores.
          </p>
        </div>

        {/* Search Interface */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Crop to Product Matcher
            </CardTitle>
            <CardDescription>
              Enter a crop name (e.g., "tomato", "carrot") or NFT ID (e.g., "Tomato #124")
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter crop name or NFT ID..."
                value={cropInput}
                onChange={(e) => setCropInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                disabled={loading || !cropInput.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  "Find Product"
                )}
              </Button>
            </div>

            {/* Sample inputs */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Try:</span>
              {Object.keys(mockProducts).map((crop) => (
                <Badge
                  key={crop}
                  variant="outline"
                  className="cursor-pointer hover:bg-green-50"
                  onClick={() => setCropInput(crop)}
                >
                  {crop}
                </Badge>
              ))}
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-green-50"
                onClick={() => setCropInput("Tomato #124")}
              >
                Tomato #124
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Match Result</CardTitle>
                <div className="flex gap-2">
                  <Button variant={jsonView ? "outline" : "default"} size="sm" onClick={() => setJsonView(false)}>
                    Card View
                  </Button>
                  <Button variant={jsonView ? "default" : "outline"} size="sm" onClick={() => setJsonView(true)}>
                    JSON View
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {jsonView ? (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  {JSON.stringify(
                    {
                      crop: result.crop,
                      matchedProduct: result.matchedProduct
                        ? {
                            title: result.matchedProduct.title,
                            price: result.matchedProduct.price,
                            image: result.matchedProduct.image,
                            buyLink: result.matchedProduct.buyLink,
                          }
                        : null,
                      confidence: result.confidence,
                      matchReason: result.matchReason,
                    },
                    null,
                    2,
                  )}
                </pre>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={result.confidence > 0 ? "default" : "destructive"}>
                      {result.confidence}% Match
                    </Badge>
                    <span className="text-sm text-gray-600">for "{result.crop}"</span>
                  </div>

                  {result.matchedProduct ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Image
                          src={result.matchedProduct.image || "/placeholder.svg"}
                          alt={result.matchedProduct.title}
                          width={200}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold">{result.matchedProduct.title}</h3>
                          <p className="text-gray-600">{result.matchedProduct.description}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-semibold text-green-600">{result.matchedProduct.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Seller:</span>
                            <span>{result.matchedProduct.seller}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rating:</span>
                            <span>⭐ {result.matchedProduct.rating}/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Stock:</span>
                            <Badge variant={result.matchedProduct.inStock ? "default" : "destructive"}>
                              {result.matchedProduct.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => window.open(result.matchedProduct!.buyLink, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-2">No matching product found</p>
                      <p className="text-sm text-gray-500">{result.matchReason}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Documentation */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
            <CardDescription>
              This prototype demonstrates the integration between Nori Farm virtual crops and real product databases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Supported Crops:</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {Object.keys(mockProducts).map((crop) => (
                  <Badge key={crop} variant="outline">
                    {crop}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Input Formats:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Crop name: "tomato", "carrot", "lettuce"</li>
                <li>• NFT ID format: "Tomato #124", "Carrot #456"</li>
                <li>• Case insensitive matching</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Response Format:</h4>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                {`{
  "crop": "Tomato #124",
  "matchedProduct": {
    "title": "Fresh Organic Tomato Box (2kg)",
    "price": "19,000 KRW",
    "image": "https://...",
    "buyLink": "https://..."
  },
  "confidence": 95,
  "matchReason": "Exact match found..."
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
