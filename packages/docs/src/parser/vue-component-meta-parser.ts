
import { type ComponentMetaChecker } from 'vue-component-meta';
import type { ComponentDoc, DocGenOptions } from 'vue-docgen-api'
import { transformMeta, vueComponentMeta } from './vue-component-meta-helper';
import { getFilenameWithoutExtension } from '../utils';

const META_PROP_IGNORE = ["key", "ref", "ref_for", "ref_key", "class", "style"];

/**
 * Parse all the components at filePath and returns an array of their
 * props, public methods, events and slot
 * @param filePath absolute path of the parsed file
 * @param opts
 */
export async function parser(checker: ComponentMetaChecker, filePath: string, opts?: DocGenOptions, event?: unknown): Promise<ComponentDoc[]> {
    const component = getFilenameWithoutExtension(filePath);
    
    // if (!filePath || filePath.includes("tests")) return;
    // if (!component || IGNORE.includes(component)) return;

    console.log(`Processing component ${component}...`);

    // analyse component with vue-component-meta
    const metaSources = await vueComponentMeta(checker, filePath);

    if(!metaSources) return [];

    // map data to vue-docgen-api structure
    const docs = metaSources.map(meta => transformMeta(meta, {props: META_PROP_IGNORE}));
             
    return docs;
}


export default parser;