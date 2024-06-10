import { vi } from "vitest";

export function timezoneMock(locale: string, zone: string): void {
    const DateTimeFormat = Intl.DateTimeFormat;
    vi.spyOn(global.Intl, "DateTimeFormat").mockImplementation(
        (_?, options?) =>
            new DateTimeFormat(locale, { ...options, timeZone: zone }),
    );
}
