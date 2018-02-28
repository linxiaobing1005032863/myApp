import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailSeePage } from './detail-see';

@NgModule({
  declarations: [
    DetailSeePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailSeePage),
  ],
})
export class DetailSeePageModule {}
