import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PigFormComponent } from './pig-form/pig-form.component';
import { MoreinfoComponent } from './moreinfo/moreinfo.component';
import { DeleteComponent } from './delete/delete.component';
import { StatusComponent } from './status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PigFormComponent,
    MoreinfoComponent,
    DeleteComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
