import  { useProgrammatic } from '../utils/useProgrammatic';
const { oruga } = useProgrammatic();

declare module 'vue' {
  interface ComponentCustomProperties {
    $oruga: typeof oruga
  }
}
export {}
