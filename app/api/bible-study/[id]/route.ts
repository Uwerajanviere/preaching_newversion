import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebaseAdmin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studyDoc = await db.collection('bible-studies').doc(params.id).get();
    
    if (!studyDoc.exists) {
      return NextResponse.json(
        { error: 'Bible study not found' },
        { status: 404 }
      );
    }

    const studyData = {
      id: studyDoc.id,
      ...studyDoc.data()
    };

    return NextResponse.json(studyData);
  } catch (error) {
    console.error('Error fetching bible study:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bible study' },
      { status: 500 }
    );
  }
}
