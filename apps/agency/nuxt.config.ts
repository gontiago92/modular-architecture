// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-md3"],

  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  moduleLoader: {
    modulesStatus: {
      product: true,
      user: false,
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },


});
