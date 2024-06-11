<script setup lang="ts">
import { ref } from "vue";

const name = ref("John Silver");
</script>

<template>
    <section>
        <o-field label="Name">
            <o-input v-model="name" />
        </o-field>

        <o-field label="Email" variant="danger" message="This email is invalid">
            <o-input type="email" value="john@" :maxlength="30" />
        </o-field>

        <o-field
            label="Username"
            variant="success"
            message="This username is available">
            <o-input value="johnsilver" :maxlength="30" />
        </o-field>

        <o-field label="Password">
            <o-input type="password" value="iwantmytreasure" password-reveal />
        </o-field>

        <o-field label="Message">
            <o-input :maxlength="200" type="textarea" />
        </o-field>

        <o-field>
            <o-input placeholder="No label" />
        </o-field>

        <o-field label="Number">
            <o-input
                :model-value="42"
                number
                type="number"
                placeholder="Number"
                rounded />
        </o-field>

        <o-field label="Disabled">
            <o-input placeholder="Disabled" disabled />
        </o-field>

        <o-field>
            <o-input placeholder="Large" size="large" icon="user" />
        </o-field>
    </section>
</template>
