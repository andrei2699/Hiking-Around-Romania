import { object } from "firebase-functions/lib/providers/storage";
import { ShoppingCartService } from "./shopping-cart.service";

export class ShoppingCartItem {
    eventId: string;
    eventName: string;
    eventTotalPrice: number;
    eventMainPhotoUrl: string;
    organizerName: string;
    organizerId: string;
    reservedTickets: number;
    availableTickets: number;
}