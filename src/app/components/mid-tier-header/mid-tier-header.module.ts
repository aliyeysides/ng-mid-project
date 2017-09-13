import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedService} from '../../shared/shared.service';
import {MidTierHeaderComponent} from './mid-tier-header.component';
import {SupportModalComponent} from './support-modal/support-modal.component';
import {OnboardingComponent} from './onboarding/onboarding.component';

import {ModalModule} from 'ngx-bootstrap/modal';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {SymbolSearchModule} from '../shared/symbol-search/symbol-search.module';
import {MidTierHeaderService} from './mid-tier-header.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ModalModule,
    PopoverModule,
    BsDropdownModule,
    ReactiveFormsModule,
    SymbolSearchModule
  ],
  exports: [
    MidTierHeaderComponent
  ],
  declarations: [
    MidTierHeaderComponent,
    SupportModalComponent,
    OnboardingComponent
  ],
  providers: [SharedService, MidTierHeaderService]
})
export class MidTierHeaderModule {
}
