import { SizesModifiers } from '../helpers'

export interface ModalProps {
    active?: boolean;
    component?: object | (() => any);	
    content?: string;
    'close-button-content'?: string;
    programmatic?: boolean;
    props?: object;
    events?: object;
    width?: string | number;
    custom?: boolean;
    animation?: string;
    'can-cancel'?: [] | boolean;
    'on-cancel'?: () => any;
    'on-close'?: () => any;
    scroll?: string;
    'full-screen'?: boolean;
    'trap-focus'?: boolean;
    'aria-role'?: string;
    'aria-modal'?: boolean;
    'aria-label'?: string;
    'destroy-on-hide'?: boolean;
    'auto-focus'?: boolean;
    'close-icon'?: string;
    'close-icon-size'?: SizesModifiers;
    'root-class'?: string | (() => any) | string[];
    'overlay-class'?: string | (() => any) | string[];
    'content-class'?: string | (() => any) | string[];
    'close-class'?: string | (() => any) | string[];
    'full-screen-class'?: string | (() => any) | string[];
    'mobile-class'?: string | (() => any) | string[];
}
