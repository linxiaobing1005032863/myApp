import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFilePage } from './my-file';

@NgModule({
  declarations: [
    MyFilePage,
  ],
  imports: [
    IonicPageModule.forChild(MyFilePage),

  ],
})
export class MyFilePageModule {}
