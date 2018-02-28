import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailAddPage } from './detail-add';

@NgModule({
  declarations: [
    DetailAddPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailAddPage),
  ],
})
export class DetailAddPageModule {}
