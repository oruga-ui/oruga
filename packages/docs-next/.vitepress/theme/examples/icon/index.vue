<template>

	Oruga is compatible with both <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>
    and <a href="https://fontawesome.com/" target="_blank">FontAwesome 5</a> but you can also add your own custom icon pack.<br>

    <h2>Base</h2>

    <ExampleViewer :component="Base" :code="BaseCode" />

    <h2>Custom icon pack</h2>

    <p>
        You can also add it during Oruga import as default config.
    </p>

    <div class="tip custom-block">
        <p class="custom-block-title">TIP</p>
        <p>
            Take a look at below example code (click on "Show code") to know all internal icons to replace with the releated icons of your custom icon pack
        </p>
    </div>

    <ExampleViewer :component="CustomIconPack" :code="CustomIconPackCode" />

    <h2>Override icon pack</h2>

    <p>
        You can also customize some properties of the default icon packs. In this example, default sizes for FontAwesome have been modified.
    </p>

    <component :is="highlightjs" :code="customIconConfigCode" />

    <h2>Custom icon component</h2>

    <div class="tip custom-block">
        <p class="custom-block-title">TIP</p>
        <p>
            You can set the `iconComponent` config option to render icons with the vue-fontawesome component (it should work with other Vue icon components as well).
        </p>
    </div>

    <component :is="highlightjs" :code="faIconConfigCode" />

    <code>

    </code>

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import CustomIconPack from './custom-icon-pack.vue';
	import CustomIconPackCode from './custom-icon-pack.vue?raw';

    import { ref, markRaw, onBeforeMount } from 'vue'
    import 'highlight.js/lib/common';
    import 'highlight.js/styles/github-dark.css'

    const customIconConfigCode = ref(`
    const customIconConfig = {
        customIconPacks: {
            fas: {
                sizes: {
                    default: null,
                    small: null,
                    medium: "fa-lg",
                    large: "fa-2x"
                }
            }
        }
    }

    import Oruga from "@oruga-ui/oruga";
    app.use(Oruga, {
        iconComponent: "vue-fontawesome",
        iconPack: "fas",
        ...customIconConfig
    })
    `)

    const faIconConfigCode = ref(`
    import { library } from "@fortawesome/fontawesome-svg-core";
    // internal icons
    import {
        faCheck,
        faCheckCircle,
        faInfoCircle,
        faExclamationTriangle,
        faExclamationCircle,
        faArrowUp,
        faAngleRight,
        faAngleLeft,
        faAngleDown,
        faEye,
        faEyeSlash,
        faCaretDown,
        faCaretUp
    } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

    library.add(
        faCheck,
        faCheckCircle,
        faInfoCircle,
        faExclamationTriangle,
        faExclamationCircle,
        faArrowUp,
        faAngleRight,
        faAngleLeft,
        faAngleDown,
        faEye,
        faEyeSlash,
        faCaretDown,
        faCaretUp
    );
    app.component("vue-fontawesome", FontAwesomeIcon);

    // ...

    import Oruga from "@oruga-ui/oruga";
    app.use(Oruga, {
        iconComponent: "vue-fontawesome",
        iconPack: "fas"
    })
    `)

    const highlightjs = ref(null)

    onBeforeMount(() => {
        // due to esm build (probably better write a new viewer from scratch)
        import('@highlightjs/vue-plugin').then((val) => {
            highlightjs.value = markRaw(val.default.component)
        })
    })


</script>
