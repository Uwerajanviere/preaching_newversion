import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    projectId: process.env.FIREBASE_PROJECT_ID || 'NOT SET',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL ? 'SET' : 'NOT SET',
    privateKey: process.env.FIREBASE_PRIVATE_KEY ? 'SET' : 'NOT SET',
    privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length || 0,
    hasBeginKey: process.env.FIREBASE_PRIVATE_KEY?.includes('-----BEGIN PRIVATE KEY-----') || false,
    hasEndKey: process.env.FIREBASE_PRIVATE_KEY?.includes('-----END PRIVATE KEY-----') || false,
  });
} 