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
        USER_REQUEST({ commit, dispath }) {
            commit('USER_REQUEST');

            axios({
                url: 'http://192.168.10.10:80/api/details
            })
        }
    },
    mutations: {
        AUTH_REQUEST(state) {
            state.status = 'loading';
        },
        AUTH_SUCCESS(state, token) {
            state.status = 'success';
            state.token = token;
        },
        AUTH_ERROR(state) {
            state.status = 'error';
        }
    }
};