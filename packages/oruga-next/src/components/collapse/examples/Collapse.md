## Examples

::: demo
```html
<template>
    <section>

        <o-collapse :open="false" aria-id="contentIdForA11y1">
            <o-button
                variant="primary"
                slot="trigger"
                aria-controls="contentIdForA11y1">Click me!</o-button>
            <div class="notification">
                <h3>
                    Subtitle
                </h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                    Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                    Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
                </p>
            </div>
        </o-collapse>

    </section>
</template>

<script>
    export default {
    }
</script>
```
:::

### Accordion

::: demo
```html
<template>
    <section>

        <o-collapse
            class="card"
            animation="slide"
            v-for="(collapse, index) of collapses"
            :key="index"
            :open="isOpen == index"
            @open="isOpen = index">
            <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button">
                <p class="card-header-title">
                    {{ collapse.title }}
                </p>
                <a class="card-header-icon">
                    <o-icon
                        :icon="props.open ? 'caret-up' : 'caret-down'">
                    </o-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    {{ collapse.text }}
                </div>
            </div>
        </o-collapse>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                isOpen: 0,
                collapses: [
                {
                    title: 'Title 1',
                    text: 'Text 1'
                },
                {
                    title: 'Title 2',
                    text: 'Text 2'
                },
                {
                    title: 'Title 3',
                    text: 'Text 3'
                }
                ]
            }
        }
    }
</script>

<style>
.card {
    background-color: #fff;
    box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);
    color: #4a4a4a;
    max-width: 100%;
    position: relative;
}
.card-header {
    background-color: transparent;
    align-items: stretch;
    box-shadow: 0 1px 2px hsla(0,0%,4%,.1);
    display: flex;
}
.card-header-title {
    align-items: center;
    color: #363636;
    display: flex;
    flex-grow: 1;
    font-weight: 700;
    padding: .75rem;
    margin: 0;
}
.card-header-icon {
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: .75rem;
    justify-content: center;
}
.card-content {
    padding: 1.5rem;
    background-color: transparent;
}
</style>
```
:::
