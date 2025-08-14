// This file is for backend/API (admin SDK) usage only. Do not import in frontend code.
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Check if all required environment variables are present
const requiredEnvVars = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

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

// Only initialize Firebase if all credentials are present
let app;
let db;

try {
  if (missingVars.length === 0) {
    const serviceAccount = {
      projectId: requiredEnvVars.projectId,
      clientEmail: requiredEnvVars.clientEmail,
      privateKey: requiredEnvVars.privateKey?.replace(/\\n/g, '\n'),
    };

    app = !getApps().length ? initializeApp({ credential: cert(serviceAccount) }) : getApps()[0];
    db = getFirestore(app);
    console.log('Firebase Admin SDK initialized successfully');
  } else {
    console.warn('Firebase Admin SDK not initialized due to missing credentials');
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