import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationDetailsPage } from './station-details';

@NgModule({
  declarations: [
    StationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StationDetailsPage),
  ],
})
export class StationDetailsPageModule {}
