export default {
  emits: ['update:modelValue'],
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  props: {
    /** @model */
    modelValue: [String, Number, Boolean, Array],
    /**
     * Same as native value
     */
    nativeValue: [String, Number, Boolean],
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,
    /**
     * Same as native disabled
     */
    disabled: Boolean,
    required: Boolean,
    /**
     * Same as native name
     */
    name: String,
    /**
     * Size of the control, optional
     * @values small, medium, large
     */
    size: String,
  },
  data() {
    return {
      newValue: this.modelValue,
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit('update:modelValue', value);
      },
    },
  },
  watch: {
    /**
     * When v-model change, set internal value.
     */
    modelValue(value) {
      this.newValue = value;
    },
  },
  methods: {
    focus() {
      // MacOS FireFox and Safari do not focus when clicked
      this.$refs.input.focus();
    }
  }
};
