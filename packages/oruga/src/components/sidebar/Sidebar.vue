<script setup lang="ts" generic="C extends Component">
import {
  ref,
  computed,
  watch,
  onMounted,
  useTemplateRef,
  type Component,
} from "vue";

import { getDefault } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import {
  defineClasses,
  useClickOutside,
  useEventListener,
  useMatchMedia,
  usePreventScrolling,
  useTrapFocus,
  getTeleportDefault,
} from "@/composables";

import type { SidebarProps } from "./props";
import type { CloseEventArgs } from "../programmatic";

/**
 * A sidebar to use as overlay.
 * @displayName Sidebar
 * @style _sidebar.scss
 */
defineOptions({
  isOruga: true,
  name: "OSidebar",
  configField: "sidebar",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SidebarProps<C>>(), {
  override: undefined,
  active: false,
  overlay: () => getDefault("sidebar.overlay", false),
  inline: false,
  position: () => getDefault("sidebar.position", "left"),
  fullheight: () => getDefault("sidebar.fullheight", false),
  fullwidth: () => getDefault("sidebar.fullwidth", false),
  mobile: () => getDefault("sidebar.mobile"),
  animation: () => getDefault("sidebar.animation"),
  cancelable: () => getDefault("sidebar.cancelable"),
  closeOnOutside: () => getDefault("sidebar.closeOnOutside", true),
  closeOnEscape: () => getDefault("sidebar.closeOnEscape", true),
  trapFocus: () => getDefault("sidebar.trapFocus", true),
  clipScroll: () => getDefault("sidebar.clipScroll", false),
  mobileBreakpoint: () => getDefault("sidebar.mobileBreakpoint"),
  teleport: () => getDefault("sidebar.teleport", false),
  component: undefined,
  props: undefined,
  events: undefined,
});

const emits = defineEmits<{
  /**
   * active prop two-way binding
   * @param value {boolean} - updated active prop
   */
  "update:active": [value: boolean];
  /**
   * on active state changes to false
   * @param event {Event} - native event
   */
  close: [...args: [] | [Event] | CloseEventArgs<C>];
}>();

defineSlots<{
  /**
   * Sidebar default content, default is component prop
   * @param close {(...args: [] | [Event]): void} - function to close the component
   */
  default?(props: {
    close: (...args: [] | [Event] | CloseEventArgs<C>) => void;
  }): void;
}>();

const { vTrapFocus } = useTrapFocus();

const rootRef = useTemplateRef("rootElement");
const contentRef = useTemplateRef("contentElement");

const isActive = defineModel<boolean>("active", { default: false });

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const _teleport = computed(() =>
  typeof props.teleport === "boolean"
    ? { to: getTeleportDefault(), disabled: !props.teleport }
    : { to: props.teleport, disabled: false },
);

const transitionName = computed(() => {
  if (props.animation) return props.animation;

  const vertical = props.position === "top" || props.position === "bottom";
  const right = props.position === "right";
  const open = right ? !isActive.value : isActive.value;

  return open
    ? vertical
      ? "slide-down"
      : "slide-next"
    : vertical
      ? "slide-up"
      : "slide-prev";
});

const hideOnMobile = computed(
  () => props.mobile === "hidden" && isMobile.value,
);

const toggleScroll = usePreventScrolling(props.clipScroll);

watch(
  isActive,
  (value) => {
    if (props.overlay) toggleScroll(value);
  },
  { flush: "post" },
);

onMounted(() => {
  if (isActive.value && props.overlay) toggleScroll(true);
});

// --- Events Feature ---

if (isClient) {
  // register onKeyup event listener when is active
  useEventListener(rootRef, "keyup", onKeyup, { trigger: isActive });

  if (!props.overlay && !props.inline)
  // register outside click event listener when is active
    useClickOutside(contentRef, clickedOutside, { trigger: isActive });
}

/** Keyup event listener that is bound to the root element. */
function onKeyup(event: KeyboardEvent): void {
  if (!props.closeOnEscape || checkNotCancelable("escape")) return;
  if (!isActive.value) return;
  if (event.key === "Escape" || event.key === "Esc") close(event);
}

/** Click outside event listener. */
function clickedOutside(event: Event): void {
  if (!props.closeOnOutside || checkNotCancelable("outside")) return;
  if (props.inline || !isActive.value || !isAnimated.value) return;
  if (
    props.overlay ||
    (contentRef.value && !event.composedPath().includes(contentRef.value))
  )
    event.preventDefault();
  close(event);
}

/** Check if the method is not in cancelable (for deprecreated check) */
function checkNotCancelable(
  method: Exclude<typeof props.cancelable, boolean>[number],
): boolean {
  return (
    typeof props.cancelable !== "undefined" &&
    ((typeof props.cancelable === "boolean" && !props.cancelable) ||
      !props.cancelable ||
      (Array.isArray(props.cancelable) &&
        !props.cancelable.includes(method)))
  );
}

/** set active to false and emit close event */
function close(...args: [] | [Event] | CloseEventArgs<C>): void {
  isActive.value = false;
  emits("close", ...args);
}

// --- Animation Feature ---

// TODO: check this
const isAnimated = ref(props.active);

/** Transition after-enter hook */
function afterEnter(): void {
  isAnimated.value = true;
}

/** Transition before-leave hook */
function beforeLeave(): void {
  isAnimated.value = false;
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
  ["rootClass", "o-sidebar"],
  ["mobileClass", "o-sidebar--mobile", null, isMobile],
  ["activeClass", "o-sidebar--active", null, isActive],
  [
    "teleportClass",
    "o-sidebar--teleport",
    null,
    computed(() => !!props.teleport),
  ],
  ["inlineClass", "o-sidebar--inline", null, computed(() => props.inline)],
);

const overlayClasses = defineClasses(["overlayClass", "o-sidebar__overlay"]);

const contentClasses = defineClasses(
  ["contentClass", "o-sidebar__content"],
  [
    "positionClass",
    "o-sidebar__content--",
    computed(() => props.position),
    computed(() => !!props.position),
  ],
  [
    "fullheightClass",
    "o-sidebar__content--fullheight",
    null,
    computed(() => props.fullheight),
  ],
  [
    "fullwidthClass",
    "o-sidebar__content--fullwidth",
    null,
    computed(() => props.fullwidth),
  ],
  [
    "contentMobileClass",
    "o-sidebar__content--",
    computed(() => props.mobile),
    computed(() => isMobile.value && !!props.mobile),
  ],
  ["visibleClass", "o-sidebar__content--visible", null, isActive],
  [
    "hiddenClass",
    "o-sidebar__content--hidden",
    null,
    computed(() => !isActive.value),
  ],
);
// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close });
</script>

<template>
  <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
    <div
      v-show="!hideOnMobile"
      ref="rootElement"
      v-bind="$attrs"
      v-trap-focus="trapFocus && isActive && !inline"
      data-oruga="sidebar"
      :class="rootClasses">
      <div
        v-if="overlay && isActive"
        :class="overlayClasses"
        :tabindex="-1"
        @click="clickedOutside" />

      <transition
        :name="transitionName"
        @after-enter="afterEnter"
        @before-leave="beforeLeave">
        <div
          v-show="isActive"
          ref="contentElement"
          :class="contentClasses">
          <slot :close="close">
            <!-- injected component for programmatic usage -->
            <component
              :is="component"
              v-if="component"
              v-bind="$props.props"
              v-on="$props.events || {}"
              @close="close" />
          </slot>
        </div>
      </transition>
    </div>
  </Teleport>
</template>
