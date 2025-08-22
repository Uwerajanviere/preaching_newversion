import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'API is working',
    firebaseConfigured: !!(process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY),
    projectId: process.env.FIREBASE_PROJECT_ID || 'Not set'
  });
}

export async function POST(request: Request) {
  try {
    console.log('API route called');
    
    // Check if Firebase environment variables are set
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.error('Missing Firebase environment variables');
      return NextResponse.json({ 
        message: 'Firebase configuration missing',
        error: 'Environment variables not set',
        solution: 'Please create a .env.local file with your Firebase service account credentials. See env.example for reference.'
      }, { status: 500 });
    }
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { url, category, title, addedBy } = body;

    // Basic validation
    if (!url || !category) {
      console.error('Missing required fields:', { url, category });
      return NextResponse.json({ 
        message: 'Missing required fields (url, category)',
        error: 'Validation failed'
      }, { status: 400 });
    }

    console.log('Adding document to Firestore with data:', { url, category, title, addedBy });

    // Import Firebase admin after validation
    const { db } = await import('@/firebase/firebaseAdmin') as { db: any };

    // Add document to Firestore using Admin SDK
    const docRef = await db.collection('youtubeLinks').add({
      url,
      category,
      title: title || '', // Optional field
      addedBy: addedBy || 'anonymous', // Optional field
      createdAt: new Date(),
    });

    console.log('Document added successfully with ID:', docRef.id);

    return NextResponse.json({ message: 'Sermon added successfully', id: docRef.id }, { status: 200 });

  } catch (error) {
    console.error('Error adding sermon:', error);
    
    // Check if it's a Firebase configuration error
    if (error instanceof Error && error.message.includes('Firebase not configured')) {
      return NextResponse.json({ 
        message: 'Firebase not configured',
        error: 'Please set up your Firebase service account credentials',
        solution: 'Create a .env.local file with FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY'
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Error adding sermon', 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 