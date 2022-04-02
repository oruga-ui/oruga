<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-field :variant="s.fieldvariant" :message="s.fieldmessage">
                    <o-select placeholder="Select a character" v-bind="s" v-model="selectedOptions">
                        <optgroup label="Black Sails">
                            <option value="flint">Flint</option>
                            <option value="silver">Silver</option>
                            <option value="vane">Vane</option>
                            <option value="billy">Billy</option>
                            <option value="jack">Jack</option>
                        </optgroup>
                        <optgroup label="Breaking Bad">
                            <option value="heisenberg">Heisenberg</option>
                            <option value="jesse">Jesse</option>
                            <option value="saul">Saul</option>
                            <option value="mike">Mike</option>
                        </optgroup>
                    </o-select>
                </o-field>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedOptions: null,
            inspectData: [
                {
                    class: "rootClass",
                    description: "Class of the root element",
                    action: () => {
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconLeftSpaceClass",
                    description: "Class of the left icon space inside the select",
                    properties: ['icon'],
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconRightSpaceClass",
                    description: "Class of the right icon space inside the select",
                    properties: ['iconRight'],
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "roundedClass",
                    description: "Class of select when rounded",
                    properties: ['rounded'],
                    action: (cmp) => {
                        cmp.data.rounded = true;
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "multipleClass",
                    description: "Class of the select when multiple mode is active",
                    properties: ['multiple'],
                    action: (cmp) => {
                        cmp.data.multiple = true;
                        this.selectedOptions = [];
                    }
                },
                {
                    class: "expandedClass",
                    description: "Class of select when expanded",
                    properties: ['expanded'],
                    action: (cmp) => {
                        cmp.data.expanded = true;
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconLeftClass",
                    description: "Class of the left icon",
                    properties: ['icon'],
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconRightClass",
                    description: "Class of the right icon",
                    properties: ['iconRight'],
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "sizeClass",
                    description: "Class of the select size",
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'large';
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "variantClass",
                    description : 'Class of the select variant',
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.fieldvariant = 'info';
                        cmp.data.fieldmessage = "Info for this field"
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "selectClass",
                    description: "Class of the native select element"
                },
                {
                    class: "placeholderClass",
                    description: "Class of the select placeholder",
                    action: () => {
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "arrowClass",
                    description: "Class of the select arrow",
                    warning: "It applies the arrow icon using background-image and background-position on select element. An alternative to override it is iconRight prop (globally or not)",
                    action: () => {
                        this.selectedOptions = null;
                    }
                }
            ],
        };
    },
};
</script>
