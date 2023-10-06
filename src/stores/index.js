import { createPinia } from "pinia";

export * from "./module/loader";
export * from "./module/alert";

export * from "./api/shopping";
export * from "./api/product";
export * from "./api/users";

export const pinia = createPinia();
