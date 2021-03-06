import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { SharedRoutingModule } from './shared-routing.module';
import { PreloaderComponent } from './preloader/preloader.component';
import { PreloaderService } from './preloader/preloader.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    PreloaderComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    PreloaderComponent,
  ],
  providers: [PreloaderService]
})
export class SharedModule { }
