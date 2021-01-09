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
                    description: "",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "backgroundClass",
                    description: "",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "contentClass",
                    description: "",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "closeClass",
                    description: "",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "fullScreenClass",
                    description: "",
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
