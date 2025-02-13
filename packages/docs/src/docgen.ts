import path from "path";

import docgen, {
    defineConfig,
    type DocgenCLIConfig,
} from "vue-docgen-cli/lib/docgen";
import { findFileCaseInsensitive, getFilenameWithoutExtension } from "./utils";
import { createVueComponentMetaChecker } from "./parser/vue-component-meta-helper";
import { createThemeDocs } from "./themes-helper";

// custom templates
import renderEvents from "./templates/events";
import renderSlots from "./templates/slots";
import renderProps from "./templates/props";
import renderComponent from "./templates/component";
import parser from "./parser/parser";

// native vue-docgen-cli templates
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
export async function run(): Promise<void> {
    const __dirname = process.cwd();
    const argWatch = process.argv[2];
    const watch = argWatch === "--watch";
    if (watch) console.info("Watch mode is turned on.");

    // create vue-component-meta checker
    const checker = createVueComponentMetaChecker(
        path.resolve(__dirname, "../oruga/tsconfig.app.json"),
    );

    // create vue-docgen-api config
    const docgenConfig = defineConfig({
        cwd: __dirname,
        watch: watch,
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
            events: renderEvents,
            component: renderComponent,
        },
        getDestFile: (file: string, config: DocgenCLIConfig): string => {
            const componentName = getFilenameWithoutExtension(file);
            return path.join(config.outDir, `${componentName}.md`);
        },
        getDocFileName: (componentPath: string): string | false => {
            const files = [
                path.join(path.dirname(componentPath), "readme.md"),
                path.join(path.dirname(componentPath), "/examples/readme.md"),
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
                if (existingFile) return existingFile;
            }
            return false;
        },
    });

    // construct edit url
    // if (!docgenConfig.getRepoEditUrl && docgenConfig.docsRepo) {
    //     const branch = docgenConfig.docsBranch || "main";
    //     const dir = docgenConfig.docsFolder || "";
    //     docgenConfig.getRepoEditUrl = (p: string) =>
    //          `https://github.com/${docgenConfig.docsRepo}/edit/${branch}/${dir}/${p}`;
    // }

    // extend the config with default vue-docgen-cli templates
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
    // @ts-expect-error .default call is unexpected
    await docgen.default(docgenConfig);

    // generate theme config documentations
    createThemeDocs(__dirname);

    console.log("Generating docs finished.");
}

// execute scripts
run();
