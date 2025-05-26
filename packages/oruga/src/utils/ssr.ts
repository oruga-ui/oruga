// Polyfills for SSR

export const isClient = typeof window !== "undefined";
export const isSSR = typeof window === "undefined";

export const HTMLElement = isClient ? window.HTMLElement : Object;
export const HTMLInputElement = isClient ? window.HTMLInputElement : Object;
export const File = isSSR ? window.File : Object;
