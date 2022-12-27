export class Page {
  type: string;
  textContent: string;
  drawingContent;

  constructor(type: string) {
    this.type = type;
  }

  saveDrawing() {
    if (this.type == "drawing") {
      this.drawingContent = document.getElementById("canvas").toDataURL();
    }
  }

  loadDrawing() {
    if (this.type == "drawing") {
      let image = new Image();
      image.src = this.drawingContent;
      image.onload = function () {
        document
          .getElementById("canvas")
          .getContext("2d")
          .drawImage(image, 0, 0);
      };
    }
  }
}
