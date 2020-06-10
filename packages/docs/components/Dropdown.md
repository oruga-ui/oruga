---
title: Dropdown
---

# Dropdown

> Base component

---

## Simple

::: demo
<template>
    <section>
        <o-dropdown>
            <o-button slot="trigger" slot-scope="{ active }">
                <span>Click me!</span>
            </o-button>
            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>
        <o-dropdown hoverable aria-role="list">
            <o-button slot="trigger">
                <span>Hover me!</span>
            </o-button>
            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>
        <o-dropdown disabled aria-role="list">
            <o-button slot="trigger">
                <span>Disabled</span>
            </o-button>
            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>
        <o-dropdown inline>
            <o-button slot="trigger" slot-scope="{ active }">
                <span>Click me!</span>
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
:::

## Multiple

::: demo
<template>
    <section>
        <p><b>Selected</b>: {{ selectedOptions }}</p>
        <o-dropdown
            v-model="selectedOptions"
            multiple
            aria-role="list">
            <o-button type="button" slot="trigger">
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
:::


