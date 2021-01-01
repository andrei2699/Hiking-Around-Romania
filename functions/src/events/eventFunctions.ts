import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
const cors = require('cors')({ origin: true })

export const getFutureEvents = functions
    .https.onRequest((request, response) => {
        cors(request, response, async () => {

            if (request.body && request.body.data) {
                const data = await admin.firestore().collection('events').get()
                    .then(res => res.docs
                        .filter(doc => {
                            if (doc.data().startDate) {
                                const eventStartDate = doc.data().startDate.toDate();
                                const currentDate = new Date();

                                eventStartDate.setTime(eventStartDate.getTime() - eventStartDate.getTimezoneOffset() * 60 * 1000);

                                if (eventStartDate.getFullYear() > currentDate.getFullYear()) {
                                    return true;
                                }
                                if (eventStartDate.getFullYear() === currentDate.getFullYear()) {
                                    if (eventStartDate.getMonth() > currentDate.getMonth()) {
                                        return true;
                                    }
                                    return eventStartDate.getDate() > currentDate.getDate();
                                }
                            }
                            return false;
                        })
                        .map(x => {
                            const event = x.data();
                            if (event.startDate) {
                                event.startDate = event.startDate.toDate();
                                event.startDate.setTime(event.startDate.getTime() - event.startDate.getTimezoneOffset() * 60 * 1000);
                            }
                            if (event.endDate) {
                                event.endDate = event.endDate.toDate();
                                event.endDate.setTime(event.endDate.getTime() - event.endDate.getTimezoneOffset() * 60 * 1000);
                            }

                            event.eventId = x.id;
                            return event;
                        }))
                    .catch(error => {
                        response.status(500).send(error)
                    });

                response.status(200).send({
                    data: data
                });
                return data;
            } else {
                return response.status(500).send({ error: 'Invalid request received', req: request.body });
            }
        })

    });