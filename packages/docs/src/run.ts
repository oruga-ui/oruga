import path from "path";

import docgen, {
    defineConfig,
    type DocgenCLIConfig,
} from "vue-docgen-cli/lib/docgen";
import { findFileCaseInsensitive, getFilenameWithoutExtension } from "./utils";
import renderEvents from "./templates/events";
import renderMethods from "./templates/methods";
// import renderExpose from './templates/expose'
import renderSlots from "./templates/slots";
import renderProps from "./templates/props";
import renderComponent from "./templates/component";
import parser from "./parser/parser";
import { createVueComponentMetaChecker } from "./parser/vue-component-meta-helper";

import {
    header,
    component,
    events,
    methods,
    expose,
    props,
    slots,
    defaultExample,
    functionalTag,
} from "vue-docgen-cli/lib/compileTemplates";
import { createThemeDocs } from "./themes-helper";

// Components to be ignored for creating docs
const IGNORE_COMPONENTS = [
    "*/DropdownItem.vue",
    "*/SliderThumb.vue",
    "*/SliderTick.vue",
    "*/TableMobileSort.vue",
    "*/TablePagination.vue",
    "*/TableColumn.vue",
    "*/PaginationButton.vue",
    "*/TabItem.vue",
    "*/StepItem.vue",
    "*/MenuItem.vue",
    "*/DatepickerTable.vue",
    "*/DatepickerTableRow.vue",
    "*/DatepickerMonth.vue",
    "*/NotificationNotice.vue",
    "*/CarouselItem.vue",
    "utils/**",
    "*/examples/**",
];

/** generate documentation via vue-docgen-cli */
export async function run(
    conf: { watch: boolean } = { watch: false },
): Promise<void> {
    const __dirname = process.cwd();

    // create vue-component-meta checker
    const checker = createVueComponentMetaChecker(
        path.resolve(__dirname, "../oruga/tsconfig.app.json"),
    );

    // create vue-docgen-api config
    const docgenConfig = defineConfig({
        cwd: __dirname,
        watch: conf.watch,
        componentsRoot: path.resolve(__dirname, "../oruga/src/components"),
        components: "*/[A-Z]*.vue",
        outDir: "./components",
        docsRepo: "oruga-ui/oruga",
        docsBranch: "develop",
        docsFolder: "packages/docs",
        defaultExamples: false,
        ignore: IGNORE_COMPONENTS,
        propsParser: (filePath: string) => parser(checker, filePath),
        templates: {
            props: renderProps,
            slots: renderSlots,
            methods: renderMethods,
            events: renderEvents,
            // expose: renderExpose,
            component: renderComponent,
        },
        getDestFile: (file: string, config: DocgenCLIConfig): string => {
            const componentName = getFilenameWithoutExtension(file);
            return path.join(config.outDir, `${componentName}.md`);
        },
        getDocFileName: (componentPath: string): string | false => {
            const files = [
                path.join(path.dirname(componentPath), "Readme.md"),
                // ComponentName.md
                componentPath.replace(path.extname(componentPath), ".md"),
                // FolderName.md when component definition file is index.js
                path.join(
                    path.dirname(componentPath),
                    path.basename(path.dirname(componentPath)) + ".md",
                ),
            ];
            for (const file of files) {
                const existingFile = findFileCaseInsensitive(file);
                if (existingFile) {
                    return existingFile;
                }
            }
            return false;
        },
    });

    if (!docgenConfig.getRepoEditUrl && docgenConfig.docsRepo) {
        const branch = docgenConfig.docsBranch || "main";
        const dir = docgenConfig.docsFolder || "";
        docgenConfig.getRepoEditUrl = (p: string) =>
            `https://github.com/${docgenConfig.docsRepo}/edit/${branch}/${dir}/${p}`;
    }

    docgenConfig.templates = {
        header: docgenConfig.templates?.header ?? header,
        component: docgenConfig.templates?.component ?? component,
        events: docgenConfig.templates?.events ?? events,
        methods: docgenConfig.templates?.methods ?? methods,
        props: docgenConfig.templates?.props ?? props,
        slots: docgenConfig.templates?.slots ?? slots,
        expose: docgenConfig.templates?.expose ?? expose,
        defaultExample:
            docgenConfig.templates?.defaultExample ?? defaultExample,
        functionalTag: docgenConfig.templates?.functionalTag ?? functionalTag,
    } satisfies DocgenCLIConfig["templates"];

    console.log("Start generating docs...");

    // generate documentation via vue-docgen-cli
    // @ts-ignore
    await docgen.default(docgenConfig);

    createThemeDocs(__dirname);
    console.log("Generating docs finished.");
}
