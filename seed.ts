import { db } from './src/lib/db';

async function main() {
  console.log('Start seeding...');

  // Create categories
  const mangoCategory = await db.category.create({
    data: {
      name: 'Mango Pickle',
      description: 'Traditional raw mango pickles from Bihar',
      image: '🥭'
    }
  });

  const lemonCategory = await db.category.create({
    data: {
      name: 'Lemon Pickle',
      description: 'Tangy and spicy lemon pickles',
      image: '🍋'
    }
  });

  const mixedCategory = await db.category.create({
    data: {
      name: 'Mixed Pickle',
      description: 'Assorted vegetable pickles',
      image: '🥗'
    }
  });

  // Create products
  await db.product.createMany({
    data: [
      {
        name: 'Traditional Mango Achar',
        description: 'Authentic Bihar-style raw mango pickle with mustard oil and traditional spices. Made with hand-picked raw mangoes and our grandmother\'s secret recipe.',
        price: 180,
        weight: '500g',
        category: 'Mango Pickle',
        categoryId: mangoCategory.id,
        ingredients: 'Raw Mango, Mustard Oil, Spices, Salt, Turmeric',
        shelfLife: '6 months',
        stock: 50,
        featured: true,
        imageUrl: '/images/mango-pickle.jpg'
      },
      {
        name: 'Lemon Mirchi Achar',
        description: 'Tangy lemon and green chili pickle with a perfect blend of spices. A perfect accompaniment to your meals.',
        price: 150,
        weight: '400g',
        category: 'Lemon Pickle',
        categoryId: lemonCategory.id,
        ingredients: 'Lemon, Green Chili, Mustard Oil, Spices, Salt',
        shelfLife: '8 months',
        stock: 30,
        featured: true,
        imageUrl: '/images/lemon-pickle.jpg'
      },
      {
        name: 'Mixed Vegetable Achar',
        description: 'A delightful mix of seasonal vegetables in traditional spices. Perfect for those who love variety in their pickles.',
        price: 200,
        weight: '600g',
        category: 'Mixed Pickle',
        categoryId: mixedCategory.id,
        ingredients: 'Mixed Vegetables, Mustard Oil, Spices, Salt',
        shelfLife: '6 months',
        stock: 25,
        featured: true,
        imageUrl: '/images/mixed-pickle.jpg'
      },
      {
        name: 'Garlic Achar',
        description: 'Spicy and flavorful garlic pickle with mustard oil. Great for digestion and adds amazing taste to your food.',
        price: 220,
        weight: '450g',
        category: 'Garlic Pickle',
        ingredients: 'Garlic, Mustard Oil, Red Chili, Spices, Salt',
        shelfLife: '8 months',
        stock: 20,
        featured: false,
        imageUrl: '/images/garlic-pickle.jpg'
      },
      {
        name: 'Tomato Pickle',
        description: 'Sweet and sour tomato pickle with traditional spices. A perfect blend of flavors that reminds you of home.',
        price: 160,
        weight: '500g',
        category: 'Tomato Pickle',
        ingredients: 'Tomato, Mustard Oil, Jaggery, Spices, Salt',
        shelfLife: '4 months',
        stock: 15,
        featured: false,
        imageUrl: '/images/tomato-pickle.jpg'
      },
      {
        name: 'Chili Pickle',
        description: 'Hot and spicy green chili pickle for those who love extra heat in their food. Made with fresh green chilies.',
        price: 140,
        weight: '350g',
        category: 'Chili Pickle',
        ingredients: 'Green Chili, Mustard Oil, Spices, Salt',
        shelfLife: '6 months',
        stock: 35,
        featured: false,
        imageUrl: '/images/chili-pickle.jpg'
      }
    ]
  });

  // Create admin user
  await db.user.create({
    data: {
      email: 'admin@biharachar.com',
      name: 'Admin',
      password: 'admin123', // In production, this should be hashed
      role: 'admin'
    }
  });

  // Create settings
  await db.settings.createMany({
    data: [
      {
        key: 'upi_id',
        value: 'rahulkashyap@ybl',
        description: 'UPI payment ID for orders'
      },
      {
        key: 'contact_phone',
        value: '+91 97986 36339',
        description: 'Business contact number'
      },
      {
        key: 'contact_email',
        value: 'info@biharachar.com',
        description: 'Business contact email'
      },
      {
        key: 'store_address',
        value: 'Near Gandhi Maidan, Patna, Bihar - 800001',
        description: 'Store physical address'
      },
      {
        key: 'payment_instructions',
        value: 'Please make the payment and upload the screenshot. We\'ll verify and process your order within 24 hours.',
        description: 'Instructions for payment process'
      }
    ]
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });