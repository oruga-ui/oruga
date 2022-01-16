declare function bind(el: any, { value }: {
    value: any;
}): void;
declare function update(el: any, { value }: {
    value: any;
}): void;
declare function unbind(el: any): void;
declare const directive: {
    beforeMount: typeof bind;
    beforeUpdate: typeof update;
    beforeUnmount: typeof unbind;
    instances: any[];
};
export default directive;
