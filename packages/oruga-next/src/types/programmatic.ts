import type InstanceRegistry from "@/utils/InstanceRegistry";

export interface OrugaProgrammatic {
    [key: string]: Record<string, any>;
}

export interface ProgrammaticInstance<T> {
    instances: InstanceRegistry<T>;
    /** Promise resolve function */
    resolve?: (...args: any[]) => void;
    /** Promise reject function */
    reject?: (...args: any[]) => void;
}
