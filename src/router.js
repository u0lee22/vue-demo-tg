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
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // TODO
        //cookie 체크해서 auth에서 데이터 가져오는 로직 추가
        next();

    } else {
        next();
    }
});

export default router;