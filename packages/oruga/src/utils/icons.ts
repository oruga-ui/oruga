import { getOption } from "./config";
import { merge } from "./helpers";

export type IconConfig = {
  sizes?: { default: string; [key: string]: string };
  iconPrefix?: string;
  internalIcons?: Record<string, string>;
};

const mdiIcons = {
  iconPrefix: "mdi-",
  sizes: {
    default: "mdi-24px",
    small: "",
    medium: "mdi-36px",
    large: "mdi-48px",
  },
} as const;

function getFaIcons(): IconConfig {
  const iconComponent = getOption("iconComponent");
  const faIconPrefix = iconComponent ? "" : "fa-";
  return {
    iconPrefix: faIconPrefix,
    sizes: {
      default: "",
      small: "sm",
      medium: "lg",
      large: "xl",
    },
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
      "emoticon-sad": "frown",
    },
  } as const;
}

function getIcons(): Record<string, IconConfig> {
  const faIcons = getFaIcons();
  let icons: Record<string, IconConfig> = {
    mdi: mdiIcons,
    fa: faIcons,
    fas: faIcons,
    far: faIcons,
    fad: faIcons,
    fab: faIcons,
    fal: faIcons,
  };

  const customIconPacks = getOption("customIconPacks");
  if (customIconPacks) icons = merge(icons, customIconPacks, true);

  return icons;
}

export default getIcons;
