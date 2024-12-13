<template>
    <section>
        <o-field>
            <o-switch :model-value="true" label="Default" />
        </o-field>

        <o-field>
            <o-switch :model-value="true" variant="primary" label="Primary" />
        </o-field>

        <o-field>
            <o-switch
                :model-value="true"
                variant="secondary"
                label="Secondary" />
        </o-field>

        <o-field>
            <o-switch :model-value="true" variant="info" label="Info" />
        </o-field>

        <o-field>
            <o-switch :model-value="true" variant="success" label="Success" />
        </o-field>

        <o-field>
            <o-switch :model-value="true" variant="warning" label="Warning" />
        </o-field>

        <o-field>
            <o-switch :model-value="true" variant="danger" label="Danger" />
        </o-field>
    </section>
</template>
