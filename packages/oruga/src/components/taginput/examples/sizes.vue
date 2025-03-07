<template>
    <section>
        <o-field label="Small">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                size="small"
                placeholder="Add an item"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Default">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                placeholder="Add an item"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Medium">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                size="medium"
                placeholder="Add an item"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Large">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                size="large"
                placeholder="Add an item"
                allow-new
                allow-duplicates />
        </o-field>
    </section>
</template>
