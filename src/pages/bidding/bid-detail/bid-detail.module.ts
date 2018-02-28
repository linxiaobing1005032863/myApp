import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { bidDetailPage } from './bid-detail';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    bidDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(bidDetailPage),
    SharedModule
  ],
})
export class bidDetailPageModule {}
