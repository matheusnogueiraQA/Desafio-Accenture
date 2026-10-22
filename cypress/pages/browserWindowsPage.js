class BrowserWindowsPage {
    visit() {
        cy.visit("/browser-windows");
    }

    openNewWindow() {
        cy.window().then((window) => {
            cy.stub(window, "open").as("openWindow");
        });
        cy.contains("button", "New Window").click();
        cy.get("@openWindow").should(
            "have.been.called"
        );
    }

    validateNewWindowContent(text) {
        cy.get("@openWindow").then((openWindow) => {
            const destination = openWindow.firstCall.args[0];
            expect(destination).to.be.a("string").and.not.be.empty;
            cy.visit(destination);
            cy.get("#sampleHeading")
                .should("be.visible")
                .and("have.text", text);
        });
    }
}

module.exports = new BrowserWindowsPage();