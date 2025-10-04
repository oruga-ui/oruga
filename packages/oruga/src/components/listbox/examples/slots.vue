<template>
    <section class="odocs-spaced">
        <o-field label="Find a name">
            <o-listbox
                :options="[
                    {
                        label: 'Jesse Simmons',
                        value: {
                            id: 1,
                            user: { first_name: 'Jesse', last_name: 'Simmons' },
                            date: '2016/10/15 13:43:27',
                            gender: 'Male',
                        },
                    },
                    {
                        label: 'John Jacobs',
                        value: {
                            id: 2,
                            user: { first_name: 'John', last_name: 'Jacobs' },
                            date: '2016/12/15 06:00:53',
                            gender: 'Male',
                        },
                    },
                ]">
                <template #empty> No results found </template>
                <template #header> Header </template>
                <template #footer> Footer </template>
            </o-listbox>
        </o-field>
    </section>
</template>
