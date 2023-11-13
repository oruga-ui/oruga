
# Customisation

Oruga's superpower is its configurability and its <b>CSS framework agnostic</b> approach. <br />
Each component can be individually customised and configured by defining specific classes using a <b>class-mapping approach</b>.
Therefore, <b>Oruga comes without any styling by default</b>. 
However, there are several official predefined configurations called [themes](/documentation/themes), which you can include and extend to give your application a individual look and feel.
And <b>all components came with predefined classes </b> by default.

You can customise component classes in 3 different ways:

- [Global configuration](#global-configuration)
- [Individual configuration](#overriding-configuration)
- [Programmatically configuration](#using-configuration)

::: info
Although all components have predefined classes, Oruga allows you to easily override the style of existing components by appending one or more classes, either globally or programmatically, to individual components.
:::

To configure a component, each component has a set of `class` properties which can be found in the `Class prop` section of a component (see for example [Autocomplete class props](/components/Autocomplete.html#class-props)).
Here you can inspect the elements affected by each class property using the `Class Prop Inspector`. 

<video class="oruga-doc-video" controls autoplay muted loop>
  <source src="/inspectormov.mp4" type="video/mp4">
</video>



## Global configuration

The easiest way to customise your components is set up a global configuration object with a <i>class-mapping</i> for each component.

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
            menuClass: 'myautocomplete-menu',
            itemClass: 'myautocomplete-item',
            ...
        }
    });
```

If you use individual imports you can customize each compoment using the `Config` plugin.

```js
import { createApp } from 'vue';
import { OAutocomplete, OSidebar, Config } from '@oruga-ui/oruga-next';

createApp(...)
    .component(OAutocomplete)
    .component(OSidebar)
    .use(Config, {
        autocomplete: {
            rootClass: 'autocomplete-root',
            menuClass: 'autocomplete-menu',
            itemClass: 'autocomplete-item',
            ...
        }
    });
```

You can also use an `array` to specify more than one class or a `function` to extend or override classes in a component. In case you use a function, a `suffix` is provided by the component and it can be used inside the function. For example, `menuPositionClass` in Autocomplete provides a suffix to specify the menu position (_top_, _bottom_), in this case you may define a function and append the suffix to the base class name

```js
createApp(...)
    .use(Config, {
        autocomplete: {
            rootClass: 'autocomplete-root',
            menuClass: ['autocomplete-menu', 'super-menu'],
            menuPositionClass: {
                class: (suffix) => {
                    return `autocomplete-menu-${suffix}`
                }
            },
            itemClass: 'autocomplete-item',
        }
    });
```

For a better customisation experience, this function accepts the component's `context` containing its read-only attributes (`props`, `data` and `computed`) as a second parameter. For example using [Bootstrap](https://getbootstrap.com/) you may want to apply variants to buttons only when the element is not outlined:

```js
createApp(...)
    .use(Oruga, {
        input: {
            rootClass: (_, context) => {
                if (context.computed.hasIconRight) {
                    return 'has-icons-right';
                }
            },
            variantClass: (variant, context) => {
                if (!context.props.outlined) {
                    return `btn-${variant}`;
                }
            }
        },
        ...
    });
```

### Global Props

| Field              | Description                                                                                                                                                                                  | Default |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| statusIcon         | Show status icon using field and variant prop                                                                                                                                                | true    |
| statusVariantIcon  | Default mapping of variant and icon name                                                                                                                                                     | <code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;'success': 'check',<br>&nbsp;&nbsp;'danger': 'alert-circle',<br>&nbsp;&nbsp;'info':'information', <br>&nbsp;&nbsp;'warning': 'alert'<br>} </code> |
| useHtml5Validation | Default form components use-html5-validation attribute                                                                                                                                       | true    |
| iconPack           | Icon pack used internally and on the Icon component attribute                                                                                                                                | 'mdi'   |
| reportInvalidInput | Callback function that allows for custom behavior when HTML constraint validation would visually report that a field is invalid. Takes the input and its parent field (if any) as arguments. | <code style='white-space: nowrap; padding: 0;'>null</code> |

Have a look at the docs of each component to know all the customisable fields/props by config.

### Overriding classes

In case you want to override existing default Oruga classes completely, you can act as above and set the field `override` to true:

```js
createApp(...)
    .use(Oruga, {
        autocomplete: {
            override: true,
            rootClass: 'myautocomplete-root',
            menuClass: 'myautocomplete-menu',
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
In this case `override` property replaces all existing theme config classes completely, ignoring your configuration.
:::

You can also specify the override behaviour for each class:

```js
createApp(...)
    .use(Config, {
        autocomplete: {
            rootClass: {
                class: 'myautocomplete-root',
                override: true
            },
            menuClass: 'myautocomplete-menu',
            itemClass: 'myautocomplete-item',
            ...
        }
    });
```

### Transform classes

In case you want to transform applied `classes` you can use `transformClasses` function directly in your configuration:

```js
createApp(...)
    .use(Config, {
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
    .use(Config, {
        transformClasses: (appliedClasses) => {
            return appliedClasses.replace(/-/g, '--')
        }
        ...
    })
```


## Individual configuration

You can also add and override classes to a component directly using class properties:

```html
<o-autocomplete 
    root-class="autocomplete-root" 
    menu-class="autocomplete-menu" 
    item-class="autocomplete-item" />
```


## Programmatically configuration

As alternative Oruga allows to customize each components providing and overriding the `Config` object programmatically:
```js
import { useOruga } from '@oruga-ui/oruga-next';

const oruga = useOruga();

const config = oruga.config.getOptions();

oruga.config.setOptions(myThemeConfig);
```

