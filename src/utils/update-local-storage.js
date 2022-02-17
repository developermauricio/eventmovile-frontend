import { getSendRequest } from '@/utils/using-axios';


const eventId = localStorage.getItem("eventId") || 0; 

export const updateEvent = async () => {
    let eventResponse = await getSendRequest(`showEvent/${eventId}`);
    
    if ( eventResponse ) {
        let event = eventResponse[0];
        localStorage.setItem("event", JSON.stringify(event));
    }
}

export const updateStyles = async () => {
    let eventResponse = await getSendRequest(`styleEvent/${eventId}`);
    
    if ( eventResponse ) {
        localStorage.setItem('style-event', JSON.stringify(eventResponse));
    }
}


