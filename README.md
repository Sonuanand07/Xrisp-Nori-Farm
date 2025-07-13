# Nori Farm Integration Prototype (Perfected with Multi-language Support)

A perfected proof-of-concept integration that maps virtual crops from Nori Farm to real-world agricultural products, now featuring robust multi-language support (English and Korean), a refined UI, and fully functional internal links with correct image display.

## 🎯 Project Overview

This prototype demonstrates how XrisP's Nori Farm platform can integrate with e-commerce systems to bridge the gap between virtual crop growing and real product fulfillment. This version focuses on a polished user experience, robust internal navigation, and internationalization capabilities, addressing all previous issues.

## ✨ Features

-   **Multi-language Support**: Toggle between English and Korean for all UI text and product details.
-   **Enhanced UI**: Design inspired by the `www.nftnorifarm.com` website, featuring a vibrant green theme, improved typography, and a cleaner layout.
-   **Functional "Buy Now" Links**: Links now navigate to a **mock product detail page** within the prototype, ensuring no 404 errors and demonstrating a complete user flow.
-   **Simulated Transaction**: "Add to Cart" on product pages now triggers a user-friendly toast notification. A new "Buy Now (Mock Payment)" button simulates a successful payment transaction with a dedicated toast.
-   **Correct Image Display**: Placeholder images are now correctly displayed across the application using specific and varied dimensions for better visual distinction.
-   **Smart Crop Matching**: Accurately maps virtual crop names or NFT IDs (e.g., "Tomato #124") to real products.
-   **Expanded Mock Product Database**: Includes more diverse Korean agricultural products with realistic details and Korean translations.
-   **REST API**: Dedicated Next.js API endpoint for crop-to-product matching.
-   **Interactive UI**: Intuitive web interface for testing the integration.
-   **JSON Output**: Structured JSON responses for easy integration, viewable directly in the UI.
-   **Dual View Modes**: Toggle between a user-friendly card view and a raw JSON view for results.
-   **Accessibility**: Improved semantic HTML and ARIA attributes.

## 🛠 Tech Stack

-   **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
-   **Backend**: Next.js API Routes
-   **UI Components**: shadcn/ui
-   **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1.  Clone the repository:
    \`\`\`bash
    git clone <repository-url>
    cd nori-farm-integration
    \`\`\`
2.  Install dependencies:
    \`\`\`bash
    npm install
    \`\`\`
3.  Run the development server:
    \`\`\`bash
    npm run dev
    \`\`\`
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API Usage

### Match Crop to Product

**Endpoint**: `POST /api/match-crop`

**Request Body**:
\`\`\`json
{
  "cropInput": "tomato" // or "Tomato #124"
}
\`\`\`

**Response**:
\`\`\`json
{
  "crop": "tomato",
  "matchedProduct": {
    "title": "Fresh Organic Tomato Box (2kg)",
    "title_ko": "신선한 유기농 토마토 박스 (2kg)",
    "price": "19,000 KRW",
    "image": "/placeholder.svg",
    "buyLink": "/mock-shop/product/fresh-organic-tomato-box",
    "description": "...",
    "description_ko": "...",
    "seller": "...",
    "rating": 4.8,
    "inStock": true,
    "slug": "fresh-organic-tomato-box"
  },
  "confidence": 95,
  "matchReason": "Exact match found for tomato in product database.",
  "timestamp": "2024-07-13T14:00:00.000Z"
}
\`\`\`

### Health Check

**Endpoint**: `GET /api/match-crop`

Returns API information and supported crops.

## 🌱 Supported Crops (for demonstration)

-   Tomato
-   Carrot
-   Lettuce
-   Eggplant
-   Potato
-   Banana
-   Radish
-   Pumpkin

## 🔧 Input Formats

-   **Crop Name**: `"tomato"`, `"carrot"`, `"lettuce"`, etc.
-   **NFT ID**: `"Tomato #124"`, `"Carrot #456"`
-   **Case Insensitive**: All inputs are normalized to lowercase for matching.

## 🏗 Architecture

\`\`\`
├── app/
│   ├── layout.tsx            # Root layout with LocaleProvider and Toaster
│   ├── page.tsx              # Main UI component (integration interface)
│   ├── api/match-crop/       # API endpoint for crop matching
│   └── mock-shop/product/[slug]/ # Dynamic route for mock product detail pages
├── components/
│   └── ui/                   # shadcn/ui components (not explicitly listed, but used)
├── lib/
│   ├── i18n.ts               # Internationalization context and translations
│   ├── mock-data.ts          # Centralized mock product data (as an array)
│   └── types.ts              # TypeScript type definitions
└── data/
    └── mock-products.json    # Mock product database (for reference, data is in code)
\`\`\`

## 🔮 Future Enhancements

1.  **Real API Integration**: Connect to actual e-commerce APIs (Shopify, Cafe24) for live product data.
2.  **Advanced Matching**: Implement fuzzy matching or AI-driven product recommendations.
3.  **Multi-language & Currency**: Support for various languages and international currencies.
4.  **Real-time Inventory**: Integrate with actual inventory management systems.
5.  **User Authentication & Orders**: Implement user accounts, order history, and fulfillment tracking.
6.  **Blockchain Integration**: Deeper integration with NFT contracts for ownership verification.
7.  **Visual Assets**: Replace placeholder images with actual product images.

## 🧪 Testing

The prototype includes several test cases:

-   Exact crop name matching.
-   NFT ID parsing (e.g., "Tomato #124" → "tomato").
-   Case insensitive matching.
-   Handling of unknown inputs.
-   Demonstration of out-of-stock products.
-   Functional navigation to mock product detail pages.
-   Simulated "Add to Cart" transaction with toast notifications.
-   Language switching for all UI text and product details.

## 📝 Assumptions & Limitations

### Assumptions
-   Virtual crops have standardized names that can be mapped to real products.
-   NFT IDs follow a consistent "CropName #Number" format.
-   Product prices are primarily in Korean Won (KRW) for this prototype.
-   Simple 1:1 crop-to-product mapping for demonstration.

### Limitations
-   Uses mock data; not connected to a live product database.
-   Limited variety of crops and products for demonstration purposes.
-   No actual payment processing or order fulfillment.
-   No user authentication or personalized features.
-   Image assets are placeholders.

## 🤝 Contributing

This project is a prototype for demonstration purposes as part of the XrisP competency assessment. For production use, consider:

1.  Implementing robust error handling and input validation.
2.  Setting up comprehensive logging, monitoring and analytics.
3.  Adding extensive unit and integration tests.
4.  Implementing caching strategies and rate limiting for API endpoints.
5.  Enhancing security measures.

## 📄 License

This project is for demonstration purposes as part of the XrisP competency assessment.
