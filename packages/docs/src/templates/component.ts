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
        : `<section class="odocs-head">
${deprecated ? `> **Deprecated** ${(deprecated[0] as ParamTag).description}\n` : ""}
${functional ? renderedUsage.functionalTag : ""}
${author ? author.map((a) => `Author: ${(a as ParamTag).description}\n`) : ""}
${since ? `Since: ${(since[0] as ParamTag).description}\n` : ""}
${version ? `Version: ${(version[0] as ParamTag).description}\n` : ""}
${see ? see.map((s) => `[See](${(s as ParamTag).description})\n`) : ""}
${link ? link.map((l) => `[See](${(l as ParamTag).description})\n`) : ""}
${docsBlocks ? docsBlocks : ""}
</section>
`
}
${
    isSubComponent
        ? ""
        : `
<section class="odocs-examples">
${renderExamples(component)}
</section>
`
}
<section class="odocs-specs">

## ${component} Component

${description ? "> " + description : ""}

\`\`\`html
<o-${tag}></o-${tag}>
\`\`\`

${renderedUsage.props}
${renderedUsage.methods}
${renderedUsage.events}
${renderedUsage.slots}
</section>
${
    requiresMd.length
        ? requiresMd.map((component) => component.content).join(" ")
        : ""
}
${
    isSubComponent
        ? ""
        : `
<section class="odocs-classes">
${renderClasses(component)}
</section>
`
}
${
    style
        ? `
<section class="odocs-style">
${renderStyle(config, String((style[0] as ParamTag).description ?? component))}
</section>`
        : ""
}`;
}

export default renderer;
