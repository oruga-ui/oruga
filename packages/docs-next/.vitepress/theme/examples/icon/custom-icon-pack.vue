<template>
  <section>
    <div class="odocs-spaced">
      <o-icon pack="ionicons" icon="person" size="small"> </o-icon>
      <o-icon pack="ionicons" icon="home" size="small"> </o-icon>
      <o-icon pack="ionicons" icon="apps" size="small"> </o-icon>
    </div>

    <div class="odocs-spaced">
      <o-icon pack="ionicons" icon="person"> </o-icon>
      <o-icon pack="ionicons" icon="home"> </o-icon>
      <o-icon pack="ionicons" icon="apps"> </o-icon>
    </div>

    <div class="odocs-spaced">
      <o-icon pack="ionicons" icon="person" size="medium"> </o-icon>
      <o-icon pack="ionicons" icon="home" size="medium"> </o-icon>
      <o-icon pack="ionicons" icon="apps" size="medium"> </o-icon>
    </div>

    <div class="odocs-spaced">
      <o-icon pack="ionicons" icon="person" size="large" variant="success">
      </o-icon>
      <o-icon pack="ionicons" icon="home" size="large" variant="info"> </o-icon>
      <o-icon pack="ionicons" icon="apps" size="large" variant="primary">
      </o-icon>
    </div>

    <div class="odocs-spaced">
        <o-button variant="primary">
            <o-icon pack="ionicons" icon="checkmark"></o-icon>
            <span>Finish</span>
        </o-button>

        <o-button variant="warning">
            <o-icon pack="ionicons" icon="checkmark"></o-icon>
            <span>Finish</span>
        </o-button>

        <o-button variant="warning">
            <o-icon spin pack="ionicons" icon="refresh"> </o-icon>
            <span>Refresh</span>
        </o-button>
    </div>

  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { useProgrammatic } from '../../../../../oruga-next/dist/oruga'

const customIconConfig = {
  iconComponent: undefined,
  customIconPacks: {
    ionicons: {
      sizes: {
        default: 'is-size-5',
        small: '',
        medium: 'is-size-3',
        large: 'is-size-1',
      },
      iconPrefix: 'ion-md-',
      internalIcons: {
        check: 'checkmark',
        information: 'information',
        alert: 'alert',
        'alert-circle': 'alert',
        'arrow-up': 'arrow-up',
        'chevron-right': 'arrow-forward',
        'chevron-left': 'arrow-back',
        'chevron-down': 'arrow-down',
        eye: 'eye',
        'eye-off': 'eye-off',
        'caret-down': 'arrow-dropdown',
        'caret-up': 'arrow-dropup',
        loading: 'reload-outline',
        times: 'close-outline',
        'close-circle': 'close-circle-outline',
      }
    }
  }
}

export default defineComponent({
  setup() {

    // all code is only for example purpose

    const docsIcon = ref(undefined)

    const { oruga } = useProgrammatic()

    onBeforeMount(() => {
        docsIcon.value = oruga.config.getOptions().iconComponent
        oruga.config.setOptions(customIconConfig)
    })

    onBeforeUnmount(() => {
        oruga.config.setOptions({
            iconComponent: docsIcon.value,
        })
    })
  }

})
</script>

<style>
@import 'https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css';
</style>
