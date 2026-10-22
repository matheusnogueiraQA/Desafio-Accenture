const LIST_ITEMS = "#demo-tabpane-list .list-group-item";

class SortablePage {
    visitHome() {
        cy.visit("/");
        cy.contains(".card-body h5", "Interactions").should("be.visible");
    }

    openInteractions() {
        cy.contains(".card-body h5", "Interactions").click();
        cy.url().should("include", "/interaction");
    }

    openSortable() {
        cy.contains(".element-list .text", "Sortable").click();
        cy.url().should("include", "/sortable");
        cy.get("#demo-tab-list").should("have.attr", "aria-selected", "true");
        cy.get(LIST_ITEMS).should("have.length", 6);
    }

    scrambleList() {
        this.dragItemToPosition(0, 5, "after");
        this.validateOrder(["Two", "Three", "Four", "Five", "Six", "One"]);

        this.dragItemToPosition(2, 0, "before");
        this.validateOrder(["Four", "Two", "Three", "Five", "Six", "One"]);

        this.dragItemToPosition(5, 2, "before");
        this.validateOrder(["Four", "Two", "One", "Three", "Five", "Six"]);
    }

    sortAscending() {
        this.dragItemToPosition(2, 0, "before");
        this.validateOrder(["One", "Four", "Two", "Three", "Five", "Six"]);

        this.dragItemToPosition(2, 1, "before");
        this.validateOrder(["One", "Two", "Four", "Three", "Five", "Six"]);

        this.dragItemToPosition(3, 2, "before");
        this.validateOrder(["One", "Two", "Three", "Four", "Five", "Six"]);
    }

    dragItemToPosition(sourceIndex, targetIndex, position) {
        cy.window().then((window) => {
            const dataTransfer = new window.DataTransfer();

            cy.get(LIST_ITEMS).eq(sourceIndex).then(($source) => {
                const sourceRect = $source[0].getBoundingClientRect();
                const sourceX = sourceRect.left + sourceRect.width / 2;
                const sourceY = sourceRect.top + sourceRect.height / 2;

                cy.wrap($source).trigger("dragstart", {
                    dataTransfer,
                    eventConstructor: "DragEvent",
                    clientX: sourceX,
                    clientY: sourceY,
                    force: true,
                });

                cy.get(LIST_ITEMS).eq(targetIndex).then(($target) => {
                    const targetRect = $target[0].getBoundingClientRect();
                    const targetX = targetRect.left + targetRect.width / 2;
                    const targetY = position === "after"
                        ? targetRect.bottom - 2
                        : targetRect.top + 2;
                    const dragEventOptions = {
                        dataTransfer,
                        eventConstructor: "DragEvent",
                        clientX: targetX,
                        clientY: targetY,
                        force: true,
                    };

                    cy.wrap($target).trigger("dragenter", dragEventOptions);
                    cy.wrap($target).trigger("dragover", dragEventOptions);
                    cy.wrap($target).trigger("drop", dragEventOptions);
                    cy.wrap($source).trigger("dragend", {
                        dataTransfer,
                        eventConstructor: "DragEvent",
                        clientX: targetX,
                        clientY: targetY,
                        force: true,
                    });
                });
            });
        });
    }

    validateOrder(expectedOrder) {
        cy.get(LIST_ITEMS).should(($items) => {
            const actualOrder = [...$items].map((item) => item.textContent.trim());
            expect(actualOrder).to.deep.equal(expectedOrder);
        });
    }
}

module.exports = new SortablePage();
