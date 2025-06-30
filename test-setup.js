// 🧪 SEA Catering Test Setup Script
// This script helps prepare test data and verify system readiness

const testData = {
  // Test user credentials
  testUser: {
    name: "Test User",
    email: "testuser@example.com", 
    password: "TestPass123!",
    phone: "08123456789"
  },
  
  // Admin credentials
  adminUser: {
    email: "admin@seacatering.com",
    password: "admin123!"
  },
  
  // Test subscription data
  testSubscription: {
    name: "John Doe",
    phone: "08123456789",
    plan: "protein", // diet, protein, royal
    mealTypes: ["breakfast", "dinner"],
    deliveryDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    allergies: "Peanuts, Shellfish",
    expectedPrice: 1720000 // 40000 * 2 * 5 * 4.3
  },
  
  // Test testimonial data  
  testTestimonial: {
    name: "Happy Customer",
    message: "Amazing food quality and service!",
    rating: 5,
    location: "Jakarta"
  },
  
  // XSS test data
  maliciousInputs: {
    xss: "<script>alert('XSS Attack!')</script>",
    sqlInjection: "'; DROP TABLE users; --",
    htmlInjection: "<img src=x onerror=alert('XSS')>"
  }
};

// Test API endpoints
// const apiEndpoints = {
//   testDB: "/api/test-db",
//   subscriptions: "/api/subscriptions", 
//   testimonials: "/api/testimonials",
//   mealPlans: "/api/meal-plans",
//   register: "/api/auth/register",
//   adminSetup: "/api/admin/setup"
// };

// Helper functions for testing
const testHelpers = {
  // Wait for element to appear
  waitForElement: (selector, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }
      
      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  },

  // Fill form fields
  fillForm: (formData) => {
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.querySelector(`[name="${key}"], #${key}`);
      if (input) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = value;
        } else {
          input.value = value;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
  },

  // Test API endpoint
  testAPI: async (endpoint, method = 'GET', data = null) => {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      };
      
      if (data) {
        options.body = JSON.stringify(data);
      }
      
      const response = await fetch(endpoint, options);
      const result = await response.json();
      
      return {
        success: response.ok,
        status: response.status,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Simulate user interactions
  clickElement: (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.click();
      return true;
    }
    return false;
  },

  // Check if element exists and is visible
  isElementVisible: (selector) => {
    const element = document.querySelector(selector);
    if (!element) return false;
    
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  },

  // Generate test report
  generateReport: (testResults) => {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: testResults.length,
        passed: testResults.filter(t => t.passed).length,
        failed: testResults.filter(t => !t.passed).length
      },
      details: testResults
    };
    
    console.log('📊 TEST REPORT', report);
    return report;
  }
};

// Automated test runners
const automatedTests = {
  // Test Level 1: Homepage content
  testLevel1: async () => {
    console.log('🧪 Testing Level 1: Homepage Content');
    
    const tests = [];
    
    // Check page title
    tests.push({
      name: 'Page Title',
      passed: document.title.includes('SEA Catering'),
      message: document.title
    });
    
    // Check slogan
    tests.push({
      name: 'Slogan Display',
      passed: document.body.textContent.includes('Healthy Meals, Anytime, Anywhere'),
      message: 'Slogan visibility check'
    });
    
    // Check contact info
    tests.push({
      name: 'Contact Info',
      passed: document.body.textContent.includes('Brian') && document.body.textContent.includes('08123456789'),
      message: 'Manager and phone number check'
    });
    
    return tests;
  },

  // Test Level 2: Interactive features
  testLevel2: async () => {
    console.log('🧪 Testing Level 2: Interactive Features');
    
    const tests = [];
    
    // Test navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    tests.push({
      name: 'Navigation Links',
      passed: navLinks.length >= 4,
      message: `Found ${navLinks.length} navigation links`
    });
    
    // Test meal cards
    const mealCards = document.querySelectorAll('[data-testid="meal-card"], .meal-card');
    tests.push({
      name: 'Meal Cards Display',
      passed: mealCards.length > 0,
      message: `Found ${mealCards.length} meal cards`
    });
    
    // Test testimonial form
    const testimonialForm = document.querySelector('form[data-testid="testimonial-form"], #testimonial-form');
    tests.push({
      name: 'Testimonial Form',
      passed: !!testimonialForm,
      message: 'Testimonial form presence check'
    });
    
    return tests;
  },

  // Test Level 3: Subscription system
  testLevel3: async () => {
    console.log('🧪 Testing Level 3: Subscription System');
    
    const tests = [];
    
    // Test subscription form
    const subscriptionForm = document.querySelector('#subscription form, [data-testid="subscription-form"]');
    tests.push({
      name: 'Subscription Form',
      passed: !!subscriptionForm,
      message: 'Subscription form presence check'
    });
    
    // Test API endpoints
    // const dbTest = await testHelpers.testAPI('/api/test-db');
    // tests.push({
    //   name: 'Database Connection',
    //   passed: dbTest.success,
    //   message: dbTest.error || 'Database connectivity check'
    // });
    
    const subscriptionAPI = await testHelpers.testAPI('/api/subscriptions');
    tests.push({
      name: 'Subscription API',
      passed: subscriptionAPI.success,
      message: 'Subscription API endpoint check'
    });
    
    return tests;
  },

  // Run all automated tests
  runAll: async () => {
    console.log('🚀 Starting Automated Test Suite');
    
    const allResults = [];
    
    try {
      const level1Results = await automatedTests.testLevel1();
      const level2Results = await automatedTests.testLevel2();
      const level3Results = await automatedTests.testLevel3();
      
      allResults.push(...level1Results, ...level2Results, ...level3Results);
      
      return testHelpers.generateReport(allResults);
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      return { error: error.message };
    }
  }
};

