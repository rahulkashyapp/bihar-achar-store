#!/bin/bash

# Bihar Achar Store - Deployment Script

echo "🥭 Bihar Achar Store - Deployment Script"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
# Database
DATABASE_URL="file:./dev.db"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NODE_ENV="development"
EOL
    echo "✅ .env file created. Please update the values as needed."
fi

# Setup database
echo "🗄️ Setting up database..."
npm run db:push
npm run db:generate

# Seed database
echo "🌱 Seeding database with sample data..."
npx tsx seed.ts

# Build the application
echo "🏗️ Building application..."
npm run build

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Start the server: npm run start"
echo "2. Open http://localhost:3000"
echo "3. Admin panel: http://localhost:3000/admin"
echo "4. Admin credentials: admin@biharachar.com / admin123"
echo ""
echo "📞 For support: info@biharachar.com"