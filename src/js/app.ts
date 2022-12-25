import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import { notebook } from "./alpine/notebook";

Alpine.plugin(persist);

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("notebook", notebook);
});

Alpine.start();
