import { Component, AfterViewInit, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.css"]
})
export class FileInput implements AfterViewInit {
  @Input("accepts") accepts: string = "*";
  @Input("id") id: string = "file_input"
  @Input("displayText") displayText: string = "Click or Drag to Upload a File";
  @Input("styles")
  styles: string =
    "height : 100px; width : 100%; padding : 20px; margin-bottom :20px; text-align : center; text-justify : center; background-color : rgb(230, 230, 230)";
  @Output() fileMetaSet = new EventEmitter<File>();
  @Output() fileDataSet = new EventEmitter<Uint8Array>();

  constructor() {}

  ngAfterViewInit() {
    var id = this.id;
    let component = document.getElementById(this.id + "upload");

    let uploadArea = document.getElementById(this.id);
    uploadArea.setAttribute("style", this.styles);

    uploadArea.ondragover = event => {
      event.preventDefault();
    };

    uploadArea.onclick = event => {
      let fileInput = <HTMLInputElement>document.getElementById(this.id + "dialog");
      fileInput.click();
      fileInput.onchange = event => {
        if (fileInput.files.length > 0) {
          var file = fileInput.files[0];

          var reader = new FileReader();
          reader.onload = function() {
            var arrayBuffer = this.result;
            var array = new Uint8Array(arrayBuffer);

            var event: Event = new CustomEvent( id + "fileAdded", {
              bubbles: true,
              detail: { file: file, data: array }
            });
            dispatchEvent(event);
          };
          reader.readAsArrayBuffer(file);
        } else {
          console.log("User cancelled file Upload");
        }
      };
    };

    uploadArea.ondrop = event => {
      let dropzone = document.getElementById(this.id);
      event.preventDefault();
      event.dataTransfer.dropEffect = "all";
      event.dataTransfer.effectAllowed = "all";

      var file = event.dataTransfer.files[0];

      var reader = new FileReader();
      reader.onload = function() {
        var arrayBuffer = this.result;
        var array = new Uint8Array(arrayBuffer);

        var event: Event = new CustomEvent( id + "fileAdded", {
          bubbles: true,
          detail: { file: file, data: array }
        });
        dispatchEvent(event);
      };
      reader.readAsArrayBuffer(file);
    };

    addEventListener( id + "fileAdded", (event: any) => {
      this.fileMetaSet.emit(event.detail.file);
      this.fileDataSet.emit(event.detail.data);
    });
  }
}
