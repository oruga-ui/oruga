// There is some weird bug while defining the return value {@link ComponentObjectPropsOptions}.
// The type check is not working anymore with a return type definition for props.

/** base component props for every oruga main component */
export const baseComponentProps = {
    override: {
        type: Boolean,
        default: undefined,
    },
};
