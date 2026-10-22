import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";

import progressBarPage from "../../../pages/progressBarPage";

Given("que acesso a página inicial do DemoQA", () => {
    progressBarPage.visitHome();
});

When("seleciono Widgets", () => {
    progressBarPage.openWidgets();
});

When("acesso o submenu Progress Bar", () => {
    progressBarPage.openProgressBar();
});

When("inicio a barra de progresso", () => {
    progressBarPage.start();
});

When("paro a barra antes de atingir 25 por cento", () => {
    progressBarPage.stopBefore(25);
});

Then("o progresso deve ser menor ou igual a 25 por cento", () => {
    progressBarPage.validateProgressAtMost(25);
});

Then("a barra deve permanecer parada", () => {
    progressBarPage.validateProgressIsStopped();
});

When("aperto Start novamente", () => {
    progressBarPage.resume();
});

Then("a barra deve atingir 100 por cento", () => {
    progressBarPage.validateCompleted();
});

When("reseto a barra de progresso", () => {
    progressBarPage.reset();
});

Then("o progresso deve voltar para zero", () => {
    progressBarPage.validateReset();
});
