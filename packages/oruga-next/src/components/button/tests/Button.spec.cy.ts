import OButton from "../Button.vue";

describe("<Button>", () => {
    it("works", () => {
        cy.mount(OButton, {
            slots: {
                default: {
                    render: () => "Hello Cypress!",
                },
            },
        });
        cy.get("button").contains("Hello Cypress!").click();
    });
});
