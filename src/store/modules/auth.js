import axios from 'axios';
import {store} from '@/store';

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
    login() {
        const url = '/api/login';
        let params = new URLSearchParams();
        params.append('id', 'wy.lee@tg360tech.com');
        params.append('pw', '1');
        return axios.post(url, params)
            .then(function (response) {
                console.log('response :: ', response);
                store.commit('auth/setCurrentUser', response.data.result);
                return response.data;
            })
            .catch(function (error) {
                console.log('error :: ', error);
                return error;
            });
    },
    logout() {
        const url = '/api/logout';
        return axios.get(url)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

const mutations = {
    setCurrentUser(state, item) {
        state.user = {...item, loaded: true};
        console.log(state.user);
        state.isAuthenticated = true;
    }
};

export default {
    namespaced: true,
    state: () => ({
        isAuthenticated: false,
        user: {
            menus: [],
            loaded: false,
        },
    }),
    getters,
    actions,
    mutations
}