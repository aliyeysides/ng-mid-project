import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MidTierHeaderComponent } from './mid-tier-header.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  exports: [
    MidTierHeaderComponent
  ],
  declarations: [
    MidTierHeaderComponent
  ]
})
export class MidTierHeaderModule {
}
