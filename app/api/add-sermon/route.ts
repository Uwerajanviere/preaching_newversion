import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

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
        error: 'Environment variables not set'
      }, { status: 500 });
    }
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { url, category, title, addedBy } = body;

    // Basic validation
    if (!url || !category) {
      console.error('Missing required fields:', { url, category });
      return NextResponse.json({ message: 'Missing required fields (url, category)' }, { status: 400 });
    }

    console.log('Adding document to Firestore with data:', { url, category, title, addedBy });

    // Add document to Firestore
    const docRef = await adminDb.collection('youtubeLinks').add({
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
    return NextResponse.json({ 
      message: 'Error adding sermon', 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 