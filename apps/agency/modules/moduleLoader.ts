import {
  defineNuxtModule,
  addImportsDir,
  addPlugin,
  createResolver,
  extendPages,
} from "@nuxt/kit";
import fs from "node:fs";
import path from "node:path";
import alert from "cli-alerts";

interface ModuleOptions {
  modulesStatus: {
    [key: string]: boolean;
  };
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const RoutePath: {
  bracketsRegex: RegExp;
  bracketsDotVueRegex: RegExp;
  parse: (file: string, module: string) => string;
} = {
  bracketsRegex: new RegExp(/\[|\]/, "g"),
  bracketsDotVueRegex: new RegExp(/\[|\]|.vue/, "g"),
  parse: (file, module) => {
    const parsed = file
      .replace(RoutePath.bracketsRegex, function (match) {
        return match === "[" ? ":" : "()";
      })
      .replace(/.vue/g, "");

    if (parsed === "index") {
      return `/${module}`;
    } else if (parsed !== "index" && parsed.includes("index")) {
      return `/${module}/` + parsed.replace("/index", "");
    }

    return `/${module}/` + parsed;
  },
};

function readDirectoryFiles(
  directoryPath: string,
  callBack: (filePath: string) => void,
  provideStack?: (stack: string[]) => void
) {
  const stack = [directoryPath];

  while (stack.length > 0) {
    const currentPath = stack.pop();
    try {
      const files = fs.readdirSync(currentPath as string);

      files.forEach((file) => {
        const filePath = path.join(currentPath as string, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
          callBack(filePath);
        } else if (stats.isDirectory()) {
          stack.push(filePath); // Add directory path to the stack
          if (provideStack) provideStack(stack);
        }
      });
    } catch {}
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    // Usually the npm package name of your module
    name: "@gftStudio/moduleLoader",
    // The key in `nuxt.config` that holds your module options
    configKey: "moduleLoader",
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: "^3.6.2",
    },
  },
  // Default configuration options for your module, can also be a function returning those
  defaults: {
    modulesStatus: {},
  },
  // Shorthand sugar to register Nuxt hooks
  hooks: {},
  // The function holding your module logic, it can be asynchronous
  setup(moduleOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    fs.readdir(resolve("."), { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      // Filter out directories from the files array
      const modulesDirectories = files
        .filter((file) => file.isDirectory())
        .map((file) => file.name);

      modulesDirectories.forEach((module) => {
        if (!moduleOptions.modulesStatus[module]) {
          alert({
            type: `warning`,
            msg: `${capitalize(module)} Module is not active.`,
          });
          return;
        }

        nuxt.hook("components:dirs", (dirs) => {
          dirs.push({
            path: resolve(`./${module}/components`),
          });
        });

        addImportsDir(resolve(`./${module}/composables`));
        addImportsDir(resolve(`./${module}/stores`));

        /**
         * Adding pages from every Module to the Application
         */
        readDirectoryFiles(resolve(`./${module}/pages`), (file) => {
          const sanitizedFile = file.replace(
            __dirname + `/${module}/pages/`,
            ""
          );

          const pageName = sanitizedFile
            .replace(RoutePath.bracketsDotVueRegex, "")
            .replace("/", "-");

          extendPages((pages) => {
            pages.push({
              name: `${module}-${pageName}`,
              path: RoutePath.parse(sanitizedFile, module),
              file,
            });
          });
        });
        /**
         * Adding plugins from every Module to the Application
         */

        readDirectoryFiles(resolve(`./${module}/plugins`), (file) => {
          const plugin = file.replace(__dirname + `/${module}/plugins/`, "");
          addPlugin(resolve(`./${module}/plugins/${plugin}`));
        });
        alert({
          type: `success`,
          msg: `${capitalize(module)} Module has been added !`,
        });
      });
      alert({
        type: `info`,
        msg: `Available modules : ${modulesDirectories}`,
      });
    });
  },
});
