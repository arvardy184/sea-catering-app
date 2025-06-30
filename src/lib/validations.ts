import { z } from 'zod';

// Common validation schemas
export const phoneSchema = z.string()
  .min(10, 'Nomor telepon minimal 10 karakter')
  .max(15, 'Nomor telepon maksimal 15 karakter')
  .regex(/^(\+62|62|0)[0-9]{9,13}$/, 'Format nomor telepon tidak valid');

export const nameSchema = z.string()
  .min(2, 'Nama minimal 2 karakter')
  .max(100, 'Nama maksimal 100 karakter')
  .regex(/^[a-zA-Z\s]+$/, 'Nama hanya boleh mengandung huruf dan spasi');

export const emailSchema = z.string()
  .email('Format email tidak valid')
  .max(255, 'Email maksimal 255 karakter');

export const passwordSchema = z.string()
  .min(8, 'Password minimal 8 karakter')
  .max(100, 'Password maksimal 100 karakter')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    'Password harus mengandung minimal 1 huruf kecil, 1 huruf besar, 1 angka, dan 1 karakter khusus');

// Subscription validation schemas
export const createSubscriptionSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  planId: z.string().cuid('Plan ID tidak valid'),
  mealTypeIds: z.array(z.string().cuid())
    .min(1, 'Pilih minimal 1 jenis makanan')
    .max(3, 'Maksimal 3 jenis makanan'),
  deliveryDayIds: z.array(z.string().cuid())
    .min(1, 'Pilih minimal 1 hari pengiriman')
    .max(7, 'Maksimal 7 hari pengiriman'),
  allergies: z.string().max(500, 'Alergi maksimal 500 karakter').optional().nullable(),
});

export const updateSubscriptionSchema = createSubscriptionSchema.partial().extend({
  id: z.string().cuid('Subscription ID tidak valid'),
  status: z.enum(['ACTIVE', 'PAUSED', 'CANCELLED']).optional(),
});

export const subscriptionStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'PAUSED', 'CANCELLED']),
  pauseStart: z.string().datetime().optional().nullable(),
  pauseEnd: z.string().datetime().optional().nullable(),
});

// Meal plan validation schemas
export const createMealPlanSchema = z.object({
  name: z.string().min(2, 'Nama meal minimal 2 karakter').max(100, 'Nama meal maksimal 100 karakter'),
  category: z.string().min(2, 'Kategori minimal 2 karakter').max(50, 'Kategori maksimal 50 karakter'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter').max(500, 'Deskripsi maksimal 500 karakter'),
  price: z.number().min(0, 'Harga tidak boleh negatif').max(1000000, 'Harga terlalu tinggi'),
  calories: z.number().int().min(0, 'Kalori tidak boleh negatif').max(2000, 'Kalori terlalu tinggi'),
  cookingTime: z.string().min(1, 'Waktu memasak wajib diisi').max(50, 'Waktu memasak maksimal 50 karakter'),
  rating: z.number().min(0, 'Rating minimal 0').max(5, 'Rating maksimal 5').default(4.5),
  popular: z.boolean().default(false),
  protein: z.number().min(0, 'Protein tidak boleh negatif').optional().nullable(),
  carbs: z.number().min(0, 'Karbohidrat tidak boleh negatif').optional().nullable(),
  fats: z.number().min(0, 'Lemak tidak boleh negatif').optional().nullable(),
  fiber: z.number().min(0, 'Serat tidak boleh negatif').optional().nullable(),
  tagIds: z.array(z.string().cuid()).optional(),
  ingredientIds: z.array(z.string().cuid()).optional(),
  allergenIds: z.array(z.string().cuid()).optional(),
});

export const updateMealPlanSchema = createMealPlanSchema.partial().extend({
  id: z.string().cuid('Meal plan ID tidak valid'),
});

// Testimonial validation schemas
export const createTestimonialSchema = z.object({
  name: nameSchema,
  message: z.string()
    .min(10, 'Pesan minimal 10 karakter')
    .max(1000, 'Pesan maksimal 1000 karakter'),
  rating: z.number().int()
    .min(1, 'Rating minimal 1')
    .max(5, 'Rating maksimal 5'),
  location: z.string()
    .min(2, 'Lokasi minimal 2 karakter')
    .max(100, 'Lokasi maksimal 100 karakter')
    .optional().nullable(),
});

export const updateTestimonialSchema = createTestimonialSchema.partial().extend({
  id: z.string().cuid('Testimonial ID tidak valid'),
  approved: z.boolean().optional(),
});

// User validation schemas
export const createUserSchema = z.object({
  name: nameSchema.optional().nullable(),
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema.optional().nullable(),
  address: z.string().max(500, 'Alamat maksimal 500 karakter').optional().nullable(),
});

export const updateUserSchema = createUserSchema.partial().extend({
  id: z.string().cuid('User ID tidak valid'),
  role: z.enum(['USER', 'ADMIN']).optional(),
});

export const signinSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password wajib diisi'),
});

