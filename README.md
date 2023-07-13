# Nuxt 3 Default Starter Kit + Modular Architecture

🚧 This is a work in progress. I'm not a Nuxt 3 expert yet, so there may be better ways to achieve this result. I'm using a moduleLoader, which is a Nuxt module, but I'm not importing it in the nuxt.config.ts, it is doing it automatically, so it might not be right approach.

At this moment I haven't tested it in a real case scenario, which I pretend to do in the weeks to come. It might contain some errors, since I couldn't test every case possible. Use it with caution and feel free to contribute and improve this repository.

# Modular Architecture

What is meant by modular architecture? This means we have the logic for a particular feature complete isolated from the rest of the project, which allows us to develop an entire feature in its dedicated folder.

### Folder structure

The structure of a module folder is the following:

```yaml
📂 module
- 📂 components
- 📂 composables
- 📂 pages
- 📂 plugins
- 📂 stores
```

All the files in each folder are automatically added to the Application.

### Options

The `moduleLoader` key can be used in the nuxt.config.ts to turn modules on and off. If a module is of it while be ignored and therefore not loader by the moduleLoader.

```ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  moduleLoader: {
    modulesStatus: {
      mymodule: true,
    },
  },
});
```

You will get a message in the terminal that informs you on which modules are active and which are not, as well as a list of available modules.

# Getting Started

### We only use `pnpm` in this example, but feel free to use `npm` or `yarn`.

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
