<template>
    <section>
        <o-field label="Primary">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="primary"
                placeholder="Add an item"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Secondary">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="secondary"
                placeholder="Add an item"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Success">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="success"
                placeholder="Add an item"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Info">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="info"
                placeholder="Add an item"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Warning">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="warning"
                placeholder="Add an item"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Danger">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="danger"
                placeholder="Add an item"
                allow-new
                allow-duplicates />
        </o-field>
    </section>
</template>
