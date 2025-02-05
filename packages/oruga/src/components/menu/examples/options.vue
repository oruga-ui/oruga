<template>
    <section>
        <o-menu
            label="Groceries"
            :accordion="false"
            :options="[
                {
                    label: 'Fruits',
                    attrs: {
                        icon: 'info-circle',
                    },
                    options: ['Apple', 'Banana', 'Watermelon'],
                },
                {
                    label: 'Vegetables',
                    attrs: {
                        icon: 'info-circle',
                    },
                    options: ['Carrot', 'Broccoli', 'Cucumber', 'Onion'],
                },
            ]" />
    </section>
</template>
