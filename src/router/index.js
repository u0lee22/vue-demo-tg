import Vue from 'vue';
import VueRouter from 'vue-router';
import {store} from '@/store';
import cookie from 'vue-cookies';
import {AUTHENTICATE_KEY} from '@/store/modules/auth';
import axios from 'axios';
import {ROUTES as routes} from '@/router/routes';

Vue.use(VueRouter);

const STATUS = {
    SC_UNAUTHORIZED: 401,
    SC_FORBIDDEN: 403,
    SC_CONFLICT: 409
}

axios.interceptors.response.use(
    (response) => {
        return response;
    }, (error) => {
        if (error.response.status === STATUS.SC_UNAUTHORIZED) {
            alert('중복 로그인입니다.');
            const fullPath = router.currentRoute.fullPath;
            router.push({
                path: '/login',
                query: {redirect: fullPath},
            });

        }

        if (error.response.status === STATUS.SC_CONFLICT) {
            alert('중복 로그인입니다.');
        }

        if (error.response.status === STATUS.SC_FORBIDDEN) {
            alert('권한이 없습니다.');
        }
    }
);

const router = new VueRouter({
    mode: 'history',
    routes
});


router.beforeEach((to, from, next) => {
    console.log(to, from);
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const auth = cookie.get(AUTHENTICATE_KEY);

        if (auth === 'true') {
            if (!store.state.auth.isAuthenticated) {
                store.dispatch('auth/authenticate');
            }
            next();
        } else {
            const fullPath = router.currentRoute.fullPath;
            router.push({
                path: '/login',
                query: {redirect: fullPath},
            });

        }
    } else {
        next();
    }
});

export default router;