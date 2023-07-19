<script setup>
import { ref } from "vue";

const checkbox = ref(false);
const checkboxCustom = ref("Yes");
</script>

<template>
    <section>
        <div class="field">
            <o-checkbox>Basic</o-checkbox>
        </div>
        <div class="field">
            <o-checkbox v-model="checkbox">
                {{ checkbox }}
            </o-checkbox>
        </div>
        <div class="field">
            <o-checkbox
                v-model="checkboxCustom"
                true-value="Yes"
                false-value="No">
                {{ checkboxCustom }}
            </o-checkbox>
        </div>
        <div class="field">
            <o-checkbox :indeterminate="true"> Indeterminate </o-checkbox>
        </div>
        <div class="field">
            <o-checkbox disabled>Disabled</o-checkbox>
        </div>
    </section>
</template>
