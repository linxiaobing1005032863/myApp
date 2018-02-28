import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { demandDetailPage } from './demandDetail';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    demandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(demandDetailPage),
    SharedModule
  ],
})
export class demandDetailModule {}
