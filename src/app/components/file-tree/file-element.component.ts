import { Component, Input, Output, EventEmitter } from '@angular/core';
import { File } from '../../file.model';

@Component({
  selector: 'file-el',
  templateUrl: './file-element.component.html'
})
export class FileElementComponent {
  @Input()
  file: File;

  @Output()
  select = new EventEmitter<File>();
}

