import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";

import { faker } from "@faker-js/faker/locale/pt_BR";
import webTablesPage from "../../../pages/webTablesPage";

let user;

Given("que acesso a página Web Tables", () => {
    user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 65 }),
        salary: faker.number.int({ min: 2000, max: 15000 }),
        department: "Tecnologia",
    };

    webTablesPage.visit();
});

When("cadastro um novo registro com dados válidos", () => {
    webTablesPage.openRegistrationForm();
    webTablesPage.fillRegistrationForm(user);
    webTablesPage.submitRegistration();

    cy.get(".modal-content").should("not.exist");
});

Then("o registro deve ser exibido na tabela", () => {
    webTablesPage.validateRecord(user);
});