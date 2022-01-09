<template>
    <div :class="rootClasses">
        <o-dropdown
            v-if="!isMobile || inline"
            ref="dropdown"
            v-bind="dropdownBind"
            :position="position"
            :disabled="disabled"
            :inline="inline"
            :append-to-body="appendToBody"
            append-to-body-copy-parent
            @active-change="onActiveChange">
            <template #trigger v-if="!inline">
                <slot name="trigger">
                    <o-input
                        ref="input"
                        :model-value="formatValue(computedValue)"
                        autocomplete="off"
                        :placeholder="placeholder"
                        :size="size"
                        :icon="icon"
                        :icon-pack="iconPack"
                        :disabled="disabled"
                        :readonly="!editable"
                        :rounded="rounded"
                        v-bind="inputBind"
                        :use-html5-validation="useHtml5Validation"
                        @keyup.enter="toggle(true)"
                        @change="onChange($event.target.value)"
                        @focus="handleOnFocus"/>
                </slot>
            </template>

            <o-dropdown-item
                override
                tag="div"
                :item-class="boxClasses"
                :disabled="disabled"
                :clickable="false">

                <o-select
                    override
                    v-bind="selectBind"
                    v-model="hoursSelected"
                    @change="onHoursChange($event.target.value)"
                    :disabled="disabled"
                    placeholder="00">
                    <option
                        v-for="hour in hours"
                        :value="hour.value"
                        :key="hour.value"
                        :disabled="isHourDisabled(hour.value)">
                        {{ hour.label }}
                    </option>
                </o-select>
                <span :class="separatorClasses">{{ hourLiteral }}</span>
                <o-select
                    override
                    v-bind="selectBind"
                    v-model="minutesSelected"
                    @change="onMinutesChange($event.target.value)"
                    :disabled="disabled"
                    placeholder="00">
                    <option
                        v-for="minute in minutes"
                        :value="minute.value"
                        :key="minute.value"
                        :disabled="isMinuteDisabled(minute.value)">
                        {{ minute.label }}
                    </option>
                </o-select>
                <template v-if="enableSeconds">
                    <span :class="separatorClasses">{{ minuteLiteral }}</span>
                    <o-select
                        override
                        v-bind="selectBind"
                        v-model="secondsSelected"
                        @change="onSecondsChange($event.target.value)"
                        :disabled="disabled"
                        placeholder="00">
                        <option
                            v-for="second in seconds"
                            :value="second.value"
                            :key="second.value"
                            :disabled="isSecondDisabled(second.value)">
                            {{ second.label }}
                        </option>
                    </o-select>
                    <span :class="separatorClasses">{{ secondLiteral }}</span>
                </template>
                <o-select
                    override
                    v-bind="selectBind"
                    v-model="meridienSelected"
                    @change="onMeridienChange($event.target.value)"
                    v-if="!isHourFormat24"
                    :disabled="disabled">
                    <option
                        v-for="meridien in meridiens"
                        :value="meridien"
                        :key="meridien">
                        {{ meridien }}
                    </option>
                </o-select>

                <footer
                    v-if="$slots.default !== undefined"
                    :class="footerClasses">
                    <slot/>
                </footer>
            </o-dropdown-item>
        </o-dropdown>

        <o-input
            v-else
            ref="input"
            v-bind="inputBind"
            type="time"
            :step="nativeStep"
            autocomplete="off"
            :value="formatHHMMSS(computedValue)"
            :placeholder="placeholder"
            :size="size"
            :icon="icon"
            :icon-pack="iconPack"
            :rounded="rounded"
            :max="formatHHMMSS(maxTime)"
            :min="formatHHMMSS(minTime)"
            :disabled="disabled"
            :readonly="false"
            :use-html5-validation="useHtml5Validation"
            @change="onChange($event.target.value)"
            @focus="handleOnFocus"
            @blur="onBlur() && checkHtml5Validity()"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Dropdown from '../dropdown/Dropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
import Input from '../input/Input.vue'
import Select from '../select/Select.vue'
import Icon from '../icon/Icon.vue'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import TimepickerMixin from '../../utils/TimepickerMixin'
import MatchMediaMixin from '../../utils/MatchMediaMixin'

import { getValueByPath } from '../../utils/helpers'
import { getOptions } from '../../utils/config'

/**
 * An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile
 * @displayName Timepicker
 * @example ./examples/Timepicker.md
 * @style _timepicker.scss
 */
export default defineComponent({
    name: 'OTimepicker',
    components: {
        [Input.name]: Input,
        [Select.name]: Select,
        [Icon.name]: Icon,
        [Dropdown.name]: Dropdown,
        [DropdownItem.name]: DropdownItem
    },
    configField: 'timepicker',
    mixins: [BaseComponentMixin, TimepickerMixin, MatchMediaMixin],
    inheritAttrs: false,
    props: {
        rootClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        boxClass: [String, Function, Array],
        separatorClass: [String, Function, Array],
        footerClass: [String, Function, Array],
        inputClasses: {
            type: Object,
            default: () => {
                return getValueByPath(getOptions(), 'timepicker.inputClasses', {})
            }
        },
        dropdownClasses: {
            type: Object,
            default: () => {
                return getValueByPath(getOptions(), 'timepicker.dropdownClasses', {})
            }
        },
        selectClasses: {
            type: Object,
            default: () => {
                return getValueByPath(getOptions(), 'timepicker.selectClasses', {})
            }
        }
    },
    computed: {
        inputBind() {
            return {
                ...this.$attrs,
                ...this.inputClasses
            }
        },
        dropdownBind() {
            return {
                'root-class': this.computedClass('dropdownClasses.rootClass', 'o-tpck__dropdown'),
                ...this.dropdownClasses
            }
        },
        selectBind() {
            return {
                'select-class': this.computedClass('selectClasses.selectClass', 'o-tpck__select'),
                'placeholder-class': this.computedClass('selectClasses.placeholderClass', 'o-tpck__select-placeholder'),
                ...this.selectClasses
            }
        },
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-tpck'),
                { [this.computedClass('sizeClass', 'o-tpck--', this.size)]: this.size },
                { [this.computedClass('mobileClass', 'o-tpck--mobile')]: this.isMatchMedia },
            ]
        },
        boxClasses() {
            return [
                this.computedClass('boxClass', 'o-tpck__box')
            ]
        },
        separatorClasses() {
            return [
                this.computedClass('separatorClass', 'o-tpck__separator')
            ]
        },
        footerClasses() {
            return [
                this.computedClass('footerClass', 'o-tpck__footer')
            ]
        },
        nativeStep() {
            if (this.enableSeconds) return '1'
            return null
        }
    }
})
</script>
