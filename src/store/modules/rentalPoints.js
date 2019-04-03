import axios from 'axios';

export default {
  state: {
    rentalPoints: [],
  },
  getters: {
    rentalPoints(state) {
      return state.rentalPoints;
    }
  },
  mutations: {
    rentalPoints(state, rentalPoints) {
      console.log('commit: rentalPoints', rentalPoints);
      state.rentalPoints = rentalPoints;
    }
  },
  actions: {
    getRentalPoints({ commit, getters }) {
      console.log('dispatch: getRentalPoints');

      return new Promise((resolve, reject) => {
        const queue = [
          { cmd: 'getRentalPoints' },
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
        .then(resp => {
          console.log(resp);
          commit('rentalPoints', resp.data.rental_points);
          resolve(resp);                        
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
      });
    },
    // setRentalPointInfo({ commit, getters }, rentalPointInfo) {
    //   console.log('dispatch: setRentalPointInfo', rentalPointInfo);
    //   return new Promise((resolve, reject) => {
    //     axios({
    //       method: 'post',
    //       url: getters.url,
    //       data: {
    //         queue: [{ cmd: 'setRentalPointInfo', value: rentalPointInfo }],
    //         token: localStorage.getItem('user-token')
    //       },                 
    //     })
    //     .then(r => {
    //       console.log(r);
    //       commit('rentalPointInfo', rentalPointInfo);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       reject(err);
    //     });
    //   });
    // },
  }
}