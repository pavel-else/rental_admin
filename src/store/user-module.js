import axios from 'axios';

export default {
    state: {
        status: '',
        profile: {}
    },
    getters: {
        getProfile(state) {
            return state.profile;
        },
        isProfileLoaded(state) {
            return !!state.profile.name;
        }
    },
    actions: {
        USER_REQUEST({ commit, dispath, getters }) {
            //commit('USER_REQUEST');

            axios({ 
                url: getters.url + '/api/test', 
                data: {"name":"name"}, 
                method: 'POST', 
            })
            .then(resp => {
                console.log('resp', resp);
                resolve(resp);
            })
            .catch(err => {
                console.log('err', err)
                // commit('AUTH_ERROR', err);                  
                // localStorage.removeItem('user-token');
                // reject(err);
            });
        }
    },
    mutations: {
        // AUTH_REQUEST(state) {
        //     state.status = 'loading';
        // },
        // AUTH_SUCCESS(state, token) {
        //     state.status = 'success';
        //     state.token = token;
        // },
        // AUTH_ERROR(state) {
        //     state.status = 'error';
        // }
    }
};