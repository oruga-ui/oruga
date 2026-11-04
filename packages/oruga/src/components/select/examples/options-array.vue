<template>
    <section>
        <o-field label="Character">
            <o-select
                placeholder="Select a character"
                expanded
                icon="user"
                :options="[
                    { label: 'Flint', value: 'flint' },
                    { label: 'Silver', value: 'silver' },
                    { label: 'Vane', value: 'vane' },
                    { label: 'Billy', value: 'billy' },
                    {
                        label: 'Jack',
                        value: 'jack',
                        disabled: true,
                    },
                ]" />
        </o-field>
    </section>
</template>
