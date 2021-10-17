import * from '../helpers'

export interface Modal {
    position?: string;
    variant?: string | object; ////////////////
    ariaCloseLabel?: string;
    animation?: string;
    component?: object | Function; ////////////
    props?: object;
    events?: object;
    closeIcon?: string;
    rootClass?: any; ///////////////
    closeClass?: any; ///////////////
    contentClass?: any; ///////////////
    iconClass?: any; ///////////////
    positionClass?: any; ///////////////
    variantClass?: any; ///////////////
    wrapperClass?: any; ///////////////
    
}

//  /**
// * Which position the notification will appear when programmatically
// * @values top-right, top, top-left, bottom-right, bottom, bottom-left
// */
// position: String,
// /**
// * Color of the control, optional
// * @values primary, info, success, warning, danger, and any other custom color
// */
// variant: [String, Object],
// /**
//  * Label for the close button, to be read by accessibility screenreaders.
//  */
// ariaCloseLabel: String,
// /**
//  * Custom animation (transition name).
//  */
// animation: {
//     type: String,
//     default: 'fade'
// },
// * Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') 
// component: [Object, Function],
// /** Props to be binded to the injected component */
// props: Object,
// /** Events to be binded to the injected component */
// events: Object,
// /** Close icon name */
// closeIcon: {
//     type: String,
//     default: () => {
//         return getValueByPath(getOptions(), 'notification.closeIcon', 'times')
//     }
// },
// rootClass: [String, Function, Array],
// closeClass: [String, Function, Array],
// contentClass: [String, Function, Array],
// iconClass: [String, Function, Array],
// positionClass: [String, Function, Array],
// variantClass: [String, Function, Array],
// wrapperClass: [String, Function, Array],