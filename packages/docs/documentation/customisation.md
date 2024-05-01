
# Customisation

Oruga's superpower is its configurability and its <b>CSS framework agnostic</b> approach. <br />
Each component can be individually customised and configured by defining specific classes using a <b>class-mapping approach</b>.
Therefore, <b>Oruga comes without any styling by default</b>. 
However, there are several official predefined configurations called [themes](/documentation/themes), which you can include and extend to give your application a individual look and feel.
And <b>all components came with predefined classes </b> by default.

You can customise component classes in 3 different ways:

- [Global configuration](#global)
- [Individual configuration](#individual)
- [Programmatically configuration](#programmatic)

::: info
Although all components have predefined classes, Oruga allows you to easily override the style of existing components by appending one or more classes, either globally or programmatically, to individual components.
:::

To configure a component, each component has a set of `class` properties which can be found in the `Class prop` section of a component (see for example [Autocomplete class props](/components/Autocomplete.html#class-props)).
Here you can inspect the elements affected by each class property using the `Class Prop Inspector`. 

<video class="oruga-doc-video" controls autoplay muted loop>
  <source src="/inspectormov.mp4" type="video/mp4">
</video>



## Configuration {#global}

The easiest way to customise your components is set up a global configuration object with a <i>class-mapping</i> for each component.

::: info
While using TypeScript, the configuration object is defined by the type `OrugaOptions`.
:::

The Config object is defined as:
```js
{
    globalProp: string|boolean|number|function|....,
    componentName: {
        override: boolean,
        classProp: string|boolean|number|function|....
    }
}

```

For example:

```js
{
    iconPack: "fas",
    button: {
        override: true,
        rootClass: 'btn',
        roundedClass: 'btn-rounded',
        ...
    }
}

```

The configuration object can the passed as option to the `Oruga` plugin:

```js
import { createApp } from 'vue';
import Oruga from '@oruga-ui/oruga-next';

createApp(...)
    .use(Oruga, {
        autocomplete: {
            rootClass: 'myautocomplete-root',
            itemClass: 'myautocomplete-item',
            ...
        }
    });
```

You can also use an `array` to specify more than one class or a `function` to extend or override classes in a component. In case you use a function, a `suffix` is provided by the component and it can be used inside the function. For example, `menuPositionClass` in Autocomplete provides a suffix to specify the menu position (_top_, _bottom_), in this case you may define a function and append the suffix to the base class name

```js
createApp(...)
    .use(Oruga, {
        autocomplete: {
            rootClass: ['autocomplete-root', 'additional-class']
            menuPositionClass: {
                class: (suffix) => {
                    return `autocomplete-menu-${suffix}`
                }
            },
            itemClass: 'autocomplete-item',
        }
    });
```

For a better customisation experience, this function accepts the component's read-only `props` as a second parameter. For example, when using [Bootstrap](https://getbootstrap.com/) you may want to apply variants to buttons only when the element is not outlined:

```js
createApp(...)
    .use(Oruga, {
        input: {
            rootClass: (_, props) => {
                if (props.iconRight) {
                    return 'has-icons-right';
                }
            },
            variantClass: (variant, props) => {
                if (!props.outlined) {
                    return `btn-${variant}`;
                }
            }
        },
        ...
    });
```

### Overriding classes

In case you want to override existing default Oruga classes completely, you can act as above and set the field `override` to true:

```js
createApp(...)
    .use(Oruga, {
        autocomplete: {
            override: true,
            rootClass: 'myautocomplete-root',
            itemClass: 'myautocomplete-item',
            ...
        }
    });
```

::: info
While using themes like [Bootstrap](/documentation/themes#bootstrap) or [Bulma](/documentation/themes#bulma), this feature is used to create specific theme configs.
:::

Or directly in your component:

```html
<o-autocomplete
    override
    rootClass="myautocomplete-root">
```

::: warning
In this case `override` property replaces **all** existing theme config classes completely, ignoring your configuration.
:::

You can also specify the override behaviour for each class:

```js
createApp(...)
    .use(Oruga, {
        autocomplete: {
            rootClass: {
                class: 'myautocomplete-root',
                override: true
            },
            itemClass: 'myautocomplete-item',
            ...
        }
    });
```

### Transform classes

In case you want to transform applied `classes` you can use `transformClasses` function directly in your configuration:

```js
createApp(...)
    .use(Oruga, {
        button: {
            transformClasses: (appliedClasses) => {
                return appliedClasses.replace(/-/g, '--')
            }
        }
        ...
    })
```

You can also use `transformClasses` globally if you need to transform classes for any component:

```js
createApp(...)
    .use(Oruga, {
        transformClasses: (appliedClasses) => {
            return appliedClasses.replace(/-/g, '--')
        }
        ...
    })
```

### Component properties {#individual}

You can also add and override classes to a component directly using `class` properties:

```html
<o-autocomplete 
    root-class="autocomplete-root" 
    item-class="autocomplete-item" />
```

## Global Props

| Field              | Description                                                                                                                                                                                  | Default |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| override           | In case you want to override existing Oruga default classes all components completely, you can specify the override behaviour here globaly.                                                  | <code style='white-space: nowrap; padding: 0;'>null</code>   |
| iconPack           | Icon pack used internally and on the Icon component attribute                                                                                                                                | 'mdi'   |
| iconComponent      | Define a specific icon component                                                                                                                                                             | <code style='white-space: nowrap; padding: 0;'>null</code>    |
| statusIcon         | Show status icon using field and variant prop                                                                                                                                                | <code style='white-space: nowrap; padding: 0;'>true</code>   |
| statusVariantIcon  | Default mapping of variant and icon name                                                                                                                                                     | <code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;'success': 'check',<br>&nbsp;&nbsp;'danger': 'alert-circle',<br>&nbsp;&nbsp;'info':'information', <br>&nbsp;&nbsp;'warning': 'alert'<br>} </code> |
| useHtml5Validation | Enable default form components HTML5 validation attribute                                                                                                                                    | <code style='white-space: nowrap; padding: 0;'>true</code>    |
| invalidHandler | Callback function that allows for custom behavior when HTML constraint validation would visually report that a field is invalid. Takes the input and its parent field (if any) as arguments. | <code style='white-space: nowrap; padding: 0;'>null</code> |

Have a look at the docs of each component to know all the customisable fields/props by config.


## Programmatic usage {#programmatic}

As alternative Oruga provide a programmatic interface `useOruga()` to access the config as well as programmatic component interfaces such as [`Modal`](/components/Modal.html#programmatically) or [`Sidebar`](/components/Sidebar.html#programmatically).
This interface gives you access to all registered programmatic components. A programmatic component interface get registered while using the main or an individual component plugin.


### Programmatic component 

If you use the default main plugin export or any plugin of a component with a programmatic interface, this interface will be registered and can be accessed using the `useOruga()` composable:

```js
import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

oruga.sidebar.open({
    component: MyCoolComponent,
    fullheight: true,
    overlay: true,
    destroyOnHide: true,
});
```

### Programmatic config 

The config can be customised for each component by overriding the `Config` object programmatically:

```js
import { useOruga } from '@oruga-ui/oruga-next';

const oruga = useOruga();

const config = oruga.config.getOptions();

const myThemeConfig = {
    ...config,
    autocomplete: {
        rootClass: 'autocomplete-root',
        itemClass: 'autocomplete-item',
        ...
    }
}

oruga.config.setOptions(myThemeConfig);
```

However, you can also customise each component by using the dedicated `ConfigProgrammatic` object:

```js
import { ConfigProgrammatic } from '@oruga-ui/oruga-next';

const config = ConfigProgrammatic.getOptions();

const myThemeConfig = {
    ...config,
    autocomplete: {
        rootClass: 'autocomplete-root',
        itemClass: 'autocomplete-item',
        ...
    }
}

ConfigProgrammatic.setOptions(myThemeConfig);
```

If you use individual imports instead of the default main plugin export, the programmatic config will not be registered to the `useOruga()` interface by default.
Therefore, you can make the config interface available by adding the dedicated `OrugaConfig` plugin:

```js
import { createApp } from 'vue';
import { OAutocomplete, OSidebar, OrugaConfig, useOruga } from '@oruga-ui/oruga-next';

createApp(...)
    .component(OAutocomplete)
    .component(OSidebar)
    .use(OrugaConfig);

const oruga = useOruga();

const config = oruga.config.getOptions();

config.setOption("autocomplete", {
    rootClass: 'autocomplete-root',
    itemClass: 'autocomplete-item',
    ...
});

config.setOption("sidebar", { ... });
```