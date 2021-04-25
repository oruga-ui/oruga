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
                        v-bind="inputBind"
                        autocomplete="off"
                        :value="formatValue(computedValue)"
                        :placeholder="placeholder"
                        :size="size"
                        :icon="icon"
                        :icon-pack="iconPack"
                        :disabled="disabled"
                        :readonly="!editable"
                        :rounded="rounded"
                        :use-html5-validation="useHtml5Validation"
                        @keyup.native.enter="toggle(true)"
                        @change.native="onChange($event.target.value)"
                        @focus="handleOnFocus"/>
                </slot>
            </template>

            <o-dropdown-item
                override
                :disabled="disabled"
                :clickable="false">
                <div :class="boxClasses">
                    <o-select
                        override
                        :select-class="selectClasses"
                        :placeholder-class="selectPlaceholderClasses"
                        v-model="hoursSelected"
                        @change.native="onHoursChange($event.target.value)"
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
                        :select-class="selectClasses"
                        :placeholder-class="selectPlaceholderClasses"
                        v-model="minutesSelected"
                        @change.native="onMinutesChange($event.target.value)"
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
                        <span>{{ minuteLiteral }}</span>
                        <o-select
                            override
                            :select-class="selectClasses"
                            :placeholder-class="selectPlaceholderClasses"
                            v-model="secondsSelected"
                            @change.native="onSecondsChange($event.target.value)"
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
                        :select-class="selectClasses"
                        :placeholder-class="selectPlaceholderClasses"
                        v-model="meridienSelected"
                        @change.native="onMeridienChange($event.target.value)"
                        v-if="!isHourFormat24"
                        :disabled="disabled">
                        <option
                            v-for="meridien in meridiens"
                            :value="meridien"
                            :key="meridien">
                            {{ meridien }}
                        </option>
                    </o-select>
                </div>

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
            @change.native="onChange($event.target.value)"
            @focus="handleOnFocus"
            @blur="onBlur() && checkHtml5Validity()"/>
    </div>
</template>

<script>
import Dropdown from '../dropdown/Dropdown'
import DropdownItem from '../dropdown/DropdownItem'
import Input from '../input/Input'
import Select from '../select/Select'
import Icon from '../icon/Icon'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import TimepickerMixin from '../../utils/TimepickerMixin'
import MatchMediaMixin from '../../utils/MatchMediaMixin'

/**
 * An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile
 * @displayName Timepicker
 * @example ./examples/Timepicker.md
 * @style _timepicker.scss
 */
export default {
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
        selectClass: [String, Function, Array],
        selectPlaceholderClass: [String, Function, Array],
        separatorClass: [String, Function, Array],
        footerClass: [String, Function, Array],
        mobileClass: [String, Function, Array],
        /** Classes to apply on internal input (@see o-input style docs) */
        inputClasses: Object,
        /** Classes to apply on internal dropdown (@see o-dropdown style docs) */
        dropdownClasses: Object
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
                ...this.dropdownClasses
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
        selectClasses() {
            return [
                this.computedClass('selectClass', 'o-tpck__select')
            ]
        },
        selectPlaceholderClasses() {
            return [
                this.computedClass('selectPlaceholderClass', 'o-tpck__select-placeholder')
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
        },
    }
}
</script>
