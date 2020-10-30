import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
export * from './users/userProfile'
admin.initializeApp(functions.config().firebase)
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
