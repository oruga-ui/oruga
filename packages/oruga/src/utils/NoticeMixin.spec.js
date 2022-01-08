import { shallowMount } from '@vue/test-utils'
import NoticeMixin from '@utils/NoticeMixin'
import BaseComponentMixin from '@utils/BaseComponentMixin'

let wrapper

describe('NoticeMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="o-component"></div>',
            methods: {
                rootClasses() { return ['o-notices']},
                positionClasses(position) {return ['o-notices--' + position]}
            }
        }
        wrapper = shallowMount(component, {
            mixins: [BaseComponentMixin, NoticeMixin]
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

    it('reset isActive on close', async () => {
        wrapper.vm.close()
        await new Promise(resolve => setTimeout(resolve, 200));
        expect(wrapper.vm.isActive).toBeFalsy()
    })
})
