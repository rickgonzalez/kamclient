import { initializeApp, getApps, cert } from 'firebase-admin/app';
//https://stackoverflow.com/questions/58430162/how-to-load-a-firebase-admin-key-in-node-js

  



// const firebaseAdminConfig = {
//    credential: cert(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY_PATH)
// }

export function customInitApp() {
  

    if (getApps().length <= 0) {
      initializeApp({
        credential: cert({
              type: "service_account",
              project_id: "kamioza-7c8b9",
              private_key_id: "931a57f1754caf1004609175aba8cfa0a56dfd07",
              private_key: process.env.GOOGLE_KEY,
              client_email: "kamsvcacnt@kamioza-7c8b9.iam.gserviceaccount.com",
              client_id: "106399012842989502759",
              auth_uri: "https://accounts.google.com/o/oauth2/auth",
              token_uri: "https://oauth2.googleapis.com/token",
              auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
              client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/kamsvcacnt%40kamioza-7c8b9.iam.gserviceaccount.com",
              universe_domain: "googleapis.com"
        }),
    })
    }}
