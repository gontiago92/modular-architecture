export default defineNuxtPlugin(() => {
    console.log("plugin from ui")
    return {
        provide: {
            hello: (msg: string) => `Hello ${msg}!`
        }
    }
})