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
                    description: "",
                    action: () => {
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconsLeftClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconsRightClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "roundedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.rounded = true;
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "multipleClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.multiple = true;
                        this.selectedOptions = [];
                    }
                },
                {
                    class: "expandedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.expanded = true;
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconLeftClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconRightClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "sizeClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.size = 'large';
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "variantClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.fieldvariant = 'info';
                        cmp.data.fieldmessage = "Info for this field"
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "placeholderClass",
                    description: "",
                    action: () => {
                        this.selectedOptions = null;
                    }
                }
            ],
        };
    },
};
</script>
