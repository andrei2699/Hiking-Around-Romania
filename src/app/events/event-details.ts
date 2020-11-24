export class EventDetails {
    eventId: string;
    eventName: string;
    eventPrice: number;
    eventMainPhotoUrl: string;
    eventDescription: string;
    organizerName: string;
    organizerId: string;
    transport: string;
    transportPrice: number;
    accomodation: string;
    accomodationPrice: number;
    mapCenter: google.maps.LatLngLiteral;
    eventPhotosUrl: string[];
}
