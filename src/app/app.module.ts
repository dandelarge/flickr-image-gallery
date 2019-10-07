import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadDirective } from './gallery/lazyload.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    LazyLoadDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ScrollingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
