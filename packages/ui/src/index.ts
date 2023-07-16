import { defineNuxtModule, createResolver, addPlugin } from "@nuxt/kit";
export default defineNuxtModule({

    defaults: {},

    setup(_, nuxt) {

        const { resolve } = createResolver(import.meta.url);
        const runtimeDir = resolve('./lib')

        nuxt.options.build.transpile.push(runtimeDir)

        nuxt.hook('components:dirs', dirs => {
            dirs.push({
                path: resolve(runtimeDir, `components`),
            })
        })

        addPlugin(resolve('lib/plugins/helper.ts'))

    }
})