<script setup>
import { ref } from "vue";

const size = ref("");
const variant = ref(null);
const passive = ref(null);
const isRounded = ref(false);
const position = ref("right");
</script>

<template>
    <section>
        <o-field grouped>
            <o-switch v-model="isRounded">Rounded</o-switch>
            <o-switch v-model="position" true-value="left" false-value="right">
                Label on left
            </o-switch>
        </o-field>
        <o-field label="Variant">
            <o-select v-model="variant" expanded placeholder="Variant">
                <option value="null">Default</option>
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
            </o-select>
        </o-field>
        <o-field label="Passive Variant">
            <o-select v-model="passive" expanded placeholder="Passive Variant">
                <option value="null">Default</option>
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
            </o-select>
        </o-field>
        <o-field label="Size">
            <o-select v-model="size" expanded>
                <option value="">Default</option>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
            </o-select>
        </o-field>
        <o-switch
            :rounded="isRounded"
            :position="position"
            :size="size"
            :variant="variant"
            :passive-variant="passive"
            >Sample</o-switch
        >
    </section>
</template>
