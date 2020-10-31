import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import * as corsModule from 'cors';
const cors = corsModule({ origin: true })

// admin.initializeApp(functions.config().firebase)

// export const getUserProfiles = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         return admin.firestore().doc('profiles/name@example.com').get()
//             .then(snapshot => {
//                 const data = snapshot.data();
//                 return response.send({ data: data });
//             })
//             .catch(error => {
//                 console.log(error);
//                 // return error;
//                 return response.status(500).send(error);
//             })
//     });
// });

export const writeUserProfile = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        if (request.body && request.body.data) {
            const data = request.body.data;
            if (data.email && data.type) {

                const db = admin.firestore();

                const profile = await db.collection('profiles').add({
                    userName: data.name,
                    userType: data.type
                });

                return db.doc(`userData/${data.email}`).set({
                    userName: data.name,
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