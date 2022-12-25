export class Page {
  type: string;
  textContent: string;
  drawingContent;

  saveDrawing() {
    const canvas = document.getElementById("canvas");

    if (typeof canvas !== "undefined") {
      this.drawingContent = canvas.toDataURL();
    }
  }
}
