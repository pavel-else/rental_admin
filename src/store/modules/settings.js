export default {
  state: {
    url: 'https://rentix.biz/api/request_adm.php',
  },
  getters: {
    url(state) {
      return state.url;
    }
  }
};