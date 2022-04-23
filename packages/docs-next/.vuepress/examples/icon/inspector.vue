@@ -1,59 +0,0 @@
<template>
    <doc-wrapper :inspect-class="inspectClass">
        <template v-slot:default="s">
            <o-icon v-bind="s" pack="fas" icon="home"></o-icon>
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
                    description: "Class of the root element"
                },
                {
                    class: "clickableClass",
                    description: "Class of the icon when clickable",
                    properties: ['clickable'],
                    action: (cmp) => {
                        cmp.data.clickable = true;
                    }
                },
                {
                    class: "spinClass",
                    description: "Class of the element when spin",
                    properties: ['spin'],
                    action: (cmp) => {
                        cmp.data.spin = true;
                    }
                },
                {
                    class: "sizeClass",
                    description : 'Class of the icon size',
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = "large";
                    }
                },
                {
                    class: "variantClass",
                    description : 'Class of the icon variant',
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.variant = "warning";
                    }
                },
            ],
        };
    },
};
</script>
