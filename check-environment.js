#!/usr/bin/env node

// 🔍 SEA Catering Environment Checker
// Verifies all dependencies and configurations are ready for testing

const fs = require('fs');
const path = require('path');

const COLORS = {
  GREEN: '\x1b[32m',
  RED: '\x1b[31m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m'
};

const log = {
  success: (msg) => console.log(`${COLORS.GREEN}✅ ${msg}${COLORS.RESET}`),
  error: (msg) => console.log(`${COLORS.RED}❌ ${msg}${COLORS.RESET}`),
  warning: (msg) => console.log(`${COLORS.YELLOW}⚠️  ${msg}${COLORS.RESET}`),
  info: (msg) => console.log(`${COLORS.BLUE}ℹ️  ${msg}${COLORS.RESET}`),
  header: (msg) => console.log(`\n${COLORS.BOLD}${COLORS.BLUE}🔍 ${msg}${COLORS.RESET}\n`)
};

// Environment checks
const checks = {
  // Check if package.json exists and has required dependencies
  checkPackageJson: () => {
    log.header('Checking Package Dependencies');
    
    try {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      const requiredDeps = [
        'next',
        'react', 
        'react-dom',
        '@prisma/client',
        'prisma',
        'next-auth',
        'bcryptjs',
        'zod',
        'tailwindcss',
        'framer-motion'
      ];
      
      const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      requiredDeps.forEach(dep => {
        if (allDeps[dep]) {
          log.success(`${dep} - v${allDeps[dep]}`);
        } else {
          log.error(`${dep} - Missing!`);
        }
      });
      
      return true;
    } catch (error) {
      log.error(`Failed to read package.json: ${error.message}`);
      return false;
    }
  },

  // Check Prisma schema
  checkPrismaSchema: () => {
    log.header('Checking Prisma Configuration');
    
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    
    if (fs.existsSync(schemaPath)) {
      log.success('Prisma schema found');
      
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      const requiredModels = ['User', 'Subscription', 'MealPlan', 'Testimonial'];
      requiredModels.forEach(model => {
        if (schema.includes(`model ${model}`)) {
          log.success(`Model ${model} defined`);
        } else {
          log.error(`Model ${model} missing`);
        }
      });
      
      return true;
    } else {
      log.error('Prisma schema not found');
      return false;
    }
  },

  // Check environment variables
  checkEnvironment: () => {
    log.header('Checking Environment Variables');
    
    const envPaths = ['.env.local', '.env'];
    let envFound = false;
    
    for (const envPath of envPaths) {
      if (fs.existsSync(envPath)) {
        log.success(`Environment file found: ${envPath}`);
        envFound = true;
        
        const envContent = fs.readFileSync(envPath, 'utf8');
        
        const requiredVars = [
          'DATABASE_URL',
          'NEXTAUTH_SECRET',
          'NEXTAUTH_URL'
        ];
        
        const optionalVars = [
          'GOOGLE_CLIENT_ID',
          'GOOGLE_CLIENT_SECRET'
        ];
        
        requiredVars.forEach(varName => {
          if (envContent.includes(varName)) {
            log.success(`${varName} configured`);
          } else {
            log.error(`${varName} missing - Required!`);
          }
        });
        
        optionalVars.forEach(varName => {
          if (envContent.includes(varName)) {
            log.success(`${varName} configured`);
          } else {
            log.warning(`${varName} missing - Optional for Google OAuth`);
          }
        });
        
        break;
      }
    }
    
    if (!envFound) {
      log.error('No environment file (.env.local or .env) found');
      log.info('Create .env.local with required environment variables');
    }
    
    return envFound;
  },

  // Check required files exist
  checkRequiredFiles: () => {
    log.header('Checking Required Files');
    
    const requiredFiles = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/app/auth/signin/page.tsx',
      'src/app/auth/signup/page.tsx',
      'src/app/dashboard/user/page.tsx',
      'src/app/dashboard/admin/page.tsx',
      'src/components/sections/Hero.tsx',
      'src/components/sections/Menu.tsx',
      'src/components/sections/Subscription.tsx',
      'src/components/sections/Testimonials.tsx',
      'src/lib/auth.ts',
      'src/lib/prisma.ts'
    ];
    
    let allFound = true;
    
    requiredFiles.forEach(file => {
      if (fs.existsSync(file)) {
        log.success(file);
      } else {
        log.error(`${file} - Missing!`);
        allFound = false;
      }
    });
    
    return allFound;
  },

  // Check API routes
  checkAPIRoutes: () => {
    log.header('Checking API Routes');
    
    const apiRoutes = [
      'src/app/api/auth/[...nextauth]/route.ts',
      'src/app/api/auth/register/route.ts',
      'src/app/api/subscriptions/route.ts',
      'src/app/api/subscriptions/[id]/route.ts',
      'src/app/api/testimonials/route.ts',
      'src/app/api/meal-plans/route.ts',
      'src/app/api/test-db/route.ts'
    ];
    
    let allFound = true;
    
    apiRoutes.forEach(route => {
      if (fs.existsSync(route)) {
        log.success(route);
      } else {
        log.error(`${route} - Missing!`);
        allFound = false;
      }
    });
    
    return allFound;
  },

  // Check if port 3002 is available
  checkPort: () => {
    log.header('Checking Port Availability');
    
    const net = require('net');
    
    return new Promise((resolve) => {
      const server = net.createServer();
      
      server.listen(3002, () => {
        server.close(() => {
          log.success('Port 3002 is available');
          resolve(true);
        });
      });
      
      server.on('error', () => {
        log.warning('Port 3002 is already in use');
        log.info('If app is running, this is expected');
        resolve(true);
      });
    });
  }
};

