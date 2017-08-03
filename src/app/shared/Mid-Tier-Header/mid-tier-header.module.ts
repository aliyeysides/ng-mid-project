import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedService} from '../shared.service';
import {MidTierHeaderComponent} from './mid-tier-header.component';

import {PopoverModule} from 'ngx-bootstrap/popover';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    PopoverModule,
    ReactiveFormsModule
  ],
  exports: [
    MidTierHeaderComponent,

  ],
  declarations: [
    MidTierHeaderComponent
  ],
  providers: [SharedService]
})
export class MidTierHeaderModule {
}
