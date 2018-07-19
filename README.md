# AngularFileInput
A simple drag and drop file input for Angular. Currently only supports single file uploads.

The npm package can be found [here](https://www.npmjs.com/package/@nabeelvalley/angularfileinput)

## Usage
### AppModule
Include the following in your project's NgModule declarations:

```typescript
...
@NgModule({
  declarations: [
    ...
	FileInput
  ],
  ...
```

## File Input Component
### Input
The Component has two inputs, one for the accepted file types and the other for the display text, which are by default set to "*", and "Click or Drag to Upload a File" respectively.

```typescript
  @Input('accepts') accepts : string = "*";
  @Input('displayText') displayText : string = "Click or Drag to Upload a File";
```

### Outputs
The Component has two output events, the File Metadata as a `File` and the File Data as a `Uint8Array`, these must be handled by the parent component.

```typescript
  @Output() fileMetaSet = new EventEmitter<File>();
  @Output() fileDataSet = new EventEmitter<Uint8Array>();
```

## Parent Component
### HTML
The Component should be included in the HTML for the parent component with an accepted file type and event handlers for the `fileDataSetSet` and `fileMetaSetSet` events.

```html
<file-input [accepts]="'image/*'" (fileDataSet)="setfileDataSet($event)" (fileMetaSet)="setfileMetaSet($event)"></file-input>
```

```typescript
  setfileMetaSet(event: File){
    this.fileMeta = event;
  }

  setfileDataSet(event: Uint8Array){
    this.fileData = event;
  }
```