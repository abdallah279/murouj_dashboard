import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        logo: null,
    },
    getters: {},
    mutations: {
        getLogo(state, logo) {
            state.logo = logo;
        },
    },
    actions: {
        async getLogoImg({ commit }) {
            try {
                await axios.get("main-data").then((res) => {
                    commit("getLogo", res.data.data.logo);
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
    modules: {},
});
