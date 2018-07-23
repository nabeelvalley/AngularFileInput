import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.css"]
})
export class FileInput implements OnInit {
  @Input("accepts") accepts: string = "*";
  @Input("displayText") displayText: string = "Click or Drag to Upload a File";
  @Input("styles")
  styles: string =
    "height : 100px; width : 100%; padding : 20px; margin-bottom :20px; text-align : center; text-justify : center; background-color : rgb(230, 230, 230)";
  @Output() fileMetaSet = new EventEmitter<File>();
  @Output() fileDataSet = new EventEmitter<Uint8Array>();

  constructor() {}

  ngOnInit() {
    let component = document.querySelector("#file_upload");
    let uploadArea = document.createElement("div");
    uploadArea.id = "file_input";
    uploadArea.classList.add("file_input");
    uploadArea.innerText = this.displayText;
    uploadArea.setAttribute("style", this.styles);

    uploadArea.ondragover = event => {
      event.preventDefault();
    };

    uploadArea.onclick = event => {
      let fileInput = <HTMLInputElement>document.querySelector("#file_dialog");
      fileInput.click();
      fileInput.onchange = event => {
        if (fileInput.files.length > 0) {
          var file = fileInput.files[0];

          var reader = new FileReader();
          reader.onload = function() {
            var arrayBuffer = this.result;
            var array = new Uint8Array(arrayBuffer);

            var event: Event = new CustomEvent("fileAdded", {
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
      let dropzone = document.querySelector("#file_input");
      event.preventDefault();
      event.dataTransfer.dropEffect = "all";
      event.dataTransfer.effectAllowed = "all";

      var file = event.dataTransfer.files[0];

      var reader = new FileReader();
      reader.onload = function() {
        var arrayBuffer = this.result;
        var array = new Uint8Array(arrayBuffer);

        var event: Event = new CustomEvent("fileAdded", {
          bubbles: true,
          detail: { file: file, data: array }
        });
        dispatchEvent(event);
      };
      reader.readAsArrayBuffer(file);
    };

    component.appendChild(uploadArea);

    addEventListener("fileAdded", (event: any) => {
      this.fileMetaSet.emit(event.detail.file);
      this.fileDataSet.emit(event.detail.data);
    });
  }
}
