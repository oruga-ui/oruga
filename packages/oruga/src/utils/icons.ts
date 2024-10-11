import { getOption } from "./config";
import { merge } from "./helpers";

export type IconConfig = {
    sizes?: { default: string; [key: string]: string };
    iconPrefix?: string;
    internalIcons?: Record<string, string>;
};

const mdiIcons = {
    sizes: {
        default: "mdi-24px",
        small: "",
        medium: "mdi-36px",
        large: "mdi-48px",
    },
    iconPrefix: "mdi-",
};

const faIcons = () => {
    const iconComponent = getOption("iconComponent");
    const faIconPrefix = iconComponent ? "" : "fa-";
    return {
        sizes: {
            default: "",
            small: "sm",
            medium: "lg",
            large: "xl",
        },
        iconPrefix: faIconPrefix,
        internalIcons: {
            check: "check",
            information: "info-circle",
            alert: "exclamation-triangle",
            "alert-circle": "exclamation-circle",
            "arrow-up": "arrow-up",
            "chevron-right": "angle-right",
            "chevron-left": "angle-left",
            "chevron-down": "angle-down",
            "chevron-up": "angle-up",
            eye: "eye",
            "eye-off": "eye-slash",
            "caret-down": "caret-down",
            "caret-up": "caret-up",
            "close-circle": "times-circle",
            close: "times",
            loading: "circle-notch",
        },
    };
};

const getIcons = (): Record<string, IconConfig> => {
    let icons: Record<string, IconConfig> = {
        mdi: mdiIcons,
        fa: faIcons(),
        fas: faIcons(),
        far: faIcons(),
        fad: faIcons(),
        fab: faIcons(),
        fal: faIcons(),
    };

    const customIconPacks =
        getOption<Record<string, IconConfig>>("customIconPacks");
    if (customIconPacks) icons = merge(icons, customIconPacks, true);

    return icons;
};

export default getIcons;
