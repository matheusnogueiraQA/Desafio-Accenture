
class PracticeFormPage {
    visit() {
        cy.visit("/");
        cy.contains(".card-body h5", "Forms").should("be.visible").click();
        cy.url().should("include", "/forms");
        cy.contains(".element-list .text", "Practice Form")
            .should("be.visible")
            .click();
        cy.url().should("include", "/automation-practice-form");
    }

    fillFirstName(firstName) {
        cy.get("#firstName").should("be.visible").clear();
        cy.get("#firstName").should("be.visible").and("be.enabled").type(firstName);
    }

    fillLastName(lastName) {
        cy.get("#lastName").should("be.visible").clear();
        cy.get("#lastName").should("be.visible").and("be.enabled").type(lastName);
    }

    fillEmail(email) {
        cy.get("#userEmail").should("be.visible").clear();
        cy.get("#userEmail").should("be.visible").and("be.enabled").type(email);
    }

    selectGender(gender) {
        const genderIds = {
            Male: "#gender-radio-1",
            Female: "#gender-radio-2",
            Other: "#gender-radio-3",
        };

        cy.get(genderIds[gender])
            .should("exist")
            .check({ force: true });
    }

    fillMobile(mobile) {
        cy.get("#userNumber").should("be.visible").clear();
        cy.get("#userNumber").should("be.visible").and("be.enabled").type(mobile);
    }

    fillDateOfBirth() {
        cy.get("#dateOfBirthInput").should("be.visible").click();
        // Seleciona o ano
        cy.get(".react-datepicker__year-select").select("1998");
        // Seleciona o mês: julho = índice 6
        cy.get(".react-datepicker__month-select").select("6");
        // Seleciona o dia 15
        cy.get(
            '.react-datepicker__day--015:not(.react-datepicker__day--outside-month)'
        ).click();
    }

    selectSubject(subject) {
        cy.get("#subjectsInput").type(subject);
        cy.get("#subjectsInput").type("{enter}");
    }

    selectHobby(hobby) {
        const hobbyIds = {
            Sports: "#hobbies-checkbox-1",
            Reading: "#hobbies-checkbox-2",
            Music: "#hobbies-checkbox-3",
        };

        cy.get(hobbyIds[hobby])
            .should("exist")
            .check({ force: true });
    }

    uploadPicture(fileName) {
        cy.get("#uploadPicture").selectFile(`cypress/fixtures/${fileName}`);
    }

    fillAddress(address) {
        cy.get("#currentAddress")
            .should("be.visible")
            .clear();
        cy.get("#currentAddress")
            .should("be.visible")
            .and("be.enabled")
            .type(address);
    }

    selectState(state) {
        cy.get("#state").click();
        cy.get("#state input")
            .should("be.visible")
            .type(state);
        cy.get('[id^="react-select-3-option-"]')
            .should("be.visible")
            .contains(state)
            .click();
        cy.get("#state")
            .should("contain.text", state);
    }

    selectCity(city) {
        cy.get("#city").click({ force: true });
        cy.get("#city input")
            .should("be.visible")
            .type(city);
        cy.get('[id^="react-select-4-option-"]')
            .should("be.visible")
            .contains(city)
            .click();
        cy.get("#city")
            .should("contain.text", city);
    }


    submit() {
        cy.get("#submit").click();
    }

    validateConfirmationModal() {
        cy.get(".modal-content").should("be.visible");
        cy.get("#example-modal-sizes-title-lg")
            .should("contain.text", "Thanks for submitting the form");
    }

    validateField(field, value) {
        cy.get(".modal-content")
            .should("contain.text", field)
            .and("contain.text", value);
    }

    closeModal() {
        cy.get("#closeLargeModal").click();
    }
}

export default new PracticeFormPage();
