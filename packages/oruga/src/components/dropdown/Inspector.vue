<template>
  <div>
    <doc-wrapper>
        <template v-slot:default="s">
            <o-dropdown v-bind="s" aria-role="list">
                <o-button variant="primary" slot="trigger" slot-scope="{ active }" ref="dropdownbtn">
                    <span>Click me!</span>
                    <o-icon :icon="active ? 'caret-up' : 'caret-down'"></o-icon>
                </o-button>
                <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
                <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
                <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
            </o-dropdown>
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
                    class: "triggerClass",
                    description: ""
                },
                {
                    class: "mobileBackgroundClass",
                    description: "",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "menuClass",
                    description: "",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
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
                    class: "activeClass",
                    description: "",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "inlineClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.inline = true;
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "mobileClass",
                    description: "",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "expandedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    }
                }
            ],
        };
    },
};
</script>
