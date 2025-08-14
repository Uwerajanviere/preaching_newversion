import { NextResponse } from 'next/server';

export async function GET() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  
  const hasAllVars = !!(projectId && clientEmail && privateKey);
  
  return NextResponse.json({
    // Basic info
    firebaseConfigured: hasAllVars,
    projectId: projectId || 'NOT SET',
    clientEmail: clientEmail ? 'SET' : 'NOT SET',
    privateKey: privateKey ? 'SET' : 'NOT SET',
    
    // Detailed private key analysis
    privateKeyLength: privateKey?.length || 0,
    hasBeginKey: privateKey?.includes('-----BEGIN PRIVATE KEY-----') || false,
    hasEndKey: privateKey?.includes('-----END PRIVATE KEY-----') || false,
    
    // Public config check
    publicConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'SET' : 'NOT SET',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'SET' : 'NOT SET',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'SET' : 'NOT SET',
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? 'SET' : 'NOT SET',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? 'SET' : 'NOT SET',
    },
    
    // Recommendations
    recommendations: hasAllVars ? [
      'All Firebase environment variables are set!',
      'Try restarting your development server if you still have issues.',
      'Check that your Firebase project has Firestore enabled.'
    ] : [
      'Create a .env.local file in your project root',
      'Add your Firebase service account credentials',
      'See env.example and SETUP.md for detailed instructions',
      'Make sure to restart your development server after creating .env.local'
    ]
  });
} 