// Manual test guidance
const manualTestGuide = {
  level1: () => {
    console.log(`
🎯 LEVEL 1 MANUAL TESTS:
1. Check homepage loads at http://localhost:3002
2. Verify "SEA Catering" brand appears in header
3. Verify slogan "Healthy Meals, Anytime, Anywhere" is visible
4. Check business introduction section
5. Verify contact info: Manager Brian, Phone: 08123456789
    `);
  },
  
  level2: () => {
    console.log(`
🎯 LEVEL 2 MANUAL TESTS:
1. Navigation:
   - Click each nav link (Home, Menu, Subscription, Contact)
   - Test mobile responsive nav (resize to 375px)
   - Verify smooth scrolling and active highlighting

2. Meal Plans:
   - Navigate to Menu section
   - Click category filters (Diet, Protein, Royal)
   - Click "See More Details" on meal cards
   - Test modal close functionality

3. Testimonials:
   - Fill testimonial form (name, rating, message)
   - Submit form and verify success
   - Test testimonial carousel navigation
    `);
  },
  
  level3: () => {
    console.log(`
🎯 LEVEL 3 MANUAL TESTS:
1. Subscription Form:
   - Test 3-step wizard validation
   - Step 1: Name + Phone validation
   - Step 2: Plan selection (Diet/Protein/Royal)
   - Step 3: Meal types + Delivery days + Price calc
   - Verify price formula: Plan × MealTypes × Days × 4.3

2. Database:
   - Submit complete subscription form
   - Check if data appears in admin dashboard
   - Test API endpoints directly
    `);
  },
  
  level4: () => {
    console.log(`
🎯 LEVEL 4 MANUAL TESTS:
1. Authentication:
   - Register new user at /auth/signup
   - Test password validation (6+ chars, numbers, letters)
   - Login at /auth/signin
   - Test Google OAuth flow

2. Security:
   - Try XSS: <script>alert("XSS")</script>
   - Try SQL injection: '; DROP TABLE users; --
   - Test role-based access (user vs admin)
    `);
  },
  
  level5: () => {
    console.log(`
🎯 LEVEL 5 MANUAL TESTS:
1. User Dashboard:
   - Login as regular user
   - View subscriptions at /dashboard/user
   - Test pause/cancel/reactivate functionality

2. Admin Dashboard:
   - Login as admin (admin@seacatering.com / admin123!)
   - View metrics at /dashboard/admin
   - Test date range filtering
   - Test export CSV functionality
    `);
  },
  
  all: () => {
    manualTestGuide.level1();
    manualTestGuide.level2();
    manualTestGuide.level3();
    manualTestGuide.level4();
    manualTestGuide.level5();
  }
};

// Export for browser console usage
if (typeof window !== 'undefined') {
  window.testData = testData;
  window.testHelpers = testHelpers;
  window.automatedTests = automatedTests;
  window.manualTestGuide = manualTestGuide;
  
  console.log(`
🧪 SEA Catering Test Suite Loaded!

Quick Commands:
- automatedTests.runAll() - Run all automated tests
- manualTestGuide.all() - Show manual test guide
- testHelpers.testAPI('/api/test-db') - Test database connection

Test Data Available:
- testData.testUser - Test user credentials
- testData.adminUser - Admin credentials  
- testData.testSubscription - Sample subscription data
- testData.maliciousInputs - Security test inputs

Happy Testing! 🚀
  `);
}

// Node.js export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testData,
    testHelpers,
    automatedTests,
    manualTestGuide
  };
} 