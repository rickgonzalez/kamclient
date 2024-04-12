import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig = {
    credential: cert(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY_PATH!)
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
