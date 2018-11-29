import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { File } from '../../file.model';

import { GithubFileService } from '../../services/github-file.service';

function flattenFile(origFile: File): File[] {
  if (!origFile) {
    return [];
  }
  // shallow copy
  const { files, ...file } = origFile;
  return [
    file,
    ...(files.map(flattenFile).flat())
  ]
}

@Component({
  selector: 'file-viewer',
  templateUrl: './file-viewer.component.html',
  styles: [`h1 { font-family: Lato; }`]
})
export class FileViewerComponent implements OnInit {
  fileContent = '';


  files$ = this.fileService.getTree().pipe(
    // map(flattenFile)
  );

  subscription = this.files$.subscribe();
    
  constructor(
    protected fileService: GithubFileService
  ) {
    console.log('init file viewer')
  }
}

