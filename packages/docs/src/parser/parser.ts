import { type ComponentMetaChecker } from "vue-component-meta";
import type { ComponentDoc } from "vue-docgen-api";
import { mapProps, vueComponentMeta } from "./vue-component-meta-helper";
import { vueDocgenApi } from "./vue-docgen-api-helper";
import { getFilenameWithoutExtension } from "@docs/utils";

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
    const componentName =
      meta.exportName === "default"
        ? "O" + getFilenameWithoutExtension(meta.sourceFile)
        : meta.exportName;
    // find equivalent vue-docgen-api object
    let doc: ComponentDoc | undefined = docgenSources.find(
      (doc) => doc.name == componentName,
    );

    if (!doc) {
      console.warn(
        "vue-docgen-api data not found for file:",
        componentName,
      );
      doc = {
        displayName: meta.name ?? componentName,
        exportName: meta.exportName,
        sourceFiles: [meta.sourceFile],
        description: meta.description,
        tags: {}, // vue-component-meta does not have this information
      };
    }

    // vue-component-meta JSDoc descriptions only extracted for .ts/.js files
    // Vue SFCs not supported yet due to TypeScript virtual file processing, in v3.1.8
    doc.displayName = meta.name ?? doc.displayName;
    doc.description = meta.description ?? doc.description;

    // map vue-component-meta data into vue-docgen-api structure
    doc["props"] = mapProps(meta.props, META_PROP_IGNORE);
    // doc["events"] = mapEvents(meta.events); // vue-docgen-api has better information than vue-component-meta
    // doc["slots"] = mapSlots(meta.slots); // vue-docgen-api has better information than vue-component-meta

    return doc;
  });

  return docs;
}

export default parser;
