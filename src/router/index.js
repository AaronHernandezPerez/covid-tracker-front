import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import routes from './routes'

Vue.use(VueRouter)
Vue.use(Meta)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const savePositionRoutes = ['index']

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition && savePositionRoutes.includes(to.name)) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }, // always goes to top
    routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
  })

  router.beforeEach((to, from, next) => {
    if (to.params.locale === from.params.locale) {
      next()
      return
    }

    const { locale } = to.params

    // changeLanguage

    next()
  })

  return Router
}
