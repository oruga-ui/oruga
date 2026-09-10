<template>
    <section class="odocs-spaced">
        <o-field label="Find a JS framework">
            <o-autocomplete
                :options="['Angular', 'Ember', 'jQuery', 'React', 'Vue.js']"
                disabled
                rounded
                expanded
                placeholder="e.g. jQuery"
                icon="search"
                clearable
                open-on-focus />
        </o-field>
    </section>
</template>
