<template>
  <section>
    <div class="buttons">
      <o-button
        label="Launch notification (default)"
        size="medium"
        @click="simple"
      />
      <o-button
        label="Launch notification (custom)"
        variant="success"
        size="medium"
        @click="success"
      />
      <hr />
      <o-button label="Launch toast" size="medium" @click="toast" />
      <o-button
        label="Launch toast (queued)"
        variant="success"
        size="medium"
        @click="queueToast"
      />
      <hr />
      <o-button
        label="Launch notification (custom)"
        variant="danger"
        size="medium"
        @click="danger"
      />
      <o-button
        label="Launch notification (component)"
        variant="warning"
        size="medium"
        @click="component"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useProgrammatic } from '@oruga-ui/oruga-next'

const NotificationForm = {
  props: ['email', 'password'],
  template: `
                <form action="">
                    <div class="modal-card" style="width: auto">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Login</p>
                        </header>
                        <section class="modal-card-body">
                            <o-field label="Email">
                                <o-input
                                    type="email"
                                    :value="email"
                                    placeholder="Your email"
                                    required>
                                </o-input>
                            </o-field>

                            <o-field label="Password">
                                <o-input
                                    type="password"
                                    :value="password"
                                    password-reveal
                                    placeholder="Your password"
                                    required>
                                </o-input>
                            </o-field>

                            <o-field>
                                <o-checkbox>Remember me</o-checkbox>
                            </o-field>
                        </section>
                        <footer class="modal-card-foot">
                            <o-button type="button" @click="$emit('close')">Close</o-button>
                            <o-button variant="primary">Login</o-button>
                        </footer>
                    </div>
                </form>
            `
}

export default defineComponent({
  setup() {

    const oruga = useProgrammatic()

    function toast() {
      oruga.notification.open({
        message: 'Something happened correctly!',
        rootClass: 'toast-notification',
        position: 'top'
      })
    }

    function queueToast() {
      oruga.notification.open({
        message: 'Something happened correctly!',
        rootClass: 'toast-notification',
        position: 'top',
        queue: true
      })
    }

    function simple() {
      oruga.notification.open('Something happened')
    }

    function success() {
      oruga.notification.open({
        message: 'Something happened correctly!',
        variant: 'success',
        closable: true
      })
    }

    function danger() {
      const notif = oruga.notification.open({
        duration: 5000,
        message: `Something's not good, also I'm on <b>bottom</b>`,
        position: 'bottom-right',
        variant: 'danger',
        closable: true,
        onClose: () => {
          oruga.notification.open('Custom notification closed!')
        }
      })
    }

    function component() {
      oruga.notification.open({
        component: NotificationForm,
        position: 'bottom-right',
        variant: 'warning',
        indefinite: true
      })
    }

    return {
      simple,
      success,
      toast,
      queueToast,
      danger,
      component
    }
  }
})
</script>

<style>
.toast-notification {
  margin: 0.5em 0;
  text-align: center;
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  border-radius: 2em;
  padding: 0.75em 1.5em;
  pointer-events: auto;
  color: rgba(0, 0, 0, 0.7);
  background: #ffdd57;
}
</style>
