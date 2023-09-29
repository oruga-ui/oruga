<script lang="ts">
import { defineComponent } from "vue";
import OCollapse from "../Collapse.vue";
export default defineComponent({
    data() {
        return {
            isOpen: 0,
            collapses: [
                {
                    title: "Title 1",
                    text: "Text 1",
                },
                {
                    title: "Title 2",
                    text: "Text 2",
                },
                {
                    title: "Title 3",
                    text: "Text 3",
                },
            ],
        };
    },
    components: {
        [OCollapse.name]: OCollapse,
    },
});
</script>

<template>
    <section>
        <o-collapse
            class="card"
            animation="slide"
            v-for="(collapse, index) of collapses"
            :key="index"
            :open="isOpen == index"
            @open="isOpen = index">
            <template #trigger="props">
                <div
                    class="card-header"
                    role="button"
                    :aria-controls="'contentIdForA11y5-' + index"
                    :aria-expanded="isOpen == index">
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
                <div class="content">
                    {{ collapse.text }}
                </div>
            </div>
        </o-collapse>
    </section>
</template>

<style>
.card {
    background-color: #fff;
    box-shadow:
        0 2px 3px hsla(0, 0%, 4%, 0.1),
        0 0 0 1px hsla(0, 0%, 4%, 0.1);
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
