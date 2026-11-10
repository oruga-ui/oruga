Thanks for being interested in contributing to this project!

## Raising an Issue

- Make sure the issue hasn't been raised yet
- Include **screenshots** or animated GIFs in your issue whenever needed (if visual issue)

## Submitting a Pull Request

- Before you start working, it's better to open an issue to discuss first.
- The `master` branch is a snapshot of the latest release. **Submit your PR in the `develop` branch**
- Include **screenshots** or animated GIFs in your pull request whenever needed (if visual changes)
- It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging
- **DO NOT** commit the `lib` and `dist` folder, use it only for testing on your end
- If adding a new feature, provide a convincing reason for it. Ideally open a suggestion issue first and have it greenlighted before working on it.

### PR checklist

Before opening a PR, make sure you can check off each item:

- [ ] Tests written/updated and passing (`npm test`)
- [ ] `npm run gen` run if any props were added or renamed, generated files committed
- [ ] Snapshots updated if the component template changed
- [ ] A documentation example added or updated in `examples/` for any new behaviour
- [ ] TypeScript checks pass (`npm run test:ts`)
- [ ] No `lib` or `dist` files committed

## Principles

### 1. Desktop and Mobile support

It has to work, **and** have great UX on both platforms.

### 2. Lightweight and simple

- Keep it simple.
- Performance is UX, keep it lightweight.
- Avoid HTML-only components, if it doesn't need JavaScript, then it doesn't need Vue (with a few exceptions).

## Commit messages

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) via CI (`commitlint`). PR titles and individual commits on the `develop` branch are both checked.

Format:

```
<type>(<scope>): <short description>
```

Common types:

| Type       | When to use                                  |
| ---------- | -------------------------------------------- |
| `feat`     | New component or user-facing feature         |
| `fix`      | Bug fix                                      |
| `docs`     | Documentation only                           |
| `chore`    | Maintenance, dependency updates, release     |
| `build`    | Build system or dependency changes           |
| `refactor` | Code change that is neither a fix nor a feat |
| `test`     | Adding or updating tests                     |

The scope is usually the component name, e.g. `fix(dropdown): ...` or `feat(table): ...`. Use `*` for cross-cutting changes.

## Branch naming

Use a short prefix matching the change type followed by a brief description:

```
feat/button-loading-state
fix/table-pagination-page
chore/update-vite
```

## Oruga JavaScript styleguide

- Write TypeScript for all new code — avoid `any` where possible.
- Components are written as `<script setup lang="ts">` single-file components.
- Prefer `computed()` over methods for derived values.
- Avoid writing comments that restate what the code does. A comment is only needed when the **why** is non-obvious: a hidden constraint, a subtle invariant, or a browser quirk workaround.

# Development Setup

