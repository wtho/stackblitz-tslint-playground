import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { flatMap, publishReplay, refCount } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


import { TREE } from './mock-tree';


interface GithubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: 'file' | 'dir';
  content?: string;
  encoding?: 'base64'
  _links: {
    self: string;
    git: string;
    html: string;  
  };
  files?: GithubFile[];
}




@Injectable()
export class GithubFileService {
  repo = null;
  branch = 'master';

  protected fileTree$ = new Subject<GithubFile>();
  protected observableTree$ = this.fileTree$.pipe(
    publishReplay(1), refCount());

  fileTree: GithubFile = null;
  
  constructor(
    protected http: HttpClient
  ) { }

  public getTree(): Observable<GithubFile> {
    return this.observableTree$;
  }

  public fetchRepoTree(repo: string, rootParent = 'src', rootFolder = 'app') {
    this.repo = repo;
    this.fileTree = null;
    if (TREE) {
      this.fileTree$.next(null);
      console.log('mocking data', rootParent, TREE.path);
      this.fileTree$.next(TREE as GithubFile);
      return
    }
    console.log('fetch', rootParent)
    this.fetchFile(rootParent).subscribe(httpRes => {
      console.log('got', rootParent, httpRes)
      if (!Array.isArray(httpRes)) {
        return this.fileTree$.next(null);
      }
      const root = httpRes.find(file => file.name === rootFolder)
      if (!root) {
        return this.fileTree$.next(null);
      }
      this.fileTree = root;
      root.files = [];
      this.fetchFile(root.path).subscribe(httpRes => this.integrateChildren(root, httpRes))
      this.fileTree$.next(this.fileTree);
    })
  }

  integrateChildren(parent: GithubFile, response: GithubFile | GithubFile[]) {
    console.log('integrating into', parent.path)
    if (Array.isArray(response)) {
      parent.files.push(...response);
      return response
        .filter(file => file.type === 'dir')
        .forEach(dir => {
          dir.files = [];
          this.fetchFile(dir.path)
            .subscribe(httpRes => this.integrateChildren(dir, httpRes))
        })
    } else {
      parent.files.push(response)
    }
    this.fileTree$.next(this.fileTree);
  }

  fetchFile(filePath): Observable<GithubFile | GithubFile[]> {
    return this.http.get(`https://api.github.com/repos/${this.repo}/contents/${filePath}`)
  }

  public fetchContent(file: GithubFile) {
    return this.http.get(file.git_url)
      .tap(newFile => Object.assign(file, newFile))
      .subscribe(() => this.fileTree$.next(this.fileTree))
  }
}