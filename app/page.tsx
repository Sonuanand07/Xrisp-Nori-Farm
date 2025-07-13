"use client"

import type React from "react"

import { useState, useContext } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, ShoppingCart, ExternalLink, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { LocaleContext, LanguageSwitcher } from "@/lib/i18n" // Import LocaleContext and LanguageSwitcher
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
  title_ko?: string // Korean title
  description_ko?: string // Korean description
}

interface CropMatchResult {
  crop: string
  matchedProduct: MatchedProduct | null
  confidence: number
  matchReason: string
}

const cropImages: Record<string, string> = {
  tomato: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", // Tomato
  lettuce: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80", // Lettuce
  cucumber: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", // Cucumber
  strawberry: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", // Strawberry
  carrot: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=400&q=80", // Carrot
  potato: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80", // Potato
  onion: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", // Onion
  spinach: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", // Spinach
  broccoli: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", // Broccoli
  eggplant: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", // Eggplant
  bellpepper: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", // Bell Pepper
  corn: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", // Corn
  cabbage: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80", // Cabbage
  peas: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", // Peas
  pumpkin: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", // Pumpkin
  radish: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=400&q=80", // Radish
  beetroot: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", // Beetroot
  garlic: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", // Garlic
  ginger: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", // Ginger
  default: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", // Default vegetable
}

