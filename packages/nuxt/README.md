# @oruga-ui/nuxt

Nuxt module for using [Oruga](https://oruga-ui.com), a Vue 3 component library
that is independent of any CSS framework.

## Installation

```bash
npx nuxt module add @oruga-ui/nuxt
```

Or install it with your package manager and add `@oruga-ui/nuxt` to the
`modules` array in `nuxt.config.ts`.

## Usage

Components and composables are auto-imported by default:

```vue
<template>
  <OButton>Save</OButton>
</template>
```

Configure Oruga in `nuxt.config.ts` with serializable options:

```ts
export default defineNuxtConfig({
  modules: ['@oruga-ui/nuxt'],
  'oruga-ui': {
    config: {
      iconPack: 'mdi',
      locale: 'en-US',
      useHtml5Validation: true,
    },
  },
})
```

The module supports `iconPack`, `locale`, `override`, `useHtml5Validation`,
`statusIcon`, `mobileBreakpoint`, `customIconPacks`, and `statusVariantIcon`
under `oruga-ui.config`. Function-valued settings such as `invalidHandler`,
`transformClasses`, and `iconComponent` cannot be passed through Nuxt runtime
config; set those from a Nuxt plugin with `useConfigProgrammatic().setConfig()`.
The module uses `body` as the default teleport target for consistent SSR and
hydration.

To limit component auto-imports, pass a list of exported Oruga component names.
Set `components: false` to disable them. Set `composables: false` to disable
auto-imports for `useOruga`, `useConfigProgrammatic`, and the programmatic
component composables.

Oruga does not impose a CSS framework or theme. Add the CSS/theme appropriate
for your application separately; see the [Oruga documentation](https://oruga-ui.com).

## Development

From the monorepo root:

```bash
npm install
npm run dev:prepare --workspace @oruga-ui/nuxt
npm run dev:nuxt
npm run test:nuxt
npm run build:nuxt
```
