import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { stationAddPage } from './stationAdd';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    stationAddPage,
  ],
  imports: [
    IonicPageModule.forChild(stationAddPage),
    SharedModule
  ],
})
export class stationAddPageModule {}
