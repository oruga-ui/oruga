<script lang="ts">
import type { Component, PropType } from "vue";
import { defineComponent } from "vue";

import Input from "../input/Input.vue";

import BaseComponentMixin from "../../utils/BaseComponentMixin";
import FormElementMixin from "../../utils/FormElementMixin";

import {
    getValueByPath,
    removeElement,
    createAbsoluteElement,
    toCssDimension,
    debounce,
} from "../../utils/helpers";
import { getOptions } from "../../utils/config";

/**
 * Extended input that provide suggestions while the user types
 * @displayName Autocomplete
 * @style _autocomplete.scss
 */
export default defineComponent({
    name: "OAutocomplete",
    configField: "autocomplete",
    components: {
        [Input.name]: Input,
    },
    mixins: [BaseComponentMixin, FormElementMixin],
    inheritAttrs: false,
    emits: [
        "update:modelValue",
        "select",
        "select-header",
        "select-footer",
        "infinite-scroll",
        "typing",
        "focus",
        "blur",
        "invalid",
        "icon-click",
        "icon-right-click",
    ],
    props: {
        /** @model */
        modelValue: [Number, String],
        /** Options / suggestions */
        data: {
            type: Array,
            default: () => [],
        },
        /** Native options to use in HTML5 validation */
        autocomplete: String,
        /**
         * Vertical size of input, optional
         * @values small, medium, large
         */
        size: String,
        /** Property of the object (if data is array of objects) to use as display text, and to keep track of selected option */
        field: {
            type: String,
            default: "value",
        },
        /** The first option will always be pre-selected (easier to just hit enter or tab) */
        keepFirst: Boolean,
        /** Clear input text on select */
        clearOnSelect: Boolean,
        /** Open dropdown list on focus */
        openOnFocus: Boolean,
        /** Function to format an option to a string for display in the input as alternative to field prop) */
        customFormatter: Function,
        /** Makes the component check if list reached scroll end and emit infinite-scroll event. */
        checkInfiniteScroll: Boolean,
        /** Keep open dropdown list after select */
        keepOpen: Boolean,
        /** Add a button/icon to clear the inputed text */
        clearable: Boolean,
        /**
         * Icon name to be added on the clear button
         */
        clearIcon: {
            type: String,
            default: () => {
                return getValueByPath(
                    getOptions(),
                    "autocomplete.clearIcon",
                    "close-circle",
                );
            },
        },
        /** Max height of dropdown content */
        maxHeight: [String, Number],
        /**
         * Position of dropdown
         * @values auto, top, bottom
         */
        menuPosition: {
            type: String,
            default: "auto",
        },
        /** Transition name to apply on dropdown list */
        animation: {
            type: String,
            default: () => {
                return getValueByPath(
                    getOptions(),
                    "autocomplete.animation",
                    "fade",
                );
            },
        },
        /** Property of the object (if <code>data</code> is array of objects) to use as display text of group */
        groupField: String,
        /** Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional */
        groupOptions: String,
        /** Number of milliseconds to delay before to emit typing event */
        debounceTyping: Number,
        /** Icon name to be added on the right side */
        iconRight: String,
        /** Clickable icon right if exists */
        iconRightClickable: Boolean,
        /** Append autocomplete content to body */
        appendToBody: Boolean,
        /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
        confirmKeys: {
            type: Array,
            default: () => ["Tab", "Enter"],
        },
        /** Input type */
        type: {
            type: String,
            default: "text",
        },
        /**
         * Menu tag name
         */
        menuTag: {
            type: [String, Object, Function] as PropType<string | Component>,
            default: () => {
                return getValueByPath(
                    getOptions(),
                    "autocomplete.menuTag",
                    "div",
                );
            },
        },
        /**
         * Menu item tag name
         */
        itemTag: {
            type: [String, Object, Function] as PropType<string | Component>,
            default: () => {
                return getValueByPath(
                    getOptions(),
                    "autocomplete.itemTag",
                    "div",
                );
            },
        },
        /** Trigger the select event for the first pre-selected option when clicking outside and <code>keep-first</code> is enabled */
        selectOnClickOutside: Boolean,
        /** Allows the header in the autocomplete to be selectable */
        selectableHeader: Boolean,
        /** Allows the footer in the autocomplete to be selectable */
        selectableFooter: Boolean,
        rootClass: [String, Function, Array],
        menuClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        menuPositionClass: [String, Function, Array],
        itemClass: [String, Function, Array],
        itemHoverClass: [String, Function, Array],
        itemGroupTitleClass: [String, Function, Array],
        itemEmptyClass: [String, Function, Array],
        itemHeaderClass: [String, Function, Array],
        itemFooterClass: [String, Function, Array],
        inputClasses: {
            type: Object,
            default: () => {
                return getValueByPath(
                    getOptions(),
                    "autocomplete.inputClasses",
                    {},
                );
            },
        },
    },
    data() {
        return {
            selected: null,
            hovered: null,
            headerHovered: null,
            footerHovered: null,
            isActive: false,
            newValue: this.modelValue,
            ariaAutocomplete: this.keepFirst ? "both" : "list",
            newAutocomplete: this.autocomplete || "off",
            isListInViewportVertically: true,
            hasFocus: false,
            itemRefs: [],
            width: undefined,
            bodyEl: undefined, // Used to append to body
        };
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass("rootClass", "o-acp"),
                {
                    [this.computedClass("expandedClass", "o-acp--expanded")]:
                        this.expanded,
                },
            ];
        },
        menuClasses() {
            return [
                this.computedClass("menuClass", "o-acp__menu"),
                {
                    [this.computedClass(
                        "menuPositionClass",
                        "o-acp__menu--",
                        this.newDropdownPosition,
                    )]: !this.appendToBody,
                },
            ];
        },
        itemClasses() {
            return [this.computedClass("itemClass", "o-acp__item")];
        },
        itemEmptyClasses() {
            return [
                ...this.itemClasses,
                this.computedClass("itemEmptyClass", "o-acp__item--empty"),
            ];
        },
        itemGroupClasses() {
            return [
                ...this.itemClasses,
                this.computedClass(
                    "itemGroupTitleClass",
                    "o-acp__item-group-title",
                ),
            ];
        },
        itemHeaderClasses() {
            return [
                ...this.itemClasses,
                this.computedClass("itemHeaderClass", "o-acp__item-header"),
                {
                    [this.computedClass(
                        "itemHoverClass",
                        "o-acp__item--hover",
                    )]: this.headerHovered,
                },
            ];
        },
        itemFooterClasses() {
            return [
                ...this.itemClasses,
                this.computedClass("itemFooterClass", "o-acp__item-footer"),
                {
                    [this.computedClass(
                        "itemHoverClass",
                        "o-acp__item--hover",
                    )]: this.footerHovered,
                },
            ];
        },
        inputBind() {
            return {
                ...this.$attrs,
                ...this.inputClasses,
            };
        },
        computedData() {
            if (this.groupField) {
                if (this.groupOptions) {
                    const newData = [];
                    this.data.forEach((option) => {
                        const group = getValueByPath(option, this.groupField);
                        const items = getValueByPath(option, this.groupOptions);
                        newData.push({ group, items });
                    });
                    return newData;
                } else {
                    const tmp = {};
                    this.data.forEach((option) => {
                        const group = getValueByPath(option, this.groupField);
                        if (!tmp[group]) tmp[group] = [];
                        tmp[group].push(option);
                    });
                    const newData = [];
                    Object.keys(this.data).forEach((group) => {
                        newData.push({ group, items: this.data[group] });
                    });
                    return newData;
                }
            }
            return [{ items: this.data }];
        },
        isEmpty() {
            if (!this.computedData) return true;
            return !this.computedData.some(
                (element) => element.items && element.items.length,
            );
        },
        /**
         * White-listed items to not close when clicked.
         * Add input, dropdown and all children.
         */
        whiteList() {
            const whiteList = [];
            whiteList.push(this.$refs.input.$el.querySelector("input"));
            whiteList.push(this.$refs.dropdown);
            // Add all children from dropdown
            if (this.$refs.dropdown !== undefined) {
                const children = this.$refs.dropdown.querySelectorAll("*");
                for (const child of children) {
                    whiteList.push(child);
                }
            }
            return whiteList;
        },

        newDropdownPosition() {
            if (
                this.menuPosition === "top" ||
                (this.menuPosition === "auto" &&
                    !this.isListInViewportVertically)
            ) {
                return "top";
            }
            return "bottom";
        },

        newIconRight() {
            if (this.clearable && this.newValue && this.clearIcon) {
                return this.clearIcon;
            }
            return this.iconRight;
        },

        newIconRightClickable() {
            if (this.clearable) {
                return true;
            }
            return this.iconRightClickable;
        },

        menuStyle() {
            return {
                maxHeight: toCssDimension(this.maxHeight),
            };
        },

        $elementRef() {
            return "input";
        },
    },
    watch: {
        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        modelValue(value) {
            this.newValue = value;
        },

        /**
         * When dropdown is toggled, check the visibility to know when
         * to open upwards.
         */
        isActive(active) {
            if (this.menuPosition === "auto") {
                if (active) {
                    this.calcDropdownInViewportVertical();
                } else {
                    // Timeout to wait for the animation to finish before recalculating
                    setTimeout(() => {
                        this.calcDropdownInViewportVertical();
                    }, 100);
                }
            }
        },

        /**
         * When updating input's value
         *   1. Emit changes
         *   2. If value isn't the same as selected, set null
         *   3. Close dropdown if value is clear or else open it
         */
        newValue(value) {
            this.$emit("update:modelValue", value);
            // Check if selected is invalid
            const currentValue = this.getValue(this.selected);
            if (currentValue && currentValue !== value) {
                this.setSelected(null, false);
            }
            // Close dropdown if input is clear or else open it
            if (this.hasFocus && (!this.openOnFocus || value)) {
                this.isActive = !!value;
            }
        },

        /**
         * Select first option if "keep-first
         */
        data() {
            // Keep first option always pre-selected
            if (this.keepFirst) {
                this.$nextTick(() => {
                    if (this.isActive) {
                        this.selectFirstOption(this.computedData);
                    } else {
                        this.setHovered(null);
                    }
                });
            } else {
                if (this.hovered) {
                    // reset hovered if list doesn't contain it
                    const hoveredValue = this.getValue(this.hovered);
                    const data = this.computedData
                        .map((d) => d.items)
                        .reduce((a, b) => [...a, ...b], []);
                    if (!data.some((d) => this.getValue(d) === hoveredValue)) {
                        this.setHovered(null);
                    }
                }
            }
        },

        debounceTyping: {
            handler(value) {
                this.debouncedEmitTyping = debounce(this.emitTyping, value);
            },
            immediate: true,
        },
    },
    methods: {
        itemOptionClasses(option) {
            return [
                ...this.itemClasses,
                {
                    [this.computedClass(
                        "itemHoverClass",
                        "o-acp__item--hover",
                    )]: option === this.hovered,
                },
            ];
        },

        /**
         * Set which option is currently hovered.
         */
        setHovered(option) {
            if (option === undefined) return;

            this.hovered = option;
        },

        /**
         * Set which option is currently selected, update v-model,
         * update input value and close dropdown.
         */
        setSelected(option, closeDropdown = true, event = undefined) {
            if (option === undefined) return;
            this.selected = option;
            /**
             * @property {Object} selected selected option
             * @property {Event} event native event
             */
            this.$emit("select", this.selected, event);
            if (this.selected !== null) {
                if (this.clearOnSelect) {
                    const input = this.$refs.input;
                    input.newValue = "";
                    input.$refs.input.value = "";
                } else {
                    this.newValue = this.getValue(this.selected);
                }
                this.setHovered(null);
            }
            closeDropdown &&
                this.$nextTick(() => {
                    this.isActive = false;
                });
            this.checkValidity();
        },

        /**
         * Select first option
         */
        selectFirstOption(computedData) {
            this.$nextTick(() => {
                const nonEmptyElements = computedData.filter(
                    (element) => element.items && element.items.length,
                );
                if (nonEmptyElements.length) {
                    const option = nonEmptyElements[0].items[0];
                    this.setHovered(option);
                } else {
                    this.setHovered(null);
                }
            });
        },

        /**
         * Key listener.
         * Select the hovered option.
         */
        keydown(event) {
            const { key } = event; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
            // prevent emit submit event
            if (key === "Enter") event.preventDefault();
            // Close dropdown on Tab & no hovered
            if (key === "Escape" || key === "Tab") {
                this.isActive = false;
            }
            if (this.confirmKeys.indexOf(key) >= 0) {
                // If adding by comma, don't add the comma to the input
                if (key === ",") event.preventDefault();
                // Close dropdown on select by Tab
                const closeDropdown = !this.keepOpen || key === "Tab";
                if (this.hovered === null) {
                    // header and footer uses headerHovered && footerHovered. If header or footer
                    // was selected then fire event otherwise just return so a value isn't selected
                    this.checkIfHeaderOrFooterSelected(
                        event,
                        null,
                        closeDropdown,
                    );
                    return;
                }
                this.setSelected(this.hovered, closeDropdown, event);
            }
        },

        selectHeaderOrFoterByClick(event, origin) {
            this.checkIfHeaderOrFooterSelected(event, { origin: origin });
        },

        /**
         * Check if header or footer was selected.
         */
        checkIfHeaderOrFooterSelected(
            event,
            triggerClick,
            closeDropdown = true,
        ) {
            if (
                this.selectableHeader &&
                (this.headerHovered ||
                    (triggerClick && triggerClick.origin === "header"))
            ) {
                this.$emit("select-header", event);
                this.headerHovered = false;
                if (triggerClick) this.setHovered(null);
                if (closeDropdown) this.isActive = false;
            }
            if (
                this.selectableFooter &&
                (this.footerHovered ||
                    (triggerClick && triggerClick.origin === "footer"))
            ) {
                this.$emit("select-footer", event);
                this.footerHovered = false;
                if (triggerClick) this.setHovered(null);
                if (closeDropdown) this.isActive = false;
            }
        },

        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside(event) {
            if (!this.hasFocus && this.whiteList.indexOf(event.target) < 0) {
                if (
                    this.keepFirst &&
                    this.hovered &&
                    this.selectOnClickOutside
                ) {
                    this.setSelected(this.hovered, true);
                } else {
                    this.isActive = false;
                }
            }
        },

        /**
         * Return display text for the input.
         * If object, get value from path, or else just the value.
         */
        getValue(option) {
            if (option === null) return;

            if (typeof this.customFormatter !== "undefined") {
                return this.customFormatter(option);
            }
            return typeof option === "object"
                ? getValueByPath(option, this.field)
                : option;
        },

        /**
         * Check if the scroll list inside the dropdown
         * reached it's end.
         */
        checkIfReachedTheEndOfScroll() {
            const list = this.$refs.dropdown;
            const footerHeight = this.$slots.footer
                ? this.$refs.footer.clientHeight
                : 0;
            if (
                list.clientHeight !== list.scrollHeight &&
                list.scrollTop + list.clientHeight + footerHeight >=
                    list.scrollHeight
            ) {
                this.$emit("infinite-scroll");
            }
        },

        /**
         * Calculate if the dropdown is vertically visible when activated,
         * otherwise it is openened upwards.
         */
        calcDropdownInViewportVertical() {
            this.$nextTick(() => {
                /**
                 * this.$refs.dropdown may be undefined
                 * when Autocomplete is conditional rendered
                 */
                if (!this.$refs.dropdown) return;

                const rect = this.$refs.dropdown.getBoundingClientRect();

                this.isListInViewportVertically =
                    rect.top >= 0 &&
                    rect.bottom <=
                        (window.innerHeight ||
                            document.documentElement.clientHeight);
                if (this.appendToBody) {
                    this.updateAppendToBody();
                }
            });
        },

        /**
         * Arrows keys listener.
         * If dropdown is active, set hovered option, or else just open.
         */
        keyArrows(direction) {
            const sum = direction === "down" ? 1 : -1;
            if (this.isActive) {
                const data = this.computedData
                    .map((d) => d.items)
                    .reduce((a, b) => [...a, ...b], []);

                if (this.$slots.header && this.selectableHeader) {
                    data.unshift(undefined);
                }
                if (this.$slots.footer && this.selectableFooter) {
                    data.push(undefined);
                }
                let index;
                if (this.headerHovered) {
                    index = 0 + sum;
                } else if (this.footerHovered) {
                    index = data.length - 1 + sum;
                } else {
                    index = data.indexOf(this.hovered) + sum;
                }

                index = index > data.length - 1 ? data.length - 1 : index;
                index = index < 0 ? 0 : index;

                this.footerHovered = false;
                this.headerHovered = false;
                this.setHovered(data[index] !== undefined ? data[index] : null);
                if (
                    this.$slots.footer &&
                    this.selectableFooter &&
                    index === data.length - 1
                ) {
                    this.footerHovered = true;
                }
                if (
                    this.$slots.header &&
                    this.selectableHeader &&
                    index === 0
                ) {
                    this.headerHovered = true;
                }

                const list = this.$refs.dropdown;
                let items = this.itemRefs || [];

                if (this.$slots.header && this.selectableHeader) {
                    items = [this.$refs.header, ...items];
                }
                if (this.$slots.footer && this.selectableFooter) {
                    items = [...items, this.$refs.footer];
                }
                const element = items[index];

                if (!element) return;

                const visMin = list.scrollTop;
                const visMax =
                    list.scrollTop + list.clientHeight - element.clientHeight;

                if (element.offsetTop < visMin) {
                    list.scrollTop = element.offsetTop;
                } else if (element.offsetTop >= visMax) {
                    list.scrollTop =
                        element.offsetTop -
                        list.clientHeight +
                        element.clientHeight;
                }
            } else {
                this.isActive = true;
            }
        },

        /**
         * Focus listener.
         * If value is the same as selected, select all text.
         */
        focused(event) {
            if (this.getValue(this.selected) === this.newValue) {
                this.$el.querySelector("input").select();
            }
            if (this.openOnFocus) {
                this.isActive = true;
                if (this.keepFirst) {
                    // If open on focus, update the hovered
                    this.selectFirstOption(this.computedData);
                }
            }
            this.hasFocus = true;
            this.$emit("focus", event);
        },

        /**
         * Blur listener.
         */
        onBlur(event) {
            this.hasFocus = false;
            this.$emit("blur", event);
        },
        onInput() {
            const currentValue = this.getValue(this.selected);
            if (currentValue && currentValue === this.newValue) return;
            if (this.debounceTyping) {
                this.debouncedEmitTyping();
            } else {
                this.emitTyping();
            }
        },
        emitTyping() {
            this.$emit("typing", this.newValue);
            this.checkValidity();
        },
        rightIconClick(event) {
            if (this.clearable) {
                this.newValue = "";
                this.setSelected(null, false);
                if (this.openOnFocus) {
                    this.$refs.input.$el.focus();
                }
            } else {
                this.$emit("icon-right-click", event);
            }
        },
        checkValidity() {
            if (this.useHtml5Validation) {
                this.$nextTick(() => {
                    this.checkHtml5Validity();
                });
            }
        },
        setItemRef(el) {
            if (el) {
                this.itemRefs.push(el);
            }
        },
        updateAppendToBody() {
            const dropdownMenu = this.$refs.dropdown;
            const trigger = this.$refs.input.$el;
            if (dropdownMenu && trigger) {
                // update wrapper dropdown
                const root = this.$data.bodyEl;
                root.classList.forEach((item) =>
                    root.classList.remove(...item.split(" ")),
                );
                this.rootClasses.forEach((item) => {
                    if (item) {
                        if (typeof item === "object") {
                            Object.keys(item)
                                .filter((key) => key && item[key])
                                .forEach((key) => root.classList.add(key));
                        } else {
                            root.classList.add(...item.split(" "));
                        }
                    }
                });
                const rect = trigger.getBoundingClientRect();
                let top = rect.top + window.scrollY;
                const left = rect.left + window.scrollX;
                if (this.newDropdownPosition !== "top") {
                    top += trigger.clientHeight;
                } else {
                    top -= dropdownMenu.clientHeight;
                }
                dropdownMenu.style.position = "absolute";
                dropdownMenu.style.top = `${top}px`;
                dropdownMenu.style.left = `${left}px`;
                dropdownMenu.style.width = `${trigger.clientWidth}px`;
                dropdownMenu.style.maxWidth = `${trigger.clientWidth}px`;
                dropdownMenu.style.zIndex = "9999";
            }
        },
    },
    created() {
        if (typeof window !== "undefined") {
            document.addEventListener("click", this.clickedOutside);
            if (this.menuPosition === "auto")
                window.addEventListener(
                    "resize",
                    this.calcDropdownInViewportVertical,
                );
        }
    },
    mounted() {
        const list = this.$refs.dropdown;
        if (this.checkInfiniteScroll && list) {
            list.addEventListener("scroll", this.checkIfReachedTheEndOfScroll);
        }
        if (this.appendToBody) {
            this.$data.bodyEl = createAbsoluteElement(list);
            this.updateAppendToBody();
        }
    },
    beforeUpdate() {
        this.width = this.$refs.input
            ? this.$refs.input.$el.clientWidth
            : undefined;
        this.itemRefs = [];
    },
    beforeUnmount() {
        if (typeof window !== "undefined") {
            document.removeEventListener("click", this.clickedOutside);
            if (this.menuPosition === "auto")
                window.removeEventListener(
                    "resize",
                    this.calcDropdownInViewportVertical,
                );
        }
        if (this.checkInfiniteScroll && this.$refs.dropdown) {
            const list = this.$refs.dropdown;
            list.removeEventListener(
                "scroll",
                this.checkIfReachedTheEndOfScroll,
            );
        }
        if (this.appendToBody) {
            removeElement(this.$data.bodyEl);
        }
    },
});
</script>

