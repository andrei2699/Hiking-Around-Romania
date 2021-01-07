import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
require('dotenv').config();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp(functions.config().firebase)

export * from './users/userProfile';
export * from './events/eventFunctions';
export * from './shopping-cart/shoppingCart';