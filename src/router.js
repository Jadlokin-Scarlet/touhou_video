import Vue from 'vue'
import Router from 'vue-router'
import Rank from "./views/Rank.vue"
import Home from "./views/Home.vue"
import Admin from "./views/Admin"
import Root from "./views/Root"
import RecycleBin from "@/views/RecycleBin";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                referrer: "no-referrer",
            },
        },
        {
            path: '/admin',
            component: Admin,
            meta: {
                referrer: "no-referrer",
            },
            children: [
                {
                    path: '',
                    name: 'rank',
                    component: Rank,
                    meta: {
                        referrer: "no-referrer",
                    },
                },
                {
                    path: '/recycle-bin',
                    name: 'recycleBin',
                    component: RecycleBin,
                },
            ]
        },
        {
            path: "/",
            name: "root",
            component: Root,
        },
    // {
      // path: '/about',
      // name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
