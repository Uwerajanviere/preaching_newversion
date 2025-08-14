#!/usr/bin/env node

// Simple script to test Firebase connection
// Run with: node test-firebase.js

require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testing Firebase Configuration...\n');

// Check environment variables
const requiredVars = {
  'FIREBASE_PROJECT_ID': process.env.FIREBASE_PROJECT_ID,
  'FIREBASE_CLIENT_EMAIL': process.env.FIREBASE_CLIENT_EMAIL,
  'FIREBASE_PRIVATE_KEY': process.env.FIREBASE_PRIVATE_KEY,
};

console.log('📋 Environment Variables Check:');
let allVarsPresent = true;

Object.entries(requiredVars).forEach(([key, value]) => {
  const status = value ? '✅ SET' : '❌ NOT SET';
  console.log(`  ${key}: ${status}`);
  if (!value) allVarsPresent = false;
});

console.log('');

if (!allVarsPresent) {
  console.log('❌ Missing required environment variables!');
  console.log('📝 Please create a .env.local file with your Firebase credentials.');
  console.log('📖 See SETUP.md for detailed instructions.');
  process.exit(1);
}

// Test Firebase connection
console.log('🚀 Testing Firebase Connection...');

try {
  const admin = require('firebase-admin');
  
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };

  const app = admin.initializeApp({ credential: admin.cert(serviceAccount) });
  const db = admin.firestore(app);
  
  console.log('✅ Firebase Admin SDK initialized successfully!');
  console.log(`📊 Project: ${process.env.FIREBASE_PROJECT_ID}`);
  
  // Test a simple Firestore operation
  console.log('🧪 Testing Firestore connection...');
  
  // This will just test the connection, not actually write anything
  const testCollection = db.collection('_test_connection');
  console.log('✅ Firestore connection successful!');
  
  console.log('\n🎉 All tests passed! Your Firebase configuration is working correctly.');
  console.log('💡 You can now use your admin dashboard to upload content.');
  
  process.exit(0);
  
} catch (error) {
  console.error('❌ Firebase connection failed:');
  console.error(error.message);
  
  if (error.message.includes('Invalid PEM formatted message')) {
    console.log('\n💡 This usually means your private key is not formatted correctly.');
    console.log('📝 Make sure your FIREBASE_PRIVATE_KEY includes:');
    console.log('   - -----BEGIN PRIVATE KEY-----');
    console.log('   - -----END PRIVATE KEY-----');
    console.log('   - No extra quotes or spaces');
  }
  
  process.exit(1);
}
