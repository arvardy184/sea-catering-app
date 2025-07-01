import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper function to ensure database connection with retry logic
export async function ensureDbConnection(maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await prisma.$connect();
      // Simple health check using normal Prisma query instead of raw SQL
      await prisma.user.findFirst({ take: 1 });
      return true;
    } catch (error) {
      console.warn(`Database connection attempt ${i + 1}/${maxRetries} failed:`, error);
      
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  return false;
}

// Clean disconnect for serverless
export async function disconnectPrisma() {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.warn('Error disconnecting Prisma:', error);
  }
} 