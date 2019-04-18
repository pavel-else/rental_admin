import axios from 'axios';

export default {
  state: {
    rentalPoints: [],
    activeRentalPointId: false,
  },
  getters: {
    rentalPoints(state) {
      return state.rentalPoints;
    },
    activeRentalPointId(state) {
      return state.activeRentalPointId;
    }
  },
  mutations: {
    rentalPoints(state, rentalPoints) {
      console.log('commit: rentalPoints', rentalPoints);
      state.rentalPoints = rentalPoints;
    },
    activeRentalPointId(state, rentalPointId) {
      console.log('commit: activeRentalPointId', rentalPointId);
      state.activeRentalPointId = rentalPointId;
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
    setActiveRentalPointId({ state, commit }, index) {
      if (state.rentalPoints && state.rentalPoints[index]) {
        commit('activeRentalPointId', state.rentalPoints[index].id_rent);
      }     
    },
  }
}