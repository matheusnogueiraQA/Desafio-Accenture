import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";

import { faker } from "@faker-js/faker/locale/pt_BR";
import webTablesPage from "../../../pages/webTablesPage";

let user;
let users = [];

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
    webTablesPage.createRecord(user);
});

Then("o registro deve ser exibido na tabela", () => {
    webTablesPage.validateRecord(user);
});

When("altero o departamento do registro cadastrado", () => {
    const newDepartment = "Qualidade";
    webTablesPage.editRecord(user, newDepartment);
    user.department = newDepartment;
});

Then("o departamento atualizado deve ser exibido na tabela", () => {
    webTablesPage.validateRecord(user);
});

When("excluo o registro cadastrado", () => {
    webTablesPage.deleteRecord(user);
});

Then("o registro excluído não deve ser exibido na tabela", () => {
    webTablesPage.validateRecordDoesNotExist(user);
});

When("cadastro 12 registros dinamicamente", () => {
    users = Array.from({ length: 12 }, (_, index) => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `qa_${faker.string.alphanumeric(8).toLowerCase()}_${index + 1}@example.com`,
        age: faker.number.int({ min: 18, max: 65 }),
        salary: faker.number.int({ min: 2000, max: 15000 }),
        department: "Tecnologia",
    }));

    users.forEach((record) => {
        webTablesPage.createRecord(record);
    });
});

Then("os 12 registros devem ser exibidos na tabela", () => {
    users.forEach((record) => {
        webTablesPage.validateRecord(record);
    });
});

When("excluo todos os 12 registros criados", () => {
    users.forEach((record) => {
        webTablesPage.deleteRecord(record);
    });
});

Then("nenhum dos 12 registros deve permanecer na tabela", () => {
    users.forEach((record) => {
        webTablesPage.validateRecordDoesNotExist(record);
    });
});
