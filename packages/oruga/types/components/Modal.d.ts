export interface Modal {
	
}

//  /** Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
// active: Boolean,
// /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
// component: [Object, Function],
// /** Text content */
// content: String,
// /** Close button text content */
// closeButtonContent: {
//     type: String,
//     default: '✕'
// },
// programmatic: Boolean,
// /** Props to be binded to the injected component */
// props: Object,
//  /** Events to be binded to the injected component */
// events: Object,
// /** Width of the Modal */
// width: {
//     type: [String, Number],
//     default: () => {
//         return getValueByPath(getOptions(), 'modal.width', 960)
//     }
// },
// /** Enable custom style on modal content */
// custom: Boolean,
// /** Custom animation (transition name) */
// animation: {
//     type: String,
//     default: () => {
//         return getValueByPath(getOptions(), 'modal.animation', 'zoom-out')
//     }
// },
// /**
//  * Can close Modal by clicking 'X', pressing escape or clicking outside
//  * @values escape, x, outside, button
//  */
// canCancel: {
//     type: [Array, Boolean],
//     default: () => {
//         return getValueByPath(getOptions(), 'modal.canCancel', ['escape', 'x', 'outside', 'button'])
//     }
// },
// /** Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside) */
// onCancel: {
//     type: Function,
//     default: () => {}
// },
// /** Callback function to call after close (programmatically close or user canceled) */
// onClose: {
//     type: Function,
//     default: () => {}
// },
// /**
//  * clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts
//  * @values keep, clip
//  */
// scroll: {
//     type: String,
//     default: () => {
//         return getValueByPath(getOptions(), 'modal.scroll', 'keep')
//     }
// },
// /** Display modal as full screen */
// fullScreen: Boolean,
// /** Trap focus inside the modal. */
// trapFocus: {
//     type: Boolean,
//     default: () => {
//         return getValueByPath(getOptions(), 'modal.trapFocus', true)
//     }
// },
// ariaRole: {
//     type: String,
//     validator: (value) => {
//         return [ 'dialog', 'alertdialog' ].indexOf(value) >= 0
//     }
// },
// ariaModal: Boolean,
// ariaLabel: String,
// /** Destroy modal on hide */
// destroyOnHide: {
//     type: Boolean,
//     default: () => {
//         return getValueByPath(getOptions(), 'modal.destroyOnHide', true)
//     }
// },
// /** Automatically focus modal when active */
// autoFocus: {
//     type: Boolean,
//     default: () => {
//         return getValueByPath(getOptions(), 'modal.autoFocus', true)
//     }
// },
// /** Icon name */
// closeIcon: {
//     type: String,
//     default: () => {
//         return getValueByPath(getOptions(), 'modal.closeIcon', 'times')
//     }
// },
// closeIconSize: {
//     type: String,
//     default: 'medium'
// },
// rootClass: [String, Function, Array],
// overlayClass: [String, Function, Array],
// contentClass: [String, Function, Array],
// closeClass: [String, Function, Array],
// fullScreenClass: [String, Function, Array],
// mobileClass: [String, Function, Array],