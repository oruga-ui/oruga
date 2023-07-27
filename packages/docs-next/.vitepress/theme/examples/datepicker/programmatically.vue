<template>
    <section>
        <o-field>
            <o-datepicker
                ref="datepicker"
                expanded
                placeholder="Select a date" />
            <o-button
                icon-left="calendar"
                type="primary"
                @click="$refs.datepicker.toggle()" />
        </o-field>
    </section>
</template>
