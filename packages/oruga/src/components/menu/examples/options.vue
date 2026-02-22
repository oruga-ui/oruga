<template>
    <section>
        <o-menu
            label="Groceries"
            :accordion="false"
            :options="[
                {
                    label: 'Fruits',
                    icon: 'info-circle',
                    options: ['Apple', 'Banana', 'Watermelon'],
                },
                {
                    label: 'Vegetables',
                    icon: 'info-circle',
                    options: ['Carrot', 'Broccoli', 'Cucumber', 'Onion'],
                },
            ]" />
    </section>
</template>
