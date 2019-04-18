import axios from 'axios';
export default {  
  state: {
    tariffs: []
  },
  getters: {
    tariffs(state) {
      return state.tariffs;
    },
  },
  mutations: {
    tariffs(state, tariffs) {
      console.log('commit: tariffs', tariffs);
      state.tariffs = tariffs;
    }
  },
  actions: {
    getTariffs({ commit, getters }) {
      console.log('dispatch: getTariffs');

      return new Promise((resolve, reject) => {
        const queue = [
          { cmd: 'getTariffs'},
        ];
        const url = getters.url;
        const token = localStorage.getItem('user-token');

        axios({ 
          url,
          data: {
            queue,
            token
          },
          method: 'POST',
        })
        .then(r => {
          console.log(r);
          commit('tariffs', r.data.tariffs);
          resolve(true);                        
        }).
        catch(err => {
          console.log(err)
          reject(err);
        })
      });            
    }
  }
}