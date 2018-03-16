import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeopleDetilePage } from './people-detile';

@NgModule({
  declarations: [
    PeopleDetilePage,
  ],
  imports: [
    IonicPageModule.forChild(PeopleDetilePage),
  ],
})
export class PeopleDetilePageModule {}
