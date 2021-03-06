import Vue   from 'vue';
import Vuex  from 'vuex';

import auth          from './modules/auth';
import multiRequest  from './modules/multiRequest';
import settings      from './modules/settings';
import rentalPoints  from './modules/rentalPoints';
import products      from './modules/products';
import categories    from './modules/categories';
import icons         from './modules/icons';
import initStore     from './modules/initStore';
import tariffs       from './modules/tariffs';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    multiRequest,
    settings,
    rentalPoints,
    products,
    categories,
    icons,
    initStore,
    tariffs,
  }
});

export default store;