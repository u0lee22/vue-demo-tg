import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth
    },
    strict: process.env.NODE_ENV !== 'production'
})