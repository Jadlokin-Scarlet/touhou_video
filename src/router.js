import Vue from 'vue'
import Router from 'vue-router'
import Rank from "./views/admin/Rank.vue"
import Home from "./views/tilitili/Home.vue"
import Admin from "./views/admin/Admin"
import Root from "./views/Root"
import RecycleBin from "@/views/admin/RecycleBin";
import Search from "@/views/tilitili/Search";
import Player from "@/views/tilitili/Player";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/player/av/:av',
            name: 'player',
            component: Player,
            meta: {
                referrer: "no-referrer",
            },
        },
        {
            path: '/search/:searchKey',
            name: 'search',
            component: Search,
            meta: {
                referrer: "no-referrer",
            },
        },
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
                    path: 'rank/:issue',
                    name: 'rank',
                    component: Rank,
                    meta: {
                        referrer: "no-referrer",
                    },
                },
                {
                    path: 'recycle-bin',
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
