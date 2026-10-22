import {
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";

When(
    "solicito a abertura de uma nova janela com o texto {string}",
    (expectedText) => {
        cy.task("browserWindows:verifyNewWindow", {
            expectedText,
        }).as("windowResult");
    }
);

Then("devo visualizar o texto {string}", (text) => {
    cy.get("@windowResult")
        .its("text")
        .should("equal", text);
});

Then("devo confirmar que a nova janela foi fechada", () => {
    cy.get("@windowResult")
        .its("popupClosed")
        .should("equal", true);
});