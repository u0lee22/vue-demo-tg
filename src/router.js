import Login from "@/components/Login";
import Main from "@/components/Main";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: '/',
        component: Main,
        redirect: '/t/aum/au/01',
        meta: {requiresAuth: true},
        children: [
            {
                path: '/t',
                name: 'template',
                children: [
                    {
                        path: 'aum',
                        name: 'audience_manager',
                        children: [
                            {
                                path: 'au',
                                name: 'audience',
                                children: [
                                    {
                                        path: '01',
                                        name: 'list',
                                        components: () => import('@/components/Foo')
                                    }
                                ]
                            }
                        ],
                    }
                ]
            }
        ]
    },
    // { path: '*', redirect: '/' },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    // if (to.matched.some(record => record.meta.requiresAuth)) {
    // if (store.getters['auth/authMenu'].indexOf(to.name) === -1) {
    //     alert('메뉴 권한이 없습니다. 관리자에게 문의하세요.');
    //     const fullPath = router.currentRoute.fullPath;
    //     router.push({
    //         path: '/login',
    //         query: {redirect: fullPath},
    //     });
    // } else {
    //     next();
    // }
    // } else {
    //     next();
    // }
    next();
});

export default router;