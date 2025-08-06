import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, imageUrl, content, createdAt } = body;

    if (!title || !imageUrl || !content) {
      return NextResponse.json(
        { error: 'Title, image URL, and content are required' },
        { status: 400 }
      );
    }

    const docRef = await db.collection('bible-studies').add({
      title,
      imageUrl,
      content,
      createdAt: createdAt || new Date().toISOString(),
    });

    return NextResponse.json(
      { id: docRef.id, message: 'Bible study uploaded successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading bible study:', error);
    return NextResponse.json(
      { error: 'Failed to upload bible study' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const querySnapshot = await db.collection('bible-studies')
      .orderBy('createdAt', 'desc')
      .get();
    
    const bibleStudies = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(bibleStudies);
  } catch (error) {
    console.error('Error fetching bible studies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bible studies' },
      { status: 500 }
    );
  }
}
