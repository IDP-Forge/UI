// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
    devtools: {enabled: true},
    build: {
        transpile: ['vuetify'],
    },
    ssr: false,
    plugins: [
        '~/plugins/vuetify.ts'
    ],
    modules: [
        // @ts-ignore
        (_options, nuxt) => {
            // @ts-ignore
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },

        '@pinia/nuxt',

        'nuxt-vitest'
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    pinia: {
        storesDirs: ['./store/**'],
    },
});

