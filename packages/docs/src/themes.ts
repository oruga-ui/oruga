import themes from "./themes.json";
import type { ThemeConfig } from "./types";
export type { ThemeConfig };

const Themes = themes as ThemeConfig[];
export { Themes };
