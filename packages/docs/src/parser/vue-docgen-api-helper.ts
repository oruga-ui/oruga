import { type ComponentDoc, parseMulti } from "vue-docgen-api";

export async function vueDocgenApi(filePath: string): Promise<ComponentDoc[]> {
    return await parseMulti(filePath);
}
