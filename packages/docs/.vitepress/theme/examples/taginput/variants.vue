<template>
    <section>
        <o-field label="Primary">
            <o-taginput
                :model-value="['One']"
                :data="['One', 'Two', 'Three', 'Four']"
                :allow-new="false"
                variant="primary" />
        </o-field>

        <o-field label="Success">
            <o-taginput
                :model-value="['One']"
                :data="['One', 'Two', 'Three', 'Four']"
                :allow-new="false"
                variant="success" />
        </o-field>

        <o-field label="Info">
            <o-taginput
                :model-value="['One']"
                :data="['One', 'Two', 'Three', 'Four']"
                :allow-new="false"
                variant="info" />
        </o-field>

        <o-field label="Warning">
            <o-taginput
                :model-value="['One']"
                :data="['One', 'Two', 'Three', 'Four']"
                :allow-new="false"
                variant="warning" />
        </o-field>

        <o-field label="Danger">
            <o-taginput
                :model-value="['One']"
                :data="['One', 'Two', 'Three', 'Four']"
                :allow-new="false"
                variant="danger" />
        </o-field>
    </section>
</template>
