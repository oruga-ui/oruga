import { mount } from '@cypress/vue'
import SimpleAutocomplete from './SimpleAutocomplete.vue'


it('Autocomplete', () => {
    mount(SimpleAutocomplete)
    cy.get('input').click().type('j')
    cy.get('input').type('{downarrow}{downarrow}{enter}')
    cy.get('input').should('have.value', 'Node.js')
})
