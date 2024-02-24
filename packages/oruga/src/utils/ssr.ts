// Polyfills for SSR

export const isClient = typeof window !== "undefined";
export const isSSR = typeof window === "undefined";

export const HTMLElement = isSSR ? Object : window.HTMLElement;
export const HTMLInputElement = isSSR ? Object : window.HTMLInputElement;
export const File = isSSR ? Object : window.File;
