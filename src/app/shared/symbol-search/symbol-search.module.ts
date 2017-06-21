import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SymbolSearchComponent} from './symbol-search.component';
import {SearchPanelComponent} from '../search-panel/search-panel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SymbolSearchComponent,
    SearchPanelComponent
  ],
  declarations: [SearchPanelComponent, SymbolSearchComponent]
})
export class SymbolSearchModule {
}
