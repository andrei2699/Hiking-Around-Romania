import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { MAILING_SERVICE_CLIENT_ID, MAILING_SERVICE_CLIENT_SECRET, MAILING_SERVICE_REFRESH_TOKEN, SENDER_EMAIL_ADDRESS } from './emailauth';
const nodemailer = require('nodemailer');

// const cors = require('cors')({ origin: true })

const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
);

oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL_ADDRESS,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken,
    },
});

export const orderCompleted = functions.firestore.document('orders/{userId}').onDelete(async (snapshot, context) => {

    const userId = context.params.userId;
    const data = snapshot.data();
    let email: string | undefined = 'andrei.timar@gmail.com'
    try {
        email = (await admin.auth().getUser(userId)).email;
    } catch {

    }

    let content = `<p>No Data
                <br/>
                Fara Date</p>`
    if (data.events) {
        content = '';

        content += '<div>';

        let totalPrice = 0;
        for (let event of data.events) {
            content += '<div>';

            if (event.eventName) {
                content += `<h2>${event.eventName}</h2><br/><br/>`;
            }

            if (event.organizerName) {
                content += `<p>Organizer (Organizator): ${event.organizerName}</p><br/>`
            }

            if (event.reservedTickets) {
                content += `<p>Reserved Tickets (Bilete Cumparate): ${event.reservedTickets}</p><br/>`;
            }

            if (event.eventTotalPrice) {
                totalPrice += event.eventTotalPrice * (event.reservedTickets ? event.reservedTickets : 1);
                content += `<p>Event Total Price (Pret Total Eveniment): ${event.eventTotalPrice}</p><br/>`;
            }

            if (event.eventMainPhotoUrl) {
                content += `<img width="400" src="${event.eventMainPhotoUrl}">`
            }
            content += '</div><br/><br/>';
        }

        content += `<p>Total Price (Pret Total): ${totalPrice}</p><br/>`;
        content += '</div>';
    }

    const mailOptions = {
        from: 'timar.andrei.moisil@gmail.com',
        to: email,
        subject: 'Order Details - Detalii Comanda',
        html: content
    };

    return transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log(error);
            return;
        }
    });

});
