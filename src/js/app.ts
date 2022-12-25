import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

Alpine.plugin(persist);

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
//  Alpine.data("game", game);
});

Alpine.start();