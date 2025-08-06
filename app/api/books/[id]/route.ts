import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebaseAdmin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookDoc = await db.collection('books').doc(params.id).get();
    
    if (!bookDoc.exists) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    const bookData = {
      id: bookDoc.id,
      ...bookDoc.data()
    };

    return NextResponse.json(bookData);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json(
      { error: 'Failed to fetch book' },
      { status: 500 }
    );
  }
}
