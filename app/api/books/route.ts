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

    const docRef = await db.collection('books').add({
      title,
      imageUrl,
      content,
      createdAt: createdAt || new Date().toISOString(),
    });

    return NextResponse.json(
      { id: docRef.id, message: 'Book uploaded successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading book:', error);
    return NextResponse.json(
      { error: 'Failed to upload book' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const querySnapshot = await db.collection('books')
      .orderBy('createdAt', 'desc')
      .get();
    
    const books = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
