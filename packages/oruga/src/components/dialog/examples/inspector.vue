<script setup lang="ts">
import type { InspectData } from "@docs";
import type { DialogClasses, DialogProps } from "../props";

const inspectData: InspectData<DialogClasses, DialogProps> = {
  rootClass: {
    class: "rootClass",
    description: "Class of the root element.",
  },
  mobileClass: {
    class: "mobileClass",
    description: "Class of the root element when on mobile.",
    info: "Switch to mobile view to see it in action!",
    action: (data): void => {
      data.active = true;
    },
  },
  activeClass: {
    class: "activeClass",
    description: "Class of the root element when active.",
    properties: ["active"],
    action: (data): void => {
      data.active = true;
    },
  },
  fullscreenClass: {
    class: "fullscreenClass",
    description: "Class of the root element when fullscreen",
    properties: ["fullscreen"],
    action: (data): void => {
      data.fullscreen = true;
    },
  },
  teleportClass: {
    class: "teleportClass",
    description: "Class of the root element when teleported.",
    properties: ["teleport"],
    action: (data): void => {
      data.teleport = true;
      data.active = true;
    },
  },
  textPositionClass: {
    class: "textPositionClass",
    description: "Class of the root element with text position.",
    properties: ["textPosition"],
    suffixes: ["left", "center", "right"],
    action: (data) => {
      data.textPosition = "center";
    },
  },
  backdropClass: {
    class: "backdropClass",
    description: "Class of the backdrop overlay element.",
    properties: ["backdrop"],
    action: (data): void => {
      data.active = true;
      data.backdrop = true;
    },
  },
  wrapperClass: {
    class: "wrapperClass",
    description: "Class of the wrapper element.",
  },
  headerClass: {
    class: "headerClass",
    description: "Class of the header element.",
  },
  titleClass: {
    class: "titleClass",
    description: "Class of the header title element.",
  },
  subtitleClass: {
    class: "subtitleClass",
    description: "Class of the header subtitle element.",
  },
  closeClass: {
    class: "closeClass",
    description: "Class of the header close element.",
  },
  figureClass: {
    class: "figureClass",
    description: "Class of the image figure element.",
  },
  imageClass: {
    class: "imageClass",
    description: " Class of the image element.",
  },
  bodyClass: {
    class: "bodyClass",
    description: " Class of the body element.",
  },
  contentClass: {
    class: "contentClass",
    description: "Class of the body content element.",
  },
  footerClass: {
    class: "footerClass",
    description: "Class of the footer element.",
  },
  footerPositionClass: {
    class: "footerPositionClass",
    description: "Class of the footer element with position.",
    properties: ["buttonPosition"],
    suffixes: ["left", "center", "right"],
    action: (data) => {
      data.buttonPosition = "center";
    },
  },
  confirmButtunClass: {
    class: "confirmButtunClass",
    description: "Class of the footer confirm button element.",
    properties: ["confirmButton"],
    action: (data) => {
      data.confirmButton = "Confirm";
    },
  },
  cancelButtonClass: {
    class: "cancelButtonClass",
    description: "Class of the footer cancel button element.",
    properties: ["cancelButton"],
    action: (data) => {
      data.cancelButton = "Cancel";
    },
  },
  scrollClipClass: {
    class: "scrollClipClass",
    description: "Class of the body when dialog is active and has blockScroll.",
    properties: ["blockScroll"],
    action: (data): void => {
      data.active = true;
      data.blockScroll = true;
    },
  },
  scrollKeepClass: {
    class: "scrollKeepClass",
    description: "Class of the body when dialog is active and has not blockScroll.",
    properties: ["blockScroll"],
    action: (data): void => {
      data.active = true;
      data.blockScroll = false;
    },
  },
};
</script>

<template>
  <inspector-wrapper v-slot="props" :inspect-data="inspectData">
    <o-dialog
      closeable
      title="Dialog title"
      subtitle="Dialog subtitle"
      image-alt="Oruga Logo"
      image-src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
      content="With supporting text below as a natural lead-in to additional content."
      footer="Footer content"
      v-bind="props" />
  </inspector-wrapper>
</template>
