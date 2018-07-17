import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  Injector,
  Input
} from "@angular/core";

@Component({
  selector: "file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.css"]
})
export class FileInput implements OnInit {
  @Input('displayText') displayText : string = "Click or Drag to Upload a File";
  @Output() fileMeta = new EventEmitter<File>();
  @Output() fileData = new EventEmitter<Uint8Array>();

  constructor() {}

  ngOnInit() {
    let component = document.querySelector("#file_upload");
    let dropzone = document.createElement("div");
    dropzone.id = "file_input";
    dropzone.classList.add("file_input");
    dropzone.innerText = this.displayText
    dropzone.style.height = "100px";
    dropzone.style.width = "100%";
    dropzone.style.padding = "20px";
    dropzone.style.marginBottom = "20px";
    dropzone.style.textAlign = "center";
    dropzone.style.textJustify = "center";
    dropzone.style.backgroundColor = "rgb(230, 230, 230)";


    dropzone.ondragover = event => {
      event.preventDefault();
      console.log(event)
    };

    dropzone.onclick = event => {
      let fileInput = <HTMLInputElement> document.querySelector("#file_dialog");
      fileInput.click();
      fileInput.onchange = event => {
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
      };
    };

    dropzone.ondrop = event => {
      let dropzone = document.querySelector("#file_input");
      event.preventDefault();
      event.dataTransfer.dropEffect = "all";
      event.dataTransfer.effectAllowed = "all";
      console.log(event.dataTransfer.files);

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

    component.appendChild(dropzone);

    addEventListener("fileAdded", (event: any) => {
      console.log(event)
      this.fileMeta.emit(event.detail.file);
      this.fileData.emit(event.detail.data);
    });
  }
}
