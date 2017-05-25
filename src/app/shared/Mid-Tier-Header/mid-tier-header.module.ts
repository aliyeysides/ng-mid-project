import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';
import { MidTierHeaderComponent, SymbolLookupComponent } from './mid-tier-header.component';
import { SearchPanelModule } from '../search-panel/search-panel.module';
import { SearchPanelComponent } from '../search-panel/search-panel.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SearchPanelModule
  ],
  exports: [
    MidTierHeaderComponent,
    
  ],
  declarations: [
    MidTierHeaderComponent, SymbolLookupComponent
  ],
  bootstrap: [SymbolLookupComponent],
  providers: [SharedService]
})
export class MidTierHeaderModule {
}
