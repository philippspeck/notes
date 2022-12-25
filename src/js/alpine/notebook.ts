import { Notebook } from "../Notebook";

export function notebook() {
  return {
    init() {
      this.revitalize();
    },
    notebook: this.$persist(new Notebook()),
    revitalize() {
      if (this.notebook.constructor.name !== "Notebook") {
        this.notebook = Object.assign(new Notebook(), this.notebook);
      }
    },
  };
}
