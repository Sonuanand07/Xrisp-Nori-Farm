# Nori Farm Integration Prototype

A proof-of-concept integration that maps virtual crops from Nori Farm to real-world agricultural products available in online shopping malls.

## 🎯 Project Overview

This prototype demonstrates how XrisP's Nori Farm platform can integrate with e-commerce systems to bridge the gap between virtual crop growing and real product fulfillment.

## ✨ Features

- **Crop Matching**: Maps virtual crop names or NFT IDs to real products
- **Product Database**: Mock product database with Korean agricultural products
- **REST API**: RESTful API endpoint for crop-to-product matching
- **Interactive UI**: Web interface for testing the integration
- **JSON Output**: Structured JSON responses for easy integration
- **Multiple View Modes**: Card view and JSON view for results

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd nori-farm-integration
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

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
    "price": "19,000 KRW",
    "image": "https://example.com/tomato.jpg",
    "buyLink": "https://mock-shop.com/product/organic-tomato-box"
  },
  "confidence": 95,
  "matchReason": "Exact match found for tomato in product database",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
\`\`\`

### Health Check

**Endpoint**: `GET /api/match-crop`

Returns API information and supported crops.

## 🌱 Supported Crops

- Tomato
- Carrot  
- Lettuce
- Eggplant
- Potato

## 🔧 Input Formats

- **Crop Name**: `"tomato"`, `"carrot"`, `"lettuce"`
- **NFT ID**: `"Tomato #124"`, `"Carrot #456"`
- **Case Insensitive**: All inputs are normalized to lowercase

## 🏗 Architecture

\`\`\`
├── app/
│   ├── page.tsx              # Main UI component
│   └── api/match-crop/       # API endpoint
├── components/
│   └── crop-matcher.tsx      # Reusable crop matcher component
├── lib/
│   └── types.ts              # TypeScript type definitions
└── data/
    └── mock-products.json    # Mock product database
\`\`\`

## 🔮 Future Enhancements

1. **Real API Integration**: Connect to actual e-commerce APIs (Shopify, Cafe24)
2. **Machine Learning**: Implement fuzzy matching for better crop recognition
3. **Multi-language Support**: Support for multiple languages and currencies
4. **Inventory Management**: Real-time stock checking
5. **Price Comparison**: Compare prices across multiple vendors
6. **User Authentication**: User accounts and order history
7. **Blockchain Integration**: NFT verification and ownership tracking

## 🧪 Testing

The prototype includes several test cases:

- Exact crop name matching
- NFT ID parsing (e.g., "Tomato #124" → "tomato")
- Case insensitive matching
- Invalid input handling
- Out of stock products

## 📝 Assumptions & Limitations

### Assumptions
- Virtual crops have standardized names
- NFT IDs follow the format "CropName #Number"
- Product prices are in Korean Won (KRW)
- Simple 1:1 crop-to-product mapping

### Limitations
- Mock data only (no real product database)
- Limited crop variety (5 types)
- No real payment processing
- No inventory management
- No user authentication
- No order fulfillment tracking

## 🤝 Contributing

This is a prototype for demonstration purposes. For production use, consider:

1. Implementing proper error handling
2. Adding input validation and sanitization
3. Setting up proper logging and monitoring
4. Adding comprehensive tests
5. Implementing caching strategies
6. Adding rate limiting and security measures

## 📄 License

This project is for demonstration purposes as part of the XrisP competency assessment.
