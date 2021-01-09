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
                    description: "Root class of the element",
                },
                {
                    class: "trackClass",
                    description: "Class of the slider track",
                    action: () => {
                    }
                },
                {
                    class: "fillClass",
                    description: "Class of the filled part of the slider",
                    action: () => {
                    }
                },
                {
                    class: "thumbRoundedClass",
                    description: "Class when the slider is rounded",
                    properties: ["rounded"],
                    action: (cmp) => {
                        cmp.data.rounded = true
                    }
                },
                {
                    class: "thumbDraggingClass",
                    description: "Class when the thumb gets dragged",
                    warning: "Drag the thumb to see it in action!",
                    action: () => {
                    }
                },
                {
                    class: "disabledClass",
                    description: "Class when slider is disabled",
                    properties: ["disabled"],
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
                    description: "Class of the thumb wrapper",
                    action: (cmp) => {
                        cmp.data.fullScreen = true;
                    }
                },
                {
                    class: "thumbClass",
                    description: "Class of the thumb",
                    action: (cmp) => {
                        cmp.data.fullScreen = true;
                    }
                },
                {
                    class: "variantClass",
                    description : 'Class of the slider variant',
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        this.position = 'static';
                        cmp.data.variant = 'warning';
                    }
                }
            ],
        };
    },
};
</script>
