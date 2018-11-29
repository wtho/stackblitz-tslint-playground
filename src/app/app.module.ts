import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GithubFileModule } from './services/github-file.module';
import { SvgRenderModule } from './components/svg-render/svg-render.module';
import { FileTreeModule } from './components/file-tree/file-tree.module';
import { FileViewerModule } from './components/file-viewer/file-viewer.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GithubFileModule,
    SvgRenderModule,
    FileViewerModule,
    FileTreeModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
