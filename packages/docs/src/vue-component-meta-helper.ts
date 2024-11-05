import { parse } from "node:path";

import {
    type ComponentMetaChecker,
    type ComponentMeta,
    type MetaCheckerOptions,
    type PropertyMetaSchema,
    TypeMeta,
    createChecker,
} from "vue-component-meta";
import { parseMulti } from "vue-docgen-api";

type MetaSource = {
    exportName: string;
    displayName: string;
    sourceFiles: string;
} & ComponentMeta;

export async function vueComponentMeta(
    checker: ComponentMetaChecker,
    componentPath: string,
) {
    try {
        const exportNames = checker.getExportNames(componentPath);
        let componentsMeta = exportNames.map((name) =>
            checker.getComponentMeta(componentPath, name),
        );
        componentsMeta = await applyTempFixForEventDescriptions(
            componentPath,
            componentsMeta,
        );

        const metaSources: MetaSource[] = [];

        componentsMeta.forEach((meta, index) => {
            // filter out empty meta
            const isEmpty =
                !meta.props.length &&
                !meta.events.length &&
                !meta.slots.length &&
                !meta.exposed.length;

            if (isEmpty || meta.type === TypeMeta.Unknown) {
                console.warn(
                    `Failure parsing component '${componentsMeta}': meta is empty.`,
                );
                return;
            }

            const exportName = exportNames[index];

            // we remove nested object schemas here since they are not used inside Storybook (we don't generate controls for object properties)
            // and they can cause "out of memory" issues for large/complex schemas (e.g. HTMLElement)
            // it also reduced the bundle size when running "storybook build" when such schemas are used
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

            metaSources.push({
                exportName,
                displayName:
                    exportName === "default"
                        ? getFilenameWithoutExtension(componentPath)
                        : exportName,
                ...meta,
                exposed,
                sourceFiles: componentPath,
            });
        });

        // if there is no component meta, return undefined
        if (metaSources.length === 0) return undefined;
        return metaSources;
    } catch (e: any) {
        console.warn(e);
        return undefined;
    }
}

/**
 * Creates the `vue-component-meta` checker to use for extracting component meta/docs.
 */
export function createVueComponentMetaChecker(tsconfigPath) {
    const checkerOptions: MetaCheckerOptions = {
        forceUseTs: true,
        noDeclarations: true,
        printer: { newLine: 1 },
    };

    return createChecker(tsconfigPath, checkerOptions);
}

/** Gets the filename without file extension. */
function getFilenameWithoutExtension(filename: string) {
    return parse(filename).name;
}

/** Lowercases the first letter. */
function lowercaseFirstLetter(string: string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 * Applies a temporary workaround/fix for missing event descriptions because Volar is currently not
 * able to extract them. Will modify the events of the passed meta. Performance note: Based on some
 * quick tests, calling "parseMulti" only takes a few milliseconds (8-20ms) so it should not
 * decrease performance that much. Especially because it is only execute if the component actually
 * has events.
 *
 * Check status of this Volar issue: https://github.com/vuejs/language-tools/issues/3893 and
 * update/remove this workaround once Volar supports it:
 *
 * - Delete this function
 * - Uninstall vue-docgen-api dependency
 */
async function applyTempFixForEventDescriptions(
    filename: string,
    componentMeta: ComponentMeta[],
): Promise<ComponentMeta[]> {
    // do not apply temp fix if no events exist for performance reasons
    const hasEvents = componentMeta.some((meta) => meta.events.length);

    if (!hasEvents) return componentMeta;

    try {
        const parsedComponentDocs = await parseMulti(filename);

        // add event descriptions to the existing Volar meta if available
        componentMeta.map((meta, index) => {
            const eventsWithDescription = parsedComponentDocs[index].events;

            if (!meta.events.length || !eventsWithDescription?.length)
                return meta;

            meta.events = meta.events.map((event) => {
                const description = eventsWithDescription.find(
                    (i) => i.name === event.name,
                )?.description;
                if (description) {
                    (
                        event as typeof event & { description: string }
                    ).description = description;
                }
                return event;
            });

            return meta;
        });
    } catch {
        // noop
    }

    return componentMeta;
}

/**
 * Removes any nested schemas from the given main schema (e.g. from a prop, event, slot or exposed).
 * Useful to drastically reduce build size and prevent out of memory issues when large schemas (e.g.
 * HTMLElement, MouseEvent) are used.
 */
function removeNestedSchemas(schema: PropertyMetaSchema) {
    if (typeof schema !== "object") {
        return;
    }
    if (schema.kind === "enum") {
        // for enum types, we do not want to remove the schemas because otherwise the controls will be missing
        // instead we remove the nested schemas for the enum entries to prevent out of memory errors for types like "HTMLElement | MouseEvent"
        schema.schema?.forEach((enumSchema) => removeNestedSchemas(enumSchema));
        return;
    }
    delete schema.schema;
}
