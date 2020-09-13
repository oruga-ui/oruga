<template>
  <section>
  <o-collapse :open="true" animation="slide">
    <template v-slot:trigger="props">
      <o-button>{{ props.open ? 'close' : 'open' }}</o-button>
      </template>
    <section>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <o-field label="Find a JS framework">
            <o-autocomplete
                rounded
                v-model="name"
                :data="filteredDataArray"
                placeholder="e.g. jQuery"
                icon="search"
                clearable
                @select="option => selected = option">
                <template v-slot:empty>No results found</template>
            </o-autocomplete>
        </o-field>
    </section>
  </o-collapse>

  <section>
        <p>
            <o-button @click="activeTab = 1">Set Music</o-button>
        </p>
        <p>
            <o-switch v-model="showBooks"> Show Books item </o-switch>
            <o-switch v-model="multiline"> Multiline </o-switch>
        </p>
        <o-tabs v-model="activeTab" :multiline="multiline">
            <o-tab-item label="Pictures">
                Lorem ipsum dolor sit amet.
            </o-tab-item>

            <o-tab-item label="Music">
                Lorem <br>
                ipsum <br>
                dolor <br>
                sit <br>
                amet.
            </o-tab-item>

            <o-tab-item :visible="showBooks" label="Books">
                What light is light, if Silvia be not seen? <br>
                What joy is joy, if Silvia be not by— <br>
                Unless it be to think that she is by <br>
                And feed upon the shadow of perfection? <br>
                Except I be by Silvia in the night, <br>
                There is no music in the nightingale.
            </o-tab-item>

            <o-tab-item label="Videos" icon="video" disabled>
                Nunc nec velit nec libero vestibulum eleifend.
                Curabitur pulvinar congue luctus.
                Nullam hendrerit iaculis augue vitae ornare.
                Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </o-tab-item>
        </o-tabs>
    </section>
  </section>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
      return {
        activeTab: null,
        showBooks: false,
        multiline: false,
        data: [
            'Angular',
            'Angular 2',
            'Aurelia',
            'Backbone',
            'Ember',
            'jQuery',
            'Meteor',
            'Node.js',
            'Polymer',
            'React',
            'RxJS',
            'Vue.js'
        ],
        name: '',
        selected: null
      }
    },
    computed: {
        filteredDataArray() {
            return this.data.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(this.name.toLowerCase()) >= 0
            })
        }
    }
}
</script>
