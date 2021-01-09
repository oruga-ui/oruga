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
                    description: "",
                    action: (cmp) => {
                        cmp.data.canCancel = true;
                        cmp.data.fullPage = false;
                        this.loading = true;
                    }
                },
                {
                    class: "backgroundClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.canCancel = true;
                        cmp.data.fullPage = false;
                        this.loading = true;
                    }
                },
                {
                    class: "iconClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.canCancel = true;
                        cmp.data.fullPage = false;
                        this.loading = true;
                    }
                },
                {
                    class: "fullPageIconClass",
                    description: "",
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
