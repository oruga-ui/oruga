import type {
    PropDescriptor,
    EventDescriptor,
    SlotDescriptor,
} from "vue-docgen-api";
import {
    type ComponentMetaChecker,
    type ComponentMeta,
    type MetaCheckerOptions,
    type PropertyMetaSchema,
    TypeMeta,
    createChecker,
} from "vue-component-meta";
import type { EventMeta, PropertyMeta, SlotMeta } from "vue-component-meta";
import { getFilenameWithoutExtension, lowercaseFirstLetter } from "../utils";

export type MetaSource = {
    name: string;
    exportName: string;
    sourceFiles: string;
} & ComponentMeta;

/**
 * Creates the `vue-component-meta` checker to use for extracting component meta/docs.
 */
export function createVueComponentMetaChecker(
    tsconfigPath: string,
): ComponentMetaChecker {
    const checkerOptions: MetaCheckerOptions = {
        forceUseTs: true,
        noDeclarations: true,
        printer: { newLine: 1 },
    };

    return createChecker(tsconfigPath, checkerOptions);
}

/**
 * Extract the component meta information for a component based on the given path.
 *
 * @param checker ComponentMetaChecker instance
 * @param componentPath Component path
 * @returns Array of MetaSource object for each script tag in the component
 */
export async function vueComponentMeta(
    checker: ComponentMetaChecker,
    componentPath: string,
): Promise<MetaSource[] | undefined> {
    try {
        // create component meta for each name export in the component
        const exportNames = checker.getExportNames(componentPath);
        const componentsMeta = exportNames.map((name) =>
            checker.getComponentMeta(componentPath, name),
        );

        const metaSources: MetaSource[] = componentsMeta
            // filter out empty meta
            .filter((meta) => {
                const isEmpty =
                    !meta.props.length &&
                    !meta.events.length &&
                    !meta.slots.length &&
                    !meta.exposed.length;

                if (isEmpty || meta.type === TypeMeta.Unknown) {
                    console.warn(
                        `Failure parsing component '${componentsMeta}': meta is empty.`,
                    );
                    return false;
                }
                return true;
            })
            // parse component meta to MetaSource
            .map((meta, index) => {
                const exportName = exportNames[index];

                // we remove nested object schemas here since they are not used (we don't generate controls for object properties)
                // and they can cause "out of memory" issues for large/complex schemas (e.g. HTMLElement)
                (["props", "events", "slots", "exposed"] as const).forEach(
                    (key) => {
                        meta[key].forEach((value) => {
                            if (Array.isArray(value.schema)) {
                                value.schema.forEach((eventSchema) =>
                                    removeNestedSchemas(eventSchema),
                                );
                            } else {
                                removeNestedSchemas(value.schema);
                            }
                        });
                    },
                );

                // TODO: check if this is needed
                const exposed =
                    // the meta also includes duplicated entries in the "exposed" array with "on"
                    // prefix (e.g. onClick instead of click), so we need to filter them out here
                    meta.exposed
                        .filter((expose) => {
                            let nameWithoutOnPrefix = expose.name;

                            if (nameWithoutOnPrefix.startsWith("on")) {
                                nameWithoutOnPrefix = lowercaseFirstLetter(
                                    expose.name.replace("on", ""),
                                );
                            }

                            const hasEvent = meta.events.find(
                                (event) => event.name === nameWithoutOnPrefix,
                            );
                            return !hasEvent;
                        })
                        // remove unwanted duplicated "$slots" expose
                        .filter((expose) => {
                            if (expose.name === "$slots") {
                                const slotNames = meta.slots.map(
                                    (slot) => slot.name,
                                );
                                return !slotNames.every((slotName) =>
                                    expose.type.includes(slotName),
                                );
                            }
                            return true;
                        });

                // create MetaSource return object
                return {
                    sourceFiles: componentPath,
                    exportName,
                    name:
                        exportName === "default"
                            ? "O" + getFilenameWithoutExtension(componentPath)
                            : exportName,
                    // add meta properties
                    ...meta,
                    // override meta exposed
                    exposed,
                };
            });

        // if there is no component meta, return undefined
        if (metaSources.length === 0) return undefined;
        // else return source map
        return metaSources;
    } catch (e: unknown) {
        console.warn(e);
        return undefined;
    }
}

/**
 * Removes any nested schemas from the given main schema (e.g. from a prop, event, slot or exposed).
 * Useful to drastically reduce build size and prevent out of memory issues when large schemas (e.g.
 * HTMLElement, MouseEvent) are used.
 * @source https://github.com/storybookjs/storybook/blob/next/code/frameworks/vue3-vite/src/plugins/vue-component-meta.ts
 */
function removeNestedSchemas(schema: PropertyMetaSchema): void {
    if (typeof schema !== "object") return;

    if (schema.kind === "enum") {
        // for enum types, we do not want to remove the schemas because otherwise the controls will be missing
        // instead we remove the nested schemas for the enum entries to prevent out of memory errors for types like "HTMLElement | MouseEvent"
        schema.schema?.forEach((enumSchema) => removeNestedSchemas(enumSchema));
        return;
    }
    delete schema.schema;
}

/** trasnform vue-component-meta props type into vue-docgen-api props type */
export function mapProps(
    props: PropertyMeta[],
    ignore: string[] = [],
): PropDescriptor[] {
    return props
        .filter((p) => !ignore.includes(p.name))
        .map((prop): PropDescriptor => {
            const isDefaultFunc = prop.default?.includes("() =>");

            // remove undefined because we wrap the object with partial
            if (prop.type.includes("| undefined"))
                prop.type = prop.type.replace("| undefined", "");
            // trim leading and trailing white space
            prop.type = prop.type.trim();

            // create vue-docgen-api prop doc object
            return {
                name: prop.name,
                required: prop.required,
                type: { name: prop.type },
                description: prop.description,
                defaultValue: {
                    func: isDefaultFunc,
                    value: isDefaultFunc
                        ? "() => " + prop.default
                        : prop.default || "",
                },
                tags: prop.tags
                    ?.map((tag) => ({
                        [tag.name]: [
                            {
                                name: tag.name,
                                title: tag.name,
                                content: tag.text,
                                description: tag.text || true,
                            },
                        ],
                    }))
                    .reduce((a, b) => ({ ...a, ...b }), {}),
                values: prop.tags
                    ?.find((tag) => tag.name === "values")
                    ?.text?.split(", "),
            };
        });
}

/** trasnform vue-component-meta events type into vue-docgen-api events type */
export function mapEvents(events: EventMeta[]): EventDescriptor[] {
    return events.map((event): EventDescriptor => {
        // create vue-docgen-api event doc object
        return {
            name: event.name,
            description: event.description || "",
            type: {
                // TODO: update this mapping
                names: [event.type],
                elements: [],
            },
        };
    });
}

/** trasnform vue-component-meta slots type into vue-docgen-api slots type */
export function mapSlots(slots: SlotMeta[]): SlotDescriptor[] {
    return slots.map((slot): SlotDescriptor => {
        // create vue-docgen-api slot doc object
        return {
            name: slot.name,
            description: slot.description,
            bindings: [], // TODO: add mapping
            tags: {}, // TODO: add mapping
        };
    });
}
