import { getSendRequest, postSendRequest } from '@/utils/using-axios';

/***  Variables globales  ***/
const eventId = localStorage.getItem("eventId") || 0; 
const dataUser = JSON.parse( localStorage.getItem('user') ) || {}


/***  Funciones para actualizacion de datos  ***/
export const refreshToken = async () => { 
    const token = localStorage.getItem('_current_token');

    if ( !token ) return;

    const refreshResponse = await getSendRequest('refresh-token');
    
    if ( refreshResponse ) {
        localStorage.setItem("_current_token", refreshResponse.token);
        window.axios.defaults.headers.common["Authorization"] = `Bearer ${refreshResponse.token}`;
    }
}

export const refreshDataUser = async () => {
    if ( !dataUser ) return;

    const user = { email: dataUser.email }

    const userResponse = await postSendRequest('refresh-data-user', user);
    
    if ( userResponse ) {
        localStorage.setItem("user", JSON.stringify(userResponse));
    }
}

export const updateEvent = async () => {
    if ( eventId == 0 ) return;

    const eventResponse = await getSendRequest(`showEvent/${eventId}`);
    
    if ( eventResponse ) {
        let event = eventResponse[0];
        localStorage.setItem("event", JSON.stringify(event));
    }
}

export const updateStyles = async () => {
    if ( eventId == 0 ) return;

    const stylesResponse = await getSendRequest(`styleEvent/${eventId}`);
    
    if ( stylesResponse ) {
        localStorage.setItem('style-event', JSON.stringify(stylesResponse));
    }
}

export const updateListSpeakers = async () => {
    if ( eventId == 0 ) return;

    const eventResponse = await getSendRequest(`getSpeakers/${eventId}`);
    
    if ( eventResponse ) {
        const listSpeakers = eventResponse.data
        localStorage.setItem("listSpeakers", JSON.stringify(listSpeakers));
    }
}  

export const refreshDataHome = async () => {
    await updateEvent();
    await updateStyles();
    await refreshDataUser();
    await updateListSpeakers();
}