<template>
    <div :class="rootClasses">
        <o-input
            v-bind="inputBind"
            v-model="newValue"
            ref="input"
            :type="type"
            :size="size"
            :rounded="rounded"
            :icon="icon"
            :icon-right="newIconRight"
            :icon-right-clickable="newIconRightClickable"
            :icon-pack="iconPack"
            :maxlength="maxlength"
            :autocomplete="newAutocomplete"
            :use-html5-validation="false"
            :aria-autocomplete="ariaAutocomplete"
            :expanded="expanded"
            @update:modelValue="onInput"
            @focus="focused"
            @blur="onBlur"
            @invalid="onInvalid"
            @keydown="keydown"
            @keydown.up.prevent="keyArrows('up')"
            @keydown.down.prevent="keyArrows('down')"
            @icon-right-click="rightIconClick"
            @icon-click="(event) => $emit('icon-click', event)" />

        <transition :name="animation">
            <component
                v-show="
                    isActive &&
                    (!isEmpty || $slots.empty || $slots.header || $slots.footer)
                "
                :is="menuTag"
                :class="menuClasses"
                :style="menuStyle"
                ref="dropdown">
                <component
                    v-if="$slots.header"
                    :is="itemTag"
                    ref="header"
                    role="button"
                    :tabindex="0"
                    :class="itemHeaderClasses"
                    @click="selectHeaderOrFoterByClick($event, 'header')">
                    <slot name="header" />
                </component>
                <template v-for="(element, groupindex) in computedData">
                    <component
                        v-if="element.group"
                        :is="itemTag"
                        :key="groupindex + 'group'"
                        :class="itemGroupClasses">
                        <slot
                            v-if="$slots.group"
                            name="group"
                            :group="element.group"
                            :index="groupindex" />
                        <span v-else>
                            {{ element.group }}
                        </span>
                    </component>
                    <component
                        v-for="(option, index) in element.items"
                        :key="groupindex + ':' + index"
                        :is="itemTag"
                        :class="itemOptionClasses(option)"
                        :ref="setItemRef"
                        @click.stop="setSelected(option, !keepOpen, $event)">
                        <slot
                            v-if="$slots.default"
                            :option="option"
                            :index="index" />
                        <span v-else>
                            {{ getValue(option) }}
                        </span>
                    </component>
                </template>
                <component
                    v-if="isEmpty && $slots.empty"
                    :is="itemTag"
                    :class="itemEmptyClasses">
                    <slot name="empty" />
                </component>
                <component
                    v-if="$slots.footer"
                    :is="itemTag"
                    ref="footer"
                    role="button"
                    :tabindex="0"
                    :class="itemFooterClasses"
                    @click="selectHeaderOrFoterByClick($event, 'footer')">
                    <slot name="footer" />
                </component>
            </component>
        </transition>
    </div>
</template>
