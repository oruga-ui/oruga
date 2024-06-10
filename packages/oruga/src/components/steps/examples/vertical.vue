<script setup lang="ts">
import { ref } from "vue";

const labelPosition = ref("bottom");
const position = ref(null);
const size = ref(null);
</script>

<template>
    <section>
        <o-field grouped>
            <o-field>
                <o-switch
                    v-model="position"
                    true-value="right"
                    label="Right position" />
            </o-field>
            <o-field label="Size">
                <o-select v-model="size" placeholder="Size">
                    <option :value="null">Default</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </o-select>
            </o-field>
            <o-field label="Label position" label-position="on-border">
                <o-select v-model="labelPosition">
                    <option value="bottom">Bottom</option>
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                </o-select>
            </o-field>
        </o-field>

        <o-steps
            :position="position"
            :label-position="labelPosition"
            :size="size"
            vertical>
            <o-step-item label="Account" icon="user-lock">
                Account: Lorem ipsum dolor sit amet. <br />
                Account: Lorem ipsum dolor sit amet. <br />
                Account: Lorem ipsum dolor sit amet.
            </o-step-item>

            <o-step-item label="Profile" icon="user">
                Profile: Lorem ipsum dolor sit amet. <br />
                Profile: Lorem ipsum dolor sit amet.? <br />
                Profile: Lorem ipsum dolor sit amet. <br />
                Profile: Lorem ipsum dolor sit amet.
            </o-step-item>

            <o-step-item label="Social" icon="user-plus" disabled>
                Social: Lorem ipsum dolor sit amet. <br />
                Social: Lorem ipsum dolor sit amet. <br />
                Social: Lorem ipsum dolor sit amet. <br />
                Social: Lorem ipsum dolor sit amet. <br />
                Social: Lorem ipsum dolor sit amet.
            </o-step-item>
        </o-steps>
    </section>
</template>
