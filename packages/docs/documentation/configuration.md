# Configuration

Oruga's superpower is its configurability and its **CSS framework agnostic** approach.  
Each component can be individually customised and configured by defining specific classes using a **class-mapping** approach.
Therefore, **Oruga comes without any styling by default**.
However, there are several official predefined configurations called [themes](/documentation/themes), which you can include and extend to give your application a individual look and feel.  
And **all components came with predefined classes** by default.

---

All components behaves the same:

- You can set predefined CSS classes globally for each component in the global config;
- These classes can be static or dynamic, based on the component props;
- Classes defined globally can be extended or overrided locally, by appending one or more classes, either inline or programmatically, to individual components;

In detail, you can customise component classes in 3 different ways:

- [Global configuration](#global)
- [Inline configuration](#individual)
- [Programmatically configuration](/documentation/composables)

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
    [globalProp]: string|boolean|number|function|...
    [componentName]: {
        override: boolean
        [classProp]: string|boolean|number|function|...
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

### Static classes

Let’s say you want all your buttons to have a `btn` class. A configuration object can the passed as second argument to the default `Oruga` plugin, where you can define a `string` for each `class` property of each componentt (the `class` properties can be found in the `Class Inspector` section of each component):

```typescript
import { createApp } from 'vue';
import Oruga from '@oruga-ui/oruga-next';

createApp(...)
    .use(Oruga, {
        button: {
            rootClass: 'btn',
            disabledClass: 'btn-disabled',
            ...
        }
        ...
    });
```

You can also use an `array` to specify more than one class.

```typescript
createApp(...)
    .use(Oruga, {
        button: {
            rootClass: ['btn', 'text-color-red'],
            disabledClass: 'btn-disabled',
        }
    });
```

### Dynamic classes

The class options can also be a `function` to achieve more complex class definitions.
The returned value by the `function` must be a `string`.
As first argument of the function a class `suffix` defined by a component property is provided.

For example, `positionClass` of the Dropdown component provides a suffix to specify the menu position (_top_, _bottom_), in this case you may define a function and append the suffix to the base class name.

```typescript
createApp(...)
    .use(Oruga, {
        dropdown: {
            rootClass: ['dropdown-root', 'additional-class'],
            positionClass: (suffix) => `dropdown-menu-${suffix}`,
        }
    });
```

For a more in-depth customisation experience, the function provides the component's read-only `props` as a second argument.

For example, you may want to apply a variants class to buttons only when the element is not disabled:

```js
createApp(...)
    .use(Oruga, {
        button: {
            rootClass: (_, props) => {
                const classes = ["btn"]
                if (props.iconRight) classes.push('has-icons-right');
                return classes;
            },
            variantClass: (suffix, props) => {
                if (!props.disabled) return `btn-${suffix}`;
            }
            ...
        },
    });
```

With the configuration above:

- `<o-button variant="primary" />` will render `<button class="btn btn--primary"></button>`
- `<o-button variant="primary" disabled />` will render `<button class="btn"></button>`

## Inline Configuration {#individual}

Being able to apply classes globally is a great way to avoid repetitions in the code. But it’s common to have several styles for the same component. Therefore, you can add classes to a component directly inline using specific `class` properties:

```html
<o-autocomplete root-class="autocomplete-root" item-class="autocomplete-item" />
```

All `class` properties for each component can be found in the `Class Inspector` section of a component page.  
If it turns out that you also have classes defined globally in the config for this component, they will be merged together.

## Overriding classes

In case you want to override existing default Oruga classes completely, either for one component or for all, you can act as above and set the field `override` to `true` either at config root level or individual component level:

```typescript
createApp(...)
    .use(Oruga, {
        // override at root level removes all existing classes
        override: true,
        autocomplete: {
            // component scoped override removes all existing classes of this component
            override: true,
            rootClass: 'autocomplete-root',
            itemClass: 'autocomplete-item',
            ...
        }
    });
```

::: info
While using themes such as [Bootstrap](/documentation/themes#bootstrap-theme) or [Bulma](/documentation/themes#bulma-theme), this feature is used to remove all default classes and to create specific theme configurations.
:::

This `override` property can also be passed directly to any component:

```html
<o-autocomplete override rootClass="autocomplete-root"></o-autocomplete>
```

::: warning
In this case, the `override` property replaces **all** existing predefined classes for the component completely, ignoring your configuration.
:::

You can also specify the override behaviour for each class individually:

```typescript
createApp(...)
    .use(Oruga, {
        autocomplete: {
            rootClass: {
                // class scoped override removes only specific existing classes
                override: true,
                class: 'autocomplete-root',
            },
            itemClass: 'autocomplete-item',
            ...
        }
    });
```

## Transform classes

Additionally, if you want to transform the applied `classes` you can define a `transformClasses` function for each component, or for all components globally:

```typescript
createApp(...)
    .use(Oruga, {
        // global transform function
        transformClasses: (appliedClasses: string) => {
            return appliedClasses.replace(/-/g, '--');
        },
        button: {
            // component scoped transform function
            transformClasses: (appliedClasses: string) => {
                return appliedClasses.replace(/-/g, '--');
            }
        },
        ...
    })
```

## Global Props

::: info
Have a look at the docs of each component to know all the customisable fields/props by the config.
:::

| Field              | Description                                                                                                                                                                                  | Default                                                                                                                                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| override           | In case you want to completely override all the existing Oruga default classes for each component, you can specify the override behaviour here globaly.                                      | <code style='white-space: nowrap; padding: 0;'>null</code>                                                                                                                                                        |
| local              | Define the Date format locale                                                                                                                                                                | <code style='white-space: nowrap; padding: 0;'>null</code>                                                                                                                                                        |
| iconPack           | Icon pack used internally and on the Icon component attribute                                                                                                                                | <code style='white-space: nowrap; padding: 0;'>'mdi'</code>                                                                                                                                                       |
| iconComponent      | Define a specific icon component                                                                                                                                                             | <code style='white-space: nowrap; padding: 0;'>null</code>                                                                                                                                                        |
| statusIcon         | Show status icon using field and variant prop                                                                                                                                                | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                                                                        |
| statusVariantIcon  | Default status variant and icon mapping name                                                                                                                                                 | <code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;'success': 'check',<br>&nbsp;&nbsp;'danger': 'alert-circle',<br>&nbsp;&nbsp;'info':'information', <br>&nbsp;&nbsp;'warning': 'alert'<br>} </code> |
| teleportTarget     | Define the default target element for teleport and programmatic feature                                                                                                                      | <code style='white-space: nowrap; padding: 0;'>document.body</code>                                                                                                                                               |
| mobileBreakpoint   | Define the match media breakpoint for mobile view                                                                                                                                            | <code style='white-space: nowrap; padding: 0;'>1023px</code>                                                                                                                                                      |
| useHtml5Validation | Enable HTML5 form validation attribute                                                                                                                                                       | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                                                                        |
| invalidHandler     | Callback function that allows for custom behavior when HTML constraint validation would visually report that a field is invalid. Takes the input and its parent field (if any) as arguments. | <code style='white-space: nowrap; padding: 0;'>null</code>                                                                                                                                                        |
