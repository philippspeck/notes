export class Notebook {
  pages: any[] = [];
  currentPage;

  constructor() {
    if (this.pages.length == 0) {
      this.pages.push({});
    }
    if (typeof this.currentPage == "undefined") {
      this.currentPage = 0;
    }
  }

  addDrawingPage() {
    this.pages.push({});
  }

  addTextPage() {
    this.pages.push({});
  }
}
