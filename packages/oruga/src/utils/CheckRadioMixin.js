import VueComponentMixin from "./VueComponentMixin";

const modelValueDef = [String, Number, Boolean, Array]

export default {
  mixins: [VueComponentMixin({vModel: modelValueDef})],
  emits: ['update:modelValue', 'input'],
  props: {
    /** @model */
    modelValue: modelValueDef,
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
    size: String
  },
  data() {
    const vm = this
    return {
      newValue: vm.getModel()
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue
      },
      set(value) {
        this.newValue = value
        this.emitModel(value)
      }
    }
  },
  methods: {
    /**
     * When v-model change, set internal value.
     */
    onModelChange(value) {
      this.newValue = value
    },
    focus() {
      // MacOS FireFox and Safari do not focus when clicked
      this.$refs.input.focus()
    }
  }
};
