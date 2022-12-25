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
      document.getElementById("canvas").width =
        document.getElementById("canvas").width;
      let image = new window.Image();
      image.src = this.drawingContent;
      document.getElementById("canvas").getContext("2d").drawImage(image, 0, 0);
    }
  }
}
