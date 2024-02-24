<script setup>
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "triggerClass",
        description: "Class of the trigger element",
    },
    {
        class: "contentClass",
        description: "Class of the content",
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-collapse
            animation="slide"
            v-bind="props"
            :open="true"
            style="border: 1px solid #dfe2e5">
            <template #trigger="props">
                <div class="card-header" role="button">
                    <p class="card-header-title">Collapse Title</p>
                    <a class="card-header-icon">
                        <o-icon :icon="props.open ? 'caret-up' : 'caret-down'">
                        </o-icon>
                    </a>
                </div>
            </template>
            <div class="card-content">
                <div class="content">Collapse Content</div>
            </div>
        </o-collapse>
    </inspector-wrapper>
</template>
