#!/usr/bin/env node

// 🚀 SEA Catering Quick Start Script
// Automates setup process for testing

const fs = require('fs');
const { execSync } = require('child_process');

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
  header: (msg) => console.log(`\n${COLORS.BOLD}${COLORS.BLUE}🚀 ${msg}${COLORS.RESET}\n`)
};

// Generate .env.local template if it doesn't exist
const generateEnvLocal = () => {
  if (fs.existsSync('.env.local')) {
    log.warning('.env.local already exists, skipping...');
    return false;
  }

  const envTemplate = `# 🔧 SEA Catering Environment Variables
# Development configuration

# Database Configuration (Required)
# Replace with your actual database URL
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres"

# NextAuth Configuration (Required) 
NEXTAUTH_SECRET="sea-catering-super-secret-key-for-jwt-tokens-make-this-long-and-random-2024"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional - for Google sign-in)
# Get these from Google Cloud Console
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
`;

  fs.writeFileSync('.env.local', envTemplate);
  log.success('Created .env.local template');
  return true;
};

// Run command with error handling
const runCommand = (command, description) => {
  try {
    log.info(`Running: ${description}`);
    execSync(command, { stdio: 'inherit' });
    log.success(`${description} completed`);
    return true;
  } catch (error) {
    log.error(`${description} failed: ${error.message}`);
    return false;
  }
};

// Check if dependencies are installed
const checkDependencies = () => {
  try {
    if (!fs.existsSync('node_modules')) {
      log.warning('node_modules not found, installing dependencies...');
      return runCommand('npm install', 'Installing dependencies');
    } else {
      log.success('Dependencies already installed');
      return true;
    }
  } catch (error) {
    log.error(`Failed to check dependencies: ${error.message}`);
    return false;
  }
};

// Initialize Prisma
const initializePrisma = () => {
  log.header('Initializing Prisma');
  
  const commands = [
    { cmd: 'npx prisma generate', desc: 'Generating Prisma client' },
    // Skip db push for now since we don't have a real DB URL
    // { cmd: 'npx prisma db push', desc: 'Pushing schema to database' }
  ];
  
  for (const { cmd, desc } of commands) {
    if (!runCommand(cmd, desc)) {
      return false;
    }
  }
  
  return true;
};

// Show manual setup instructions
const showSetupInstructions = () => {
  console.log(`
${COLORS.BOLD}${COLORS.BLUE}📋 Manual Setup Required:${COLORS.RESET}

${COLORS.YELLOW}1. Database Setup:${COLORS.RESET}
   • Go to https://supabase.com and create a free account
   • Create a new project
   • Go to Project Settings → Database
   • Copy the connection string
   • Edit .env.local and replace DATABASE_URL with your connection string

${COLORS.YELLOW}2. Database Initialization:${COLORS.RESET}
   • npm run db:push (push schema to database)
   • npm run db:seed (seed sample data - optional)

${COLORS.YELLOW}3. Start Testing:${COLORS.RESET}
   • npm run dev (start development server)
   • Open http://localhost:3000 in browser
   • Follow END_TO_END_TEST_CASES.md for testing

${COLORS.BOLD}${COLORS.GREEN}🧪 Quick Test Commands:${COLORS.RESET}
   • node check-environment.js (verify setup)
   • Load test-setup.js in browser console for automated tests
  `);
};

// Main setup flow
const quickStart = async () => {
  console.log(`
${COLORS.BOLD}${COLORS.BLUE}🚀 SEA Catering Quick Start${COLORS.RESET}
${COLORS.BLUE}Setting up environment for end-to-end testing...${COLORS.RESET}
  `);

  let success = true;

  // 1. Check/install dependencies
  if (!checkDependencies()) {
    success = false;
  }

  // 2. Generate .env.local template
  const envGenerated = generateEnvLocal();
  
  // 3. Initialize Prisma
  if (!initializePrisma()) {
    success = false;
  }

  // 4. Run environment checker
  log.header('Running Environment Check');
  try {
    const { runChecks } = require('./check-environment.js');
    await runChecks();
  } catch (error) {
    log.warning('Could not run environment checker');
  }

  // 5. Show next steps
  if (success) {
    if (envGenerated) {
      log.header('Setup Complete! 🎉');
      log.warning('IMPORTANT: Edit .env.local with your actual database URL before testing');
      showSetupInstructions();
    } else {
      log.header('Setup Verified! ✅');
      log.success('Environment appears to be ready for testing');
      console.log(`
${COLORS.BOLD}${COLORS.GREEN}🧪 Ready to Test:${COLORS.RESET}
   • npm run dev (start development server)
   • Open http://localhost:3000 in browser
   • Follow END_TO_END_TEST_CASES.md for comprehensive testing
      `);
    }
  } else {
    log.header('Setup Issues Found ⚠️');
    log.error('Please fix the issues above before proceeding with testing');
  }
};

// Export for use in other scripts
module.exports = {
  generateEnvLocal,
  checkDependencies,
  initializePrisma,
  quickStart
};

// Run if called directly
if (require.main === module) {
  quickStart().catch(console.error);
} 