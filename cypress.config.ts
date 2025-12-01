import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);

      // ERROR likely occurs in an object passed to a function call here
      // e.g. someFunction({ autoDetect: true, ... })

      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
    supportFile: false,
    specPattern: ["cypress/**/*.feature"],
  },
});
