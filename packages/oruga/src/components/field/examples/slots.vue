<template>
    <section>
        <o-field horizontal>
            <template #label>
                With tooltip
                <o-tooltip label="Help text here for explanation">
                    <o-icon size="small" icon="question-circle" />
                </o-tooltip>
            </template>
            <o-input size="medium" placeholder="Label with tooltip" />
        </o-field>

        <o-field>
            <template #label> Label with custom <i>style</i> </template>
            <o-input placeholder="Custom label and message" />
            <template #message> Message with custom <b>style</b> </template>
        </o-field>
    </section>
</template>
