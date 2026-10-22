import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";

import sortablePage from "../../../pages/sortablePage";

Given("que acesso a página inicial do DemoQA", () => {
    sortablePage.visitHome();
});

When("seleciono Interactions", () => {
    sortablePage.openInteractions();
});

When("acesso o submenu Sortable", () => {
    sortablePage.openSortable();
});

When("desordeno a lista com três movimentos de drag and drop", () => {
    sortablePage.scrambleList();
});

When("ordeno os elementos em ordem crescente com drag and drop", () => {
    sortablePage.sortAscending();
});

Then("os itens devem estar em ordem crescente", () => {
    sortablePage.validateOrder([
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
    ]);
});
