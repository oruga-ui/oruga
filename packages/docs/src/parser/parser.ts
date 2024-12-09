import { type ComponentMetaChecker } from "vue-component-meta";
import type { ComponentDoc } from "vue-docgen-api";
import { mapProps, vueComponentMeta } from "./vue-component-meta-helper";
import { vueDocgenApi } from "./vue-docgen-api-helper";

const META_PROP_IGNORE = ["key", "ref", "ref_for", "ref_key", "class", "style"];

/**
 * Parse all the components at filePath and returns an array of their
 * props, public methods, events and slot
 * @param filePath absolute path of the parsed file
 * @param opts
 */
export async function parser(
    checker: ComponentMetaChecker,
    filePath: string,
): Promise<ComponentDoc[]> {
    // analyse component with vue-component-meta
    const metaSources = await vueComponentMeta(checker, filePath);

    if (!metaSources) return [];

    // analyse component with vue-docgen-api
    const docgenSources = await vueDocgenApi(filePath);

    // merge vue-component-meta data to vue-docgen-api structure
    const docs = metaSources.map((meta) => {
        // find equivalent vue-docgen-api object
        let doc: ComponentDoc | undefined = docgenSources.find(
            (doc) => doc.name == meta.name,
        );

        if (!doc) {
            doc = {
                displayName: meta.name,
                exportName: meta.exportName,
                sourceFiles: [meta.sourceFiles],
                description: "", // vue-component-meta does not have this information
                tags: {}, // vue-component-meta does not have this information
            };
        }

        // map meta data into api structure
        doc["props"] = mapProps(meta.props, META_PROP_IGNORE);
        // doc["events"] = mapEvents(meta.events); // vue-docgen-api has better information than vue-component-meta
        // doc["slots"] = mapSlots(meta.slots); // TODO: can be enabled when defineSlots is used

        return doc;
    });

    return docs;
}

export default parser;
