
# Customization

Oruga comes without any styling by default. The main feature of Oruga is its configurability. 
Oruga allows to customize each component by a class mapping approach. 
The elements of a component can be configured individually to use specific classes.
However, there are several official predefined configurations called [themes](#themes) that provide an individual look and feel that you can include and extend.

With Oruga you can easily override existing components style appending one or more classes.
To configure a component each, component has a set of `class` properties which can be found in the `Class prop` section of a component (see for example [Autocomplete class props](/components/Autocomplete.html#class-props)).
Here you can inspect the elements affected by each class property using the `Class Prop Inspector`.

<video class="oruga-doc-video" controls autoplay muted loop>
  <source src="/inspectormov.mp4" type="video/mp4">
</video>

Oruga allows you to customize components in 3 different ways:

- [Global configuration](#global-configuration)
- [Individual configuration](#overriding-configuration)
- [Programmatically configuration](#using-configuration)

You can mix them, for example, provide a global configuration and add new classes for specific component use cases!


## Global configuration

The easiest way to customise your components is to provide a global configuration object with a class mapping for each component.

The Config object is defined as:
```js
{
    globalProp: string|boolean|number|function|....,
    componentname: {
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

If you use individual imports you can customize each compoment using `Config` plugin.

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

You can also use an `array` to specify more than one class or a `function` to extend or override classes in a component. In case you use a function, a suffix is provided by the component and it can be used inside the function. For example, `menuPositionClass` in Autocomplete provides a suffix to specify menu position (_top_, _bottom_), in this case you may define a function and append the suffix to the base class name

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

For a better customization experience this function accepts the component's `context` containing its read-only attributes (`props`, `data` and `computed`) as second parameter. For example using [Bootstrap](https://getbootstrap.com/) you may want to apply variants to buttons only when the element is not outlined:

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
While using themes like [Bootstrap](/themes#bootstrap) or [Bulma](/themes#bulma), this feature is used to create specific theme configs.
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
s

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

As alternative Oruga allows to customize each components providing config object programmatically:
```js
import { useProgrammatic } from '@oruga-ui/oruga-next';

const { oruga } = useProgrammatic();
oruga.config.setOptions(bulmaConfig);
```

