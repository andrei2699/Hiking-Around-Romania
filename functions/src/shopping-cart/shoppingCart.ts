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



// const stransporter = nodemailer.createTransport({
//     // host: "smtp.gmail.com",
//     // port: 465,
//     // secure: true, // use TLS
//     service: 'gmail',
//     auth: {
//         type: "OAuth2",
//         user: EMAIL,
//         //pass: PASS
//         serviceClient: "100330052283294853884",
//         privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1H8U4P32oaB0M\nua3UKhSZ+aBx8lj4363mRgBtFy9DQm8PHiwEWieGhTwFxHuA2mROOyqpLZCnMl0p\njywNPV5qqHNP5SFqlMG8xq3FtJtPoxJgNUZwWIq3o3r/Ft3SXN0Bbz7eXFX0HE2I\nOBVyg9fje4Db9QSrVBVnhj9L+HsJ/0Tc+ArmWX9zeIpBTuNfC57C8yYIJln7782h\nH+G2kDM8N0P7nEDbWUzKFtlPB02Gacw9Fj15cCeKENV/BenIIW9VUeV5EQPQ7dbq\ncFv7CQPLbq/hif+NjPVyNxEdJw/ENl3R+HxRDbhN8mSMDjHfo0z9uAI98us21db5\niR/xUrXhAgMBAAECggEABTuSnbBE47iFTVSwc1KXZ4blFiGppSAGNMLFOKGct5Fb\n5siI/kOyBGKFREfjxwpYL0PplLtopFHxy9VzcPr6xzNQaIievWbojXkCdHWmLofw\nLBgh7bU7JbjLAQNiu3T8HBJgEznA8HVgXoz7PqSVOEDdTU1/+eirGSNxYPMf798T\n3+dHctjG4KUjTL7HfXjMvTkcedJV8VdFxr+JAExc7JhHV06Z7QYQGVBxM1mD0zS5\n8caRq/2d8tXZWEMJ7NnaUldulMvpVofKfAI7s2fUAsiDEWxunZIu6hX3h2ErANtk\n11FgajQOBdo4XreWcHrvyuWcYGnD77EPmQVaSF4oAQKBgQD8J3JXcg2X99nxn/qQ\nunTigtmEgygUtTNUssEDSYUknsr7sXIYdsdHGDFCl3i+WKnFxmMh8uTjYL0d1mBs\n7bk6oTbbgtHNvuB62OWISV1U79F6CbUFHwtXsG9jVGl2ZbOiuhG9jUlKhactAYU+\nv9kuEJC9JfWuRbKmIXeTxRQT4QKBgQC34vtvzJ/n5ilcdh6hVYDjOJlxh5ZyEvBx\nsdbzZ995GN/gkseCPR/5cP3FqZWZrZ3MFlP+3sdxMTafj0+FSOb5XxwdNxA5nFX/\nj/u7OC6cGXxXTIiY4OLMlk9G+p9t/2wkI3L5tGiKhtZITG3rsgi4Gyd4Mv6pRDks\nePTKqPLiAQKBgCT/ZLeP9I6nv0LExm8V7LCPonrfA7KGI9H5qHhjATYuVno3vxX3\n16WG1zN+JilHuSFbyo/go9T5DMaj/eH9v3/qx7HNsBsQNr/Ps14b5aXgykutwPHP\nbEqhiLZ6XD8TDRiDVLcLVAWrNqxT3MkoPSWVKKeYOkQn1d6qanE0KY4BAoGAc3O8\nf84Om6+jSl0TECI54O95T5FcgNSpSAjrNzmBUmuurDYbswajm544hrDZr3oU970R\nEZVXzRaj//wfZkSGWA1B/onC0xj32ZPR7hLxGKrbqYfwv2N6og7BSYQzMwHKKMpk\n9qgxdr//q7bo0LGfzc+msU37G9UsvGJY9yCqFgECgYBcoR7Hg2CegqyJ5bUutn0g\nQ+z4ZWt+kJSnZNht6HWWelSIq9UAwILiHQYekHDftYVQ8pBVoPebQ/i0TJeAhe7F\nXB5TIdSosAIVSCjAandrLo+qBdKfIl2v1T+k5yOBjOG3lak8/pLVFA3S/R4UxvGP\ngfLgyZsmgqUHuUW/GpKyng==\n-----END PRIVATE KEY-----\n",

//     }
// });


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
                content += `<p>Organizer: ${event.organizerName}</p><br/>`
            }

            if (event.reservedTickets) {
                content += `<p>Reserved Tickets: ${event.reservedTickets}<br/>`
                content += `Bilete Cumparate: ${event.reservedTickets}</p><br/>`
            }

            if (event.eventTotalPrice) {
                totalPrice += event.eventTotalPrice;
                content += `<p>Event Total Price: ${event.eventTotalPrice}<br/>`
                content += `Pret Total Eveniment: ${event.eventTotalPrice}</p><br/>`
            }

            if (event.eventMainPhotoUrl) {
                content += `<img width="400" src="${event.eventMainPhotoUrl}">`
            }
            content += '</div><br/><br/>';
        }

        content += `<p>Total Price: ${totalPrice}<br/>`
        content += `Pret Total: ${totalPrice}</p><br/>`
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
