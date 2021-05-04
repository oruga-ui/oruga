import { shallowMount } from '@vue/test-utils'
import NoticeMixin from '@utils/NoticeMixin'

let wrapper

describe('NoticeMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="o-component"></div>'
        }
        wrapper = shallowMount(component, {
            attachToDocument: true,
            mixins: [NoticeMixin]
        })
    })

    it('is active', () => {
        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('returns correct transition depending on position', () => {
        const topTransition = {
            enter: 'fadeInDown',
            leave: 'fadeOut'
        }
        const bottomTransition = {
            enter: 'fadeInUp',
            leave: 'fadeOut'
        }
        const expected = {
            'top': topTransition,
            'top-right': topTransition,
            'top-left': topTransition,
            'bottom': bottomTransition,
            'bottom-right': bottomTransition,
            'bottom-left': bottomTransition
        }
        for (let [key, value] of Object.entries(expected)) {
            wrapper.setProps({position: key})
            expect(wrapper.vm.transition).toEqual(value)
        }

        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('reset isActive on close', () => {
        wrapper.vm.close()
        expect(wrapper.vm.isActive).toBeFalsy()
    })
})
