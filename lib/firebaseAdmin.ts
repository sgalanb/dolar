import { serviceAccount } from '@/lib/firebaseServiceAccount'
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export default admin
