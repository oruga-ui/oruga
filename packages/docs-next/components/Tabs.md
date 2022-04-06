---
title: Tabs
---

# Tabs

> Responsive horizontal navigation tabs, switch between contents with ease

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/tabs/examples/Tabs.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo
<template>
<section>
<p>
<o-button @click="activeTab = 1">Set Music</o-button>
</p>
<p>
<o-switch v-model="showBooks"> Show Books item </o-switch>
<o-switch v-model="multiline"> Multiline </o-switch>
</p>
<o-tabs v-model="activeTab" :multiline="multiline">
<o-tab-item value="0" label="Pictures">
Lorem ipsum dolor sit amet.
</o-tab-item>

            <o-tab-item :value="1" label="Music">
                Lorem <br>
                ipsum <br>
                dolor <br>
                sit <br>
                amet.
            </o-tab-item>

            <o-tab-item value="2" :visible="showBooks" label="Books">
                What light is light, if Silvia be not seen? <br>
                What joy is joy, if Silvia be not by— <br>
                Unless it be to think that she is by <br>
                And feed upon the shadow of perfection? <br>
                Except I be by Silvia in the night, <br>
                There is no music in the nightingale.
            </o-tab-item>

            <o-tab-item value="3" label="Videos" icon="video" disabled>
                Nunc nec velit nec libero vestibulum eleifend.
                Curabitur pulvinar congue luctus.
                Nullam hendrerit iaculis augue vitae ornare.
                Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </o-tab-item>
        </o-tabs>
    </section>

</template>

<script>
    export default {
        data() {
            return {
                activeTab: "0",
                showBooks: false,
                multiline: false
            }
        }
    }
</script>

:::

### Custom header

::: demo
<template>
<o-tabs type="boxed">
<o-tab-item>
<template slot="header">
<o-icon icon="info-circle" rootClass="custom-icon"></o-icon>
<span> Issues 3 </span>
</template>
</o-tab-item>
<o-tab-item>
<template slot="header">
<o-icon icon="retweet" rootClass="custom-icon"></o-icon>
<span> Pull Requests {{count}} </span>
</template>
</o-tab-item>
</o-tabs>
</template>

<script>
export default {
    data() {
        return {
            count: 1
        }
    },
    mounted() {
        setTimeout(() => {
            this.count++;
        }, 3 * 1000)
    }
}
</script>

<style>
.custom-icon {
  margin-right: 5px;
}
</style>

:::

### Long header

::: demo
<template>
<o-tabs type="boxed">
<o-tab-item v-for="(item, index) in new Array(45)" :key="`longitem-${index}`">
<template slot="header">
<span>Head {{index}}</span>
</template>
</o-tab-item>
</o-tabs>
</template>

<script>
    export default {
        data() {
            return {
                expanded: false,
                atRight: false,
                size: null,
                type: 'default'
            }
        }
    }
</script>

:::

### Vertical

::: demo
<template>
<section>
<o-field grouped group-multiline>
<div class="control">
<o-switch v-model="atRight"> Right position </o-switch>
</div>
<div class="control">
<o-switch v-model="expanded"> Expanded </o-switch>
</div>
<o-field label="Size">
<o-select v-model="size" placeholder="Size">
<option :value="null">Default</option>
<option value="small">Small</option>
<option value="medium">Medium</option>
<option value="large">Large</option>
</o-select>
</o-field>
<o-field label="Type">
<o-select v-model="type" placeholder="Type">
<option value="default">Default</option>
<option value="boxed">Boxed</option>
<option value="toggle">Toggle</option>
</o-select>
</o-field>
</o-field>

        <o-tabs :position="atRight ? 'right' : ''"
                :size="size"
                :type="type"
                vertical
                :expanded="expanded">
            <o-tab-item label="Pictures" icon="images">
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet.
            </o-tab-item>

            <o-tab-item label="Music" icon="music">
                What light is light, if Silvia be not seen? <br>
                What joy is joy, if Silvia be not by— <br>
                Unless it be to think that she is by <br>
                And feed upon the shadow of perfection? <br>
                Except I be by Silvia in the night, <br>
                There is no music in the nightingale.
            </o-tab-item>

            <o-tab-item label="Videos" icon="video" disabled>
                Nunc nec velit nec libero vestibulum eleifend.
                Curabitur pulvinar congue luctus.
                Nullam hendrerit iaculis augue vitae ornare.
                Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </o-tab-item>
        </o-tabs>
    </section>

</template>

<script>
    export default {
        data() {
            return {
                expanded: false,
                atRight: false,
                size: null,
                type: 'default'
            }
        }
    }
</script>

:::

### Types

::: demo
<template>
<section>
<o-tabs type="boxed">
<o-tab-item label="Pictures" icon="images"></o-tab-item>
<o-tab-item label="Music" icon="music"></o-tab-item>
<o-tab-item label="Videos" icon="video"></o-tab-item>
</o-tabs>

        <o-tabs type="toggle">
            <o-tab-item label="Pictures" icon="images"></o-tab-item>
            <o-tab-item label="Music" icon="music"></o-tab-item>
            <o-tab-item label="Videos" icon="video"></o-tab-item>
        </o-tabs>

    </section>

</template>

<script>
    export default {
    }
</script>

:::

### Position

