import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { GithubFileService } from '../../services/github-file.service';
import { File } from '../../file.model';

@Component({
  selector: 'file-tree',
  templateUrl: './file-tree.component.html',
  styles: [`h1 { font-family: Lato; }`]
})
export class FileTreeComponent implements OnInit, AfterViewInit {

  owner = 'wtho';
  repo = 'stackblitz-tslint-playground';
  content = '';
  selector = '';

  get fullRepoPath() {
    return `${this.owner}/${this.repo}`
  }

  tree$ = this.fileService.getTree();
  subscription = this.tree$.subscribe(
    console.log
  );
  
  constructor(
    protected fileService: GithubFileService
  ) {
    this.fileService.fetchRepoTree(this.fullRepoPath);
  }

  selectFile(file: File) {
    console.log('file selected', file);
    this.selector = file.path;
    if (file.content) {
      this.content = file.content;
    } else {

    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
}

