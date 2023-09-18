import OCheckbox from "../Checkbox.vue";

describe("<Checkbox>", () => {
    it("works", () => {
        cy.mount(OCheckbox);
        cy.get("input[type=checkbox]").then((element) => {
            const checkbox = cy.wrap(element);
            checkbox.should("not.have.class", "o-chk__check--checked");
            checkbox.click();
            checkbox.should("have.class", "o-chk__check--checked");
        });
    });
});
