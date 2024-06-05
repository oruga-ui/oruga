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
            :open="isOpen == index"
            @open="isOpen = index">
            <template #trigger="props">
                <div class="card-header" role="button">
                    <p class="card-header-title">
                        {{ collapse.title }}
                    </p>
                    <a class="card-header-icon">
                        <o-icon :icon="props.open ? 'caret-up' : 'caret-down'">
                        </o-icon>
                    </a>
                </div>
            </template>
            <div class="card-content">
                <div class="content" v-html="collapse.text" />
            </div>
        </o-collapse>
    </section>
</template>

<style>
.card {
    background-color: #fff;
    box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.1), 0 0 0 1px hsla(0, 0%, 4%, 0.1);
    color: #4a4a4a;
    max-width: 100%;
    position: relative;
}

.card-header {
    background-color: transparent;
    align-items: stretch;
    box-shadow: 0 1px 2px hsla(0, 0%, 4%, 0.1);
    display: flex;
}

.card-header-title {
    align-items: center;
    color: #363636;
    display: flex;
    flex-grow: 1;
    font-weight: 700;
    padding: 0.75rem;
    margin: 0;
}

.card-header-icon {
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 0.75rem;
    justify-content: center;
}

.card-content {
    padding: 1.5rem;
    background-color: transparent;
}
</style>
