import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, createdAt } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const docRef = await db.collection('daily-words').add({
      title,
      content,
      createdAt: createdAt || new Date().toISOString(),
    });

    return NextResponse.json(
      { id: docRef.id, message: 'Daily word uploaded successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading daily word:', error);
    return NextResponse.json(
      { error: 'Failed to upload daily word' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const querySnapshot = await db.collection('daily-words')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();
    
    if (querySnapshot.empty) {
      return NextResponse.json(null);
    }

    const latestDoc = querySnapshot.docs[0];
    const dailyWord = {
      id: latestDoc.id,
      ...latestDoc.data()
    };

    return NextResponse.json(dailyWord);
  } catch (error) {
    console.error('Error fetching daily word:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily word' },
      { status: 500 }
    );
  }
}
