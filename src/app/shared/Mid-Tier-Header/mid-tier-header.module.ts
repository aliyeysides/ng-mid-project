import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';
import { MidTierHeaderComponent, SymbolLookupComponent } from './mid-tier-header.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MidTierHeaderComponent
  ],
  declarations: [
    MidTierHeaderComponent, SymbolLookupComponent
  ],
  bootstrap: [SymbolLookupComponent],
  providers: [SharedService]
})
export class MidTierHeaderModule {
}
