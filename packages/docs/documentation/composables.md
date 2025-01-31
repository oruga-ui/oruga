# Composable

Besides the main Vue plugin and the components, Oruga provides a programmatic composable `useOruga()`, which can be used to access the config as well as any registered programmatic component interfaces. A programmatic component interface will be registered when using the main plugin or any individual component plugin.

The composable can be imported by: 

```typescript
import { useOruga } from "@oruga-ui/oruga-next";
```


## Programmatic config {#config}

The `config` interface can be used to customise the Oruga [global configuration](/documentation/customisation) by overriding the `Config` object programmatically:

```typescript
import { useOruga } from '@oruga-ui/oruga-next';

const oruga = useOruga();

// get the current config
const config = oruga.config.getOptions();

// modify the config object
const myThemeConfig = {
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

However, you can also customise each component by using the dedicated `ConfigProgrammatic` object, which is the same as the one added to the object provided by the main `useOruga()` composable:

```typescript
import { ConfigProgrammatic } from '@oruga-ui/oruga-next';

// get the current config
const config = ConfigProgrammatic.getOptions();

// modify the config object
const myThemeConfig = {
    ...config,
    autocomplete: {
        rootClass: 'autocomplete-root',
        itemClass: 'autocomplete-item',
        ...
    }
}

// update the config
ConfigProgrammatic.setOptions(myThemeConfig);
```

### Individual config plugin {#configplugin}

If you use individual component plugins instead of the default main Oruga plugin, the programmatic config will **not** be registered to the `useOruga()` composable by default.
Therefore, you can make the config interface available by adding the special `OrugaConfig` plugin. As a second parameter you can pass an optional config object like the main Oruga plugin.

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


## Programmatic components {#components}

Some components come with their own programmatic interface. These interfaces will be registered and added to the main `useOruga()` composable when using the default main Oruga plugin or the individual plugin for the component.  

> ***Note:*** The programmatic interfaces will not be added if you only use the component itself and not its dedicated plugin.  


List of components with an programmatic interface: 

- [`Loading`](/components/Loading.html#programmatically) 
- [`Modal`](/components/Modal.html#programmatically) 
- [`Notification`](/components/Notification.html#programmatically) 
- [`Sidebar`](/components/Sidebar.html#programmatically)

You can access each component's programmatic interface using the `useOruga()` composable. 
To create a new instance of the component, you need to call the `open()` function. The open function takes two arguments. First, an object with the props of the individual component, and second, a target where the component should be mounted.

```typescript
import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

const target = document.body;

oruga.sidebar.open({
    component: MyCoolComponent,
    fullheight: true,
    overlay: true,
}, target);
```

You can also access the programmatic interface of a component by using the dedicated object, which is the same as the one added to the object provided by the main `useOruga()` composable. For example:

```typescript
import { NotificationProgrammatic } from '@oruga-ui/oruga-next';

NotificationProgrammatic.open({
    duration: 5000,
    message: "You did a greate job!",
    variant: "info",
    position: "top",
    closable: true,
});
```

### Programmatic interface {#interface}

The object for each programmatic interface of a component looks like this: 

```typescript
type ProgrammaticInterface = {
    /** Returns the number of registered active instances. */
    count: () => number;
    /** 
     * Create a new programmatic component instance. 
     * The options argument depend on the component. 
     * The target specifies the element the component get rendered into - default is `document.body`.
     */
    open: (options: Record<string, any>, target?: string | HTMLElement) => ProgrammaticExpose;
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

The component works as follows: The programmatic component renders a wrapper component in a sperate shadow Vue instance. The separate Vue instance will have the same context object as the current one. The provided component is then rendered in a wrapper component that handles the Vue lifecycle events of the provided component.
The rendered component is then extracted from the shadow Vue instance and placed into the target container of the real DOM instance.  
By closing the instance of the wrapper component, for example by calling `oruga.programmatic.close()` from outside, or by firing a `close` event from inside the provided component, the wrapper component and the shadow Vue instance will be destroyed and DOM will be cleaned up.

> ***Note:*** When using the programmatic component, you may experience some DX issues if you run the Vue Devtools and inspect the programmatic component.

By adding this component using the main Oruga plugin or the dedicated `ComponentProgrammatic` plugin, the component adds an interface `programmatic` to the `useOruga()` composable and provides the `ComponentProgrammatic` object export, but it does not have a Vue component to mount directly. 

```typescript
import { useOruga } from "@oruga-ui/oruga-next";
import MyComponent from "...";

const oruga = useOruga();

const slot = "My default slot content";

oruga.programmatic.open(
    MyComponent,
    {
        target: document.body, // target the component get rendered into
        props: { ... }, // component specific props
        onClose: (...args: unknown[]) => { ... }, // on close event handler
    },
    // component default slot render content
    slot,
);

```

The programmatic interface of this component looks much like the other programmatic component interfaces. However, the `open()` function takes some different attributes. The type definition of the `open()` function looks like this:

```typescript
type open = <C extends VNodeTypes>(
    /** component to render **/
    component: C, 
    /** render options */
    options?: ProgrammaticOptions<C>, 
    /** default slot content */
    slot?: unknown
) => ProgrammaticExpose;


type ProgrammaticOptions<C extends VNodeTypes> = {
    /** 
     * The target specifies the element the component get rendered into - default is `document.body`.
     */
    target?: string | HTMLElement; 
    /**
     * Props to be binded to the injected component. 
     * Both attributes and properties can be used in props.
     * Vue automatically picks the right way to assign it.
     * `class` and `style` have the same object / array value support like in templates.
     * Event listeners should be passed as onXxx.
     */
    props: ComponentProps<C>,
    /**
     * On component close event.
     * This get called when the component emits `close` or the exposed `close` function get called.
     */
    onClose?: (...args: unknown[]) => void,
}
```
