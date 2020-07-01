
## Examples

### Base

::: demo
```html
<template>
    <section>

        <o-dropdown aria-role="list">
            <o-button variant="primary" slot="trigger" slot-scope="{ active }">
                <span>Click me!</span>
                <o-icon :icon="active ? 'menu-up' : 'menu-down'"></o-icon>
            </o-button>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>

        <o-dropdown hoverable aria-role="list">
            <o-button variant="info" slot="trigger">
                <span>Hover me!</span>
                <o-icon icon="menu-down"></o-icon>
            </o-button>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>

        <o-dropdown disabled aria-role="list">
            <o-button class="o-button" slot="trigger">
                <span>Disabled</span>
                <o-icon icon="menu-down"></o-icon>
            </o-button>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>

        <o-dropdown aria-role="list">
            <o-icon
                clickable
                variant="success"
                icon="caret-down"
                slot="trigger"
                role="button">
            </o-icon>

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
                <o-icon icon="menu-down"></o-icon>
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
                <div class="control">
                    <o-switch v-model="isScrollable">Scrollable</o-switch>
                </div>
            </o-field>
        </div>
        
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
                <o-icon icon="menu-down"></o-icon>
            </o-button>

            <o-dropdown-item 
                v-for="(menu, index) in menus"
                :key="index"
                :value="menu" aria-role="listitem">
                <o-icon class="media-left" :icon="menu.icon"></o-icon>
                <div>
                    <span>{{menu.text}}</span>
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
                currentMenu: { icon: 'account-group', text: 'People' },
                menus: [
                    { icon: 'account-group', text: 'People' },
                    { icon: 'shopping-search', text: 'Orders' },
                    { icon: 'credit-card-multiple', text: 'Payments' },
                    { icon: 'dolly', text: 'Logistics' },
                    { icon: 'clock-check', text: 'Jobs' },
                    { icon: 'cart-arrow-right', text: 'Cart' },
                    { icon: 'settings', text: 'Configuration' }
                ]
            }
        }
    }
</script>
```
:::
