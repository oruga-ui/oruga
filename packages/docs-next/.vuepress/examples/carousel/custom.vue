<template>
  <section>
    <div class="example-component">
      <o-field grouped group-multiline>
        <div class="control">
          <o-switch v-model="autoPlay">Autoplay</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="pauseHover" :disabled="!autoPlay"
            >Pause on hover</o-switch
          >
        </div>
        <div class="control">
          <o-switch v-model="drag">Drag event</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="repeat" :disabled="!autoPlay">Repeat</o-switch>
        </div>
      </o-field>
      <o-field grouped group-multiline>
        <o-field label="Value">
          <o-input
            type="number"
            v-model.number="carousel"
            min="0"
            :max="carousels.length - 1"
          />
        </o-field>
        <o-field label="Interval">
          <o-input
            type="number"
            v-model.number="interval"
            min="0"
            step="1000"
            :disabled="!autoPlay"
          />
        </o-field>
      </o-field>
    </div>

    <o-carousel
      v-model="carousel"
      :has-drag="drag"
      :autoplay="autoPlay"
      :pause-hover="pauseHover"
      :interval="interval"
      :repeat="repeat"
    >
      <o-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <section
          class="ex-slide"
          :style="{ 'background-color': carousel.color }"
        >
          <h1>{{ carousel.title }}</h1>
          <o-input :placeholder="carousel.title"></o-input>
          <p>A link that <a href="#arrow">goes to arrow</a></p>
        </section>
      </o-carousel-item>
    </o-carousel>
  </section>
</template>

<script>
export default {
  data() {
    return {
      carousel: 0,
      animated: "slide",
      drag: false,
      autoPlay: false,
      pauseHover: false,
      pauseInfo: false,
      repeat: false,
      interval: 3000,
      carousels: [
        { text: "Slide 1", color: "#445e00" },
        { text: "Slide 2", color: "#006724" },
        { text: "Slide 3", color: "#b60000" },
        { text: "Slide 4", color: "#f4c300" },
        { text: "Slide 5", color: "#005c98" },
      ],
    };
  },
};
</script>