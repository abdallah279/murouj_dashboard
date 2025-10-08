import { createStore } from "vuex";

export default createStore({
  state: {
    orderType: null,
    proSubCategory: null,
    proDuration: null,
    proDate: null,
  },
  getters: {},
  mutations: {
    setOrderType(state, type) {
      state.orderType = type;
    },
    setSubCategory(state, category) {
      state.proSubCategory = category;
    },
    setDuration(state, duration) {
      state.proDuration = duration;
    },
    setDate(state, date) {
      state.proDate = date;
    }
  },
  actions: {},
  modules: {},
});
