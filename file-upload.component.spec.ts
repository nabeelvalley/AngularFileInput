import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileInput } from './file-input.component';

describe('FileInput', () => {
  let component: FileInput;
  let fixture: ComponentFixture<FileInput>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileInput ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
