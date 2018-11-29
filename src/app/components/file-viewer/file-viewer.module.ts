import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FileViewerComponent } from './file-viewer.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, CommonModule ],
  declarations: [ FileViewerComponent ],
  exports: [ FileViewerComponent ]
})
export class FileViewerModule { }
