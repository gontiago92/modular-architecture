const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        // app content
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
        // include packages if not transpiling
        "../../packages/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
        extend: {
            colors: {
                brandblue: colors.blue[500],
                brandred: colors.red[500],
            },
        },
    },
    plugins: [],
};
