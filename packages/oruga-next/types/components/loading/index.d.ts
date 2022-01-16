import { Plugin } from 'vue';
import Loading from './Loading.vue';
declare const LoadingProgrammatic: {
    open(params: readonly string[] | Readonly<import("vue").ComponentObjectPropsOptions<Record<string, unknown>>>): void;
};
declare const _default: Plugin;
export default _default;
export { LoadingProgrammatic, Loading as OLoading };
