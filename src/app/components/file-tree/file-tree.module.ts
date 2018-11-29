import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FileTreeComponent } from './file-tree.component';
import { FileElementComponent } from './file-element.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, CommonModule ],
  declarations: [ FileTreeComponent, FileElementComponent ],
  exports: [ FileTreeComponent, FileElementComponent ]
})
export class FileTreeModule { }

