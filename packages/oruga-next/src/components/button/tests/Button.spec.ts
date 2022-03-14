import { mount } from '@cypress/vue'
import OButton from '../Button.vue'

it('Button', () => {
    mount(OButton, {
        slots: {
            default: {
                render: () => 'Hello Cypress!'
            }
        }
    })

  cy.get('button').contains('Hello Cypress!').click()
})
