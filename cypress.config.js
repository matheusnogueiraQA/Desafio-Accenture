const { defineConfig } = require("cypress");
// Importa o compilador do esbuild
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
// Importa plugin do cucumber
const { addCucumberPreprocessorPlugin, } = require("@badeball/cypress-cucumber-preprocessor");
// Importa plugin do esbuild
const { createEsbuildPlugin, } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://demoqa.com",
        specPattern: "cypress/e2e/**/*.feature",
        supportFile: "cypress/support/e2e.js",
        
        async setupNodeEvents(on, config) {
            await addCucumberPreprocessorPlugin(on, config);

            on(
                "file:preprocessor",
                createBundler({
                    plugins: [createEsbuildPlugin(config)],
                })
            );

            return config;
        },
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    videosFolder: 'cypress/videos',
    creenshotsFolder: 'cypress/screenshots'
})