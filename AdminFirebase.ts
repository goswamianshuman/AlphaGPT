import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

// const serviceAccount = require("./adminservicekey.json");

const serviceAccount = JSON.parse(process.env.ADMIN_SECRET_KEY as string);

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const admin_database = admin.firestore();

export { admin_database };
