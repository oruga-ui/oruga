<script setup lang="ts">
import type { InspectData } from "@docs";
import type {
  CarouselClasses,
  CarouselItemClasses,
  CarouselProps,
  CarouselItemProps,
} from "../props";

const slides = [
  { text: "Slide 1", color: "#445e00" },
  { text: "Slide 2", color: "#006724" },
  { text: "Slide 3", color: "#b60000" },
  { text: "Slide 4", color: "#f4c300" },
  { text: "Slide 5", color: "#005c98" },
];

const inspectData: InspectData<
    CarouselClasses & CarouselItemClasses,
    CarouselProps<unknown> & CarouselItemProps<unknown>
> = {
  rootClass: {
    class: "rootClass",
    description: "Class of the root element.",
  },
  overlayClass: {
    class: "overlayClass",
    description: "Class of the root element when overlay.",
    properties: ["overlay"],
    action: (data): void => {
      data.overlay = true;
    },
  },
  wrapperClass: {
    class: "wrapperClass",
    description: "Class of the inner wrapper element.",
  },
  itemsClass: {
    class: "itemsClass",
    description: "Class of the items container element.",
  },
  itemsDraggingClass: {
    class: "itemsDraggingClass",
    description: "Class of the items container element when dragging.",
    properties: ["dragable"],
  },
  iconClass: {
    class: "iconClass",
    description: "Class of the icon button elements.",
  },
  iconPrevClass: {
    class: "iconPrevClass",
    description: "Class of the prev icon button element.",
    action: (data): void => {
      data.modelValue = 1;
    },
  },
  iconNextClass: {
    class: "iconNextClass",
    description: "Class of the next icon button element.",
  },
  iconAutoplayClass: {
    class: "iconAutoplayClass",
    description: "Class of the autoplay icon button element.",
  },
  indicatorsClass: {
    class: "indicatorsClass",
    description: "Class of the indicators tablist element.",
  },
  indicatorsInsideClass: {
    class: "indicatorsInsideClass",
    description: "Class of the indicators tablist element when inside.",
    properties: ["indicatorInside"],
    action: (data): void => {
      data.indicatorInside = true;
    },
  },
  indicatorsPositionClass: {
    class: "indicatorsPositionClass",
    description: "Class of the indicators tablist element with position.",
    properties: ["indicatorPosition"],
    action: (data): void => {
      data.indicatorInside = true;
      data.indicatorPosition = "top";
    },
  },
  indicatorClass: {
    class: "indicatorClass",
    description: "Class of the indicator tab element.",
  },
  indicatorItemClass: {
    class: "indicatorItemClass",
    description: "Class of the indicator item element.",
  },
  indicatorItemActiveClass: {
    class: "indicatorItemActiveClass",
    description: "Class of the indicator item element when active.",
  },
  indicatorItemStyleClass: {
    class: "indicatorItemStyleClass",
    properties: ["indicatorStyle"],
    description:
            "Class of indicator the item element to separate different styles.",
    action: (data): void => {
      data.indicatorStyle = "lines";
    },
  },
  itemClass: {
    class: "itemClass",
    subitem: "carouselitem",
    description: "Class of the item element.",
  },
  itemActiveClass: {
    class: "itemActiveClass",
    subitem: "carouselitem",
    description: "Class of the item element when active.",
  },
  itemClickableClass: {
    class: "itemClickableClass",
    subitem: "carouselitem",
    description: "Class of the item element when clickable.",
    properties: ["clickable"],
  },
  itemTitleClass: {
    class: "itemTitleClass",
    subitem: "carouselitem",
    description: "Class of the item title element.",
    properties: ["title"],
  },
  itemSubtitleClass: {
    class: "itemSubtitleClass",
    subitem: "carouselitem",
    description: "Class of the item subtitle element.",
    properties: ["subtitle"],
  },
  itemImageClass: {
    class: "itemImageClass",
    subitem: "carouselitem",
    description: "Class of the item image wrapper element.",
    properties: ["image"],
  },
};
</script>

<template>
  <inspector-wrapper v-slot="props" :inspect-data="inspectData">
    <o-carousel v-bind="props">
      <o-carousel-item
        v-for="slide in slides"
        :key="slide.text"
        :title="slide.text"
        :style="{
          'background-color': slide.color,
          padding: '9rem 4.5rem',
          color: '#ffffff',
          'text-align': 'center',
        }" />
    </o-carousel>
  </inspector-wrapper>
</template>
