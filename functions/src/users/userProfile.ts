import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
const cors = require('cors')({ origin: true })

export const getUserProfiles = functions
    .https.onRequest((request, response) => {
        cors(request, response, () => {

            const db = admin.firestore();
            if (request.body && request.body.data && request.body.data.userId) {
                db.doc(`profiles/${request.body.data.userId}`).get()
                    .then(profile => {
                        response.status(200).send(profile.data());
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
        })

    });

export const writeUserProfile = functions
    .https.onRequest((request, response) => {
        cors(request, response, () => {

            if (request.body && request.body.data) {
                const data = request.body.data;
                if (data.userId && data.type) {
                    return admin.firestore().doc(`profiles/${data.userId}`).set({
                        userType: data.type,
                        name: data.name
                    }, { merge: true })
                        .then(res => {
                            response.status(200).send(res);
                        })
                        .catch(error => {
                            response.status(500).send(error);
                        });
                }
            }
            return response.status(500).send({ error: 'Invalid request received', req: request.body });
        })

    });
