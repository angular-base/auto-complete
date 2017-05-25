import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BaseAutoCompleteComponent } from './base-auto-complete.component';
import { BaseAutoCompleteDirective } from './base-auto-complete.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [BaseAutoCompleteComponent, BaseAutoCompleteDirective],
  exports: [BaseAutoCompleteComponent, BaseAutoCompleteDirective],
  entryComponents: [BaseAutoCompleteComponent]
})
export class BaseAutoCompleteModule {
  static forRoot () {
    return {
      ngModule: BaseAutoCompleteModule
    }
  }
}
