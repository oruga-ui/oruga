<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <div class="sidebar-page">
                    <section class="sidebar-layout" v-if="position === 'static'">
                        <o-sidebar v-bind="s" position="static" open>
                            <img width="128" src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" alt="Lightweight UI components for Vue.js" />
                            <section style="padding: 1em">
                            <h5>Example 1</h5>
                            <h5>Example 2</h5>
                            <h5>Example 3</h5>
                            <h5>Example 4</h5>
                            <h5>Example 5</h5>
                            </section>
                        </o-sidebar>
                    </section>
                    <section class="sidebar-layout" v-if="position !== 'static'">
                        <o-sidebar v-bind="s" :position="position" :open.sync="open" variant="primary">
                            <img width="128" src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" alt="Lightweight UI components for Vue.js" />
                            <section style="padding: 1em">
                            <h5>Example 1</h5>
                            <h5>Example 2</h5>
                            <h5>Example 3</h5>
                            <h5>Example 4</h5>
                            <h5>Example 5</h5>
                            </section>
                        </o-sidebar>
                    </section>
                </div>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    data() {
        return {
            position: 'static',
            open: false,
            inspectData: [
                {
                    class: "rootClass",
                    description: "",
                    action: () => {
                        this.position = 'static';
                    }
                },
                {
                    class: "overlayClass",
                    description: "",
                    action: (cmp) => {
                        this.position = 'fixed';
                        setTimeout(() => {
                            this.open = true;
                            cmp.data.overlay = true
                            cmp.data.fullheight = true
                        }, 400)
                    }
                },
                {
                    class: "contentClass",
                    description: "",
                    action: () => {
                        this.position = 'static';
                    }
                },
                {
                    class: "fixedClass",
                    description: "",
                    action: (cmp) => {
                        this.position = 'fixed';
                        setTimeout(() => {
                            this.open = true;
                            cmp.data.overlay = true
                            cmp.data.fullheight = true
                        }, 400)
                    }
                },
                {
                    class: "staticClass",
                    description: "",
                    action: () => {
                        this.position = 'static';
                    }
                },
                {
                    class: "absoluteClass",
                    description: "",
                    action: (cmp) => {
                        this.position = 'absolute';
                        setTimeout(() => {
                            cmp.data.fullheight = true
                            this.open = true;
                        }, 400)
                    }
                },
                {
                    class: "fullheightClass",
                    description: "",
                    action: (cmp) => {
                        this.position = 'static';
                        cmp.data.fullheight = true;
                    }
                },
                {
                    class: "fullwidthClass",
                    description: "",
                    action: (cmp) => {
                        this.position = 'static';
                        cmp.data.fullwidth = true;
                    }
                },
                {
                    class: "rightClass",
                    description: "",
                    action: (cmp) => {
                        this.position = 'static';
                        cmp.data.right = true;
                    }
                },
                {
                    class: "reduceClass",
                    description: "",
                    action: (cmp) => {
                        this.position = 'static';
                        cmp.data.reduce = true;
                    }
                },
                {
                    class: "expandOnHoverClass",
                    description: "",
                    action: (cmp) => {
                        this.position = 'static';
                        cmp.data.expandOnHover = true;
                    }
                },
                {
                    class: "expandOnHoverFixedClass",
                    description: "",
                    action: (cmp) => {
                        this.position = 'fixed';
                        setTimeout(() => {
                            cmp.data.expandOnHover = true;
                            cmp.data.expandOnHoverFixed = true;
                            this.open = true;
                        }, 400)
                    }
                },
                {
                    class: "mobileReduceClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.mobile = 'reduce'
                        this.position = 'static';
                        cmp.data.variant = 'primary';
                    }
                },
                {
                    class: "mobileHideClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.mobile = 'hidden'
                        this.position = 'static';
                        cmp.data.variant = 'primary';
                    }
                },
                {
                    class: "mobileFullwidthClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.mobile = 'fullwidth'
                        this.position = 'static';
                        cmp.data.variant = 'primary';
                    }
                },
                {
                    class: "variantClass",
                    description: "",
                    action: (cmp) => {
                        this.position = 'static';
                        cmp.data.variant = 'warning';
                    }
                },
            ],
        };
    },
};
</script>
