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

const router = new VueRouter({
    mode: 'history',
    routes
});

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const auth = cookie.get(AUTHENTICATE_KEY);
        if (auth === 'true') {
            if (!store.state.auth.isAuthenticated) {
                store.dispatch('auth/authenticate');
            }

            if (store.getters['auth/authTemplate'].indexOf(to.path) > -1) {
                next();
            } else {
                alert('권한 없음');
            }
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

export default router;