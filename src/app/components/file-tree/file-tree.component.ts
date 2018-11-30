import { Component, Input, Output, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
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
  @Output()
  setSelector = new EventEmitter<string>();

  get fullRepoPath() {
    return `${this.owner}/${this.repo}`
  }

  tree$ = this.fileService.getTree();
  subscription = this.tree$.subscribe(
  );
  
  constructor(
    protected fileService: GithubFileService
  ) {
    this.fileService.fetchRepoTree(this.fullRepoPath);
  }

  selectFile(file: File) {
    this.setSelector.emit(file.path);
    if (file.content) {
      this.content = file.content;
    } else {
      this.fileService.fetchContent(file as any);
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

