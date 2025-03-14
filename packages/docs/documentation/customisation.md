
# Customisation

Oruga's superpower is its configurability and its <b>CSS framework agnostic</b> approach. <br />
Each component can be individually customised and configured by defining specific classes using a <b>class-mapping approach</b>.
Therefore, <b>Oruga comes without any styling by default</b>. 
However, there are several official predefined configurations called [themes](/documentation/themes), which you can include and extend to give your application a individual look and feel.
And <b>all components came with predefined classes </b> by default.

You can customise component classes in 3 different ways:

- [Global configuration](#global)
- [Individual configuration](#individual)
- [Programmatically configuration](/documentation/composables)

::: info
Although all components have predefined classes, Oruga allows you to easily override the style of existing components by appending one or more classes, either globally or programmatically, to individual components.
:::

To configure a component, each component has a set of `class` properties which can be found in the `Class Inspector` section of a component (see for example [Autocomplete class inspector](/components/Autocomplete.html#class-inspector)).
Here you can inspect the elements affected by each class property using the `Class Prop Inspector`. 

<video class="oruga-doc-video" controls autoplay muted loop>
  <source src="/inspectormov.mp4" type="video/mp4">
</video>



## Global Configuration {#global}

The easiest way to customise your components is set up a global configuration object with a <i>class-mapping</i> for each component.

The Config object is defined as:
```typescript
{
    [globalProp]: string|boolean|number|function|....,
    [componentName]: {
        override: boolean,
        [classProp]: string|boolean|number|function|....
    }
}

```

::: info
While using TypeScript, the configuration object is defined by the type `OrugaOptions`.
:::

For example:

```typescript
import type { OrugaOptions } from "@oruga-ui/oruga-next";

const config: OrugaOptions = {
    iconPack: "fas",
    button: {
        override: true,
        rootClass: 'btn',
        roundedClass: 'btn-rounded',
        ...
    }
}

```

The configuration object can the passed as second option parameter to the `Oruga` plugin:

```typescript
import { createApp } from 'vue';
import Oruga from '@oruga-ui/oruga-next';

createApp(...)
    .use(Oruga, {
        autocomplete: {
            rootClass: 'autocomplete-root',
            itemClass: 'autocomplete-item',
            ...
        }
        ...
    });
```

You can also use an `array` to specify more than one class or a `function` to extend or override classes in a component. In case you use a function, a `suffix` is provided by the component and it can be used inside the function. For example, `positionClass` of the Dropdown component provides a suffix to specify the menu position (_top_, _bottom_), in this case you may define a function and append the suffix to the base class name.

```typescript
createApp(...)
    .use(Oruga, {
        dropdown: {
            rootClass: ['dropdown-root', 'additional-class'],
            positionClass: {
                class: (suffix) => `dropdown-menu-${suffix}`,
            },
            itemClass: 'dropdown-item',
        }
        ...
    });
```

For a better customisation experience, this function accepts the component's read-only `props` as a second parameter. For example, when using [Bootstrap](https://getbootstrap.com/) you may want to apply variants to buttons only when the element is not outlined:

```js
createApp(...)
    .use(Oruga, {
        button: {
            rootClass: (_, props) => {
                if (props.iconRight) return 'has-icons-right';
            },
            variantClass: (variant, props) => {
                if (!props.outlined) return `btn-${variant}`;
            }
        },
        ...
    });
```

## Component properties {#individual}

You can add classes to a component directly using the specific `class` properties, which can be found in the `Class Inspector` section of a component:

```html
<o-autocomplete 
    root-class="autocomplete-root" 
    item-class="autocomplete-item" />
```


## Overriding classes

In case you want to override existing default Oruga classes completely, either for one component or for all, you can act as above and set the field `override` to true:

```typescript
createApp(...)
    .use(Oruga, {
        autocomplete: {
            override: true,
            rootClass: 'autocomplete-root',
            itemClass: 'autocomplete-item',
            ...
        }
    });
```

::: info
While using themes such as [Bootstrap](/documentation/themes#bootstrap) or [Bulma](/documentation/themes#bulma), this feature is used to remove all default classes and to create specific theme configurations.
:::

This property can also be passed directly to the component:

```html
<o-autocomplete
    override
    rootClass="autocomplete-root">
```

::: warning
In this case, the `override` property replaces **all** existing predefined classes for this component completely, ignoring your configuration.
:::

You can also specify the override behaviour for each class individually:

```typescript
createApp(...)
    .use(Oruga, {
        autocomplete: {
            rootClass: {
                override: true
                class: 'autocomplete-root',
            },
            itemClass: 'autocomplete-item',
            ...
        }
    });
```

## Transform classes

In case you want to transform applied `classes` you can use the `transformClasses` function directly in your configuration, for each component or globally for any component:

```typescript
createApp(...)
    .use(Oruga, {
        // global transform function
        transformClasses: (appliedClasses: string) => {
            return appliedClasses.replace(/-/g, '--')
        }
        button: {
            // component scoped transform function
            transformClasses: (appliedClasses: string) => {
                return appliedClasses.replace(/-/g, '--')
            }
        }
        ...
    })
```



## Global Props

| Field              | Description                                                                                                                                                                                  | Default |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| override           | In case you want to completely override all the existing Oruga default classes for each component, you can specify the override behaviour here globaly.                                                  | <code style='white-space: nowrap; padding: 0;'>null</code>   |
| iconPack           | Icon pack used internally and on the Icon component attribute                                                                                                                                | 'mdi'   |
| iconComponent      | Define a specific icon component                                                                                                                                                             | <code style='white-space: nowrap; padding: 0;'>null</code>    |
| statusIcon         | Show status icon using field and variant prop                                                                                                                                                | <code style='white-space: nowrap; padding: 0;'>true</code>   |
| statusVariantIcon  | Default status variant and icon mapping name                                                                                                                                                 | <code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;'success': 'check',<br>&nbsp;&nbsp;'danger': 'alert-circle',<br>&nbsp;&nbsp;'info':'information', <br>&nbsp;&nbsp;'warning': 'alert'<br>} </code> |
| useHtml5Validation | Enable HTML5 form validation attribute                                                                                                                                                       | <code style='white-space: nowrap; padding: 0;'>true</code>    |
| invalidHandler | Callback function that allows for custom behavior when HTML constraint validation would visually report that a field is invalid. Takes the input and its parent field (if any) as arguments. | <code style='white-space: nowrap; padding: 0;'>null</code> |

Have a look at the docs of each component to know all the customisable fields/props by config.

