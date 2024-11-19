import path from "path";

import docgen, { defineConfig, type DocgenCLIConfig } from "vue-docgen-cli/lib/docgen";
import { getFilenameWithoutExtension } from "./utils";
import renderEvents from "./templates/events";
import renderMethods from "./templates/methods";
// import renderExpose from './templates/expose'
import renderSlots from "./templates/slots";
import renderProps from "./templates/props";
import renderComponent from "./templates/component";
import vueComponentMetaParser from "./parser/vue-component-meta-parser";
import { createVueComponentMetaChecker } from "./parser/vue-component-meta-helper";

// Components to be ignored for creating docs
const IGNORE_COMPONENTS = [
    "DropdownItem",
    "SliderThumb",
    "SliderTick",
    "TableMobileSort",
    "TablePagination",
    "TableColumn",
    "PaginationButton",
    "TabItem",
    "StepItem",
    "MenuItem",
    "Inspector",
    "DatepickerTable",
    "DatepickerTableRow",
    "DatepickerMonth",
    "PickerWrapper",
    "PositionWrapper",
    "NotificationNotice",
    "CarouselItem",
];

const __dirname = process.cwd();


/** generate documentation cia vue-docgen-cli */
export function index(): void {

    // create vue-component-meta checker
    const checker = createVueComponentMetaChecker(path.resolve(__dirname, "../oruga/tsconfig.app.json"));

    // create vue-docgen-api config
    const docgenConfig = defineConfig({
        componentsRoot: path.resolve(__dirname, "../../oruga/src/components"),
        components: "**/[A-Z]*.vue",
        outDir: "./components",
        docsRepo: "oruga-ui/oruga",
        docsBranch: "develop",
        docsFolder: "packages/docs",
        defaultExamples: false,
        ignore: IGNORE_COMPONENTS,
        getDestFile: (file: string, config: DocgenCLIConfig): string => {
            const componentName = getFilenameWithoutExtension(file);
            return path.join(config.outDir, `${componentName}.md`);
        },
        propsParser: (...args) =>  vueComponentMetaParser(checker, ...args),
        templates: {
            props: renderProps,
            slots: renderSlots,
            methods: renderMethods,
            events: renderEvents,
            // expose: renderExpose,
            component: renderComponent,
        },
    });

    // generate documentation via vue-docgen-cli 
    docgen(docgenConfig as DocgenCLIConfig);
}
