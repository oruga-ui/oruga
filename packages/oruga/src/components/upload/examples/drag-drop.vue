<script setup lang="ts">
import { ref } from "vue";

const dropFiles = ref([]);
const deleteDropFile = (index) => {
    dropFiles.value.splice(index, 1);
};
</script>

<template>
    <section>
        <o-field>
            <o-upload v-model="dropFiles" multiple drag-drop>
                <section class="ex-center">
                    <p>
                        <o-icon icon="upload" size="is-large" />
                    </p>
                    <p>Drop your files here or click to upload</p>
                </section>
            </o-upload>
        </o-field>

        <div class="tags">
            <span v-for="(file, index) in dropFiles" :key="index">
                {{ file.name }}
                <o-button
                    icon-left="times"
                    size="small"
                    native-type="button"
                    @click="deleteDropFile(index)">
                </o-button>
            </span>
        </div>
    </section>
</template>

<style lang="scss">
.ex-center {
    text-align: center;
}
</style>
