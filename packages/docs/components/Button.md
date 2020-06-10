---
title: Button
---

# Button

> Base component, contains and wrap all the other components.

---

## Demo

::: demo
<template>
<section>
            <o-button>Default</o-button>
            <o-button variant="primary">Primary</o-button>
            <o-button variant="primary" rounded>Rounded</o-button>
            <o-button variant="primary" outlined>Outlined</o-button>
            <o-button variant="primary" inverted>Inverted</o-button>
            <div style="
                background-color: #f5f5f5; 
                display:inline-flex;
                width: 200px;
                height: 50px;
                justify-content: center;
                align-items: center"
            >
                <o-button variant="primary" outlined inverted>Outlined & Inverted</o-button>
            </div>
        </section>
</template>

<script>
export default {
}
</script>

