import MyModule from '../../../src/module'

export default defineNuxtConfig({
  'modules': [
    MyModule,
  ],
  'oruga-ui': {
    config: {
      iconPack: 'test-pack',
      locale: 'en-US',
    },
    components: ['OButton', 'OInput'],
  },
})
