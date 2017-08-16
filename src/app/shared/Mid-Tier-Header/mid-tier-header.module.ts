import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedService} from '../shared.service';
import {MidTierHeaderComponent} from './mid-tier-header.component';

import {PopoverModule} from 'ngx-bootstrap/popover';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {SupportModalComponent} from './support-modal/support-modal.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    PopoverModule,
    BsDropdownModule,
    ReactiveFormsModule
  ],
  exports: [
    MidTierHeaderComponent
  ],
  declarations: [
    MidTierHeaderComponent,
    SupportModalComponent
  ],
  providers: [SharedService]
})
export class MidTierHeaderModule {
}
