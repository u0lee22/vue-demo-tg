import axios from 'axios';
import {store} from '@/store';
import cookie from 'vue-cookies';
import router from '@/router/index';


export const AUTHENTICATE_KEY = 'Authorization';

const getters = {
    authMenu: state => {
        return state.user.menus
            .filter(menu => menu.status)
            .reduce((menuList, menu) => {
                menuList.push(...menu.templates);
                return menuList;
            }, []);
    }
};

const actions = {
    async login() {
        const url = '/api/login';
        let params = new URLSearchParams();
        params.append('id', 'wy.lee@tg360tech.com');
        params.append('pw', '1');

        const payload = await axios.post(url, params);

        if (payload && payload.status === 200) {
            store.commit('auth/setCurrentUser', payload.data);
        } else {
            store.commit('auth/setCurrentUser', null);
        }
        return payload;
    },
    async logout() {
        const url = '/api/logout';
        const payload = await axios.get(url);

        if (payload) {
            store.commit('auth/setCurrentUser', null);
        }
    },
    async authenticate() {
        const url = '/api/authentication';
        const payload = await axios.get(url);
        if (payload && payload.status === 200) {
            store.commit('auth/setCurrentUser', payload.data);
        } else {
            store.commit('auth/setCurrentUser', null);
        }
        return payload;
    }
}

const mutations = {
    setCurrentUser(state, payload) {
        if (payload && payload.result) {
            state.user = payload.result;
            cookie.set(AUTHENTICATE_KEY, true);
            state.isAuthenticated = true;
            router.replace(payload.message);
        } else {
            state.user = {menus: []}
            state.isAuthenticated = false;
            cookie.set(AUTHENTICATE_KEY, false);
        }
    }
};

export default {
    namespaced: true,
    state: () => ({
        isAuthenticated: false,
        user: {
            menus: []
        },
    }),
    getters,
    actions,
    mutations
}