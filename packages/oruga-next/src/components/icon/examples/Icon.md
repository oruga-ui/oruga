
## Examples

Oruga is compatible with both <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>
and <a href="https://fontawesome.com/" target="_blank">FontAwesome 5</a> but you can also add your custom icon pack.<br>

### Base

::: demo
```html
<template>
    <section>
        <div class="block">
            <o-icon
                pack="fas"
                icon="user"
                size="small">
            </o-icon>
            <o-icon
                pack="fas"
                icon="home"
                size="small">
            </o-icon>
            <o-icon
                pack="fas"
                icon="tachometer-alt"
                size="small">
            </o-icon>
        </div>

        <div class="block">
            <o-icon
                pack="fas"
                icon="user">
            </o-icon>
            <o-icon
                pack="fas"
                icon="home">
            </o-icon>
            <o-icon
                pack="fas"
                icon="tachometer-alt">
            </o-icon>
        </div>

        <div class="block">
            <o-icon
                pack="fas"
                icon="user"
                size="medium">
            </o-icon>
            <o-icon
                pack="fas"
                icon="home"
                size="medium">
            </o-icon>
            <o-icon
                pack="fas"
                icon="tachometer-alt"
                size="medium">
            </o-icon>
        </div>

        <div class="block">
            <o-icon
                pack="fas"
                icon="user"
                size="large"
                variant="success">
            </o-icon>
            <o-icon
                pack="fas"
                icon="home"
                size="large"
                variant="info">
            </o-icon>
            <o-icon
                pack="fas"
                icon="tachometer-alt"
                size="large"
                variant="primary">
            </o-icon>
        </div>

        <o-button variant="success">
            <o-icon pack="fas" icon="check"></o-icon>
            <span>Finish</span>
        </o-button>

        <o-button variant="warning">
            <o-icon pack="fas" icon="check"></o-icon>
            <span>Finish</span>
        </o-button>

        <o-button variant="warning">
            <o-icon
                pack="fas"
                icon="sync-alt"
                spin>
            </o-icon>
            <span>Refresh</span>
        </o-button>
    </section>
</template>

<script>
    export default {
    }
</script>
```
:::

### Custon icon pack

<p>
    Can also add it during Oruga import
</p>

::: demo
```html
<template>
    <section>
        <div class="block">
            <o-icon
                pack="ionicons"
                icon="person"
                size="small">
            </o-icon>
            <o-icon
                pack="ionicons"
                icon="home"
                size="small">
            </o-icon>
            <o-icon
                pack="ionicons"
                icon="apps"
                size="small">
            </o-icon>
        </div>

        <div class="block">
            <o-icon
                pack="ionicons"
                icon="person">
            </o-icon>
            <o-icon
                pack="ionicons"
                icon="home">
            </o-icon>
            <o-icon
                pack="ionicons"
                icon="apps">
            </o-icon>
        </div>

        <div class="block">
            <o-icon
                pack="ionicons"
                icon="person"
                size="medium">
            </o-icon>
            <o-icon
                pack="ionicons"
                icon="home"
                size="medium">
            </o-icon>
            <o-icon
                pack="ionicons"
                icon="apps"
                size="medium">
            </o-icon>
        </div>

        <div class="block">
            <o-icon
                pack="ionicons"
                icon="person"
                size="large"
                variant="success">
            </o-icon>
            <o-icon
                pack="ionicons"
                icon="home"
                size="large"
                variant="info">
            </o-icon>
            <o-icon
                pack="ionicons"
                icon="apps"
                size="large"
                variant="primary">
            </o-icon>
        </div>

        <o-button variant="primary">
            <o-icon pack="ionicons" icon="checkmark"></o-icon>
            <span>Finish</span>
        </o-button>

        <o-button variant="warning">
            <o-icon pack="ionicons" icon="checkmark"></o-icon>
            <span>Finish</span>
        </o-button>

        <o-button variant="warning">
            <o-icon
                spin
                pack="ionicons"
                icon="refresh">
            </o-icon>
            <span>Refresh</span>
        </o-button>
    </section>
</template>

<script>
    const customIconConfig = {
        iconComponent: undefined,
        customIconPacks: {
            'ionicons': {
                sizes: {
                    'default': 'is-size-5',
                    'small': '',
                    'medium': 'is-size-3',
                    'large': 'is-size-1'
                },
                iconPrefix: 'ion-md-',
                internalIcons: {
                    'check': 'checkmark',
                    'information': 'information',
                    'check-circle': 'checkmark-circle-outline',
                    'alert': 'alert',
                    'alert-circle': 'alert',
                    'arrow-up': 'arrow-up',
                    'chevron-right': 'arrow-forward',
                    'chevron-left': 'arrow-back',
                    'chevron-down': 'arrow-down',
                    'eye': 'eye',
                    'eye-off': 'eye-off',
                    'caret-down': 'arrow-dropdown',
                    'caret-up': 'arrow-dropup'
                }
            }
        }
    }
    export default {
        data() {
            return {
                docsIcon: undefined
            }
        },
        created() {
            this.$oruga.config.setOptions(customIconConfig)
        },
        beforeCreate() {
            // only for docs purpose
            const docsIcon = this.$oruga.config.getOptions().iconComponent
            if (typeof window !== 'undefined') {
                window.requestAnimationFrame(() => {
                    this.$oruga.config.setOptions({
                        iconComponent: docsIcon
                    })
                })
            }
        }
    }
</script>

<style>
    @import "https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css";
</style>
```
:::

### Override icon pack

<p>
    Can also customize some properties of the default icon packs. In this example, default sizes for FontAwesome have been modified.
</p>

```js
const customIconConfig = {
    customIconPacks: {
        'fas': {
            sizes: {
                'default': null,
                'small': null,
                'medium': 'fa-lg',
                'large': 'fa-2x'
            }
        }
    }
}
export default {
    created() {
        this.$oruga.config.setOptions(customIconConfig)
    }
}
```

### Custom icon component

::: tip
You can set the `iconComponent` config option to render icons with the vue-fontawesome component (it should works with other Vue icon components).
:::

```js
import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload);
Vue.component('vue-fontawesome', FontAwesomeIcon);

// ...

import Oruga from '@oruga-ui/oruga'
Vue.use(Oruga, {
  iconComponent: 'vue-fontawesome',
  iconPack: 'fas'
});
```
