
## Examples

### Base

::: demo
```html
<template>
    <section>

        <o-dropdown aria-role="list">
            <o-button variant="primary" slot="trigger" slot-scope="{ active }">
                <span>Click me!</span>
                <o-icon :icon="active ? 'caret-up' : 'caret-down'"></o-icon>
            </o-button>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>

        <o-dropdown :triggers="['hover']" aria-role="list">
            <o-button variant="info" slot="trigger">
                <span>Hover me!</span>
                <o-icon icon="caret-down"></o-icon>
            </o-button>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>

        <o-dropdown disabled aria-role="list">
            <o-button slot="trigger">
                <span>Disabled</span>
                <o-icon icon="caret-down"></o-icon>
            </o-button>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>

        <o-dropdown aria-role="list">
            <div slot="trigger">
                Custom
                <o-icon
                    variant="success"
                    icon="caret-down"
                    slot="trigger"
                    role="button">
                </o-icon>
            </div>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>

        <o-dropdown :triggers="['contextmenu']" aria-role="list">
            <o-button
                slot="trigger"
                role="button">
                Right click
            </o-button>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>
    </section>
</template>

<script>
    export default {
    }
</script>
```
:::

### Multiple

::: demo
```html
<template>
    <section>
        <p class="content"><b>selected</b>: {{ selectedOptions }}</p>
        <o-dropdown
            v-model="selectedOptions"
            multiple
            aria-role="list">
            <o-button variant="primary" type="button" slot="trigger">
                <span>Selected ({{ selectedOptions.length }})</span>
                <o-icon icon="caret-down"></o-icon>
            </o-button>

            <o-dropdown-item value="option1" aria-role="listitem">
                <span>Option 1</span>
            </o-dropdown-item>

            <o-dropdown-item value="option2" aria-role="listitem">
                <span>Option 2</span>
            </o-dropdown-item>

            <o-dropdown-item value="option3" aria-role="listitem">
                <span>Option 3</span>
            </o-dropdown-item>
        </o-dropdown>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                selectedOptions: []
            }
        }
    }
</script>
```
:::

### Scrollable

::: demo
```html
<template>
    <section>
        <div class="block">
            <o-field>
                <o-switch v-model="isScrollable">Scrollable</o-switch>
            </o-field>
        </div>

        <br>
        
        <o-dropdown
            :scrollable="isScrollable"
            :max-height="maxHeight"
            v-model="currentMenu"
            aria-role="list"
        >
            <o-button variant="primary" type="button" slot="trigger">
                <template>
                    <o-icon :icon="currentMenu.icon"></o-icon>
                    <span>{{currentMenu.text}}</span>
                </template>
                <o-icon icon="caret-down"></o-icon>
            </o-button>

            <o-dropdown-item 
                v-for="(menu, index) in menus"
                :key="index"
                :value="menu" aria-role="listitem">
                <div class="media">
                    <o-icon class="media-left" :icon="menu.icon"></o-icon>
                    <div class="media-content">
                        <span>{{menu.text}}</span>
                    </div>
                </div>
            </o-dropdown-item>
        </o-dropdown>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isScrollable: true,
                maxHeight: 200,
                currentMenu: { icon: 'users', text: 'People' },
                menus: [
                    { icon: 'users', text: 'People' },
                    { icon: 'box', text: 'Orders' },
                    { icon: 'credit-card', text: 'Payments' },
                    { icon: 'dolly', text: 'Logistics' },
                    { icon: 'business-time', text: 'Jobs' },
                    { icon: 'shopping-cart', text: 'Cart' },
                    { icon: 'cog', text: 'Configuration' }
                ]
            }
        }
    }
</script>

<style>
    .media {
        align-items: flex-start;
        display: flex;
        text-align: left;
    }
    .media-content {
        flex-basis: auto;
        flex-grow: 1;
        flex-shrink: 1;
        text-align: left;
        overflow-y: hidden;
        overflow-x: auto;
    }
    .media-left {
        margin-right: 1rem;
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 0;
    }
</style>
```
:::
