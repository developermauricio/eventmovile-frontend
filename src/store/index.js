import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import auth from './auth';
import ui from './ui';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ["auth", "ui"],
})

export default createStore({
    state: {
        errors: {},
        form_errors: {},
        title: 'Prueba store'
    },
    mutations: {
        SET_API_ERROR(state, payload) {
            state.errors = payload;
        },
        SET_FORM_ERRORS(state, errors) {
            state.form_errors = {};
            if (errors) {
                for(let error in errors) {
                    /* if (errors.hasOwnProperty(error)) {
                        state.form_errors[error] = errors[error][0];
                    } */
                    console.log('error: ', error)
                }
            }
        }
    },
    modules: {
        auth,
        ui,
    },
    plugins: [vuexLocal.plugin]
});