
export default {
    namespaced: true,
    state: {
        token: null,
    },
    mutations: {
        LOGIN(state, token) {
            state.token = token;
        },
        LOGOUT(state) {
            state.token = null;
        }
    },
};