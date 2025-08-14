// This file is for backend/API (admin SDK) usage only. Do not import in frontend code.
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Prevent Firebase initialization during build time
if (typeof window !== 'undefined') {
  throw new Error('Firebase Admin SDK cannot be used in the browser');
}

// Check if we're in a build environment
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL;

// Check if all required environment variables are present
const requiredEnvVars = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // ✅ fixed for Vercel
};

// Only log in development to avoid build-time issues
if (process.env.NODE_ENV === 'development') {
  console.log("FIREBASE PROJECT ID:", process.env.FIREBASE_PROJECT_ID);
  console.log("EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
  console.log("PRIVATE KEY length:", process.env.FIREBASE_PRIVATE_KEY?.length);
}

// Validate environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('Missing Firebase environment variables:', missingVars.join(', '));
  console.error('Please create a .env.local file with the following variables:');
  console.error('FIREBASE_PROJECT_ID=your-project-id');
  console.error('FIREBASE_CLIENT_EMAIL=your-service-account-email');
  console.error('FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"');
}

// Only initialize Firebase if all credentials are present and not during build time
let app;
let db;

try {
  if (missingVars.length === 0 && !isBuildTime) {
    const serviceAccount = {
      projectId: requiredEnvVars.projectId,
      clientEmail: requiredEnvVars.clientEmail,
      privateKey: requiredEnvVars.privateKey,
    };

    app = !getApps().length ? initializeApp({ credential: cert(serviceAccount) }) : getApps()[0];
    db = getFirestore(app);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Firebase Admin SDK initialized successfully');
    }
  } else {
    if (isBuildTime) {
      console.log('Firebase Admin SDK not initialized during build time');
    } else {
      console.warn('Firebase Admin SDK not initialized due to missing credentials');
    }
    
    // Create a mock db object that will throw errors when used
    db = {
      collection: () => {
        throw new Error('Firebase not configured. Please set up your environment variables.');
      },
      doc: () => {
        throw new Error('Firebase not configured. Please set up your environment variables.');
      },
    } as any;
  }
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error);
  // Create a mock db object that will throw errors when used
  db = {
    collection: () => {
      throw new Error('Firebase initialization failed. Please check your credentials.');
    },
    doc: () => {
      throw new Error('Firebase initialization failed. Please check your credentials.');
    },
  } as any;
}

export { db };