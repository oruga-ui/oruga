<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-modal v-bind="s" :active.sync="isImageModalActive">
                    <p style="text-align: center">
                        <img src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
                    </p>
                </o-modal>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isImageModalActive: false,
            inspectData: [
                {
                    class: "rootClass",
                    description: "Class of the root element",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "overlayClass",
                    description: "Class of the modal overlay",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "contentClass",
                    description: "Class of the modal content",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "closeClass",
                    description: "Class of the close button",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "fullScreenClass",
                    description: "Class of the modal when fullscreen",
                    properties: ['fullScreen'],
                    action: (cmp) => {
                        this.isImageModalActive = true;
                        cmp.data.fullScreen = true;
                    }
                }
            ],
        };
    },
};
</script>
