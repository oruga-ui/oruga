import { mount } from '@cypress/vue'
import SimpleCollapse from './SimpleCollapse.vue'


it('Autocomplete', () => {
    mount(SimpleCollapse)
    cy.get('.o-clps__trigger').eq(0).next().find('.o-clps__content').should('be.visible')
    cy.get('.o-clps__trigger').eq(1).click()
    cy.get('.o-clps__trigger').eq(0).next().find('.o-clps__content').should('not.be.visible')
    cy.get('.o-clps__trigger').eq(1).next().find('.o-clps__content').should('be.visible')
})
