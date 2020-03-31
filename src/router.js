import Vue from 'vue'
import Router from 'vue-router'
import Rank from "./views/Rank.vue"
import RecycleBin from "@/views/RecycleBin";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'newRank',
            component: Rank,
            meta: {
                referrer: "no-referrer",
            },
        },
        {
            path: '/rank/:issue',
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
        }
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
