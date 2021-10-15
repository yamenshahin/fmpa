// Load scss file on build
const changeLoaderOptions = (loaders) => {
  if (loaders) {
    for (const loader of loaders) {
      if (loader.loader === 'sass-loader') {
        Object.assign(loader.options, {
          includePaths: ['./assets'],
        })
      }
    }
  }
}
//Switch between development and production
const config = {
  BASE_URL:
    process.env.NODE_ENV !== 'production'
      ? process.env.BASE_URL_DEV
      : process.env.BASE_URL_SERVER,
  UPLOAD_FILES_URL:
    process.env.NODE_ENV !== 'production'
      ? process.env.UPLOAD_FILES_URL_DEV
      : process.env.UPLOAD_FILES_URL_SERVER,
}
// Use .env file
require('dotenv').config()

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'MFPA app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/scss/coreui/coreui', '@/assets/scss/style'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/CoreuiVue.js', mode: 'client' },
    { src: '~/plugins/CChartBar.js', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: config.BASE_URL + '/api/',
  },

  server: {
    port:
      process.env.NODE_ENV !== 'production'
        ? process.env.PORT_DEV
        : process.env.PORT_SERVER,
    //Mobile Dev
    /* port: 8000,
    host: '0.0.0.0', */
  },
  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          fix: true,
        },
      })
      const vueLoader = config.module.rules.find(
        ({ loader }) => loader === 'vue-loader'
      )
      const {
        options: { loaders },
      } = vueLoader || { options: {} }

      if (loaders) {
        for (const loader of Object.values(loaders)) {
          changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
        }
      }

      config.module.rules.forEach((rule) => changeLoaderOptions(rule.use))
    },
  },

  // Environment variables

  env: {},
}
