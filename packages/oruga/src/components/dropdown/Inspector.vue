<template>
  <div>
    <doc-wrapper>
        <template v-slot:default="s">
            <o-dropdown v-model="currentMenu" v-bind="s" aria-role="list">
                <o-button variant="primary" slot="trigger" slot-scope="{ active }" ref="dropdownbtn">
                    <span>Click me!</span>
                    <o-icon :icon="active ? 'caret-up' : 'caret-down'"></o-icon>
                </o-button>
                <o-dropdown-item v-bind="s" value="ac1" aria-role="listitem">Action</o-dropdown-item>
                <o-dropdown-item v-bind="s" value="ac2" aria-role="listitem">Another action</o-dropdown-item>
                <o-dropdown-item v-bind="s" value="ac3" disabled aria-role="listitem">Something else</o-dropdown-item>
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
            currentMenu: '',
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
                    class: "menuMobileOverlayClass",
                    description: "Class of the overlay when on mobile",
                    warning: "Switch to mobile view to see it in action!",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "menuClass",
                    description: "Class of the dropdown menu",
                    warning: "Switch to mobile view to see it in action!",
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
                    warning: "Switch to mobile view to see it in action!",

                    properties: ['inline'],
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "menuInlineClass",
                    description: "Class of dropdown menu when inline",
                    warning: "Switch to mobile view to see it in action!",
                    properties: ['inline'],
                    action: (cmp) => {
                        cmp.data.inline = true;
                    }
                },
                {
                    class: "menuPositionClass",
                    description: "Class of dropdown menu position",
                    warning: "Switch to mobile view to see it in action!",
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
                    class: "mobileClass",
                    description: "Class of dropdown when on mobile",
                    warning: "Switch to mobile view to see it in action!",
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
                },
                {
                    class: "itemClass",
                    description: "Class of the dropdown item",
                    properties: ['disabled'],
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "itemActiveClass",
                    description: "Class of the dropdown item when active",
                    action: () => {
                        setTimeout(() => {
                            this.currentMenu = 'ac1'
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "itemDisabledClass",
                    description: "Class of the dropdown item when disabled",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
            ],
        };
    },
};
</script>
