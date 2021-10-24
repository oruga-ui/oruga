import { SizesModifiers } from '../helpers'

export interface LoadingProps {
    active?: boolean;
    programmatic?: boolean;
    container?: object | (() => any) | string;
    'full-page'?: boolean;
    animation?: string;
    'can-cancel'?: boolean;
    'on-cancel'?: () => any;
    icon?: string;
    'icon-spin'?: boolean;
    'icon-size'?: SizesModifiers;
    overlay?: boolean;
    'root-class'?: string | (() => any) | string[];
    'overlay-class'?: string | (() => any) | string[];
    'icon-class'?: string | (() => any) | string[];
}
