<template>
  <section>
    <div class="example-component">
      <o-field grouped group-multiline>
        <div class="control">
          <o-switch v-model="arrow">Arrow</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="arrowHover" :disabled="!arrow">Arrow on hover</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="drag">Drag event</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="repeat">Repeat</o-switch>
        </div>
      </o-field>
      <o-field grouped group-multiline>
        <o-field label="Items to Show">
          <o-input type="number" v-model.number="perList" min="1" :max="items.length" />
        </o-field>
        <o-field label="Items to List">
          <o-input type="number" v-model.number="increment" min="1" :max="items.length - 1" />
        </o-field>
      </o-field>
    </div>
    <o-carousel v-model="values" :arrow="arrow" :arrow-hover="arrowHover" :items-to-show="perList" :items-to-list="increment" :repeat="repeat" :has-drag="drag">
      <o-carousel-item v-for="(item, i) in items" :key="i">
        <img :src="item.image" />
      </o-carousel-item>
    </o-carousel>
  </section>
</template>

<script>
export default {
  data() {
    return {
      arrow: true,
      arrowHover: true,
      drag: true,
      values: 1,
      perList: 4,
      increment: 1,
      repeat: false,
      items: [
        {
          title: 'Slide 1',
          image: 'https://picsum.photos/id/1/1230/500',
        },
        {
          title: 'Slide 2',
          image: 'https://picsum.photos/id/2/1230/500',
        },
        {
          title: 'Slide 3',
          image: 'https://picsum.photos/id/3/1230/500',
        },
        {
          title: 'Slide 4',
          image: 'https://picsum.photos/id/4/1230/500',
        },
        {
          title: 'Slide 5',
          image: 'https://picsum.photos/id/5/1230/500',
        },
        {
          title: 'Slide 6',
          image: 'https://picsum.photos/id/6/1230/500',
        },
        {
          title: 'Slide 7',
          image: 'https://picsum.photos/id/7/1230/500',
        },
      ],
    }
  },
}
</script>

