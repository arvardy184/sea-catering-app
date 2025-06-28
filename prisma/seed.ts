import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  console.log('👤 Creating admin user...');
  
  const adminPassword = await bcrypt.hash('admin123!', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@seacatering.com' },
    update: {},
    create: {
      email: 'admin@seacatering.com',
      name: 'SEA Catering Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log(`✅ Created admin user: ${adminUser.email}`);

  // Create sample meal plans
  console.log('📋 Creating meal plans...');
  
  const mealPlans = await prisma.mealPlan.createMany({
    data: [
      // Breakfast
      {
        name: 'Healthy Overnight Oats',
        category: 'breakfast',
        description: 'Oats dengan buah segar, chia seeds, dan yogurt Greek yang kaya protein',
        price: 35000,
        calories: 320,
        cookingTime: '5 menit',
        rating: 4.8,
        tags: JSON.stringify(['high-fiber', 'protein', 'gluten-free']),
        popular: true,
        protein: 12.5,
        carbs: 45.2,
        fats: 8.3,
        fiber: 6.8,
        ingredients: JSON.stringify(['rolled oats', 'chia seeds', 'Greek yogurt', 'blueberries', 'honey', 'almond milk']),
        allergens: JSON.stringify(['dairy', 'nuts']),
      },
      {
        name: 'Avocado Toast Supreme',
        category: 'breakfast',
        description: 'Roti gandum dengan alpukat segar, telur rebus, dan microgreens',
        price: 42000,
        calories: 380,
        cookingTime: '8 menit',
        rating: 4.6,
        tags: JSON.stringify(['high-protein', 'healthy-fats', 'vegetarian']),
        popular: false,
        protein: 18.2,
        carbs: 32.1,
        fats: 22.4,
        fiber: 8.9,
        ingredients: JSON.stringify(['whole grain bread', 'avocado', 'eggs', 'microgreens', 'cherry tomatoes', 'olive oil']),
        allergens: JSON.stringify(['gluten', 'eggs']),
      },

      // Lunch
      {
        name: 'Grilled Salmon Bowl',
        category: 'lunch',
        description: 'Salmon panggang dengan quinoa, sayuran hijau segar, dan saus lemon herbs',
        price: 68000,
        calories: 450,
        cookingTime: '15 menit',
        rating: 4.9,
        tags: JSON.stringify(['high-protein', 'omega-3', 'low-carb', 'premium']),
        popular: true,
        protein: 35.6,
        carbs: 28.4,
        fats: 18.9,
        fiber: 5.2,
        ingredients: JSON.stringify(['salmon fillet', 'quinoa', 'broccoli', 'spinach', 'cherry tomatoes', 'lemon', 'herbs']),
        allergens: JSON.stringify(['fish']),
      },
      {
        name: 'Power Protein Bowl',
        category: 'lunch',
        description: 'Chicken breast dengan brown rice, sayuran panggang, dan edamame',
        price: 55000,
        calories: 420,
        cookingTime: '12 menit',
        rating: 4.7,
        tags: JSON.stringify(['high-protein', 'balanced', 'filling']),
        popular: true,
        protein: 32.8,
        carbs: 35.6,
        fats: 12.4,
        fiber: 6.8,
        ingredients: JSON.stringify(['chicken breast', 'brown rice', 'broccoli', 'carrots', 'edamame', 'sesame dressing']),
        allergens: JSON.stringify(['soy', 'sesame']),
      },

      // Dinner
      {
        name: 'Mediterranean Delight',
        category: 'dinner',
        description: 'Grilled vegetables dengan hummus, feta cheese, dan olive oil extra virgin',
        price: 58000,
        calories: 380,
        cookingTime: '18 menit',
        rating: 4.5,
        tags: JSON.stringify(['vegetarian', 'mediterranean', 'healthy-fats']),
        popular: false,
        protein: 15.2,
        carbs: 32.8,
        fats: 24.6,
        fiber: 8.4,
        ingredients: JSON.stringify(['zucchini', 'eggplant', 'bell peppers', 'hummus', 'feta cheese', 'olive oil', 'herbs']),
        allergens: JSON.stringify(['dairy']),
      },
      {
        name: 'Asian Fusion Stir-fry',
        category: 'dinner',
        description: 'Tofu dan sayuran segar dengan saus teriyaki rendah sodium',
        price: 48000,
        calories: 340,
        cookingTime: '10 menit',
        rating: 4.4,
        tags: JSON.stringify(['vegan', 'low-sodium', 'asian-fusion']),
        popular: false,
        protein: 18.6,
        carbs: 28.9,
        fats: 16.2,
        fiber: 7.3,
        ingredients: JSON.stringify(['firm tofu', 'bok choy', 'snap peas', 'carrots', 'ginger', 'low-sodium teriyaki']),
        allergens: JSON.stringify(['soy']),
      },

      // Snacks
      {
        name: 'Energy Protein Balls',
        category: 'snack',
        description: 'Protein balls dengan dates, almond, dan dark chocolate chips',
        price: 25000,
        calories: 180,
        cookingTime: '0 menit',
        rating: 4.6,
        tags: JSON.stringify(['no-bake', 'protein', 'energy-boost']),
        popular: true,
        protein: 8.4,
        carbs: 18.6,
        fats: 9.8,
        fiber: 4.2,
        ingredients: JSON.stringify(['medjool dates', 'almonds', 'protein powder', 'dark chocolate chips', 'coconut']),
        allergens: JSON.stringify(['nuts']),
      },

      // Beverages  
      {
        name: 'Green Detox Smoothie',
        category: 'beverage',
        description: 'Smoothie hijau dengan spinach, apple, banana, dan chia seeds',
        price: 32000,
        calories: 160,
        cookingTime: '3 menit',
        rating: 4.3,
        tags: JSON.stringify(['detox', 'vitamin-rich', 'refreshing']),
        popular: false,
        protein: 4.2,
        carbs: 32.8,
        fats: 3.6,
        fiber: 6.8,
        ingredients: JSON.stringify(['spinach', 'green apple', 'banana', 'chia seeds', 'coconut water', 'lime']),
        allergens: JSON.stringify([]),
      },
    ],
  });

  console.log(`✅ Created ${mealPlans.count} meal plans`);

  // Create sample testimonials
  console.log('💬 Creating testimonials...');
  
  const testimonials = await prisma.testimonial.createMany({
    data: [
      {
        name: 'Sarah Wijaya',
        message: 'SEA Catering bener-bener mengubah pola makan saya! Makanannya enak, sehat, dan delivery nya selalu tepat waktu. Udah 3 bulan langganan dan berat badan turun 8kg!',
        rating: 5,
        location: 'Jakarta Selatan',
        approved: true,
      },
      {
        name: 'Budi Pratama',
        message: 'Sebagai pekerja kantoran yang sibuk, SEA Catering jadi penyelamat banget. Gak perlu mikir masak atau beli makan yang gak sehat. Recommended!',
        rating: 5,
        location: 'Bandung',
        approved: true,
      },
      {
        name: 'Rina Sari',
        message: 'Porsinya pas, rasanya enak, dan yang paling penting nutrisinya lengkap. Anak saya yang picky eater juga suka sama menu-menunya.',
        rating: 4,
        location: 'Surabaya',
        approved: true,
      },
      {
        name: 'Ahmad Fauzi',
        message: 'Paket protein plannya perfect buat yang lagi workout. Proteinnya tinggi tapi tetap enak. Customer servicenya juga responsif banget.',
        rating: 5,
        location: 'Yogyakarta',
        approved: true,
      },
      {
        name: 'Lisa Andriani',
        message: 'Harga sebanding dengan kualitas. Packagingnya juga ramah lingkungan. Sukses terus SEA Catering!',
        rating: 4,
        location: 'Medan',
        approved: true,
      },
    ],
  });

  console.log(`✅ Created ${testimonials.count} testimonials`);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  }); 