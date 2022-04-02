## Examples

### Base

::: demo
```html
<template>
    <o-field class="file">
        <o-upload v-model="file">
            <o-button tag="a" variant="primary">
                <o-icon icon="upload"></o-icon>
                <span>Click to upload</span>
            </o-button>
        </o-upload>
        <span class="file-name" v-if="file">
            {{ file.name }}
        </span>
    </o-field>
    
</template>

<script>
    export default {
        data() {
            return {
                file: null
            }
        }
    }
</script>
```
:::

### Drag&Drop

::: demo
```html
<template>
    <section>
        <o-field>
            <o-upload v-model="dropFiles"
                multiple
                drag-drop>
                <section class="ex-center">
                    <p>
                        <o-icon
                            icon="upload"
                            size="is-large">
                        </o-icon>
                    </p>
                    <p>Drop your files here or click to upload</p>
                </section>
            </o-upload>
        </o-field>

        <div class="tags">
            <span v-for="(file, index) in dropFiles"
                :key="index">
                {{file.name}}
                <o-button icon-left="times" size="small"
                    native-type="button"
                    @click="deleteDropFile(index)">
                </o-button>
            </span>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                dropFiles: []
            }
        },
        methods: {
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            }
        }
    }
</script>

<style>
.ex-center {
    text-align: center;
}
</style>
```
:::
