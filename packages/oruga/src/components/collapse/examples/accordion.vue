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
        <o-collapse
            v-for="(collapse, index) of collapses"
            :key="index"
            class="card"
            animation="slide"
            expanded
            :open="isOpen == index"
            @update:open="isOpen = index">
            <template #trigger="{ open }">
                <div class="card-header">
                    <span class="card-header-title">
                        {{ collapse.title }}
                    </span>

                    <span class="card-header-icon">
                        <o-icon :icon="open ? 'caret-up' : 'caret-down'" />
                    </span>
                </div>
            </template>

            <div class="card-content">
                <p class="content" v-html="collapse.text" />
            </div>
        </o-collapse>
    </section>
</template>

<style scoped>
.card {
    position: relative;
    background-color: #fff;
    box-shadow:
        0 2px 3px hsla(0, 0%, 4%, 0.1),
        0 0 0 1px hsla(0, 0%, 4%, 0.1);
}

.card-header {
    display: flex;
    align-items: center;
    box-shadow: 0 1px 2px hsla(0, 0%, 4%, 0.1);
}

.card-header-title {
    flex-grow: 1;
    font-weight: 700;
    padding: 0.75rem;
}

.card-header-icon {
    cursor: pointer;
    padding: 0.75rem;
}

.card-content {
    padding: 1.5rem;
}
</style>
