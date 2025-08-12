const { getDb, initDatabase } = require('./db');

const sampleProducts = [
  // Traditional Indian Sweets (Mithai)
  {
    name: 'Kaju Katli (500g)',
    slug: 'kaju-katli-500g',
    description: 'Premium cashew fudge squares, the king of Indian sweets made with pure cashews and silver leaf.',
    price: 899.00,
    image_url: '',
    is_featured: 1
  },
  {
    name: 'Rasgulla (1kg)',
    slug: 'rasgulla-1kg',
    description: 'Soft, spongy cottage cheese balls soaked in sugar syrup, a Bengali delicacy.',
    price: 450.00,
    image_url: '',
    is_featured: 1
  },
  {
    name: 'Gulab Jamun (1kg)',
    slug: 'gulab-jamun-1kg',
    description: 'Golden brown milk solid dumplings soaked in rose-flavored sugar syrup.',
    price: 520.00,
    image_url: '',
    is_featured: 1
  },
  {
    name: 'Maharaja Ghevar (Large)',
    slug: 'maharaja-ghevar-large',
    description: 'Royal Rajasthani honeycomb disc topped with rabri, almonds, and silver leaf.',
    price: 750.00,
    image_url: '',
    is_featured: 1
  },
  {
    name: 'Rasmalai (12 pieces)',
    slug: 'rasmalai-12-pieces',
    description: 'Delicate cottage cheese patties in thickened sweetened milk with cardamom and saffron.',
    price: 380.00,
    image_url: '',
    is_featured: 1
  },
  {
    name: 'Soan Papdi (500g)',
    slug: 'soan-papdi-500g',
    description: 'Flaky, crispy sweet made with gram flour, sugar, and pure ghee.',
    price: 320.00,
    image_url: '',
    is_featured: 0
  },
  
  // Fresh Breads & Rotis
  {
    name: 'Tandoor Naan (6 pieces)',
    slug: 'tandoor-naan-6-pieces',
    description: 'Fresh, soft naan bread baked in traditional clay tandoor.',
    price: 120.00,
    image_url: '',
    is_featured: 0
  },
  {
    name: 'Butter Kulcha (4 pieces)',
    slug: 'butter-kulcha-4-pieces',
    description: 'Leavened bread stuffed with spiced onions and topped with butter.',
    price: 150.00,
    image_url: '',
    is_featured: 0
  },
  {
    name: 'Whole Wheat Rotis (10 pieces)',
    slug: 'whole-wheat-rotis-10-pieces',
    description: 'Fresh, soft whole wheat flatbreads made daily.',
    price: 80.00,
    image_url: '',
    is_featured: 0
  },
  
  // Fusion & Modern Items
  {
    name: 'Eggless Chocolate Cake (1kg)',
    slug: 'eggless-chocolate-cake-1kg',
    description: 'Rich, moist chocolate cake made without eggs, perfect for vegetarian families.',
    price: 650.00,
    image_url: '',
    is_featured: 1
  },
  {
    name: 'Kesar Pista Kulfi (6 pieces)',
    slug: 'kesar-pista-kulfi-6-pieces',
    description: 'Traditional Indian ice cream with saffron and pistachios.',
    price: 280.00,
    image_url: '',
    is_featured: 0
  },
  {
    name: 'Samosa (12 pieces)',
    slug: 'samosa-12-pieces',
    description: 'Crispy triangular pastries filled with spiced potatoes and peas.',
    price: 180.00,
    image_url: '',
    is_featured: 0
  },
  
  // Special Festival Items
  {
    name: 'Modak (Krishna Special)',
    slug: 'modak-krishna-special',
    description: 'Lord Krishna\'s favorite sweet dumplings filled with jaggery and coconut.',
    price: 420.00,
    image_url: '',
    is_featured: 1
  },
  {
    name: 'Diwali Special Mix (1kg)',
    slug: 'diwali-special-mix-1kg',
    description: 'Assorted festival sweets including kaju katli, gulab jamun, and barfi.',
    price: 1200.00,
    image_url: '',
    is_featured: 1
  },
  {
    name: 'Pure Desi Ghee (1L)',
    slug: 'pure-desi-ghee-1l',
    description: 'Premium quality clarified butter made from cow milk, perfect for cooking and rituals.',
    price: 850.00,
    image_url: '',
    is_featured: 0
  }
];

const seedDatabase = async () => {
  try {
    await initDatabase();
    console.log('✅ Database initialized');
    
    const db = getDb();
    
    // Clear existing products
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM products', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    console.log('🧹 Cleared existing products');
    
    // Insert sample products
    const stmt = db.prepare(`
      INSERT INTO products (name, slug, description, price, image_url, is_featured)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    for (const product of sampleProducts) {
      await new Promise((resolve, reject) => {
        stmt.run(
          product.name,
          product.slug,
          product.description,
          product.price,
          product.image_url,
          product.is_featured,
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }
    
    stmt.finalize();
    
    console.log(`🌱 Seeded ${sampleProducts.length} products`);
    console.log('✅ Database seeding completed!');
    
    // Display products for verification
    db.all('SELECT name, price, is_featured FROM products ORDER BY is_featured DESC', (err, products) => {
      if (err) {
        console.error('Error fetching products:', err);
      } else {
        console.log('\n📋 Products in database:');
        products.forEach(p => {
          const featured = p.is_featured ? '⭐' : '  ';
          console.log(`${featured} ${p.name} - $${p.price}`);
        });
      }
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
