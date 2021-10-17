import * from '../helpers'

export interface Loading {
    active?: boolean;
    programmatic?: boolean;
    container?: any ;  ///////////////
    fullPage?: boolean;
    animation?: string;
    canCancel?: boolean;
    onCancel?: any; /////////////
    icon?: string;
    iconSpin?: boolean;
    iconSize?: string; ////////////////
    overlay?: boolean;
}

//  /** Whether modal is active or not,  use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
// active: Boolean,
// programmatic: Boolean,
// container: [Object, Function, HTMLElement],
// /** Loader will overlay the full page */
// fullPage: {
//     type: Boolean,
//     default: true
// },
// /* Custom animation (transition name) */
// animation: {
//     type: String,
//     default: () => { return getValueByPath(getOptions(), 'loading.animation', 'fade') }
// },
// /** Can close Loading by pressing escape or clicking outside */
// canCancel: {
//     type: Boolean,
//     default: false
// },
// /** Callback function to call after user canceled (pressed escape / clicked outside) */
// onCancel: {
//     type: Function,
//     default: () => {}
// },
// /** Icon name */
// icon: {
//     type: String,
//     default: () => { return getValueByPath(getOptions(), 'loading.icon', 'loading') }
// },
// /** Enable spin effect on icon */
// iconSpin: {
//     type: Boolean,
//     default: true
// },
// iconSize: {
//     type: String,
//     default: 'medium'
// },
// overlay: {
//     type: Boolean,
//     default: true
// },
// rootClass: [String, Function, Array],
// overlayClass: [String, Function, Array],
// iconClass: [String, Function, Array]