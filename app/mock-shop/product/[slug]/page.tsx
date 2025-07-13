"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LocaleContext } from "@/lib/i18n" // Import LocaleContext
import { mockProductsArray } from "@/lib/mock-data" // Import centralized mock data array
import { useContext } from "react"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  // Find product by slug from the array
  const product = mockProductsArray.find((p) => p.slug === params.slug)
  const { toast } = useToast()
  const { t, locale } = useContext(LocaleContext) // Use translation context

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("product_not_found")}</h1>
        <p className="text-lg text-gray-600 mb-8">{t("product_not_found_description")}</p>
        <Link href="/" passHref>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("back_to_nori_farm_integration")}
          </Button>
        </Link>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const stars = []
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)
    }
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-5 w-5 fill-yellow-400 text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />,
      )
    }
    return stars
  }

  const handleAddToCart = () => {
    if (product.inStock) {
      toast({
        title: t("item_added_to_cart"),
        description: `${locale === "ko" && product.title_ko ? product.title_ko : product.title} ${t("added_to_mock_cart")}.`,
        duration: 3000,
      })
    } else {
      toast({
        title: t("out_of_stock_toast_title"),
        description: `${locale === "ko" && product.title_ko ? product.title_ko : product.title} ${t("out_of_stock_toast_description")}.`,
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const handleBuyNowMockPayment = () => {
    if (product.inStock) {
      toast({
        title: t("mock_payment_success_title"),
        description: `${locale === "ko" && product.title_ko ? product.title_ko : product.title} ${t("mock_payment_success_description")}.`,
        duration: 5000,
        variant: "default",
      })
    } else {
      toast({
        title: t("out_of_stock_toast_title"),
        description: `${locale === "ko" && product.title_ko ? product.title_ko : product.title} ${t("out_of_stock_toast_description")}.`,
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <Link href="/" passHref>
            <Button variant="outline" className="mb-6 text-green-700 border-green-300 hover:bg-green-50 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("back_to_nori_farm")}
            </Button>
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={locale === "ko" && product.title_ko ? product.title_ko : product.title}
                width={400}
                height={400}
                className="max-w-full h-auto object-contain rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold text-green-800">
                {locale === "ko" && product.title_ko ? product.title_ko : product.title}
              </h1>
              <p className="text-3xl font-bold text-green-700">{product.price}</p>

              <div className="flex items-center gap-2 text-lg text-gray-700">
                <span className="flex items-center gap-1">{renderStars(product.rating)}</span>
                <span className="font-semibold">{product.rating}/5</span>
                <span className="text-gray-500">
                  ({(Math.random() * 100 + 50).toFixed(0)} {t("reviews")})
                </span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                {locale === "ko" && product.description_ko ? product.description_ko : product.description}
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">{t("seller")}:</span>
                  <span className="font-medium text-gray-800">{product.seller}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">{t("category")}:</span>
                  <span className="font-medium text-gray-800">{product.category}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">{t("availability")}:</span>
                  <Badge variant={product.inStock ? "default" : "destructive"} className="text-base px-3 py-1">
                    {product.inStock ? t("in_stock") : t("out_of_stock")}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  className="w-full h-14 text-xl bg-green-700 hover:bg-green-800 text-white shadow-md transition-all duration-200"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  {t("add_to_cart")}
                </Button>
                <Button
                  className="w-full h-14 text-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200"
                  disabled={!product.inStock}
                  onClick={handleBuyNowMockPayment}
                >
                  {t("buy_now_mock_payment")}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-green-800 bg-green-100 text-sm px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
