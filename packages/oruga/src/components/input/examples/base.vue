<template>
    <section>
        <o-field label="Name">
            <o-input model-value="John Silver" />
        </o-field>

        <o-field label="Email" variant="danger" message="This email is invalid">
            <o-input type="email" model-value="john@" :maxlength="30" />
        </o-field>

        <o-field
            label="Username"
            variant="success"
            message="This username is available">
            <o-input model-value="johnsilver" :maxlength="30" />
        </o-field>

        <o-field label="Password">
            <o-input
                type="password"
                model-value="iwantmytreasure"
                password-reveal />
        </o-field>

        <o-field label="Message">
            <o-input
                :maxlength="200"
                type="textarea"
                placeholder="Enter some text..." />
        </o-field>

        <o-field>
            <o-input model-value="" placeholder="No label" />
        </o-field>

        <o-field label="Number">
            <o-input
                :model-value="42"
                number
                type="number"
                placeholder="Number"
                rounded />
        </o-field>

        <o-field label="Disabled">
            <o-input placeholder="Disabled" disabled />
        </o-field>

        <o-field label="Expanded">
            <o-input placeholder="Expanded" expanded />
        </o-field>

        <o-field label="Counter">
            <o-input
                placeholder="Counter"
                :maxlength="10"
                :maxitems="5"
                counter />
        </o-field>
    </section>
</template>
