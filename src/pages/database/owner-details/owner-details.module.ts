import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerDetailsPage } from './owner-details';

@NgModule({
  declarations: [
    OwnerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerDetailsPage),
  ],
})
export class OwnerDetailsPageModule {}
