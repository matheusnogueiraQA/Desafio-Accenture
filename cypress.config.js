const { defineConfig } = require("cypress");
// Importa o compilador do esbuild
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
// Importa plugin do cucumber
const { addCucumberPreprocessorPlugin, } = require("@badeball/cypress-cucumber-preprocessor");
// Importa plugin do esbuild
const { createEsbuildPlugin, } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const puppeteer = require("puppeteer-core");
const CHROME_PATH =
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

module.exports = defineConfig({
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
        reportDir: "cypress/reports",
        reportPageTitle: "Desafio Accenture - Relatório de Testes",
        charts: true,
        embeddedScreenshots: true,
        inlineAssets: true,
        saveJson: true,
        overwrite: false,
    },
    video: true,
    videoCompression: true,
    // Preserva evidências manuais já guardadas em cypress/screenshots.
    trashAssetsBeforeRuns: false,
    taskTimeout: 180000,
    e2e: {
        baseUrl: "https://demoqa.com",
        specPattern: "cypress/e2e/**/*.feature",
        supportFile: "cypress/support/e2e.js",
        defaultBrowser: 'chrome',

        async setupNodeEvents(cypressOn, config) {
            const on = require("cypress-on-fix")(cypressOn);

            await addCucumberPreprocessorPlugin(on, config);

            require("cypress-mochawesome-reporter/plugin")(on);

            on(
                "file:preprocessor",
                createBundler({
                    plugins: [createEsbuildPlugin(config)],
                })
            );

            on("task", {
                async "browserWindows:verifyNewWindow"({ expectedText }) {
                    const browser = await puppeteer.launch({
                        executablePath: CHROME_PATH,
                        headless: false,
                        args: ["--no-first-run"],
                    });

                    let page;
                    let popup;

                    try {
                        page = await browser.newPage();
                        page.setDefaultNavigationTimeout(90000);
                        page.setDefaultTimeout(60000);

                        await page.goto(
                            `${config.baseUrl}/browser-windows`,
                            { waitUntil: "domcontentloaded", timeout: 90000 }
                        );

                        await page.waitForSelector("#windowButton", {
                            visible: true,
                            timeout: 60000,
                        });

                        const popupPromise = new Promise((resolve, reject) => {
                            const timeout = setTimeout(() => {
                                reject(
                                    new Error("A nova janela não foi aberta em 20 segundos.")
                                );
                            }, 20000);

                            page.once("popup", (newPage) => {
                                clearTimeout(timeout);
                                resolve(newPage);
                            });
                        });

                        await page.click("#windowButton");

                        popup = await popupPromise;

                        await popup.waitForSelector("#sampleHeading", {
                            visible: true,
                        });

                        const text = await popup.$eval(
                            "#sampleHeading",
                            (element) => element.textContent.trim()
                        );

                        if (text !== expectedText) {
                            throw new Error(
                                `Texto incorreto. Esperado: "${expectedText}". Encontrado: "${text}".`
                            );
                        }

                        await popup.close();

                        if (!popup.isClosed()) {
                            throw new Error("A nova janela não foi fechada.");
                        }

                        return {
                            text,
                            popupClosed: true,
                        };
                    } finally {
                        if (browser.connected) {
                            await browser.close();
                        }
                    }
                },
            });

            return config;
        },
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots'
})
