import Login from '@/page/Login';
import Main from '@/components/Main';

const ROUTES = [
    {
        path: '/login', name: "Login", component: Login,
    },
    {
        path: '/',
        redirect: '/t/aum/au/01',
        component: Main,
        meta: {requiresAuth: true},
    },
    {
        path: '/t',
        name: 'template',
        component: Main,
        meta: {requiresAuth: true},
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
                                component: () => import('@/page/t/Foo')
                            }
                        ]
                    }
                ],
            }
        ],

    },
    {
        path: '/html',
        name: 'html',
        component: Main,
        meta: {requiresAuth: true},
        children: [
            {
                path: 'test1',
                name: 'test1',
                component: () => import('@/page/html/Test1')
            },
            {
                path: 'test2',
                name: 'test2',
                component: () => import('@/page/html/Test2')
            },
            {
                path: 'test3',
                name: 'test3',
                component: () => import('@/page/html/Test3')
            },
            {
                path: 'test4',
                name: 'test4',
                component: () => import('@/page/html/Test4')
            }
        ]
    },
    {
        path: '/comm',
        name: 'comm',
        component: Main,
        meta: {requiresAuth: true},
        children: [
            {
                path: 'template',
                name: 'comm_template',
                component: () => import('@/page/comm/template')
            },
            {
                path: 'aaa',
                name: 'comm_aaa',
                component: () => import('@/page/comm/template')
            }
        ]
    },
    {path: '*', redirect: '/'},
];

export {ROUTES};