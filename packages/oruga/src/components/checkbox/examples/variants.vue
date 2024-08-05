<template>
    <section>
        <o-field>
            <o-checkbox :model-value="true" label="Default" />
        </o-field>

        <o-field>
            <o-checkbox :model-value="true" variant="primary" label="Primary" />
        </o-field>

        <o-field>
            <o-checkbox
                :model-value="true"
                variant="secondary"
                label="secondary" />
        </o-field>

        <o-field>
            <o-checkbox :model-value="true" variant="info" label="Info" />
        </o-field>

        <o-field>
            <o-checkbox :model-value="true" variant="success" label="Success" />
        </o-field>

        <o-field>
            <o-checkbox :model-value="true" variant="danger" label="Danger" />
        </o-field>

        <o-field>
            <o-checkbox :model-value="true" variant="warning" label="Warning" />
        </o-field>
    </section>
</template>
