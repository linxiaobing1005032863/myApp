import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyFilterPage } from './company-filter';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    CompanyFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyFilterPage),
    MultiPickerModule
  ],
})
export class CompanyFilterPageModule {}
