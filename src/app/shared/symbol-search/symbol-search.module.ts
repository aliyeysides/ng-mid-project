import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SymbolSearchComponent} from './symbol-search.component';
import { FocusoffDirective } from './focusoff.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SymbolSearchComponent
  ],
  declarations: [SymbolSearchComponent, FocusoffDirective]
})
export class SymbolSearchModule {
}
