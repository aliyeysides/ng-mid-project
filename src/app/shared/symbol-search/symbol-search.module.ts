import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SymbolSearchComponent} from './symbol-search.component';
import {SearchPanelComponent} from '../search-panel/search-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SymbolSearchComponent,
    SearchPanelComponent
  ],
  declarations: [SearchPanelComponent, SymbolSearchComponent]
})
export class SymbolSearchModule {
}
