class ProgressBarPage {
    visitHome() {
        cy.visit("/");
        cy.contains(".card-body h5", "Widgets").should("be.visible");
    }

    openWidgets() {
        cy.contains(".card-body h5", "Widgets").click();
        cy.url().should("include", "/widgets");
    }

    openProgressBar() {
        cy.contains(".element-list .text", "Progress Bar").click();
        cy.url().should("include", "/progress-bar");
        cy.get("#progressBar").should("be.visible");
        cy.get("#progressBar [role='progressbar']")
            .should("exist")
            .and("have.attr", "aria-valuenow", "0");
        cy.get("#startStopButton").should("be.visible");
    }

    start() {
        cy.get("#startStopButton").should("have.text", "Start").click();
        cy.get("#startStopButton").should("have.text", "Stop");
    }

    stopBefore(limit) {
        // Para com margem para evitar que o clique ultrapasse o limite.
        const safeLimit = Math.max(1, limit - 5);

        cy.get("#progressBar [role='progressbar']").should(($bar) => {
            const value = Number($bar.attr("aria-valuenow"));
            expect(value).to.be.greaterThan(0);
            expect(value).to.be.lessThan(safeLimit);
        });

        cy.get("#startStopButton").should("have.text", "Stop").click();
        cy.get("#startStopButton").should("have.text", "Start");
    }

    validateProgressAtMost(limit) {
        cy.get("#progressBar [role='progressbar']").should(($bar) => {
            const value = Number($bar.attr("aria-valuenow"));
            expect(value).to.be.greaterThan(0);
            expect(value).to.be.at.most(limit);
        });
    }

    validateProgressIsStopped() {
        cy.get("#progressBar [role='progressbar']")
            .invoke("attr", "aria-valuenow")
            .then((valueWhenStopped) => {
                cy.wait(300);
                cy.get("#progressBar [role='progressbar']")
                    .should("have.attr", "aria-valuenow", valueWhenStopped);
            });
    }

    resume() {
        cy.get("#startStopButton").should("have.text", "Start").click();
        cy.get("#startStopButton").should("have.text", "Stop");
    }

    validateCompleted() {
        const progressBar = "#progressBar [role='progressbar']";

        cy.get(progressBar, { timeout: 15000 })
            .should("have.attr", "aria-valuenow", "100");
        cy.get("#resetButton").should("be.visible").and("have.text", "Reset");

        // Aguarda o último ciclo da animação terminar antes de acionar Reset.
        cy.wait(300);
        cy.get(progressBar).should("have.attr", "aria-valuenow", "100");
    }

    reset() {
        cy.get("#resetButton").should("be.visible").click();
    }

    validateReset() {
        cy.get("#progressBar [role='progressbar']", { timeout: 1000 })
            .should("have.attr", "aria-valuenow", "0")
            .and("contain.text", "0%");
        cy.get("#startStopButton").should("have.text", "Start");
        cy.wait(300);
        cy.get("#progressBar [role='progressbar']")
            .should("have.attr", "aria-valuenow", "0");
    }
}

module.exports = new ProgressBarPage();
