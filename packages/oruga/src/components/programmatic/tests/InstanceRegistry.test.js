import { describe, it, expect } from "vitest";

import InstanceRegistry from "../InstanceRegistry";

describe("InstanceRegistry", () => {
    describe(".add", () => {
        it("registers the new entry", () => {
            const myEntry = { key: 1 };
            const registry = new InstanceRegistry();

            registry.add(myEntry);

            expect(registry.entries).toContain(myEntry);
        });
    });

    describe(".remove", () => {
        it("removes a registered entry", () => {
            const myEntry = { key: 1 };
            const registry = new InstanceRegistry();
            registry.add(myEntry);

            myEntry.other = 2;

            registry.remove(myEntry);

            expect(registry.entries).not.toContain(myEntry);
        });
    });

    describe(".walk", () => {
        it("walks all the entries", () => {
            const myEntry = { key: 1 };
            const registry = new InstanceRegistry();
            registry.add(myEntry);

            const walked = [];

            registry.walk((entry) => {
                walked.push(entry);
            });

            expect(walked).toHaveLength(1);
        });

        it("keeps the entries", () => {
            const myEntry = { key: 1 };
            const registry = new InstanceRegistry();
            registry.add(myEntry);

            const walked = [];

            registry.walk((entry) => {
                walked.push(entry);
            });

            expect(registry.entries).toHaveLength(1);
            expect(registry.entries).toContain(myEntry);
        });

        describe("when the callback returns true for some entries", () => {
            it("walks all the entries", () => {
                const myEntry = { key: 1 };
                const myEntry2 = { key: 2, remove: true };
                const registry = new InstanceRegistry();
                registry.add(myEntry);
                registry.add(myEntry2);

                const walked = [];

                registry.walk((entry) => {
                    walked.push(entry);
                    return entry.remove === true;
                });

                expect(walked).toHaveLength(2);
            });

            it("removes the entries when the callback returns true", () => {
                const myEntry = { key: 1 };
                const myEntry2 = { key: 2, remove: true };
                const registry = new InstanceRegistry();
                registry.add(myEntry);
                registry.add(myEntry2);

                const walked = [];

                registry.walk((entry) => {
                    walked.push(entry);
                    return entry.remove === true;
                });

                expect(registry.entries).toHaveLength(1);
                expect(registry.entries).toContain(myEntry);
                expect(registry.entries).not.toContain(myEntry2);
            });
        });

        describe("when the callback returns true for early entries", () => {
            it("walks all the entries", () => {
                const myEntry = { key: 1, remove: true };
                const myEntry2 = { key: 2 };
                const registry = new InstanceRegistry();
                registry.add(myEntry);
                registry.add(myEntry2);

                const walked = [];

                registry.walk((entry) => {
                    walked.push(entry);
                    return entry.remove === true;
                });

                expect(walked).toHaveLength(2);
            });

            it("removes the entries when the callback returns true", () => {
                const myEntry = { key: 1, remove: true };
                const myEntry2 = { key: 2 };
                const registry = new InstanceRegistry();
                registry.add(myEntry);
                registry.add(myEntry2);

                const walked = [];

                registry.walk((entry) => {
                    walked.push(entry);
                    return entry.remove === true;
                });

                expect(registry.entries).toHaveLength(1);
                expect(registry.entries).toContain(myEntry2);
                expect(registry.entries).not.toContain(myEntry);
            });
        });

        describe("when the callback itself removes the entries", () => {
            it("walks all the entries", () => {
                const myEntry = { key: 1, remove: true };
                const myEntry2 = { key: 2 };
                const registry = new InstanceRegistry();
                registry.add(myEntry);
                registry.add(myEntry2);

                const walked = [];

                registry.walk((entry) => {
                    walked.push(entry);
                    if (entry.remove) registry.remove(entry);
                });

                expect(walked).toHaveLength(2);
            });

            it("removes the entries when the callback returns true", () => {
                const myEntry = { key: 1, remove: true };
                const myEntry2 = { key: 2 };
                const registry = new InstanceRegistry();
                registry.add(myEntry);
                registry.add(myEntry2);

                const walked = [];

                registry.walk((entry) => {
                    walked.push(entry);
                    return entry.remove === true;
                });

                expect(registry.entries).toHaveLength(1);
                expect(registry.entries).toContain(myEntry2);
                expect(registry.entries).not.toContain(myEntry);
            });
        });
    });
});
