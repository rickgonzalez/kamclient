import { initializeApp, getApps, cert } from 'firebase-admin/app';

//https://stackoverflow.com/questions/58430162/how-to-load-a-firebase-admin-key-in-node-js
const myjson = process.env.google_json
  



const firebaseAdminConfig = {
  //  credential: cert(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY_PATH!)
  credential: cert(
  JSON.stringify(myjson)
  )
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
