<template>
  <div class="field">
    <doc-wrapper>
      <template v-slot:default="s">
      <o-autocomplete v-bind="s" group-field="type" group-options="items" placeholder="e.g. Vue.js" :data="filtered" icon="search" clearable @select="option => selected = option">
        <template slot="empty">No results found</template>
      </o-autocomplete>
      </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData"></inspector>
  </div>
</template>

<script>
export default {
    data() {
        return {
            filtered: [
                {
                    type: 'Frameworks',
                    items: ['Vue.js']
                }
            ],
            inspectData: [
                {
                    class: "rootClass",
                    description: "",
                },
                {
                    class: "menuClass",
                    description: "",
                    action: (cmp) => {
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                        el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : true}));
                    },
                },
                {
                    class: "expandedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    },
                },
                {
                    class: "menuPositionClass",
                    description: "",
                    action: (cmp) => {
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                        el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : true}));
                    },
                },
                {
                    class: "itemClass",
                    description: "",
                    action: (cmp) => {
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                        el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : true}));
                    },
                },
                {
                    class: "itemHoverClass",
                    description: "",
                    action: (cmp) => {
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                        el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, keyCode : 40,  charCode : 40, ctrlKey : false, altKey: false, shiftKey: false, metaKey: false}));
                        setTimeout(() => {
                            el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, keyCode : 40,  charCode : 40, ctrlKey : false, altKey: false, shiftKey: false, metaKey: false}));
                            el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, keyCode : 40,  charCode : 40, ctrlKey : false, altKey: false, shiftKey: false, metaKey: false}));
                        }, 500);
                    },
                },
                {
                    class: "itemGroupTitleClass",
                    description: "",
                    action: (cmp) => {
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                        el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : true}));
                    },
                },
            ],
        };
    }
}
</script>
