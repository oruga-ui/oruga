import { expect, vi } from "vitest";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

vi.mock("@/utils/helpers", async (importOriginal) => {
    return {
        ...(await importOriginal<typeof import("@/utils/helpers")>()),
        // mock uuid helper function
        // this will only affect "foo" outside of the original module
        uuid: (): string => "mocked",
    };
});