export default function NoriFarmIntegration() {
  const [cropInput, setCropInput] = useState("")
  const [result, setResult] = useState<CropMatchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [jsonView, setJsonView] = useState(false)
  const { toast } = useToast()
  const { t, locale } = useContext(LocaleContext) // Use translation context

  const handleSearch = async () => {
    if (!cropInput.trim()) return

    setLoading(true)
    setResult(null) // Clear previous result
    setJsonView(false) // Reset view to card

    try {
      // Call the API route for matching
      const response = await fetch("/api/match-crop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cropInput }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `API error: ${response.statusText}`)
      }

      const matchResult: CropMatchResult = await response.json()
      setResult(matchResult)
    } catch (error) {
      console.error("Error matching crop:", error)
      setResult({
        crop: cropInput,
        matchedProduct: null,
        confidence: 0,
        matchReason: `${t("error_occurred")}: ${(error as Error).message}. ${t("try_again")}.`,
      })
      toast({
        title: t("search_failed"),
        description: `${t("could_not_find_match")}: ${(error as Error).message}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const stars = []
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />,
      )
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-[#4CAF50] text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-[#388E3C] text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=80&h=80"
              alt="Nori Farm Logo"
              width={40}
              height={40}
              className="rounded-full bg-white"
            />
            <span className="text-2xl font-bold">Nori Farm</span>
          </div>
          <nav className="hidden md:flex gap-6 text-lg">
            <Link href="#" className="hover:text-gray-200 transition-colors">
              {t("norishop")}
            </Link>
            <Link href="#" className="hover:text-gray-200 transition-colors">
              {t("our_mission")}
            </Link>
            <Link href="#" className="hover:text-gray-200 transition-colors">
              {t("why")}
            </Link>
            <Link href="#" className="hover:text-gray-200 transition-colors">
              {t("how")}
            </Link>
            <Link href="#" className="hover:text-gray-200 transition-colors">
              {t("contact")}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" className="md:hidden text-white">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full space-y-8">
          {/* Hero Section */}
          <div className="text-center text-white py-12">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              {t("hero_title_line1")} <br /> {t("hero_title_line2")}
            </h1>
            <p className="text-xl md:text-2xl font-medium drop-shadow-md">
              {t("hero_subtitle_line1")}; {t("hero_subtitle_line2")}
            </p>
          </div>

          {/* Search Interface */}
          <Card className="shadow-2xl border-none rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Image
                  src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=32&h=32"
                  alt="Cart Icon"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-green-800">
                  <ShoppingCart className="h-6 w-6" />
                  {t("crop_matcher_title")}
                </CardTitle>
              </div>
              <CardDescription className="text-gray-700 text-base">{t("crop_matcher_description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder={t("input_placeholder")}
                  value={cropInput}
                  onChange={(e) => setCropInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 h-12 text-lg border-green-300 focus-visible:ring-green-500"
                />
                <Button
                  onClick={handleSearch}
                  disabled={loading || !cropInput.trim()}
                  className="h-12 px-6 text-lg bg-green-700 hover:bg-green-800 text-white shadow-md transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      {t("searching")}...
                    </>
                  ) : (
                    t("find_product")
                  )}
                </Button>
              </div>

              {/* Sample inputs */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600 font-medium">{t("try")}:</span>
                {mockProductsArray.map((product) => (
                  <Badge
                    key={product.slug}
                    variant="secondary"
                    className="cursor-pointer text-green-800 bg-green-100 hover:bg-green-200 transition-colors text-sm px-3 py-1 flex items-center gap-1"
                    onClick={() => setCropInput(product.cropType)}
                  >
                    <Image
                      src={cropImages[product.cropType.toLowerCase()] || cropImages.default}
                      alt={product.cropType}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    {product.cropType.charAt(0).toUpperCase() + product.cropType.slice(1)}
                  </Badge>
                ))}
                <Badge
                  variant="secondary"
                  className="cursor-pointer text-green-800 bg-green-100 hover:bg-green-200 transition-colors text-sm px-3 py-1"
                  onClick={() => setCropInput("Tomato #124")}
                >
                  Tomato #124
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card className="shadow-2xl border-none rounded-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-green-800">{t("match_result_title")}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={jsonView ? "outline" : "default"}
                      size="sm"
                      onClick={() => setJsonView(false)}
                      className={
                        jsonView ? "border-green-300 text-green-700" : "bg-green-600 hover:bg-green-700 text-white"
                      }
                    >
                      {t("card_view")}
                    </Button>
                    <Button
                      variant={jsonView ? "default" : "outline"}
                      size="sm"
                      onClick={() => setJsonView(true)}
                      className={
                        jsonView ? "bg-green-600 hover:bg-green-700 text-white" : "border-green-300 text-green-700"
                      }
                    >
                      {t("json_view")}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {jsonView ? (
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm text-gray-800">
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
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={result.confidence > 0 ? "default" : "destructive"}
                        className="px-3 py-1 text-base"
                      >
                        {result.confidence}% {t("match")}
                      </Badge>
                      <span className="text-base text-gray-700">
                        {t("for")} "{result.crop}"
                      </span>
                    </div>

                    {result.matchedProduct ? (
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                          <Image
                            src={
                              result.matchedProduct?.image ||
                              cropImages[result.crop?.toLowerCase() || ""] ||
                              cropImages.default
                            }
                            alt={
                              locale === "ko" && result.matchedProduct?.title_ko
                                ? result.matchedProduct.title_ko
                                : result.matchedProduct?.title || result.crop
                            }
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover rounded-lg shadow-md bg-gray-100"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-3xl font-bold text-green-800">
                              {locale === "ko" && result.matchedProduct.title_ko
                                ? result.matchedProduct.title_ko
                                : result.matchedProduct.title}
                            </h3>
                            <p className="text-gray-700 mt-1">
                              {locale === "ko" && result.matchedProduct.description_ko
                                ? result.matchedProduct.description_ko
                                : result.matchedProduct.description}
                            </p>
                          </div>

                          <div className="space-y-2 text-lg">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">{t("price")}:</span>
                              <span className="font-bold text-green-700">{result.matchedProduct.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">{t("seller")}:</span>
                              <span className="font-medium">{result.matchedProduct.seller}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">{t("rating")}:</span>
                              <span className="flex items-center gap-1">
                                {renderStars(result.matchedProduct.rating)}
                                <span className="font-medium text-gray-800">{result.matchedProduct.rating}/5</span>
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">{t("stock")}:</span>
                              <Badge
                                variant={result.matchedProduct.inStock ? "default" : "destructive"}
                                className="text-base px-3 py-1"
                              >
                                {result.matchedProduct.inStock ? t("in_stock") : t("out_of_stock")}
                              </Badge>
                            </div>
                          </div>

                          <Link href={result.matchedProduct.buyLink} passHref>
                            <Button className="w-full h-12 text-lg bg-green-700 hover:bg-green-800 text-white shadow-md transition-all duration-200">
                              <ExternalLink className="h-5 w-5 mr-2" />
                              {t("buy_now")}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-700 text-lg mb-3">{t("no_matching_product_found")}</p>
                        <p className="text-base text-gray-600">{result.matchReason}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Documentation */}
          <Card className="shadow-2xl border-none rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Image
                  src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=32&h=32"
                  alt="Docs Icon"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <CardTitle className="text-2xl font-bold text-green-800">{t("api_doc_title")}</CardTitle>
              </div>
              <CardDescription className="text-gray-700 text-base">{t("api_doc_description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex justify-center mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=200&q=80"
                  alt="Documentation Decorative"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-green-800 mb-2">{t("supported_crops")}:</h4>
                <div className="flex flex-wrap gap-2">
                  {mockProductsArray.map((product) => (
                    <Badge
                      key={product.slug}
                      variant="outline"
                      className="text-green-800 bg-green-100 text-sm px-3 py-1"
                    >
                      {product.cropType.charAt(0).toUpperCase() + product.cropType.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-green-800 mb-2">{t("input_formats")}:</h4>
                <ul className="text-base text-gray-700 space-y-1 list-disc list-inside">
                  <li>{t("crop_name_format")}</li>
                  <li>{t("nft_id_format")}</li>
                  <li>{t("case_insensitive_matching")}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-green-800 mb-2">{t("response_format")}:</h4>
                <p className="text-gray-700 text-sm mb-2">{t("response_format_description")}</p>
                <pre className="bg-gray-100 p-4 rounded text-xs md:text-sm overflow-x-auto text-gray-800">
                  {`{
  "crop": "Tomato #124",
  "matchedProduct": {
    "title": "Fresh Organic Tomato Box (2kg)",
    "price": "19,000 KRW",
    "image": "/placeholder.svg",
    "buyLink": "/mock-shop/product/fresh-organic-tomato-box",
    "description": "...",
    "seller": "...",
    "rating": 4.8,
    "inStock": true,
    "slug": "fresh-organic-tomato-box"
  },
  "confidence": 95,
  "matchReason": "Exact match found..."
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
