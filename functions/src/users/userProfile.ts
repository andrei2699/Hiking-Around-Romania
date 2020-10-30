import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp(functions.config().firebase)

export const getUserProfiles = functions.https.onRequest((request, response) => {
    admin.firestore().doc('profiles/name@example.com').get()
        .then(snapshot => {
            const data = snapshot.data();
            response.send(data)
        })
        .catch(error => {
            console.log(error);
            response.status(500).send(error);
        })
});