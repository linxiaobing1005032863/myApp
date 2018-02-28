import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
})
export class WorkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  gotoTask() {
    this.navCtrl.push('TaskAssignmentPage');
  }

}
