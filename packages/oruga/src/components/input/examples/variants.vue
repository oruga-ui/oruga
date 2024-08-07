<template>
    <section>
        <o-field label="Primary" variant="primary">
            <o-input placeholder="Primary" />
        </o-field>

        <o-field label="Secondary" variant="secondary">
            <o-input placeholder="Secondary" />
        </o-field>

        <o-field label="Success" variant="success">
            <o-input placeholder="Success" />
        </o-field>

        <o-field label="Info" variant="info">
            <o-input placeholder="Info" />
        </o-field>

        <o-field label="Warning" variant="warning">
            <o-input placeholder="Warning" />
        </o-field>

        <o-field
            label="Error"
            variant="danger"
            message="You can have a message too">
            <o-input placeholder="Error" />
        </o-field>
    </section>
</template>
