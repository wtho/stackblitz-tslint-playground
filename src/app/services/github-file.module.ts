import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GithubFileService } from './github-file.service';

@NgModule({
//  imports: 
  providers: [ GithubFileService ]
})
export class GithubFileModule { }
