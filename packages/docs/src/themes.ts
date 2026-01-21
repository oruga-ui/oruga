import themes from "./themes.json";

export type ThemeConfig = {
  label: string;
  key: string;
  path: string;
  git: string;
  src: string;
  cdn: string;
};

const Themes = themes as ThemeConfig[];
export { Themes };
