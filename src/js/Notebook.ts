import { Page } from "./Page";

export class Notebook {
  pages: any[] = [];
  currentPageIndex;
  strokeActive: boolean = false;
  canvasResolutionFactor: number = 1;

  constructor() {
    if (this.pages.length == 0) {
      this.addTextPage();
    }
    if (typeof this.currentPageIndex == "undefined") {
      this.currentPageIndex = 0;
    }

    this.addEventListeners();
  }

  currentPage(): Page {
    return this.pages[this.currentPageIndex];
  }

  addDrawingPage() {
    this.pages.push(new Page("drawing"));
  }

  addTextPage() {
    this.pages.push(new Page("text"));
  }

  addEventListeners() {
    /* Textbox Event Listeners */
    document.addEventListener("keydown", (event) =>
      this.canvasPointerDown(event)
    );

    /* Canvas Event Listeners */
    this.canvas().addEventListener("pointerdown", (event) =>
      this.canvasPointerDown(event)
    );
    this.canvas().addEventListener("pointerup", (event) =>
      this.canvasPointerUp(event)
    );
    this.canvas().addEventListener("pointermove", (event) =>
      this.canvasPointerMove(event)
    );
    window.addEventListener("resize", () => this.canvasResize());
    document.addEventListener("DOMContentLoaded", () => this.canvasResize());
  }

  canvasContext() {
    return this.canvas().getContext("2d");
  }

  canvas() {
    return document.getElementById("canvas");
  }

  canvasPointerUp(event): void {
    if (
      this.pages[this.currentPageIndex].type == "drawing" &&
      event.target == this.canvas()
    ) {
      this.strokeActive = false;
      this.pages[this.currentPageIndex].saveDrawing();
    }
  }

  canvasPointerDown(event): void {
    if (
      this.pages[this.currentPageIndex].type == "drawing" &&
      event.target == this.canvas()
    ) {
      const canvasContext = this.canvasContext();
      this.strokeActive = true;
      canvasContext.beginPath();
    }
  }

  canvasPointerMove(event): void {
    if (
      this.pages[this.currentPageIndex].type == "drawing" &&
      event.target == this.canvas()
    ) {
      if (this.strokeActive) {
        const canvasContext = this.canvasContext();
        canvasContext.lineTo(event.offsetX, event.offsetY);
        canvasContext.lineWidth = 2;
        canvasContext.stroke();
        canvasContext.moveTo(event.offsetX, event.offsetY);
      }
    }
  }

  canvasResize(): void {
    if (this.pages[this.currentPageIndex].type == "drawing") {
      this.canvas().width = window.innerWidth;
      this.canvas().height = window.innerHeight;
    }
  }

  changePage(pageNumber: number): void {
    this.currentPageIndex = pageNumber;
    this.currentPage().loadDrawing();
  }
}
