<template>
    <section>
        <o-field
            horizontal
            label="Subject"
            variant="danger"
            message="Please enter a subject">
            <o-input
                name="subject"
                expanded
                placeholder="Please enter a subject..." />
        </o-field>

        <o-field horizontal label="From">
            <o-input name="name" placeholder="Name" expanded />
            <o-input
                name="email"
                type="email"
                placeholder="nobody@nowhere.com"
                expanded />
        </o-field>

        <o-field horizontal label="Topic">
            <o-select placeholder="Select a topic">
                <option value="1">Oruga</option>
                <option value="2">Vue.js</option>
                <option value="3">UI</option>
            </o-select>
        </o-field>

        <o-field horizontal label="Message">
            <o-input type="textarea" placeholder="Enter a messasge..." />
        </o-field>

        <o-field horizontal>
            <o-button
                variant="primary"
                icon-left="envelope"
                label="Send message"
                outlined />
        </o-field>
    </section>
</template>
