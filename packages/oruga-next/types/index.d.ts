import { App } from 'vue';
declare const Oruga: {
    install(app: App<any>, options?: {}): void;
};
export default Oruga;
export * from './components';
export { LoadingProgrammatic } from './components/loading';
export { ModalProgrammatic } from './components/modal';
export { NotificationProgrammatic } from './components/notification';
export { Programmatic as ConfigProgrammatic } from './utils/config';
export { useProgrammatic } from './utils/useProgrammatic';
export { Plugin as Config } from './utils/config';
