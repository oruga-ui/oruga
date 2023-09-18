import path, { __dirname } from "path";
import { startDevServer } from "@cypress/vite-dev-server";
import task from "@cypress/code-coverage/task";

export default (on, config) => {
    task(on, config);
    on("dev-server:start", (options) => {
        return startDevServer({
            options,
            viteConfig: {
                configFile: path.resolve(
                    __dirname,
                    "..",
                    "..",
                    "vite.config.js",
                ),
            },
        });
    });

    return config;
};
