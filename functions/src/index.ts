import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
export * from './users/userProfile'
admin.initializeApp(functions.config().firebase)
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
