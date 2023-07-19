<script setup>
import { ref } from "vue";

const name = ref("John Silver");
</script>

<template>
    <section>
        <o-field label="Name">
            <o-input v-model="name" />
        </o-field>

        <o-field label="Email" variant="danger" message="This email is invalid">
            <o-input type="email" value="john@" maxlength="30" />
        </o-field>

        <o-field
            label="Username"
            variant="success"
            message="This username is available">
            <o-input value="johnsilver" maxlength="30" />
        </o-field>

        <o-field label="Password">
            <o-input type="password" value="iwantmytreasure" password-reveal />
        </o-field>

        <o-field label="Message">
            <o-input maxlength="200" type="textarea" />
        </o-field>

        <o-field>
            <o-input placeholder="No label" />
        </o-field>

        <o-field label="Rounded">
            <o-input placeholder="No label" rounded />
        </o-field>

        <o-field label="Success" variant="success">
            <o-input placeholder="Success" />
        </o-field>

        <o-field
            label="Error"
            variant="danger"
            message="You can have a message too">
            <o-input placeholder="Error" />
        </o-field>

        <o-field label="Info" variant="info">
            <o-input placeholder="Info" />
        </o-field>

        <o-field label="Warning" variant="warning">
            <o-input placeholder="Warning" />
        </o-field>

        <o-field label="Disabled">
            <o-input placeholder="Disabled" disabled />
        </o-field>

        <o-field>
            <o-input placeholder="Large" size="large" icon="user" />
        </o-field>
    </section>
</template>
