import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './pipes/phone.pipe';
import { UkIconDirective } from './directives/uk-icon.directive';

@NgModule({
  declarations: [PhonePipe, UkIconDirective],
  imports: [CommonModule],
  exports: [PhonePipe, UkIconDirective],
})
export class SharedModule {}
