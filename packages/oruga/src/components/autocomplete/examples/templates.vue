<template>
    <section class="odocs-spaced">
        <o-field label="Find a name">
            <o-autocomplete
                open-on-focus
                keep-open
                keep-first
                selectable-header
                selectable-footer>
                <template #header> Header </template>

                <o-dropdown-item label="Jesse Simmons" :value="1" />
                <o-dropdown-item label="John Jacobs" :value="2" />

                <template #footer> Footer </template>

                <template #empty> No results found </template>
            </o-autocomplete>
        </o-field>
    </section>
</template>
