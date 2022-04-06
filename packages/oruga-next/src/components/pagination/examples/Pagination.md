## Examples

### Base

::: demo
<template>
    <section>
        <o-field grouped group-multiline>
            <o-field label="Total">
                <o-input type="number" v-model="total"></o-input>
            </o-field>
            <o-field label="Items per page">
                <o-input type="number" v-model="perPage"></o-input>
            </o-field>
        </o-field>
        <o-field grouped group-multiline>
            <o-field label="Show buttons before current">
                <o-input type="number" v-model="rangeBefore" min="0"></o-input>
            </o-field>
            <o-field label="Show buttons after current">
                <o-input type="number" v-model="rangeAfter" min="0"></o-input>
            </o-field>
        </o-field>
        <o-field grouped group-multiline>
            <o-field label="Order">
                <o-select v-model="order">
                    <option value="">default</option>
                    <option value="centered">centered</option>
                    <option value="right">right</option>
                </o-select>
            </o-field>
            <o-field label="Size">
                <o-select v-model="size">
                    <option value="">default</option>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                </o-select>
            </o-field>
        </o-field>
        <o-field grouped group-multiline>
            <o-field label="Previous icon">
                <o-select v-model="prevIcon">
                    <option value="chevron-left">Chevron</option>
                    <option value="arrow-left">Arrow</option>
                </o-select>
            </o-field>
            <o-field label="Next icon">
                <o-select v-model="nextIcon">
                    <option value="chevron-right">Chevron</option>
                    <option value="arrow-right">Arrow</option>
                </o-select>
            </o-field>
        </o-field>
        <div class="block">
            <o-switch v-model="isSimple">Simple</o-switch>
            <o-switch v-model="isRounded">Rounded</o-switch>
        </div>

        <hr>
        <o-pagination
            :total="total"
            :current.sync="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">
        </o-pagination>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                total: 200,
                current: 10,
                perPage: 10,
                rangeBefore: 3,
                rangeAfter: 1,
                order: '',
                size: '',
                isSimple: false,
                isRounded: false,
                prevIcon: 'chevron-left',
                nextIcon: 'chevron-right'
            }
        }
    }
</script>
:::

### Slots

::: demo
<template>
    <section>
        <o-pagination
            :total="200"
            :current.sync="current"
            :per-page="10">

            <o-pagination-button
                slot-scope="props"
                :page="props.page"
                :id="`page${props.page.number}`">
                {{ convertToRoman(props.page.number) }}
            </o-pagination-button>

            <o-pagination-button
                slot="previous"
                slot-scope="props"
                :page="props.page">
                Previous
            </o-pagination-button>

            <o-pagination-button
                slot="next"
                slot-scope="props"
                :page="props.page">
                Next
            </o-pagination-button>

        </o-pagination>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                current: 10,
                basicRomanNumeral: ['',
                    'I','II','III','IV','V','VI','VII','VIII','IX','',
                    'X','XX','XXX','XL','L','LX','LXX','LXXX','XC','',
                    'C','CC','CCC','CD','D','DC','DCC','DCCC','CM','',
                    'M','MM','MMM'
                ]
            }
        },
        methods: {
            convertToRoman(num) {
                const numArray = num.toString().split('');
                const base = numArray.length;
                let count = base-1;
                const convertedRoman = numArray.reduce((roman, digit) => {
                    const digitRoman = this.basicRomanNumeral[+digit + count*10];
                    const result = roman + digitRoman;
                    count -= 1;
                    return result;
                },'');
                return convertedRoman;
            }
        },
        /*
        watch: {
            $route: {
                immediate: true,
                handler(newVal, oldVal) {
                    if (newVal.hash) {
                        this.current = parseInt(newVal.hash.replace(/\#page/g, ''))
                    }
                },
            },
        }
        */
    }
</script>
:::
