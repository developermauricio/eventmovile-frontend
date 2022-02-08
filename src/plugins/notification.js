import { publishMQTT, subscriberMQTT } from './mqtt';

const channelNotification = "SG1jnxZvzvi_Sd9VcXHRO";

export const subscribeNotifications = (callback) => {
    const user = JSON.parse(window.localStorage.getItem('user') || '{}');
    if (user.id) {
        const channel = channelNotification.replace('_', user.id);
        subscriberMQTT(channel, data => {
            callback(data);
        });
    }
};

export const createNotification = (userId, title, description, key, data = {}) => {
    return new Promise((resolve, reject) => {
        if (!userId) {
            reject('usuario no valido');
        }
        data.title = title;
        data.description = description;
        data.key = key;
        window.axios.post(
            '/networking-wa/add-notification/' + userId,
            data
        ).then(resp => {
            const channel = channelNotification.replace('_', userId);
            publishMQTT(
                channel,
                {
                    k: key,
                    t: title,
                    d: description
                }
            );
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    })
}