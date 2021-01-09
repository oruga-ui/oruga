<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <p style="position: relative">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    <o-loading v-bind="s" icon="sync-alt" :active.sync="loading" :iconSpin="true">
                    </o-loading>
                </p>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            inspectData: [
                {
                    class: "rootClass",
                    description: "Class of the root element",
                    action: (cmp) => {
                        cmp.data.canCancel = true;
                        cmp.data.fullPage = false;
                        this.loading = true;
                    }
                },
                {
                    class: "overlayClass",
                    description: "Class of the loading overlay",
                    action: (cmp) => {
                        cmp.data.canCancel = true;
                        cmp.data.fullPage = false;
                        this.loading = true;
                    }
                },
                {
                    class: "iconClass",
                    description: "Class for the loading icon",
                    action: (cmp) => {
                        cmp.data.canCancel = true;
                        cmp.data.fullPage = false;
                        this.loading = true;
                    }
                },
                {
                    class: "fullPageIconClass",
                    description: "Class for the loading icon when fullpage",
                    properties: ['fullPage'],
                    action: (cmp) => {
                        cmp.data.fullPage = true;
                        cmp.data.canCancel = true;
                        this.loading = true;
                    }
                }
            ],
        };
    },
};
</script>
