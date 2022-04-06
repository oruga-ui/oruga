
## Examples

::: demo
<template>
    <section>
        <o-field grouped group-multiline>
            <div class="control">
                <o-switch v-model="enableSeconds">Enable seconds</o-switch>
            </div>
            <o-field label="Locale">
                <o-select v-model="locale">
                    <option :value="undefined"></option>
                    <option value="de-DE">de-DE</option>
                    <option value="en-CA">en-CA</option>
                    <option value="en-GB">en-GB</option>
                    <option value="en-US">en-US</option>
                    <option value="es-ES">es-ES</option>
                    <option value="es-MX">es-MX</option>
                    <option value="fr-CA">fr-CA</option>
                    <option value="fr-FR">fr-FR</option>
                    <option value="it-IT">it-IT</option>
                    <option value="ja-JP">ja-JP</option>
                    <option value="pt-BR">pt-BR</option>
                    <option value="ru-RU">ru-RU</option>
                    <option value="zn-CN">zn-CN</option>
                </o-select>
            </o-field>
            <o-field label="Hour format">
                <o-select v-model="hourFormat">
                    <option :value="undefined"></option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                </o-select>
            </o-field>
        </o-field>
        <o-field label="Select time">
            <o-timepicker
                rounded
                placeholder="Click to select..."
                icon="clock"
                :enable-seconds="enableSeconds"
                :hour-format="hourFormat"
                :locale="locale">
            </o-timepicker>
        </o-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            hourFormat: undefined, // Browser locale
            enableSeconds: false,
            locale: undefined // Browser locale
        }
    }
}
</script>
:::

### Min/Max date

::: demo
<template>
    <o-field label="Select time">
        <o-timepicker
            placeholder="Click to select..."
            :min-time="minTime"
            :max-time="maxTime">
        </o-timepicker>
    </o-field>
</template>

<script>
    export default {
        data() {
            const min = new Date()
            min.setHours(9)
            min.setMinutes(0)
            const max = new Date()
            max.setHours(18)
            max.setMinutes(0)
            return {
                minTime: min,
                maxTime: max
            }
        }
    }
</script>
:::

### Footer

::: demo
<template>
    <o-field label="Select time">
        <o-timepicker v-model="time"
            placeholder="Click to select...">

            <o-button
                label="Now"
                variant="primary"
                icon-left="clock"
                @click="time = new Date()" />
            <o-button
                label="Clear"
                variant="danger"
                icon-left="times"
                outlined
                @click="time = null" />
        </o-timepicker>
    </o-field>
</template>

<script>
    export default {
        data() {
            return {
                time: new Date()
            }
        }
    }
</script>
:::

### Granularity

::: demo
<template>
    <o-field label="Select timepicker">
        <o-timepicker
            placeholder="Click to select"
            icon="clock"
            :incrementMinutes="minutesGranularity"
            :incrementHours="hoursGranularity">
        </o-timepicker>
    </o-field>
</template>
<script>
export default {
    data() {
        return {
            minutesGranularity: 15,
            hoursGranularity: 2
        }
    }
}
</script>
:::
### Inline

::: demo
<template>
    <o-timepicker v-model="time" inline></o-timepicker>
</template>

<script>
    export default {
        data() {
            return {
                time: new Date()
            }
        }
    }
</script>
:::
