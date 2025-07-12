"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search } from "lucide-react"

interface MatchedProduct {
  title: string
  price: string
  image: string
  buyLink: string
}

interface CropMatchResult {
  crop: string
  matchedProduct: MatchedProduct | null
  confidence: number
  matchReason: string
}

export function CropMatcher() {
  const [cropInput, setCropInput] = useState("")
  const [result, setResult] = useState<CropMatchResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleMatch = async () => {
    if (!cropInput.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/match-crop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cropInput }),
      })

      if (!response.ok) {
        throw new Error("Failed to match crop")
      }

      const matchResult = await response.json()
      setResult(matchResult)
    } catch (error) {
      console.error("Error matching crop:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Crop to Product Matcher
        </CardTitle>
        <CardDescription>Enter a crop name or NFT ID to find matching real-world products</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="e.g., 'tomato' or 'Tomato #124'"
            value={cropInput}
            onChange={(e) => setCropInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleMatch()}
          />
          <Button onClick={handleMatch} disabled={loading || !cropInput.trim()}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Match"}
          </Button>
        </div>

        {result && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant={result.confidence > 0 ? "default" : "destructive"}>{result.confidence}% Match</Badge>
              <span className="text-sm text-gray-600">for "{result.crop}"</span>
            </div>

            {result.matchedProduct ? (
              <div className="space-y-2">
                <h3 className="font-semibold">{result.matchedProduct.title}</h3>
                <p className="text-green-600 font-medium">{result.matchedProduct.price}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(result.matchedProduct!.buyLink, "_blank")}
                >
                  View Product
                </Button>
              </div>
            ) : (
              <p className="text-gray-600">{result.matchReason}</p>
            )}

            <details className="text-sm">
              <summary className="cursor-pointer text-gray-600">View JSON Response</summary>
              <pre className="mt-2 p-2 bg-white rounded border overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
            </details>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
