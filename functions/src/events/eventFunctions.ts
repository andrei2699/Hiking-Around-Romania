import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
const cors = require('cors')({ origin: true })

export const getFutureEvents = functions
    .https.onRequest((request, response) => {
        cors(request, response, async () => {

            const data = await admin.firestore().collection('events').get().then(res => res.docs
                // .filter(doc => doc.data().startDate && doc.data().startDate >= Date.now())
                .map(x => x.data()));

            response.send(data);
            return data;
        })

    });