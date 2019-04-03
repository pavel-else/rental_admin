import axios from 'axios';

export default {
    state: {
        token: localStorage.getItem('user-token') || '',
        status: ''
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token;
        },
        authStatus(state) {
            return state.status;
        }
    },
    mutations: {
        token(state, token) {
            console.log('commit: token', token);

            state.status = 'success';
            state.token = token;
        },
        AUTH_REQUEST(state) {
            state.status = 'loading';
        },
        AUTH_ERROR(state) {
            state.status = 'error';
        },
        AUTH_LOGOUT(state) {
            state.token = '';
            state.status = '';
        }
    },
    actions: {
        login({ getters, commit, dispatch }, user) {
            return new Promise((resolve, reject) => {
                console.log('dispatch: login');

                axios({  
                    url: getters.url, 
                    data: { cmd: 'login', value: user },
                    method: 'POST', 
                })
                .then(resp => {
                    console.log(resp)
                    const token = resp.data.token;

                    //axios.defaults.headers.common['Authorization'] = token;
                    commit('token', token);
                    localStorage.setItem('user-token', token);
                    resolve(resp);
                })
                .catch(err => {
                    commit('AUTH_ERROR', err);                  
                    localStorage.removeItem('user-token');
                    reject(err);
                });
            });
        },
        AUTH_REGISTER({ getters, commit, dispatch}, user) {
            return new Promise((resolve, reject) => {
                axios({
                    url: getters.url + '/api/register',
                    data: user,
                    method: 'POST'
                })
                .then(resp => {
                    const token = resp.data.success.token;
                    axios.defaults.headers.common['Authorization'] = token;
                    commit('AUTH_SUCCESS', token);
                    localStorage.setItem('user-token', token);
                    resolve(resp);
                })
                .catch(err => {
                    commit('AUTH_ERROR', err);                  
                    localStorage.removeItem('user-token');
                    reject(err);
                });
            });
        },
        AUTH_LOGOUT({ commit, dispatch }) {
            return new Promise((resolve, reject) => {
                commit('AUTH_LOGOUT');
                localStorage.removeItem('user-token');
                delete axios.defaults.headers.common['Authorization'];
                resolve();
            });
        }
    },
};