You need at least [Node.js](http://nodejs.org/) **version 24**.

Clone this repo to your local machine and install the dependencies:

```bash
npm install
```

## Monorepo structure

This repository is an npm workspaces monorepo with three packages:

- `packages/oruga` — the component library (`@oruga-ui/oruga-next`), where almost all development happens
- `packages/docs` — the VitePress documentation site
- `packages/examples` — usage examples

Scripts at the repo root delegate to the relevant packages. Commands like `npx vitest` must be run from inside `packages/oruga` because they rely on that package's config.

## Development server

We use VitePress for rapid development and documenting. To compile the code in watch mode and start a local dev server on [http://localhost:8080](http://localhost:8080) run:

```bash
# build lib and docs in watch mode and launch live server of docs to see the changes
npm run dev
```

## Component structure

### File structure

Create a folder `packages/oruga/src/components/<name>/` with these files:

```
src/components/<name>/
├── <Name>.vue          # component implementation
├── props.ts            # exported TypeScript prop type (<Name>Props)
├── index.ts            # Vue plugin export + re-exports
├── examples/           # documentation examples
└── tests/
    ├── <name>.unit.test.ts
    ├── <name>.browser.test.ts   # only if real-browser behaviour is needed
    └── <name>.axe.test.ts
```

### `props.ts`

Export a single `<Name>Props` type. Each prop should have a JSDoc comment — these are parsed by the codegen scripts to build the configuration type and docs:

```ts
export type ButtonProps = {
    /** Button label */
    label?: string;
    /** Color variant of the control */
    variant?: string;
};
```

### `index.ts` plugin pattern

Every component exports a default that satisfies `OrugaComponentPlugin`, registered via `registerComponent()`:

```ts
import type { App } from "vue";
import MyComponent from "./MyComponent.vue";
import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

export type * from "./props";

export default {
    install(app: App): void {
        registerComponent(app, MyComponent);
    },
} satisfies OrugaComponentPlugin;

export { MyComponent as OMyComponent };
```

### Class-mapping and the styling system

Oruga ships zero styles by default. All CSS classes are resolved through the `defineClasses` composable (`src/composables/defineClasses.ts`). Every class slot in a component is declared as a named tuple:

```ts
[className, defaultClass, suffix?, applyCondition?]
```

- `className` — the config key consumers use to override this class (e.g. `"rootClass"`)
- `defaultClass` — the built-in fallback (e.g. `"o-button"`)
- `suffix` — a reactive string appended to `defaultClass` (e.g. the current `size` or `variant`)
- `applyCondition` — a reactive boolean; the class is omitted when false

Example from `Button.vue`:

```ts
const rootClasses = defineClasses(
    ["rootClass", "o-button"],
    [
        "sizeClass",
        "o-button--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-button--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
);
```

Every class slot must also be declared as a JSDoc-commented prop in `props.ts` so it appears in the configuration type and the docs.

### The `override` prop

Every component **must** accept an `override` prop. When `true`, it replaces all default classes entirely, letting consumers start from a clean slate without having to negate any defaults. Declare it in `props.ts`:

```ts
export type MyComponentProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    // ...rest of props
};
```

And include it in the `withDefaults` call in the component:

```ts
const props = withDefaults(defineProps<MyComponentProps>(), {
    override: undefined,
    // ...
});
```

### Documentation examples

Each component's `examples/` folder is used to generate the live docs. The pages in `packages/docs/pages/components/` are generated from it, so never edit them by hand. After changing a `readme.md`, an `index.md` or a `props.ts` comment, run `npm run gen` and commit the regenerated files. The folder contains:

| File            | Role                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------ |
| `readme.md`     | Intro: what the component is, the APG line, the Field line. No examples.                   |
| `index.md`      | The example page: imports, `###` sections, prose and `<ExampleViewer>`.                    |
| `<topic>.vue`   | One runnable demo for one concept (`base.vue`, `variants.vue`, ...). Listed in `index.md`. |
| `_<name>.vue`   | Helper component used by a demo. Not listed in `index.md`.                                 |
| `inspector.vue` | Class inspector data for the docs. Not listed in `index.md`.                               |

To preview examples locally, start the dev server with `npm run dev` and open the component's page at `http://localhost:8080`.

#### `index.md`

```md
<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";
</script>

### Base

One or two sentences: what the section shows, and when to use it.

<ExampleViewer :component="Base" :code="BaseCode" />
```

- Every demo (except `inspector.vue` and `_`-prefixed helpers) is imported and shown, in page order.
- Every section has prose before the viewer: what it shows and when to use it. A heading must not just restate itself.
- `###` headings use Title Case ("Dynamic Component", "With Icons"). Single words stay as they are.
- Write prose in markdown, not HTML. Put props, slots and events in backticks, and only name ones that exist in `props.ts`.
- Write prop and event names in kebab-case, as in a template (`full-page`), not camelCase. Use camelCase only when the topic is the global config or TypeScript, and say so. Slot names are written exactly as the component defines them (`cancelButton`), because Vue does not normalise slot names.
- Link other components as `/components/<Name>` without `.html`.

#### Page order

Standard components: **Base, States** (disabled, loading, readonly), **Variants, Sizes**, component-specific options, **Icons, Templates** (slots), **Programmatically** (if any). Do not add a States section if there is no state demo of its own.

Overlays (dialog, modal, sidebar, popover, tooltip, dropdown): **Base, Position**, behaviour sections (closing, backdrop, triggers, delay, scrolling), **Templates, Dynamic Component, Teleport, Programmatically**. Teleport always has its own heading.

#### Standard wording

Use these sentences as written, so equal concepts read the same on every page:

- **Variants:** "Different styles can be achieved with the `variant` prop. The available values are defined by your theme. Do not rely on colour alone to convey meaning; add text or an icon as well." Components that also take `variant` on child items (tabs, steps) add one sentence about it.
- **Sizes:** "The component can be displayed in different sizes using the `size` prop. The available values are defined by your theme."
- **Teleport:** "The `teleport` prop allows the <component> to be teleported into any DOM node outside the DOM hierarchy of that component. By default, if only a boolean is passed, the <component> will be teleported to the document body."
- **Programmatically:** one shared paragraph on `useOruga()`, the returned instance and `close()`, what the promise resolves with, and the `onClose` option. Component-specific details follow it.

#### `readme.md`

```md
The **X** component <what it is, in one or two sentences>.

The component implements the W3C ARIA APG [X Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/x/).

Use it with the [Field](/components/Field) component to access all the functionalities.
```

- The APG sentence uses "implements" and appears only if a matching pattern exists. The Field sentence is for form controls only.
- Accessibility guidance lives in one `::: info Accessibility Note` block directly after the Base text in `index.md`, with these bullets (leave out any that do not apply): **Name** (label via Field or `aria-label`), **Keyboard** (the real keys, checked against the component source), **Labels** (the `aria-*-label` props for translation).

#### Demo files

- Use `<script setup lang="ts">`, one root `<section>`, and one concept per file. Use only the public `o-*` components; never import from `@/components/...`. In the displayed code `@/oruga` is rewritten to `@oruga-ui/oruga-next` and `../` is stripped.
- Only pass props that exist in `props.ts`. Components accept unknown attributes, so a wrong prop name does not fail; it silently becomes an HTML attribute.
- Every control has an accessible name: an `o-field` with `label`, or `aria-label`. A placeholder is not a label. A group of checkboxes or radios gets a group name.
- Icon-only buttons and clickable icons have an `aria-label`. Decorative icons stay hidden from assistive technology.
- Labels describe the purpose, not the state ("Newsletter", not `{{ isChecked }}`). Do not convey meaning by colour alone.
- Do not use headings inside demos that clash with the page outline.

When adding a new feature, add or update the relevant example and update `index.md` to include it.

### Register in the barrel files

Add the new component to two barrel files so it is included in the full Oruga build:

**`src/components/index.ts`** — re-export the named exports:

```ts
export * from "./<name>";
```

**`src/components/plugins.ts`** — import the plugin and add it to the exported object:

```ts
import MyComponent from "./<name>";
// add to the export object at the bottom of the file
export { ..., MyComponent };
```

### Run codegen after changing props

After adding or renaming props, run:

```bash
npm run gen
```

This regenerates `src/config.d.ts` (the per-component config types) and `src/globals.d.ts` (Volar/IDE declarations). Always commit the generated files alongside the props change.

## Testing

Tests live in `packages/oruga/src/components/<name>/tests/` alongside each component. There are three test patterns — each serves a distinct purpose:

| Pattern             | Environment                | Tool                           |
| ------------------- | -------------------------- | ------------------------------ |
| `*.unit.test.ts`    | jsdom                      | `@vue/test-utils`              |
| `*.browser.test.ts` | Real Chromium (Playwright) | `vitest-browser-vue`           |
| `*.axe.test.ts`     | jsdom                      | `jest-axe` + `@vue/test-utils` |

### Unit tests (`*.unit.test.ts`)

Use these for rendering, prop behaviour, events, slots, and class-mapping logic. Mount components with `@vue/test-utils`:

```ts
import { mount, enableAutoUnmount } from "@vue/test-utils";
import OButton from "@/components/button/Button.vue";

enableAutoUnmount(afterEach);

describe("OButton", () => {
    it("renders correctly", () => {
        const wrapper = mount(OButton);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
```

Import components using the `@/` alias (maps to `src/`). Always add a `toMatchSnapshot()` render test as the first case — it guards against accidental template regressions.

The global Oruga plugin is pre-registered by `src/__tests__/vitest.setup.ts` via `createTestingOruga()`, so you don't need to install it in individual tests.

### Browser tests (`*.browser.test.ts`)

Use these for behaviour that requires a real browser: focus management, native form validation, resize observers, popover/dialog APIs, real keyboard interaction. Use `vitest-browser-vue`'s `render()` and locator-based queries:

```ts
import { render } from "vitest-browser-vue";
import { userEvent } from "vitest/browser";
import OButton from "../Button.vue"; // relative path, not @/ alias

describe("OButton", () => {
    it("triggers click on Enter", async () => {
        const screen = render(OButton, { props: { label: "Click me" } });
        await userEvent.keyboard("{Enter}");
        expect(screen.getByRole("button")).toBeDefined();
    });
});
```

Note: use **relative imports** in browser tests, not `@/` — the Playwright provider resolves modules differently.

### Accessibility tests (`*.axe.test.ts`)

Use these to catch ARIA violations. Mount with `attachTo: document.body` so axe can traverse the full accessibility tree:

```ts
import { mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import OButton from "@/components/button/Button.vue";
import type { ButtonProps } from "../props";

const a11yCases: { title: string; props?: ButtonProps }[] = [
    { title: "default" },
    { title: "with label", props: { label: "Submit" } },
];

test.each(a11yCases)("$title has no a11y violations", async ({ props }) => {
    const wrapper = mount(OButton, {
        props,
        attachTo: document.body,
    });
    await nextTick();
    expect(await axe(wrapper.element)).toHaveNoViolations();
    wrapper.unmount();
});
```

Form controls (inputs, selects, checkboxes) must be wrapped in `OField` with a label — a bare `<input>` without a label is itself an axe violation and would make every test fail.

### Updating snapshots

Unit tests include a `toMatchSnapshot()` render test for each component. If you intentionally change a component's template, the stored snapshot will be outdated and tests will fail. Update it with:

```bash
cd packages/oruga && npx vitest run --update src/components/<name>
```

Review the diff in `tests/__snapshots__/` before committing to confirm only the expected markup changed.

### Running tests

```bash
# run all tests (unit + browser + axe)
npm run test

# run only unit and axe tests (no Chromium needed)
cd packages/oruga && npx vitest run --project unit

# run only browser tests
cd packages/oruga && npx vitest run --project browser

# run tests for a single component
cd packages/oruga && npx vitest run src/components/button

# run with coverage
npm run test:coverage

# test typescript
npm run test:ts
```

To generate all automatic generated files run:

```bash
# generate docs, types and volar files
npm run gen
```

To build all packages run:

```bash
# build the docs, the examples and the oruga packages
npm run build
```

## Code Style

Don't worry about the code style as long as you install the dev dependencies, you can run the following script to lint your code:

```bash
# lint/format all files
npm run lint
```

## Thanks

Thank you again for being interested in this project! You are awesome!
