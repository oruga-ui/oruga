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
    open: (options: Record<string, any>, target?: MaybeRefOrGetter<string | HTMLElement | null>) => ProgrammaticExpose;
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

> ***Note:*** For performance reasons, be careful not to open too many programmatic components at once, each of which will create a separate Vue instance.

By adding this component using the main Oruga plugin or the dedicated `ComponentProgrammatic` plugin, the component adds an interface `programmatic` to the `useOruga()` composable and provides the `ComponentProgrammatic` object export, but it does not have a Oruga component. 

```typescript
import { useOruga } from "@oruga-ui/oruga-next";
import MyComponent from "...";

const oruga = useOruga();

const slot = "My default slot content";

oruga.programmatic.open(
    MyComponent,
    {
        target: document.body, // target container the programmatic component get rendered into
        appId: "programmatic-app", // HTML #id of the app div rendered into the target container 
        props: { ... }, // component specific props
        onClose: (...args: unknown[]) => { ... }, // on close event handler
    }
);
```

The programmatic interface of this component looks much like the other programmatic component interfaces. However, the `open()` function takes some different attributes. This is the type definition of the `open()` function:

```typescript
type open = <C extends VNodeTypes>(
    /** component to render **/
    component: C, 
    /** render options */
    options?: ProgrammaticOptions<C>, 
) => ProgrammaticExpose;


type ProgrammaticOptions<C extends VNodeTypes> = {
    /** 
     * The target specifies the element the component get rendered into.
     * @default `document.body`.
     */
    target?: MaybeRefOrGetter<string | HTMLElement | null>; 
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
    props?: ComponentProps<C>,
    /**
     * On component close event.
     * This get called when the component emits `close` or the exposed `close` function get called.
     */
    onClose?: (...args: unknown[]) => void,
}
```
