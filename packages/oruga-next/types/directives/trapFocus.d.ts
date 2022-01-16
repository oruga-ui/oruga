declare const directive: {
    beforeMount: (el: any, { value }: {
        value?: boolean;
    }) => void;
    beforeUnmount: (el: any) => void;
};
export default directive;
