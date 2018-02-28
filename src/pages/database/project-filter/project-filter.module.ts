import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectFilterPage } from './project-filter';


@NgModule({
  declarations: [
    ProjectFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectFilterPage),
  ],
})
export class ProjectFilterPageModule { }
