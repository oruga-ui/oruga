<template>
    <doc-wrapper :inspect-class="inspectClass">
        <template v-slot:default="s">
            <section>
                <o-field>
                    <o-upload v-bind="s">
                        <section class="ex-center">
                            <p>
                                <o-icon icon="upload" size="is-large"> </o-icon>
                            </p>
                            <p v-if="s.dragDrop">Drop your files here or click to upload</p>
                            <p v-if="!s.dragDrop">Click to upload</p>
                        </section>
                    </o-upload>
                </o-field>
            </section>
        </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData" @inspect-class="inspectClass = $event"></inspector>
</template>

<script>
export default {
    data() {
        return {
            inspectClass: {},
            inspectData: [
                {
                    class: "rootClass",
                    description: "Root class of the element",
                },
                {
                    class: "draggableClass",
                    description: "Upload class when draggable",
                    properties: ['dragDrop'],
                    action: (cmp) => {
                        cmp.data.dragDrop = true;
                    }
                },
                {
                    class: "expandedClass",
                    description: "Upload class when expanded",
                    properties: ['expanded'],
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    }
                },
                {
                    class: "disabledClass",
                    description: "Upload class when disabled",
                    properties: ['disabled'],
                    action: (cmp) => {
                        cmp.data.disabled = true;
                    }
                },
                {
                    class: "hoveredClass",
                    description: "Upload class on dragging",
                    properties: ['dragDrop'],
                    warning: 'Drag & drop a file to see it in action!',
                    action: (cmp) => {
                        cmp.data.dragDrop = true;
                    }
                },
                {
                    class: "variantClass",
                    description : 'Class of the upload variant',
                    properties: ["variant", "dragDrop"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    warning: 'Drag & drop a file to see it in action!',
                    action: (cmp) => {
                        cmp.data.variant = 'warning';
                        cmp.data.dragDrop = true;
                    }
                }
            ]
        };
    },
};
</script>
