import SimpleAutocomplete from './SimpleAutocomplete.vue'

describe('<Autocomplete>', () => {
    it('works', () => {
        cy.mount(SimpleAutocomplete)
        cy.get('input').click().type('j')
        cy.get('input').type('{downarrow}{downarrow}{enter}')
        cy.get('input').should('have.value', 'Node.js')
    })
})