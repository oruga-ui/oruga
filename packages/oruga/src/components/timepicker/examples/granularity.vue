<template>
    <section>
        <o-field label="Select timepicker">
            <o-timepicker
                placeholder="Click to select"
                icon="clock"
                enable-seconds
                :increment-minutes="5"
                :increment-hours="2"
                :increment-seconds="15" />
        </o-field>
    </section>
</template>
