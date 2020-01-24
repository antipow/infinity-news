import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/news',
        children: [
            {
                path: 'news',
                component: () => import('@/views/news/index'),
                name: 'Новости',
                meta: { title: 'Список новостей', icon: 'news', affix: true }
            }
        ]
    },
];

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();


export default router