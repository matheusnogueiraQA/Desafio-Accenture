
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import practiceFormPage from "../../pages/practiceFormPage";

let formData;

Given("que acesso o formulário de prática", () => {
    formData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        gender: "Male",
        mobile: faker.string.numeric(10),
        dateOfBirth: "15 Jul 1998",
        subject: "Maths",
        hobby: "Reading",
        address: faker.location.streetAddress(),
        state: "NCR",
        city: "Delhi",
    };

    practiceFormPage.visit();
});

When("preencho todos os campos obrigatórios", () => {
    practiceFormPage.fillFirstName(formData.firstName);
    practiceFormPage.fillLastName(formData.lastName);
    practiceFormPage.fillEmail(formData.email);
    practiceFormPage.selectGender(formData.gender);
    practiceFormPage.fillMobile(formData.mobile);
    practiceFormPage.fillDateOfBirth(formData.dateOfBirth);
    practiceFormPage.selectSubject(formData.subject);
    practiceFormPage.selectHobby(formData.hobby);
    practiceFormPage.fillAddress(formData.address);
    practiceFormPage.selectState(formData.state);
    practiceFormPage.selectCity(formData.city);
});

When("envio o formulário", () => {
    practiceFormPage.submit();
});

Then("devo visualizar o modal de confirmação", () => {
    practiceFormPage.validateConfirmationModal();
});

Then(
    "os dados exibidos devem corresponder aos dados enviados",
    () => {
        practiceFormPage.validateField(
            "Student Name",
            `${formData.firstName} ${formData.lastName}`
        );

        practiceFormPage.validateField("Student Email", formData.email);
        practiceFormPage.validateField("Gender", formData.gender);
        practiceFormPage.validateField("Mobile", formData.mobile);
        practiceFormPage.validateField("Date of Birth", "15 July,1998");
        practiceFormPage.validateField("Subjects", formData.subject);
        practiceFormPage.validateField("Hobbies", formData.hobby);
        practiceFormPage.validateField("Address", formData.address);
        practiceFormPage.validateField("State and City", "NCR Delhi");
    }
);

When("fecho o modal de confirmação", () => {
    practiceFormPage.closeModal();
});

Then("o modal deve ser fechado", () => {
    cy.get(".modal").should("not.have.class", "show");
});
