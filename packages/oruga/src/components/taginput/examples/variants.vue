<template>
    <section>
        <o-field label="Primary">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="primary"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Secondary">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="secondary"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Success">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="success"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Info">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="info"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Warning">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="warning"
                allow-new
                allow-duplicates />
        </o-field>

        <o-field label="Danger">
            <o-taginput
                :model-value="['One']"
                :options="['One', 'Two', 'Three', 'Four']"
                variant="danger"
                allow-new
                allow-duplicates />
        </o-field>
    </section>
</template>
