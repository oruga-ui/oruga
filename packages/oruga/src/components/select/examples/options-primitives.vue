<template>
    <section>
        <o-field label="Select a character">
            <o-select
                placeholder="Select a character"
                expanded
                icon="user"
                :options="[
                    'Tyrion Lannister',
                    'Jamie Lannister',
                    'Daenerys Targaryen',
                    'Jon Snow',
                ]" />
        </o-field>
    </section>
</template>
