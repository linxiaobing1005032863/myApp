import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterTwoPage } from './register-two';

@NgModule({
  declarations: [
    RegisterTwoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterTwoPage),
  ],
  exports: [
    RegisterTwoPage
  ]
})
export class RegisterTwoPageModule {}
