
import store from "../store";
import axios from "axios";
// import { async } from "vuesax";

export default function (endpoint, options =  {}) {
    const API_URL = process.env.VUE_APP_API_URL;
    const url = `${API_URL}/${endpoint}`;

    const sendRequest = async () => {
        try {
            if (store.state.auth.token) {
                options.headers.Authorization = `Bearer ${store.state.auth.token}`;
            }

            const request = await axios(url, options);
            return await request.data;
        } catch (error) {
            if ( error.response.status === 422) {
                store.commit("SET_FORM_ERRORS", error.response.data.errors)
            } else {
                store.commit("SET_API_ERROR", e);
            }
        }
    }

    return { sendRequest };
}