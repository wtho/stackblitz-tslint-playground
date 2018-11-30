import { Component, Input } from '@angular/core';

@Component({
  selector: 'file-viewer',
  templateUrl: './file-viewer.component.html',
  styles: [`h1 { font-family: Lato; }`]
})
export class FileViewerComponent {
  @Input()
  code = '';

  rows = 10;
  columns = 80;


}

