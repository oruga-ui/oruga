import type InstanceRegistry from "@/utils/InstanceRegistry";
import type { ComponentInternalInstance } from "vue";

export interface OrugaProgrammatic {
    [key: string]: Record<string, any>;
}

/** @deprecate **/
export interface ProgrammaticInstance<T = ComponentInternalInstance> {
    instances: InstanceRegistry<T>;
    /** Promise resolve function */
    resolve?: (...args: any[]) => void;
    /** Promise reject function */
    reject?: (...args: any[]) => void;
}

/**
 * @deprecated
 * Pollyfill for the InstanceType of programmatic components,
 * because the exposed data isn't included.
 */
export interface ProgrammaticExpose {
    close(...args: any[]): void;
    promise: Promise<void>;
}
