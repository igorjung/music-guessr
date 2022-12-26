import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from './services';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from './components/card/card.component';
import { FormComponent } from './components/form/form.component';
import { TimePipe } from './pipes/time.pipe';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    SearchComponent,
    CardComponent,
    FormComponent,
    TimePipe,
    ModalComponent,
  ],
  exports: [
    SearchComponent,
    CardComponent,
    FormComponent,
    ModalComponent,
    TimePipe,
  ],
  entryComponents: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService
      ]
    };
  }
}
