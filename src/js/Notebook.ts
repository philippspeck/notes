import { Page } from "./Page";

export class Notebook {
  pages: any[] = [];
  currentPageIndex;
  strokeActive: boolean = false;
  canvasResolutionFactor: number = 1;

  constructor() {
    if (this.pages.length == 0) {
      this.pages.push({});
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
    document.addEventListener("pointerdown", (event) => {
      this.canvasPointerDown(event);
    });
    document.addEventListener("pointerup", (event) => {
      this.canvasPointerUp(event);
    });
    document.addEventListener("pointermove", (event) => {
      this.canvasPointerMove(event);
    });
    window.addEventListener("resize", () => {
      this.canvasResize();
    });
    document.addEventListener("DOMContentLoaded", (event) =>
      this.canvasResize()
    );
  }

  canvasContext() {
    return this.canvas().getContext("2d");
  }

  canvas() {
    return document.getElementById("canvas");
  }

  canvasPointerUp(event): void {
    this.strokeActive = false;
  }

  canvasPointerDown(event): void {
    const canvasContext = this.canvasContext();
    this.strokeActive = true;
    canvasContext.beginPath();
  }

  canvasPointerMove(event): void {
    if (this.strokeActive) {
      const canvasContext = this.canvasContext();
      canvasContext.lineTo(event.offsetX, event.offsetY);
      canvasContext.lineWidth = 2;
      canvasContext.stroke();
      canvasContext.moveTo(event.offsetX, event.offsetY);
    }
  }

  canvasResize(): void {
    this.canvas().width = window.innerWidth;
    this.canvas().height = window.innerHeight;
  }
}
