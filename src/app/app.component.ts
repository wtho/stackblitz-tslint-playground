import { Component, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { File } from './file.model';

import { GithubFileService } from './services/github-file.service';

function flattenFile(origFile: File): File[] {
  if (!origFile) {
    return [];
  }
  if (origFile.type === 'file') {
    return [origFile];
  }
  // shallow copy
  const { files, ...file } = origFile;
  return (files || []).map(flattenFile).flat()
}


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';

  code = '';
  selector$ = new Subject<string>();

  select(selector: string) {
    this.selector$.next(selector);
  }


  files$ = this.fileService.getTree().pipe(
    map(flattenFile)
  );

  subscription = this.files$.subscribe();
    
  constructor(
    protected fileService: GithubFileService
  ) {
    combineLatest(this.files$, this.selector$).subscribe(([files, selector]) => {
      const nextFile = files.find(file => file.path === selector)
      console.log('new file to view', nextFile, selector, files)
      if (nextFile && nextFile.content) {
        this.code = atob(nextFile.content);
      }
    })
  }

}
