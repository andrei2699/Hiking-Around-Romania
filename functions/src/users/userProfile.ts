import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

// admin.initializeApp(functions.config().firebase)

export const getUserProfiles = functions
    .region('europe-west3')
    .https.onRequest((request, response) => {
        const db = admin.firestore();
        if (request.body && request.body.data && request.body.data.userId) {
            db.doc(`profiles/${request.body.data.userId}`).get()
                .then(profile => {
                    response.send(profile.data());
                }).catch(error => {
                    response.status(500).send(error);
                });
        }

        db.collection('profiles').get()
            .then(allProfiles => {
                const data = allProfiles.docs.map(doc => doc.data);
                response.set(data);
            }).catch(error => {
                response.status(500).send(error);
            });;
    });

export const writeUserProfile = functions
    .region('europe-west3')
    .https.onRequest((request, response) => {
        if (request.body && request.body.data) {
            const data = request.body.data;
            if (data.userId && data.type) {
                admin.firestore().doc(`profiles/${data.userId}`).set({
                    userType: data.type,
                    name: data.name
                }, { merge: true })
                    .then(res => {
                        response.send(res);
                    })
                    .catch(error => {
                        response.status(500).send(error);
                    });
            }
        }
        response.status(500).send({ error: 'Invalid request', req: request.body });
    });