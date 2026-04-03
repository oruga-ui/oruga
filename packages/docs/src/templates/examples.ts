import * as fs from "fs";
import path from "path";
import type { SafeDocgenCLIConfig } from "vue-docgen-cli/lib/config";

export function renderer(name: string, config: SafeDocgenCLIConfig): string {
    const header = `
## Examples

`;

    const exampleFolderPath = path.resolve(
        config.componentsRoot,
        `${name}/examples`,
    );
    const importPath = `components/${name}/examples`;

    // check if example root is defined as markdown
    const mdPath = path.resolve(exampleFolderPath, "index.md");
    if (fs.existsSync(mdPath)) {
        // update import paths
        const file = fs.readFileSync(mdPath);
        const examples = file.toString().replaceAll('"./', `"@/${importPath}/`);

        return header + examples;
    }

    // check if example root defined as vue component
    const vuePath = path.resolve(exampleFolderPath, "index.vue");
    if (fs.existsSync(vuePath)) {
        const examples = `
<script> 
    import Example${name} from "@/${importPath}/index.vue";
</script>

<Example${name} />
`;

        return header + examples;
    }

    return "";
}

export default renderer;