::: demo
<template>
<section>
<o-tabs type="boxed" position="centered">
<o-tab-item label="Pictures" icon="images"></o-tab-item>
<o-tab-item label="Music" icon="music"></o-tab-item>
<o-tab-item label="Videos" icon="video"></o-tab-item>
</o-tabs>

        <o-tabs type="toggle" position="right">
            <o-tab-item label="Pictures" icon="images"></o-tab-item>
            <o-tab-item label="Music" icon="music"></o-tab-item>
            <o-tab-item label="Videos" icon="video"></o-tab-item>
        </o-tabs>

    </section>

</template>

<script>
    export default {
    }
</script>

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_tabs.scss)

<br />

<br />
<br />

## Props

| Prop name | Description                                     | Type    | Values            | Default                                                                                                                            |
| --------- | ----------------------------------------------- | ------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| animated  | Tab will have an animation                      | boolean | -                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> tabs: {<br>&nbsp;&nbsp;animated: true<br>}</code> |
| expanded  | Tabs will be expanded (full-width)              | boolean | -                 |                                                                                                                                    |
| multiline | Show tab items multiline when there is no space | boolean | -                 |                                                                                                                                    |
| override  |                                                 | boolean | -                 |                                                                                                                                    |
| type      | Tab type                                        | string  | `boxed`, `toggle` | 'default'                                                                                                                          |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| start   |             |          |
| end     |             |          |
| default |             |          |

---

# Tab Item

> <CarbonAds />

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_tab item.scss)

<br />

<br />
<br />

## Props

| Prop name | Description           | Type    | Values | Default                                                                                                                               |
| --------- | --------------------- | ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| disabled  | Item will be disabled | boolean | -      |                                                                                                                                       |
| override  |                       | boolean | -      |                                                                                                                                       |
| tag       | Tabs item tag name    | string  | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> tabs: {<br>&nbsp;&nbsp;itemTag: 'button'<br>}</code> |

## Style

| CSS Variable                                       | SASS Variable                                | Default                 |
| -------------------------------------------------- | -------------------------------------------- | ----------------------- |
| --oruga-tabs-disabled-opacity                      | \$tabs-disabled-opacity                      | \$base-disabled-opacity |
| --oruga-tabs-font-size                             | \$tabs-font-size                             | \$base-font-size        |
| --oruga-tabs-icon-margin                           | \$tabs-icon-margin                           | 0.5em                   |
| --oruga-tabs-content-padding                       | \$tabs-content-padding                       | 1rem                    |
| --oruga-tabs-margin-bottom                         | \$tabs-margin-bottom                         | 1.5rem                  |
| --oruga-tabs-border-bottom-color                   | \$tabs-border-bottom-color                   | \$grey-lighter          |
| --oruga-tabs-border-bottom-style                   | \$tabs-border-bottom-style                   | solid                   |
| --oruga-tabs-border-bottom-width                   | \$tabs-border-bottom-width                   | 1px                     |
| --oruga-tabs-link-color                            | \$tabs-link-color                            | hsl(0, 0%, 29%)         |
| --oruga-tabs-link-active-border-bottom-color       | \$tabs-link-active-border-bottom-color       | \$primary               |
| --oruga-tabs-link-active-color                     | \$tabs-link-active-color                     | \$primary               |
| --oruga-tabs-link-line-height                      | \$tabs-link-line-height                      | \$base-line-height      |
| --oruga-tabs-link-padding                          | \$tabs-link-padding                          | 0.5em 1em               |
| --oruga-tabs-boxed-link-radius                     | \$tabs-boxed-link-radius                     | \$base-border-radius    |
| --oruga-tabs-boxed-link-hover-background-color     | \$tabs-boxed-link-hover-background-color     | hsl(0, 0%, 96%)         |
| --oruga-tabs-boxed-link-hover-border-bottom-color  | \$tabs-boxed-link-hover-border-bottom-color  | hsl(0, 0%, 86%)         |
| --oruga-tabs-boxed-link-active-background-color    | \$tabs-boxed-link-active-background-color    | hsl(0, 0%, 100%)        |
| --oruga-tabs-boxed-link-active-border-color        | \$tabs-boxed-link-active-border-color        | hsl(0, 0%, 86%)         |
| --oruga-tabs-boxed-link-active-border-bottom-color | \$tabs-boxed-link-active-border-bottom-color | transparent             |
| --oruga-tabs-toggle-link-border-color              | \$tabs-toggle-link-border-color              | hsl(0, 0%, 86%)         |
| --oruga-tabs-toggle-link-border-style              | \$tabs-toggle-link-border-style              | solid                   |
| --oruga-tabs-toggle-link-border-width              | \$tabs-toggle-link-border-width              | 1px                     |
| --oruga-tabs-toggle-link-hover-background-color    | \$tabs-toggle-link-hover-background-color    | hsl(0, 0%, 96%)         |
| --oruga-tabs-toggle-link-hover-border-color        | \$tabs-toggle-link-hover-border-color        | hsl(0, 0%, 71%)         |
| --oruga-tabs-toggle-link-radius                    | \$tabs-toggle-link-radius                    | \$base-border-radius    |
| --oruga-tabs-toggle-link-active-background-color   | \$tabs-toggle-link-active-background-color   | \$primary               |
| --oruga-tabs-toggle-link-active-border-color       | \$tabs-toggle-link-active-border-color       | \$primary               |
| --oruga-tabs-toggle-link-active-color              | \$tabs-toggle-link-active-color              | \$primary-invert        |
