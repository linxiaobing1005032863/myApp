import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationFilterPage } from './station-filter';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    StationFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(StationFilterPage),
    MultiPickerModule
  ],
})
export class StationFilterPageModule {}
