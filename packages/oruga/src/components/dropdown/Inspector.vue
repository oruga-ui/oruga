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
                    description: "Class of the root element"
                },
                {
                    class: "triggerClass",
                    description: "Class of the trigger element"
                },
                {
                    class: "mobileMenuOverlayClass",
                    description: "Class of the overlay when on mobile",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "menuClass",
                    description: "Class of the dropdown menu",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "disabledClass",
                    description: "Class of dropdown when disabled",
                    properties: ['disabled'],
                    action: (cmp) => {
                        cmp.data.disabled = true;
                    }
                },
                {
                    class: "menuActiveClass",
                    description: "Class of dropdown menu when active",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "menuInlineClass",
                    description: "Class of dropdown menu when inline",
                    properties: ['inline'],
                    action: (cmp) => {
                        cmp.data.inline = true;
                    }
                },
                {
                    class: "menuPositionClass",
                    description: "Class of dropdown menu position",
                    properties: ['position'],
                    suffixes: ['top-right', 'top-left', 'bottom-left'],
                    action: (cmp) => {
                        cmp.data.position = 'top-right';
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "menuMobileClass",
                    description: "Class of dropdown menu when on mobile",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "expandedClass",
                    description: "Class of dropdown when expanded",
                    properties: ['expanded'],
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    }
                }
            ],
        };
    },
};
</script>
