#!/usr/bin/env node

// Simple script to test Next.js build process
// Run with: node test-build.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Testing Next.js Build Process...\n');

// Check if .next directory exists and remove it
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  console.log('🧹 Cleaning previous build...');
  try {
    // Use cross-platform command
    if (process.platform === 'win32') {
      execSync('rmdir /s /q .next', { stdio: 'inherit' });
    } else {
      execSync('rm -rf .next', { stdio: 'inherit' });
    }
    console.log('✅ Cleaned previous build');
  } catch (error) {
    console.log('⚠️  Could not clean .next directory (this is okay)');
  }
}

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  console.log('⚠️  Warning: .env.local file not found');
  console.log('📝 This might cause Firebase-related build issues');
  console.log('💡 Consider creating .env.local with your Firebase credentials\n');
}

console.log('🚀 Starting Next.js build...\n');

try {
  // Run the build command
  execSync('npm run build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  console.log('\n🎉 Build completed successfully!');
  console.log('✅ Your app should deploy to Vercel without issues');
  
} catch (error) {
  console.error('\n❌ Build failed!');
  console.error('🔍 Check the error messages above');
  console.error('💡 Common issues:');
  console.error('   - Missing environment variables');
  console.error('   - Firebase configuration errors');
  console.error('   - TypeScript compilation errors');
  
  process.exit(1);
}
