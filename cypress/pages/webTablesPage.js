
class WebTablesPage {
    visit() {
        cy.visit("/");
        cy.contains(".card-body h5", "Elements").should("be.visible").click();
        cy.url().should("include", "/elements");
        cy.contains(".element-list .text", "Web Tables")
            .should("be.visible")
            .click();
        cy.url().should("include", "/webtables");
        cy.get("#addNewRecordButton").should("be.visible");
    }

    openRegistrationForm() {
        cy.get("#addNewRecordButton").click();
        cy.get(".modal-content").should("be.visible");
    }

    fillRegistrationForm(user) {
        cy.get("#firstName").clear().type(user.firstName);
        cy.get("#lastName").clear().type(user.lastName);
        cy.get("#userEmail").clear().type(user.email);
        cy.get("#age").clear().type(String(user.age));
        cy.get("#salary").clear().type(String(user.salary));
        cy.get("#department").clear().type(user.department);
    }

    submitRegistration() {
        cy.get("#submit").should("be.visible").and("be.enabled").click();
        cy.get(".modal-content").should("not.exist");
    }

    validateRecord(user) {
        cy.get("table").should("be.visible");

        cy.get("table tbody tr")
            .contains("td", user.email)
            .should("be.visible")
            .closest("tr")
            .within(() => {
                cy.get("td").eq(0).should("have.text", user.firstName);
                cy.get("td").eq(1).should("have.text", user.lastName);
                cy.get("td").eq(2).should("have.text", String(user.age));
                cy.get("td").eq(3).should("have.text", user.email);
                cy.get("td").eq(4).should("have.text", String(user.salary));
                cy.get("td").eq(5).should("have.text", user.department);
            });
    }

    editRecord(user, newDepartment) {
        cy.contains("table tbody tr", user.email)
            .should("be.visible")
            .within(() => {
                cy.get("span[title='Edit']").click();
            });

        cy.get("#department")
            .clear()
            .type(newDepartment);

        cy.get("#submit").click();
        cy.get(".modal-content").should("not.exist");

        cy.contains("table tbody tr", user.email)
            .should("contain.text", newDepartment);
    }
}

module.exports = new WebTablesPage();
