import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Seed Plans (replacing hardcoded values)
  console.log('📋 Seeding Plans...');
  const plans = [
    {
      name: 'Diet Plan',
      slug: 'diet',
      description: 'Menu rendah kalori untuk program diet sehat',
      basePrice: 30000,
      features: JSON.stringify(['Low Calorie', 'High Fiber', 'Fresh Vegetables', '300-400 cal/meal']),
      color: 'from-green-400 to-green-600',
      sortOrder: 1
    },
    {
      name: 'Protein Plan',
      slug: 'protein',
      description: 'Menu tinggi protein untuk massa otot',
      basePrice: 40000,
      features: JSON.stringify(['High Protein', 'Lean Meat', 'Post-Workout', '25-30g protein/meal']),
      color: 'from-blue-400 to-blue-600',
      sortOrder: 2
    },
    {
      name: 'Royal Plan',
      slug: 'royal',
      description: 'Menu premium dengan bahan terbaik',
      basePrice: 60000,
      features: JSON.stringify(['Premium Ingredients', 'Gourmet Style', 'Balanced Nutrition', 'Chef Special']),
      color: 'from-purple-400 to-purple-600',
      sortOrder: 3
    }
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    });
  }

  // Seed MealTypes
  console.log('🍽️ Seeding MealTypes...');
  const mealTypes = [
    {
      name: 'Sarapan',
      slug: 'breakfast',
      icon: '🌅',
      timeRange: '07:00 - 09:00',
      sortOrder: 1
    },
    {
      name: 'Makan Siang',
      slug: 'lunch',
      icon: '☀️',
      timeRange: '12:00 - 14:00',
      sortOrder: 2
    },
    {
      name: 'Makan Malam',
      slug: 'dinner',
      icon: '🌙',
      timeRange: '18:00 - 20:00',
      sortOrder: 3
    }
  ];

  for (const mealType of mealTypes) {
    await prisma.mealType.upsert({
      where: { slug: mealType.slug },
      update: mealType,
      create: mealType,
    });
  }

  // Seed DeliveryDays
  console.log('📅 Seeding DeliveryDays...');
  const deliveryDays = [
    { name: 'Senin', slug: 'monday', dayOfWeek: 1 },
    { name: 'Selasa', slug: 'tuesday', dayOfWeek: 2 },
    { name: 'Rabu', slug: 'wednesday', dayOfWeek: 3 },
    { name: 'Kamis', slug: 'thursday', dayOfWeek: 4 },
    { name: 'Jumat', slug: 'friday', dayOfWeek: 5 },
    { name: 'Sabtu', slug: 'saturday', dayOfWeek: 6 },
    { name: 'Minggu', slug: 'sunday', dayOfWeek: 0 }
  ];

  for (const deliveryDay of deliveryDays) {
    await prisma.deliveryDay.upsert({
      where: { slug: deliveryDay.slug },
      update: deliveryDay,
      create: deliveryDay,
    });
  }

  // Seed Tags
  console.log('🏷️ Seeding Tags...');
  const tags = [
    { name: 'Halal', slug: 'halal', color: '#10B981' },
    { name: 'Vegan', slug: 'vegan', color: '#059669' },
    { name: 'Keto', slug: 'keto', color: '#7C3AED' },
    { name: 'Low Carb', slug: 'low-carb', color: '#DC2626' },
    { name: 'High Protein', slug: 'high-protein', color: '#2563EB' },
    { name: 'Gluten Free', slug: 'gluten-free', color: '#D97706' },
    { name: 'Diabetes Friendly', slug: 'diabetes-friendly', color: '#059669' },
    { name: 'Heart Healthy', slug: 'heart-healthy', color: '#DC2626' }
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: tag,
      create: tag,
    });
  }

  // Seed Allergens
  console.log('⚠️ Seeding Allergens...');
  const allergens = [
    { name: 'Kacang-kacangan', icon: '🥜' },
    { name: 'Seafood', icon: '🦐' },
    { name: 'Telur', icon: '🥚' },
    { name: 'Susu', icon: '🥛' },
    { name: 'Gluten', icon: '🌾' },
    { name: 'Kedelai', icon: '🫘' },
    { name: 'Wijen', icon: '🫘' },
    { name: 'Sulfit', icon: '⚠️' }
  ];

  for (const allergen of allergens) {
    await prisma.allergen.upsert({
      where: { name: allergen.name },
      update: allergen,
      create: allergen,
    });
  }

  // Seed Ingredients
  console.log('🥬 Seeding Ingredients...');
  const ingredients = [
    { name: 'Ayam', category: 'Protein' },
    { name: 'Sapi', category: 'Protein' },
    { name: 'Ikan Salmon', category: 'Protein' },
    { name: 'Tahu', category: 'Protein' },
    { name: 'Tempe', category: 'Protein' },
    { name: 'Brokoli', category: 'Sayuran' },
    { name: 'Bayam', category: 'Sayuran' },
    { name: 'Wortel', category: 'Sayuran' },
    { name: 'Beras Merah', category: 'Karbohidrat' },
    { name: 'Quinoa', category: 'Karbohidrat' },
    { name: 'Ubi Jalar', category: 'Karbohidrat' },
    { name: 'Alpukat', category: 'Lemak Sehat' },
    { name: 'Minyak Zaitun', category: 'Lemak Sehat' },
    { name: 'Kacang Almond', category: 'Lemak Sehat' }
  ];

  for (const ingredient of ingredients) {
    await prisma.ingredient.upsert({
      where: { name: ingredient.name },
      update: ingredient,
      create: ingredient,
    });
  }

  // Seed Admin User
  console.log('👨‍💼 Seeding Admin User...');
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  await prisma.user.upsert({
    where: { email: 'admin@seacatering.com' },
    update: {},
    create: {
      email: 'admin@seacatering.com',
      password: hashedPassword,
      name: 'Admin Sea Catering',
      role: 'ADMIN',
      phone: '081234567890'
    },
  });

  // Seed Sample MealPlans
  console.log('🍛 Seeding Sample MealPlans...');
  const sampleMealPlans = [
    {
      name: 'Nasi Ayam Teriyaki',
      category: 'diet',
      description: 'Ayam teriyaki dengan nasi merah dan sayuran segar',
      price: 35000,
      calories: 350,
      cookingTime: '25 menit',
      protein: 28.5,
      carbs: 45.2,
      fats: 8.1,
      fiber: 6.3,
      popular: true
    },
    {
      name: 'Salmon Panggang',
      category: 'protein',
      description: 'Salmon panggang dengan quinoa dan asparagus',
      price: 55000,
      calories: 420,
      cookingTime: '30 menit',
      protein: 35.7,
      carbs: 25.8,
      fats: 18.9,
      fiber: 4.2,
      popular: true
    }
  ];

  for (const mealPlan of sampleMealPlans) {
    await prisma.mealPlan.upsert({
      where: { name: mealPlan.name },
      update: mealPlan,
      create: mealPlan,
    });
  }

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 