// Generate .env.local template
const generateEnvTemplate = () => {
  const template = `# 🔧 SEA Catering Environment Variables
# Copy this to .env.local and fill in your values

# Database Configuration (Required)
DATABASE_URL="postgresql://username:password@localhost:5432/sea_catering"
# For Supabase: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# NextAuth Configuration (Required) 
NEXTAUTH_SECRET="your-super-secret-jwt-secret-here-make-it-long-and-random"
NEXTAUTH_URL="http://localhost:3002"

# Google OAuth (Optional - for Google sign-in)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Production URLs (For deployment)
# NEXTAUTH_URL="https://your-app-domain.com"
`;

  fs.writeFileSync('.env.template', template);
  log.success('Generated .env.template file');
  log.info('Copy .env.template to .env.local and fill in your values');
};

// Main execution
const runChecks = async () => {
  console.log(`
${COLORS.BOLD}${COLORS.BLUE}🧪 SEA Catering Environment Checker${COLORS.RESET}
${COLORS.BLUE}Verifying all dependencies and configurations...${COLORS.RESET}
  `);

  const results = [];
  
  // Run all checks
  results.push({ name: 'Package Dependencies', passed: checks.checkPackageJson() });
  results.push({ name: 'Prisma Schema', passed: checks.checkPrismaSchema() });
  results.push({ name: 'Environment Variables', passed: checks.checkEnvironment() });
  results.push({ name: 'Required Files', passed: checks.checkRequiredFiles() });
  results.push({ name: 'API Routes', passed: checks.checkAPIRoutes() });
  results.push({ name: 'Port Availability', passed: await checks.checkPort() });
  
  // Summary
  log.header('Environment Check Summary');
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  results.forEach(result => {
    if (result.passed) {
      log.success(result.name);
    } else {
      log.error(result.name);
    }
  });
  
  console.log(`\n${COLORS.BOLD}📊 Results: ${passed}/${total} checks passed${COLORS.RESET}`);
  
  if (passed === total) {
    log.success('Environment is ready for testing! 🚀');
  } else {
    log.warning('Some issues found. Please fix them before testing.');
    
    // Generate env template if env vars are missing
    if (!results.find(r => r.name === 'Environment Variables').passed) {
      generateEnvTemplate();
    }
  }
  
  // Next steps
  console.log(`
${COLORS.BOLD}🚀 Next Steps:${COLORS.RESET}
1. Fix any issues shown above
2. Start the development server: ${COLORS.BLUE}npm run dev${COLORS.RESET}
3. Open browser to: ${COLORS.BLUE}http://localhost:3002${COLORS.RESET}
4. Run test cases from: ${COLORS.BLUE}END_TO_END_TEST_CASES.md${COLORS.RESET}
5. Load test script in browser console: ${COLORS.BLUE}test-setup.js${COLORS.RESET}
  `);
};

// Run if called directly
if (require.main === module) {
  runChecks().catch(console.error);
}

module.exports = { checks, runChecks }; 