<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(0);

const collapses = ref([
    {
        title: "Open to read something intersting written for you!",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.  <br />
          Nulla accumsan, metus ultrices eleifend gravida,   <br />
          nulla nunc varius lectus, nec rutrum justo nibh eu lectus.  <br />
          Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.`,
    },
    {
        title: "What the different between Oruga and Buefy?",
        text: "Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br />",
    },
    {
        title: "Nothing special, ignore it!",
        text: "Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.",
    },
]);
</script>

<template>
    <section>
        <article v-for="(collapse, index) of collapses" :key="index">
            <o-collapse
                animation="slide"
                :open="isOpen == index"
                @update:open="isOpen = index">
                <template #trigger>
                    <o-button variant="success" :label="collapse.title" />
                </template>

                <div class="content">
                    <p v-html="collapse.text" />
                </div>
            </o-collapse>
        </article>
    </section>
</template>

<style scoped>
.content {
    position: relative;
    background-color: #fff;
    box-shadow:
        0 2px 3px hsla(0, 0%, 4%, 0.1),
        0 0 0 1px hsla(0, 0%, 4%, 0.1);
}

.content > p {
    padding: 1.5rem;
}
</style>
