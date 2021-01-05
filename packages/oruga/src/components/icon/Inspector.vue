<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-icon v-bind="s" pack="fas" icon="home"></o-icon>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inspectData: [
                {
                    class: "rootClass",
                    description: ""
                },
                {
                    class: "clickableClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.clickable = true;
                    }
                },
                {
                    class: "spinClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.spin = true;
                    }
                },
                {
                    class: "sizeClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.size = "large";
                    }
                },
                {
                    class: "variantClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.variant = "warning";
                    }
                },
            ],
        };
    },
};
</script>
