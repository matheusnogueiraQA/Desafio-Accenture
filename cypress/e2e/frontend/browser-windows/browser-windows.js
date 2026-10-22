import {
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";

When(
    "navego da página inicial até Browser Windows e solicito a abertura da nova janela com o texto {string}",
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
