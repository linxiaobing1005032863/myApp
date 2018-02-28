import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerFilterPage } from './owner-filter';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    OwnerFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerFilterPage),
    MultiPickerModule
  ],
})
export class OwnerFilterPageModule {}
