import { Notebook } from "../Notebook";
import { Page } from "../Page";

export function notebook() {
  return {
    init() {
      this.revitalize();
    },
    notebook: this.$persist(new Notebook()),
    revitalize() {
      if (this.notebook.constructor.name !== "Notebook") {
        this.notebook = Object.assign(new Notebook(), this.notebook);
        this.notebook.pages.forEach((page, index) => {
          this.notebook.pages[index] = Object.assign(new Page(page.type), page);
          if (this.notebook.currentPageIndex == index) {
            this.notebook.pages[index].loadDrawing();
          }
        });
      }
    },
  };
}
