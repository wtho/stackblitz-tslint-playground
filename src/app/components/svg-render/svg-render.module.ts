import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SvgRenderComponent } from './svg-render.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, CommonModule ],
  declarations: [ SvgRenderComponent ],
  exports: [ SvgRenderComponent ]
})
export class SvgRenderModule { }
