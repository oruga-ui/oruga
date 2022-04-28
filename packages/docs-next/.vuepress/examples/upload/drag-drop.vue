<template>
  <section>
    <o-field>
      <o-upload v-model="dropFiles" multiple drag-drop>
        <section class="ex-center">
          <p>
            <o-icon icon="upload" size="is-large">
            </o-icon>
          </p>
          <p>Drop your files here or click to upload</p>
        </section>
      </o-upload>
    </o-field>

    <div class="tags">
      <span v-for="(file, index) in dropFiles" :key="index">
        {{ file.name }}
        <o-button icon-left="times" size="small" native-type="button" @click="deleteDropFile(index)">
        </o-button>
      </span>
    </div>
  </section>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const dropFiles = ref([])
        const deleteDropFile = (index) => {
            dropFiles.value.splice(index, 1)
        }
        return { dropFiles, deleteDropFile }
    }
})
</script>

<style>
.ex-center {
  text-align: center;
}
</style>
