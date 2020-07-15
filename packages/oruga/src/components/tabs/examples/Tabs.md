## Examples

### Base

::: demo
```html
<template>
    <section>
        <o-button @click="activeTab = 1">Set Music</o-button>
        <o-switch v-model="showBooks"> Show Books item </o-switch>
        <o-tabs v-model="activeTab">
            <o-tab-item label="Pictures">
                Lorem ipsum dolor sit amet.
            </o-tab-item>

            <o-tab-item label="Music">
                Lorem <br>
                ipsum <br>
                dolor <br>
                sit <br>
                amet.
            </o-tab-item>

            <o-tab-item :visible="showBooks" label="Books">
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
                activeTab: 0,
                showBooks: false
            }
        }
    }
</script>
```
:::

### Custom header

::: demo
```html
<template>
    <o-tabs type="boxed">
        <o-tab-item>
            <template slot="header">
                <o-icon icon="information-outline"></o-icon>
                <span> Issues 3 </span>
            </template>
        </o-tab-item>
        <o-tab-item>
            <template slot="header">
                <o-icon icon="source-pull"></o-icon>
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
```
:::

### Vertical

::: demo
```html
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
                    <option :value="null">Default</option>
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
            <o-tab-item label="Pictures" icon="google-photos">
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet.
            </o-tab-item>

            <o-tab-item label="Music" icon="library-music">
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
                type: null
            }
        }
    }
</script>
```
:::


### Types

::: demo
```html
<template>
    <section>
        <o-tabs type="boxed">
            <o-tab-item label="Pictures" icon="google-photos"></o-tab-item>
            <o-tab-item label="Music" icon="library-music"></o-tab-item>
            <o-tab-item label="Videos" icon="video"></o-tab-item>
        </o-tabs>

        <o-tabs type="toggle">
            <o-tab-item label="Pictures" icon="google-photos"></o-tab-item>
            <o-tab-item label="Music" icon="library-music"></o-tab-item>
            <o-tab-item label="Videos" icon="video"></o-tab-item>
        </o-tabs>

    </section>
</template>

<script>
    export default {
    }
</script>
```
:::