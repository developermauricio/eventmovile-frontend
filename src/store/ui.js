
export default {
    namespaced: true,
    state: {
        notification: {
            show: false,
        }
    },
    mutations: {
        SET_NOTIFICATION(state, payload) {
            state.notification = payload;
        }
    },
};