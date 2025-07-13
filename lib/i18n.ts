"use client"

import type React from "react"
import { createContext, useState, useContext, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

// Define translation content
const translations = {
  en: {
    norishop: "NoriShop",
    our_mission: "Our Mission",
    why: "Why",
    how: "How",
    contact: "Contact",
    hero_title_line1: "BRING ALL FARMS",
    hero_title_line2: "IN YOUR HAND!",
    hero_subtitle_line1: "Grow crops on Nori Farm App",
    hero_subtitle_line2: "get fresh harvest at your door",
    crop_matcher_title: "Crop to Product Matcher",
    crop_matcher_description:
      'Enter a virtual crop name (e.g., "tomato", "carrot") or NFT ID (e.g., "Tomato #124") to find its real-world counterpart.',
    input_placeholder: "Enter crop name or NFT ID...",
    searching: "Searching",
    find_product: "Find Product",
    try: "Try",
    match_result_title: "Match Result",
    card_view: "Card View",
    json_view: "JSON View",
    match: "Match",
    for: "for",
    price: "Price",
    seller: "Seller",
    rating: "Rating",
    stock: "Stock",
    in_stock: "In Stock",
    out_of_stock: "Out of Stock",
    buy_now: "Buy Now",
    no_matching_product_found: "No matching product found",
    api_doc_title: "API Documentation & Usage",
    api_doc_description:
      "This prototype demonstrates the integration between Nori Farm virtual crops and real product databases.",
    supported_crops: "Supported Crops",
    input_formats: "Input Formats",
    crop_name_format: 'Crop name: "tomato", "carrot", "lettuce", etc.',
    nft_id_format: 'NFT ID format: "Tomato #124", "Carrot #456"',
    case_insensitive_matching: "Case-insensitive matching is supported.",
    response_format: "Response Format",
    response_format_description:
      "The raw JSON response is provided for demonstration purposes, showing the exact data structure returned by the API. This can be toggled off in the UI if a cleaner presentation is preferred.",
    product_not_found: "Product Not Found",
    product_not_found_description: "The product you are looking for does not exist.",
    back_to_nori_farm_integration: "Back to Nori Farm Integration",
    back_to_nori_farm: "Back to Nori Farm",
    reviews: "reviews",
    category: "Category",
    availability: "Availability",
    add_to_cart: "Add to Cart",
    notify_me_when_back_in_stock: "Notify Me When Back in Stock",
    item_added_to_cart: "Item Added to Cart!",
    added_to_mock_cart: "has been added to your mock cart",
    out_of_stock_toast_title: "Out of Stock",
    out_of_stock_toast_description: "is currently out of stock",
    error_occurred: "An error occurred",
    try_again: "Please try again",
    search_failed: "Search Failed",
    could_not_find_match: "Could not find a match",
    buy_now_mock_payment: "Buy Now (Mock Payment)",
    mock_payment_success_title: "Payment Successful!",
    mock_payment_success_description: "has been successfully purchased via mock payment",
  },
  ko: {
    norishop: "노리샵",
    our_mission: "우리의 미션",
    why: "왜",
    how: "어떻게",
    contact: "문의",
    hero_title_line1: "모든 농장을",
    hero_title_line2: "손안에!",
    hero_subtitle_line1: "노리팜 앱에서 작물을 키우고",
    hero_subtitle_line2: "집으로 신선한 수확물을 받으세요",
    crop_matcher_title: "작물-제품 매칭기",
    crop_matcher_description:
      '가상 작물 이름 (예: "토마토", "당근") 또는 NFT ID (예: "토마토 #124")를 입력하여 실제 제품을 찾아보세요.',
    input_placeholder: "작물 이름 또는 NFT ID를 입력하세요...",
    searching: "검색 중",
    find_product: "제품 찾기",
    try: "예시",
    match_result_title: "매칭 결과",
    card_view: "카드 보기",
    json_view: "JSON 보기",
    match: "매칭",
    for: "에 대한",
    price: "가격",
    seller: "판매자",
    rating: "평점",
    stock: "재고",
    in_stock: "재고 있음",
    out_of_stock: "재고 없음",
    buy_now: "지금 구매",
    no_matching_product_found: "일치하는 제품을 찾을 수 없습니다",
    api_doc_title: "API 문서 및 사용법",
    api_doc_description: "이 프로토타입은 노리팜 가상 작물과 실제 제품 데이터베이스 간의 통합을 보여줍니다.",
    supported_crops: "지원되는 작물",
    input_formats: "입력 형식",
    crop_name_format: '작물 이름: "토마토", "당근", "상추" 등',
    nft_id_format: 'NFT ID 형식: "토마토 #124", "당근 #456"',
    case_insensitive_matching: "대소문자 구분 없이 매칭됩니다.",
    response_format: "응답 형식",
    response_format_description:
      "원시 JSON 응답은 API에서 반환되는 정확한 데이터 구조를 보여주기 위한 시연 목적으로 제공됩니다. 더 깔끔한 프레젠테이션을 선호하는 경우 UI에서 이 기능을 끌 수 있습니다.",
    product_not_found: "제품을 찾을 수 없습니다",
    product_not_found_description: "찾으시는 제품이 존재하지 않습니다.",
    back_to_nori_farm_integration: "노리팜 통합으로 돌아가기",
    back_to_nori_farm: "노리팜으로 돌아가기",
    reviews: "리뷰",
    category: "카테고리",
    availability: "재고",
    add_to_cart: "장바구니에 추가",
    notify_me_when_back_in_stock: "재고 입고 시 알림",
    item_added_to_cart: "상품이 장바구니에 추가되었습니다!",
    added_to_mock_cart: "이(가) 모의 장바구니에 추가되었습니다",
    out_of_stock_toast_title: "재고 없음",
    out_of_stock_toast_description: "은(는) 현재 재고가 없습니다",
    error_occurred: "오류가 발생했습니다",
    try_again: "다시 시도해주세요",
    search_failed: "검색 실패",
    could_not_find_match: "일치하는 항목을 찾을 수 없습니다",
    buy_now_mock_payment: "지금 구매 (모의 결제)",
    mock_payment_success_title: "결제 성공!",
    mock_payment_success_description: "이(가) 모의 결제를 통해 성공적으로 구매되었습니다",
  },
}

type Locale = keyof typeof translations
type TranslationKeys = keyof (typeof translations)["en"]

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKeys) => string
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key, // Default no-op translator
})

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>("en")

  const t = useCallback(
    (key: TranslationKeys) => {
      return translations[locale][key] || key // Fallback to key if translation not found
    },
    [locale],
  )

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
}

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useContext(LocaleContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 text-white border-white hover:bg-white/20 bg-transparent"
        >
          <Globe className="h-4 w-4 mr-2" />
          {locale === "en" ? "English" : "한국어"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("ko")}>한국어</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
