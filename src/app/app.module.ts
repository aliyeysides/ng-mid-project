import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* Bootstrap component */
import { AppComponent } from './app.component';

/* Modules */
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './Home/home.module';
import { IdeasModule } from './ideas/ideas.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    HomeModule,
    IdeasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
