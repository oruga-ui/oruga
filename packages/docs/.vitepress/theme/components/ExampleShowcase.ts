import { loadTheme } from "..";

/** example-showcase web component */
export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // load the current theme config
        const theme = loadTheme();

        // create an HTML link element for the current theme cdn
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = theme.cdn;

        // Inject the stylesheets within the shadow root
        // so that it doesn't leak outside of the component.
        this.shadowRoot?.appendChild(style);

        // create an HTML link element for the fortawesome icons
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/svg-with-js.min.css";

        // Inject the stylesheets within the shadow root
        // so that it doesn't leak outside of the component.
        this.shadowRoot?.appendChild(link);
    }

    connectedCallback(): void {
        if (!this.shadowRoot) return;

        // The slot content must be moved to the shadow root
        // for the scoped style above to be applied.
        this.shadowRoot.append(...this.childNodes);

        // Create some CSS to apply to the shadow root
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(`
            .odocs-spaced p {
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
            }

            .odocs-spaced p > *:not(:last-child) {
                margin-right: 0.5rem;
            }

            .example-slide {
                padding: 9rem 4.5rem;
                color: #ffffff;
                text-align: center;
            }
        `);

        // Attach the created style to the shadow root
        this.shadowRoot.adoptedStyleSheets = [
            ...(this.shadowRoot.adoptedStyleSheets || []),
            stylesheet,
        ];
    }
}
