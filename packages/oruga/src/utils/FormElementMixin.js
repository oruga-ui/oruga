import { getOptions } from './config';
import { getValueByPath } from './helpers'

// This should cover all types of HTML elements that have properties related to
// HTML constraint validation, e.g. .form and .validity.
const validatableFormElementTypes = [
  HTMLButtonElement,
  HTMLFieldSetElement,
  HTMLInputElement,
  HTMLObjectElement,
  HTMLOutputElement,
  HTMLSelectElement,
  HTMLTextAreaElement,
];

function asValidatableFormElement(el) {
	if (validatableFormElementTypes.some(t => el instanceof t)) {
		return el;
	} else {
		return null;
	}
}

export default {
	inject: {
        $field: { from: "$field", default: false }
    },
	props: {
		/**
		 * Makes input full width when inside a grouped or addon field
		 */
		expanded: Boolean,
		/**
		 * Makes the element rounded
		 */
		rounded: Boolean,
		/**
		 * Icon name to be added
		 */
		icon: String,
		/**
		 * Icon pack to use
		 * @values mdi, fa, fas and any other custom icon pack
		 */
		iconPack: String,
		/** Native options to use in HTML5 validation */
		autocomplete: String,
		/** Same as native maxlength, plus character counter */
		maxlength: [Number, String],
		/** Enable html 5 native validation */
		useHtml5Validation: {
			type: Boolean,
			default: () => {
				return getValueByPath(getOptions(), "useHtml5Validation", true);
			},
		},
		/** Show status icon using field and variant prop */
		statusIcon: {
			type: Boolean,
			default: () => {
				return getValueByPath(getOptions(), "statusIcon", true);
			},
		},
		/**
		 * The message which is shown when a validation error occurs
		 */
		validationMessage: String,
	},
	data() {
		return {
			isValid: true,
			isFocused: false,
			newIconPack: this.iconPack
		};
	},
	computed: {
		parentField() {
			return this.$field;
		},

		/**
		 * Get the type prop from parent if it's a Field.
		 */
		statusVariant() {
			if (!this.parentField) return;
			if (!this.parentField.newVariant) return;
			if (typeof this.parentField.newVariant === "string") {
				return this.parentField.newVariant;
			} else {
				for (const key in this.parentField.newVariant) {
					if (this.parentField.newVariant[key]) {
						return key;
					}
				}
			}
		},

		/**
		 * Get the message prop from parent if it's a Field.
		 */
		statusMessage() {
			if (!this.parentField) return;

			return this.parentField.newMessage || this.parentField.hasMessageSlot;
		},

        /**
        * Icon name based on the variant.
        */
        statusVariantIcon() {
            const statusVariantIcon = getValueByPath(getOptions(), "statusVariantIcon", {
                'success': 'check',
                'danger': 'alert-circle',
                'info': 'information',
                'warning': 'alert'
            });
            return statusVariantIcon[this.statusVariant] || ''
        }
	},
	methods: {
		/**
		 * Focus method that work dynamically depending on the component.
		 */
		focus() {
			const el = this.getElement();
			if (el === undefined) return;

			this.$nextTick(() => {
				if (el) el.focus();
			});
		},

		onBlur(event) {
			this.isFocused = false;
            if (this.parentField) {
                this.parentField.isFocused = false;
            }
			this.$emit("blur", event);
			this.checkHtml5Validity();
		},

		onFocus(event) {
			this.isFocused = true;
            if (this.parentField) {
                this.parentField.isFocused = true;
            }
			this.$emit("focus", event);
		},

		onInvalid(event) {
			this.checkHtml5Validity();
			const validatable = asValidatableFormElement(event.target);
			if (validatable && this.parentField && this.useHtml5Validation) {
				// We provide our own error message on the field, so we should suppress the browser's default tooltip.
				// We still want to focus the form's first invalid input, though.
				event.preventDefault();
				let isFirstInvalid = false;
				if (validatable.form != null) {
					const formElements = validatable.form.elements;
					for (let i = 0; i < formElements.length; ++i) {
						const element = asValidatableFormElement(formElements.item(i));
						if (element && element.willValidate && !element.validity.valid) {
							isFirstInvalid = (validatable === element);
							break;
						}
					}
				}
				if (isFirstInvalid) {
					// We'll scroll to put the whole field in view, not just the element that triggered the event,
					// which should mean that the message will be visible onscreen.
					const fieldElement = this.parentField.$el;
					// scrollIntoViewIfNeeded() is a non-standard method (but a very common extension).
					// If we can't use it, we'll just fall back to focusing the field.
					const canScrollToField = fieldElement?.scrollIntoViewIfNeeded != undefined;
					validatable.focus({ preventScroll: canScrollToField });
					if (canScrollToField) {
						fieldElement.scrollIntoViewIfNeeded();
					}
				}
			}
			this.$emit("invalid", event);
		},

		getElement() {
			let el = this.$refs[this.$elementRef];
			while (el && el.$elementRef) {
				el = el.$refs[el.$elementRef];
			}
			return el;
		},

		setInvalid() {
			const variant = "danger";
			const message = this.validationMessage || this.getElement().validationMessage;
			this.setValidity(variant, message);
		},

		setValidity(variant, message) {
			this.$nextTick(() => {
				if (this.parentField) {
					// Set type only if not defined
					if (!this.parentField.variant) {
						this.parentField.newVariant = variant;
					}
					// Set message only if not defined
					if (!this.parentField.message) {
						this.parentField.newMessage = message;
					}
				}
			});
		},

		/**
		 * Check HTML5 validation, set isValid property.
		 * If validation fail, send 'danger' type,
		 * and error message to parent if it's a Field.
		 */
		checkHtml5Validity() {
			if (!this.useHtml5Validation) return;

			const el = this.getElement();
			if (el === undefined) return;

			if (!el.validity.valid) {
				this.setInvalid();
				this.isValid = false;
			} else {
				this.setValidity(null, null);
				this.isValid = true;
			}

			return this.isValid;
		},

        syncFilled(value) {
            if (this.parentField) {
                this.parentField.isFilled = !!value
            }
        }
	}
}
