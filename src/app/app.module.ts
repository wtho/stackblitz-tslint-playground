import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SvgRenderModule } from './components/svg-render/svg-render.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SvgRenderModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
