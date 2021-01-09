<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-slider v-bind="s" :value="30"> </o-slider>
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
                    description: "",
                },
                {
                    class: "trackClass",
                    description: "",
                    action: () => {
                    }
                },
                {
                    class: "fillClass",
                    description: "",
                    action: () => {
                    }
                },
                {
                    class: "roundedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.rounded = true
                    }
                },
                {
                    class: "draggingClass",
                    description: "",
                    action: () => {
                    }
                },
                {
                    class: "disabledClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.disabled = true;
                    }
                },
                {
                    class: "biggerSliderFocusClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.biggerSliderFocus = true;
                    }
                },
                {
                    class: "thumbWrapperClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.fullScreen = true;
                    }
                },
                {
                    class: "thumbClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.fullScreen = true;
                    }
                },
                {
                    class: "variantClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.variant = 'warning';
                    }
                },
            ],
        };
    },
};
</script>
