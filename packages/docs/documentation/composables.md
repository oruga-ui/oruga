# Composable

Besides the main Vue plugin and the components, Oruga provides a programmatic composable `useOruga()`, which can be used to access the config as well as any registered programmatic component interfaces. A programmatic component interface will be registered when using the main plugin or the individual component plugin for a component with a programmatic interface.

The composable can be imported by:

```typescript
import { useOruga } from "@oruga-ui/oruga-next";
```

## Programmatic Config {#config}

The `config` interface can be used to customise the Oruga [global configuration](/documentation/configuration) by overriding the `Config` object programmatically:

```typescript
import { useOruga, type OrugaOptions } from '@oruga-ui/oruga-next';

const oruga = useOruga();

// get the current config
const config = oruga.config.getOptions();

// modify the config object
const myThemeConfig: OrugaOptions = {
    ...config,
    autocomplete: {
        rootClass: 'autocomplete-root',
        itemClass: 'autocomplete-item',
        ...
    }
}

// update the config
oruga.config.setOptions(myThemeConfig);
```

However, you can also customise each component by using the dedicated `useProgrammaticConfig` composable, which provides the same functionality as the interface provided by the main `useOruga()` composable:

```typescript
import { useProgrammaticConfig, type OrugaOptions } from '@oruga-ui/oruga-next';

// get the current config
const config = useProgrammaticConfig().getOptions();

// modify the config object
const myThemeConfig: OrugaOptions = {
    ...config,
    autocomplete: {
        rootClass: 'autocomplete-root',
        itemClass: 'autocomplete-item',
        ...
    }
}

// update the config
useProgrammaticConfig().setOptions(myThemeConfig);
```

### Config Plugin {#configplugin}

If you use individual component plugins instead of the default main Oruga plugin, the programmatic config interface will **not** be registered to the `useOruga()` composable by default.
Therefore, you can make the config interface available by adding the special `OrugaConfig` plugin. As a second parameter you can also pass an optional config object like the main Oruga plugin.

```typescript
import { createApp } from 'vue';
import { Autocomplete, Sidebar, OrugaConfig, useOruga } from '@oruga-ui/oruga-next';

const myConfig = { ... };

createApp(...)
    // register individual components by using their dedicated vue plugin
    .use(Autocomplete)
    .use(Sidebar)
    // register the global oruga config plugin
    .use(OrugaConfig, myConfig);

const oruga = useOruga();

// now this is available
const config = oruga.config.getOptions();

config.setOption("autocomplete", {
    rootClass: 'autocomplete-root',
    itemClass: 'autocomplete-item',
    ...
});

config.setOption("sidebar", { ... });
```

## Programmatic Components {#components}

Some components come with their own programmatic interface. These interfaces are implemented using a factory pattern and are registered and added to the main `useOruga()` composable when using the default main Oruga plugin or the individual component plugin.

> **_Note:_** The programmatic interfaces will not be added if you only use the component itself and not its dedicated plugin.

List of components with an programmatic interface:

