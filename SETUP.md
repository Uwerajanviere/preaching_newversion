# Firebase Setup Guide for New Preach

## The Problem
Your dashboard is not working because Firebase is not properly configured. The error "Failed to parse private key: Error: Invalid PEM formatted message" indicates missing or incorrectly formatted Firebase service account credentials.

## Solution Steps

### 1. Get Firebase Service Account Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to **Project Settings** (gear icon) → **Service Accounts**
4. Click **Generate new private key**
5. Download the JSON file

### 2. Create Environment File

1. In your project root, create a file called `.env.local`
2. Copy the contents from `env.example` and fill in your actual values:

```bash
# Firebase Configuration
FIREBASE_PROJECT_ID=your-actual-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
... (paste your entire private key here) ...
-----END PRIVATE KEY-----"

# Public Firebase Config (for client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id-here
```

### 3. Get Public Firebase Config

1. In Firebase Console, go to **Project Settings** → **General**
2. Scroll down to **Your apps** section
3. If you don't have a web app, click **Add app** → **Web**
4. Copy the config values to your `.env.local` file

### 4. Important Notes

- **Never commit `.env.local` to git** (it's already in `.gitignore`)
- The `FIREBASE_PRIVATE_KEY` must include the entire key with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Make sure there are no extra spaces or quotes around the private key
- Restart your development server after creating `.env.local`

### 5. Test Configuration

1. Restart your development server: `npm run dev` or `pnpm dev`
2. Visit `/api/test-env` to check if your environment variables are loaded
3. Try uploading content through your admin dashboard

### 6. Common Issues

- **"Invalid PEM formatted message"**: Check that your private key is properly formatted
- **"Environment variables not set"**: Make sure `.env.local` exists and has correct values
- **"Firebase not configured"**: Verify all three required variables are set

### 7. File Structure

```
new-preach-main/
├── .env.local          ← Create this file (not in git)
├── env.example         ← Reference file
├── firebase/
│   ├── firebaseAdmin.ts  ← Backend Firebase config
│   └── firebaseClient.ts ← Frontend Firebase config
└── app/api/            ← API routes that use Firebase
```

## After Setup

Once you've configured Firebase correctly:
1. Your admin dashboard should work
2. You can upload content (sermons, books, daily words, etc.)
3. The content will be stored in Firestore
4. Your frontend will be able to fetch and display the content

## Need Help?

If you're still having issues:
1. Check the browser console for errors
2. Check the terminal where you're running `npm run dev`
3. Verify your Firebase project has Firestore enabled
4. Make sure your service account has the necessary permissions
