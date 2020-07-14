export default {
  state: {
    url: process.env.VUE_APP_BACKEND_API_URL,
  },
  getters: {
    url(state) {
      return state.url;
    }
  }
};