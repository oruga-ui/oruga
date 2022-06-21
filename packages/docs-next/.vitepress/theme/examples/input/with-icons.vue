<template>
  <section>
    <o-field>
      <o-input
        placeholder="Search..."
        type="search"
        icon="search"
        icon-clickable
        @icon-click="searchIconClick"
      >
      </o-input>
    </o-field>

    <o-field>
      <o-input
        placeholder="Email"
        v-model="email"
        type="email"
        icon="envelope"
        icon-right="times-circle"
        icon-right-clickable
        @icon-right-click="clearIconClick"
      >
      </o-input>
    </o-field>
  </section>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const email = ref('');
    
    function searchIconClick() {
      alert('You wanna make a search?');
    }
    
    function clearIconClick() {
      email.value = '';
      alert('Email cleared!');
    }

    return {
      email,
      searchIconClick,
      clearIconClick,
    };
  },
});
</script>
