import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import * as corsModule from 'cors';
const cors = corsModule({ origin: true })

// admin.initializeApp(functions.config().firebase)

export const getUserProfiles = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const db = admin.firestore();
        if (request.body && request.body.data && request.body.data.userId) {
            const profile = await db.doc(`profiles/${request.body.data.userId}`).get();
            return profile.data();
        }

        const allProfiles = await db.collection('profiles').get();
        return allProfiles.docs.map(doc => doc.data);
    });
});

export const writeUserProfile = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        if (request.body && request.body.data) {
            const data = request.body.data;
            if (data.userId && data.type) {
                return admin.firestore().doc(`profiles/${data.userId}`).set({
                    userType: data.type,
                    profileRef: db.doc(`/profiles/${profile.id}`)
                }, { merge: true })
                    .catch(error => {
                        return response.status(500).send(error);
                    }).then(res => {
                        return response.send({ res });
                    });
            }
        }
        return response.status(500).send({ error: 'Invalid request', req: request.body });
    });
});