// Contact validation schema
export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional().nullable(),
  subject: z.string()
    .min(5, 'Subjek minimal 5 karakter')
    .max(200, 'Subjek maksimal 200 karakter'),
  message: z.string()
    .min(20, 'Pesan minimal 20 karakter')
    .max(2000, 'Pesan maksimal 2000 karakter'),
});

// Plan validation schemas (for admin)
export const createPlanSchema = z.object({
  name: z.string().min(2, 'Nama plan minimal 2 karakter').max(100, 'Nama plan maksimal 100 karakter'),
  slug: z.string().min(2, 'Slug minimal 2 karakter').max(100, 'Slug maksimal 100 karakter'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter').max(500, 'Deskripsi maksimal 500 karakter'),
  basePrice: z.number().min(0, 'Harga tidak boleh negatif').max(1000000, 'Harga terlalu tinggi'),
  features: z.array(z.string()).min(1, 'Minimal 1 fitur'),
  color: z.string().min(1, 'Warna wajib diisi'),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const updatePlanSchema = createPlanSchema.partial().extend({
  id: z.string().cuid('Plan ID tidak valid'),
});

// MealType validation schemas (for admin)
export const createMealTypeSchema = z.object({
  name: z.string().min(2, 'Nama meal type minimal 2 karakter').max(100, 'Nama meal type maksimal 100 karakter'),
  slug: z.string().min(2, 'Slug minimal 2 karakter').max(100, 'Slug maksimal 100 karakter'),
  icon: z.string().min(1, 'Icon wajib diisi'),
  timeRange: z.string().min(1, 'Rentang waktu wajib diisi'),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const updateMealTypeSchema = createMealTypeSchema.partial().extend({
  id: z.string().cuid('MealType ID tidak valid'),
});

// DeliveryDay validation schemas (for admin)
export const createDeliveryDaySchema = z.object({
  name: z.string().min(2, 'Nama hari minimal 2 karakter').max(50, 'Nama hari maksimal 50 karakter'),
  slug: z.string().min(2, 'Slug minimal 2 karakter').max(50, 'Slug maksimal 50 karakter'),
  dayOfWeek: z.number().int().min(0, 'Hari dalam seminggu minimal 0').max(6, 'Hari dalam seminggu maksimal 6'),
  isActive: z.boolean().default(true),
});

export const updateDeliveryDaySchema = createDeliveryDaySchema.partial().extend({
  id: z.string().cuid('DeliveryDay ID tidak valid'),
});

// Generic pagination and filter schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1, 'Page minimal 1').default(1),
  limit: z.coerce.number().int().min(1, 'Limit minimal 1').max(100, 'Limit maksimal 100').default(10),
  search: z.string().max(100, 'Search maksimal 100 karakter').optional(),
  sortBy: z.string().max(50, 'SortBy maksimal 50 karakter').optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const filterSchema = z.object({
  category: z.string().max(50, 'Kategori maksimal 50 karakter').optional(),
  minPrice: z.coerce.number().min(0, 'Harga minimal tidak boleh negatif').optional(),
  maxPrice: z.coerce.number().min(0, 'Harga maksimal tidak boleh negatif').optional(),
  tags: z.array(z.string()).optional(),
  popular: z.coerce.boolean().optional(),
});

// CSRF validation
export const csrfSchema = z.object({
  csrfToken: z.string().min(1, 'CSRF token wajib ada'),
});

// Type exports for use in components
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>;
export type CreateMealPlanInput = z.infer<typeof createMealPlanSchema>;
export type UpdateMealPlanInput = z.infer<typeof updateMealPlanSchema>;
export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type FilterInput = z.infer<typeof filterSchema>; 