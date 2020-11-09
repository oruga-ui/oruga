import { shallowMount } from '@vue/test-utils'
import ODialog from '@components/dialog/Dialog'
import config, {setOptions} from '@utils/config'

let wrapper

describe('ODialog', () => {
  HTMLElement.prototype.focus = jest.fn()
  beforeEach(() => {
    wrapper = shallowMount(ODialog, {
      attachToDocument: true
    })
  })

  it('is called', () => {
    expect(wrapper.name()).toBe('ODialog')
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('gives focus to the input element if it contains one', (done) => {
    wrapper.setProps({ hasInput: true })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$refs.input.focus).toHaveBeenCalled()
      done()
    })
  })

  it('manage default config props values', () => {
    setOptions(Object.assign(config, {
      defaultDialogConfirmText: 'foo',
      defaultDialogCancelText: 'bar'
    }))
    wrapper = shallowMount(ODialog)

    expect(wrapper.vm.confirmText).toEqual(config.defaultDialogConfirmText)
    expect(wrapper.vm.cancelText).toEqual(config.defaultDialogCancelText)
  })

  it('manage props validator', () => {
    const ariaRole = wrapper.vm.$options.props.ariaRole

    expect(ariaRole.type).toBe(String)
    expect(ariaRole.validator && ariaRole.validator('d')).toBeFalsy()
    expect(ariaRole.validator && ariaRole.validator('dialog')).toBeTruthy()
    expect(ariaRole.validator && ariaRole.validator('alertdialog')).toBeTruthy()
  })

  it('manage icons', () => {
    wrapper.setProps({ variant: 'info' })
    expect(wrapper.vm.iconByVariant).toBe('information')

    wrapper.setProps({ variant: 'success' })
    expect(wrapper.vm.iconByVariant).toBe('check-circle')

    wrapper.setProps({ variant: 'warning' })
    expect(wrapper.vm.iconByVariant).toBe('alert')

    wrapper.setProps({ variant: 'danger' })
    expect(wrapper.vm.iconByVariant).toBe('alert-circle')

    wrapper.setProps({ variant: 'primary' })
    expect(wrapper.vm.iconByVariant).toBeNull()
  })

  it('close on confirm', () => {
    wrapper.setProps({ onConfirm: jest.fn() })
    wrapper.vm.confirm()
    expect(wrapper.vm.isActive).toBeFalsy()
    expect(wrapper.vm.onConfirm).toHaveBeenCalled()
  })

  it('closeOnConfirm prop equals false', () => {
    wrapper.setProps({ onConfirm: jest.fn(), closeOnConfirm: false })
    wrapper.vm.confirm()
    expect(wrapper.vm.isActive).toBeTruthy()
    expect(wrapper.vm.onConfirm).toHaveBeenCalled()
  })
})
