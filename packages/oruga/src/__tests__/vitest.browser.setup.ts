import { config } from "vitest-browser-vue";
import { createTestingOruga } from "@/utils/config";

config.global.plugins = [createTestingOruga()];
