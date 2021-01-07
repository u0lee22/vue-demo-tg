import axios from 'axios';

const getters = {
    authMenu: state => {
        return state.user.menus
            .filter(menu => menu.status)
            .map(menu => menu.name);
    }
};

const actions = {
    login() {
        const url = '/api/loginProcessing';
        let params = new URLSearchParams();
        params.append('id','wy.lee@tg360tech.com');
        params.append('pw','1');
        return axios.post(url, params)
            .then(function (response) {
                console.log('response :: ',response);
                return response.data.result;
            })
            .catch(function (error) {
                console.log('error :: ',error);
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
        state.user = item;
        state.user.loaded = true;
        state.isAuthenticated = true;
    }
};

export default {
    namespaced: true,
    state: () => ({
        isAuthenticated: false,
        user: {
            menus: [],
        },
    }),
    getters,
    actions,
    mutations
}