<template>
    <div class="timepicker control" :class="[size, {'is-expanded': expanded}]">
        <o-dropdown
            v-if="!isMobile || inline"
            ref="dropdown"
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
                        autocomplete="off"
                        :value="formatValue(computedValue)"
                        :placeholder="placeholder"
                        :size="size"
                        :icon="icon"
                        :icon-pack="iconPack"
                        :loading="loading"
                        :disabled="disabled"
                        :readonly="!editable"
                        :rounded="rounded"
                        v-bind="$attrs"
                        :use-html5-validation="useHtml5Validation"
                        @keyup.native.enter="toggle(true)"
                        @change.native="onChange($event.target.value)"
                        @focus="handleOnFocus"/>
                </slot>
            </template>

            <o-dropdown-item
                :disabled="disabled"
                :focusable="focusable"
                custom>
                <o-field grouped position="is-centered">
                    <o-select
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
                    <span class="control is-colon">{{ hourLiteral }}</span>
                    <o-select
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
                        <span class="control is-colon">{{ minuteLiteral }}</span>
                        <o-select
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
                        <span class="control is-colon">{{ secondLiteral }}</span>
                    </template>
                    <o-select
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
                </o-field>

                <footer
                    v-if="$slots.default !== undefined && $slots.default.length"
                    class="o-tpck__footer">
                    <slot/>
                </footer>
            </o-dropdown-item>
        </o-dropdown>

        <o-input
            v-else
            ref="input"
            type="time"
            :step="nativeStep"
            autocomplete="off"
            :value="formatHHMMSS(computedValue)"
            :placeholder="placeholder"
            :size="size"
            :icon="icon"
            :icon-pack="iconPack"
            :rounded="rounded"
            :loading="loading"
            :max="formatHHMMSS(maxTime)"
            :min="formatHHMMSS(minTime)"
            :disabled="disabled"
            :readonly="false"
            :reset-on-meridian-change="isReset"
            v-bind="$attrs"
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
import Field from '../field/Field'
import Select from '../select/Select'
import Icon from '../icon/Icon'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import TimepickerMixin from '../../utils/TimepickerMixin'

export default {
    name: 'BTimepicker',
    components: {
        [Input.name]: Input,
        [Field.name]: Field,
        [Select.name]: Select,
        [Icon.name]: Icon,
        [Dropdown.name]: Dropdown,
        [DropdownItem.name]: DropdownItem
    },
    mixins: [BaseComponentMixin, TimepickerMixin],
    inheritAttrs: false,
    computed: {
        nativeStep() {
            if (this.enableSeconds) return '1'
        }
    }
}
</script>
