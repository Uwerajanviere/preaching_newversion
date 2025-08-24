// This file is for backend/API (admin SDK) usage only. Do not import in frontend code.
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Prevent Firebase initialization during build time
if (typeof window !== 'undefined') {
  throw new Error('Firebase Admin SDK cannot be used in the browser');
}

// Check if we're in a build environment
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL;

// Helper function to properly format private key
function formatPrivateKey(privateKey: string | undefined): string | undefined {
  if (!privateKey) return undefined;
  
  console.log('Original private key length:', privateKey.length);
  console.log('Original private key starts with:', privateKey.substring(0, 50));
  
  // First, replace literal \n with actual newlines
  let formatted = privateKey.replace(/\\n/g, '\n');
  
  // Remove quotes if present
  formatted = formatted.replace(/"/g, '').replace(/'/g, '');
  
  // Trim whitespace
  formatted = formatted.trim();
  
  console.log('After \\n replacement length:', formatted.length);
  console.log('After \\n replacement starts with:', formatted.substring(0, 50));
  
  // If it already has proper headers, just clean up the formatting
  if (formatted.includes('-----BEGIN PRIVATE KEY-----')) {
    // Just ensure proper line breaks and remove any extra whitespace
    formatted = formatted.replace(/\n+/g, '\n');
    console.log('Private key already has headers, returning as is');
    return formatted;
  }
  
  // If it doesn't have headers, add them
  // Remove any existing headers if they're malformed
  formatted = formatted.replace(/-----BEGIN.*?-----/g, '');
  formatted = formatted.replace(/-----END.*?-----/g, '');
  
  // Add proper headers
  formatted = `-----BEGIN PRIVATE KEY-----\n${formatted}\n-----END PRIVATE KEY-----`;
  
  // Ensure proper line breaks
  formatted = formatted.replace(/\n+/g, '\n');
  
  console.log('Final formatted key length:', formatted.length);
  console.log('Final formatted key starts with:', formatted.substring(0, 50));
  
  return formatted;
}

// Check if all required environment variables are present
const requiredEnvVars = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
};

// Only log in development to avoid build-time issues
if (process.env.NODE_ENV === 'development') {
  console.log("FIREBASE PROJECT ID:", process.env.FIREBASE_PROJECT_ID);
  console.log("EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
  console.log("PRIVATE KEY length:", process.env.FIREBASE_PRIVATE_KEY?.length);
  console.log("PRIVATE KEY starts with:", process.env.FIREBASE_PRIVATE_KEY?.substring(0, 50));
  console.log("FORMATTED PRIVATE KEY starts with:", requiredEnvVars.privateKey?.substring(0, 50));
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

    console.log('Attempting to initialize Firebase Admin SDK...');
    console.log('Service account config:', {
      projectId: serviceAccount.projectId,
      clientEmail: serviceAccount.clientEmail,
      privateKeyLength: serviceAccount.privateKey?.length,
      privateKeyStartsWith: serviceAccount.privateKey?.substring(0, 50)
    });
    
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