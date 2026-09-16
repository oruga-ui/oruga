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

Each component's `examples/` folder is used to generate the live docs. The folder should contain:

- One `.vue` file per scenario (e.g. `base.vue`, `variants.vue`, `sizes.vue`)
- An `index.md` that imports each example and its raw source, then uses the `<ExampleViewer>` doc component to render them side by side

Each `.vue` example file is a self-contained, runnable snippet — avoid importing from private internals; use the public `o-*` components only.

When adding a new feature, add or update the relevant example file and update `index.md` to include it. To preview examples locally, start the dev server with `npm run dev` and navigate to the component's page at `http://localhost:8080`.

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