- [`Loading`](/components/Loading.html#programmatically)
- [`Modal`](/components/Modal.html#programmatically)
- [`Notification`](/components/Notification.html#programmatically)
- [`Sidebar`](/components/Sidebar.html#programmatically)

You can access each component's programmatic interface using the main `useOruga()` composable.
To create a new instance of the component, you need to call the `open()` function from the component factory registered in the `useOruga()` composable. The open function takes two arguments. First, an object with the props of the individual component, and second, a target where the component should be mounted into.

```typescript
import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

const target = document.body;

oruga.sidebar.open(
    // component props and events
    {
        component: MyCoolComponent,
        fullheight: true,
        overlay: true,
    },
    // target container the programmatic component get rendered into
    target,
);
```

You can also create a new programmatic component factory for a component with a programmatic interface, by using the components composable directly. This creates a new programmatic component factory with its own component registry, similar to the one added to the object provided by the main `useOruga()` composable.
For example:

```typescript
import { useNotificationProgrammatic } from "@oruga-ui/oruga-next";

// create a new porgrammatic component factory
// and open a new notification component
useNotificationProgrammatic().open({
    duration: 5000,
    message: "You did a greate job!",
    variant: "info",
    position: "top",
    closeable: true,
});
```

### Programmatic Interface {#interface}

The factory type for each component with an programmatic interface looks like this:

```typescript
type ProgrammaticInterface = {
    /** Returns the number of registered active instances. */
    count: () => number;
    /**
     * Create a new programmatic component instance.
     * The options argument depend on the component.
     * The target specifies the element the component get rendered into - default is `document.body`.
     */
    open: (
        options: Record<string, any>,
        target?: MaybeRefOrGetter<string | HTMLElement | null>,
    ) => ProgrammaticExpose;
    /**
     * Close the last registred instance in the programmatic instance registry.
     * Any arguments which get passed to the exposed `close()` function of the component.
     */
    close: (...args: unknown[]) => void;
    /**
     * Close all instances in the programmatic instance registry.
     * Any arguments which get passed to the exposed `close()` function of the component.
     */
    closeAll: (...args: unknown[]) => void;
};

type ProgrammaticExpose = {
    /** Call the close event of the component. */
    close: (...args: unknown[]) => void;
    /** Promise which get resolved on the close event. */
    promise: Promise<unknown>;
};
```

## Component Programmatic {#programmatic}

Oruga comes with a component that is only available programmatically. This component can be used to mount **any** custom component programmatically, using the [Vue render function](https://vuejs.org/api/render-function.html#render-function-apis) and [Creating Vnodes](https://vuejs.org/guide/extras/render-function.html#render-function-recipes).

The component works like this:
The programmatic component creates a new, separate Vue instance, with a wrapper component as root element.
The new Vue instance can be seen in the [Vue Devtools](https://devtools.vuejs.org/) with the name `ProgrammaticApp`.
The separate Vue instance will have the same context object as the current one and will be rendered into a `div` in the target DOM container (by default, it is rendered into the `body` element).
The provided component is then rendered into the wrapper component, which handles the Vue lifecycle events of the provided component.
Closing the instance of the wrapper component, for example by calling `oruga.programmatic.close()` from outside, or by firing a `close` event from inside the provided component, will destroy the wrapper component and the new Vue instance, and clean up the DOM.

> **_Note:_** For performance reasons, be careful not to open too many programmatic components at once, each of which will create a separate Vue instance.

By adding this component using the main Oruga plugin or the dedicated `Programmatic` component plugin, the component adds an interface `programmatic` to the `useOruga()` composable and provides the programmatic component factory. A sperate programmatic component factory can also be created by useing the `useProgrammaticComponent` composable.

```typescript
import { useOruga } from "@oruga-ui/oruga-next";
import MyComponent from "...";

const oruga = useOruga();

const slot = "My default slot content";

oruga.programmatic.open(
    // component to render
    MyComponent,
    {
        // HTML #id of the app div rendered into the target container
        appId: "programmatic-app",
         // component specific props
        props: { ... },
        // on close event handler
        onClose: (...args: unknown[]) => { ... },
    },
    // target container the programmatic component get rendered into
    target: document.body,
);
```

The programmatic interface of this component looks much like the other programmatic component interfaces. However, the `open()` function takes some different attributes. This is the type definition of the `open()` function:

```typescript
type open = <C extends VNodeTypes>(
    /** the component to render **/
    component: C,
    /** programmatic component render options */
    options?: ProgrammaticOptions<C>,
    /**
     * target container the component get rendered into
     * @default `document.body`
     */
    target?: MaybeRefOrGetter<string | HTMLElement | null>,
) => ProgrammaticExpose;

type ProgrammaticOptions<C extends VNodeTypes> = {
    /**
     * Specify the template `id` for the programmatic container element.
     * @default `programmatic-app`
     */
    appId?: string;
    /**
     * Props to be binded to the injected component.
     * Both attributes and properties can be used in props.
     * Vue automatically picks the right way to assign it.
     * `class` and `style` have the same object / array value support like in templates.
     * Event listeners should be passed as onXxx.
     */
    props?: ComponentProps<C>;
    /**
     * On component close event.
     * This get called when the component emits `close` or the exposed `close` function get called.
     */
    onClose?: (...args: unknown[]) => void;
};
```
