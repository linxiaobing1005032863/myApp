import { Component } from '@angular/core';
import { NavController ,IonicPage  } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  date: any;

  constructor(
    public navCtrl: NavController) {

  }
  ionViewWillEnter() {

  }
}
