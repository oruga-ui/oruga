import type { ComponentDoc, ParamTag } from "vue-docgen-api";
import type { RenderedUsage } from "vue-docgen-cli";
import { type SubTemplateOptions } from "vue-docgen-cli/lib/compileTemplates";
import type {
    ContentAndDependencies,
    SafeDocgenCLIConfig,
} from "vue-docgen-cli/lib/config";
import { getFilenameWithoutExtension } from "../utils";
import renderStyle from "./style";
import renderExamples from "./examples";
import renderClasses from "./classes";

export function renderer(
    renderedUsage: RenderedUsage,
    doc: ComponentDoc,
    config: SafeDocgenCLIConfig,
    fileName: string,
    requiresMd: ContentAndDependencies[],
    { isSubComponent }: SubTemplateOptions,
): string {
    const { displayName, description, tags, functional, docsBlocks } = doc;
    const { deprecated, author, since, version, see, link, style } = tags || {};
    const component = getFilenameWithoutExtension(fileName);

    const tag = (component.match(/[A-Z][a-z]+/g) || []).join("-").toLowerCase();

    const requires = !component;
    return `
${isSubComponent ? "" : `# ${deprecated ? `~~${displayName}~~` : displayName}`}

${
    requires || isSubComponent
        ? ""
        : `<div class="vp-doc">
${deprecated ? `> **Deprecated** ${(deprecated[0] as ParamTag).description}\n` : ""}
${description ? "> " + description : ""}

${functional ? renderedUsage.functionalTag : ""}
${author ? author.map((a) => `Author: ${(a as ParamTag).description}\n`) : ""}
${since ? `Since: ${(since[0] as ParamTag).description}\n` : ""}
${version ? `Version: ${(version[0] as ParamTag).description}\n` : ""}
${see ? see.map((s) => `[See](${(s as ParamTag).description})\n`) : ""}
${link ? link.map((l) => `[See](${(l as ParamTag).description})\n`) : ""}
${docsBlocks ? docsBlocks : ""}
</div>
`
}
${
    isSubComponent
        ? ""
        : `
<div class="vp-example">
${renderExamples(component)}
</div>

<div class="vp-example">
${renderClasses(component)}
</div>
`
}
<div class="vp-doc">

## ${component} component

${description ? "> " + description : ""}

\`\`\`html
<o-${tag}></o-${tag}>
\`\`\`


${renderedUsage.props}
${renderedUsage.methods}
${renderedUsage.events}
${renderedUsage.slots}
</div>
${
    requiresMd.length
        ? requiresMd.map((component) => component.content).join(" ")
        : ""
}
${
    style
        ? `
<div class="vp-doc">
${renderStyle(config, String((style[0] as ParamTag).description ?? component))}
</div>`
        : ""
}`;
}

export default renderer;
