import { ColorsModifiers, GlobalPositions } from '../helpers'

export interface ModalProps {
    position?: GlobalPositions;
    variant?: ColorsModifiers | object;
    'aria-close-label'?: string;
    animation?: string;
    component?: object | (() => any);
    props?: object;
    events?: object;
    'close-icon'?: string;
    'root-class'?: string | (() => any) | string[];
    'close-class'?: string | (() => any) | string[];
    'content-class'?: string | (() => any) | string[];
    'icon-class'?: string | (() => any) | string[];
    'position-class'?: string | (() => any) | string[];
    'variant-class'?: string | (() => any) | string[];
    'wrapper-class'?: string | (() => any) | string[];
}
