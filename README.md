# AngularFileInput
A simple drag and drop file input for Angular. Currently only supports single file uploads.

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
The FileInput has a single input for the display text, which is by default set to "Click or Drag to Upload a File".

```typescript
  @Input('displayText') displayText : string = "Click or Drag to Upload a File";
```

### Outputs
The FileInput has two output events, the File Metadata as a `File` and the File Data as a `Uint8Array`, these must be handled by the parent component.

```typescript
  @Output() fileMetaSet = new EventEmitter<File>();
  @Output() fileDataSet = new EventEmitter<Uint8Array>();
```

## Parent Component
### HTML
The FileInput should be included in the HTML for the parent component with event handlers for the `fileDataSetSet` and `fileMetaSetSet` events.

```html
<file-input (fileDataSet)="setfileDataSet($event)" (fileMetaSet)="setfileMetaSet($event)"></file-input>
```

```typescript
  setfileMetaSet(event: File){
    this.fileMeta = event;
  }

  setfileDataSet(event: Uint8Array){
    this.fileData = event;
  }
```