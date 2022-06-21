<template>
    <section>
        <div class="odocs-spaced">
            <o-button size="medium" variant="primary"
                @click="promptModal()">
                Open prompt
            </o-button>
            <o-button size="medium" variant="primary"
                @click="promptModalCloseAll()">
                Open prompt (closeAll timeout)
            </o-button>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { useProgrammatic } from '@oruga-ui/oruga-next'
import ModalForm from './_modal-form-async.vue'

export default defineComponent({
    setup() {

        const { oruga } = useProgrammatic()

        const promptModal = async () => {
            const instance = oruga.modal.open({
                // parent is only for Vue2. in Vue 3 omit this option
                parent: this,
                component: ModalForm,
                props: {
                    title: 'Ship sprockets?',
                    message: 'Do you really want me to ship the selected sprockets?'
                },
                trapFocus: true
            })
            // Note utilizing the promise requires Promise be supported by the browser
            // If you are running Vue 2 on IE 11 this will not be the case unless you
            // add a polyfill in your build.
            const result = await instance.promise

            oruga.notification.open({
                duration: 5000,
                message: 'Modal dialog returned ' + JSON.stringify(result),
                variant: 'info',
                position: 'top',
                closable: true
            })
        }

        const promptModalCloseAll = async () => {
            const instance = oruga.modal.open({
                // parent is only for Vue2. in Vue 3 omit this option
                parent: this,
                component: ModalForm,
                props: {
                    title: 'Close All test',
                    message: 'There is a 3 second timeout that will close all programmatic modals'
                },
                trapFocus: true
            })

            setTimeout(() => oruga.modal.closeAll({action:'closeAll'}), 3 * 1000)

            // Note utilizing the promise requires Promise be supported by the browser
            // If you are running Vue 2 on IE 11 this will not be the case unless you
            // add a polyfill in your build.
            const result = await instance.promise

            oruga.notification.open({
                duration: 5000,
                message: 'Modal dialog returned ' + JSON.stringify(result),
                variant: 'info',
                position: 'top',
                closable: true
            })
        }

        return {
            promptModal,
            promptModalCloseAll
        }
    }
})
</script>

