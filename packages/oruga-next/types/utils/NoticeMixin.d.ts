declare const _default: {
    props: {
        /** Type (color) of the notification, optional. */
        type: {
            type: StringConstructor;
        };
        /** Message text (can contain HTML). */
        message: (ArrayConstructor | StringConstructor)[];
        /** Visibility duration in miliseconds. */
        duration: {
            type: NumberConstructor;
            default: any;
        };
        /** If should queue with others notices (snackbar/toast/notification). */
        queue: {
            type: BooleanConstructor;
            default: any;
        };
        /** Show the Notification indefinitely until it is dismissed when programmatically. */
        indefinite: {
            type: BooleanConstructor;
            default: boolean;
        };
        /** Which position the notification will appear when programmatically. */
        position: {
            type: StringConstructor;
            default: string;
            validator(value: any): boolean;
        };
        /** DOM element the toast will be created on. Note that this also changes the position of the toast from fixed to absolute. Meaning that the container should be fixed. */
        container: {
            type: StringConstructor;
            default: any;
        };
        /** Callback function to call after close (programmatically close or user canceled) */
        onClose: {
            type: FunctionConstructor;
            default: () => void;
        };
    };
    data(): {
        isActive: boolean;
        parentTop: any;
        parentBottom: any;
        newDuration: any;
        newContainer: any;
    };
    computed: {
        correctParent(): any;
        transition(): {
            enter: string;
            leave: string;
        };
    };
    methods: {
        shouldQueue(): boolean;
        close(): void;
        showNotice(): void;
        setupContainer(): void;
        timeoutCallback(): any;
    };
    beforeMount(): void;
    mounted(): void;
};
export default _default;
